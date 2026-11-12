/** Verify the built route graph, not only the source import syntax. */
import { readFile, readdir } from "node:fs/promises"
import { join } from "node:path"

const manifest = JSON.parse(await readFile(".next/app-build-manifest.json", "utf8"))
const catalogue = JSON.parse(await readFile("content/new-zealand-checklist-thumbnails.json", "utf8"))
const marker = catalogue.images[0].asset
const routes = ["/page", "/account/page", "/new-zealand/north-island/page", "/new-zealand/south-island/page"]
for (const route of routes) {
  if (!manifest.pages[route]) throw new Error(`Missing built route: ${route}`)
  const segments = route.split("/").filter(Boolean)
  const parents = segments.slice(0, -1).map((_, i) => `/${segments.slice(0, i + 1).join("/")}/layout`)
  const initial = new Set(["/layout", ...parents, route].flatMap(key => manifest.pages[key] ?? []))
  for (const file of initial) {
    if ((await readFile(join(".next", file), "utf8")).includes(marker)) {
      throw new Error(`Checklist media entered initial JavaScript for ${route}: ${file}`)
    }
  }
}
// Also prove the reference data still exists in an emitted async module.
const files = await readdir(".next/static/chunks", { recursive: true })
let found = false
for (const file of files.filter(name => name.endsWith(".js"))) {
  if ((await readFile(join(".next/static/chunks", file), "utf8")).includes(marker)) {
    found = true
    break
  }
}
if (!found) throw new Error("Reference media was lost rather than deferred")
console.log(`Checklist media is emitted and excluded from initial JavaScript on ${routes.length} checked routes.`)
