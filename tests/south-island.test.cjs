const { test } = require("node:test")
const assert = require("node:assert/strict")
const { readFileSync, existsSync } = require("node:fs")
const { resolve, join, dirname, extname } = require("node:path")
const React = require("react")
const { renderToStaticMarkup } = require("react-dom/server")
const ts = require("typescript")
const root = resolve(__dirname, "..")

// Render the real content and components. Only Next's build adapters are
// replaced; responsive layout, dragging and playback need the browser checks.
function createLoader(overrides = {}) {
  const cache = new Map()
  const adapters = {
    "next/image": ({ src, alt, fill, sizes, priority, ...props }) => React.createElement("img", { src, alt, ...props }),
    "next/link": ({ children, ...props }) => React.createElement("a", props, children),
    ...overrides,
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

const load = createLoader()
const { newZealandRegionHref } = load("lib/new-zealand-region-links.ts")

test("New Zealand regional links publish only the dedicated South Island route and retain other island anchors", () => {
  assert.equal(newZealandRegionHref("south-island"), "/new-zealand/south-island")
  assert.equal(newZealandRegionHref("north-island"), "/new-zealand#region-north-island")
  assert.equal(newZealandRegionHref("rakiura"), "/new-zealand#region-rakiura")
  for (const id of ["", "missing", "__proto__", "constructor", "new-south-wales"]) assert.equal(newZealandRegionHref(id), "/new-zealand#regions")
  const pages = load("lib/public-pages.ts").publicPages
  assert.equal(pages.filter(page => page.href === "/new-zealand/south-island").length, 1)
  assert.ok(!pages.some(page => /\/new-zealand\/(north-island|rakiura)$/.test(page.href)), "unpublished guides are not advertised as pages")
  const regions = load("content/destination-regions.ts").destinationRegions["new-zealand"]
  for (const region of regions) assert.equal(region.href, newZealandRegionHref(region.id))
})

test("South Island media keeps its exact sourced island membership, licensed photos and local recordings", () => {
  const { getDestinationRegionBirds } = load("content/destination-regions.ts")
  const country = load("content/destination-birds.ts").destinationBirds["new-zealand"]
  const associations = load("content/new-zealand-bird-islands.ts").newZealandBirdIslands
  const birds = getDestinationRegionBirds("new-zealand", "south-island")
  assert.equal(birds.length, 30)
  assert.deepEqual(birds.map(bird => bird.id), country.filter(bird => associations[bird.id]?.includes("south-island")).map(bird => bird.id))
  assert.ok(birds.some(bird => bird.id === "nz-kea"))
  assert.ok(!birds.some(bird => bird.id === "nz-red-crowned-parakeet"), "Rakiura-only featured record stays out of this collection")
  for (const bird of birds) {
    const original = country.find(item => item.id === bird.id)
    assert.equal(bird.regionHref, "/new-zealand/south-island")
    assert.ok(bird.localOccurrence && bird.sources.length)
    assert.equal(bird.image, original.image)
    assert.equal(bird.audioFile, original.audioFile)
    assert.deepEqual(bird.photoCredit, original.photoCredit)
    assert.match(bird.audioFile, /^\/audio\/.+\.(?:mp3|ogg|wav)$/)
    assert.ok(existsSync(join(root, "public", bird.audioFile)), `${bird.id}: recording file exists`)
    assert.ok(existsSync(join(root, "public", bird.image)), `${bird.id}: photograph exists`)
  }
})

test("the dedicated South Island page has canonical metadata, one local explorer and private planning entry", () => {
  const explorerCalls = []
  const pageLoad = createLoader({
    "@/components/new-zealand-hero-explorer": function Explorer(props) {
      explorerCalls.push(props)
      return React.createElement("div", { "data-south-island-explorer": props.regionId })
    },
  })
  const page = pageLoad("app/new-zealand/south-island/page.tsx")
  assert.equal(page.metadata.alternates.canonical, "https://aves.bio/new-zealand/south-island")
  assert.equal(page.metadata.openGraph.url, "https://aves.bio/new-zealand/south-island")
  const html = renderToStaticMarkup(React.createElement(page.default))
  assert.equal(explorerCalls.length, 1, "one shared map/carousel rather than duplicate regional viewers")
  assert.equal(explorerCalls[0].regionId, "south-island")
  assert.match(html, /href="\/new-zealand"/)
  assert.match(html, /href="\/"/)
  assert.match(html, /href="\/account\?country=new-zealand&amp;region=south-island"/)
  assert.match(html, /South Island/)
  assert.match(html, /(?:planning beta|in development)/i)
  assert.doesNotMatch(html, /Peter|Lisa|Royann|Sylvain|mmelendro@gmail\.com/)
})

test("the shared New Zealand explorer renders the South Island collection with sound and existing bird-selection controls", () => {
  const Explorer = load("components/new-zealand-hero-explorer.tsx").default
  const html = renderToStaticMarkup(React.createElement(Explorer, { regionId: "south-island" }))
  assert.match(html, /aria-label="Image 1 of 30"/)
  assert.match(html, /aria-label="Listen to bird call"/)
  assert.match(html, /aria-label="Species details &amp; credits"/)
  assert.match(html, /data-info-presentation="overlay"/)
  assert.match(html, /data-has-bird-selection="true"/)
  assert.equal((html.match(/aria-roledescription="carousel"/g) || []).length, 1)
  assert.match(html, /href="\/account\?country=new-zealand&amp;region=south-island"/)
  assert.match(html, /src="\/audio\/[^"<>]+"/)
})
