# Spectre Init Execution Todo

Scoped to TS/Vite/Vanilla structured app scaffolding. Aligned to `ROADMAP.md`.

---

## Phase 0 — CLI Foundation: Complete

- [x] ESLint flat config — `eslint.config.ts` with `tseslint.config()`, `jiti` installed, `npm run lint` and `npm run format` working.
- [x] GitHub Actions CI pipeline — runs `npm run check` on push and PR against Node 22/24 matrix.
- [x] Post-scaffold output validation — `validateScaffold()` checks required files exist before `npm install` runs.
- [x] Interactive prompts — name (validated), type selection with descriptions, output directory (defaults `./`), confirmation summary. Non-interactive arg path preserved.

---

## Phase 1 — Template Coverage: Complete

- [x] Vanilla template — `bootstrapApp`, router, basic two-route pair.
- [x] Shell-app template — `bootstrapApp`, router, signals, `effect`/`signal` wired with `render`/`destroy` lifecycle.

---

## Phase 2 — Ecosystem Alignment: Complete

### P1: Bump Version Pins in Both Templates — Complete

- [x] Update `templates/vanilla/package.json` — bump all `@phcdevworks/*` deps to current versions
  - `spectre-shell`: `^1.1.1`
  - `spectre-shell-router`: `^1.1.0`
  - `spectre-tokens`: `^3.3.1`
  - `spectre-ui`: `^2.7.1`
- [x] Update `templates/shell-app/package.json` — same bumps, plus:
  - `spectre-shell-signals`: `^1.1.0`
  - `spectre-components`: `^1.7.0`

### P1: Wire Spectre UI CSS into Both Templates — Complete

- [x] Add `spectre-ui` CSS bundle import to `templates/vanilla/src/main.ts` (or a `style.css` entry)
- [x] Add `spectre-ui` CSS bundle import to `templates/shell-app/src/main.ts`
- [x] Add at least one `--sp-*` token variable usage to `shell-app` template — no hardcoded hex or px literals
- [x] Verify zero-hex constraint passes for both templates after CSS wiring

### P1: Validate and Fix bootstrapApp API — Complete

- [x] **Phantom imports** — removed `registerRoute` and `navigate` (never existed in the router package). Both templates now import only `type Route` from `@phcdevworks/spectre-shell-router`.
- [x] **Route registration shape** — `routes()` now returns `Route[]` per `BootstrapOptions` contract. Each route has `path` and `loader` keys; `loader` returns a `PageModule` with `render` (and `destroy` where used).
- [x] **Navigation** — replaced programmatic `navigate()` calls with `<a href="...">` links. The Router's click interceptor handles these through its full race-condition guard — no raw `history.pushState`.
- [x] Both templates typecheck cleanly against installed v1.1.x packages with zero errors.

---

## Phase 3 — Template Expansion: NEXT — Unblocked

### P2: Astro Template

- [ ] Add `templates/astro/` — Astro starter with `spectre-ui-astro` components
  - File targets: `templates/astro/`, `src/index.ts`, `README.md`
  - Acceptance criteria:
    - Generates working Astro project with at least two `SpButton`/`SpCard` components
    - Deps: Astro `^6.4.3`, `spectre-tokens`, `spectre-ui`, `spectre-ui-astro`
    - New `astro` entry added to `PROJECT_TYPES` registry
    - Documented in README

---

## Phase 4 — Manifest Integration: Unblocked — Can Run in Parallel with Phase 3

- [ ] Wire manifest integration into scaffolded output
  - `spectre-manifest-check` is shipped and wired into `check:ecosystem` in
    upstream packages — the downstream tooling is in place.
  - Remaining work: scaffolded projects include a starter `spectre.manifest.json`;
    README documents the manifest registration flow.
  - No dependency on Phase 3 — can be worked concurrently.

---

## Phase 5 — Maintenance CLI

- [ ] Add `spectre-init update` command
  - Updates config files in an existing Spectre project to latest template
  - Does not overwrite custom application code
  - Implement after Phase 3 templates are stable

---

## Phase 6 — Template Modernization: Unblocked — Ready to Start

All items below are work in `templates/` only. All APIs are already shipped upstream.

Prerequisites — both now complete:

- `spectre-shell-router` P3 docs closed — meta, afterNavigate,
  onNavigationStart/End, and subscribe patterns have README examples to copy from
- `spectre-shell` P2.5 implemented — `bootstrapApp` returns the `Router`
  instance (Option A), in `[Unreleased]`, queued for the next `spectre-shell` release

- [ ] Add `beforeMount` / `afterMount` callbacks to `bootstrapApp` in both templates
- [ ] Observe `bootReady` signal via `effect()` in shell-app template
- [ ] Add `meta: { title: string }` to each route definition in shell-app;
      use `afterNavigate` to set `document.title`
- [ ] Wire `navigating` signal from `onNavigationStart`/`onNavigationEnd` hooks;
      reflect in DOM via `effect()`
- [ ] Add a minimal `ShellPlugin` (boot logger) to shell-app — demonstrates
      `plugins` array on `BootstrapOptions`

---

## Recommended Execution Order

1. ~~Lint config~~ ✓
2. ~~CI pipeline~~ ✓
3. ~~Interactive prompts~~ ✓
4. ~~Output validation~~ ✓
5. ~~Vanilla template~~ ✓
6. ~~Shell-app template~~ ✓
7. ~~Bump version pins~~ ✓
8. ~~Wire spectre-ui CSS~~ ✓
9. ~~Fix phantom imports + broken route API~~ ✓
10. **Astro template** ← next, unblocked (Phase 3)
11. **Manifest integration** ← parallel with Phase 3, unblocked (Phase 4)
12. **Template modernization** ← unblocked, ready to start (Phase 6)
13. Update command ← after templates stable (Phase 5)

## Explicitly Out of Scope

- Do not implement Spectre features in this package
- Do not add runtime code imported by generated projects
- Do not add framework logic, UI components, or design tokens
- WordPress scaffolding — handled by `spectre-base`
- React, Vue, or other framework-specific templates

## Requested by Downstream

None yet.
