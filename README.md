# @phcdevworks/spectre-init [![GitHub issues](https://img.shields.io/github/issues/phcdevworks/spectre-init)](https://github.com/phcdevworks/spectre-init/issues) [![GitHub pull requests](https://img.shields.io/github/issues-pr/phcdevworks/spectre-init)](https://github.com/phcdevworks/spectre-init/pulls) [![License](https://img.shields.io/github/license/phcdevworks/spectre-init)](LICENSE)

`@phcdevworks/spectre-init` is the Factory layer of the Spectre suite. It scaffolds new projects from opinionated templates that start with the Spectre hierarchy in place, wire generated apps to `@phcdevworks/spectre-tokens` and `@phcdevworks/spectre-ui`, and keep Zero-Hex enforcement as part of the package contract.

Maintained by PHCDevworks, this package is intentionally focused on project creation and template discipline. It should help teams start cleanly, not become a catch-all runtime or application framework. This package is published as `@phcdevworks/spectre-init`.

Its source repository is hosted at [`phcdevworks/spectre-init`](https://github.com/phcdevworks/spectre-init).

## Key capabilities

- Scaffold a new Spectre-ready application from the bundled vanilla template
- Preserve the Spectre layer contract from the first generated file
- Generate starter projects that already depend on `@phcdevworks/spectre-tokens` and `@phcdevworks/spectre-ui`
- Apply opinionated defaults for TypeScript-based setup and package structure
- Keep scaffolding logic separate from the template files it provisions

## Installation

Run the package directly with `npx`:

```bash
npx @phcdevworks/spectre-init my-app
```

You can also install it globally and use the CLI name:

```bash
npm install -g @phcdevworks/spectre-init
spectre-init my-app
```

## Quick start

Create a project:

```bash
npx @phcdevworks/spectre-init my-app
```

Then move into the generated directory and start development:

```bash
cd my-app
npm run dev
```

Current CLI behavior:

- Accepts a single required `<project-name>` argument
- Copies the bundled `templates/vanilla` starter into the target directory
- Renames the generated package to match the project directory
- Runs `npm install` automatically after scaffolding

## What this package owns

- CLI-driven project scaffolding
- Bundled starter templates under `templates/`
- Opinionated bootstrap defaults for Spectre projects
- Early enforcement of the Spectre architecture and Zero-Hex expectations
- A narrow DX layer for creating projects, not running them

This package should stay at the Factory layer.

## What this package does not own

- Design tokens, semantic values, or visual language definitions
- UI recipes, structural primitives, or styling system concerns
- Application runtime behavior, routing, or shell orchestration
- Business logic, feature modules, or app-level state architecture
- General-purpose project generators unrelated to the Spectre contract

If a concern is not directly about scaffolding Spectre-compliant projects, it likely does not belong here.

## Relationship to the rest of Spectre

Spectre keeps responsibilities separate:

- `@phcdevworks/spectre-tokens` owns design values and token contracts
- `@phcdevworks/spectre-ui` owns structure, recipes, and token-driven styling
- `@phcdevworks/spectre-init` owns scaffolding and template enforcement

That separation keeps generated projects aligned with the system without turning this package into a UI layer or runtime dependency.

## Development

Install dependencies, then build the CLI:

```bash
npm install
npm run build
```

Key source areas:

- `src/index.ts`
- `templates/vanilla/package.json`
- `templates/vanilla/src/main.ts`
- `templates/vanilla/vite.config.ts`

## Contributing

When contributing:

- keep templates aligned with the Spectre hierarchy
- do not introduce hardcoded hex values or spacing literals into generated output
- prefer TypeScript-first templates unless a layer requires otherwise
- update the README when commands, template coverage, or generated behavior changes
- run `npm run build` before opening a pull request

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full contributor guide.

## License

MIT © PHCDevworks. See [LICENSE](LICENSE).
