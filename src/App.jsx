import { useState, useEffect } from "react";
import { workouts } from "./data/workouts";
import WorkoutDay from "./components/WorkoutDay";
import "./App.css";

export default function App() {
  const [activeDay, setActiveDay] = useState(0);

  const [completedDays, setCompletedDays] = useState(() =>
    workouts.map((w) => {
      try {
        const checked = JSON.parse(localStorage.getItem(`fba_checked_${w.id}`) || '{}');
        return w.exercises.every((e) => checked[e.id]);
      } catch { return false; }
    })
  );

  useEffect(() => {
    const onStorage = () => {
      setCompletedDays(workouts.map((w) => {
        try {
          const checked = JSON.parse(localStorage.getItem(`fba_checked_${w.id}`) || '{}');
          return w.exercises.every((e) => checked[e.id]);
        } catch { return false; }
      }));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    setCompletedDays(workouts.map((w) => {
      try {
        const checked = JSON.parse(localStorage.getItem(`fba_checked_${w.id}`) || '{}');
        return w.exercises.every((e) => checked[e.id]);
      } catch { return false; }
    }));
  }, [activeDay]);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Fabian</h1>
        <p className="app-subtitle">Tu rutina personal · 4 días</p>
        <a
          className="yt-link"
          href="https://youtube.com/watch?v=UCD7Hnx_THQ&si=uFimDF_CMwkl3qJW"
          target="_blank"
          rel="noopener noreferrer"
        >
          ▶ Ver rutina en YouTube
        </a>
      </header>

      <nav className="day-tabs">
        {workouts.map((w, i) => (
          <button
            key={w.id}
            className={`day-tab ${activeDay === i ? "active" : ""}`}
            style={activeDay === i ? { background: w.color, color: "#fff" } : {}}
            onClick={() => setActiveDay(i)}
          >
            {w.day}
            {completedDays[i] && <span className="tab-done-dot" />}
          </button>
        ))}
      </nav>

      <main className="app-main">
        <WorkoutDay
          key={activeDay}
          workout={workouts[activeDay]}
          onDayComplete={() =>
            setCompletedDays((prev) => {
              const next = [...prev];
              next[activeDay] = true;
              return next;
            })
          }
        />
      </main>
    </div>
  );
}
