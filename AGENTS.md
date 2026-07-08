# AGENTS.md - spectre-init

## Repository Snapshot

| Field | Value |
|-------|-------|
| Project team | `project-shell` |
| Repository role | Spectre project scaffolding CLI |
| Package/artifact | `@phcdevworks/spectre-init` |
| Validation gate | `npm run check` |

## Standard Authority Model

| Agent | Role | Authority |
|-------|------|-----------|
| Claude Code | Lead implementation and validation | [CLAUDE.md](CLAUDE.md) |
| OpenAI Codex | Documentation, release readiness, stabilization, and repo hygiene | [CODEX.md](CODEX.md) |
| ChatGPT | Strategy, coordination, prompt design, and external review | Support only |
| GitHub Copilot | Development assistance | [COPILOT.md](COPILOT.md) |
| Google Jules | Bounded automated maintenance | [JULES.md](JULES.md) |

Bradley Potts holds final authority for commits, merges, tags, publishing, and
releases.

## Standard Handoff

Every AI-prepared change should report files changed, validation performed,
public behavior or contract impact, and unresolved risks. Do not edit generated
outputs directly. Do not update [CHANGELOG.md](CHANGELOG.md) unless the change
is release-relevant.

## Instruction Map

| File                              | Audience                     | Purpose                                                            |
| --------------------------------- | ---------------------------- | ------------------------------------------------------------------ |
| `AGENTS.md`                       | All agents, especially Codex | Central role model, coordination rules, verification gate          |
| `CLAUDE.md`                       | Claude Code                  | Lead-development guide for implementation, architecture, and tests |
| `CODEX.md`                        | OpenAI Codex                 | Release-readiness, production stabilization, and config posture    |
| `JULES.md`                        | Google Jules                 | Bounded automated maintenance guidance                             |
| `COPILOT.md`                      | GitHub Copilot               | Role summary and development boundaries for GitHub Copilot         |
| `.github/copilot-instructions.md` | GitHub Copilot               | In-editor suggestion boundaries                                    |
| `.claude/settings.json`           | Claude Code runtime          | Local command denies for commit, push, tag, merge, and publish     |
| `.coderabbit.yaml`                | CodeRabbit                   | Automated review checks aligned with package boundaries            |
| `.github/dependabot.yml`          | Dependabot / Jules handoff   | Dependency-update cadence for automated maintenance                |

## Upstream Requests and Roadmap Self-Expansion

Full directive: project-team [AGENTS.md](../AGENTS.md) "Upstream Requests and
Roadmap Self-Expansion." Applied to this repo:

- This repo is downstream of everything: `spectre-shell`,
  `spectre-shell-router`, `spectre-shell-signals`, and (for the Astro
  template) `spectre-tokens`, `spectre-ui`, `spectre-ui-astro` from
  `project-design`. If a scaffolding template needs an upstream capability
  that doesn't exist yet, append the request to the owning repo's `TODO.md`
  under `## Requested by Downstream`, dated, with the reason and a link back
  to this repo's own TODO.md/ROADMAP.md — never patch the gap into a generated
  template as a local workaround.
- This repo has no downstream of its own — it only generates starter projects
  and is not itself consumed by another repo in this workspace. No `##
  Requested by Downstream` section is expected here, but keep one ready if
  that ever changes.
- This repo's own [ROADMAP.md](ROADMAP.md) may be proactively expanded with new
  or reordered phases by the agent's own analysis — but never mark a phase
  delivered without `npm run check` passing, and never pin or scaffold a
  template against an ecosystem package version newer than what's listed in
  the Ecosystem Package Versions table above without confirming the upstream
  release first.
- Surface any new TODO request or roadmap expansion in the handoff for Bradley
  Potts in the same change it was made, and reflect cross-repo-relevant
  changes in the project-team's own ROADMAP.md/TODO.md.

## Shared Edit Boundaries

| Path | Status | Notes |
| --- | --- | --- |
| `src/index.ts` | **May edit** | CLI entry point; changes require `npm run check` |
| `templates/` | **May edit** | Scaffolding templates; new template directories require human review |
| `package.json` | **May edit** | Dependencies and scripts permitted; `files`, `bin`, and `version` require human review |
| `README.md`, `CHANGELOG.md`, `ROADMAP.md`, `TODO.md`, `CONTRIBUTING.md` | **May edit** | Keep aligned with CLI behavior |
| `AGENTS.md`, `CLAUDE.md`, `CODEX.md`, `JULES.md`, `COPILOT.md` | **May edit** | Role boundaries must remain accurate; Codex leads agent-doc hygiene |
| `.github/workflows/` | **May edit** | Changes must not remove or weaken the `npm run check` gate |
| `dist/` | **Never edit directly** | Always regenerated by `npm run build`; manual edits are overwritten |
| `spectre.manifest.json` | **May edit** | Update when exports, Spectre dependencies, or stability change |

Full validation command: `npm run check`.

Detailed implementation workflow lives in `CLAUDE.md`. Human contributor workflow lives in `CONTRIBUTING.md`.

## Claude Code - Lead Developer

**Claude Code** (`claude-sonnet-4-6`) is the designated primary AI developer for
this repository, maintained on behalf of Bradley Potts
(brad.potts@coastdigitalgroup.com) at PHCDevworks. All development is driven
through Claude Code operating from `CLAUDE.md` as the authoritative working
guide.

**Owns:**

- CLI implementation in `src/index.ts`
- Template implementation in `templates/`
- Scaffolding architecture and validation behavior
- Test coverage when tests are added
- Final implementation validation before handoff (`npm run check` must pass)

**Does not own:** documentation publishing, release versioning, changelog
authorship, dependency bump PRs, or repo-wide AI governance.

## OpenAI Codex - Documentation & Releases

Codex handles documentation quality, release preparation, production
stabilization, repo hygiene, config standardization, and release-readiness
checks. Codex operates from `AGENTS.md` and `CODEX.md`.

**Owns:**

- `README.md`, `CHANGELOG.md`, `ROADMAP.md`, `TODO.md`, `CONTRIBUTING.md`, and
  other root documentation
- Release preparation: semver review, package metadata checks, changelog
  entries, and release notes
- Production stabilization: reviewing release readiness, flagging regressions,
  and ensuring the verification gate passes
- Repo hygiene: stale documentation cleanup, formatting consistency, config
  standardization, PR and issue template maintenance
- AI-agent instruction alignment across `AGENTS.md`, `CLAUDE.md`, `CODEX.md`,
  Copilot guidance, and automated review config

**Does not own:** primary feature implementation, template architecture, large
refactors, dependency-update ownership, deployment, publishing, or release
execution.

Codex may make small, bounded documentation, config, release metadata, and
stabilization fixes when they reduce drift or release risk. Implementation
changes remain Claude Code-owned unless Bradley explicitly asks Codex to make a
small stabilization fix.

## GitHub Copilot - Development Assistance

Copilot provides in-editor code suggestions and assists developers during active
coding sessions. See `.github/copilot-instructions.md` for Copilot-specific
guidance.

**Supports:** inline completions, small code suggestions, TypeScript/API hints,
test suggestions, refactor suggestions, and developer productivity inside the
IDE.

**Owns:** nothing directly. Suggestions are advisory and must follow the owning
agent or human reviewer.

**Does not own:** lead implementation decisions, architecture direction, release
coordination, production stabilization ownership, repo-wide AI governance,
automated maintenance workflows, config standardization ownership, or commit
authority.

## Google Jules - Automated Maintenance

Jules handles small, automated maintenance tasks that do not require
architectural judgment.

**Owns:**

- Dependency version bumps coordinated with `.github/dependabot.yml`
- Small config corrections such as whitespace, key ordering, and obvious typos
- Mechanical documentation fixes such as broken links or markdown formatting

**Does not own:** feature work, new templates, architecture changes, public CLI
contract changes, large refactors, release decisions, or publishing.

## Mission

This is the Spectre scaffolding CLI. It creates new Spectre-ready projects from
opinionated templates. Read `CLAUDE.md` first for project overview, structure,
and commands.

## The Golden Rule

**The factory enforces the contract.** Never generate or modify code that
violates Spectre package boundaries. Every template must reference
`@phcdevworks/spectre-tokens` for values and `@phcdevworks/spectre-ui` for
structure. Zero hardcoded hex colors or spacing literals in any template file.

## Core Directives

1. **Scaffolding only** — this package creates projects, it does not implement Spectre features.
2. **Zero-Hex enforcement** — if a template needs a color or spacing value, use `--sp-*` CSS variables. Output a `🛑 CONSTRAINT TRIGGERED` block and stop if a template would require a hardcoded value.
3. **Fail fast on bad names** — `validateProjectName()` must reject anything that would be an invalid npm package name.
4. **TypeScript preferred** — all generated templates must use TypeScript unless there is a specific documented reason not to.
5. **No new runtime deps** — do not add dependencies to this package's `package.json` that would be imported at runtime inside scaffolded projects.
6. **Scripts are TypeScript** — all `scripts/` tooling in this repo (not the
   scaffolded templates) is `.ts`, run via
   `node --experimental-strip-types`; never add a new `.js`/`.mjs` script.

## Coordination Rules

- When instructions conflict, follow this priority: direct human request,
  `AGENTS.md`, the nearest nested `AGENTS.md`, agent-specific file, then tool
  suggestions.
- Claude Code leads changes to CLI behavior, template architecture, scaffolding
  output, project-name validation, and tests.
- Codex leads documentation, release notes, release preparation, stabilization
  review, repo hygiene, and AI/config cleanup.
- Copilot output is advisory only; accepted suggestions still follow the owning
  agent or human reviewer.
- Jules and Dependabot changes should stay mechanical and easy to review.
  Escalate behavior changes to Claude Code and release/changelog questions to
  Codex.
- Keep handoffs short: summarize changed files, validation status,
  public-behavior impact, and unresolved risk.

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
  templates, change project architecture, own release decisions, or make
  publishing decisions.
- Bradley Potts remains the final reviewer and the only release authority.

## Pull Request Requirements

Every agent that opens a PR must include:

- **Summary** - what changed and why (one to two bullets).
- **Validation** - confirm `npm run check` passed and include the result.
- **Release impact** - additive, behavioral change, or no user-facing impact.
- **Human review triggers** - call out any item from "What Requires Human Review" that applies.

Never submit a PR with an empty body or unfilled template sections.

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
- A new upstream template is requested but the owning package pattern is not yet proven/stable

## Ecosystem Package Versions

Templates must pin these current versions. Update this table when upstream packages release.

| Package | Current version |
| --- | --- |
| `@phcdevworks/spectre-shell` | 1.1.1 |
| `@phcdevworks/spectre-shell-router` | 1.1.0 |
| `@phcdevworks/spectre-shell-signals` | 1.1.0 |
| `@phcdevworks/spectre-tokens` | 3.3.1 |
| `@phcdevworks/spectre-ui` | 2.7.1 |
| `@phcdevworks/spectre-components` | 1.7.0 |
| `@phcdevworks/spectre-ui-astro` | 3.4.1 |

## Working Boundaries

This package owns project scaffolding and starter template generation only.

It does not own:

- Runtime Spectre behavior (belongs in `@phcdevworks/spectre-shell`, `@phcdevworks/spectre-ui`, etc.)
- Design token values (belongs in `@phcdevworks/spectre-tokens`)
- UI component logic or composition
- Framework adapters or runtime routing
- Any code that generated projects import at runtime beyond what the starter templates declare

## Ecosystem Manifest

`spectre.manifest.json` at the root is this package's declaration in the Spectre
ecosystem contract, validated by `@phcdevworks/spectre-manifest`. It records role,
layer, exports, and allowed Spectre dependency targets. `check:ecosystem` validates
it as part of `npm run check`.

Keep `spectre.manifest.json` in sync when:
- Package exports in `package.json` are added or removed
- A Spectre package dependency is added or removed
- The package stability changes

Do not add a `consumers` field — that belongs in the central
`@phcdevworks/spectre-manifest` registry.
