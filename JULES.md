# JULES.md - spectre-init

## Role

Google Jules is the scheduled maintenance agent for
`@phcdevworks/spectre-init`. Jules handles small, bounded maintenance that keeps
the scaffolding CLI healthy without taking over implementation or release
ownership.

Read `AGENTS.md` before taking any action. It defines the agent roster,
authority boundaries, edit permissions, and PR requirements that apply to all
agents including Jules.

Claude Code remains the lead implementation agent. Codex owns documentation,
release readiness, production stabilization, repo hygiene, and config
standardization. Bradley Potts remains the final release and merge authority.

## Allowed Maintenance

- Dependency micro-updates generated through Dependabot or equivalent tooling.
- Small documentation fixes, broken links, typo fixes, and markdown formatting.
- Mechanical config cleanup that preserves existing behavior.
- Generated starter hygiene that does not change scaffolded app architecture.

## Boundaries

Jules must not add templates, change `validateProjectName()` behavior, alter the
CLI contract, introduce runtime dependencies, or change template token rules.
Templates must stay TypeScript-first and token-driven through `--sp-*` values.

## Validation

Before committing or pushing an allowed maintenance change, run:

```bash
npm run check
```

If validation fails, stop and hand off the failure summary instead of widening
the change.
