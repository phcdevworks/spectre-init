# Spectre App — Agent Guide

This project was scaffolded by `@phcdevworks/spectre-init`. It follows the Spectre architecture contract.

## Core Rules

- All visual values must reference `@phcdevworks/spectre-tokens` (`--sp-*` CSS variables). No hardcoded hex colors or spacing literals.
- UI structure must use `@phcdevworks/spectre-ui-astro` components — do not hand-roll markup against `@phcdevworks/spectre-ui` recipes directly.
- Routing is file-based via Astro's `src/pages/` convention. This template does not use `@phcdevworks/spectre-shell-router` or `bootstrapApp` — those are for the `vanilla` and `shell-app` templates.
- The Spectre UI stylesheet is imported once in `src/layouts/BaseLayout.astro`. Do not re-import it per-page or per-component.

## Manifest

`spectre.manifest.json` describes this app's Spectre dependencies. When you add
or remove a `@phcdevworks/*` dependency in `package.json`, update the matching
`dependencies` array on the `"<project-name>"` package entry in
`spectre.manifest.json` to keep them in sync.

## Confidential External Identities

Never record external customer, vendor, user, client-site, or private-project
identities in tracked files, git metadata, reviews, releases, issues, or
handoffs. Use anonymous role-based wording such as "a downstream integration"
or "a production consumer." Zero tolerance, no exceptions — this applies even
to well-known or already-public vendor names.

## Commit Authorship

Commit authorship is human-only. No AI agent adds itself (or any other AI) as
a commit author or co-author — no `Co-Authored-By: Claude`/`Codex`/`Copilot`
trailer, no author-field changes. When an AI agent drafts commit or PR message
text for a human to use, it must never include such a trailer or list an AI
as author or co-author.

## Development

```bash
npm run dev      # start the dev server
npm run build    # production build
npm run preview  # preview the production build
```
