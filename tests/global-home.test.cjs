const { test } = require("node:test")
const assert = require("node:assert/strict")
const { readFileSync, existsSync } = require("node:fs")
const { resolve, join, dirname, extname } = require("node:path")
const React = require("react")
const { renderToStaticMarkup } = require("react-dom/server")
const ts = require("typescript")
const root = resolve(__dirname, "..")

// Render server pages while keeping Next's image/link adapters and client widgets isolated.
function createLoader(overrides = {}) {
  const cache = new Map()
  const adapters = {
    "next/image": ({ src, alt }) => React.createElement("img", { src, alt }),
    "next/link": ({ children, ...props }) => React.createElement("a", { ...props, "data-next-link": "true" }, children),
    "@/components/navigation-header": { NavigationHeader: function NavigationHeader() { return null } },
    "@/components/footer": { Footer: function Footer() { return null } },
    "@/components/homepage-bird-carousel": function HomepageBirdCarousel(props) {
      return React.createElement("div", { "data-bird-carousel": true, "data-count": props.birds?.length, "data-variant": props.variant, "data-autoplay": props.autoPlay, "data-priority": props.priority, "data-info-presentation": "overlay", "aria-label": props.label })
    },
    "@/components/contact-form-section": { ContactFormSection: function ContactFormSection() { return null } },
    ...overrides,
  }
  function load(file) {
    file = file.replaceAll("\\", "/")
    if (cache.has(file)) return cache.get(file)
    if (file.endsWith(".json")) return JSON.parse(readFileSync(join(root, file), "utf8"))
    // Next compiles CSS modules. This Node renderer keeps class names as tokens;
    // real card sizing and responsive order are checked in the browser.
    if (file.endsWith(".module.css")) return { __esModule: true, default: new Proxy({}, { get: (_target, name) => String(name) }) }
    const result = {}
    cache.set(file, result)
    const code = ts.transpileModule(readFileSync(join(root, file), "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    }).outputText
    new Function("require", "exports", code)(name => {
      if (Object.hasOwn(adapters, name) && adapters[name] !== undefined) return adapters[name]
      if (name.startsWith("@/") || name.startsWith(".")) {
        const candidate = name.startsWith("@/") ? name.slice(2) : join(dirname(file), name)
        const resolved = extname(candidate) ? candidate : [".ts", ".tsx"].map(ext => candidate + ext).find(path => existsSync(join(root, path)))
        assert.ok(resolved, "Missing import: " + name)
        return load(resolved)
      }
      return require(name)
    }, result)
    return result
  }
  return load
}

function elements(node, predicate) {
  if (Array.isArray(node)) return node.flatMap(child => elements(child, predicate))
  if (!React.isValidElement(node)) return []
  return [...(predicate(node) ? [node] : []), ...elements(node.props.children, predicate)]
}

function anchors(html) {
  return [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].map(match => ({
    href: match[1].match(/\bhref="([^"]*)"/)?.[1]?.replaceAll("&amp;", "&"),
    next: match[1].includes('data-next-link="true"'),
    text: match[2].replace(/<[^>]*>/g, ""),
  }))
}

const load = createLoader()
const { destinations } = load("content/destinations.ts")

test("transparent species details preserve every country collection, source and media credit", () => {
  const Panel = load("components/species-details-panel.tsx").default
  const catalogues = Object.values(load("content/destination-birds.ts").destinationBirds)
  assert.equal(catalogues.reduce((total, birds) => total + birds.length, 0), 73)
  for (const birds of catalogues) for (const [index, bird] of birds.entries()) {
    const html = renderToStaticMarkup(React.createElement(Panel, { id: "test-info", bird, birds, selectedIndex: index, showBirdPicker: true, onSelectBird() {}, onClose() {} }))
    const text = html.replace(/<[^>]*>/g, "").replaceAll("&amp;", "&").replaceAll("&#x27;", "'").replaceAll("&quot;", '"')
    for (const value of [bird.commonName, bird.localOccurrence || bird.distribution, bird.habitat, bird.photoCredit.photographer]) assert.ok(text.includes(value), bird.id)
    if (bird.localOccurrence && bird.localOccurrence !== bird.distribution) assert.ok(text.includes(bird.distribution))
    const links = anchors(html)
    assert.ok(links.some(link => link.href === bird.sources[0].url), `${bird.id}: species source`)
    if (bird.audioFile) assert.ok(links.some(link => link.href === (bird.audioCreditHref || `/credits#audio-${bird.id}`)))
    if (bird.regionHref || bird.regionSlug) assert.ok(links.some(link => link.href === (bird.regionHref || `/aves-explorer?region=${bird.regionSlug}`)))
    assert.equal((html.match(/<option /g) || []).length, birds.length)
    assert.match(html, /data-species-overlay="true"/)
    assert.match(html, /aria-label="Close species details"/)
    assert.match(html, /aria-label="Scrollable species information"/)
    assert.match(html, /aria-labelledby="test-info-title"/)
    assert.doesNotMatch(html, /<h4[^>]*>About /)
  }
})

test("homepage, country, regional and article viewers all use the same overlay contract", () => {
  // Exercise the real shared carousel rather than assuming a default in its stub.
  const real = createLoader({ "@/components/homepage-bird-carousel": undefined })
  const Region = real("components/colombia-region-page.tsx").ColombiaRegionPage
  const region = real("content/regions.ts").regions.find(region => region.id === "sierra-nevada-de-santa-marta")
  const cases = [
    React.createElement(real("app/page.tsx").default),
    React.createElement(real("app/colombia/page.tsx").default),
    React.createElement(real("components/new-zealand-hero-explorer.tsx").default),
    React.createElement(Region, { region }),
    React.createElement(real("components/article-bird-carousel.tsx").default, { article: "paramo" }),
    React.createElement(real("app/species/page.tsx").default),
    React.createElement(real("components/homepage-bird-carousel.tsx").default, { variant: "destination-card", autoPlay: false }),
  ]
  for (const element of cases) {
    const html = renderToStaticMarkup(element)
    assert.match(html, /data-info-presentation="overlay"/)
    assert.doesNotMatch(html, /data-info-presentation="below"/)
  }
})

test("world map offers all three selections with keyboard semantics and no destination development badge", () => {
  const Map = load("components/world-destination-map.tsx").default
  const Explorer = load("components/homepage-destination-explorer.tsx").default
  const html = renderToStaticMarkup(React.createElement(Explorer, { map: React.createElement(Map) }))
  for (const destination of destinations) {
    assert.ok(html.includes(`aria-label="Show ${destination.name} birds"`))
    const label = destination.worldMap
    assert.ok(label && label.x >= 0 && label.x + label.width <= 1000 && label.y + 68 <= 572, "labels fit")
    assert.ok(load("content/world-map.json").countries.some(c => c.code === label.countryCode), "real geometry exists")
  }
  assert.match(html, /role="group"/)
  assert.match(html, /preserveAspectRatio="xMidYMid meet"/)
  assert.equal((html.match(/role="button" tabindex="0"/g) || []).length, 3)
  assert.doesNotMatch(html, /in development/i)
  assert.match(html, /Other countries provide geographic context/)
  assert.doesNotMatch(html, /role="img"/i)
})

test("every Colombia carousel bird links to an actual planning-map region", () => {
  const birds = load("content/birds.ts").birdData
  const mapRegions = new Set(load("lib/region-links.ts").colombiaMapRegions.map(region => region.slug))
  assert.equal(birds.length, 22)
  for (const bird of birds) {
    assert.ok(mapRegions.has(bird.regionSlug), `${bird.id}: no map region`)
    assert.ok(bird.distribution && bird.sources.length, `${bird.id}: missing range/source notes`)
  }
})

test("country cards are regional maps with canonical region links and no extra carousels", () => {
  const Cards = load("components/destination-map-cards.tsx").default
  const html = renderToStaticMarkup(React.createElement(Cards))
  const links = anchors(html)
  assert.equal((html.match(/<article /g) || []).length, 3)
  assert.equal((html.match(/<select /g) || []).length, 3, "every card has the same touch/keyboard location selector")
  assert.equal((html.match(/<details /g) || []).length, 3, "every card retains a full-name guide list")
  const ids = [...html.matchAll(/<select[^>]* id="([^"]+)"/g)].map(match => match[1])
  assert.equal(new Set(ids).size, 3, "selector labels are unique across country cards")
  for (const region of load("content/colombia-map-markers.ts").colombiaMapMarkers) assert.ok(html.replaceAll("&amp;", "&").includes(`>${region.name}</option>`), region.name)
  for (const state of load("content/global-australian-map.ts").australiaMapStates) assert.ok(html.includes(`>${state.name}</option>`), state.name)
  for (const island of load("content/new-zealand-map.json").islands) assert.ok(html.includes(`>${island.label}</option>`), island.label)
  assert.match(html, /Representative planning locations, not regional boundaries/)
  assert.doesNotMatch(html, /<text[^>]*>(?:NSW|WA|ACT|[0-9]+)<\/text>/)

  assert.doesNotMatch(html, /data-bird-carousel|regions\/null|regions\/undefined/)
  for (const region of load("content/colombia-map-markers.ts").colombiaMapMarkers) assert.ok(links.some(link => link.href === `/regions/${region.slug}`))
  const states = load("content/global-australian-map.ts").australiaMapStates
  assert.equal(states.length, 9)
  for (const state of states) assert.ok(links.some(link => link.href === `/australia/regions/${state.regionId}`))
  for (const island of load("content/new-zealand-map.json").islands) assert.ok(links.some(link => link.href === load("lib/new-zealand-region-links.ts").newZealandRegionHref(island.id)))
  for (const country of destinations) assert.ok(links.some(link => link.href === country.href && link.text === `Explore ${country.name}` && !link.next))
  assert.ok(links.filter(link => link.href?.startsWith("/")).every(link => !link.next), "cross-app country and region routes reload normally")
})

test("every New Zealand carousel bird has explicit valid island links, including broad labels", () => {
  const birds = load("content/new-zealand-carousel.ts").newZealandCarouselBirds
  const links = load("content/new-zealand-bird-islands.ts").newZealandBirdIslands
  const regions = new Set(load("content/new-zealand.ts").newZealandRegions.map(region => region.id))
  assert.deepEqual(Object.keys(links).sort(), birds.map(bird => bird.id).sort(), "no missing or stale species associations")
  for (const bird of birds) {
    assert.ok(links[bird.id].length > 0, bird.id)
    assert.equal(new Set(links[bird.id]).size, links[bird.id].length, bird.id)
    assert.ok(links[bird.id].every(region => regions.has(region)), bird.id)
    assert.ok(bird.localOccurrence && bird.sources.length, `${bird.id}: retain source/location notes`)
  }
  assert.deepEqual(links["nz-kea"], ["south-island"])
  assert.deepEqual(links["nz-south-island-tomtit"], ["south-island"])
  assert.deepEqual(links["nz-fantail"], ["north-island", "south-island", "rakiura"])
  assert.deepEqual(links["nz-tokoeka"], ["south-island", "rakiura"])
  assert.deepEqual(links["nz-takahe"], ["north-island", "south-island"])
  assert.deepEqual(links["nz-red-crowned-parakeet"], ["rakiura"])
})

test("global homepage and footer offer the three public destinations with full-page links", () => {
  assert.deepEqual(destinations.map(({ id, href }) => ({ id, href })), [
    { id: "colombia", href: "/colombia" }, { id: "australia", href: "/australia" }, { id: "new-zealand", href: "/new-zealand" },
  ])
  const Home = load("app/page.tsx").default
  const html = renderToStaticMarkup(React.createElement(Home))
  const heading = html.match(/<h1\b[\s\S]*?<\/h1>/)[0]
  assert.match(heading, /aria-label="Where will birds take you\?"/, "one stable readable sentence")
  assert.match(heading, /type="button"[^>]*data-flipped="false"/, "word is keyboard/touch operable before any interaction")
  assert.match(heading, /aria-label="Switch between birds and AVES" aria-pressed="false"/)
  const links = anchors(html)
  for (const destination of destinations) {
    const countryLinks = links.filter(link => link.href === destination.href)
    assert.ok(countryLinks.length >= 1, "each country is reachable even before changing selection")
    assert.ok(countryLinks.every(link => !link.next), "country application links must reload the document")
    assert.ok(countryLinks.some(link => link.text === destination.name))
  }
  const accountLinks = links.filter(link => link.href === "/account")
  assert.equal(accountLinks.length, 2)
  assert.ok(accountLinks.every(link => !link.next), "shared account entry crosses applications")
  assert.equal(load("app/page.tsx").metadata.alternates.canonical, "https://aves.bio/")
  assert.equal(load("app/page.tsx").metadata.openGraph.url, "https://aves.bio/")
})

test("global navigation works from the site map and targets existing homepage sections", () => {
  const { GlobalHeader } = load("components/global-navigation.tsx")
  const headerLinks = anchors(renderToStaticMarkup(React.createElement(GlobalHeader)))
  const home = load("app/page.tsx").default()
  const sectionIds = new Set(elements(home, node => node.props.id).map(node => node.props.id))
  for (const path of ["/#destinations", "/#planning"]) {
    assert.ok(headerLinks.some(link => link.href === path))
    const resolved = new URL(path, "https://aves.bio/site-map")
    assert.equal(resolved.pathname, "/")
    assert.ok(sectionIds.has(resolved.hash.slice(1)))
  }
  const SiteMap = load("app/site-map/page.tsx").default
  const html = renderToStaticMarkup(React.createElement(SiteMap))
  const links = anchors(html)
  assert.ok(links.some(link => link.href === "/" && link.text.includes("All Destinations")))
  assert.ok(links.some(link => link.href === "/colombia" && link.text === "Colombia Home"))
  assert.ok(links.some(link => link.href === "https://aves.bio/australia/site-map"))
  assert.ok(links.some(link => link.href === "/#destinations"))
  assert.doesNotMatch(html, /aria-label="AVES Colombia home"/)
})

test("fallback destination photographs retain source/licence records for future countries", () => {
  const credits = load("content/image-credits.json").images
  for (const destination of destinations) {
    assert.ok(existsSync(join(root, "public", destination.image)))
    assert.ok(destination.imageAlt.trim().length > 20)
    const matching = credits.filter(credit => credit.path === destination.image)
    assert.equal(matching.length, 1, destination.image)
    const credit = matching[0]
    assert.ok(destination.photographer.includes(credit.creator))
    assert.ok(credit.attribution.includes(credit.creator))
    for (const url of [credit.creatorUrl, credit.sourceUrl, credit.licenseUrl]) assert.match(new URL(url).protocol, /^https?:$/)
    assert.ok(credit.license.trim())
    assert.ok(credit.modifications.trim())
  }
})

test("one homepage viewer uses each complete country collection, opt-in playback and deferred images", () => {
  const { destinationBirds } = load("content/destination-birds.ts")
  const html = renderToStaticMarkup(React.createElement(load("app/page.tsx").default))
  assert.equal((html.match(/data-bird-carousel="true"/g) || []).length, 1, "only the selected country's viewer is mounted")
  assert.match(html, /AVES destinations on an Equal Earth world map/)
  assert.deepEqual(destinationBirds.colombia.map(b => b.id), load("content/birds.ts").birdData.map(b => b.id))
  assert.deepEqual(destinationBirds["new-zealand"].map(b => b.id), load("content/new-zealand-carousel.ts").newZealandCarouselBirds.map(b => b.id))
  assert.equal(destinationBirds.australia.length, 20)
  for (const destination of destinations) {
    const birds = destinationBirds[destination.id]
    const Explorer = load("components/homepage-destination-explorer.tsx").default
    const card = renderToStaticMarkup(React.createElement(Explorer, { initialCountryId: destination.id, map: null }))
    assert.equal((card.match(/data-bird-carousel="true"/g) || []).length, 1)
    assert.ok(anchors(card).some(link => link.href === destination.href && link.text === `Explore ${destination.name}` && !link.next))
    for (const attribute of [`data-count="${birds.length}"`, 'data-variant="destination-card"', 'data-autoplay="false"', 'data-priority="false"', `aria-label="${destination.name} bird photographs"`]) assert.ok(card.includes(attribute), attribute)
    for (const match of card.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/g)) assert.doesNotMatch(match[1], /data-bird-carousel/, "controls must not be inside a country link")
    for (const bird of birds) {
      const australian = destination.id === "australia"
      // Australia is an independent deployment, not a sibling required by this repo.
      // Its media delivery is verified in the live browser before publishing.
      if (australian) {
        assert.match(bird.image, /^\/australia\/images\//)
        if (bird.audioFile) assert.match(bird.audioFile, /^\/australia\/audio\/.+\.(mp3|m4a|ogg|wav)$/)
      } else {
        assert.ok(existsSync(join(root, "public", bird.image)), bird.image)
        if (bird.audioFile) {
          if (bird.audioFile.startsWith("https://")) assert.equal(new URL(bird.audioFile).protocol, "https:")
          else assert.ok(existsSync(join(root, "public", bird.audioFile)), bird.audioFile)
        }
      }
      assert.ok(bird.photoCredit.photographer && bird.photoCredit.title && bird.sources.length)
      assert.match(bird.regionHref, australian ? /^\/australia\/regions\// : /^\/(regions\/|new-zealand)/)
      if (australian && bird.audioFile) assert.equal(bird.audioCreditHref, `/australia/credits#audio-${bird.id}`)
    }
    assert.doesNotMatch(card, /in development/i)
  }
})

test("card viewer renders the selected bird's credit and uniquely named carousel", () => {
  // Render the real viewer on the server to check its public markup, not its effects.
  const real = createLoader({ "@/components/homepage-bird-carousel": undefined })
  const Media = real("components/destination-card-media.tsx").default
  const collections = real("content/destination-birds.ts").destinationBirds
  for (const destination of destinations) {
    const bird = collections[destination.id][0]
    const html = renderToStaticMarkup(React.createElement(Media, { destination }))
    const links = anchors(html)
    assert.match(html, new RegExp(`aria-label="${destination.name} bird photographs"`))
    assert.ok(links.some(link => link.text === `Photo: ${bird.photoCredit.photographer}` && link.href === (bird.photoCredit.instagramPost || bird.photoCredit.teamLink || "/credits")))
    assert.ok(html.includes(bird.commonName))
    assert.match(html, /preload="none"/)
    assert.doesNotMatch(html, /autoPlay=/)
  }
})

test("a future country is selectable with an attributed fallback and a native footer link", () => {
  const fixture = { ...destinations[0], id: "fixture-country", name: "Fixture Country", href: "/fixture-country", tagline: "Test fixture", worldMap: undefined }
  const extended = createLoader({ "@/content/destinations": { destinations: [...destinations, fixture] } })
  const html = renderToStaticMarkup(React.createElement(extended("app/page.tsx").default))
  const Explorer = extended("components/homepage-destination-explorer.tsx").default
  const selected = renderToStaticMarkup(React.createElement(Explorer, { initialCountryId: fixture.id, map: null }))
  const links = anchors(html + selected).filter(link => link.href === fixture.href)
  assert.ok(links.length >= 2, "new country appears in the main choice and global footer")
  assert.ok(links.every(link => !link.next))
  assert.ok(links.some(link => link.text === "Explore Fixture Country"))
  assert.ok(links.some(link => link.text === "Fixture Country"))
  assert.ok(anchors(selected).some(link => link.href === "/credits" && link.text === `Photo: ${fixture.photographer}`), "new country keeps an attributed static fallback until its collection is supplied")
})

test("Colombia retains its country homepage, bird carousel, trip form and existing regional URLs", () => {
  const page = load("app/colombia/page.tsx")
  const tree = load("components/colombia-home-page.tsx").default()
  const componentNames = elements(tree, node => typeof node.type === "function").map(node => node.type.name)
  for (const component of ["NavigationHeader", "ContactFormSection", "Footer"]) assert.ok(componentNames.includes(component), component)
  // The gallery can be composed inside a hero without disappearing from the page.
  assert.match(renderToStaticMarkup(React.createElement(page.default)), /data-bird-carousel="true"/)
  const header = elements(tree, node => node.type.name === "NavigationHeader")[0]
  assert.equal(header.props.currentPage, "/colombia")
  const links = elements(tree, node => typeof node.props.href === "string").map(node => node.props.href)
  for (const region of load("content/regions.ts").regions) assert.ok(links.includes(`/regions/${region.id}`), region.id)
  for (const experience of ["adventure", "vision", "elevate", "souls"]) assert.ok(links.includes(`/tours/${experience}`))
  assert.ok(load("content/birds.ts").birdData.length >= 20)
  assert.equal(page.metadata.alternates.canonical, "https://aves.bio/colombia")
  assert.equal(page.metadata.openGraph.url, "https://aves.bio/colombia")
  assert.match(page.metadata.title.absolute, /Colombia/)
  assert.match(page.metadata.twitter.title, /Colombia/)
})


test("brand word previews on mouse/keyboard and a first touch toggles once, without pointer-focus double flips", () => {
  let state=false
  const ref={current:false}
  const Word=createLoader({react:{useState:()=>[state,next=>{state=typeof next==="function"?next(state):next}],useRef:()=>ref}})("components/birds-brand-word.tsx").default
  const p=Word().props
  p.onPointerDown(); p.onFocus(); p.onClick()
  assert.equal(state,true,"first touch: pointer focus must not flip before click")
  p.onPointerLeave({pointerType:"touch"})
  assert.equal(state,true,"touch pointer leaving after a tap must not undo it")
  p.onPointerDown(); p.onClick()
  assert.equal(state,false,"second tap restores birds")
  p.onFocus(); assert.equal(state,true,"keyboard focus previews AVES")
  p.onKeyDown({key:"Escape"}); assert.equal(state,false,"Escape restores birds without navigation")
  p.onPointerEnter({pointerType:"mouse"}); assert.equal(state,true)
  p.onPointerLeave({pointerType:"mouse"}); assert.equal(state,false)
  p.onPointerEnter({pointerType:"touch"}); assert.equal(state,false,"touch hover does not toggle")
  p.onFocus();p.onBlur();assert.equal(state,false)
})


test("connected regional maps use feather cues and keep full-name selection accessible", () => {
  const Map = load("components/destination-regional-map.tsx").default
  const expected = { colombia: ["eastern-andes", "Eastern Andes"], australia: ["australian-capital-territory", "Australian Capital Territory"], "new-zealand": ["rakiura", "Stewart Island / Rakiura"] }
  for (const [country, [selectedRegionId, name]] of Object.entries(expected)) {
    const selected = []
    const tree = Map({ country, selectedRegionId, onSelectRegion: id => selected.push(id) })
    const html = renderToStaticMarkup(tree)
    assert.match(html, /data-map-feather="true"/)
    assert.doesNotMatch(html, /<text[^>]*>(?:NSW|WA|ACT|[0-9]+)<\/text>|<polyline|M389,184L413,122/)
    const button = elements(tree, el => el.props["aria-label"] === `Preview ${name} birds`)[0]
    assert.ok(button, country + ": full region name")
    button.props.onClick()
    assert.deepEqual(selected, [selectedRegionId])
  }
})


test("region navigation requires a deliberate preview and preserves native modified clicks", () => {
  const { regionActivation } = load("lib/region-activation.ts")
  const tap = { button: 0 }
  assert.equal(regionActivation(null, "south-island", tap).preview, true, "default highlight is not a first tap")
  assert.equal(regionActivation("south-island", "south-island", tap).native, true)
  assert.equal(regionActivation("south-island", "north-island", tap).preview, true)
  for (const event of [{button:1}, {button:0,ctrlKey:true}, {button:0,metaKey:true}, {button:0,shiftKey:true}, {button:0,altKey:true}]) assert.equal(regionActivation(null, "south-island", event).native, true)
})


test("Colombia retains the original planning boundaries and matching marker regions", () => {
  const crypto = require("node:crypto")
  const geometry = load("content/colombia-planning-boundaries.json")
  const markers = load("content/colombia-map-markers.ts").colombiaMapMarkers
  assert.equal(crypto.createHash("sha256").update(readFileSync(join(root, geometry.source.path))).digest("hex"), geometry.source.sha256)
  assert.deepEqual(geometry.regions.map(r => r.name), markers.map(r => r.name))
  for (const [i, region] of geometry.regions.entries()) {
    assert.equal(region.markerInsideOriginal, true)
    assert.equal(region.markerInsideSmoothed, true)
    assert.ok(Math.abs(region.marker.x - markers[i].x * 6.34) < .001)
    assert.ok(Math.abs(region.marker.y - markers[i].y * 8.02) < .001)
    assert.ok(region.path.length > 100)
  }
  const html = renderToStaticMarkup(React.createElement(load("components/colombia-map-artwork.tsx").default, {alt:"",flat:true}))
  assert.match(html, /data-colombia-boundaries="true"/)
})
