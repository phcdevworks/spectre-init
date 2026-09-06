#!/usr/bin/env node

import { confirm, input, select } from '@inquirer/prompts'
import { execSync } from 'child_process'
import { existsSync, readFileSync } from 'fs'
import fsExtra from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import { parseArgs } from 'node:util'

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
Usage: spectre-init [project-name] [--template <type>] [--skip-install]
       spectre-init update [path] [--dry-run]

Scaffold a new Spectre-ready application from a bundled template.
Run with no arguments to launch the interactive setup.

Arguments:
  project-name    Name of the new project directory (skips interactive prompts)

Commands:
  update [path]   Sync config files and dependency pins in an existing
                   spectre-init project to the current template (default
                   path: current directory). Never touches files under src/.

Options:
  --template     Template: vanilla, shell-app, or astro (default: vanilla)
  --skip-install Generate files without running npm install
  --dry-run      Preview update changes without writing files
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

async function updateProject(targetDir: string, dryRun: boolean): Promise<void> {
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

  console.log(`\n${dryRun ? "Previewing update for" : "Updating"} ${PROJECT_TYPES[typeKey].label} project in: ${targetDir}`)

  const updatedFiles: string[] = []
  const writes: { file: string; content: Buffer | string }[] = []
  for (const file of PROJECT_TYPES[typeKey].configFiles) {
    const src = path.join(templateDir, file === '.gitignore' ? '_gitignore' : file)
    if (existsSync(src)) {
      writes.push({ file: path.join(targetDir, file), content: await fsExtra.readFile(src) })
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
  writes.push({ file: pkgPath, content: JSON.stringify(pkg, null, 2) + '\n' })

  const manifestPath = path.join(targetDir, 'spectre.manifest.json')
  const templateManifestPath = path.join(templateDir, 'spectre.manifest.json')
  if (existsSync(manifestPath) && existsSync(templateManifestPath) && pkg.name) {
    const templateManifest = (await fsExtra.readJson(templateManifestPath)) as ManifestShape
    patchManifestName(templateManifest, pkg.name)
    writes.push({ file: manifestPath, content: JSON.stringify(templateManifest, null, 2) + '\n' })
    updatedFiles.push('spectre.manifest.json')
  }

  if (!dryRun) {
    for (const { file, content } of writes) await fsExtra.writeFile(file, content)
  }

  console.log(`\n${dryRun ? "Would overwrite config files" : "Updated config files"}: ${updatedFiles.length > 0 ? updatedFiles.join(', ') : 'none'}`)
  console.log(bumped.length > 0 ? `${dryRun ? "Would change dependency pins" : "Changed dependency pins"}:\n  ${bumped.join('\n  ')}` : 'Dependency pins already up to date.')
  console.log(dryRun
    ? '\nDry run complete. No files were written. Application code under src/ would be preserved.'
    : '\nApplication code under src/ was not touched. Run `npm install` to apply dependency changes.')
}

async function promptUser(selectedType?: ProjectTypeKey): Promise<{ projectName: string; typeKey: ProjectTypeKey; targetDir: string }> {
  const projectName = await input({
    message: 'Project name:',
    validate: (value) => validateProjectName(value) ?? true,
  })

  const typeKey = selectedType ?? await select<ProjectTypeKey>({
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
  const { values, positionals } = parseArgs({
    args,
    allowPositionals: true,
    options: {
      help: { type: 'boolean', short: 'h' },
      version: { type: 'boolean', short: 'v' },
      template: { type: 'string' },
      'skip-install': { type: 'boolean' },
      'dry-run': { type: 'boolean' },
    },
  })
  if (values.help) {
    showHelp()
    return
  }
  if (values.version) {
    console.log(getVersion())
    return
  }
  if (positionals[0] === 'update') {
    if (values.template !== undefined || values['skip-install'] || positionals.length > 2) {
      throw new Error('Usage: spectre-init update [path] [--dry-run]')
    }
    await updateProject(path.resolve(process.cwd(), positionals[1] ?? '.'), values['dry-run'] ?? false)
    return
  }
  if (values['dry-run'] || positionals.length > 1) {
    throw new Error('Usage: spectre-init [project-name] [--template <type>] [--skip-install]')
  }
  if (values.template !== undefined && !Object.hasOwn(PROJECT_TYPES, values.template)) {
    throw new Error('Unknown template. Choose vanilla, shell-app, or astro.')
  }
  const selectedType = values.template as ProjectTypeKey | undefined

  let projectName: string
  let typeKey: ProjectTypeKey = selectedType ?? 'vanilla'
  let targetDir: string

  if (positionals[0]) {
    projectName = positionals[0]
    const nameError = validateProjectName(projectName)
    if (nameError) {
      console.error(`Error: ${nameError}`)
      process.exit(1)
    }
    targetDir = path.join(process.cwd(), projectName)
  } else {
    ;({ projectName, typeKey, targetDir } = await promptUser(selectedType))
  }

  if (existsSync(targetDir)) {
    console.error(`Error: directory "${projectName}" already exists.`)
    process.exit(1)
  }

  const templateDir = path.join(__dirname, '../templates', PROJECT_TYPES[typeKey].templateDir)

  console.log(`\nScaffolding Spectre app: ${projectName}`)

  await fsExtra.copy(templateDir, targetDir, {
    filter: (source) => !['node_modules', 'dist', '.astro'].includes(
      path.relative(templateDir, source).split(path.sep)[0],
    ),
  })
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

  if (!values['skip-install']) {
    console.log('Installing dependencies...')
    execSync('npm install', { cwd: targetDir, stdio: 'inherit' })
  }

  console.log(`\nDone! Next steps:\n  cd ${projectName}\n${values['skip-install'] ? '  npm install\n' : ''}  npm run dev`)
}

main().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err)
  console.error(`\nError: ${message}`)
  process.exit(1)
})
