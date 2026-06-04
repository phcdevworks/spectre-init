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

### P2.3 Validate `bootstrapApp` API Against spectre-shell v1.1.1

Templates import `bootstrapApp` from `spectre-shell`. Confirm the function
signature matches the published v1.1.1 export — specifically the `routes()`
callback shape, `root` element binding, and any lifecycle hooks available.
Update template usage if the API has changed.

Acceptance criteria: template compiles cleanly against the installed v1.1.1
types without type errors or `@ts-ignore` suppressions.

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

## Execution Order

1. ~~Lint config~~ ✓
2. ~~CI pipeline~~ ✓
3. ~~Interactive prompts~~ ✓
4. ~~Output validation~~ ✓
5. ~~Vanilla template~~ ✓
6. ~~Shell-app template~~ ✓
7. **Bump version pins** (P2.1) ← next
8. **Wire spectre-ui CSS** (P2.2) ← next
9. **Validate bootstrapApp API** (P2.3)
10. Astro template (P3.1)
11. Manifest integration (P4.1, blocked on upstream)
12. Update command (P5.1, after templates stable)

## Explicitly Out of Scope

- Do not implement Spectre features here — this tool only scaffolds
- Do not add runtime code that is imported by generated projects
- Do not add framework logic, UI components, or design tokens
- WordPress scaffolding is out of scope — handled by `spectre-base`
- React, Vue, or other framework-specific templates are out of scope
