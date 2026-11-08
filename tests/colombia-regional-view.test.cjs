const { test } = require("node:test")
const assert = require("node:assert/strict")
const { readFileSync, existsSync } = require("node:fs")
const { resolve, join, dirname, extname } = require("node:path")
const React = require("react")
const { renderToStaticMarkup } = require("react-dom/server")
const ts = require("typescript")
const root = resolve(__dirname, "..")

function loader() {
  const cache = new Map()
  const adapters = {
    "next/image": ({ src, alt, fill, sizes, priority, ...props }) => React.createElement("img", { src, alt, ...props }),
    "next/link": ({ children, ...props }) => React.createElement("a", props, children),
  }
  function load(file) {
    file = file.replaceAll("\\", "/")
    if (cache.has(file)) return cache.get(file)
    if (file.endsWith(".json")) return JSON.parse(readFileSync(join(root, file), "utf8"))
    if (file.endsWith(".module.css")) return { __esModule: true, default: new Proxy({}, { get: (_target, key) => String(key) }) }
    const exports = {}
    cache.set(file, exports)
    const code = ts.transpileModule(readFileSync(join(root, file), "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    }).outputText
    new Function("require", "exports", code)(name => {
      if (Object.hasOwn(adapters, name)) return adapters[name]
      if (name.startsWith("@/") || name.startsWith(".")) {
        const candidate = name.startsWith("@/") ? name.slice(2) : join(dirname(file), name)
        const resolved = extname(candidate) ? candidate : [".ts", ".tsx"].map(ext => candidate + ext).find(path => existsSync(join(root, path)))
        assert.ok(resolved, `Missing import: ${name}`)
        return load(resolved)
      }
      return require(name)
    }, exports)
    return exports
  }
  return load
}

const load = loader()

test("cached Colombian collections retain every reviewed local record, media right and source without mutating the country", () => {
  const { colombiaRegionBirds } = load("content/colombia-regional-birds.ts")
  const { birdData } = load("content/birds.ts")
  const { regions } = load("content/regions.ts")
  const countryBefore = JSON.stringify(birdData)
  const seen = new Set()
  assert.equal(regions.length, 11)
  for (const region of regions) {
    const selected = colombiaRegionBirds(region.id)
    assert.equal(selected, colombiaRegionBirds(region.id), "a stable cached collection does not cause carousel/map update loops")
    assert.deepEqual(selected.map(bird => bird.id), region.birds.map(bird => bird.birdId))
    assert.equal(new Set(selected.map(bird => bird.id)).size, selected.length)
    for (const bird of selected) {
      seen.add(bird.id)
      const original = birdData.find(item => item.id === bird.id)
      const local = region.birds.find(item => item.birdId === bird.id)
      assert.ok(original && local)
      assert.equal(bird.regionSlug, region.id)
      assert.equal(bird.regionHref, `/regions/${region.id}`)
      assert.equal(bird.localOccurrence, local.whereFound)
      for (const key of ["image", "imagePosition", "audioFile", "photoCredit", "distribution", "habitat"]) assert.deepEqual(bird[key], original[key], `${bird.id}: ${key}`)
      for (const source of [...original.sources, ...local.sources]) assert.ok(bird.sources.some(item => item.url === source.url))
    }
  }
  assert.deepEqual([...seen].sort(), birdData.map(bird => bird.id).sort(), "all country photographs retain at least one reviewed local collection")
  assert.equal(JSON.stringify(birdData), countryBefore)
  for (const id of ["", "missing", "south-island", "constructor", "__proto__"]) assert.deepEqual(colombiaRegionBirds(id), [])
})

test("Colombia overview, focused region and custom editorial media keep their own viewer scopes", () => {
  const Explorer = load("components/colombia-hero-explorer.tsx").default
  const { colombiaRegionBirds } = load("content/colombia-regional-birds.ts")
  const overview = renderToStaticMarkup(React.createElement(Explorer, { resizable: true }))
  assert.match(overview, /aria-label="Image 1 of 22"/)
  assert.equal((overview.match(/aria-roledescription="carousel"/g) || []).length, 1)
  assert.doesNotMatch(overview, />Back to Colombia<\/button>/)

  const region = "pacific"
  const focused = renderToStaticMarkup(React.createElement(Explorer, { initialRegion: region, resizable: true }))
  assert.ok(focused.includes(`aria-label="Image 1 of ${colombiaRegionBirds(region).length}"`))
  assert.match(focused, />Back to Colombia<\/button>/)
  assert.match(focused, /Location marker, not a precise regional boundary/)
  assert.match(focused, /href="\/contact\?region=pacific"/)
  assert.match(focused, /style="transform:scale\(2\.4\)/)

  const custom = React.createElement("img", { src: "/images/custom-editorial.jpg", alt: "Custom editorial bird" })
  const editorial = renderToStaticMarkup(React.createElement(Explorer, { initialRegion: region, media: custom }))
  assert.equal((editorial.match(/alt="Custom editorial bird"/g) || []).length, 1)
  assert.doesNotMatch(editorial, /aria-roledescription="carousel"/)
  assert.match(editorial, /href="\/colombia"[^>]*>Back to Colombia<\/a>/)
})
