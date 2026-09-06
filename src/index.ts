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
    requiredFiles: [
      '.gitignore',
      'index.html',
      'package.json',
      'spectre.manifest.json',
      'src/main.ts',
      'tsconfig.json',
      'vite.config.ts',
    ],
    configFiles: ['.gitignore', 'AGENTS.md', 'tsconfig.json', 'vite.config.ts'],
    detectDependency: '@phcdevworks/spectre-shell',
  },
  'shell-app': {
    label: 'Shell App',
    description: 'Full Spectre shell app with router and signals wired from the start.',
    templateDir: 'shell-app',
    requiredFiles: [
      '.gitignore',
      'index.html',
      'package.json',
      'spectre.manifest.json',
      'src/main.ts',
      'tsconfig.json',
      'vite.config.ts',
    ],
    configFiles: ['.gitignore', 'AGENTS.md', 'tsconfig.json', 'vite.config.ts'],
    detectDependency: '@phcdevworks/spectre-shell-signals',
  },
  astro: {
    label: 'Astro',
    description: 'Astro starter with Spectre UI Astro components.',
    templateDir: 'astro',
    requiredFiles: [
      '.gitignore',
      'astro.config.ts',
      'package.json',
      'spectre.manifest.json',
      'src/layouts/BaseLayout.astro',
      'src/pages/index.astro',
      'tsconfig.json',
    ],
    configFiles: ['.gitignore', 'AGENTS.md', 'astro.config.ts', 'tsconfig.json'],
    detectDependency: '@phcdevworks/spectre-ui-astro',
  },
} as const

type ProjectTypeKey = keyof typeof PROJECT_TYPES

function showHelp(): void {
  console.log(`
Usage: spectre-init [project-name]
       spectre-init update [path]

Scaffold a new Spectre-ready application from a bundled template.
Run with no arguments to launch the interactive setup.

Arguments:
  project-name    Name of the new project directory (skips interactive prompts)

Commands:
  update [path]   Sync config files and dependency pins in an existing
                   spectre-init project to the current template (default
                   path: current directory). Never touches files under src/.

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

function validateScaffold(targetDir: string, typeKey: ProjectTypeKey): string[] {
  return PROJECT_TYPES[typeKey].requiredFiles.filter((f) => !existsSync(path.join(targetDir, f)))
}

interface ManifestShape {
  $id: string
  system: { name: string }
  packages: Record<string, unknown>
}

function patchManifestName(manifest: ManifestShape, projectName: string): void {
  const previousName = manifest.system.name
  manifest.system.name = projectName
  manifest.$id = `urn:local:${projectName}:manifest`
  if (previousName !== projectName && previousName in manifest.packages) {
    manifest.packages[projectName] = manifest.packages[previousName]
    delete manifest.packages[previousName]
  }
}

const TYPE_DETECTION_PRIORITY: ProjectTypeKey[] = ['astro', 'shell-app', 'vanilla']

function detectProjectType(dependencies: Record<string, string>): ProjectTypeKey | null {
  for (const typeKey of TYPE_DETECTION_PRIORITY) {
    if (PROJECT_TYPES[typeKey].detectDependency in dependencies) {
      return typeKey
    }
  }
  return null
}

async function updateProject(targetDir: string): Promise<void> {
  const pkgPath = path.join(targetDir, 'package.json')
  if (!existsSync(pkgPath)) {
    console.error(`Error: no package.json found in "${targetDir}". Is this a spectre-init scaffolded project?`)
    process.exit(1)
  }

  const pkg = (await fsExtra.readJson(pkgPath)) as {
    name?: string
    dependencies?: Record<string, string>
    devDependencies?: Record<string, string>
  }

  const typeKey = detectProjectType(pkg.dependencies ?? {})
  if (!typeKey) {
    console.error('Error: could not detect project type from package.json dependencies. Is this a spectre-init scaffolded project?')
    process.exit(1)
  }

  const templateDir = path.join(__dirname, '../templates', PROJECT_TYPES[typeKey].templateDir)

  console.log(`\nUpdating ${PROJECT_TYPES[typeKey].label} project in: ${targetDir}`)

  const updatedFiles: string[] = []
  for (const file of PROJECT_TYPES[typeKey].configFiles) {
    const src = path.join(templateDir, file === '.gitignore' ? '_gitignore' : file)
    if (existsSync(src)) {
      await fsExtra.copy(src, path.join(targetDir, file))
      updatedFiles.push(file)
    }
  }

  const templatePkg = (await fsExtra.readJson(path.join(templateDir, 'package.json'))) as {
    dependencies?: Record<string, string>
    devDependencies?: Record<string, string>
  }

  const bumped: string[] = []
  for (const section of ['dependencies', 'devDependencies'] as const) {
    const current = pkg[section]
    const template = templatePkg[section]
    if (!current || !template) continue
    for (const [name, version] of Object.entries(template)) {
      if (name in current && current[name] !== version) {
        bumped.push(`${name}: ${current[name]} -> ${version}`)
        current[name] = version
      }
    }
  }
  await fsExtra.writeJson(pkgPath, pkg, { spaces: 2 })

  const manifestPath = path.join(targetDir, 'spectre.manifest.json')
  const templateManifestPath = path.join(templateDir, 'spectre.manifest.json')
  if (existsSync(manifestPath) && existsSync(templateManifestPath) && pkg.name) {
    const templateManifest = (await fsExtra.readJson(templateManifestPath)) as ManifestShape
    patchManifestName(templateManifest, pkg.name)
    await fsExtra.writeJson(manifestPath, templateManifest, { spaces: 2 })
    updatedFiles.push('spectre.manifest.json')
  }

  console.log(`\nUpdated config files: ${updatedFiles.length > 0 ? updatedFiles.join(', ') : 'none'}`)
  console.log(bumped.length > 0 ? `Bumped dependency pins:\n  ${bumped.join('\n  ')}` : 'Dependency pins already up to date.')
  console.log('\nApplication code under src/ was not touched. Run `npm install` to apply dependency changes.')
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

  if (args[0] === 'update') {
    const targetDir = path.resolve(process.cwd(), args[1] ?? '.')
    await updateProject(targetDir)
    return
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
  await fsExtra.move(path.join(targetDir, '_gitignore'), path.join(targetDir, '.gitignore'))

  const pkgPath = path.join(targetDir, 'package.json')
  const pkg = (await fsExtra.readJson(pkgPath)) as Record<string, unknown>
  pkg.name = projectName
  await fsExtra.writeJson(pkgPath, pkg, { spaces: 2 })

  const manifestPath = path.join(targetDir, 'spectre.manifest.json')
  if (existsSync(manifestPath)) {
    const manifest = (await fsExtra.readJson(manifestPath)) as ManifestShape
    patchManifestName(manifest, projectName)
    await fsExtra.writeJson(manifestPath, manifest, { spaces: 2 })
  }

  const missing = validateScaffold(targetDir, typeKey)
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
