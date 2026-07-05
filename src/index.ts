#!/usr/bin/env node

import { confirm, input, select } from '@inquirer/prompts'
import { execSync } from 'child_process'
import { existsSync, readFileSync } from 'fs'
import fsExtra from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const args = process.argv.slice(2)

const PROJECT_TYPES = {
  vanilla: {
    label: 'Vanilla Spectre',
    description: 'TypeScript starter with Vite, Tailwind, and Spectre UI.',
    templateDir: 'vanilla',
  },
  'shell-app': {
    label: 'Shell App',
    description: 'Full Spectre shell app with router and signals wired from the start.',
    templateDir: 'shell-app',
  },
} as const

type ProjectTypeKey = keyof typeof PROJECT_TYPES

const REQUIRED_SCAFFOLD_FILES = [
  'index.html',
  'package.json',
  'src/main.ts',
  'tsconfig.json',
  'vite.config.ts',
]

function showHelp(): void {
  console.log(`
Usage: spectre-init [project-name]

Scaffold a new Spectre-ready application from a bundled template.
Run with no arguments to launch the interactive setup.

Arguments:
  project-name    Name of the new project directory (skips interactive prompts)

Options:
  -h, --help      Show this help message
  -v, --version   Show version number
`)
}

function getVersion(): string {
  const pkg = JSON.parse(readFileSync(path.join(__dirname, '../package.json'), 'utf-8')) as {
    version: string
  }
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

function validateScaffold(targetDir: string): string[] {
  return REQUIRED_SCAFFOLD_FILES.filter((f) => !existsSync(path.join(targetDir, f)))
}

async function promptUser(): Promise<{ projectName: string; typeKey: ProjectTypeKey; targetDir: string }> {
  const projectName = await input({
    message: 'Project name:',
    validate: (value) => validateProjectName(value) ?? true,
  })

  const typeKey = await select<ProjectTypeKey>({
    message: 'Project type:',
    choices: Object.entries(PROJECT_TYPES).map(([key, meta]) => ({
      value: key as ProjectTypeKey,
      name: meta.label,
      description: meta.description,
    })),
  })

  const outputDir = await input({
    message: 'Output directory:',
    default: './',
  })

  const targetDir = path.resolve(process.cwd(), outputDir, projectName)

  console.log(`
  Project:   ${projectName}
  Type:      ${PROJECT_TYPES[typeKey].label}
  Location:  ${targetDir}
`)

  const confirmed = await confirm({
    message: 'Scaffold this project?',
    default: true,
  })

  if (!confirmed) {
    console.log('Aborted.')
    process.exit(0)
  }

  return { projectName, typeKey, targetDir }
}

async function main(): Promise<void> {
  if (args.includes('-h') || args.includes('--help')) {
    showHelp()
    process.exit(0)
  }

  if (args.includes('-v') || args.includes('--version')) {
    console.log(getVersion())
    process.exit(0)
  }

  let projectName: string
  let typeKey: ProjectTypeKey = 'vanilla'
  let targetDir: string

  if (args[0]) {
    projectName = args[0]
    const nameError = validateProjectName(projectName)
    if (nameError) {
      console.error(`Error: ${nameError}`)
      process.exit(1)
    }
    targetDir = path.join(process.cwd(), projectName)
  } else {
    ;({ projectName, typeKey, targetDir } = await promptUser())
  }

  if (existsSync(targetDir)) {
    console.error(`Error: directory "${projectName}" already exists.`)
    process.exit(1)
  }

  const templateDir = path.join(__dirname, '../templates', PROJECT_TYPES[typeKey].templateDir)

  console.log(`\nScaffolding Spectre app: ${projectName}`)

  await fsExtra.copy(templateDir, targetDir)

  const pkgPath = path.join(targetDir, 'package.json')
  const pkg = (await fsExtra.readJson(pkgPath)) as Record<string, unknown>
  pkg.name = projectName
  await fsExtra.writeJson(pkgPath, pkg, { spaces: 2 })

  const missing = validateScaffold(targetDir)
  if (missing.length > 0) {
    console.error(`\nError: scaffolding incomplete. Missing files:`)
    for (const f of missing) console.error(`  ${f}`)
    process.exit(1)
  }

  console.log('Installing dependencies...')
  execSync('npm install', { cwd: targetDir, stdio: 'inherit' })

  console.log(`\nDone! Next steps:\n  cd ${projectName}\n  npm run dev`)
}

main().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err)
  console.error(`\nError: ${message}`)
  process.exit(1)
})
