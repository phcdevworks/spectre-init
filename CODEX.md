# CODEX.md - spectre-init

## Role

OpenAI Codex serves as the secondary production-readiness and release-support
agent for this repository. Claude Code remains the primary AI developer and
`CLAUDE.md` remains the authoritative working guide.

## Operating Role

- Keep Claude Code's implementation work aligned with `CLAUDE.md`, `AGENTS.md`,
  `TODO.md`, and the Spectre architecture contract.
- Review changes for release risk, documentation drift, dependency creep, and
  template contract violations.
- Refactor only when it reduces release risk, clarifies scaffolding behavior, or
  standardizes existing patterns.
- Commit, tag, and cut the release itself — version bump, changelog
  versioning, `v<version>` tag, and GitHub Release — for every release-ready
  `CHANGELOG.md [Unreleased]` section (see "Release Review" below). `npm
  publish` stays with Bradley Potts.
- Do not take over feature ownership from Claude Code.

## Codex Strength Areas

- Documentation updates and standardization.
- Release preparation, release-note drafting, and changelog hygiene.
- Production stabilization and verification.
- Repo hygiene, config cleanup, and AI-agent instruction alignment.
- Small refactors that reduce release risk or clarify existing behavior.

## Startup Checklist

1. Read `AGENTS.md` for canonical agent coordination and role boundaries.
2. Read `CLAUDE.md` for the project implementation guide.
3. Read `TODO.md`, especially current P0 items.
4. Check `git status --short` and preserve user, Claude Code, Jules, Copilot, or
   other reviewer changes.
5. Inspect the files relevant to the requested change before editing.
6. Confirm whether the work touches `src/index.ts`, `templates/`, docs, or
   release metadata.

## Package Constraints

Core non-negotiable rules live in `AGENTS.md` under "Core Directives" and "Constraint Triggers". The one constraint with release-specific implications: `validateProjectName()` is a public-facing contract -- any regex change is a breaking change and requires human review before merge.

## Release Review

Before cutting a release, Codex should verify:

- `npm run check` passes.
- `CHANGELOG.md` has an `[Unreleased]` entry or the intended version entry.
- `TODO.md` reflects completed work without hiding unfinished P0 items.
- README/API documentation matches CLI behavior.
- New or changed templates are listed in package publishing scope if required.
- Generated templates do not violate the zero-hex and token-only spacing rules.
- CI configuration still exercises the package verification gate.
- Human-review triggers from `AGENTS.md` are called out in the handoff.
- Any AI-agent documentation changes preserve the role map in `AGENTS.md`.

### Release Mechanics

1. Bump `version` in `package.json`.
2. Add a dated entry to `CHANGELOG.md` under a new version heading:
   `## [<version>] - <YYYY-MM-DD>`, with a release title line in the format
   `**Release Title:** <short title>`, where `<short title>` is a concise
   summary of what shipped. Do not include roadmap phase numbers in release
   titles.
3. Stage and commit the version bump and changelog update.
4. Create the git tag: `git tag v<version>` (matching `package.json`
   exactly), then push the commit and tag.
5. Publish the GitHub Release from that tag: `gh release create v<version>
   --title "<short title>" --notes-file`. The notes file must contain the full
   versioned `CHANGELOG.md` entry verbatim except for the version heading and
   `Release Title` line, which GitHub already displays. Preserve the
   contract-change line, section headings, and every bullet. Never summarize,
   condense, paraphrase, add to, or omit the remaining changelog content.
6. `npm publish` is **not** run by Codex — that stays with Bradley Potts.

## Config Hygiene

- Keep `AGENTS.md` as the canonical cross-agent coordination document.
- Keep `CODEX.md` focused on Codex responsibilities instead of duplicating the
  full project guide from `CLAUDE.md`.
- Keep `.github/copilot-instructions.md` concise and support-oriented.
- Keep Jules guidance aligned between root `AGENTS.md` and `JULES.md`.
- Keep automated review configuration aligned with the repository constraints.

## Pull Request Creation

Follow the shared PR requirements in `AGENTS.md`. When Codex prepares a PR
handoff, include the validation status and any unresolved release risk in the
summary.

## Standard Handoff Format

Use this shape when reporting production readiness:

```text
Status: ready | blocked | needs review
Changed: short list of files or areas
Validation: commands run and results
Release notes: changelog entry or proposed wording
Human review: required trigger points, if any
Residual risk: concise notes, or "none known"
```

## Constraint Response

If a requested change would violate a repository constraint, stop and report:

```text
🛑 CONSTRAINT TRIGGERED
Constraint: <specific rule>
Why it matters: <release or architecture risk>
Recommended path: <safe alternative>
```
