# Contributing to @phcdevworks/spectre-init

Thanks for helping improve Spectre Init! This package is the **Factory** layer of the Spectre Arsenal, providing scaffolding tools that ensure new projects adhere to our architectural standards and "Zero-Hex Enforcement" policy.

## 🏛️ Spectre Design Philosophy

Spectre is a **specification-driven design system** built on a strict hierarchy:

### 1. @phcdevworks/spectre-tokens (Layer 1 - DNA)
- **Purpose**: Single source of truth for design values (colors, spacing, typography, semantic roles).
- **Rules**: Defines semantic meaning, not UI behavior. Designers own JSON; engineers maintain transforms.

### 2. @phcdevworks/spectre-ui (Layer 2 - The Blueprint)
- **Purpose**: Converts tokens into real CSS and class recipes.
- **Rules**: MUST consume tokens, MUST NOT redefine values. Every CSS selector has a matching recipe.

### 3. Framework Adapters (Layer 3 - Delivery)
- **Purpose**: Map Layer 2 to specific frameworks (WordPress, Astro, etc.).
- **Rules**: Adapters never define styles or duplicate CSS.

> **The Golden Rule**: Tokens define *meaning*. UI defines *structure*. Adapters define *delivery*.

---

## 🏗️ The Factory Role
As Layer 7, `spectre-init` is responsible for:
- **Scaffolding**: Generating project structures that correctly link to Layers 1-3.
- **Enforcement**: Injecting lint rules and configurations that prevent style leakage and hardcoded values.
- **Velocity**: Reducing the time it takes to spin up a new, standard-compliant Spectre project.

## 🛠️ Development Setup

1. **Clone & Install**:
```bash
git clone https://github.com/phcdevworks/spectre-init.git
npm install
```

2. **Build**:
```bash
npm run build
```

3. **Link (for local testing)**:
```bash
npm link
# Now you can run 'spectre-init' in any directory
```

## ✅ Contribution Rules
1. **Maintain the Hierarchy**: Ensure all generated templates follow the 8-layer architecture.
2. **Standard Configs**: Any configuration files injected (Tailwind, PostCSS, ESLint) must include the core Spectre presets.
3. **No Hex in Templates**: The generated code should never contain hardcoded visual values.

## 🚀 Pull Request Process
1. **Branch**: Create a feature branch from `main`.
2. **Verify**: Ensure code passes linting and build steps.
3. **Test Templates**: Verify that projects generated from your changes actually work and follow the standards.
4. **Docs**: Update the README if you add new templates or commands.

## ⚖️ License
By contributing, you agree that your work will be licensed under the MIT License.
