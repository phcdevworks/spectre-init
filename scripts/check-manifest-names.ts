import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

const repoRoot = resolve(import.meta.dirname, '..')
const workspace = mkdtempSync(join(tmpdir(), 'spectre-init-manifest-'))

try {
  for (const template of ['vanilla', 'shell-app', 'astro']) {
    for (const name of ['spectre-app', 'renamed-app']) {
      const target = join(workspace, `${template}-${name}`)
      cpSync(join(repoRoot, 'templates', template), target, { recursive: true })
      const pkgPath = join(target, 'package.json')
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
      pkg.name = name
      writeFileSync(pkgPath, JSON.stringify(pkg))
      const manifestPath = join(target, 'spectre.manifest.json')
      const original = JSON.parse(readFileSync(manifestPath, 'utf8'))
      const expectedPackages = { ...original.packages }
      const application = expectedPackages[original.system.name]
      delete expectedPackages[original.system.name]
      expectedPackages[name] = application
      const sourcePath = join(target, 'src', 'user-owned.ts')
      const source = 'export const preserved = true\n'
      writeFileSync(sourcePath, source)
      const ignoreRules = readFileSync(join(target, '_gitignore'), 'utf8')
      rmSync(join(target, '_gitignore'))

      // Repeat updates to check that the application entry survives every refresh.
      for (let run = 0; run < 2; run++) {
        const result = spawnSync(process.execPath, [join(repoRoot, 'dist/index.js'), 'update', target], {
          encoding: 'utf8',
        })
        assert.equal(result.status, 0, result.stderr || result.error?.message)
        const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
        assert.equal(manifest.system.name, name)
        assert.equal(manifest.$id, `urn:local:${name}:manifest`)
        assert.deepEqual(manifest.packages, expectedPackages, `${template}: ${name}`)
        assert.deepEqual(JSON.parse(readFileSync(pkgPath, 'utf8')), pkg)
        assert.equal(readFileSync(sourcePath, 'utf8'), source)
        assert.equal(readFileSync(join(target, '.gitignore'), 'utf8'), ignoreRules)
      }
    }
  }
  console.log('Manifest names: OK (three templates, original and renamed projects, repeated updates)')
} finally {
  rmSync(workspace, { recursive: true, force: true })
}
