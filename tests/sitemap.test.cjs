const { test } = require("node:test")
const assert = require("node:assert/strict")
const { readFileSync, existsSync } = require("node:fs")
const { join, resolve, dirname, extname } = require("node:path")
const ts = require("typescript")
const root = resolve(__dirname, "..")
const australian = existsSync(join(root, "content/australia-map.ts"))

function loader(env = {}) {
  const cache = new Map()
  function load(file) {
    if (cache.has(file)) return cache.get(file)
    if (file.endsWith(".json")) return JSON.parse(readFileSync(join(root, file), "utf8"))
    const result = {}
    cache.set(file, result)
    const code = ts.transpileModule(readFileSync(join(root, file), "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
    }).outputText
    new Function("require", "exports", "process", code)(
      name => name.startsWith("@/") ? load(name.slice(2) + (extname(name) ? "" : ".ts"))
        : name.startsWith(".") ? load(join(dirname(file), name) + (extname(name) ? "" : ".ts"))
        : require(name),
      result,
      { env: { VERCEL_ENV: "production", NEXT_PUBLIC_SITE_URL: "https://aves.bio", ...env } },
    )
    return result
  }
  return load
}

const load = loader()
const { publicPages, publicPageGroups } = load("lib/public-pages.ts")
const expectedRegions = australian
  ? ["queensland", "new-south-wales", "tasmania", "victoria", "south-australia", "western-australia", "northern-territory", "australian-capital-territory", "jervis-bay-territory"]
  : ["pacific", "western-andes", "central-andes", "eastern-andes", "cauca-valley", "magdalena-valley", "caribbean", "sierra-nevada-de-santa-marta", "llanos", "amazonia", "colombian-massif"]

test("XML sitemap contains unique canonical public URLs without queries, aliases or private tools", () => {
  const entries = load("app/sitemap.ts").default()
  const urls = entries.map(entry => entry.url)
  assert.equal(new Set(urls).size, urls.length)
  assert.equal(urls.length, load("lib/public-navigation.ts").publicNavigationPaths.length)
  for (const entry of entries) {
    const url = new URL(entry.url)
    assert.equal(url.origin, "https://aves.bio")
    assert.equal(url.search, "")
    assert.equal(url.hash, "")
    assert.doesNotMatch(url.pathname, /\/(?:account|admin|api|auth|dashboard|shopping|calendar)(?:\/|$)/)
    assert.doesNotMatch(url.pathname, /cauca-river|australia\/australia/)
    assert.equal(entry.lastModified, undefined, "Do not imply every page changed at build time")
  }
})

test("all region guides are discoverable through canonical paths", () => {
  const actual = publicPages.filter(page => page.href.startsWith("/regions/")).map(page => page.href.slice(9))
  assert.deepEqual([...actual].sort(), [...expectedRegions].sort())
  if (australian) assert.deepEqual([...actual].sort(), load("content/regions.ts").regions.map(region => region.id).sort())
})

test("every public entry resolves to a real page, supported information page or known region", () => {
  const information = australian ? load("content/information.ts").information : {}
  for (const { href, label } of publicPages) {
    assert.match(href, /^\/(?!\/)/)
    assert.ok(label.trim())
    const path = href.slice(1)
    const direct = existsSync(join(root, "app", path, "page.tsx"))
    const region = href.startsWith("/regions/") && expectedRegions.includes(href.slice(9)) && existsSync(join(root, "app/regions/[slug]/page.tsx"))
    const catchAll = australian && (Object.hasOwn(information, path) || /^tours(?:\/(?:adventure|vision|elevate|souls))?$/.test(path))
    assert.ok(direct || region || catchAll, href)
    if (direct) assert.doesNotMatch(readFileSync(join(root, "app", path, "page.tsx"), "utf8"), /robots\s*:\s*\{[^}]*index\s*:\s*false/)
  }
})

test("native sitemap URLs apply the Australian base path exactly once", () => {
  const entries = loader({ NEXT_PUBLIC_SITE_URL: "https://aves.bio/australia" })("app/sitemap.ts").default()
  for (const entry of entries) {
    const pathname = new URL(entry.url).pathname
    if (australian) assert.ok(pathname === "/australia" || pathname.startsWith("/australia/"))
    else assert.ok(pathname.startsWith("/"))
    assert.doesNotMatch(pathname, /australia\/australia/)
  }
  for (const page of publicPages) assert.ok(!page.href.startsWith("/australia"), "Next Link receives unprefixed paths")
})

test("production robots excludes private paths while allowing rendering assets", () => {
  const robots = load("app/robots.ts").default()
  const prefix = australian ? "/australia" : ""
  for (const privatePath of ["/account", "/admin", "/auth/", "/api/"]) assert.ok(robots.rules.disallow.includes(prefix + privatePath))
  assert.ok(!robots.rules.disallow.some(path => path.includes("_next")))
  const maps = Array.isArray(robots.sitemap) ? robots.sitemap : [robots.sitemap]
  assert.ok(maps.includes("https://aves.bio/australia/sitemap.xml"))
  if (!australian) {
    assert.ok(maps.includes("https://aves.bio/sitemap.xml"))
    for (const path of ["/australia/account", "/australia/admin", "/australia/auth/", "/australia/api/"]) assert.ok(robots.rules.disallow.includes(path))
  }
})

test("preview robots disallows indexing and does not advertise a preview sitemap", () => {
  for (const VERCEL_ENV of ["preview", "development"]) {
    const robots = loader({ VERCEL_ENV })("app/robots.ts").default()
    assert.equal(robots.rules.disallow, "/")
    assert.equal(robots.sitemap, undefined)
  }
})

test("header and footer destinations exist; their native links do not double-prefix Australia", () => {
  const known = new Set(publicPages.map(page => page.href))
  for (const file of ["components/navigation-header.tsx", "components/footer.tsx"]) {
    const source = readFileSync(join(root, file), "utf8")
    for (const match of source.matchAll(/href(?:=|:\s*)["'](\/[^"']*)["']/g)) {
      const pathname = new URL(match[1], "https://aves.bio").pathname
      assert.ok(known.has(pathname) || (australian && pathname === "/account"), file + ": " + pathname)
      assert.ok(!pathname.startsWith("/australia/"))
    }
  }
})

test("human site map shares the XML directory and is discoverable from the footer", () => {
  assert.equal(new Set(publicPageGroups.map(group => group.id)).size, publicPageGroups.length)
  const page = readFileSync(join(root, "app/site-map/page.tsx"), "utf8")
  assert.match(page, /DestinationSiteTree/)
  assert.match(page, /destinationSiteTree/)
  const treeComponent = readFileSync(join(root, "components/destination-site-tree.tsx"), "utf8")
  assert.match(treeComponent, /aria-label="AVES destination tree"/)
  assert.match(treeComponent, /<ul/)
  assert.match(readFileSync(join(root, "components/footer.tsx"), "utf8"), /<GlobalFooter/)
  assert.match(readFileSync(join(root, "components/global-navigation.tsx"), "utf8"), /"\/site-map"/)
})

test("each listed Colombia page declares its own canonical URL", () => {
  const { canonicalUrl } = load("lib/site-path.ts")
  function metadataFrom(file) {
    const source = readFileSync(file, "utf8")
    const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
    const constants = []
    for (const statement of ast.statements) {
      if (!ts.isVariableStatement(statement)) continue
      for (const item of statement.declarationList.declarations) {
        if (item.initializer && ts.isStringLiteral(item.initializer)) constants.push(`const ${item.name.getText(ast)} = ${item.initializer.getText(ast)}`)
      }
      const declaration = statement.declarationList.declarations.find(item => item.name.getText(ast) === "metadata")
      if (!declaration?.initializer) continue
      const code = ts.transpileModule(constants.join(";\n") + ";\nexports.metadata = " + declaration.initializer.getText(ast), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
      }).outputText
      const result = {}
      new Function("exports", "canonicalUrl", "colombiaBirdingTitle", "regions", "publicMetadata", code)(result, canonicalUrl, ...(australian ? [undefined,undefined] : [load("content/regions.ts").colombiaBirdingTitle,load("content/regions.ts").regions]),load("lib/public-metadata.ts").publicMetadata)
      return result.metadata
    }
    return undefined
  }
  for (const page of publicPages) {
    const file = join(root, "app", page.href, "page.tsx")
    if (!existsSync(file)) {
      assert.ok(page.href.startsWith("/regions/"))
      const dynamic = readFileSync(join(root, "app/regions/[slug]/page.tsx"), "utf8")
      assert.match(dynamic, /canonical:\s*canonicalUrl\(.\/regions\/\$\{region\.id\}.\)/)
      continue
    }
    if (page.href === "/contact") { assert.match(readFileSync(file,"utf8"), /canonical: "\/contact"/); continue }
    const layout = join(root, "app", page.href, "layout.tsx")
    const metadata = metadataFrom(file) || (existsSync(layout) ? metadataFrom(layout) : undefined)
    assert.equal(metadata?.alternates?.canonical, canonicalUrl(page.href), page.href)
  }
})

test("every actual map marker opens its canonical guide and preserves its enquiry region", () => {
  const { colombiaMapRegions, getRegionLinks } = load("lib/region-links.ts")
  const markers = load("content/colombia-map-markers.ts").colombiaMapMarkers
  const markerIds = markers.map(marker=>marker.mapId)
  assert.equal(markerIds.length, 11)
  assert.deepEqual(markerIds.slice().sort(), colombiaMapRegions.map(region => region.mapId).sort())
  const publicPaths = new Set(publicPages.map(page => page.href))
  for (const { mapId, slug } of colombiaMapRegions) {
    const links = getRegionLinks(mapId)
    assert.equal(links.guideHref, "/regions/" + slug)
    assert.ok(publicPaths.has(links.guideHref))
    const enquiry = new URL(links.enquiryHref, "https://aves.bio")
    assert.equal(enquiry.pathname, "/contact")
    assert.equal(enquiry.searchParams.get("region"), slug)
  }
  for (const value of ["", "__proto__", "not-a-region"]) {
    assert.deepEqual(getRegionLinks(value), { guideHref: "/aves-explorer", enquiryHref: "/contact" })
  }

})

test("map descriptions and every displayed bird come from the sourced regional catalogue", () => {
  const { regions } = load("content/regions.ts")
  const { birdData } = load("content/birds.ts")
  const { getDestinationRegionBirds, destinationRegions } = load("content/destination-regions.ts")
  for (const region of regions) {
    const displayed=destinationRegions.colombia.find(item=>item.id===region.id)
    assert.equal(displayed.description,region.description)
    const selected=getDestinationRegionBirds("colombia",region.id)
    assert.deepEqual(selected.map(bird=>bird.id),region.birds.map(bird=>bird.birdId))
    for(const bird of selected){
      assert.ok(birdData.some(original=>original.id===bird.id))
      assert.ok(bird.localOccurrence.length>20)
      assert.ok(bird.sources.length>0)
    }
  }
})
