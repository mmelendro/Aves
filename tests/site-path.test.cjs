const { test } = require("node:test")
const assert = require("node:assert/strict")
const { readFileSync } = require("node:fs")
const { resolve } = require("node:path")
const ts = require("typescript")
const compiled = ts.transpileModule(readFileSync(resolve(__dirname, "../features/australia/lib/site-path.ts"), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText

function load(siteUrl = "https://aves.bio") {
  const exports = {}
  new Function("exports", "process", compiled)(exports, { env: { NEXT_PUBLIC_SITE_URL: siteUrl } })
  return exports
}
const { sitePath, isSiteHome } = load()

test("native API and asset requests stay inside the Australian app", () => {
  for (const path of ["/api/contact", "/images/aves-logo.png", "/audio/superb-fairywren.mp3", "/cookies"]) {
    assert.equal(sitePath(path), `/australia${path}`)
  }
})

test("native home, query and fragment navigation stays inside Australia", () => {
  assert.equal(sitePath("/"), "/australia")
  assert.equal(sitePath("/#top"), "/australia#top")
  assert.equal(sitePath("/?region=tasmania"), "/australia?region=tasmania")
  assert.equal(sitePath("/contact?intent=waitlist#form"), "/australia/contact?intent=waitlist#form")
})

test("already prefixed requests cannot gain a second Australia prefix", () => {
  for (const path of ["/australia", "/australia/", "/australia?x=y", "/australia#top", "/australia/api/contact"]) {
    assert.equal(sitePath(path), path)
  }
  assert.equal(sitePath("/australian-birds"), "/australia/australian-birds")
})

test("external, email, fragment and data URLs retain their original meaning", () => {
  for (const path of ["https://aves.bio/", "https://example.test/photo.jpg", "//example.test/audio.mp3", "mailto:mmelendro@gmail.com", "#form", "data:image/svg+xml,test"]) {
    assert.equal(sitePath(path), path)
  }
})

test("home layout detection recognizes both valid Australia root forms only", () => {
  assert.equal(isSiteHome("/australia"), true)
  assert.equal(isSiteHome("/australia/"), true)
  assert.equal(isSiteHome("/australia/contact"), false)
  assert.equal(isSiteHome("/"), false)
})

test("canonical URLs identify the public Australian pages", () => {
  const { canonicalUrl } = load()
  assert.equal(canonicalUrl(), "https://aves.bio/australia")
  assert.equal(canonicalUrl("/contact"), "https://aves.bio/australia/contact")
  assert.equal(canonicalUrl("/tours/vision"), "https://aves.bio/australia/tours/vision")
})

test("canonical construction uses origin only and never doubles a configured subpath", () => {
  assert.equal(load("https://aves.bio/australia").canonicalUrl("/contact"), "https://aves.bio/australia/contact")
  assert.equal(load(undefined).canonicalUrl(), "https://aves.bio/australia")
})
