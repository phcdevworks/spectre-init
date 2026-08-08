# Spectre App — Agent Guide

This project was scaffolded by `@phcdevworks/spectre-init`. It follows the Spectre architecture contract.

## Core Rules

- All visual values must reference `@phcdevworks/spectre-tokens` (`--sp-*` CSS variables). No hardcoded hex colors or spacing literals.
- UI structure must use `@phcdevworks/spectre-ui` components and recipes.
- Routing is handled by `@phcdevworks/spectre-shell-router`. Register routes in `src/main.ts`.
- Shell bootstrap is handled by `@phcdevworks/spectre-shell`. Do not bypass `bootstrapApp`.


## Confidential External Identities

Never record external customer, vendor, user, client-site, or private-project
identities in tracked files, git metadata, reviews, releases, issues, or
handoffs. Use anonymous role-based wording such as "a downstream integration"
or "a production consumer." Zero tolerance, no exceptions — this applies even
to well-known or already-public vendor names.

## Development

```bash
npm run dev    # start the dev server
npm run build  # production build
```
