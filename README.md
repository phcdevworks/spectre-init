# @phcdevworks/spectre-init

### **The Factory (Layer 7 of the Spectre 8-Layer Arsenal)**

`@phcdevworks/spectre-init` is the scaffolding and developer experience engine for the Spectre design system. It acts as the "Factory," providing CLI tools to quickly spin up new projects, components, and adapters that follow the official Spectre architecture.

🤝 **[Contributing Guide](CONTRIBUTING.md)** | 🏛️ **[Spectre Arsenal](https://github.com/phcdevworks)**

---

## 🏗️ Core Architecture

This package is the **DX/Scaffolding Layer**. It ensures that every new project starts with the correct hierarchy, types, and "Zero-Hex Enforcement" as standard.

- 🏗️ **Project Scaffolding**: CLI commands to initialize Layers 3-6.
- 📐 **Template Library**: Curated blueprints for Astro, WordPress, and Vanilla TS apps.
- 🛠️ **Dev Experience**: Pre-configured linting, formatting, and build scripts.
- 📐 **Standards Enforcement**: Automatically generates AGENTS.md and README.md boilerplate.

---

## 🚀 Quick Start

### Installation

```bash
npx @phcdevworks/spectre-init
```

### 1. Initialize a new project

```bash
npx @phcdevworks/spectre-init create my-awesome-app
```

---

## 🏛️ The Spectre Suite Hierarchy

Spectre is built on a non-negotiable hierarchy to prevent style leakage and duplication:

1.  **Layer 1: DNA** ([@phcdevworks/spectre-tokens](https://github.com/phcdevworks/spectre-tokens)) – Design values.
2.  **Layer 2: Blueprint** ([@phcdevworks/spectre-ui](https://github.com/phcdevworks/spectre-ui)) – Structure & Recipes.
3.  **Layer 7: Factory (This Package)** – Scaffolding & CLI tools.

> **The Golden Rule**: The Factory ensures the Hierarchy is respected from Day 1.

---

## License

MIT © PHCDevworks — See **[LICENSE](LICENSE)** for details.

---


