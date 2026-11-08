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

test("all Australian profiles retain notes, picker and attribution in both Info presentations", () => {
  const load = createLoader()
  const Panel = load("components/species-details-panel.tsx").default
  const { birdData: birds } = load("content/birds.ts")
  assert.equal(birds.length, 20)
  for (const presentation of ["below", "overlay"]) for (const [index, bird] of birds.entries()) {
    const html = renderToStaticMarkup(React.createElement(Panel, { id: "species-info", bird, birds, selectedIndex: index, showBirdPicker: true, presentation, onSelectBird() {}, onClose() {} }))
    const text = html.replace(/<[^>]*>/g, "").replaceAll("&amp;", "&").replaceAll("&#x27;", "'").replaceAll("&quot;", '"')
    for (const value of [bird.commonName, bird.localOccurrence || bird.distribution, bird.habitat, bird.photoCredit.photographer]) assert.ok(text.includes(value), `${presentation}: ${bird.id}: ${value}`)
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
    if (presentation === "overlay") {
      assert.match(html, /data-species-overlay="true"/)
      assert.match(html, /aria-label="Close species details"/)
      assert.match(html, /aria-label="Scrollable species information"/)
      assert.match(html, /aria-labelledby="species-info-title"/)
    } else assert.doesNotMatch(html, /data-species-overlay|Close species details/)
  }
})

test("only the resizable Australian homepage explorer opts into the glass Info panel", () => {
  const load = createLoader({
    "@/components/homepage-bird-carousel": props => React.createElement("div", { "data-info-presentation": props.infoPresentation ?? "below" }),
  })
  const Explorer = load("components/australia-home-explorer.tsx").AustraliaHomeExplorer
  const home = renderToStaticMarkup(React.createElement(Explorer, { resizable: true }))
  const focused = renderToStaticMarkup(React.createElement(Explorer))
  assert.match(home, /data-info-presentation="overlay"/)
  assert.match(focused, /data-info-presentation="below"/)
  assert.doesNotMatch(focused, /data-info-presentation="overlay"/)
  const Carousel = createLoader()("components/homepage-bird-carousel.tsx").default
  const defaultViewer = renderToStaticMarkup(React.createElement(Carousel, { autoPlay: false }))
  assert.match(defaultViewer, /data-info-presentation="below"/)
})
