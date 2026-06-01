# Spectre App — Agent Guide

This project was scaffolded by `@phcdevworks/spectre-init`. It follows the Spectre architecture contract.

## Core Rules

- All visual values must reference `@phcdevworks/spectre-tokens` (`--sp-*` CSS variables). No hardcoded hex colors or spacing literals.
- UI structure must use `@phcdevworks/spectre-ui` components and recipes.
- Routing is handled by `@phcdevworks/spectre-shell-router`. Register routes in `src/main.ts`.
- Shell bootstrap is handled by `@phcdevworks/spectre-shell`. Do not bypass `bootstrapApp`.
- Reactive state is handled by `@phcdevworks/spectre-shell-signals`. Use `signal`, `effect`, and `computed` — do not reach for external state libraries.

## Development

```bash
npm run dev    # start the dev server
npm run build  # production build
```
