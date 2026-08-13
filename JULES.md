# JULES.md - spectre-init

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

## Role

Google Jules is the scheduled maintenance agent for
`@phcdevworks/spectre-init`. Jules handles small, bounded maintenance that keeps
the scaffolding CLI healthy without taking over implementation or release
ownership.

Full roster and authority table: [AGENTS.md](AGENTS.md). Bradley Potts
remains the final release and merge authority. Jules does not own feature
work, architecture changes, public CLI contract changes, large refactors,
documentation governance, release decisions, or AI-agent governance.

## Operating Principles

1. Read `AGENTS.md` before taking any action.
2. Commit and push only when all validation gates pass clean.
3. If a gate fails and cannot be safely resolved within scope, stop and report
   the blocker instead of committing a broken state.

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

## Pull Request Creation

Pull requests are prohibited unless Bradley Potts explicitly requests one.
The guidance below applies only to that explicit exception.

Jules prepares and validates allowed maintenance changes for a direct commit
and push to `main` by a git-authorized agent. It must not prepare a branch or
open a pull request unless Bradley Potts explicitly requests that exception;
for such an exception, identify the maintenance category in the pull request.

### Suggested commit message format

For use in the PR description or as the suggested commit message, matched to
the maintenance category performed:

- Dependency update: `chore(spectre-init): bump <package> to <version>`
- Doc fix: `docs(spectre-init): <description of fix>`
- Config cleanup: `chore(spectre-init): <description of cleanup>`
- Starter hygiene: `chore(spectre-init): <description of update>`
