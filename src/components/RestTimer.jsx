import { useState, useEffect, useRef } from "react";

const PRESETS = [30, 60, 90, 120];

function playBeep(audioCtxRef) {
        try {
                    if (!audioCtxRef.current) {
                                    audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
                    }
                    const ctx = audioCtxRef.current;
                    if (ctx.state === "suspended") ctx.resume();
                    const times = [0, 0.25, 0.5];
                    times.forEach((offset) => {
                                    const osc = ctx.createOscillator();
                                    const gain = ctx.createGain();
                                    osc.connect(gain);
                                    gain.connect(ctx.destination);
                                    osc.frequency.value = 880;
                                    osc.type = "sine";
                                    gain.gain.setValueAtTime(1, ctx.currentTime + offset);
                                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + 0.2);
                                    osc.start(ctx.currentTime + offset);
                                    osc.stop(ctx.currentTime + offset + 0.2);
                    });
        } catch (e) {
                    console.error("Audio error:", e);
        }
}

function notifyDone(audioCtxRef) {
        playBeep(audioCtxRef);
        if ("Notification" in window && Notification.permission === "granted") {
                    new Notification("YAHAIRA FIT — Descanso terminado", {
                                    body: "¡A por la siguiente serie!",
                                    icon: "/Fabian/favicon.svg",
                                    silent: false,
                    });
        }
}

export default function RestTimer({ onClose, autoStart = false }) {
        const [duration, setDuration] = useState(60);
        const [timeLeft, setTimeLeft] = useState(60);
        const [running, setRunning] = useState(false);
        const intervalRef = useRef(null);
        const endTimeRef = useRef(null);
        const audioCtxRef = useRef(null);

    // Crear AudioContext al montar (tras interaccion del usuario) y pedir permiso
    useEffect(() => {
                audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
                if ("Notification" in window && Notification.permission === "default") {
                                Notification.requestPermission();
                }
                if (autoStart) {
                                endTimeRef.current = Date.now() + 60 * 1000;
                                setRunning(true);
                }
                return () => {
                                if (audioCtxRef.current) audioCtxRef.current.close();
                };
    }, []);

    useEffect(() => {
                if (running) {
                                intervalRef.current = setInterval(() => {
                                                    const remaining = Math.round((endTimeRef.current - Date.now()) / 1000);
                                                    if (remaining <= 0) {
                                                                            clearInterval(intervalRef.current);
                                                                            setTimeLeft(0);
                                                                            setRunning(false);
                                                                            notifyDone(audioCtxRef);
                                                    } else {
                                                                            setTimeLeft(remaining);
                                                    }
                                }, 500);
                } else {
                                clearInterval(intervalRef.current);
                }
                return () => clearInterval(intervalRef.current);
                                }, [running]);

    function selectPreset(secs) {
                setDuration(secs);
                setTimeLeft(secs);
                setRunning(false);
                endTimeRef.current = null;
    }

    function toggle() {
                if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
                                audioCtxRef.current.resume();
                }
                if (timeLeft === 0) {
                                endTimeRef.current = Date.now() + duration * 1000;
                                setTimeLeft(duration);
                                setRunning(true);
                } else {
                                if (!running) {
                                                    endTimeRef.current = Date.now() + timeLeft * 1000;
                                }
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
                                                    <h3 className="timer-title">Descanso</h3>h3>
                                                <div className="timer-presets">
                                                    {PRESETS.map((s) => (
                                            <button
                                                                            key={s}
                                                                            className={`preset-btn ${duration === s ? "active" : ""}`}
                                                                            onClick={() => selectPreset(s)}
                                                                        >
                                                {s}s
                                            </button>button>
                                        ))}
                                                </div>div>
                                                <div className="timer-circle-wrap">
                                                                    <svg width="140" height="140" viewBox="0 0 140 140">
                                                                                            <circle cx="70" cy="70" r={radius} fill="none" stroke="#2a2a3a" strokeWidth="10" />
                                                                                            <circle
                                                                                                                            cx="70" cy="70" r={radius} fill="none"
                                                                                                                            stroke={timeLeft === 0 ? "#4ECDC4" : "#FF6B6B"}
                                                                                                                            strokeWidth="10"
                                                                                                                            strokeDasharray={`${strokeDash} ${circumference}`}
                                                                                                                            strokeLinecap="round"
                                                                                                                            transform="rotate(-90 70 70)"
                                                                                                                            style={{ transition: "stroke-dasharray 0.5s ease" }}
                                                                                                                        />
                                                                    </svg>svg>
                                                                    <span className="timer-label">{timeLeft === 0 ? "¡Listo!" : label}</span>span>
                                                </div>div>
                                                <div className="timer-actions">
                                                                    <button className="timer-btn secondary" onClick={reset}>Reiniciar</button>button>
                                                                    <button className="timer-btn primary" onClick={toggle}>
                                                                        {running ? "Pausar" : timeLeft === 0 ? "Repetir" : "Iniciar"}
                                                                    </button>button>
                                                </div>div>
                                                <button className="timer-close" onClick={onClose}>Cerrar</button>button>
                                </div>div>
                </div>div>
            );
}</h3>
