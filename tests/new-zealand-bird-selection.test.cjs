const { test } = require("node:test")
const assert = require("node:assert/strict")
const { existsSync } = require("node:fs")
const { resolve } = require("node:path")
const load = require("./helpers/load-ts.cjs")()
const catalogue = load("content/new-zealand-checklist.ts")
const basket = load("lib/nz-bird-selection.ts")
const [a, b, c] = catalogue.selectableNzBirds.map(bird => bird.id)
const storage = () => { const values = new Map(); return { getItem: key => values.get(key) || null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) } }

test("complete published main checklist: 432 unique species, 377 living and 55 historical", () => {
  assert.equal(catalogue.newZealandChecklist.length, 432)
  assert.equal(catalogue.selectableNzBirds.length, 377)
  assert.equal(catalogue.newZealandChecklist.filter(bird => bird.extinct).length, 55)
  assert.equal(new Set(catalogue.newZealandChecklist.map(bird => bird.id)).size, 432)
  assert.equal(new Set(catalogue.newZealandChecklist.map(bird => bird.scientificName)).size, 432)
  assert.equal(catalogue.newZealandChecklist.filter(bird => bird.rare).length, 138)
  assert.ok(catalogue.newZealandChecklist.every(bird => bird.commonName && bird.family && /^nz-[a-f0-9]{12}$/.test(bird.id)))
  assert.ok(catalogue.validNzBirdIds(catalogue.selectableNzBirds.map(bird => bird.id)))
  assert.equal(catalogue.newZealandChecklistSource.checked, "2026-11-08")
})

test("targets reject duplicates, unknown IDs, extinct species and malformed input", () => {
  const extinct = catalogue.newZealandChecklist.find(bird => bird.extinct).id
  for (const ids of [[a, a], ["nz-000000000000"], [extinct], null, "kea", ["<script>"]]) assert.equal(catalogue.validNzBirdIds(ids), false)
  assert.equal(catalogue.validNzBirdIds([]), true)
})

test("tab basket carries only IDs, expires and fails safely when storage is blocked", () => {
  const tab = storage()
  assert.equal(basket.writeNzBirdBasket(tab, [a, b], 100), true)
  assert.deepEqual(basket.readNzBirdBasket(tab, 101), [a, b])
  assert.deepEqual(Object.keys(JSON.parse(tab.getItem(basket.NZ_BIRD_BASKET_KEY))).sort(), ["at", "ids", "version"])
  assert.deepEqual(basket.readNzBirdBasket(tab, 100 + 24 * 60 * 60 * 1000 + 1), [])
  assert.equal(tab.getItem(basket.NZ_BIRD_BASKET_KEY), null)
  const blocked = { getItem() { throw new Error("blocked") }, setItem() { throw new Error("blocked") }, removeItem() {} }
  assert.deepEqual(basket.readNzBirdBasket(blocked), [])
  assert.equal(basket.writeNzBirdBasket(blocked, [a]), false)
})

test("only a confirmed save consumes matching picks, leaving newer choices intact", () => {
  const tab = storage()
  basket.writeNzBirdBasket(tab, [a, b, c])
  assert.equal(basket.consumeNzBirdBasket(tab, [a, b]), true)
  assert.deepEqual(basket.readNzBirdBasket(tab), [c])
  basket.consumeNzBirdBasket(tab, [c])
  assert.equal(tab.getItem(basket.NZ_BIRD_BASKET_KEY), null)
})

if (existsSync(resolve(__dirname, "../content/new-zealand-carousel.ts"))) {
  test("every photographed NZ bird selects a living parent species; map associations remain complete", () => {
    const birds = load("content/new-zealand-carousel.ts").newZealandCarouselBirds
    const islands = load("content/new-zealand-bird-islands.ts").newZealandBirdIslands
    assert.equal(birds.length, 31)
    for (const bird of birds) {
      assert.ok(catalogue.featuredNzBirdId(bird.scientificName), bird.scientificName)
      assert.ok(islands[bird.id]?.length, bird.id)
    }
  })
}
