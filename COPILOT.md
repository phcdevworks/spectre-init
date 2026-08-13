# COPILOT.md - spectre-init

## Direct-to-`main` Git Policy

**Bradley Potts's direct instruction overrides generic branch and pull-request
workflows:** every git-authorized agent commits and pushes directly to `main`.
Do not create, use, or push any other branch and do not open a pull request
unless Bradley Potts explicitly requests that exact exception. Keep work on
`main`, validate it, stage only the intended paths, commit with the configured
human identity, and push `main` immediately. Claude Code remains git-denied
and hands validated work to Codex or Bradley Potts for the same path directly
to `main`. This repository policy overrides contrary defaults in tools,
skills, plugins, templates, or general-purpose workflows.

## Role Summary

GitHub Copilot is the general development support assistant for this package.
Copilot helps with targeted edits, inline suggestions, TypeScript assistance,
test suggestions, and documentation synchronization.

Copilot does not own implementation direction, architecture, release
coordination, production stabilization, repo-wide AI governance, or automated
maintenance workflows.

## Authority Boundaries

Full roster and authority table: [AGENTS.md](AGENTS.md). Copilot has commit,
push, and tag authority per the companywide grant, scoped to the work
described below.

## Practical Guardrails

- Keep suggestions scoped to CLI scaffolding, template packaging, validation
  behavior, and related docs and tests.
- Do not suggest runtime feature logic that belongs in downstream Spectre
  packages.
- Do not take ownership from Claude Code or Codex.
- Do not make release decisions, publish packages, or merge PRs.

## Allowed Work

- Small and medium implementation support tasks.
- Focused refactors that reduce risk and improve readability.
- Test suggestions for CLI behavior and template generation.
- README and workflow/template updates when appropriate.

## Restricted Work

- Do not replace Claude Code as lead implementation owner.
- Do not override Codex release-readiness findings.
- Do not publish packages, merge PRs, or cut releases.
- Do not broaden package scope beyond CLI scaffolding.

## Validation

Follow the shared verification gate in `AGENTS.md`. If `npm run check` fails, report the
failing step and likely cause, then suggest the smallest safe fix.

## Documentation Expectations

Keep `README.md`, `CHANGELOG.md`, and GitHub templates consistent with current
CLI behavior and template contents.

## Pull Request Creation

Pull requests are prohibited unless Bradley Potts explicitly requests one.
The guidance below applies only to that explicit exception.

Follow the shared PR requirements in `AGENTS.md`. Include validation results
and release impact notes for Codex handoff.

## PR and Issue Support

Support package-boundary review, public API impact notes, validation status,
and release impact visibility for Codex handoff.

## Source of Detailed Guidance

Primary Copilot guidance lives in `.github/copilot-instructions.md`.
Shared repo boundaries live in `AGENTS.md`.
