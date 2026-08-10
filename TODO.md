# Spectre Init Execution Todo

Phases 0–5 are complete — see [ROADMAP.md](ROADMAP.md) for the delivery
summary and [CHANGELOG.md](CHANGELOG.md) for release-by-release detail.

Phase 6 (Template Modernization) is unblocked — both its prerequisites
shipped upstream.

---

## Phase 6 — Template Modernization

All items below are work in `templates/` only. All APIs are already shipped upstream.

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
