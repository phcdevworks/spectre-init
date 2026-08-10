# Changelog

All notable changes to this project will be documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the versioning reflects package releases.

## [Unreleased]

### Added

- Added `astro` template — an Astro starter wiring `@phcdevworks/spectre-ui-astro`
  components (`SpButton`, `SpCard`) with a shared `BaseLayout.astro`. New `astro`
  entry in the `PROJECT_TYPES` registry.
- Added a starter `spectre.manifest.json` to all three templates, declaring the
  scaffolded app as a single package that depends on the Spectre packages the
  template wires up. `spectre-init` renames the manifest's package entry,
  `system.name`, and `$id` to the scaffolded project name, the same way it
  patches `package.json`. README documents the manifest registration flow
  (`spectre-manifest-validate` / `spectre-manifest-check`).
- Added `spectre-init update [path]` command. Detects the project's template
  from its `@phcdevworks/*` dependencies, overwrites boilerplate config files
  (`.gitignore`, `AGENTS.md`, `tsconfig.json`, `vite.config.ts`/`astro.config.ts`,
  `spectre.manifest.json`), and bumps version pins for dependencies the
  project already declares to match the current template. Never touches
  `src/`, `package.json` scripts/name, or adds dependencies the project
  doesn't already have.

### Changed

- `PROJECT_TYPES` entries now declare their own `requiredFiles` list;
  `validateScaffold()` checks per-type required files instead of one shared
  Vite-shaped list, since the `astro` template has no `index.html`,
  `src/main.ts`, or `vite.config.ts`. `spectre.manifest.json` is now a required
  file for all three templates.

## [1.2.0] - 2026-07-23

Release Title: TypeScript 7 Toolchain Support

Contract change type: additive

### Changed

- Added TypeScript 7 support alongside TypeScript 6: internal tooling
  (ESLint/typescript-eslint) runs against TypeScript 6 via an
  `npm:@typescript/typescript6` alias since `typescript-eslint` does not yet
  support TypeScript 7's programmatic API; TypeScript 7's native compiler is
  available via the `@typescript/native` devDependency alias. Bumped
  `typescript-eslint` to `^8.65.0`.

## [1.1.0] - 2026-07-08

Release Title: Ecosystem Alignment and Release Tooling

Contract change type: additive

### Added

- Added `@phcdevworks/spectre-manifest` as a devDependency. `spectre.manifest.json`
  at the repo root declares this package's ecosystem role, layer, exports, and
  allowed dependency targets. `check:ecosystem` validates it in the check pipeline.
- Added `shell-app` template — a full shell starter wiring `bootstrapApp`, the
  router, reactive signals/effects, and `@phcdevworks/spectre-components`
  (`sp-button`).
- Added `check:version-sync` script (`scripts/check-readme-version.ts`) that
  verifies README version references stay in sync with `package.json`; wired
  into `npm run check`.
- Added `release:propose` script (`scripts/propose-version.ts`) that suggests
  the next semantic version bump based on `[Unreleased]` change classification.

### Changed

- Bumped `@phcdevworks/spectre-manifest` devDependency range to `^1.1.0`.
- Bumped `typescript-eslint` devDependency to `^8.63.0`.
- Bumped template dependency pins: `@phcdevworks/spectre-tokens` to `3.3.1`,
  `@phcdevworks/spectre-ui` to `2.7.1`, `@phcdevworks/spectre-ui-astro`
  reference to `3.4.1`.

## [1.0.0] - 2026-06-04

Release Title: First Public Release

### Added

- Initial Spectre scaffolding CLI with `spectre-init <project-name>`.
- TypeScript/Vite starter templates for `vanilla` and `shell-app` projects.
- Template project-name patching, scaffolded output validation, and automatic `npm install`.
- Interactive prompts when `spectre-init` is run with no arguments: project name (with validation), project type selection (with descriptions), output directory (defaults to `./`), and a confirmation summary before any files are written.
- `PROJECT_TYPES` registry in `src/index.ts` — extensible map used by both the interactive type selector and the template copy path. Adding a new template only requires a new entry here.
- `@inquirer/prompts` dependency for interactive CLI prompts.
- Help text updated to document the no-argument interactive mode.
- GitHub Actions CI workflow running `npm run check` against Node 22 and 24 matrix.
- ESLint flat config (`eslint.config.ts`) with `typescript-eslint`; `jiti` added as devDependency so TypeScript config loads correctly.
- `npm run lint`, `npm run format`, and `npm run check` scripts wired in `package.json`.
- Standardized documentation structure: `README.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, `ROADMAP.md`, `TODO.md`, and `AGENTS.md`.
- `CLAUDE.md` — primary development guide for Claude Code as main developer.
- `CODEX.md` documenting OpenAI Codex's secondary release-agent role, startup checklist, guardrails, and handoff format.
- README link to the repository AI development guidance files.
- `.github/copilot-instructions.md` defining GitHub Copilot as a support assistant with repository-specific coding constraints.
- AI-agent coordination guidance in `AGENTS.md` covering companion files, precedence, and handoff rules.
- `.gitattributes` with comprehensive LF normalization and binary safety rules.
- `.editorconfig` for consistent editor behavior.
- `.vscode/` settings and extension recommendations.
- Dependabot weekly npm update schedule.

### Changed

- Package version prepared as `1.0.0` for the first release.
- `src/index.ts` refactored: all arg-dispatch logic moved inside `main()`, module top-level is now declarations only.
- Non-interactive path (name passed as positional arg) is preserved for scripting and CI compatibility.
- `AGENTS.md` now serves as the canonical cross-agent coordination document for Claude Code, Codex, Copilot, and Jules.
- `CLAUDE.md`, `CODEX.md`, Copilot instructions, Claude permissions, CodeRabbit review config, and the pull request template now align on AI-agent roles and release handoffs.
- README AI guidance reference now points to `AGENTS.md` first.
- Bumped `fs-extra` to `^11.3.5`, `@types/node` to `^25.7.0`, `typescript-eslint` to `^8.59.3`.

[unreleased]: https://github.com/phcdevworks/spectre-init/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/phcdevworks/spectre-init/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/phcdevworks/spectre-init/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/phcdevworks/spectre-init/tree/v1.0.0
