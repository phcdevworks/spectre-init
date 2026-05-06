# @phcdevworks/spectre-init

CLI scaffolding for Spectre-ready applications. `spectre-init` creates a small vanilla TypeScript app with Spectre dependencies, local project guidance, and a predictable starter structure.

[Issues](https://github.com/phcdevworks/spectre-init/issues) | [Pull requests](https://github.com/phcdevworks/spectre-init/pulls) | [Security](./SECURITY.md) | [Contributing](./CONTRIBUTING.md)

## Capabilities

- Scaffolds a Spectre-ready vanilla TypeScript application.
- Copies the bundled `templates/vanilla` starter into a new project directory.
- Validates project names before writing files.
- Updates the generated package name to match the requested project.
- Runs `npm install` after scaffolding so the app is ready to start.

## Install

Run once with `npx`:

```bash
npx @phcdevworks/spectre-init my-app
```

Or install globally:

```bash
npm install -g @phcdevworks/spectre-init
spectre-init my-app
```

## Quick Start

```bash
npx @phcdevworks/spectre-init my-app
cd my-app
npm run dev
```

## API

This package exposes the `spectre-init` binary.

```bash
spectre-init <project-name>
spectre-init --help
spectre-init --version
```

## Boundaries

This package owns project scaffolding and starter templates. It does not own runtime routing, reactive state, design tokens, UI components, or framework adapters.

## Development

```bash
npm install
npm run check
```

Useful scripts:

- `npm run typecheck` validates TypeScript without emitting files.
- `npm run lint` runs ESLint.
- `npm run build` emits the CLI to `dist`.
- `npm run check` runs the standard package verification flow.

## Release Notes

See [CHANGELOG.md](./CHANGELOG.md).

## License

MIT. See [LICENSE](./LICENSE).
