import { useState } from "react";
import { workouts } from "./data/workouts";
import WorkoutDay from "./components/WorkoutDay";
import "./App.css";

export default function App() {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">FBA</h1>
        <p className="app-subtitle">Upper · Lower · 4 días</p>
      </header>

      <nav className="day-tabs">
        {workouts.map((w, i) => (
          <button
            key={w.id}
            className={`day-tab ${activeDay === i ? "active" : ""}`}
            style={activeDay === i ? { borderBottomColor: w.color, color: w.color } : {}}
            onClick={() => setActiveDay(i)}
          >
            <span className="tab-day">{w.day}</span>
            <span className="tab-label">{w.label}</span>
          </button>
        ))}
      </nav>

      <main className="app-main">
        <WorkoutDay key={activeDay} workout={workouts[activeDay]} />
      </main>
    </div>
  );
}
