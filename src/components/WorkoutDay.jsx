import { useState, useEffect, useCallback, useRef } from "react";
import ExerciseCard from "./ExerciseCard";
import RestTimer from "./RestTimer";

function formatTime(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return m > 0 ? `${m}:${String(s).padStart(2, "0")}` : `${s}s`;
}

export default function WorkoutDay({ workout }) {
  const [checked, setChecked] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(`fba_checked_${workout.id}`) || "{}");
    } catch {
      return {};
    }
  });
  const [showTimer, setShowTimer] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [timerDuration, setTimerDuration] = useState(60);
  const [timerMeta, setTimerMeta] = useState({ running: false, timeLeft: 0, duration: 60 });
  const [timerExMeta, setTimerExMeta] = useState({ repsDone: 0, totalSets: 0, exId: null });
  const [weightLog, setWeightLog] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("fba_weights_v1") || "{}");
    } catch {
      return {};
    }
  });
  const [repState, setRepState] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(`fba_reps_${workout.id}`) || "{}");
    } catch {
      return {};
    }
  });
  const [weightModal, setWeightModal] = useState({ open: false, id: null, name: "" });
  const [toast, setToast] = useState({ text: "", show: false });
  const [showCeleb, setShowCeleb] = useState(false);
  const weightInputRef = useRef(null);
  const toastTimerRef = useRef(null);

  const total = workout.exercises.length;
  const done = workout.exercises.filter((e) => checked[e.id]).length;
  const allDone = done === total;

  const prevAllDoneRef = useRef(allDone);

  useEffect(() => {
    localStorage.setItem(`fba_checked_${workout.id}`, JSON.stringify(checked));
  }, [checked, workout.id]);

  useEffect(() => {
    localStorage.setItem(`fba_reps_${workout.id}`, JSON.stringify(repState));
  }, [repState, workout.id]);

  useEffect(() => {
    localStorage.setItem("fba_weights_v1", JSON.stringify(weightLog));
  }, [weightLog]);

  useEffect(() => {
    if (weightModal.open && weightInputRef.current) {
      const lastKg = weightLog[weightModal.name]?.at(-1)?.kg;
      setTimeout(() => {
        if (weightInputRef.current) {
          if (lastKg != null) weightInputRef.current.value = lastKg;
          weightInputRef.current.focus();
        }
      }, 100);
    }
  }, [weightModal.open]);

  // Feature 1: Celebration modal trigger
  useEffect(() => {
    if (allDone && !prevAllDoneRef.current) {
      setTimeout(() => setShowCeleb(true), 400);
    }
    prevAllDoneRef.current = allDone;
  }, [allDone]);

  // Feature 1: Launch confetti when showCeleb becomes true
  function launchConfetti() {
    const layer = document.getElementById('fba-confetti');
    if (!layer) return;
    layer.innerHTML = '';
    const cols = ['#FF6B6B','#00B894','#A29BFE','#FDCB6E','#fd79a8','#74b9ff','#55efc4'];
    for (let i = 0; i < 100; i++) {
      const el = document.createElement('div');
      el.className = 'cf';
      const sz = 5 + Math.random() * 9;
      const circ = Math.random() > 0.5;
      el.style.cssText = `left:${Math.random()*100}%;width:${sz}px;height:${circ?sz:sz*0.45}px;background:${cols[Math.floor(Math.random()*cols.length)]};border-radius:${circ?'50%':'2px'};animation-duration:${1.3+Math.random()*2.2}s;animation-delay:${Math.random()*0.7}s;--dx:${-150+Math.random()*300}px;`;
      layer.appendChild(el);
    }
    setTimeout(() => { if (layer) layer.innerHTML = ''; }, 5000);
  }

  useEffect(() => {
    if (showCeleb) {
      launchConfetti();
    }
  }, [showCeleb]);

  // Feature 3: Wake Lock
  useEffect(() => {
    if (!('wakeLock' in navigator)) return;
    let lock = null;
    const acquire = async () => {
      try { lock = await navigator.wakeLock.request('screen'); } catch {}
    };
    acquire();
    const onVisible = () => { if (document.visibilityState === 'visible') acquire(); };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      document.removeEventListener('visibilitychange', onVisible);
      lock?.release().catch(() => {});
    };
  }, []);

  function showToast(text) {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ text, show: true });
    toastTimerRef.current = setTimeout(() => {
      setToast((t) => ({ ...t, show: false }));
    }, 2500);
  }

  function toggle(id) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  // Feature 5: Confirmation before reset
  function resetAll() {
    if (!window.confirm('¿Reiniciar el progreso del día? Se borrarán las series y ejercicios completados.')) return;
    setChecked({});
    setRepState({});
  }

  // Feature 7: openTimer with timerExMeta
  function openTimer(restSeconds, exId) {
    const ex = workout.exercises.find((e) => e.id === exId);
    let newCount = 0;
    if (ex) {
      newCount = Math.min((repState[exId] || 0) + 1, ex.sets);
      setRepState((prev) => ({ ...prev, [exId]: newCount }));
      if (newCount >= ex.sets) {
        setChecked((prev) => ({ ...prev, [exId]: true }));
        showToast("✅ ¡Serie completada!");
      }
      setTimerExMeta({ repsDone: newCount, totalSets: ex.sets, exId: exId });
    }
    setTimerDuration(restSeconds);
    setTimerKey((k) => k + 1);
    setShowTimer(true);
  }

  function openWeight(exId, exName) {
    setWeightModal({ open: true, id: exId, name: exName });
  }

  function saveWeight(kg) {
    const name = weightModal.name;
    const entry = { date: new Date().toLocaleDateString("es-ES"), kg: Number(kg) };
    setWeightLog((prev) => ({
      ...prev,
      [name]: [...(prev[name] || []), entry],
    }));
    setWeightModal({ open: false, id: null, name: "" });
    showToast("💪 Peso guardado");
  }

  function resetTimerReps() {
    const { exId } = timerExMeta;
    if (!exId) return;
    setRepState((prev) => { const u = { ...prev }; delete u[exId]; return u; });
    setChecked((prev) => { const u = { ...prev }; delete u[exId]; return u; });
    setTimerExMeta((prev) => ({ ...prev, repsDone: 0 }));
  }

  // Feature 2: Delete weight entry
  function deleteWeight(name, idx) {
    setWeightLog((prev) => {
      const entries = [...(prev[name] || [])];
      entries.splice(idx, 1);
      return { ...prev, [name]: entries };
    });
  }

  const handleTimerState = useCallback((running, timeLeft, duration) => {
    setTimerMeta({ running, timeLeft, duration });
  }, []);

  const timerVisible = showTimer || timerMeta.running;
  const miniTimerVisible = !showTimer && timerMeta.running;

  const miniProgress = timerMeta.duration > 0 ? timerMeta.timeLeft / timerMeta.duration : 0;
  const miniRadius = 16;
  const miniCircumference = 2 * Math.PI * miniRadius;

  return (
    <div className="workout-day">
      {/* Feature 1: Confetti layer */}
      <div id="fba-confetti" className="confetti-layer" />

      {/* Feature 1: Celebration modal */}
      {showCeleb && (
        <div className="celeb-ov show" onClick={() => setShowCeleb(false)}>
          <div className="celeb-card" onClick={(e) => e.stopPropagation()}>
            <span className="celeb-em">🏆</span>
            <p className="celeb-title">¡Completado!</p>
            <p className="celeb-stats">{total} ejercicios completados 🎯</p>
            <p className="celeb-msg">¡Lo aplastaste hoy, Fabian! Descansa bien 🔥</p>
            <button className="celeb-close" onClick={() => setShowCeleb(false)}>¡Gracias! 💪</button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="day-header" style={{ background: workout.color }}>
        <div>
          <span className="day-tag">{workout.day}</span>
          <h2 className="day-label">{workout.label}</h2>
          <p className="day-focus">{workout.focus}</p>
        </div>
        <div className="day-progress-ring">
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="5" />
            <circle
              cx="30"
              cy="30"
              r="24"
              fill="none"
              stroke="white"
              strokeWidth="5"
              strokeDasharray={`${(done / total) * 150.8} 150.8`}
              strokeLinecap="round"
              transform="rotate(-90 30 30)"
              style={{ transition: "stroke-dasharray 0.4s ease" }}
            />
          </svg>
          <span className="ring-label">{done}/{total}</span>
        </div>
      </div>

      {/* Exercise list */}
      <div className="exercise-list">
        {workout.exercises.map((ex) => (
          <ExerciseCard
            key={ex.id}
            exercise={ex}
            checked={!!checked[ex.id]}
            onToggle={() => toggle(ex.id)}
            accentColor={workout.color}
            onOpenTimer={(rest) => openTimer(rest, ex.id)}
            onOpenWeight={() => openWeight(ex.id, ex.name)}
            repsDone={repState[ex.id] || 0}
            lastWeight={weightLog[ex.name]?.at(-1)?.kg ?? null}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="day-actions">
        <button className="action-btn reset" onClick={resetAll}>
          ↺ Reiniciar día
        </button>
      </div>

      {/* Rest Timer */}
      {timerVisible && (
        <RestTimer
          key={timerKey}
          defaultDuration={timerDuration}
          hidden={!showTimer}
          onHide={() => setShowTimer(false)}
          onRunningChange={handleTimerState}
          onClose={() => setShowTimer(false)}
          repsDone={timerExMeta.repsDone}
          totalSets={timerExMeta.totalSets}
          onResetReps={resetTimerReps}
        />
      )}

      {/* Mini floating timer */}
      {miniTimerVisible && (
        <div className="mini-timer" onClick={() => setShowTimer(true)}>
          <svg width={miniRadius * 2 + 8} height={miniRadius * 2 + 8} viewBox={`0 0 ${miniRadius * 2 + 8} ${miniRadius * 2 + 8}`}>
            <circle
              cx={miniRadius + 4}
              cy={miniRadius + 4}
              r={miniRadius}
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="3"
            />
            <circle
              cx={miniRadius + 4}
              cy={miniRadius + 4}
              r={miniRadius}
              fill="none"
              stroke="#FF6B6B"
              strokeWidth="3"
              strokeDasharray={`${miniCircumference * miniProgress} ${miniCircumference}`}
              strokeLinecap="round"
              transform={`rotate(-90 ${miniRadius + 4} ${miniRadius + 4})`}
              style={{ transition: "stroke-dasharray 0.5s ease" }}
            />
          </svg>
          <span className="mini-num">{formatTime(timerMeta.timeLeft)}</span>
        </div>
      )}

      {/* Weight Modal */}
      {weightModal.open && (
        <div
          className="weight-overlay"
          onClick={() => setWeightModal({ open: false, id: null, name: "" })}
        >
          <div className="weight-sheet" style={{ position: "relative" }} onClick={(e) => e.stopPropagation()}>
            <button
              className="weight-close"
              onClick={() => setWeightModal({ open: false, id: null, name: "" })}
            >
              ✕
            </button>
            <div className="weight-handle" />
            <p className="weight-title">{weightModal.name}</p>
            <p className="weight-sub">Registra el peso usado hoy</p>
            <div className="w-input-wrap">
              <input
                ref={weightInputRef}
                type="number"
                className="w-input"
                placeholder="0"
                min="0"
                step="0.5"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const val = e.target.value;
                    if (val) saveWeight(val);
                  }
                }}
              />
              <span className="w-unit">kg</span>
            </div>
            <button
              className="w-save"
              onClick={() => {
                const val = weightInputRef.current?.value;
                if (val) saveWeight(val);
              }}
            >
              Guardar
            </button>
            {/* Feature 2: Weight history with delete and delta */}
            {weightLog[weightModal.name]?.length > 0 ? (
              <>
                <p className="w-hist-title">Historial</p>
                <ul className="w-hist-list">
                  {[...(weightLog[weightModal.name] || [])].reverse().slice(0, 10).map((entry, i) => {
                    const realIdx = (weightLog[weightModal.name]?.length || 0) - 1 - i;
                    const prevEntry = [...(weightLog[weightModal.name] || [])].reverse()[i + 1];
                    let delta = null;
                    if (prevEntry) {
                      const diff = (entry.kg - prevEntry.kg).toFixed(1);
                      if (diff > 0) delta = <span className="w-delta w-delta-up">+{diff}</span>;
                      else if (diff < 0) delta = <span className="w-delta w-delta-down">{diff}</span>;
                    }
                    return (
                      <li key={i} className="w-hist-item">
                        <span className="w-hist-date">{entry.date}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span>
                            <span className="w-hist-kg">{entry.kg} kg</span>
                            {delta}
                          </span>
                          <button
                            className="w-del-btn"
                            onClick={() => deleteWeight(weightModal.name, realIdx)}
                          >✕</button>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : (
              <p className="w-hist-empty">Aquí verás tu progreso.<br/>¡Anota tu primer peso!</p>
            )}
          </div>
        </div>
      )}

      {/* Toast */}
      <div className={`toast${toast.show ? " show" : ""}`}>{toast.text}</div>
    </div>
  );
}
