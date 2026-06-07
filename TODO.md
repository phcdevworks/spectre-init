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

## Phase 2 — Ecosystem Alignment: Active

### P1: Bump Version Pins in Both Templates — Complete

- [x] Update `templates/vanilla/package.json` — bump all `@phcdevworks/*` deps to current versions
  - `spectre-shell`: `^0.0.1` → `^1.1.1`
  - `spectre-shell-router`: `^0.0.1` → `^1.1.0`
  - `spectre-tokens`: `^1.0.0` → `^2.7.0`
  - `spectre-ui`: `^0.4.1` → `^1.7.0`
- [x] Update `templates/shell-app/package.json` — same bumps, plus:
  - `spectre-shell-signals`: `^1.0.0` → `^1.1.0`

### P1: Wire Spectre UI CSS into Both Templates — Complete

- [x] Add `spectre-ui` CSS bundle import to `templates/vanilla/src/main.ts` (or a `style.css` entry)
- [x] Add `spectre-ui` CSS bundle import to `templates/shell-app/src/main.ts`
- [x] Add at least one `--sp-*` token variable usage to `shell-app` template — no hardcoded hex or px literals
- [x] Verify zero-hex constraint passes for both templates after CSS wiring

### P1: Validate bootstrapApp API Against spectre-shell v1.1.1

- [ ] Confirm `bootstrapApp` export exists and matches the template call signature in `spectre-shell` v1.1.1
- [ ] Confirm `routes()` callback shape, `root` binding, and any available lifecycle hooks match template usage
- [ ] Fix template if API has changed; document any findings

---

## Phase 3 — Template Expansion: Next

### P2: Astro Template

- [ ] Add `templates/astro/` — Astro starter with `spectre-ui-astro` components
  - File targets: `templates/astro/`, `src/index.ts`, `README.md`
  - Acceptance criteria:
    - Generates working Astro project with at least two `SpButton`/`SpCard` components
    - Deps: Astro `^6.4.3`, `spectre-tokens`, `spectre-ui`, `spectre-ui-astro`
    - New `astro` entry added to `PROJECT_TYPES` registry
    - Documented in README
  - Implement after Phase 2 is complete

---

## Phase 4 — Manifest Integration

- [ ] Wire manifest integration into scaffolded output
  - Blocked until `spectre-manifest` downstream tooling is in place

---

## Phase 5 — Maintenance CLI

- [ ] Add `spectre-init update` command
  - Updates config files in an existing Spectre project to latest template
  - Does not overwrite custom application code
  - Implement after Phase 3 templates are stable

---

## Recommended Execution Order

1. ~~Lint config~~ ✓
2. ~~CI pipeline~~ ✓
3. ~~Interactive prompts~~ ✓
4. ~~Output validation~~ ✓
5. ~~Vanilla template~~ ✓
6. ~~Shell-app template~~ ✓
7. **Bump version pins** ← next
8. **Wire spectre-ui CSS** ← next
9. **Validate bootstrapApp API**
10. Astro template
11. Manifest integration (blocked)
12. Update command

## Explicitly Out of Scope

- Do not implement Spectre features in this package
- Do not add runtime code imported by generated projects
- Do not add framework logic, UI components, or design tokens
- WordPress scaffolding — handled by `spectre-base`
- React, Vue, or other framework-specific templates
