# YAHAIRA FIT — App de Rutinas de Entrenamiento

Aplicación web de rutinas de entrenamiento personal, construida con **React + Vite**.

## ¿Qué hace?

- Muestra una rutina Upper/Lower de 4 días personalizada
- - Cada ejercicio tiene sets, reps, equipo y animación de 2 frames
  - - Temporizador de descanso automático entre series
    - - Interfaz responsive optimizada para móvil
     
      - ## Stack
     
      - | Capa | Tecnología |
      - |------|-----------|
      - | UI | React 19 |
      - | Build | Vite |
      - | Estilos | CSS puro |
      - | Deploy | GitHub Pages |
     
      - ## Estructura del proyecto
     
      - ```
        Fabian/
        ├── src/
        │   ├── assets/          # Imágenes estáticas (hero.png)
        │   ├── components/      # Componentes React
        │   │   ├── ExerciseCard.jsx
        │   │   ├── RestTimer.jsx
        │   │   └── WorkoutDay.jsx
        │   ├── data/
        │   │   └── workouts.js  # Datos de los 4 días de rutina
        │   ├── App.jsx
        │   ├── App.css
        │   ├── index.css
        │   └── main.jsx
        ├── docs/
        │   └── workout-standalone.html  # Versión HTML estática sin React
        ├── public/
        │   └── favicon.svg
        ├── index.html
        ├── package.json
        └── vite.config.js
        ```

        ## Cómo correr el proyecto

        ```bash
        # 1. Instalar dependencias
        npm install

        # 2. Servidor de desarrollo
        npm run dev

        # 3. Build para producción
        npm run build

        # 4. Preview del build
        npm run preview
        ```

        ## Deploy

        El proyecto se despliega automáticamente en **GitHub Pages** mediante GitHub Actions al hacer push a `main`.

        URL: [https://yahairaarroyo2-alt.github.io/Fabian/](https://yahairaarroyo2-alt.github.io/Fabian/)
