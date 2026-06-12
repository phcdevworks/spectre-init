# Contributing

Thanks for helping improve `@phcdevworks/spectre-init`. This package is the Spectre scaffolding entrypoint, so changes should keep new projects predictable, minimal, and easy to maintain.

## Workflow

1. Install dependencies with `npm install`.
2. Make the smallest focused change that solves the problem.
3. Update README, template docs, or changelog notes when behavior changes.
4. Run `npm run check` before opening a pull request.

## Project Standards

- Keep config files in TypeScript when the tool supports it.
- Keep scaffolded output small and explicit.
- Prefer clear validation errors over surprising generated files.
- Avoid adding runtime dependencies to generated apps unless the starter needs them.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
npm run check
```

## Pull Requests

Describe the user-facing scaffolding change, call out template updates, and include the commands you ran. Populate all sections of the PR template.

## Code of Conduct

By participating in this project, you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
