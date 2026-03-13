import { useState, useEffect, useRef } from "react";

const PRESETS = [30, 60, 90, 120];

export default function RestTimer({ onClose }) {
  const [duration, setDuration] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  function selectPreset(secs) {
    setDuration(secs);
    setTimeLeft(secs);
    setRunning(false);
  }

  function toggle() {
    if (timeLeft === 0) {
      setTimeLeft(duration);
      setRunning(true);
    } else {
      setRunning((r) => !r);
    }
  }

  function reset() {
    setRunning(false);
    setTimeLeft(duration);
  }

  const progress = timeLeft / duration;
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = circumference * progress;

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const label = mins > 0 ? `${mins}:${String(secs).padStart(2, "0")}` : `${secs}s`;

  return (
    <div className="timer-overlay" onClick={onClose}>
      <div className="timer-card" onClick={(e) => e.stopPropagation()}>
        <h3 className="timer-title">Descanso</h3>

        <div className="timer-presets">
          {PRESETS.map((s) => (
            <button
              key={s}
              className={`preset-btn ${duration === s ? "active" : ""}`}
              onClick={() => selectPreset(s)}
            >
              {s}s
            </button>
          ))}
        </div>

        <div className="timer-circle-wrap">
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r={radius} fill="none" stroke="#2a2a3a" strokeWidth="10" />
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke={timeLeft === 0 ? "#4ECDC4" : "#FF6B6B"}
              strokeWidth="10"
              strokeDasharray={`${strokeDash} ${circumference}`}
              strokeLinecap="round"
              transform="rotate(-90 70 70)"
              style={{ transition: "stroke-dasharray 0.5s ease" }}
            />
          </svg>
          <span className="timer-label">{timeLeft === 0 ? "¡Listo!" : label}</span>
        </div>

        <div className="timer-actions">
          <button className="timer-btn secondary" onClick={reset}>
            Reiniciar
          </button>
          <button className="timer-btn primary" onClick={toggle}>
            {running ? "Pausar" : timeLeft === 0 ? "Repetir" : "Iniciar"}
          </button>
        </div>

        <button className="timer-close" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}
