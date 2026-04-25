#!/usr/bin/env node

import { execSync } from "child_process"
import { existsSync, readFileSync } from "fs"
import { copy, readJson, writeJson } from "fs-extra"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const args = process.argv.slice(2)

function showHelp(): void {
  console.log(`
Usage: spectre-init <project-name>

Scaffold a new Spectre-ready application from the bundled vanilla template.

Arguments:
  project-name    Name of the new project directory

Options:
  -h, --help      Show this help message
  -v, --version   Show version number
`)
}

function getVersion(): string {
  const pkg = JSON.parse(
    readFileSync(path.join(__dirname, "../package.json"), "utf-8")
  ) as { version: string }
  return pkg.version
}

function validateProjectName(name: string): string | null {
  if (!/^[a-z0-9]([a-z0-9._-]*[a-z0-9])?$/.test(name)) {
    return (
      `"${name}" is not a valid package name.\n` +
      `  Use lowercase letters, numbers, hyphens, underscores, or dots.\n` +
      `  Example: spectre-init my-app`
    )
  }
  return null
}

if (args.includes("-h") || args.includes("--help")) {
  showHelp()
  process.exit(0)
}

if (args.includes("-v") || args.includes("--version")) {
  console.log(getVersion())
  process.exit(0)
}

const projectName = args[0]

if (!projectName) {
  console.error("Error: a project name is required.\n")
  showHelp()
  process.exit(1)
}

const nameError = validateProjectName(projectName)
if (nameError) {
  console.error(`Error: ${nameError}`)
  process.exit(1)
}

const templateDir = path.join(__dirname, "../templates/vanilla")
const targetDir = path.join(process.cwd(), projectName)

async function main(): Promise<void> {
  if (existsSync(targetDir)) {
    console.error(`Error: directory "${projectName}" already exists.`)
    process.exit(1)
  }

  console.log(`Scaffolding Spectre app: ${projectName}`)

  await copy(templateDir, targetDir)

  const pkgPath = path.join(targetDir, "package.json")
  const pkg = (await readJson(pkgPath)) as Record<string, unknown>
  pkg.name = projectName
  await writeJson(pkgPath, pkg, { spaces: 2 })

  console.log("Installing dependencies...")
  execSync("npm install", { cwd: targetDir, stdio: "inherit" })

  console.log(`\nDone! Next steps:\n  cd ${projectName}\n  npm run dev`)
}

main().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err)
  console.error(`\nError: ${message}`)
  process.exit(1)
})
