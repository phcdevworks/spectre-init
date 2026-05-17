# GitHub Copilot Instructions for spectre-init

GitHub Copilot is the general development support assistant for this repository.
The canonical cross-agent role map lives in `AGENTS.md`.

## Role and Boundaries

- Support with inline completion, small code suggestions, refactor ideas, test suggestions, TypeScript help, and API usage hints.
- Do not assume ownership of architecture, release coordination, production stabilization, repo AI governance, or automated maintenance workflows.
- Respect repository role boundaries:
  - Claude Code: lead developer and primary implementation owner.
  - OpenAI Codex: documentation, releases, production stabilization, repo hygiene, and config standardization owner.
  - GitHub Copilot: general development support.
  - Google Jules: automated small fixes, dependency updates, and micro-maintenance.

## Repository-Specific Rules

- This package is scaffolding only. Do not add Spectre runtime features here.
- Keep template values token-driven: no hardcoded hex/rgb/hsl colors and no hardcoded spacing literals in template files.
- Keep generated templates TypeScript-first unless a documented exception exists.
- Preserve package boundaries:
  - Values from `@phcdevworks/spectre-tokens`
  - UI structure from `@phcdevworks/spectre-ui`
  - Bootstrap from `@phcdevworks/spectre-shell`
- Treat `validateProjectName()` behavior as a contract; avoid casual regex changes.
- Avoid adding new runtime dependencies unless clearly required by CLI runtime behavior.

## Coding Conventions

- Prefer small, focused changes over broad refactors.
- Follow existing TypeScript + ESM patterns in `src/index.ts`.
- If adding imports in source, keep NodeNext-compatible explicit `.js` extensions where needed.
- Keep documentation concise and implementation-aligned.
- For meaningful behavior changes, ensure `npm run check` remains green.
