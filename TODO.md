# Spectre Init Execution Todo

Scoped to TS/Vite/Vanilla structured app scaffolding. Aligned to `ROADMAP.md`.

---

## Phase 1 - Foundation: Completed

- [x] ESLint flat config — `eslint.config.ts` with `tseslint.config()`, `jiti` installed, `npm run lint` and `npm run format` working.
- [x] GitHub Actions CI pipeline — runs `npm run check` on push and PR against Node 22/24 matrix.
- [x] Post-scaffold output validation — `validateScaffold()` checks required files exist before `npm install` runs.
- [x] Interactive prompts — name (validated), type selection with descriptions, output directory (defaults `./`), confirmation summary. Non-interactive arg path preserved.

---

## Phase 2 - Active Development

### P1: Template Completeness

- [x] Add shell system scaffolding template
  - File targets: `templates/shell-app/`, `src/index.ts`, `README.md`
  - Acceptance criteria:
    - Template generates a working shell app with shell + router + signals wired
    - Includes `bootstrapApp()` entry, route configuration, and a signal usage example
    - New `shell-app` entry added to the `PROJECT_TYPES` registry
    - Documented in README

- Wire manifest integration into scaffolded output
  - File targets: `src/index.ts`, relevant template files, `README.md`
  - Acceptance criteria:
    - Scaffolded projects include a starter manifest entry
    - README documents how to register the project in `spectre-manifest`
  - Blocked until `spectre-manifest` downstream tooling is in place

### P2: Later / Controlled Improvement

- Add `spectre-init update` command
  - File targets: `src/index.ts` or new command module
  - Acceptance criteria:
    - Updates config files in an existing Spectre project to latest template
    - Does not overwrite custom application code
    - Implement after templates are stable

---

## Recommended Execution Order

1. ~~Lint config~~ - Done
2. ~~CI pipeline~~ - Done
3. ~~Interactive prompts~~ - Done
4. ~~Output validation~~ - Done
5. ~~Shell system template~~ - Done
6. Manifest integration
7. Update command (after templates stable)

## Explicitly Out of Scope

- Do not implement Spectre features in this package
- Do not add runtime code imported by generated projects
- Do not add framework logic, UI components, or design tokens
- WordPress scaffolding — handled by `spectre-base`
