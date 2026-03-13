export default function ExerciseCard({ exercise, checked, onToggle, accentColor }) {
  return (
    <div
      className={`exercise-card ${checked ? "done" : ""}`}
      style={{ borderLeft: `4px solid ${accentColor}` }}
      onClick={onToggle}
    >
      <div className="exercise-info">
        <span className="exercise-name">{exercise.name}</span>
        <span className="exercise-meta">
          {exercise.sets} series · {exercise.reps} reps
        </span>
        <span className="exercise-equipment">{exercise.equipment}</span>
      </div>
      <div className={`exercise-check ${checked ? "checked" : ""}`}>
        {checked ? "✓" : ""}
      </div>
    </div>
  );
}
