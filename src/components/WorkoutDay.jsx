import { useState } from "react";
import ExerciseCard from "./ExerciseCard";
import RestTimer from "./RestTimer";

export default function WorkoutDay({ workout }) {
  const [checked, setChecked] = useState({});
  const [showTimer, setShowTimer] = useState(false);
  const [timerAutoStart, setTimerAutoStart] = useState(false);

  function toggle(id) {
    setChecked((prev) => {
      const wasChecked = prev[id];
      if (!wasChecked) {
        setTimerAutoStart(true);
        setShowTimer(true);
      }
      return { ...prev, [id]: !wasChecked };
    });
  }

  function resetAll() {
    setChecked({});
  }

  const total = workout.exercises.length;
  const done = workout.exercises.filter((e) => checked[e.id]).length;
  const allDone = done === total;

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
          />
        ))}
      </div>

      {/* Actions */}
      <div className="day-actions">
        <button className="action-btn timer-trigger" onClick={() => { setTimerAutoStart(false); setShowTimer(true); }}>
          ⏱ Descanso
        </button>
        <button className="action-btn reset" onClick={resetAll}>
          Reiniciar día
        </button>
      </div>

      {allDone && (
        <div className="completed-banner" style={{ background: workout.color }}>
          🎉 ¡Día completado, Fabian! 💪
        </div>
      )}

      {showTimer && (
        <RestTimer
          onClose={() => { setShowTimer(false); setTimerAutoStart(false); }}
          autoStart={timerAutoStart}
        />
      )}
    </div>
  );
}
