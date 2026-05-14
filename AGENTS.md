# AGENTS.md — spectre-init

## Role: Layer 7 Factory (Claude Code is primary dev)

This is the Spectre scaffolding CLI — Layer 7 of the 8-Layer Arsenal. Claude Code is the primary developer on this package. Read `CLAUDE.md` first for project overview, structure, and commands.

## The Golden Rule

**The Factory enforces the contract.** Never generate or modify code that violates the 8-layer hierarchy. Every template must reference `@phcdevworks/spectre-tokens` for values and `@phcdevworks/spectre-ui` for structure. Zero hardcoded hex colors or spacing literals in any template file.

## Core Directives

1. **Scaffolding only** — this package creates projects, it does not implement Spectre features.
2. **Zero-Hex enforcement** — if a template needs a color or spacing value, use `--sp-*` CSS variables. Output a `🛑 CONSTRAINT TRIGGERED` block and stop if a template would require a hardcoded value.
3. **Fail fast on bad names** — `validateProjectName()` must reject anything that would be an invalid npm package name.
4. **TypeScript preferred** — all generated templates must use TypeScript unless there is a specific documented reason not to.
5. **No new runtime deps** — do not add dependencies to this package's `package.json` that would be imported at runtime inside scaffolded projects.

## Workflow

1. Check `TODO.md` for current P0 items before starting any work.
2. Make changes in `src/index.ts` or `templates/`.
3. Run `npm run check` — must be clean before committing.
4. Update `TODO.md` (mark done items) and `CHANGELOG.md` (add entry under `[Unreleased]`) when work is complete.

## What Requires Human Review

- Adding a new template directory (affects published npm package size and user-facing behavior)
- Changing `validateProjectName()` regex (breaking change for existing users)
- Any change to `package.json` `files` field or `bin` entry
- Bumping the published version and running `npm publish`

## Constraint Triggers

If any of the following are encountered, output a `🛑 CONSTRAINT TRIGGERED` block before proceeding:

- A template file would need a hardcoded color (`#`, `rgb(`, `hsl(`)
- A template file would need a hardcoded spacing value (px/rem literals not from a token)
- The CLI would need to write files outside the target project directory
- A new Layer 3–6 template is requested but the upstream layer pattern is not yet proven/stable
