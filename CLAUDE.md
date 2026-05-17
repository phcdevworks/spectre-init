# CLAUDE.md — spectre-init

Primary AI maintainer: **Claude Code** (claude-sonnet-4-6, Anthropic)
Human owner: PHCDevworks / brad.potts@coastdigitalgroup.com

## Commit Policy

Claude Code does **not** create git commits, push branches, or create tags in this repository. Changes are prepared and validated but left for human review and commit.

---

`@phcdevworks/spectre-init` is **Layer 7** of the Spectre 8-Layer Arsenal. It is the CLI scaffolding tool ("The Factory") that creates new Spectre-ready projects from opinionated templates.

## What This Package Does

- Provides the `spectre-init <project-name>` CLI binary
- Copies a bundled template into a new directory
- Patches the generated `package.json` with the requested project name
- Runs `npm install` so the scaffolded app is immediately usable

## Architecture Constraints

This package **only scaffolds**. It must not:
- Implement any Spectre runtime features
- Import or re-export runtime code that generated projects consume
- Add UI components, framework logic, or design tokens

Every generated template must:
- Reference `@phcdevworks/spectre-tokens` for all visual values (`--sp-*` CSS variables — no hardcoded hex or spacing literals)
- Use `@phcdevworks/spectre-ui` for UI structure
- Bootstrap via `@phcdevworks/spectre-shell`'s `bootstrapApp()`

## Project Structure

```
src/
  index.ts          — CLI entry point (shebang, arg parsing, scaffold logic)
templates/
  vanilla/          — Default Spectre vanilla TS starter
    index.html
    src/main.ts
    package.json
    tsconfig.json
    vite.config.ts
    .gitignore
    AGENTS.md
dist/               — Compiled output (git-ignored, npm-published)
```

## Development Commands

```bash
npm run typecheck   # tsc --noEmit — catch type errors without building
npm run lint        # ESLint flat config via jiti
npm run build       # tsc → dist/
npm run format      # Prettier write
npm run check       # typecheck + lint + build (run before every commit)
```

There are no tests yet. `npm run check` is the full verification gate.

## Key Implementation Details

- **Module system**: ESM (`"type": "module"`, `NodeNext` resolution). All imports need explicit `.js` extensions if added.
- **Version read**: `getVersion()` reads `../package.json` at runtime — no bundling needed.
- **Template copy**: `fs-extra`'s `copy()` preserves file attributes and handles nested dirs.
- **Name validation**: regex `^[a-z0-9]([a-z0-9._-]*[a-z0-9])?$` — lowercase npm-safe names only.
- **ESLint config**: `eslint.config.ts` loaded via `jiti` — TypeScript flat config.

## Release Process

1. Run `npm run check` — must be clean.
2. Bump `version` in `package.json`.
3. Add a dated entry to `CHANGELOG.md` under a new version heading.
4. Hand off to Codex for release review and sign-off.
5. Brad commits, tags, and publishes after Codex sign-off.

## Current Work Queue

See `TODO.md` for the current P0/P1/P2 task queue and completion status.
See `ROADMAP.md` for the full strategic roadmap with context and acceptance criteria.

## Agent Handoffs

- **Codex** — hand off when work is ready for release review, changelog
  finalization, production-safety sign-off, repo hygiene, or config cleanup.
  Codex may make scoped documentation, configuration, and stabilization changes
  but does not lead feature implementation.
- **Jules** — handles automated small fixes, dependency bumps, and
  micro-maintenance autonomously. Do not duplicate that work.
- **Copilot** — inline support assistant. Not a coordination target.
- **Brad** — all commits, tags, and publishes require human review and action.
