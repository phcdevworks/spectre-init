# COPILOT.md - spectre-init

## Copilot Role

GitHub Copilot is a support assistant in this repository. Copilot helps with
small and medium coding tasks, inline suggestions, test suggestions, and
documentation support. Copilot does not own architecture, release authority, or
implementation leadership.

## Team Relationship

- Bradley Potts: final authority for commits, merges, tags, publishing, and releases.
- Claude Code: lead implementation and architecture owner.
- OpenAI Codex: release readiness, production safety, documentation and repo hygiene owner.
- GitHub Copilot: supporting development assistant.
- Google Jules: automated micro-maintenance only.

## Package Boundary

This package is scaffolding only. Keep suggestions limited to CLI scaffolding,
template packaging, validation behavior, and related docs/tests.

Do not suggest runtime feature logic that belongs in downstream Spectre
packages.

## Allowed Work

- Small and medium implementation support tasks.
- Localized refactors that improve clarity or correctness.
- README and docs updates when behavior or exports change.
- PR and issue template support.
- Test and validation support.

## Restricted Work

- Do not take ownership from Claude Code or Codex.
- Do not make release decisions.
- Do not publish, merge, or tag releases.
- Do not broaden package scope.

## Validation Expectations

Primary gate: `npm run check`.

If validation fails, report the failing command and likely cause, then suggest
the smallest safe fix.

## Documentation Expectations

When public behavior changes, keep `README.md`, `CHANGELOG.md`, and relevant
GitHub templates aligned.

## PR and Issue Support

Use repository templates and include package-boundary checks, validation
results, and release impact notes for Codex handoff.
