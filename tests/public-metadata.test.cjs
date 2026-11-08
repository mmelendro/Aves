const { test } = require("node:test")
const assert = require("node:assert/strict")
const { publicMetadata } = require("./helpers/load-ts.cjs")()("lib/public-metadata.ts")

test("legacy AVES titles have one brand and the actual page URL in social previews", () => {
  const result = publicMetadata({ title: "Birding in the Andes | AVES Colombia", description: "A regional guide.", alternates: { canonical: "https://aves.bio/regions/central-andes" } })
  assert.equal(result.title.absolute, "Birding in the Andes | AVES Colombia")
  assert.equal(result.openGraph.url, "https://aves.bio/regions/central-andes")
  assert.equal(result.twitter.title, result.title.absolute)
  assert.equal(result.openGraph.description, "A regional guide.")
})

test("legacy Tours branding becomes AVES while article identity and credited image stay intact", () => {
  const images = ["/images/licensed-article.jpg"]
  const result = publicMetadata({ title: "Colombian birding | AVES Tours", alternates: { canonical: "https://aves.bio/blog/example" }, openGraph: { type: "article", title: "Article title", images } })
  assert.equal(result.title.absolute, "Colombian birding | AVES")
  assert.equal(result.openGraph.type, "article")
  assert.equal(result.openGraph.title, "Article title")
  assert.deepEqual(result.openGraph.images, images)
  assert.equal(result.openGraph.url, "https://aves.bio/blog/example")
})

test("Australian contact metadata uses its own URL and neutral support titles stay neutral", () => {
  const { australiaMetadata } = require("./helpers/load-ts.cjs")()("features/australia/lib/metadata.ts")
  const result = australiaMetadata({ title: "Plan Your Australian Journey", alternates: { canonical: "https://aves.bio/australia/contact" } })
  assert.equal(result.title.absolute, "Plan Your Australian Journey | AVES Australia")
  assert.equal(result.openGraph.url, "https://aves.bio/australia/contact")
  assert.equal(result.openGraph.locale, "en_AU")
  const support = australiaMetadata({ title: { absolute: "Account Support | AVES" }, alternates: { canonical: "https://aves.bio/australia/contact" } })
  assert.equal(support.title.absolute, "Account Support | AVES")
})
