# Spectre App — Agent Guide

This project was scaffolded by `@phcdevworks/spectre-init`. It follows the Spectre architecture contract.

## Core Rules

- All visual values must reference `@phcdevworks/spectre-tokens` (`--sp-*` CSS variables). No hardcoded hex colors or spacing literals.
- UI structure must use `@phcdevworks/spectre-ui` components and recipes.
- Routing is handled by `@phcdevworks/spectre-shell-router`. Register routes in `src/main.ts`.
- Shell bootstrap is handled by `@phcdevworks/spectre-shell`. Do not bypass `bootstrapApp`.
- Reactive state is handled by `@phcdevworks/spectre-shell-signals`. Use `signal`, `effect`, and `computed` — do not reach for external state libraries.


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
npm run dev    # start the dev server
npm run build  # production build
```
