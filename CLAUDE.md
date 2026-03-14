# CLAUDE.md — AI Assistant Guide for FBA Fit

This file provides context and conventions for AI assistants (Claude and others) working in this repository.

---

## Repository Overview

- **Repo name:** Fabian (FBA Fit)
- - **Remote:** yahairaarroyo2-alt/Fabian
  - - **Current state:** Active project with full React + Vite source code
    - - **Primary branch:** `main`
      - - **Deploy:** GitHub Pages (auto-deploy via GitHub Actions on push to `main`)
        - - **Live URL:** https://yahairaarroyo2-alt.github.io/Fabian/
         
          - ---

          ## Technology Stack

          | Layer | Technology |
          |-------|-----------|
          | Language | JavaScript (JSX) |
          | Framework | React 19 |
          | Build tool | Vite |
          | Styles | CSS (plain, no frameworks) |
          | CI/CD | GitHub Actions |
          | Package manager | npm |

          ---

          ## Project Structure

          ```
          Fabian/
          ├── .github/
          │   └── workflows/           # GitHub Actions — deploys to GitHub Pages
          ├── docs/
          │   └── workout-standalone.html  # Standalone HTML version (no React dependency)
          ├── public/
          │   └── favicon.svg          # App favicon (referenced in index.html)
          ├── src/
          │   ├── assets/              # Static images used in the app
          │   │   └── hero.png
          │   ├── components/          # React UI components
          │   │   ├── ExerciseCard.jsx # Individual exercise with 2-frame animation
          │   │   ├── RestTimer.jsx    # Auto-start rest timer between sets
          │   │   └── WorkoutDay.jsx   # Full day workout layout
          │   ├── data/
          │   │   └── workouts.js      # 4-day Upper/Lower workout data
          │   ├── App.jsx              # Root component with day tab navigation
          │   ├── App.css              # Component styles
          │   ├── index.css            # Global styles
          │   └── main.jsx             # React entry point
          ├── index.html               # Vite entry point (do not move)
          ├── package.json
          ├── vite.config.js
          ├── eslint.config.js
          ├── CLAUDE.md                # This file
          └── README.md
          ```

          ---

          ## Development Branch Convention

          Branch names follow this pattern: `claude/<short-task-description>-<session-id>`

          Examples:
          - `claude/add-claude-documentation-H9YWk`
          - - `claude/fix-auth-bug-X3Kpq`
           
            - Rules:
            - - Always develop on the designated feature branch
              - - Never push directly to `main` without explicit permission
                - - Branch names must start with `claude/` for automated workflows
                 
                  - ---

                  ## Git Workflow

                  ### Creating and switching to a branch
                  ```bash
                  git checkout -b claude/<task>-<id>
                  ```

                  ### Committing work
                  Write clear, descriptive commit messages in imperative mood:
                  - `Add initial project structure`
                  - - `Fix null pointer in order processor`
                    - - `Refactor payment service to use dependency injection`
                     
                      - ### Pushing a branch
                      - ```bash
                        git push -u origin <branch-name>
                        ```

                        Retry on network failure with exponential backoff: 2s → 4s → 8s → 16s (max 4 retries).

                        ---

                        ## Development Setup

                        ```bash
                        # 1. Clone the repository
                        git clone https://github.com/yahairaarroyo2-alt/Fabian.git
                        cd Fabian

                        # 2. Install dependencies
                        npm install

                        # 3. Run development server
                        npm run dev

                        # 4. Build for production
                        npm run build

                        # 5. Preview production build
                        npm run preview
                        ```

                        ---

                        ## Working With This Repository as an AI Assistant

                        ### Before making changes
                        - Read relevant source files before editing them
                        - - Understand the existing patterns before introducing new ones
                          - - Check for tests that cover the area you are changing
                           
                            - ### When implementing features
                            - - Keep changes minimal and focused on the task
                              - - Do not refactor unrelated code
                                - - Do not add comments, docstrings, or type annotations to code you did not change
                                  - - Prefer editing existing files over creating new ones
                                    - - Do not add error handling for scenarios that cannot happen
                                     
                                      - ### When committing
                                      - - Stage only files directly related to the task
                                        - - Write commit messages in imperative mood
                                          - - Do not commit `.env`, credentials, or secrets
                                           
                                            - ### When pushing
                                            - - Use `git push -u origin <branch-name>`
                                              - - Confirm the branch starts with `claude/` to avoid 403 errors
                                                - - Retry on network failure with exponential backoff (max 4 retries)
                                                 
                                                  - ---

                                                  ## Actions requiring user confirmation before proceeding

                                                  - Pushing to `main` or protected branches
                                                  - - Force push (`--force`)
                                                    - - Deleting branches or files
                                                      - - Any destructive or irreversible operation
                                                        - - Modifying CI/CD pipelines
