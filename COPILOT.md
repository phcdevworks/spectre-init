# COPILOT.md - spectre-init

## Role Summary

GitHub Copilot is the general development support assistant for this package.
Copilot helps with targeted edits, inline suggestions, TypeScript assistance,
test suggestions, and documentation synchronization.

Copilot does not own implementation direction, architecture, release
coordination, production stabilization, repo-wide AI governance, or automated
maintenance workflows.

## Authority Boundaries

- Claude Code remains lead implementation owner (`CLAUDE.md`).
- Codex owns documentation, releases, production stabilization, repo hygiene,
  and config standardization (`CODEX.md`).
- Jules owns bounded automated maintenance (`JULES.md`).

Shared agent roster, edit boundaries, PR requirements, and coordination rules
live in `AGENTS.md`.

## Practical Guardrails

- Keep suggestions scoped to CLI scaffolding, template packaging, validation
  behavior, and related docs and tests.
- Do not suggest runtime feature logic that belongs in downstream Spectre
  packages.
- Do not take ownership from Claude Code or Codex.
- Do not make release decisions, publish, merge, or tag.

## Pull Request Creation

Follow the shared PR requirements in `AGENTS.md`. Include validation results
and release impact notes for Codex handoff.

## Source of Detailed Guidance

Primary Copilot guidance lives in `.github/copilot-instructions.md`.
Shared repo boundaries live in `AGENTS.md`.
