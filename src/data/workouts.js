const BASE = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises";

export const workouts = [
  {
    id: 1,
    day: "Día 1",
    label: "Superior A — Empuje",
    focus: "Pecho · Hombros · Tríceps",
    color: "#FF6B6B",
    exercises: [
      { id: "1-1", name: "Press Barra Plano",          sets: 4, reps: "6–8",      rest: 120, equipment: "Barra",        image: `${BASE}/Barbell_Bench_Press_-_Medium_Grip/0.jpg` },
      { id: "1-2", name: "Press Mancuernas Inclinado", sets: 3, reps: "10",       rest: 90,  equipment: "Mancuernas",   image: `${BASE}/Incline_Dumbbell_Press/0.jpg` },
      { id: "1-3", name: "Press Militar Mancuernas",   sets: 3, reps: "10",       rest: 90,  equipment: "Mancuernas",   image: `${BASE}/Dumbbell_Shoulder_Press/0.jpg` },
      { id: "1-4", name: "Aperturas con Banda",        sets: 3, reps: "15",       rest: 60,  equipment: "Banda",        image: `${BASE}/Dumbbell_Flyes/0.jpg` },
      { id: "1-5", name: "Elevaciones Laterales",      sets: 4, reps: "15",       rest: 60,  equipment: "Mancuernas",   image: `${BASE}/Side_Lateral_Raise/0.jpg` },
      { id: "1-6", name: "Extensión Tríceps Barra",    sets: 3, reps: "12",       rest: 60,  equipment: "Barra",        image: `${BASE}/Lying_Triceps_Press/0.jpg` },
    ],
  },
  {
    id: 2,
    day: "Día 2",
    label: "Inferior A — Cuádriceps",
    focus: "Cuádriceps · Pantorrillas · Core",
    color: "#00B894",
    exercises: [
      { id: "2-1", name: "Sentadilla Barra",             sets: 4, reps: "6–8",      rest: 120, equipment: "Barra",        image: `${BASE}/Barbell_Full_Squat/0.jpg` },
      { id: "2-2", name: "Prensa Piernas con Banda",     sets: 3, reps: "12",       rest: 90,  equipment: "Banda",        image: `${BASE}/Leg_Press/0.jpg` },
      { id: "2-3", name: "Zancadas con Mancuernas",      sets: 3, reps: "10 c/lado",rest: 60,  equipment: "Mancuernas",   image: `${BASE}/Dumbbell_Lunges/0.jpg` },
      { id: "2-4", name: "Extensión Cuádriceps (Banco)", sets: 3, reps: "15",       rest: 45,  equipment: "Banco",        image: `${BASE}/Leg_Extensions/0.jpg` },
      { id: "2-5", name: "Elevación de Pantorrillas",    sets: 4, reps: "20",       rest: 45,  equipment: "Peso corporal",image: `${BASE}/Standing_Calf_Raises/0.jpg` },
      { id: "2-6", name: "Plancha",                      sets: 3, reps: "45 seg",   rest: 45,  equipment: "Peso corporal",image: `${BASE}/Plank/0.jpg` },
    ],
  },
  {
    id: 3,
    day: "Día 3",
    label: "Superior B — Jalón",
    focus: "Espalda · Bíceps",
    color: "#A29BFE",
    exercises: [
      { id: "3-1", name: "Remo Barra Pronado",         sets: 4, reps: "8",        rest: 90, equipment: "Barra",      image: `${BASE}/Bent_Over_Barbell_Row/0.jpg` },
      { id: "3-2", name: "Remo Mancuerna Unilateral",  sets: 3, reps: "10 c/lado",rest: 90, equipment: "Mancuernas", image: `${BASE}/One-Arm_Dumbbell_Row/0.jpg` },
      { id: "3-3", name: "Curl Bíceps Barra",          sets: 3, reps: "10",       rest: 60, equipment: "Barra",      image: `${BASE}/Barbell_Curl/0.jpg` },
      { id: "3-4", name: "Curl Martillo Mancuernas",   sets: 3, reps: "12",       rest: 60, equipment: "Mancuernas", image: `${BASE}/Alternate_Hammer_Curl/0.jpg` },
      { id: "3-5", name: "Face Pulls con Banda",       sets: 3, reps: "15",       rest: 45, equipment: "Banda",      image: `${BASE}/Face_Pull/0.jpg` },
      { id: "3-6", name: "Encogimientos de Hombros",   sets: 3, reps: "15",       rest: 45, equipment: "Mancuernas", image: `${BASE}/Dumbbell_Shrug/0.jpg` },
    ],
  },
  {
    id: 4,
    day: "Día 4",
    label: "Inferior B — Cadera",
    focus: "Isquios · Glúteos · Core",
    color: "#FDCB6E",
    exercises: [
      { id: "4-1", name: "Peso Muerto Barra",          sets: 4, reps: "5",        rest: 120, equipment: "Barra",      image: `${BASE}/Barbell_Deadlift/0.jpg` },
      { id: "4-2", name: "Hip Thrust con Mancuerna",   sets: 4, reps: "12",       rest: 90,  equipment: "Mancuernas", image: `${BASE}/Barbell_Hip_Thrust/0.jpg` },
      { id: "4-3", name: "Curl Femoral con Bandas",    sets: 3, reps: "15",       rest: 60,  equipment: "Banda",      image: `${BASE}/Lying_Leg_Curls/0.jpg` },
      { id: "4-4", name: "Buenos Días Barra",          sets: 3, reps: "12",       rest: 90,  equipment: "Barra",      image: `${BASE}/Good_Morning/0.jpg` },
      { id: "4-5", name: "Sentadilla Goblet Mancuerna",sets: 3, reps: "12",       rest: 60,  equipment: "Mancuernas", image: `${BASE}/Goblet_Squat/0.jpg` },
      { id: "4-6", name: "Crunch con Peso",            sets: 3, reps: "15",       rest: 45,  equipment: "Mancuernas", image: `${BASE}/Cable_Crunch/0.jpg` },
    ],
  },
];
