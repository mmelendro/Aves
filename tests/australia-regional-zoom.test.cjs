const { test } = require("node:test")
const assert = require("node:assert/strict")
const { readFileSync, existsSync } = require("node:fs")
const { resolve, join, dirname, extname } = require("node:path")
const React = require("react")
const { renderToStaticMarkup } = require("react-dom/server")
const ts = require("typescript")
const root = resolve(__dirname, "..")

function loader(overrides = {}, windowMock = {}) {
  const cache = new Map()
  const adapters = {
    "next/navigation": { useRouter: () => ({ push() {} }) },
    "next/image": ({ src, alt }) => React.createElement("img", { src, alt }),
    "next/link": ({ children, ...props }) => React.createElement("a", props, children),
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
    new Function("require", "exports", "window", code)(name => {
      if (Object.hasOwn(adapters, name)) return adapters[name]
      if (name.startsWith("@/") || name.startsWith(".")) {
        const candidate = name.startsWith("@/") ? name.slice(2) : join(dirname(file), name)
        const target = extname(candidate) ? candidate : [".ts", ".tsx"].map(ext => candidate + ext).find(path => existsSync(join(root, path)))
        assert.ok(target, "Missing import: " + name)
        return load(target)
      }
      return require(name)
    }, result, windowMock)
    return result
  }
  return load
}

test("Australian zoom collections preserve sourced local notes, original media and all country birds", () => {
  const load = loader()
  const { australianRegionBirds } = load("features/australia/lib/australia-region-birds.ts")
  const { regionalBirdSelections } = load("features/australia/content/regional-birds.ts")
  const birdData = load("features/australia/content/carousel-birds.ts").australianBirds
  const original = JSON.stringify(birdData)
  assert.equal(australianRegionBirds().length, 20)
  assert.deepEqual(australianRegionBirds("constructor"), [])
  assert.deepEqual(australianRegionBirds("south-island"), [])
  const seen = new Set()
  for (const [regionId, selections] of Object.entries(regionalBirdSelections)) {
    const birds = australianRegionBirds(regionId)
    assert.equal(birds.length, selections.length + (regionId === "queensland" ? 1 : 0))
    for (const bird of birds) {
      seen.add(bird.id)
      const source = birdData.find(item => item.id === bird.id)
      const local = selections.find(item => item.birdId === bird.id)
      assert.equal(bird.regionSlug, regionId)
      assert.equal(bird.image, source.image)
      assert.equal(bird.audioFile, source.audioFile)
      assert.deepEqual(bird.photoCredit, source.photoCredit)
      assert.equal(bird.distribution, source.distribution)
      if (local) {
        assert.equal(bird.localOccurrence, local.whereFound)
        for (const reference of local.sources) assert.ok(bird.sources.some(item => item.url === reference.url))
      } else {
        assert.equal(bird.id, "au-regent-bowerbird")
        assert.equal(regionId, source.regionSlug)
        assert.equal(bird.localOccurrence, source.localOccurrence || source.distribution)
      }
    }
  }
  assert.equal(seen.size, 20)
  assert.equal(JSON.stringify(birdData), original, "local context must not mutate the country catalogue")
})

test("each focused Australian view zooms real geometry with native guide and country exits", () => {
  const load = loader()
  const Explorer = load("features/australia/components/australia-home-explorer.tsx").AustraliaHomeExplorer
  const { regionOptions } = load("content/region-options.ts")
  const { australiaMapStates, australiaMapViewBox } = load("features/australia/content/australia-map.ts")
  const { mapZoomTransform } = load("lib/map-zoom.ts")
  for (const region of regionOptions) {
    const html = renderToStaticMarkup(React.createElement(Explorer, { initialRegion: region.id, resizable: true }))
    assert.match(html, new RegExp(`data-map-zoom="${region.id}"`))
    assert.match(html, /Back to Australia/)
    assert.ok(html.includes(`aria-label="${region.label} bird photographs"`))
    assert.ok(html.includes(`href="/australia/regions/${region.id}"`), "native SVG href preserves no-JS/new-tab navigation")
    const shape = australiaMapStates.find(state => state.regionId === region.id)
    const transform = mapZoomTransform(australiaMapViewBox, [shape.path], 12)
    assert.notEqual(transform, "translate(0px, 0px) scale(1)")
    assert.ok(html.includes(transform), "the actual reviewed path determines the transform")
    assert.ok(html.includes(shape.path), "original geography is retained")
    assert.match(html, /aria-label="Choose an Australian region"/)
    assert.ok(html.includes(`Birding in ${region.label}`), "selected-region introduction changes with its map and birds")
    assert.ok(html.includes(`href="/australia/contact?region=${region.id}"`), "the planning action retains the selected region")
  }
})

// A small hook harness exercises event/state decisions without pretending to
// establish browser geometry, focus or playback; hosted UI checks cover those.
function explorerHarness(props = {}) {
  const states = [], refs = []
  let stateIndex = 0, refIndex = 0
  const load = loader({ react: {
    ...React,
    useId: () => "test-au-map",
    useState(initial) { const index = stateIndex++; if (!(index in states)) states[index] = typeof initial === "function" ? initial() : initial; return [states[index], value => { states[index] = typeof value === "function" ? value(states[index]) : value }] },
    useRef(initial) { const index = refIndex++; return refs[index] ??= { current: initial } },
    useCallback: value => value,
    useEffect() {},
  } })
  const Explorer = load("features/australia/components/australia-home-explorer.tsx").AustraliaHomeExplorer
  return { render() { stateIndex = 0; refIndex = 0; return Explorer(props) } }
}
function nodes(tree) {
  if (!tree || typeof tree !== "object") return []
  if (Array.isArray(tree)) return tree.flatMap(nodes)
  const props = tree.props ?? {}
  return [tree, ...nodes(props.children), ...nodes(props.map), ...nodes(props.media)]
}
function clickEvent(extra = {}) { return { button: 0, preventDefault() { this.prevented = true }, ...extra } }

test("country map previews only normal clicks, changes the local collection and resets it on Back", () => {
  const harness = explorerHarness({ resizable: true })
  let tree = harness.render()
  const carousel = () => nodes(tree).find(node => Array.isArray(node.props?.birds))
  assert.equal(carousel().props.birds.length, 20)
  let regionLink = nodes(tree).find(node => node.type === "a" && node.props["aria-label"] === "Explore New South Wales")
  for (const modifier of [{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }]) {
    const modified = clickEvent(modifier)
    regionLink.props.onClick(modified)
    tree = harness.render()
    assert.equal(modified.prevented, undefined)
    assert.equal(carousel().props.birds.length, 20)
  }
  const normal = clickEvent()
  regionLink.props.onClick(normal)
  tree = harness.render()
  assert.equal(normal.prevented, true)
  assert.equal(carousel().props.birds.length, 6)
  assert.equal(carousel().props.label, "New South Wales bird photographs")
  assert.equal(carousel().key, "new-south-wales", "region changes remount old audio/details")
  const back = nodes(tree).find(node => node.type === "button" && node.props.onClick?.name === "backToAustralia")
  let restoredFocus = false
  const select = nodes(tree).find(node => node.type === "select")
  select.props.ref.current = { focus(options) { restoredFocus = options.preventScroll } }
  back.props.onClick()
  tree = harness.render()
  assert.equal(carousel().props.birds.length, 20)
  assert.equal(carousel().key, "australia")
  assert.equal(restoredFocus, true)
})

test("custom regional media previews on first tap and retains native guide navigation on the second", () => {
  const custom = React.createElement("span", { "data-custom-media": "true" }, "Regional collection")
  const harness = explorerHarness({ initialRegion: "victoria", media: custom })
  let tree = harness.render()
  const link = nodes(tree).find(node => node.type === "a" && node.props["aria-label"] === "Explore Victoria")
  const event = clickEvent()
  link.props.onClick(event)
  tree = harness.render()
  assert.equal(event.prevented, true, "default highlight is not a deliberate first tap")
  const second = clickEvent()
  nodes(tree).find(node => node.type === "a" && node.props["aria-label"] === "Explore Victoria").props.onClick(second)
  assert.equal(second.prevented, undefined, "second activation follows the native guide href")
  assert.ok(nodes(tree).includes(custom))
  assert.ok(nodes(tree).some(node => node.props?.["data-map-zoom"] === "victoria"))
  assert.equal(nodes(tree).some(node => node.type === "select"), false)
})

test("Australian keyboard previews use the unified public router and keep account navigation native", () => {
  const pushed = [], native = [], previews = []
  const load = loader({
    react: { ...React, useRef: value => ({ current: value }) },
    "next/navigation": { useRouter: () => ({ push: href => pushed.push(href) }) },
  }, { location: { href: "https://aves.bio/australia", assign: href => native.push(href) } })
  const { useRegionPreview } = load("components/use-region-preview.ts")
  const preview = useRegionPreview(id => previews.push(id))
  const event = () => ({ key: "Enter", preventDefault() {} })
  const href = "/australia/regions/new-south-wales"
  preview.activateKey(event(), "new-south-wales", href)
  assert.deepEqual(previews, ["new-south-wales"])
  assert.deepEqual(pushed, [])
  preview.activateKey(event(), "new-south-wales", href)
  assert.deepEqual(pushed, [href])
  preview.activateButton("account", "/account")
  preview.activateButton("account", "/account")
  assert.deepEqual(native, ["/account"])
  assert.deepEqual(pushed, [href])
})
