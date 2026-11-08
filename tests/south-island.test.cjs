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


test("ecosystem filtering retains only sourced South Island profiles and original media records", () => {
  const { filterSouthIslandBirds, southIslandEcosystems, southIslandBirdEcosystems } = load("content/south-island-ecosystems.ts")
  const { newZealandRegionBirds } = load("content/new-zealand-carousel.ts")
  const local = newZealandRegionBirds("south-island")
  const allowed = new Set(southIslandEcosystems.map(item => item.id))
  assert.equal(local.length, 30)
  assert.deepEqual(filterSouthIslandBirds(local, "all"), local)
  assert.deepEqual(Object.keys(southIslandBirdEcosystems).sort(), local.map(bird => bird.id).sort())
  for (const bird of local) {
    assert.ok(southIslandBirdEcosystems[bird.id].length, bird.id)
    assert.ok(southIslandBirdEcosystems[bird.id].every(id => allowed.has(id)), bird.id)
    assert.ok(bird.sources.length && bird.localOccurrence && bird.audioFile, bird.id)
  }
  for (const habitat of allowed) {
    const filtered = filterSouthIslandBirds(local, habitat)
    assert.ok(filtered.length > 0 && filtered.length < local.length)
    assert.ok(filtered.every(bird => local.includes(bird)), "rights/calls/focal data remain the original objects")
    assert.ok(!filtered.some(bird => bird.id === "nz-red-crowned-parakeet"))
  }
  const ids = habitat => filterSouthIslandBirds(local, habitat).map(bird => bird.id)
  assert.ok(ids("forest").includes("nz-kaka"))
  assert.ok(ids("mountains").includes("nz-rock-wren"))
  assert.ok(ids("freshwater").includes("nz-black-stilt"))
  assert.ok(!ids("mountains").includes("nz-black-stilt"), "a high-country location alone does not imply alpine habitat")
  assert.ok(ids("coast").includes("nz-huttons-shearwater"))
  assert.ok(!ids("mountains").includes("nz-huttons-shearwater"), "sensitive mountain colonies are not viewing recommendations")
  const unknown = { ...local[0], id: "unreviewed" }
  assert.deepEqual(filterSouthIslandBirds([unknown], "forest"), [])
  assert.deepEqual(filterSouthIslandBirds([unknown], "all"), [unknown])
  assert.deepEqual(filterSouthIslandBirds([], "all"), [])
})


test("LCDB geometry shares one undistorted Mercator frame and preserves verified cover control points", () => {
  const map = load("content/south-island-ecosystem-map.json")
  const [left,bottom,right,top] = map.bbox
  assert.ok(Math.abs((right-left)/480 - (top-bottom)/640) < 0.000001, "raster and coastline use square projected pixels")
  assert.match(map.source.requestUrl, /lcdb_lcdb6/)
  assert.match(map.source.licenceUrl, /creativecommons.org/)
  assert.equal(map.source.imagery, "2023/24")
  assert.equal(map.source.sha256.length, 64)
  // Independently queried official GetFeatureInfo at these pixels: class69
  // indigenous forest, and class40 exotic pasture. Prevent projection drift or
  // recolouring pasture into forest/alpine habitats. Half pixel is cell centre.
  function inside(path,x,y) {
    let odd=false
    for (const ring of path.split("M").filter(Boolean)) {
      const values=ring.match(/-?\d+(?:\.\d+)?/g).map(Number)
      for (let i=0,j=values.length-2; i<values.length; j=i,i+=2) {
        const xi=values[i],yi=values[i+1],xj=values[j],yj=values[j+1]
        if ((yi>y)!==(yj>y) && x<(xj-xi)*(y-yi)/(yj-yi)+xi) odd=!odd
      }
    }
    return odd
  }
  const forest=map.layers.find(layer=>layer.id==="forest")
  assert.ok(inside(map.outline,101.5,442.5))
  assert.ok(inside(forest.path,101.5,442.5), "verified Fiordland indigenous forest")
  assert.ok(inside(map.outline,330.5,308.5))
  assert.ok(map.layers.every(layer=>!inside(layer.path,330.5,308.5)), "verified Canterbury exotic grassland stays neutral")
  assert.deepEqual(map.layers.map(layer=>layer.id).sort(),["forest","freshwater","mountains"])
  assert.ok(!map.layers.some(layer=>layer.id==="coast"), "do not invent marine habitat polygons from land cover")
})

test("controlled habitat map has equivalent keyboard map/legend choices, honest sources and reversible selection", () => {
  const Map = load("components/south-island-ecosystem-map.tsx").default
  for (const selected of ["all","forest","mountains","freshwater","coast"]) {
    const html=renderToStaticMarkup(React.createElement(Map,{selected,onSelect:()=>{}}))
    assert.match(html,/2023\/24/)
    assert.match(html,/CC BY 3.0 NZ/)
    assert.match(html,/offshore habitat is not mapped/)
    assert.match(html,/Back to New Zealand/)
    for (const name of ["Forest &amp; scrub","Mountains &amp; tussock","Rivers, lakes &amp; wetlands","Coasts &amp; offshore waters"]) {
      assert.ok(html.includes(`aria-label="Filter birds: ${name}"`), name)
      assert.ok(html.includes(`aria-label="Show ${name} birds on map"`), name)
    }
    assert.match(html,/role="button" tabindex="0"/)
    assert.equal((html.match(/aria-pressed="true"/g)||[]).length,selected==="all"?1:2,"one state controls map and legend; All reset is separate")
  }
})
