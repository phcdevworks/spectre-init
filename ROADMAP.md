# Spectre Init Roadmap

`@phcdevworks/spectre-init` is the CLI scaffolding tool for the Spectre
ecosystem. It creates new Spectre-based TypeScript/Vite applications from
opinionated templates — structured app development, no framework, no magic.
Its job is to scaffold correctly, not to implement Spectre features itself.

## 1. Current Repo Assessment

### Current strengths

- CLI in place with working build pipeline (TypeScript → NodeNext).
- `templates/` directory provides the scaffolding source.
- `fs-extra` handles file operations cleanly.
- Package published and consumable via `npx @phcdevworks/spectre-init`.
- Interactive prompts (name, type, output dir, confirmation) via `@inquirer/prompts`.
- Post-scaffold output validation confirms required files before `npm install` runs.

### Current gaps to harden

- Template coverage limited to `vanilla` — shell-app template not yet available.
- No integration with `spectre-manifest` — scaffolded projects are not
  registered against the contract system automatically.
- README does not fully document available templates and CLI flags.

## 2. Roadmap

## P0: CLI Completeness / Must-Do

### ~~P0.1 Lint Configuration~~ ✓ Done

ESLint flat config (`eslint.config.ts`) with `typescript-eslint` in place.

### ~~P0.2 Interactive Project Type Selection~~ ✓ Done

Interactive prompts: project name (validated), type selection with descriptions,
output directory (defaults `./`), confirmation summary before file creation.
Non-interactive path (positional arg) preserved for CI/scripting.

### ~~P0.3 CI Pipeline~~ ✓ Done

GitHub Actions CI workflow running `npm run check` against Node 22 and 24 matrix.

### ~~P0.4 Scaffolded Output Validation~~ ✓ Done

`validateScaffold()` checks required files exist after copy, exits before
`npm install` if anything is missing.

## P1: Template Completeness

### P1.1 Shell System Template

Objective Add a scaffolding template for a full Spectre shell application.

Why it matters The shell template is the structured-app path — router + signals
wired from the start. It is the primary deliverable after the vanilla starter.

Suggested deliverables

- Template at `templates/shell-app/` generating a working shell app with routing
- Includes: `bootstrapApp()` entry, route configuration, signal usage example
- New `shell-app` entry in the `PROJECT_TYPES` registry in `src/index.ts`
- Documented in `README.md`

### P1.2 Spectre Manifest Integration

Objective Wire scaffolded projects into the `spectre-manifest` contract system.

Why it matters A scaffolded project that is not registered in the manifest
operates outside the contract enforcement system from day one.

Suggested deliverables

- Scaffolded projects include a starter manifest entry
- Document the manifest registration flow in `README.md`

Dependency notes

- Depends on `spectre-manifest` downstream consumer tooling being in place

## P2: Later / Controlled Improvement

### P2.1 Update Existing Projects

Objective Allow `spectre-init update` to sync an existing project to the latest
template structure.

Suggested deliverables

- `spectre-init update` command that syncs config files without overwriting
  custom application code
- Implement after template coverage is complete and stable

## 3. Explicitly Out of Scope

- Do not implement Spectre features here — this tool only scaffolds
- Do not add runtime code that is imported by generated projects
- Do not add framework logic, UI components, or design tokens
- WordPress scaffolding is out of scope — handled by `spectre-base`

## 4. Recommended Execution Order

1. ~~Lint config~~ ✓ Done
2. ~~CI pipeline~~ ✓ Done
3. ~~Interactive prompts~~ ✓ Done
4. ~~Output validation~~ ✓ Done
5. Shell system template
6. Manifest integration
7. Update command (after templates stable)
