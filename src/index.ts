#!/usr/bin/env node

import { execSync } from "child_process"
import { copy, readJson, writeJson } from "fs-extra"
import path from "path"
import { fileURLToPath } from "url"

const projectName = process.argv[2]
if (!projectName) {
  console.error("Usage: spectre-init <project-name>")
  process.exit(1)
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const templateDir = path.join(__dirname, "../templates/vanilla")
const targetDir = path.join(process.cwd(), projectName)

async function main() {
  console.log(`Scaffolding Spectre app: ${projectName}`)

  await copy(templateDir, targetDir)

  const pkgPath = path.join(targetDir, "package.json")
  const pkg = await readJson(pkgPath)
  pkg.name = projectName
  await writeJson(pkgPath, pkg, { spaces: 2 })

  console.log("Installing dependencies...")
  execSync("npm install", { cwd: targetDir, stdio: "inherit" })

  console.log("Done.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
