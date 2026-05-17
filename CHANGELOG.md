# Changelog

All notable changes to this project will be documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the versioning reflects package releases.

## [Unreleased]

### Added

- `CODEX.md` documenting OpenAI Codex's secondary release-agent role, startup checklist, guardrails, and handoff format.
- README link to the repository AI development guidance files.
- `.github/copilot-instructions.md` defining GitHub Copilot as a support assistant with repository-specific coding constraints.
- AI-agent coordination guidance in `AGENTS.md` covering companion files, precedence, and handoff rules.

### Changed

- `AGENTS.md` now serves as the canonical cross-agent coordination document for Claude Code, Codex, Copilot, and Jules.
- `CLAUDE.md`, `CODEX.md`, Copilot instructions, Claude permissions, CodeRabbit review config, and the pull request template now align on AI-agent roles and release handoffs.
- README AI guidance reference now points to `AGENTS.md` first.

## [0.0.1-post] — Changes since initial release

### Added

- GitHub Actions CI workflow running `npm run check` against Node 22 and 24 matrix.
- ESLint flat config (`eslint.config.ts`) with `typescript-eslint`; `jiti` added as devDependency so TypeScript config loads correctly.
- `npm run lint` and `npm run format` scripts wired in `package.json`.
- `CLAUDE.md` — primary development guide for Claude Code as main developer.
- `.gitattributes` with comprehensive LF normalization and binary safety rules.
- `.editorconfig` for consistent editor behaviour.
- `.vscode/` settings and extension recommendations.
- Dependabot weekly npm update schedule.

### Changed

- `AGENTS.md` rewritten to be Claude Code–specific with clear constraint triggers and workflow directives.
- Bumped `fs-extra` to `^11.3.5`, `@types/node` to `^25.7.0`, `typescript-eslint` to `^8.59.3`.

## [0.0.1] - 2026-03-16

### Added

- Initial scaffold of the Spectre AI Factory CLI tool.
- Standardized documentation structure (`README.md`, `AGENTS.md`, `CONTRIBUTING.md`).
