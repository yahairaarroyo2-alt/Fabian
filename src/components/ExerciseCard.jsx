import { useState, useEffect, useRef } from "react";

export default function ExerciseCard({ exercise, checked, onToggle, accentColor }) {
  const [showImage, setShowImage] = useState(false);
  const [frame, setFrame] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (showImage && exercise.image) {
      intervalRef.current = setInterval(() => {
        setFrame((f) => (f === 0 ? 1 : 0));
      }, 900);
    } else {
      clearInterval(intervalRef.current);
      setFrame(0);
    }
    return () => clearInterval(intervalRef.current);
  }, [showImage, exercise.image]);

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
          <div className="exercise-gif-wrap" onClick={(e) => e.stopPropagation()}>
            <img
              src={exercise.image.replace("/0.jpg", `/${frame}.jpg`)}
              alt={exercise.name}
              className="exercise-gif"
            />
          </div>
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
