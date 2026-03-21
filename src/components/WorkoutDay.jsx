import { useState, useEffect, useCallback, useRef } from "react";
import ExerciseCard from "./ExerciseCard";
import RestTimer from "./RestTimer";

function formatTime(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return m > 0 ? `${m}:${String(s).padStart(2, "0")}` : `${s}s`;
}

export default function WorkoutDay({ workout }) {
  const [checked, setChecked] = useState({});
  const [showTimer, setShowTimer] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [timerDuration, setTimerDuration] = useState(60);
  const [timerMeta, setTimerMeta] = useState({ running: false, timeLeft: 0, duration: 60 });
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
  const weightInputRef = useRef(null);
  const toastTimerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(`fba_reps_${workout.id}`, JSON.stringify(repState));
  }, [repState, workout.id]);

  useEffect(() => {
    localStorage.setItem("fba_weights_v1", JSON.stringify(weightLog));
  }, [weightLog]);

  useEffect(() => {
    if (weightModal.open && weightInputRef.current) {
      setTimeout(() => weightInputRef.current?.focus(), 100);
    }
  }, [weightModal.open]);

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

  function resetAll() {
    setChecked({});
    setRepState({});
  }

  function openTimer(restSeconds, exId) {
    const ex = workout.exercises.find((e) => e.id === exId);
    if (ex) {
      const newCount = Math.min((repState[exId] || 0) + 1, ex.sets);
      setRepState((prev) => {
        const updated = { ...prev, [exId]: newCount };
        return updated;
      });
      if ((repState[exId] || 0) + 1 >= ex.sets) {
        setChecked((prev) => ({ ...prev, [exId]: true }));
        showToast("✅ ¡Serie completada!");
      }
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

  const handleTimerState = useCallback((running, timeLeft, duration) => {
    setTimerMeta({ running, timeLeft, duration });
  }, []);

  const total = workout.exercises.length;
  const done = workout.exercises.filter((e) => checked[e.id]).length;
  const allDone = done === total;

  const timerVisible = showTimer || timerMeta.running;
  const miniTimerVisible = !showTimer && timerMeta.running;

  const miniProgress = timerMeta.duration > 0 ? timerMeta.timeLeft / timerMeta.duration : 0;
  const miniRadius = 16;
  const miniCircumference = 2 * Math.PI * miniRadius;

  return (
    <div className="workout-day">
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

      {allDone && (
        <div className="completed-banner" style={{ background: workout.color }}>
          🎉 ¡Día completado, Fabian! 💪
        </div>
      )}

      {/* Rest Timer */}
      {timerVisible && (
        <RestTimer
          key={timerKey}
          defaultDuration={timerDuration}
          hidden={!showTimer}
          onHide={() => setShowTimer(false)}
          onRunningChange={handleTimerState}
          onClose={() => setShowTimer(false)}
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
            {weightLog[weightModal.name]?.length > 0 && (
              <>
                <p className="w-hist-title">Historial</p>
                <ul className="w-hist-list">
                  {[...(weightLog[weightModal.name] || [])].reverse().slice(0, 10).map((entry, i) => (
                    <li key={i} className="w-hist-item">
                      <span className="w-hist-date">{entry.date}</span>
                      <span className="w-hist-kg">{entry.kg} kg</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}

      {/* Toast */}
      <div className={`toast${toast.show ? " show" : ""}`}>{toast.text}</div>
    </div>
  );
}
