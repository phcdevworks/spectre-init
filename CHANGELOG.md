# Changelog

All notable changes to this project will be documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the versioning reflects package releases.

## [Unreleased]

### Added

- Added `@phcdevworks/spectre-manifest` as a devDependency. `spectre.manifest.json`
  at the repo root declares this package's ecosystem role, layer, exports, and
  allowed dependency targets. `check:ecosystem` validates it in the check pipeline.

## [1.0.0] - 2026-06-04

First public release.

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
