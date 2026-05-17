# AGENTS.md — spectre-init

This is the canonical AI-agent coordination file for the repository. It follows
the shared `AGENTS.md` style so Claude Code, OpenAI Codex, GitHub Copilot, Google
Jules, and other coding agents can read one consistent operating model.

## Primary AI Developer

**Claude Code** (`claude-sonnet-4-6`) is the designated primary AI developer for
this repository, maintained on behalf of Bradley Potts
(brad.potts@coastdigitalgroup.com) at PHCDevworks. All development is driven
through Claude Code operating from `CLAUDE.md` as the authoritative working
guide. Human final review and commit authority rests with Bradley Potts.

Claude Code does not create git commits. Changes are prepared and validated,
then handed off for human review and commit.

## AI Role Boundaries

- Claude Code: lead developer and primary implementation owner.
- OpenAI Codex: documentation, releases, production stabilization, repo hygiene, and config standardization owner.
- GitHub Copilot: general development support (inline suggestions, refactors, TypeScript and API hints).
- Google Jules: automated small fixes, dependency updates, and micro-maintenance.

Do not change these roles without explicit human direction from Bradley Potts.
When instructions conflict, follow this order: direct human instruction, this
file, the nearest nested `AGENTS.md`, then agent-specific companion files.

## Agent-Specific Companion Files

- `CLAUDE.md`: authoritative lead-developer guide for implementation, project
  structure, commands, and release handoff expectations.
- `CODEX.md`: Codex release-readiness, documentation, stabilization, repo
  hygiene, changelog, and config-cleanup playbook.
- `.github/copilot-instructions.md`: GitHub Copilot inline-assistance rules.
- `.claude/settings.json`: Claude Code permission guardrails.
- `.coderabbit.yaml`: automated pull-request review configuration.

Google Jules reads this root `AGENTS.md`; keep Jules tasks limited to small
fixes, dependency updates, and micro-maintenance. Do not assign Jules large
features, architecture ownership, or release decisions.

## Mission

This is the Spectre scaffolding CLI — Layer 7 of the 8-Layer Arsenal. Read
`CLAUDE.md` first for project overview, structure, and commands.

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

## Handoff Rules

- Claude Code leads primary implementation and hands release-ready work to Codex
  for production-readiness review.
- Codex may directly update documentation, release notes, CI/config hygiene, and
  small stabilization fixes. Codex does not take over feature ownership from
  Claude Code.
- Copilot provides local suggestions only. Copilot does not own architecture,
  roadmap decisions, release readiness, or repository coordination.
- Jules handles small automated maintenance. Jules should not create new
  templates, change project architecture, or make publishing decisions.
- Bradley Potts remains the final reviewer and the only release authority.

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
