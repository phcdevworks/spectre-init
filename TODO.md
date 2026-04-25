# Spectre Init Execution Todo

This todo list is aligned to the current repository and the roadmap in
`ROADMAP.md`. It is scoped to lint configuration, interactive CLI, template
coverage, and CI.

## P0: Template Coverage and CLI Completeness / Must-Do

- Add eslint configuration File targets:
  - `eslint.config.ts` (new file)
  - `package.json` (add eslint devDependencies and lint/format scripts) Acceptance
    criteria:
  - `eslint.config.ts` uses `tseslint.config()` pattern
  - `npm run lint` runs without errors
  - `npm run format` runs without errors

- Add interactive prompts for project type selection File targets:
  - `src/index.ts`
  - `package.json` (prompt library dependency)
  - `README.md` Acceptance criteria:
  - User is prompted to choose a project type
  - User is prompted for project name and output directory
  - Confirmation summary displays before any files are written
  - Prompts are clear and include descriptions of each project type

- Add WordPress theme scaffolding template File targets:
  - `templates/wordpress-theme/`
  - `src/index.ts` (register template)
  - `README.md` Acceptance criteria:
  - Template generates a valid `spectre-wordpress-themes` project structure
  - Generated project includes Vite config, TypeScript entry, Tailwind setup,
    `spectre-theme/` skeleton, and `package.json` with correct dependencies
  - Documented in README

- Add GitHub Actions CI pipeline File targets:
  - `.github/workflows/ci.yml` Acceptance criteria:
  - CI runs `npm run build` on push and PR
  - Optional: smoke test runs CLI against each template and validates output
    structure

## P1: Template Completeness

- Add shell system scaffolding template File targets:
  - `templates/shell-app/`
  - `src/index.ts` (register template)
  - `README.md` Acceptance criteria:
  - Template generates a working shell app with shell + router + signals wired
  - Generated project includes `bootstrapApp()` entry, route configuration,
    and a signal usage example
  - Documented in README

- Wire manifest integration into scaffolded output File targets:
  - `src/index.ts`
  - relevant template files
  - `README.md` Acceptance criteria:
  - Scaffolded projects include a starter manifest entry
  - README documents how to register the project in `spectre-manifest`

- Add post-scaffold output validation File targets:
  - `src/index.ts` or validation module
  - CI smoke test Acceptance criteria:
  - Required files are confirmed present after scaffolding
  - Missing or unexpected files are reported clearly

## P2: Later / Controlled Improvement

- Add WordPress plugin scaffolding template File targets:
  - `templates/wordpress-plugin/`
  - `src/index.ts` (register template) Acceptance criteria:
  - Template follows the `spectre-icons` plugin pattern
  - Implement when the plugin pattern is proven and repeatable

- Add `spectre-init update` command File targets:
  - `src/index.ts` or new command module Acceptance criteria:
  - Updates config files in an existing Spectre project to latest template
  - Does not overwrite custom application code
  - Implement after templates are stable

## Explicitly Out of Scope

- Do not implement Spectre features in this package
- Do not add runtime code imported by generated projects
- Do not add framework logic or UI components

## Recommended Execution Order

1. Lint config
2. Interactive prompts
3. WordPress theme template
4. CI pipeline
5. Shell system template
6. Manifest integration
7. Output validation
8. Plugin template (when pattern proven)
9. Update command (after templates stable)
