# Spectre Init Roadmap

`@phcdevworks/spectre-init` is the CLI scaffolding tool for the Spectre
ecosystem. It creates new Spectre-based TypeScript/Vite applications from
opinionated templates — structured app development, no framework, no magic.
Its job is to scaffold correctly, not to implement Spectre features itself.

This document tracks what's next. For what already shipped and why, see
[CHANGELOG.md](CHANGELOG.md) (release-by-release detail) and git history —
this file does not restate delivered work.

## Ecosystem Context

Templates scaffold against these published packages:

| Package | Version | Role |
| --- | --- | --- |
| `@phcdevworks/spectre-shell` | 1.6.0 | SPA bootstrap — `bootstrapApp`, lifecycle callbacks, readiness signal, returns `Router` instance |
| `@phcdevworks/spectre-shell-router` | 1.5.0 | Client-side router — route matching, named routes, `render`/`destroy` hooks, `meta`, `afterNavigate` |
| `@phcdevworks/spectre-shell-signals` | 1.4.0 | Reactive primitives — signals, computed, effects |
| `@phcdevworks/spectre-tokens` | 4.8.0 | Design tokens — CSS variables (`--sp-*`), JS objects |
| `@phcdevworks/spectre-ui` | 5.0.1 | Styling layer — CSS bundles, recipe functions |
| `@phcdevworks/spectre-components` | 1.19.0 | Web component layer — custom elements used by shell-app starter |
| `@phcdevworks/spectre-ui-astro` | 4.8.0 | Astro adapter — SSR-safe components used by the astro starter |

---

## Delivered Phases

| Phase | Summary | Shipped in |
| --- | --- | --- |
| 0 | CLI foundation — ESLint flat config, CI pipeline (Node 22/24 matrix), interactive prompts, non-interactive path, post-scaffold output validation | 1.0.0 |
| 1 | Template coverage — `vanilla` and `shell-app` templates (`bootstrapApp`, router, signals, `effect`/`signal` lifecycle) | 1.0.0–1.1.0 |
| 2 | Ecosystem alignment — version pin bumps, `spectre-ui` CSS wiring, zero-hex constraint, phantom-import and route-API fixes, TypeScript 7 toolchain support | 1.1.0–1.2.0 |
| 3 | Astro template — `templates/astro/` using `@phcdevworks/spectre-ui-astro` (`SpButton`, `SpCard`), `astro` entry in `PROJECT_TYPES`, per-type `requiredFiles` in `validateScaffold()` | 1.3.0 |
| 4 | Manifest integration — starter `spectre.manifest.json` in all three templates, `spectre-init` renames the manifest's package entry/`system.name`/`$id` to the scaffolded project name, README documents `spectre-manifest-validate`/`spectre-manifest-check` | 1.3.0 |
| 5 | Maintenance CLI — `spectre-init update [path]` detects the project's template from its dependencies, refreshes boilerplate config files and `spectre.manifest.json`, and bumps version pins for dependencies the project already declares; never touches `src/` or adds new dependencies | 1.3.0 |
| 6 | Template modernization — `beforeMount`/`afterMount`/`bootReady` in both templates, route `meta: { title }` + `afterNavigate` document-title management, a `navigating` signal reflecting router loading state, and a `ShellPlugin` boot-logger demo, all in shell-app | 1.4.0 |
| 7 | Scripted template selection, optional dependency installation, and read-only update previews | 1.4.0 |

---

## What's Next

No phase is currently queued. See [TODO.md](TODO.md) for demand-driven work.

## Execution Order

1. ~~Astro template~~ ✓ (P3.1)
2. ~~Manifest integration~~ ✓ (P4.1)
3. ~~Update command~~ ✓ (P5.1)
4. ~~Template modernization~~ ✓ (P6.1–P6.4)

## Explicitly Out of Scope

- Do not implement Spectre features here — this tool only scaffolds
- Do not add runtime code that is imported by generated projects
- Do not add framework logic, UI components, or design tokens
- WordPress scaffolding is out of scope — handled by `spectre-base`
- React, Vue, or other framework-specific templates are out of scope
