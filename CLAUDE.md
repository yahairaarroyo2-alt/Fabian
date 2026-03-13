# CLAUDE.md — AI Assistant Guide for FBA

This file provides context and conventions for AI assistants (Claude and others) working in this repository.

> **Note:** This repository is currently in its initial state with no committed source code. Update this file as the project evolves to keep it accurate.

---

## Repository Overview

- **Repo name:** FBA
- **Remote:** `yahairaarroyo2-alt/FBA`
- **Current state:** Newly initialized — no source files committed yet
- **Primary branch:** `main` (expected; establish on first push)

---

## Development Branch Convention

Branch names follow this pattern:

```
claude/<short-task-description>-<session-id>
```

Examples:
- `claude/add-claude-documentation-H9YWk`
- `claude/fix-auth-bug-X3Kpq`

Rules:
- Always develop on the designated feature branch
- Never push directly to `main` without explicit permission
- Branch names must start with `claude/` for automated workflows

---

## Git Workflow

### Creating and switching to a branch
```bash
git checkout -b claude/<task>-<id>
```

### Committing work
Write clear, descriptive commit messages in imperative mood:
```
Add initial project structure
Fix null pointer in order processor
Refactor payment service to use dependency injection
```

### Pushing a branch
```bash
git push -u origin <branch-name>
```

Retry on network failure with exponential backoff: 2s → 4s → 8s → 16s (max 4 retries).

### Pull requests
Open a PR from your feature branch into `main`. Include:
- A clear title (under 70 characters)
- Summary of what changed and why
- Test plan with verification steps

---

## Project Structure (to be populated)

Once source files are committed, document the layout here. Example template:

```
FBA/
├── src/                  # Application source code
│   ├── components/       # UI or service components
│   ├── services/         # Business logic / integrations
│   └── utils/            # Shared helpers and utilities
├── tests/                # Automated test suites
├── docs/                 # Additional documentation
├── .github/              # CI/CD workflows (GitHub Actions)
├── .env.example          # Environment variable template
├── CLAUDE.md             # This file
└── README.md             # Human-facing project overview
```

---

## Technology Stack (to be determined)

Document the stack once the project is bootstrapped. Common items to capture:

| Layer | Technology | Notes |
|-------|-----------|-------|
| Language | TBD | |
| Framework | TBD | |
| Database | TBD | |
| Testing | TBD | |
| CI/CD | TBD | |
| Package manager | TBD | |

---

## Development Setup (to be documented)

Once established, document the setup steps here. Template:

```bash
# 1. Clone the repository
git clone <repo-url>
cd FBA

# 2. Install dependencies
<package-manager> install

# 3. Configure environment
cp .env.example .env
# Edit .env with your local values

# 4. Run the application
<start-command>

# 5. Run tests
<test-command>
```

---

## Testing Conventions (to be established)

Once a testing framework is chosen, document:
- Test file naming patterns (e.g., `*.test.ts`, `test_*.py`)
- Where to place tests (co-located vs. `tests/` directory)
- How to run the full test suite
- How to run a single test
- Coverage requirements (if any)

---

## Code Conventions (to be established)

Once the language and linting tools are chosen, document:
- Formatter and linter commands
- Code style rules or config file locations
- Import ordering conventions
- Naming conventions (functions, classes, constants, files)

---

## Environment Variables

Document all required environment variables in `.env.example`. Never commit secrets or credentials.

When adding a new env var:
1. Add it to `.env.example` with a placeholder or description
2. Document its purpose in this file or inline
3. Update CI/CD secrets if needed

---

## Key Architectural Decisions (to be documented)

Record important decisions (ADRs) here or in a `docs/decisions/` directory:

```
## Decision: <title>
**Date:** YYYY-MM-DD
**Status:** Accepted / Superseded / Deprecated
**Context:** Why this decision was needed
**Decision:** What was decided
**Consequences:** Trade-offs and implications
```

---

## Working With This Repository as an AI Assistant

### Before making changes
1. Read relevant source files before editing them
2. Understand the existing patterns before introducing new ones
3. Check for tests that cover the area you are changing

### When implementing features
- Keep changes minimal and focused on the task
- Do not refactor unrelated code
- Do not add comments, docstrings, or type annotations to code you did not change
- Prefer editing existing files over creating new ones
- Do not add error handling for scenarios that cannot happen

### When committing
- Stage only files directly related to the task
- Write commit messages in imperative mood
- Do not commit `.env`, credentials, or secrets

### When pushing
- Use `git push -u origin <branch-name>`
- Confirm the branch starts with `claude/` to avoid 403 errors
- Retry on network failure with exponential backoff (max 4 retries)

### Actions requiring user confirmation before proceeding
- Pushing to `main` or protected branches
- Force push (`--force`)
- Deleting branches or files
- Any destructive or irreversible operation
- Modifying CI/CD pipelines

---

## Updating This File

Keep CLAUDE.md current as the project evolves:
- Update the tech stack table when frameworks are chosen
- Fill in the project structure when directories are created
- Document setup steps when the project can be run locally
- Add testing and code conventions when tooling is configured
- Record architectural decisions when significant choices are made
