const { test } = require("node:test")
const assert = require("node:assert/strict")
const { readFileSync, existsSync } = require("node:fs")
const { resolve, join, dirname, extname } = require("node:path")
const React = require("react")
const { renderToStaticMarkup } = require("react-dom/server")
const ts = require("typescript")
const root = resolve(__dirname, "..")

// Render real components/content; only Next adapters and CSS compilation are
// isolated. Hosted browser checks establish actual basePath and responsive layout.
function createLoader(overrides = {}) {
  const cache = new Map()
  const adapters = {
    "next/image": ({ src, alt }) => React.createElement("img", { src, alt }),
    "next/link": ({ children, ...props }) => React.createElement("a", { ...props, "data-next-link": "true" }, children),
    ...overrides,
  }
  function load(file) {
    file = file.replaceAll("\\", "/")
    if (cache.has(file)) return cache.get(file)
    if (file.endsWith(".json")) return JSON.parse(readFileSync(join(root, file), "utf8"))
    if (file.endsWith(".module.css")) return { __esModule: true, default: new Proxy({}, { get: (_target, name) => String(name) }) }
    const result = {}
    cache.set(file, result)
    const code = ts.transpileModule(readFileSync(join(root, file), "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    }).outputText
    new Function("require", "exports", code)(name => {
      if (Object.hasOwn(adapters, name)) return adapters[name]
      if (name.startsWith("@/") || name.startsWith(".")) {
        const candidate = name.startsWith("@/") ? name.slice(2) : join(dirname(file), name)
        const target = extname(candidate) ? candidate : [".ts", ".tsx"].map(ext => candidate + ext).find(path => existsSync(join(root, path)))
        assert.ok(target, "Missing import: " + name)
        return load(target)
      }
      return require(name)
    }, result)
    return result
  }
  return load
}

function links(html) {
  return [...html.matchAll(/<a\b([^>]*)>/g)].map(match => ({
    href: match[1].match(/\bhref="([^"]*)"/)?.[1]?.replaceAll("&amp;", "&"),
    next: match[1].includes('data-next-link="true"'),
  }))
}

test("all Australian profiles retain notes, picker and attribution in the shared Info overlay", () => {
  const load = createLoader()
  const Panel = load("components/species-details-panel.tsx").default
  const { birdData: birds } = load("content/birds.ts")
  assert.equal(birds.length, 20)
  for (const [index, bird] of birds.entries()) {
    const html = renderToStaticMarkup(React.createElement(Panel, { id: "species-info", bird, birds, selectedIndex: index, showBirdPicker: true, onSelectBird() {}, onClose() {} }))
    const text = html.replace(/<[^>]*>/g, "").replaceAll("&amp;", "&").replaceAll("&#x27;", "'").replaceAll("&quot;", '\"')
    for (const value of [bird.commonName, bird.localOccurrence || bird.distribution, bird.habitat, bird.photoCredit.photographer]) assert.ok(text.includes(value), `${bird.id}: ${value}`)
    if (bird.localOccurrence && bird.localOccurrence !== bird.distribution) assert.ok(text.includes(bird.distribution))
    const anchors = links(html)
    assert.ok(anchors.some(link => link.href === bird.sources[0].url), `${bird.id}: species source`)
    assert.ok(anchors.some(link => link.href === `/aves-explorer?region=${bird.regionSlug}` && link.next), `${bird.id}: regional Next Link`)
    if (bird.audioFile) assert.ok(anchors.some(link => link.href === `/credits#audio-${bird.id}` && link.next), `${bird.id}: recording Next Link`)
    else assert.ok(text.includes("A recording is not yet available for this bird."))
    if (bird.photoCredit.teamLink) assert.ok(anchors.some(link => link.href === bird.photoCredit.teamLink && link.next))
    if (bird.photoCredit.reserveLink) assert.ok(anchors.some(link => link.href === bird.photoCredit.reserveLink && link.next))
    if (bird.photoCredit.instagramPost) assert.ok(anchors.some(link => link.href === bird.photoCredit.instagramPost))
    assert.equal((html.match(/<option /g) || []).length, birds.length)
    assert.match(html, /data-species-overlay="true"/)
    assert.match(html, /aria-label="Close species details"/)
    assert.match(html, /aria-label="Scrollable species information"/)
    assert.match(html, /aria-labelledby="species-info-title"/)
  }
})

test("default and focused Australian viewers use the same in-photo Info contract", () => {
  const load = createLoader()
  const Carousel = load("components/homepage-bird-carousel.tsx").default
  const Explorer = load("components/australia-home-explorer.tsx").AustraliaHomeExplorer
  const Regional = load("components/regional-bird-carousel.tsx").RegionalBirdCarousel
  for (const element of [
    React.createElement(Carousel, { autoPlay: false }),
    React.createElement(Explorer, { resizable: true }),
    React.createElement(Explorer),
    React.createElement(Regional, { regionId: "new-south-wales", compact: true }),
  ]) {
    const html = renderToStaticMarkup(element)
    assert.match(html, /data-info-presentation="overlay"/)
    assert.doesNotMatch(html, /data-info-presentation="below"/)
  }
})

test("regional viewers retain local occurrence, supported regional routes and original media credits", () => {
  let passedBirds
  const load = createLoader({
    "@/components/homepage-bird-carousel": props => { passedBirds = props.birds; return null },
  })
  const Regional = load("components/regional-bird-carousel.tsx").RegionalBirdCarousel
  const { regionalBirdSelections } = load("content/regional-birds.ts")
  const { birdData } = load("content/birds.ts")
  const Panel = createLoader()("components/species-details-panel.tsx").default
  for (const [regionId, selections] of Object.entries(regionalBirdSelections)) {
    renderToStaticMarkup(React.createElement(Regional, { regionId, compact: true }))
    assert.equal(passedBirds.length, selections.length)
    for (const [index, bird] of passedBirds.entries()) {
      const original = birdData.find(item => item.id === bird.id)
      const selection = selections.find(item => item.birdId === bird.id)
      assert.equal(bird.localOccurrence, selection.whereFound)
      assert.equal(bird.regionSlug, regionId)
      assert.equal(bird.image, original.image)
      assert.equal(bird.audioFile, original.audioFile)
      assert.deepEqual(bird.photoCredit, original.photoCredit)
      const html = renderToStaticMarkup(React.createElement(Panel, { id: "regional-info", bird, birds: passedBirds, selectedIndex: index, showBirdPicker: false, onSelectBird() {}, onClose() {} }))
      assert.ok(links(html).some(link => link.href === `/aves-explorer?region=${regionId}` && link.next))
      assert.match(html, /data-species-overlay="true"/)
    }
  }
})
