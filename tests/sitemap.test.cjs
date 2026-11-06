const { test } = require("node:test")
const assert = require("node:assert/strict")
const { readFileSync, existsSync } = require("node:fs")
const { join, resolve } = require("node:path")
const ts = require("typescript")
const root = resolve(__dirname, "..")
const australian = existsSync(join(root, "content/australia-map.ts"))

function loader(env = {}) {
  const cache = new Map()
  function load(file) {
    if (cache.has(file)) return cache.get(file)
    const result = {}
    cache.set(file, result)
    const code = ts.transpileModule(readFileSync(join(root, file), "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    }).outputText
    new Function("require", "exports", "process", code)(
      name => name.startsWith("@/") ? load(name.slice(2) + ".ts") : require(name),
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
  assert.equal(urls.length, publicPages.length)
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
    else assert.ok(!pathname.startsWith("/australia"))
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
  assert.match(page, /publicPageGroups\.map/)
  assert.match(page, /aria-labelledby/)
  assert.match(page, /<ul/)
  assert.match(readFileSync(join(root, "components/footer.tsx"), "utf8"), /href:\s*"\/site-map"/)
})

