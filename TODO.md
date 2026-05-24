# Spectre Init Execution Todo

This todo list is aligned to the current repository and the roadmap in
`ROADMAP.md`. It is scoped to CLI completeness, interactive prompts, template
coverage, and CI.

---

## Phase 1 - Foundation: Completed

All Phase 1 items have been delivered.

### P0: Tooling and CI

- [x] Add ESLint configuration -- `eslint.config.ts` with `tseslint.config()`,
  `jiti` installed, `npm run lint` and `npm run format` working.

- [x] Add GitHub Actions CI pipeline
  - CI runs `npm run check` on push and PR against Node 22/24 matrix.
  - Smoke test (scaffold + validate output) remains an open enhancement
    tracked in Phase 2 under P1.

---

## Phase 2 - Active Development

### P0: CLI Completeness / Must-Do

- Add interactive prompts for project type selection
  - File targets: `src/index.ts`, `package.json` (prompt library), `README.md`
  - Acceptance criteria:
    - User is prompted to choose a project type
    - User is prompted for project name and output directory
    - Confirmation summary displays before any files are written
    - Prompts are clear and include descriptions of each project type

- Add WordPress theme scaffolding template
  - File targets: `templates/wordpress-theme/`, `src/index.ts`, `README.md`
  - Acceptance criteria:
    - Template generates a valid `spectre-wordpress-themes` project structure
    - Generated project includes Vite config, TypeScript entry, Tailwind setup,
      `spectre-theme/` skeleton, and `package.json` with correct dependencies
    - Documented in README

### P1: Template Completeness

- Add shell system scaffolding template
  - File targets: `templates/shell-app/`, `src/index.ts`, `README.md`
  - Acceptance criteria:
    - Template generates a working shell app with shell + router + signals wired
    - Generated project includes `bootstrapApp()` entry, route configuration,
      and a signal usage example
    - Documented in README

- Wire manifest integration into scaffolded output
  - File targets: `src/index.ts`, relevant template files, `README.md`
  - Acceptance criteria:
    - Scaffolded projects include a starter manifest entry
    - README documents how to register the project in `spectre-manifest`

- [x] Add post-scaffold output validation
  - `validateScaffold()` in `src/index.ts` checks all required template files
    exist in the target directory after copy. Missing files are reported and
    the process exits before `npm install` runs.

### P2: Later / Controlled Improvement

- Add WordPress plugin scaffolding template
  - File targets: `templates/wordpress-plugin/`, `src/index.ts`
  - Acceptance criteria:
    - Template follows the `spectre-icons` plugin pattern
    - Implement when the plugin pattern is proven and repeatable

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
3. Interactive prompts
4. WordPress theme template
5. Shell system template
6. Manifest integration
7. ~~Output validation~~ - Done
8. Plugin template (when pattern proven)
9. Update command (after templates stable)

## Explicitly Out of Scope

- Do not implement Spectre features in this package
- Do not add runtime code imported by generated projects
- Do not add framework logic or UI components
