const { test } = require("node:test")
const assert = require("node:assert/strict")
const { readFileSync, existsSync } = require("node:fs")
const { resolve, join, dirname, extname } = require("node:path")
const React = require("react")
const { renderToStaticMarkup } = require("react-dom/server")
const ts = require("typescript")
const root = resolve(__dirname, "..")

// The production components remain real; only Next's build-time image/link/CSS
// adapters are substituted. Browser checks cover animation and actual gestures.
function createLoader(overrides = {}) {
  const cache = new Map()
  const adapters = {
    "next/image": ({ src, alt, fill, sizes, ...props }) => React.createElement("img", { src, alt, ...props }),
    "next/link": ({ children, ...props }) => React.createElement("a", props, children),
    ...overrides,
  }
  function load(file) {
    file = file.replaceAll("\\", "/")
    if (cache.has(file)) return cache.get(file)
    if (file.endsWith(".json")) return JSON.parse(readFileSync(join(root, file), "utf8"))
    if (file.endsWith(".module.css")) return { __esModule: true, default: new Proxy({}, { get: (_target, name) => String(name) }) }
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
        assert.ok(resolved, "Missing import: " + name)
        return load(resolved)
      }
      return require(name)
    }, exports)
    return exports
  }
  return load
}

const load = createLoader()
const { destinationRegions, getDestinationRegionBirds, getBirdRegionIds } = load("content/destination-regions.ts")
const { destinationBirds } = load("content/destination-birds.ts")

test("world-to-country drill-down preserves each complete collection and known region routes", () => {
  const expected = {
    colombia: { birds: 22, regions: 11, href: id => `/regions/${id}` },
    australia: { birds: 20, regions: 9, href: id => `/australia/regions/${id}` },
    "new-zealand": { birds: 31, regions: 3, href: id => load("lib/new-zealand-region-links.ts").newZealandRegionHref(id) },
  }
  assert.deepEqual(Object.keys(destinationRegions).sort(), Object.keys(expected).sort())
  for (const [country, counts] of Object.entries(expected)) {
    const regions = destinationRegions[country]
    assert.equal(regions.length, counts.regions, country)
    assert.equal(new Set(regions.map(region => region.id)).size, regions.length)
    assert.equal(getDestinationRegionBirds(country).length, counts.birds, country)
    assert.equal(getDestinationRegionBirds(country), destinationBirds[country], "Back/reset reuses the complete existing country collection")
    assert.equal(getDestinationRegionBirds(country, ""), destinationBirds[country])
    for (const region of regions) {
      assert.ok(region.name.trim() && region.id.trim())
      assert.equal(region.href, counts.href(region.id))
      assert.ok(getDestinationRegionBirds(country, region.id).length > 0, `${country}/${region.id} has reviewed local media`)
    }
  }
})

test("all Colombian and Australian regional photographs use explicit sourced local memberships", () => {
  const before = JSON.stringify(destinationBirds)
  const selections = {
    colombia: Object.fromEntries(load("content/regions.ts").regions.map(region => [region.id, region.birds])),
    australia: load("content/global-australian-regional-birds.json").regions,
  }
  for (const [country, localRegions] of Object.entries(selections)) for (const region of destinationRegions[country]) {
    // This country profile has a sourced Queensland association but predates
    // the curated regional list. Preserve it rather than leaving its map blank.
    const local = region.id === "queensland" ? [...localRegions[region.id], (() => {
      const bird = destinationBirds.australia.find(item => item.id === "au-regent-bowerbird")
      return { birdId: bird.id, whereFound: bird.localOccurrence || bird.distribution, sources: bird.sources }
    })()] : localRegions[region.id]
    const birds = getDestinationRegionBirds(country, region.id)
    assert.deepEqual(birds.map(bird => bird.id), local.map(selection => selection.birdId), `${country}/${region.id}: exact reviewed membership/order`)
    assert.equal(new Set(birds.map(bird => bird.id)).size, birds.length)
    for (const bird of birds) {
      const original = destinationBirds[country].find(item => item.id === bird.id)
      const occurrence = local.find(item => item.birdId === bird.id)
      assert.ok(original, bird.id)
      assert.equal(bird.primaryRegion, region.name)
      assert.equal(bird.regionSlug, region.id)
      assert.equal(bird.regionHref, region.href)
      assert.equal(bird.localOccurrence, occurrence.whereFound)
      assert.equal(bird.distribution, original.distribution)
      assert.equal(bird.habitat, original.habitat)
      for (const field of ["image", "audioFile", "audioCreditHref", "photoCredit"]) assert.deepEqual(bird[field], original[field], `${bird.id}: media/rights ${field}`)
      assert.equal(bird.sources[0].url, original.sources[0].url, "species guide remains the first source")
      for (const source of [...original.sources, ...occurrence.sources]) assert.ok(bird.sources.some(item => item.url === source.url), `${bird.id}: source retained`)
    }
  }
  assert.equal(JSON.stringify(destinationBirds), before, "regional context never changes the country catalogue")
})

test("New Zealand regional collections follow explicit island links rather than broad display labels", () => {
  const links = load("content/new-zealand-bird-islands.ts").newZealandBirdIslands
  for (const region of destinationRegions["new-zealand"]) {
    const birds = getDestinationRegionBirds("new-zealand", region.id)
    assert.deepEqual(birds.map(bird => bird.id), destinationBirds["new-zealand"].filter(bird => links[bird.id]?.includes(region.id)).map(bird => bird.id))
    assert.ok(birds.every(bird => bird.regionHref === region.href && bird.primaryRegion === region.name))
  }
  const south = getDestinationRegionBirds("new-zealand", "south-island")
  assert.equal(south.length, 30)
  assert.ok(south.some(bird => bird.id === "nz-kea"))
  assert.ok(!south.some(bird => bird.id === "nz-red-crowned-parakeet"), "Rakiura-only featured record is not silently assigned to South Island")
  assert.deepEqual(getBirdRegionIds("new-zealand", "nz-tui"), ["north-island", "south-island", "rakiura"])
  assert.deepEqual(getBirdRegionIds("new-zealand", "nz-kea"), ["south-island"])
})

test("bird-to-map highlighting agrees with every regional collection", () => {
  for (const [country, regions] of Object.entries(destinationRegions)) {
    for (const bird of destinationBirds[country]) {
      const expected = regions.filter(region => getDestinationRegionBirds(country, region.id).some(item => item.id === bird.id)).map(region => region.id)
      assert.ok(expected.length > 0, `${country}/${bird.id}: every featured photo retains a supported map region`)
      assert.deepEqual(getBirdRegionIds(country, bird.id), expected, `${country}/${bird.id}`)
      for (const id of getBirdRegionIds(country, bird.id)) assert.ok(regions.some(region => region.id === id))
    }
  }
  assert.deepEqual(getBirdRegionIds("australia", "au-regent-bowerbird"), ["queensland"])
})

test("unknown or cross-country identifiers cannot expose a misleading fallback region", () => {
  for (const country of ["missing", "constructor", "__proto__", "toString"]) {
    assert.deepEqual(getDestinationRegionBirds(country), [])
    assert.deepEqual(getDestinationRegionBirds(country, "south-island"), [])
    assert.deepEqual(getBirdRegionIds(country, "nz-kea"), [])
  }
  for (const [country, id] of [["colombia", "south-island"], ["new-zealand", "new-south-wales"], ["australia", "pacific"], ["australia", "constructor"]]) assert.deepEqual(getDestinationRegionBirds(country, id), [])
  assert.deepEqual(getBirdRegionIds("new-zealand", "co-andean-motmot"), [])
  assert.deepEqual(getBirdRegionIds("colombia", "nonexistent"), [])
})

test("Australian regional snapshot records provenance and cannot depend on another checkout at runtime", () => {
  const snapshot = load("content/global-australian-regional-birds.json")
  assert.equal(snapshot.provenance.sourceBranch, "australia/preview")
  assert.equal(snapshot.provenance.sourceFile, "content/regional-birds.ts")
  assert.match(snapshot.provenance.scope, /not complete distributions/i)
  assert.deepEqual(Object.keys(snapshot.regions).sort(), destinationRegions.australia.map(region => region.id).sort())
  for (const selections of Object.values(snapshot.regions)) for (const selection of selections) {
    assert.ok(selection.whereFound.trim() && selection.sources.length)
    assert.ok(selection.sources.every(source => source.title && /^https:\/\//.test(source.url)))
  }
})

function elements(node, predicate) {
  if (Array.isArray(node)) return node.flatMap(child => elements(child, predicate))
  if (!React.isValidElement(node)) return []
  return [...(predicate(node) ? [node] : []), ...elements(node.props.children, predicate)]
}

test("regional maps preserve real geometry, direct links and equivalent named selection controls", () => {
  const Map = load("components/destination-regional-map.tsx").default
  for (const [country, regions] of Object.entries(destinationRegions)) {
    const html = renderToStaticMarkup(React.createElement(Map, { country }))
    const staticLinks = elements(Map({ country }), item => item.type === "a")
    for (const region of regions) {
      assert.ok(staticLinks.some(link => link.props.href === region.href && link.props["aria-label"] === `Explore ${load("lib/place-language.ts").placeInSentence(region.name)}`), `${country}/${region.id}: named static Explore link retained`)
    }
    if (country !== "colombia") assert.match(html, /preserveAspectRatio="xMidYMid meet"/)
    const selected = regions[regions.length - 1]
    const choices = []
    const tree = Map({ country, selectedRegionId: selected.id, highlightedRegionIds: [regions[0].id], onSelectRegion: id => choices.push(id) })
    const controls = elements(tree, item => item.props["aria-label"]?.startsWith("Preview "))
    for (const region of regions) {
      const control = controls.find(item => item.props["aria-label"] === `Preview ${region.name} birds`)
      assert.ok(control, `${country}/${region.id}: named interactive map control`)
      assert.equal(control.props["aria-pressed"], selected.id === region.id, "manual region selection takes precedence over automatic photo highlights")
      assert.equal(control.props["aria-hidden"], undefined, "neighbouring regions remain available while focused")
      assert.notEqual(control.props.tabIndex, -1)
      assert.notEqual(control.props.style?.pointerEvents, "none")
      control.props.onClick()
      assert.equal(choices.pop(), region.id)
      if (control.type === "g") {
        assert.equal(control.props.role, "button")
        assert.equal(control.props.tabIndex, 0)
        for (const key of ["Enter", " "]) {
          let prevented = false
          control.props.onKeyDown({ key, preventDefault() { prevented = true } })
          assert.ok(prevented, "Space must not also scroll the page")
          assert.equal(choices.pop(), region.id)
        }
        control.props.onKeyDown({ key: "Escape", preventDefault() { assert.fail("unrelated key should keep its default") } })
        assert.equal(choices.length, 0)
      } else {
        assert.equal(control.type, "button", "HTML controls retain native keyboard behavior")
        assert.equal(control.props.type, "button")
      }
    }
  }
  const australia = renderToStaticMarkup(React.createElement(Map, { country: "australia" }))
  for (const state of load("content/global-australian-map.ts").australiaMapStates) assert.ok(australia.includes(`d="${state.path}"`), `${state.name}: unchanged geometry`)
  const nz = renderToStaticMarkup(React.createElement(Map, { country: "new-zealand" }))
  for (const island of load("content/new-zealand-map.json").islands) for (const path of island.paths) assert.ok(nz.includes(`d="${path}"`), `${island.id}: unchanged geometry`)
})

test("selected regional maps use a real zoom transform, while country overviews keep all region controls available", () => {
  const Map = load("components/destination-regional-map.tsx").default
  for (const [country, regions] of Object.entries(destinationRegions)) {
    const overview = elements(Map({ country, onSelectRegion() {} }), item => item.props["aria-label"]?.startsWith("Preview "))
    for (const control of overview) {
      assert.equal(control.props["aria-hidden"], undefined)
      assert.equal(control.props.tabIndex, control.type === "g" ? 0 : undefined)
      assert.notEqual(control.props.style?.pointerEvents, "none")
    }
    for (const region of regions) {
      const tree = Map({ country, selectedRegionId: region.id, onSelectRegion() {} })
      const transforms = elements(tree, item => typeof item.props.style?.transform === "string").map(item => item.props.style.transform)
      assert.ok(transforms.some(value => /scale\((?!1\))/.test(value)), `${country}/${region.id}: selection receives a closer view`)
      const controls = elements(tree, item => item.props["aria-label"]?.startsWith("Preview "))
      assert.ok(controls.some(control => control.props["aria-pressed"] && control.props["aria-hidden"] !== true))
      assert.ok(controls.every(control => control.props["aria-hidden"] !== true && control.props.style?.pointerEvents !== "none"), "zooming must not disable visible neighbouring regions")
    }
  }
})

test("country map highlights follow every supported region of the displayed photograph", () => {
  const Map = load("components/destination-regional-map.tsx").default
  for (const [country, regions] of Object.entries(destinationRegions)) for (const bird of destinationBirds[country]) {
    const highlighted = getBirdRegionIds(country, bird.id)
    const tree = Map({ country, highlightedRegionIds: highlighted, onSelectRegion() {} })
    const controls = elements(tree, item => item.props["aria-label"]?.startsWith("Preview "))
    for (const region of regions) {
      const control = controls.find(item => item.props["aria-label"] === `Preview ${region.name} birds`)
      assert.equal(control.props["aria-pressed"], highlighted.includes(region.id), `${country}/${bird.id}/${region.id}`)
    }
  }
})


test("whole Colombian shapes keep the reviewed geography and native neighbouring guide links", () => {
  const Targets = load("components/colombia-region-targets.tsx").default
  const boundaries = load("content/colombia-planning-boundaries.json")
  const choices = []
  const tree = Targets({ onSelect: id => choices.push(id) })
  const links = elements(tree, item => item.type === "a")
  assert.equal(links.length, 11)
  for (const link of links) {
    const path = elements(link, item => item.type === "path")[0]
    assert.ok(boundaries.regions.some(region => region.path === path.props.d))
    let prevented = false
    link.props.onClick({button:0, preventDefault(){prevented=true}})
    assert.equal(prevented, true)
    assert.equal(link.props.href, `/regions/${choices.pop()}`)
    let modifiedPrevented = false
    link.props.onClick({button:0, ctrlKey:true, preventDefault(){modifiedPrevented=true}})
    assert.equal(modifiedPrevented, false, "modified click keeps the native guide link")
  }
})
