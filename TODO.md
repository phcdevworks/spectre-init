# Spectre Init Execution Todo

Phases 0–5 are complete — see [ROADMAP.md](ROADMAP.md) for the delivery
summary and [CHANGELOG.md](CHANGELOG.md) for release-by-release detail.

Phase 6 (Template Modernization) is partially unblocked. P6.1 and P6.4 are
ready — both APIs are shipped upstream. P6.2 and P6.3 are blocked: see
"Requested by Downstream" below.

---

## Phase 6 — Template Modernization

All items below are work in `templates/` only.

- [ ] Add `beforeMount` / `afterMount` callbacks to `bootstrapApp` in both templates
- [ ] Observe `bootReady` signal via `effect()` in shell-app template
- [ ] **Blocked on `spectre-shell`** — Add `meta: { title: string }` to each
      route definition in shell-app; use `afterNavigate` to set
      `document.title`
- [ ] **Blocked on `spectre-shell`** — Wire `navigating` signal from
      `onNavigationStart`/`onNavigationEnd` hooks; reflect in DOM via
      `effect()`
- [ ] Add a minimal `ShellPlugin` (boot logger) to shell-app — demonstrates
      `plugins` array on `BootstrapOptions`

---

## Recommended Execution Order

1. ~~Astro template~~ ✓ (Phase 3)
2. ~~Manifest integration~~ ✓ (Phase 4)
3. ~~Update command~~ ✓ (Phase 5)
4. **Template modernization** ← next, unblocked (Phase 6)

## Explicitly Out of Scope

- Do not implement Spectre features in this package
- Do not add runtime code imported by generated projects
- Do not add framework logic, UI components, or design tokens
- WordPress scaffolding — handled by `spectre-base`
- React, Vue, or other framework-specific templates

## Requested by Downstream

None yet.

## Blocked on Upstream

- **`spectre-shell`** — `BootstrapOptions` has no `routerOptions` field, and
  `bootstrapApp` calls `new Router(registeredRoutes, root)` with no third
  argument, so `RouterOptions` (`afterNavigate`,
  `onNavigationStart`/`onNavigationEnd`, etc.) never reaches the router
  built inside `bootstrapApp`. Blocks P6.2 (route-title management) and
  P6.3 (navigation loading state) below. Tracked upstream in
  `spectre-shell/TODO.md` under "Requested by Downstream".
