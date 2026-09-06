# @phcdevworks/spectre-init

`@phcdevworks/spectre-init` is the project scaffolding CLI of the Spectre
shell ecosystem. It creates a new TypeScript app from a bundled template,
wires Spectre dependencies, and provides a predictable starter structure.

Maintained by [PHCDevworks](https://go.phcdev.co). It scaffolds new
applications against the rest of the Spectre shell ecosystem (`spectre-shell`,
`spectre-shell-router`, `spectre-shell-signals`, and the `project-design`
packages) but is not itself a dependency of any other repo in the workspace.

## Repository Snapshot

| Field | Value |
|-------|-------|
| Project team | `project-shell` |
| Repository role | Spectre project scaffolding CLI |
| Package/artifact | `@phcdevworks/spectre-init` |
| Current version/status | 1.6.0 |

## Standard Workflow

1. Read [AGENTS.md](AGENTS.md), then the agent-specific guide for the task.
2. Check [TODO.md](TODO.md) and [ROADMAP.md](ROADMAP.md) for current scope.
3. Make the smallest repo-local change that satisfies the task.
4. Run `npm run check` when validation is required or practical.
5. Update docs and [CHANGELOG.md](CHANGELOG.md) only when behavior, public
   contracts, or release-relevant metadata changed.

## Documentation Map

| Guide | Path |
|-------|------|
| Usage | [USAGE.md](USAGE.md) |
| Agent rules | [AGENTS.md](AGENTS.md) |
| Claude Code | [CLAUDE.md](CLAUDE.md) |
| Codex | [CODEX.md](CODEX.md) |
| Copilot | [COPILOT.md](COPILOT.md) |
| Jules | [JULES.md](JULES.md) |
| Roadmap | [ROADMAP.md](ROADMAP.md) |
| Todo | [TODO.md](TODO.md) |
| Changelog | [CHANGELOG.md](CHANGELOG.md) |
| Security | [SECURITY.md](SECURITY.md) |

[![npm version](https://img.shields.io/npm/v/@phcdevworks/spectre-init.svg)](https://www.npmjs.com/package/@phcdevworks/spectre-init)
[![CI](https://img.shields.io/github/actions/workflow/status/phcdevworks/spectre-init/ci.yml?branch=main&label=CI)](https://github.com/phcdevworks/spectre-init/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/phcdevworks/spectre-init)](LICENSE)
[![Node](https://img.shields.io/node/v/@phcdevworks/spectre-init)](https://nodejs.org)

CLI scaffolding for Spectre-ready applications. `spectre-init` creates a new TypeScript app from a bundled template, wires Spectre dependencies, and provides a predictable starter structure.

[Contributing](CONTRIBUTING.md) | [Code of Conduct](CODE_OF_CONDUCT.md) |
[Changelog](CHANGELOG.md) | [Roadmap](ROADMAP.md) | [Security Policy](SECURITY.md)

## When To Use This Package

- You are starting a new Spectre-based application from scratch.
- You want a working starter with `@phcdevworks/spectre-shell`, `@phcdevworks/spectre-tokens`, and the router wired up from the first commit.
- You want project files, `AGENTS.md`, and AI-agent guidance pre-populated for the Spectre ecosystem.

## When Not To Use This Package

- You are adding Spectre to an existing project — install packages individually instead.
- You need a non-TypeScript or non-vanilla-JS template — this scaffold is TypeScript-only.
- You need a framework-specific template (React, Vue, etc.) — those are out of scope.

## Templates

| Type | Description | Packages wired |
| --- | --- | --- |
| `vanilla` | TypeScript + Vite starter with routing and Spectre UI. | `spectre-shell`, `spectre-shell-router`, `spectre-tokens`, `spectre-ui` |
| `shell-app` | Full shell app with `bootstrapApp`, router, signals, reactive effects, and Spectre components. | `spectre-shell`, `spectre-shell-router`, `spectre-shell-signals`, `spectre-components`, `spectre-tokens`, `spectre-ui` |
| `astro` | Astro starter using `spectre-ui-astro` components (`SpButton`, `SpCard`). | `spectre-tokens`, `spectre-ui`, `spectre-ui-astro`, `astro` |

The interactive setup prompts for project type. The non-interactive path (`spectre-init <name>`) defaults to `vanilla`; use
`--template shell-app` or `--template astro` to choose another template.

## Ecosystem

Templates scaffold against the Spectre package family:

- **[spectre-shell](https://github.com/phcdevworks/spectre-shell)** — SPA bootstrap layer (`bootstrapApp`, lifecycle hooks)
- **[spectre-shell-router](https://github.com/phcdevworks/spectre-shell-router)** — client-side router with named routes and `render`/`destroy` hooks
- **[spectre-shell-signals](https://github.com/phcdevworks/spectre-shell-signals)** — reactive primitives (`signal`, `computed`, `effect`)
- **[spectre-components](https://github.com/phcdevworks/spectre-components)** — Spectre web components (for example `sp-button` in `shell-app`)
- **[spectre-tokens](https://github.com/phcdevworks/spectre-tokens)** — design tokens as CSS variables (`--sp-*`), JS objects, and Tailwind theme
- **[spectre-ui](https://github.com/phcdevworks/spectre-ui)** — CSS bundles and type-safe recipe functions built on tokens
- **[spectre-ui-astro](https://github.com/phcdevworks/spectre-ui-astro)** — SSR-safe Astro components built on `spectre-ui` recipes (used by `astro`)

## Capabilities

- Scaffolds a Spectre-ready TypeScript application from a bundled template.
- Interactive setup: prompts for project name, type, and output directory with a confirmation summary before any files are written.
- Copies the bundled template starter into a new project directory.
- Validates project names before writing files.
- Updates the generated package name to match the requested project.
- Updates the generated `spectre.manifest.json` package entry to match the requested project.
- Validates scaffolded output before running `npm install`.
- Runs `npm install` after scaffolding so the app is ready to start.

## Manifest Registration

Every template includes a starter `spectre.manifest.json` describing the
scaffolded app as a single package that consumes the Spectre packages listed
in its `dependencies` field (`@phcdevworks/spectre-shell`,
`@phcdevworks/spectre-tokens`, and so on, depending on template). `spectre-init`
renames the manifest's package entry, `system.name`, and `$id` to match your
project name, the same way it patches `package.json`.

This manifest is a starting point, not an automatic registration — it isn't
validated by the scaffolded app's own scripts by default. To validate it:

```bash
npm install --save-dev @phcdevworks/spectre-manifest
npx spectre-manifest-validate spectre.manifest.json
npx spectre-manifest-check spectre.manifest.json .
```

Keep the `dependencies` array on the app's package entry in sync with the
`@phcdevworks/*` entries in `package.json` — `spectre-manifest-check` flags
drift between the two.

## Installation

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

Interactive (guided setup):

```bash
npx @phcdevworks/spectre-init
```

Non-interactive (name provided, no prompts):

```bash
npx @phcdevworks/spectre-init my-app
cd my-app
npm run dev
```

## API

This package exposes the `spectre-init` binary.

```bash
spectre-init                  # interactive setup
spectre-init <project-name>   # skip prompts, scaffold immediately
spectre-init update [path]    # sync an existing project's config files and dependency pins
spectre-init --help
spectre-init --version
```

For scripted scaffolding, use `spectre-init my-app --template astro --skip-install`.
The supported template names are `vanilla`, `shell-app`, and `astro`.
With `--skip-install`, run `npm install` in the generated directory when ready.

## Updating An Existing Project

Preview an update before applying it:

```bash
spectre-init update ./my-app --dry-run
```

The preview lists configuration files that would be overwritten and dependency
version changes. It writes no files and does not install dependencies.
Run the same command without `--dry-run` to apply the update.

`spectre-init update [path]` (default path: current directory) brings an
existing scaffolded project's boilerplate up to date with the currently
installed `spectre-init` version:

- Detects the project's template (`vanilla`, `shell-app`, or `astro`) from its
  `@phcdevworks/*` dependencies.
- Overwrites config files that are boilerplate, not application code:
  `.gitignore`, `AGENTS.md`, `tsconfig.json`, and `vite.config.ts` /
  `astro.config.ts`.
- Refreshes `spectre.manifest.json` from the current template, preserving the
  project's own name.
- Bumps the version pin for any `@phcdevworks/*` (or other) dependency the
  project already has, to match the current template — it does not add
  dependencies the project doesn't already have, and never touches `scripts`,
  `name`, or other `package.json` fields.
- Never touches anything under `src/`. Run `npm install` afterward to apply
  any dependency changes.

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
- `npm run check:manifest-names` verifies manifest renaming through the built CLI across all templates.
- `npm run check:version-sync` checks README/package.json version parity.
- `npm run check:ecosystem` validates the spectre-manifest entry.
- `npm run check` runs the standard package verification flow.

AI-agent coordination starts in [AGENTS.md](./AGENTS.md), with companion
guidance in [CLAUDE.md](./CLAUDE.md), [CODEX.md](./CODEX.md),
[COPILOT.md](./COPILOT.md), [JULES.md](./JULES.md), and
[.github/copilot-instructions.md](./.github/copilot-instructions.md).

### Troubleshooting

| Problem                                      | Likely cause                                           | Fix                                                                 |
|----------------------------------------------|--------------------------------------------------------|---------------------------------------------------------------------|
| `npm run check` fails                        | Type or lint error                                     | Run `npm run typecheck` or `npm run lint` to isolate                |
| Scaffolded app fails `npm install`           | Network or registry issue                              | Run `npm install` manually inside the generated directory           |
| Project name rejected                        | Name contains uppercase, spaces, or invalid characters | Use lowercase letters, numbers, hyphens, underscores, and dots only |
| `spectre-init --version` shows wrong version | Stale global install                                   | Run `npm install -g @phcdevworks/spectre-init` to update            |

## AI And Automation Boundaries

Claude Code (`claude-sonnet-4-6`) is the primary development agent for this
repository. Codex handles releases, including cutting tagged releases and
GitHub Releases, and production stabilization. Jules handles small automated
fixes and dependency updates. GitHub Copilot provides development support.

Codex, Copilot, and Jules have commit, push, and tag authority in this
repository. Claude Code has no git access and hands validated work to Codex
or Bradley Potts for git operations. Publishing to npm
remains Bradley Potts's sole authority. See [AGENTS.md](AGENTS.md) for the
full commit-policy and release-authority grant.

**Protected from automated change:** the scaffolding-only scope (no runtime
routing, reactive state, UI components, or framework adapters added locally)
and the token-driven template constraint (no hardcoded hex colors or spacing
literals in templates). See [AGENTS.md](AGENTS.md) for full agent governance
and boundary rules.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). The gate is `npm run check`. Template changes must preserve the token-driven constraints — no hardcoded hex colors or spacing literals. See [AGENTS.md](./AGENTS.md) for boundaries.

## Release Notes

See [CHANGELOG.md](./CHANGELOG.md).

## License

MIT. See [LICENSE](./LICENSE).
