# CLAUDE.md — spectre-init

## Verified TODO Completion Workflow

For every TODO item Claude Code completes, use this sequence in the same change:

1. Keep the item in `TODO.md` while implementation or verification is in progress.
2. Confirm every acceptance criterion is met and the repository's required tests and validation gate pass.
3. Only after verification passes, remove the completed item from `TODO.md` immediately; do not leave it active or checked off.
4. Update `CHANGELOG.md` under `[Unreleased]` as usual, update the applicable `ROADMAP.md` shipped/status table and phase text, and update every other affected status or dependency reference.

If implementation is incomplete or any required check fails, keep the TODO item open and do not describe the work as shipped.

Primary AI maintainer: **Claude Code** (claude-sonnet-4-6)
Human owner: PHCDevworks / Bradley Potts

## Git Access — Denied

**Claude Code has zero git access in this repo, as part of a companywide
policy.** Claude Code must not run `git commit`, `git push`, `git tag`, or
any other git command — read-only or mutating — here. This supersedes the
prior commit/push/tag grant described in [AGENTS.md](./AGENTS.md). OpenAI
Codex now executes all git operations for this repo; see
[AGENTS.md](./AGENTS.md) and [CODEX.md](./CODEX.md).

When work is ready, Claude Code runs `npm run check`, then stops short of any
git command and hands off to Codex (or Bradley Potts) with a summary of files
changed and validation performed.

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
    _gitignore       — restored to .gitignore in generated projects
    AGENTS.md
dist/               — Compiled output (git-ignored, npm-published)
```

## Development Commands

```bash
npm run typecheck   # tsc --noEmit — catch type errors without building
npm run lint        # ESLint flat config via jiti
npm run build       # tsc → dist/
npm run format      # Prettier write
npm run check:ecosystem     # spectre-manifest schema + registration check
npm run check:version-sync  # README/package.json version parity check
npm run release:propose     # suggest next version bump based on CHANGELOG
npm run check:manifest-names # regression checks against the built CLI
npm run check       # typecheck + lint + build + check:manifest-names + check:version-sync + check:ecosystem (run before every commit)
```

`npm run check` is the full verification gate, including manifest-name
regression checks across all three templates and repeated project updates.

## Key Implementation Details

- **Module system**: ESM (`"type": "module"`, `NodeNext` resolution). All imports need explicit `.js` extensions if added.
- **Version read**: `getVersion()` reads `../package.json` at runtime — no bundling needed.
- **Template copy**: `fs-extra`'s `copy()` preserves file attributes and handles nested dirs.
- **Name validation**: regex `^[a-z0-9]([a-z0-9._-]*[a-z0-9])?$` — lowercase npm-safe names only.
- **ESLint config**: `eslint.config.ts` loaded via `jiti` — TypeScript flat config.

## Release Process

Claude Code implements features and fixes with a `CHANGELOG.md [Unreleased]`
entry per change. Cutting the release itself — version bump, changelog
versioning, `v<version>` tag, and GitHub Release — is Codex's job; see
`CODEX.md` "Release Review" for the full procedure. `npm publish` stays
with Bradley Potts regardless of who prepares the release.

## Current Work Queue

See `TODO.md` for the current open P0/P1/P2 task queue; shipped status belongs
in `ROADMAP.md` and `CHANGELOG.md`.
See `ROADMAP.md` for the full strategic roadmap with context and acceptance criteria.

## Agent Handoffs

See [AGENTS.md](./AGENTS.md) for handoff rules, coordination priorities, and what requires human review before merge.
