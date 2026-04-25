# Spectre Init Roadmap

This roadmap is grounded in the current repository shape and public contract of
`@phcdevworks/spectre-init` as it exists today.

`@phcdevworks/spectre-init` is the CLI scaffolding tool for the Spectre
ecosystem. It creates new Spectre-based projects from opinionated templates so
developers do not have to hand-assemble the layer stack. Its job is to scaffold
correctly, not to implement Spectre features itself.

## 1. Current Repo Assessment

### Current strengths

- The CLI is in place with a working build pipeline (TypeScript → NodeNext).
- The `templates/` directory provides the scaffolding source.
- `fs-extra` handles file operations cleanly.
- The package is published and consumable via `npx @phcdevworks/spectre-init`.

### Current gaps to harden

- Template coverage is limited — not all Spectre project types can be scaffolded
  yet.
- No interactive prompts — the CLI does not guide users through project type
  selection.
- No validation of scaffolded output — the CLI does not confirm that the
  generated project is structurally correct.
- No eslint config — the source code has no linting.
- No CI pipeline for automated build validation.
- No integration with `spectre-manifest` — scaffolded projects are not
  registered against the contract system automatically.
- The README does not fully document available templates and CLI flags.

## 2. Roadmap

## P0: Template Coverage and CLI Completeness / Must-Do

### P0.1 Lint Configuration

Objective Add an eslint config so the source code is held to the same standard
as other Spectre packages.

Why it matters `spectre-init` is the entry point for the entire Spectre
ecosystem — its source quality matters more, not less.

Suggested deliverables

- Add `eslint.config.ts` using `tseslint.config()`
- Add `eslint` and `typescript-eslint` to devDependencies
- Add `"lint"` and `"format"` scripts to `package.json`

Dependency notes

- No blocking dependencies; can be done immediately

### P0.2 Interactive Project Type Selection

Objective Replace silent scaffolding with interactive prompts that guide the
user through project type selection.

Why it matters A CLI that silently creates files is unfriendly. Prompts make
the tool discoverable and self-documenting for new Spectre adopters.

Suggested deliverables

- Interactive prompt for project type (tokens, ui, astro, wordpress-theme,
  shell, full-stack)
- Prompt for project name and output directory
- Confirmation summary before file creation
- Consider `@clack/prompts` or similar for a polished CLI experience

Dependency notes

- Required before recommending `spectre-init` to external adopters

Risk if skipped

- New users must read documentation before they can use the CLI

### P0.3 WordPress Theme Template

Objective Add a scaffolding template for `@phcdevworks/spectre-wordpress-themes`.

Why it matters The WordPress push is a primary channel for Spectre adoption. The
CLI should be able to scaffold a new WordPress theme project from the correct
foundation in one command.

Suggested deliverables

- Template that generates the standard `spectre-wordpress-themes` project
  structure
- Includes: Vite config, TypeScript entry, Tailwind setup, `spectre-theme/`
  skeleton, `package.json` with correct dependencies
- Documents the template in `README.md`

Dependency notes

- Aligned to the `spectre-wordpress-themes` roadmap

Risk if skipped

- WordPress adopters must hand-assemble the theme project manually

### P0.4 CI Pipeline

Objective Add a CI pipeline that builds the CLI and validates templates on every
push.

Suggested deliverables

- GitHub Actions workflow running `npm run build`
- Optional: smoke test that runs `spectre-init` against each template and
  validates the output structure

Risk if skipped

- Build regressions and broken templates ship undetected

## P1: Template Completeness

### P1.1 Shell System Template

Objective Add a scaffolding template for a full Spectre shell application
(shell + router + signals).

Suggested deliverables

- Template that generates a working shell app with routing wired
- Includes: `bootstrapApp()` entry, route configuration, signal usage example
- Documents the template in `README.md`

### P1.2 Spectre Manifest Integration

Objective Wire scaffolded projects into the `spectre-manifest` contract system
automatically.

Why it matters A scaffolded project that is not registered in the manifest
operates outside the contract enforcement system from day one.

Suggested deliverables

- Scaffolded projects get a starter manifest entry generated
- Document the manifest registration flow in `README.md`

Dependency notes

- Depends on `spectre-manifest` downstream consumer tooling being in place

### P1.3 Scaffolded Output Validation

Objective Validate that the generated project structure is correct after
scaffolding.

Suggested deliverables

- Post-scaffold validation step that checks required files exist
- Report missing or unexpected files clearly
- Add to the CI smoke test path

## P2: Later / Controlled Improvement

### P2.1 Plugin Template

Objective Add a scaffolding template for WordPress plugins following the
`spectre-icons` pattern.

Suggested deliverables

- Template that generates a WordPress plugin scaffold using the Spectre
  manifest-driven approach
- Implement when the plugin pattern is proven and repeatable from `spectre-icons`

### P2.2 Update Existing Projects

Objective Allow `spectre-init` to update an existing Spectre project to the
latest template structure.

Suggested deliverables

- `spectre-init update` command that syncs config files without overwriting
  custom code
- Implement after template coverage is complete and stable

## 3. Explicitly Out of Scope

- Do not implement Spectre features here — this tool only scaffolds
- Do not add runtime code that is imported by generated projects
- Do not add framework logic or UI components

## 4. Recommended Execution Order

1. Add lint config
2. Add interactive prompts
3. Add WordPress theme template
4. Add CI pipeline
5. Add shell system template
6. Add manifest integration
7. Add scaffolded output validation
8. Plugin template (when pattern is proven)
9. Update command (after templates are stable)
