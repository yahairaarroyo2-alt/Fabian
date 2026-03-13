import { useState } from "react";

export default function ExerciseCard({ exercise, checked, onToggle, accentColor }) {
  const [showImage, setShowImage] = useState(false);

  function handleImageToggle(e) {
    e.stopPropagation();
    setShowImage((prev) => !prev);
  }

  return (
    <div
      className={`exercise-card ${checked ? "done" : ""}`}
      onClick={onToggle}
    >
      <div className="exercise-info">
        <span className="exercise-name">{exercise.name}</span>
        <span className="exercise-meta">
          {exercise.sets} series · {exercise.reps} reps
        </span>
        <span className="exercise-equipment">{exercise.equipment}</span>
        {exercise.image && (
          <button
            className="exercise-img-btn"
            style={{ color: accentColor }}
            onClick={handleImageToggle}
          >
            {showImage ? "▲ Ocultar" : "▼ Ver ejercicio"}
          </button>
        )}
        {showImage && exercise.image && (
          <img
            src={exercise.image}
            alt={exercise.name}
            className="exercise-gif"
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </div>
      <div
        className={`exercise-check ${checked ? "checked" : ""}`}
        style={checked ? { background: accentColor, borderColor: accentColor } : { borderColor: accentColor + "66" }}
      >
        {checked ? "✓" : ""}
      </div>
    </div>
  );
}
