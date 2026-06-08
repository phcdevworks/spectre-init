# Spectre Init Roadmap

`@phcdevworks/spectre-init` is the CLI scaffolding tool for the Spectre
ecosystem. It creates new Spectre-based TypeScript/Vite applications from
opinionated templates — structured app development, no framework, no magic.
Its job is to scaffold correctly, not to implement Spectre features itself.

## Ecosystem Context

Templates scaffold against these published packages:

| Package | Version | Role |
| --- | --- | --- |
| `@phcdevworks/spectre-shell` | 1.1.1 | SPA bootstrap — `bootstrapApp`, lifecycle callbacks, readiness signal |
| `@phcdevworks/spectre-shell-router` | 1.1.0 | Client-side router — route matching, named routes, `render`/`destroy` hooks |
| `@phcdevworks/spectre-shell-signals` | 1.1.0 | Reactive primitives — signals, computed, effects |
| `@phcdevworks/spectre-tokens` | 2.7.0 | Design tokens — CSS variables (`--sp-*`), JS objects, Tailwind theme |
| `@phcdevworks/spectre-ui` | 1.7.0 | Styling layer — CSS bundles, recipe functions, Tailwind preset |
| `@phcdevworks/spectre-ui-astro` | 2.5.0 | Astro adapter — SSR-safe components |

## Phase 0: CLI Foundation — Complete

All complete:

- ESLint flat config with `typescript-eslint`, `jiti`, lint and format scripts
- GitHub Actions CI pipeline — Node 22/24 matrix, `npm run check` gate
- Interactive prompts — name validation, type selection, output dir, confirmation
- Non-interactive path (positional arg) preserved for CI and scripting
- Post-scaffold output validation via `validateScaffold()` before `npm install`

## Phase 1: Template Coverage — Complete

All complete:

- `vanilla` template — `bootstrapApp`, router, basic route pair
- `shell-app` template — `bootstrapApp`, router, signals, `effect`/`signal` wired with `render`/`destroy` lifecycle

## Phase 2: Ecosystem Alignment — Active

Templates exist but need to be production-ready against current package versions.

### P2.1 Bump Version Pins in Both Templates

Both templates pin stale versions. Scaffolded apps will install outdated packages.

| Dependency | Pinned | Current |
| --- | --- | --- |
| `spectre-shell` | `^0.0.1` | `^1.1.1` |
| `spectre-shell-router` | `^0.0.1` | `^1.1.0` |
| `spectre-shell-signals` | `^1.0.0` | `^1.1.0` |
| `spectre-tokens` | `^1.0.0` | `^2.7.0` |
| `spectre-ui` | `^0.4.1` | `^1.7.0` |

Acceptance criteria: both `templates/*/package.json` files pin current semver ranges.

### P2.2 Wire Spectre UI CSS into Both Templates

`spectre-ui` is declared as a dependency in both templates but no CSS is imported.
Scaffolded apps have zero Spectre styling out of the box.

Acceptance criteria:

- Both templates import the `spectre-ui` base CSS bundle on entry
- Shell-app template demonstrates at least one `--sp-*` token variable in inline styles
- Zero hardcoded hex or px literals in template source files

### P2.3 Fix Template API — Broken Against Current Packages

Both templates are broken against the current published packages. They must be rewritten before any further template work proceeds.

**What is wrong:**

- Both templates import `registerRoute` and `navigate` from `@phcdevworks/spectre-shell-router`. These exports do not exist. The package only exports the `Router` class and types. Templates will fail at runtime.
- `BootstrapOptions.routes` is typed `() => Route[]` — the callback must return an array of `{ path, loader }` objects. Both templates call `registerRoute()` inside the callback and return nothing.
- `bootstrapApp` returns `void` and does not expose the `Router` instance. There is no way to call `router.navigate()` programmatically from template code. The templates currently call a non-existent standalone `navigate()`.

**Upstream coordination required:**

`spectre-shell` must resolve the programmatic navigation gap before the templates can be fixed. Options:

1. `bootstrapApp` returns the `Router` instance — cleanest, but a minor breaking change (currently `void`).
2. `spectre-shell` exports a module-level `navigate(path)` helper that proxies to the last-created Router — no breaking change, mirrors the pattern in other frameworks.

Do not use `history.pushState()` directly in templates. It bypasses the Router's monotonic nav-id race-condition guard.

**Acceptance criteria:**

- Both templates import only real exports from each package
- `routes()` callback returns `Route[]` per the `BootstrapOptions` contract
- Programmatic navigation uses a supported API (not raw History)
- Both templates typecheck cleanly without `@ts-ignore`

## Phase 3: Template Expansion — Next

### P3.1 Astro Template

Add a `spectre-ui-astro` template for Astro-based projects.

Why it matters: `spectre-ui-astro` v2.5.0 ships 9 SSR-safe components and is
the supported path for Astro consumers. It has no prod dependencies on the
shell packages — the template has a different dependency graph than `vanilla`
and `shell-app`.

Suggested deliverables:

- Template at `templates/astro/` generating a working Astro starter
- Includes at least two `spectre-ui-astro` components (e.g. `SpButton`, `SpCard`)
- New `astro` entry in the `PROJECT_TYPES` registry in `src/index.ts`
- Dependency notes: requires Astro `^6.4.3`, `spectre-tokens`, `spectre-ui`, `spectre-ui-astro`
- Documented in `README.md`

Dependency notes: Implement after Phase 2 is complete and `spectre-ui-astro`
template structure is confirmed stable.

## Phase 4: Manifest Integration

### P4.1 Spectre Manifest Integration

Wire scaffolded projects into the `spectre-manifest` contract system.

Acceptance criteria:

- Scaffolded projects include a starter manifest entry
- README documents the manifest registration flow

Blocked until `spectre-manifest` downstream tooling is in place.

## Phase 5: Maintenance CLI

### P5.1 `spectre-init update` Command

Allow `spectre-init update` to sync an existing project to the latest template structure.

Acceptance criteria:

- Syncs config files without overwriting custom application code
- Implement after Phase 3 templates are stable and version-pinning is solved

## Phase 6: Template Modernization

Templates should demonstrate the full depth of the Spectre ecosystem. All APIs in this phase are shipped in current upstream packages — this phase is about surfacing them in scaffolded output so new projects start with best-practice patterns already wired in.

Prerequisite: Phase 2 P2.3 (template API fix) must be complete and templates must typecheck cleanly.

### P6.1 Bootstrap Lifecycle (both templates)

Expose `beforeMount`, `afterMount`, and `bootReady` in both templates. The `examples/minimal-spa` in `spectre-shell` is the canonical reference for this pattern.

Acceptance criteria:

- `beforeMount` and `afterMount` callbacks present in the `bootstrapApp` call
- `bootReady` signal imported from `spectre-shell` and observed via `effect()` in shell-app

### P6.2 Route Metadata + Document Title (shell-app)

`spectre-shell-router` v1.1.0 ships `meta` on route definitions and `afterNavigate` on `RouterOptions`. Use them together for title management — a pattern every real app needs.

Acceptance criteria:

- Each route in the shell-app template carries `meta: { title: string }`
- `afterNavigate` sets `document.title` from `context.meta?.title`
- Both routes (`/`, `/about`) have distinct titles

### P6.3 Navigation Loading State (shell-app)

`onNavigationStart` and `onNavigationEnd` are available on `RouterOptions`. Wire a `navigating` signal to show/hide a loading indicator between route changes.

Dependency: requires the Router instance to be accessible from template code — blocked until the programmatic navigation gap (P2.3) is resolved upstream.

### P6.4 Plugin System Demo (shell-app)

`bootstrapApp` accepts `plugins?: ShellPlugin[]` since spectre-shell v1.1.1. A single minimal plugin (e.g., dev-mode boot logger) is enough to show the pattern without adding noise.

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
9. **Fix phantom imports + broken route API** (P2.3) — coordinate navigation pattern upstream first
10. Astro template (P3.1)
11. Template modernization — lifecycle, metadata, plugins (P6.1–P6.4)
12. Manifest integration (P4.1, blocked on upstream)
13. Update command (P5.1, after templates stable)

## Explicitly Out of Scope

- Do not implement Spectre features here — this tool only scaffolds
- Do not add runtime code that is imported by generated projects
- Do not add framework logic, UI components, or design tokens
- WordPress scaffolding is out of scope — handled by `spectre-base`
- React, Vue, or other framework-specific templates are out of scope
