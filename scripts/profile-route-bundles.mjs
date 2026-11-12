/** Offline build estimates. These are not real visitor speed or CDN transfer measurements. */
import { readFile, writeFile } from "node:fs/promises"
import { resolve, join } from "node:path"
import { gzipSync, brotliCompressSync, constants } from "node:zlib"

const args = process.argv.slice(2)
const value = flag => args.includes(flag) ? args[args.indexOf(flag) + 1] : undefined
const root = resolve(value("--root") || ".")
const json = async path => JSON.parse(await readFile(join(root, path), "utf8"))
const manifest = await json(".next/app-build-manifest.json")
const report = { source: value("--source") || "working-tree", kind: "Per-file local build compression estimates, not field performance", routes: [] }
for (const route of ["/page", "/account/page", "/new-zealand/north-island/page", "/new-zealand/south-island/page"]) {
  if (!manifest.pages[route]) throw Error(`Missing build route: ${route}`)
  const segments = route.split("/").filter(Boolean)
  const parents = segments.slice(0, -1).map((_, i) => `/${segments.slice(0, i + 1).join("/")}/layout`)
  const paths = [...new Set(["/layout", ...parents, route].flatMap(key => manifest.pages[key] || []))]
  const files = []
  for (const path of paths) {
    const content = await readFile(join(root, ".next", path))
    files.push({ path, raw: content.length, gzip: gzipSync(content, { level: 6 }).length, brotli: brotliCompressSync(content, { params: { [constants.BROTLI_PARAM_QUALITY]: 4 } }).length })
  }
  const total = suffix => files.filter(file => file.path.endsWith(suffix)).reduce((sum, file) => ({ raw: sum.raw + file.raw, gzip: sum.gzip + file.gzip, brotli: sum.brotli + file.brotli }), { raw: 0, gzip: 0, brotli: 0 })
  report.routes.push({ route, js: total(".js"), css: total(".css"), files })
}
if (args.includes("--check-deferred-geometry")) {
  const south = await json("content/south-island-ecosystem-map.json")
  const colombia = await json("content/colombia-planning-boundaries.json")
  const rootRoute = report.routes.find(row => row.route === "/page")
  for (const file of rootRoute.files.filter(file => file.path.endsWith(".js"))) {
    const code = await readFile(join(root, ".next", file.path), "utf8")
    for (const marker of [south.outline.slice(0, 100), colombia.regions[0].path.slice(0, 100)]) {
      if (code.includes(marker)) throw Error(`Optional regional geometry entered initial homepage JavaScript: ${file.path}`)
    }
  }
  report.deferredGeometryCheck = "passed"
}
const baseline = value("--compare")
if (baseline) {
  const before = JSON.parse(await readFile(baseline, "utf8"))
  report.comparison = report.routes.map(row => {
    const old = before.routes.find(other => other.route === row.route)
    return { route: row.route, baselineSource: before.source, gzipJavaScriptBefore: old.js.gzip, gzipJavaScriptAfter: row.js.gzip, reductionPercent: Math.round((old.js.gzip - row.js.gzip) / old.js.gzip * 1000) / 10 }
  })
}
if (value("--output")) await writeFile(value("--output"), JSON.stringify(report, null, 2) + "\n")
console.log(JSON.stringify({ source: report.source, routes: report.routes.map(({ route, js }) => ({ route, js })), comparison: report.comparison, deferredGeometryCheck: report.deferredGeometryCheck }, null, 2))
