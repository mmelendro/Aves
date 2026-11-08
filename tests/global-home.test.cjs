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
      return React.createElement("div", { "data-bird-carousel": true, "data-count": props.birds?.length, "data-variant": props.variant, "data-autoplay": props.autoPlay, "data-priority": props.priority, "aria-label": props.label })
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
    href: match[1].match(/\bhref="([^"]*)"/)?.[1],
    next: match[1].includes('data-next-link="true"'),
    text: match[2].replace(/<[^>]*>/g, ""),
  }))
}

const load = createLoader()
const { destinations } = load("content/destinations.ts")

test("every Colombia carousel bird links to an actual planning-map region", () => {
  const birds = load("content/birds.ts").birdData
  const mapRegions = new Set(load("lib/region-links.ts").colombiaMapRegions.map(region => region.slug))
  assert.equal(birds.length, 22)
  for (const bird of birds) {
    assert.ok(mapRegions.has(bird.regionSlug), `${bird.id}: no map region`)
    assert.ok(bird.distribution && bird.sources.length, `${bird.id}: missing range/source notes`)
  }
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
  const links = anchors(html)
  for (const destination of destinations) {
    const countryLinks = links.filter(link => link.href === destination.href)
    assert.ok(countryLinks.length >= 2, "country is reachable from its card and footer")
    assert.ok(countryLinks.every(link => !link.next), "country application links must reload the document")
    assert.ok(countryLinks.some(link => link.text === `Explore ${destination.name}`))
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

test("homepage cards use complete country collections, opt-in playback and deferred images", () => {
  const { destinationBirds } = load("content/destination-birds.ts")
  const { globalBirds } = load("content/global-birds.ts")
  const html = renderToStaticMarkup(React.createElement(load("app/page.tsx").default))
  assert.equal((html.match(/data-bird-carousel="true"/g) || []).length, 4, "mixed hero plus three country cards")
  assert.equal(globalBirds.length, 9, "the existing mixed-country hero stays unchanged")
  assert.deepEqual(destinationBirds.colombia.map(b => b.id), load("content/birds.ts").birdData.map(b => b.id))
  assert.deepEqual(destinationBirds["new-zealand"].map(b => b.id), load("content/new-zealand-carousel.ts").newZealandCarouselBirds.map(b => b.id))
  assert.equal(destinationBirds.australia.length, 20)
  for (const destination of destinations) {
    const birds = destinationBirds[destination.id]
    const card = html.match(new RegExp(`<article aria-label="${destination.name}"[\\s\\S]*?<\\/article>`))?.[0]
    assert.ok(card, destination.name)
    for (const attribute of [`data-count="${birds.length}"`, 'data-variant="destination-card"', 'data-autoplay="false"', 'data-priority="false"', `aria-label="${destination.name} bird photographs"`]) assert.ok(card.includes(attribute), attribute)
    assert.doesNotMatch(card, /<a\b[^>]*>[\s\S]*data-bird-carousel/, "controls must not be inside a country link")
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
  }
  assert.match(html, /In development/)
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

test("adding a ready country to the catalogue supplies its card and footer without page-specific conditions", () => {
  const fixture = { ...destinations[0], id: "fixture-country", name: "Fixture Country", href: "/fixture-country", tagline: "Test fixture" }
  const extended = createLoader({ "@/content/destinations": { destinations: [...destinations, fixture] } })
  const html = renderToStaticMarkup(React.createElement(extended("app/page.tsx").default))
  const links = anchors(html).filter(link => link.href === fixture.href)
  assert.ok(links.length >= 2, "new country appears in the main choice and global footer")
  assert.ok(links.every(link => !link.next))
  assert.ok(links.some(link => link.text === "Explore Fixture Country"))
  assert.ok(links.some(link => link.text === "Fixture Country"))
  assert.ok(anchors(html).some(link => link.href === "/credits" && link.text === `Photo: ${fixture.photographer}`), "new country keeps an attributed static fallback until its collection is supplied")
})

test("Colombia retains its country homepage, bird carousel, trip form and existing regional URLs", () => {
  const page = load("app/colombia/page.tsx")
  const tree = page.default()
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
