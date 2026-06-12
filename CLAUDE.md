# CLAUDE.md — spectre-init

Primary AI maintainer: **Claude Code** (claude-sonnet-4-6, Anthropic)
Human owner: PHCDevworks / <brad.potts@coastdigitalgroup.com>

## Commit Policy

Claude Code does **not** create git commits, push branches, or create tags in this repository. Changes are prepared and validated but left for human review and commit.

## Multi-Agent Team

[AGENTS.md](./AGENTS.md) is the shared source for the agent roster, authority map, edit boundaries, PR requirements, and handoff rules. Claude Code is the lead implementation authority; resolve implementation conflicts by referencing this file and `AGENTS.md`.

---

`@phcdevworks/spectre-init` is the Spectre CLI scaffolding tool. It creates new
Spectre-ready projects from opinionated templates.

## What This Package Does

- Provides the `spectre-init <project-name>` CLI binary
- Copies a bundled template into a new directory
- Patches the generated `package.json` with the requested project name
- Runs `npm install` so the scaffolded app is immediately usable

## Architecture Constraints

Scaffolding-only scope, zero-hex enforcement, and template token rules are defined in `AGENTS.md` under "Core Directives", "Constraint Triggers", and "Working Boundaries". Those definitions are authoritative.

## Project Structure

```text
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
npm run check:ecosystem  # spectre-manifest schema + registration check
npm run check       # typecheck + lint + build + check:ecosystem (run before every commit)
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

See [AGENTS.md](./AGENTS.md) for handoff rules, coordination priorities, and what requires human review before merge.
