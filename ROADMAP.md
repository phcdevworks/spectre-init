# Spectre Init Roadmap

`@phcdevworks/spectre-init` is the CLI scaffolding tool for the Spectre
ecosystem. It creates new Spectre-based TypeScript/Vite applications from
opinionated templates — structured app development, no framework, no magic.
Its job is to scaffold correctly, not to implement Spectre features itself.

## Ecosystem Context

Templates scaffold against these published packages:

| Package | Version | Role |
| --- | --- | --- |
| `@phcdevworks/spectre-shell` | 1.1.1 (+ unreleased `bootstrapApp` → `Router` return) | SPA bootstrap — `bootstrapApp`, lifecycle callbacks, readiness signal |
| `@phcdevworks/spectre-shell-router` | 1.1.0 | Client-side router — route matching, named routes, `render`/`destroy` hooks |
| `@phcdevworks/spectre-shell-signals` | 1.1.0 (v1.2.0 queued — docs/manifest only, no API changes) | Reactive primitives — signals, computed, effects |
| `@phcdevworks/spectre-tokens` | 3.3.1 | Design tokens — CSS variables (`--sp-*`), JS objects, Tailwind theme |
| `@phcdevworks/spectre-ui` | 2.7.1 | Styling layer — CSS bundles, recipe functions, Tailwind preset |
| `@phcdevworks/spectre-ui-astro` | 3.4.1 | Astro adapter — SSR-safe components |

## Phase 0: CLI Foundation — Complete

- ESLint flat config with `typescript-eslint`, `jiti`, lint and format scripts
- GitHub Actions CI pipeline — Node 22/24 matrix, `npm run check` gate
- Interactive prompts — name validation, type selection, output dir, confirmation
- Non-interactive path (positional arg) preserved for CI and scripting
- Post-scaffold output validation via `validateScaffold()` before `npm install`

## Phase 1: Template Coverage — Complete

- `vanilla` template — `bootstrapApp`, router, basic route pair
- `shell-app` template — `bootstrapApp`, router, signals, `effect`/`signal` wired with `render`/`destroy` lifecycle

## Phase 2: Ecosystem Alignment — Complete

### P2.1 Bump Version Pins in Both Templates — Complete

Both `templates/*/package.json` files pin current semver ranges.

### P2.2 Wire Spectre UI CSS into Both Templates — Complete

Both templates import the `spectre-ui` base CSS bundle on entry. Shell-app
demonstrates `--sp-*` token variables in inline styles with no hardcoded hex
or px literals.

### P2.3 Fix Template API — Complete

Both templates import only real exports from each package. `routes()` callback
returns `Route[]` per the `BootstrapOptions` contract. Navigation uses `<a
href="...">` links intercepted by the Router's click handler — no phantom
imports, no raw `history.pushState`. Both templates typecheck cleanly.

## Phase 3: Template Expansion — Next

### P3.1 Astro Template

Add a `spectre-ui-astro` template for Astro-based projects.

Why it matters: `spectre-ui-astro` v2.5.0 ships 9 SSR-safe components and is
the supported path for Astro consumers. It has a different dependency graph
than `vanilla` and `shell-app` — no dependency on the shell packages.

Deliverables:

- Template at `templates/astro/` generating a working Astro starter
- Includes at least two `spectre-ui-astro` components (e.g. `SpButton`, `SpCard`)
- New `astro` entry in the `PROJECT_TYPES` registry in `src/index.ts`
- Deps: Astro `^6.4.3`, `spectre-tokens`, `spectre-ui`, `spectre-ui-astro`
- Documented in `README.md`

Implement after Phase 2 is confirmed stable.

## Phase 4: Manifest Integration

### P4.1 Spectre Manifest Integration

Wire scaffolded projects into the `spectre-manifest` contract system.
`spectre-manifest-check` is shipped and wired into the `check:ecosystem` script
in upstream packages — the downstream tooling is in place. This can proceed
independently of Phase 3.

Remaining work in this repo:

- Scaffolded projects include a starter `spectre.manifest.json` entry
- README documents the manifest registration flow

## Phase 5: Maintenance CLI

### P5.1 `spectre-init update` Command

Allow `spectre-init update` to sync an existing project to the latest template
structure.

Acceptance criteria:

- Syncs config files without overwriting custom application code
- Implement after Phase 3 templates are stable

## Phase 6: Template Modernization

Templates should demonstrate the full depth of the Spectre ecosystem. All APIs
in this phase are shipped in current upstream packages.

Prerequisites — both now complete:

- `spectre-shell-router` Phase 3 P3 docs closed (meta, afterNavigate,
  onNavigationStart/End, subscribe patterns — README examples to copy from) ✓
- `spectre-shell` P2.5 implemented (`bootstrapApp` returns `Router` instance,
  decision is Option A) ✓ — in `[Unreleased]`, queued for the next
  `spectre-shell` release

### P6.1 Bootstrap Lifecycle (both templates)

Expose `beforeMount`, `afterMount`, and `bootReady` in both templates.
The `examples/minimal-spa` in `spectre-shell` is the canonical reference.

Acceptance criteria:

- `beforeMount` and `afterMount` callbacks present in the `bootstrapApp` call
- `bootReady` signal imported from `spectre-shell` and observed via `effect()` in shell-app

### P6.2 Route Metadata + Document Title (shell-app)

`spectre-shell-router` v1.1.0 ships `meta` on route definitions and
`afterNavigate` on `RouterOptions`. Use them together for title management.

Acceptance criteria:

- Each route in the shell-app template carries `meta: { title: string }`
- `afterNavigate` sets `document.title` from `context.meta?.title`
- Both routes (`/`, `/about`) have distinct titles

### P6.3 Navigation Loading State (shell-app)

`onNavigationStart` and `onNavigationEnd` are available on `RouterOptions`.
Wire a `navigating` signal to show/hide a loading indicator between route
changes. These are `RouterOptions` callbacks configured at bootstrap time —
no Router instance access required.

Acceptance criteria:

- `navigating` signal toggled in `onNavigationStart` / `onNavigationEnd`
- An `effect()` reflects the loading state in the shell-app template DOM

### P6.4 Plugin System Demo (shell-app)

`bootstrapApp` accepts `plugins?: ShellPlugin[]` as of spectre-shell v1.1.1.
A single minimal plugin (e.g., dev-mode boot logger) is enough to show the
pattern.

Acceptance criteria:

- One `ShellPlugin` defined and passed in the shell-app template
- Plugin uses `context.bootReady` to confirm startup state

## Execution Order

1. ~~Lint config~~ ✓
2. ~~CI pipeline~~ ✓
3. ~~Interactive prompts~~ ✓
4. ~~Output validation~~ ✓
5. ~~Vanilla template~~ ✓
6. ~~Shell-app template~~ ✓
7. ~~Bump version pins~~ ✓ (P2.1)
8. ~~Wire spectre-ui CSS~~ ✓ (P2.2)
9. ~~Fix phantom imports + broken route API~~ ✓ (P2.3)
10. **Astro template** ← next, unblocked (P3.1)
11. **Manifest integration** ← can run in parallel with P3.1, unblocked (P4.1)
12. Template modernization — lifecycle, metadata, loading state, plugins (P6.1–P6.4)
    Unblocked — both prerequisites are done; ready to start
13. Update command (P5.1, after templates stable)

## Explicitly Out of Scope

- Do not implement Spectre features here — this tool only scaffolds
- Do not add runtime code that is imported by generated projects
- Do not add framework logic, UI components, or design tokens
- WordPress scaffolding is out of scope — handled by `spectre-base`
- React, Vue, or other framework-specific templates are out of scope
