import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const workspace = mkdtempSync(join(tmpdir(), 'spectre-init-options-'))
const bin = join(workspace, 'bin')
mkdirSync(bin)
writeFileSync(join(bin, 'npm'), '#!/bin/sh\necho invoked > npm-invoked\nexit 93\n', { mode: 0o755 })
writeFileSync(join(bin, 'npm.cmd'), '@echo invoked > npm-invoked\r\n@exit /b 93\r\n')
function run(args: string[]) {
  return spawnSync(process.execPath, [join(root, 'dist/index.js'), ...args], {
    cwd: workspace,
    env: { ...process.env, PATH: bin + (process.platform === 'win32' ? ';' : ':') + process.env.PATH },
    encoding: 'utf8',
    timeout: 10000,
  })
}
function snapshot(directory: string): Record<string, string> {
  const files: Record<string, string> = {}
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name)
    if (entry.isDirectory()) {
      for (const [child, content] of Object.entries(snapshot(file))) files[`${entry.name}/${child}`] = content
    } else files[entry.name] = readFileSync(file).toString('base64')
  }
  return files
}
try {
  for (const template of ['vanilla', 'shell-app', 'astro']) {
    const name = `${template}-app`
    const target = join(workspace, name)
    const result = run([name, `--template=${template}`, '--skip-install'])
    assert.equal(result.status, 0, result.stderr)
    assert.match(result.stdout, /npm install/)
    assert.ok(!existsSync(join(target, 'node_modules')))
    assert.ok(!existsSync(join(target, 'npm-invoked')))
    assert.ok(existsSync(join(target, template === 'astro' ? 'astro.config.ts' : 'vite.config.ts')))
    const pkgPath = join(target, 'package.json')
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
    const templatePkg = JSON.parse(readFileSync(join(root, 'templates', template, 'package.json'), 'utf8'))
    assert.deepEqual(pkg.dependencies, templatePkg.dependencies)
    const dependency = Object.keys(pkg.dependencies)[0]
    pkg.dependencies[dependency] = '0.0.0'
    writeFileSync(pkgPath, JSON.stringify(pkg))
    writeFileSync(join(target, '.gitignore'), 'custom-ignore\n')
    writeFileSync(join(target, 'src', 'custom.ts'), 'export const keep = true\n')
    const before = snapshot(target)
    const preview = run(['update', target, '--dry-run'])
    assert.equal(preview.status, 0, preview.stderr)
    assert.match(preview.stdout, /Would overwrite config files/)
    assert.ok(preview.stdout.includes(`${dependency}: 0.0.0 -> ${templatePkg.dependencies[dependency]}`))
    assert.deepEqual(snapshot(target), before, 'Dry run must preserve every file byte-for-byte')
    const update = run(['update', target])
    assert.equal(update.status, 0, update.stderr)
    assert.equal(JSON.parse(readFileSync(pkgPath, 'utf8')).dependencies[dependency], templatePkg.dependencies[dependency])
    assert.equal(readFileSync(join(target, 'src', 'custom.ts'), 'utf8'), 'export const keep = true\n')
  }
  assert.equal(run(['default-app', '--skip-install']).status, 0)
  assert.equal(run(['--template', 'astro', 'flag-first-app', '--skip-install']).status, 0)
  for (const args of [
    ['bad-app', '--template', 'unknown'], ['bad-app', '--template', 'toString'],
    ['bad-app', '--template'], ['bad-app', '--typo'], ['bad-app', '--dry-run'],
    ['bad-app', 'extra'], ['update', '--template', 'astro'], ['update', '--skip-install'],
    ['update', '.', 'extra'],
  ]) {
    const before = snapshot(workspace)
    assert.notEqual(run(args).status, 0, args.join(' '))
    assert.deepEqual(snapshot(workspace), before)
  }
  assert.equal(run(['--help']).status, 0)
  assert.equal(run(['--version']).status, 0)
  // The default install path must still invoke npm (the stub deliberately fails).
  assert.notEqual(run(['install-app']).status, 0)
  assert.ok(existsSync(join(workspace, 'install-app', 'npm-invoked')))
  console.log('CLI options: OK (templates, install control, dry-run preservation, invalid arguments)')
} finally {
  rmSync(workspace, { recursive: true, force: true })
}
