# Using `spectre-init`

This guide covers scaffolding and maintaining a Spectre project with the
`vanilla` and `shell-app` templates.

## Install

Run once with `npx` (no install required):

```bash
npx @phcdevworks/spectre-init my-app
```

Or install globally and reuse the binary:

```bash
npm install -g @phcdevworks/spectre-init
spectre-init my-app
```

## Scaffold A New Project

Interactive setup — prompts for project name, template type, and output
directory, with a confirmation summary before any files are written:

```bash
npx @phcdevworks/spectre-init
```

Non-interactive — provide the name up front and skip all prompts (defaults
to the `vanilla` template):

```bash
npx @phcdevworks/spectre-init my-app
cd my-app
npm run dev
```

To scaffold the full shell app template non-interactively, run the
interactive flow and select `shell-app` when prompted, or pass it directly
once your `spectre-init` version supports a template flag — check
`spectre-init --help` for the current flag name.

### Templates

| Type | Description | Packages wired |
| --- | --- | --- |
| `vanilla` | TypeScript + Vite starter with routing and Spectre UI. | `spectre-shell`, `spectre-shell-router`, `spectre-tokens`, `spectre-ui` |
| `shell-app` | Full shell app with `bootstrapApp`, router, signals, reactive effects, and Spectre components. | `spectre-shell`, `spectre-shell-router`, `spectre-shell-signals`, `spectre-components`, `spectre-tokens`, `spectre-ui` |

## Update An Existing Project

`spectre-init update [path]` (default path: current directory) brings an
existing scaffolded project's boilerplate up to date with the currently
installed `spectre-init` version:

```bash
spectre-init update
# or target a specific project directory
spectre-init update ./my-app
```

What it does:

- Detects the project's template (`vanilla` or `shell-app`) from its
  `@phcdevworks/*` dependencies.
- Overwrites config files that are boilerplate, not application code:
  `.gitignore`, `AGENTS.md`, `tsconfig.json`, and `vite.config.ts`.
- Refreshes `spectre.manifest.json` from the current template, preserving the
  project's own name.
- Bumps the version pin for any `@phcdevworks/*` (or other) dependency the
  project already has, to match the current template — it does not add
  dependencies the project doesn't already have, and never touches `scripts`,
  `name`, or other `package.json` fields.
- Never touches anything under `src/`. Run `npm install` afterward to apply
  any dependency changes.

## Other Commands

```bash
spectre-init --help
spectre-init --version
```

## Validating The Manifest

Every scaffolded project includes a starter `spectre.manifest.json`. This is
a starting point, not an automatic registration — it isn't validated by the
scaffolded app's own scripts by default. To validate it:

```bash
npm install --save-dev @phcdevworks/spectre-manifest
npx spectre-manifest-validate spectre.manifest.json
npx spectre-manifest-check spectre.manifest.json .
```

Keep the `dependencies` array on the app's package entry in sync with the
`@phcdevworks/*` entries in `package.json` — `spectre-manifest-check` flags
drift between the two.

## Troubleshooting

| Problem                                      | Likely cause                                           | Fix                                                                 |
|----------------------------------------------|--------------------------------------------------------|---------------------------------------------------------------------|
| Scaffolded app fails `npm install`           | Network or registry issue                              | Run `npm install` manually inside the generated directory           |
| Project name rejected                        | Name contains uppercase, spaces, or invalid characters | Use lowercase letters, numbers, hyphens, underscores, and dots only |
| `spectre-init --version` shows wrong version | Stale global install                                   | Run `npm install -g @phcdevworks/spectre-init` to update            |
