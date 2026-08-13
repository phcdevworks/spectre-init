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
| Claude Code | Lead implementation and validation. **No git access.** | [CLAUDE.md](CLAUDE.md) |
| OpenAI Codex | Documentation, release readiness, stabilization, and repo hygiene. Also executes all git operations for Claude Code's handed-off work | [CODEX.md](CODEX.md) |
| ChatGPT | Strategy, coordination, prompt design, and external review | Support only |
| GitHub Copilot | Development assistance | [COPILOT.md](COPILOT.md) |
| Google Jules | Bounded automated maintenance | [JULES.md](JULES.md) |

**Claude Code has zero git access in this repository, no exceptions**,
effective 2026-08-13 by explicit direction from Bradley Potts. Claude Code
must never run any git command — not even read-only ones like `git
status`/`git diff`/`git log`, and definitely not `commit`/`push`/`tag`. This
does not change Claude Code's authority to edit files, implement, or
validate — only git execution moves off of Claude Code. When work is
validated and ready, Claude Code hands off to OpenAI Codex (or Bradley Potts
directly), which executes the git operations on Claude Code's behalf.

**OpenAI Codex, GitHub Copilot, and Google Jules** have full commit, push,
and tag authority in this repository, effective 2026-07-25 by explicit
direction from Bradley Potts — see the Commit Policy section in each agent's
own guide ([CODEX.md](CODEX.md), [COPILOT.md](COPILOT.md),
[JULES.md](JULES.md)). OpenAI Codex additionally now executes git operations
for Claude Code's handed-off work in this repo. **OpenAI Codex** additionally
has release authority:
Codex cuts releases autonomously — version bump, changelog versioning,
`v<version>` git tag, and GitHub Release publish via `gh` — for every
release-ready `CHANGELOG.md [Unreleased]` section, without waiting for
per-release approval; see `CODEX.md` "Release Review" for the full
procedure. **npm publishing remains Bradley Potts's sole authority** — no
agent runs `npm publish`. Bradley Potts retains ultimate ownership and can
revoke or narrow any of this at any time. This grant covers git and release
operations within each agent's own scope of work as defined above — it does
not expand what any agent is authorized to decide otherwise. ChatGPT has no
repository access and is excluded.

**A commit is not finished until it is pushed.** Every agent with git
authority (OpenAI Codex, GitHub Copilot, Google Jules) must push immediately
after committing (`git push`, including any needed `-u`/tags) as part of the
same action — never leave a commit sitting local only. This closes a
recurring gap where an agent commits and stops short of pushing, leaving work
stranded on the machine.

**Commit authorship is human-only.** No agent adds itself (or any other AI)
as a commit author or co-author — no `Co-Authored-By: Claude`/`Codex`/
`Copilot`/`Jules` trailer, no author-field changes, in this repository. The
git author/committer stays Bradley Potts (or the configured human git user)
on every commit, regardless of which agent performed the work. Push and tag
authority above does not extend to authorship attribution.


## Cross-Repo Access

This repo may be worked on standalone or alongside any combination of other
PHCDevworks repos — do not assume the company root or sibling project areas
are present. The following rules are self-contained and apply whether or not
that broader context is available.

**File access.** An agent working in this repo has full read/write access to
every file in this repo. When this repo is present alongside other
PHCDevworks repos (company root or sibling `project-*` areas), the same full
read/write access extends to those repos too — there is no per-repo access
restriction anywhere in this workspace. What differs repo-to-repo is not
*access*, it's *editorial ownership*: each repo's own `CLAUDE.md`/`AGENTS.md`
still governs what changes make sense there (design-token authority, layer
boundaries, etc.) — being able to open and edit a file is not the same as it
being this repo's job to change it.

**Cross-repo changelog and TODO/roadmap requests.** Full rules: company root
[AGENTS.md](../../AGENTS.md) § "Cross-Repo Changelog Sync" and § "Upstream
Requests and Roadmap Self-Expansion." Applied here without exception — this
repo may append `[Unreleased]` changelog entries and downstream TODO requests
to other present repos per those rules, and no AI agent creates commits, tags,
publishes packages, or merges changes in this repo or any other unless that
repo's own agent guide explicitly grants that authority.

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

## Confidential External Identities

Never record external customer, vendor, user, client-site, or private-project
identities in tracked files, git metadata, reviews, releases, issues, or
handoffs. Use anonymous role-based wording such as "a downstream integration"
or "a production consumer." Public package and platform names are allowed
only when technically required to identify a dependency or supported
integration.

**Zero tolerance, no exceptions.** This is not a case-by-case judgment call.
Every upstream vendor, customer, client, or third-party identity — regardless
of how well-known, already public, or seemingly harmless — is forbidden from
appearing in any file, commit, tag, branch name, PR, issue, roadmap, TODO, or
agent output anywhere in this repo. If a vendor name is already present
anywhere in tracked files, it must be anonymized on sight, not left in place
because it predates this rule.

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

## Agent-Specific Guides

- `CLAUDE.md` - primary development authority and implementation workflow.
- `CODEX.md` - documentation, release, stabilization, and repo hygiene workflow.
- `JULES.md` - bounded automated maintenance workflow.
- `COPILOT.md` and `.github/copilot-instructions.md` - support-assistant workflow.

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
