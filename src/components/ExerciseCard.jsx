import { useState, useEffect, useRef } from "react";

const NON_WEIGHTED = ["Peso corporal", "Banco"];

export default function ExerciseCard({
  exercise,
  checked,
  onToggle,
  accentColor,
  onOpenTimer,
  onOpenWeight,
  repsDone,
  lastWeight,
}) {
  const [showImage, setShowImage] = useState(false);
  const [frame, setFrame] = useState(0);
  const [imgState, setImgState] = useState('loading'); // 'loading' | 'loaded' | 'error'
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
    setImgState('loading');
  }

  function handleOpenTimer(e) {
    e.stopPropagation();
    onOpenTimer(exercise.rest ?? 60);
  }

  function handleOpenWeight(e) {
    e.stopPropagation();
    onOpenWeight();
  }

  const isWeighted = !NON_WEIGHTED.includes(exercise.equipment);

  return (
    <div
      className={`exercise-card ${checked ? "done" : ""}`}
      onClick={onToggle}
    >
      <div className="exercise-info">
        <span className="exercise-name">{exercise.name}</span>

        {/* Chips row */}
        <div className="ex-chips">
          <span className="chip chip-sets">📊 {exercise.sets} × {exercise.reps}</span>
          <span className="chip chip-rest">⏱ {exercise.rest ?? 60}s</span>
          <span className="chip chip-equip">🏋 {exercise.equipment}</span>
          {isWeighted && (
            <button
              className="chip chip-weight"
              onClick={handleOpenWeight}
            >
              {lastWeight != null ? `${lastWeight} kg` : "＋ Peso"}
            </button>
          )}
        </div>

        {/* Set dots */}
        <div className="set-dots">
          {Array.from({ length: exercise.sets }).map((_, i) => (
            <span
              key={i}
              className={`set-dot ${i < repsDone ? "done" : ""}`}
              style={i < repsDone ? { background: accentColor } : {}}
            />
          ))}
        </div>

        {/* Action buttons */}
        <div className="ex-acts">
          <button className="ex-btn btn-view" onClick={handleImageToggle}>
            🎬 Ver ejercicio
          </button>
          <button className="ex-btn btn-rest" onClick={handleOpenTimer}>
            ⏱ Descanso
          </button>
        </div>

        {/* Feature 6: Image with loading/error state */}
        {showImage && exercise.image && (
          <div className="exercise-gif-wrap" onClick={(e) => e.stopPropagation()}>
            {imgState === 'loading' && (
              <div className="gif-loading"><div className="gif-spinner" /><span>Cargando…</span></div>
            )}
            {imgState === 'error' && (
              <div className="gif-err">
                <span>📹</span>
                <p>GIF no disponible</p>
              </div>
            )}
            <img
              src={exercise.image.replace('/0.jpg', `/${frame}.jpg`)}
              alt={exercise.name}
              className="exercise-gif"
              style={imgState !== 'loaded' ? { display: 'none' } : {}}
              onLoad={() => setImgState('loaded')}
              onError={() => setImgState('error')}
            />
          </div>
        )}
      </div>
      <div
        className={`exercise-check ${checked ? "checked" : ""}`}
        style={
          checked
            ? { background: accentColor, borderColor: accentColor }
            : { borderColor: accentColor + "66" }
        }
      >
        {checked ? "✓" : ""}
      </div>
    </div>
  );
}
