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
| `@phcdevworks/spectre-shell` | 1.4.0 | SPA bootstrap — `bootstrapApp`, lifecycle callbacks, readiness signal, returns `Router` instance |
| `@phcdevworks/spectre-shell-router` | 1.4.0 | Client-side router — route matching, named routes, `render`/`destroy` hooks, `meta`, `afterNavigate` |
| `@phcdevworks/spectre-shell-signals` | 1.3.0 | Reactive primitives — signals, computed, effects |
| `@phcdevworks/spectre-tokens` | 4.7.0 | Design tokens — CSS variables (`--sp-*`), JS objects |
| `@phcdevworks/spectre-ui` | 5.0.0 | Styling layer — CSS bundles, recipe functions |
| `@phcdevworks/spectre-components` | 1.18.0 | Web component layer — custom elements used by shell-app starter |
| `@phcdevworks/spectre-ui-astro` | 4.7.0 | Astro adapter — SSR-safe components used by the astro starter |

---

## Delivered Phases

| Phase | Summary | Shipped in |
| --- | --- | --- |
| 0 | CLI foundation — ESLint flat config, CI pipeline (Node 22/24 matrix), interactive prompts, non-interactive path, post-scaffold output validation | 1.0.0 |
| 1 | Template coverage — `vanilla` and `shell-app` templates (`bootstrapApp`, router, signals, `effect`/`signal` lifecycle) | 1.0.0–1.1.0 |
| 2 | Ecosystem alignment — version pin bumps, `spectre-ui` CSS wiring, zero-hex constraint, phantom-import and route-API fixes, TypeScript 7 toolchain support | 1.1.0–1.2.0 |
| 3 | Astro template — `templates/astro/` using `@phcdevworks/spectre-ui-astro` (`SpButton`, `SpCard`), `astro` entry in `PROJECT_TYPES`, per-type `requiredFiles` in `validateScaffold()` | Unreleased |
| 4 | Manifest integration — starter `spectre.manifest.json` in all three templates, `spectre-init` renames the manifest's package entry/`system.name`/`$id` to the scaffolded project name, README documents `spectre-manifest-validate`/`spectre-manifest-check` | Unreleased |
| 5 | Maintenance CLI — `spectre-init update [path]` detects the project's template from its dependencies, refreshes boilerplate config files and `spectre.manifest.json`, and bumps version pins for dependencies the project already declares; never touches `src/` or adds new dependencies | Unreleased |

---

## What's Next

### Phase 6: Template Modernization

Templates should demonstrate the full depth of the Spectre ecosystem. All APIs
in this phase are shipped in current upstream packages.

Prerequisites — P6.1/P6.4 ready, P6.2/P6.3 blocked:

- `spectre-shell-router` `meta`, `afterNavigate`, `onNavigationStart`/`End`,
  and `subscribe` patterns have README examples to copy from ✓
- `spectre-shell` `bootstrapApp` returns the `Router` instance ✓
- **Blocked:** `bootstrapApp`'s `BootstrapOptions` has no `routerOptions`
  passthrough — `new Router(registeredRoutes, root)` is called with no
  third argument, so `afterNavigate` and `onNavigationStart`/`onNavigationEnd`
  (both `RouterOptions`, only settable via the `Router` constructor) cannot
  reach a router built through `bootstrapApp`. Requested upstream in
  `spectre-shell/TODO.md` under "Requested by Downstream". Blocks P6.2 and
  P6.3 until `spectre-shell` adds the passthrough and publishes a release.

#### P6.1 Bootstrap Lifecycle (both templates)

Expose `beforeMount`, `afterMount`, and `bootReady` in both templates.
The `examples/minimal-spa` in `spectre-shell` is the canonical reference.

Acceptance criteria:

- `beforeMount` and `afterMount` callbacks present in the `bootstrapApp` call
- `bootReady` signal imported from `spectre-shell` and observed via `effect()` in shell-app

#### P6.2 Route Metadata + Document Title (shell-app)

Use `meta` on route definitions together with `afterNavigate` for title
management.

Acceptance criteria:

- Each route in the shell-app template carries `meta: { title: string }`
- `afterNavigate` sets `document.title` from `context.meta?.title`
- Both routes (`/`, `/about`) have distinct titles

#### P6.3 Navigation Loading State (shell-app)

Wire a `navigating` signal to show/hide a loading indicator between route
changes, using `onNavigationStart`/`onNavigationEnd` — these are
`RouterOptions` callbacks configured at bootstrap time, no Router instance
access required.

Acceptance criteria:

- `navigating` signal toggled in `onNavigationStart` / `onNavigationEnd`
- An `effect()` reflects the loading state in the shell-app template DOM

#### P6.4 Plugin System Demo (shell-app)

`bootstrapApp` accepts `plugins?: ShellPlugin[]`. A single minimal plugin
(e.g., dev-mode boot logger) is enough to show the pattern.

Acceptance criteria:

- One `ShellPlugin` defined and passed in the shell-app template
- Plugin uses `context.bootReady` to confirm startup state

---

## Execution Order

1. ~~Astro template~~ ✓ (P3.1)
2. ~~Manifest integration~~ ✓ (P4.1)
3. ~~Update command~~ ✓ (P5.1)
4. **Template modernization** ← next, unblocked (P6.1–P6.4)

## Explicitly Out of Scope

- Do not implement Spectre features here — this tool only scaffolds
- Do not add runtime code that is imported by generated projects
- Do not add framework logic, UI components, or design tokens
- WordPress scaffolding is out of scope — handled by `spectre-base`
- React, Vue, or other framework-specific templates are out of scope
