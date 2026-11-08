const { test } = require("node:test")
const assert = require("node:assert/strict")
const { readFileSync } = require("node:fs")
const { join } = require("node:path")
const world = require("../content/world-map.json")

test("Equal Earth projection is symmetric and preserves relative area", async () => {
  const { equalEarth, worldPoint } = await import("../scripts/equal-earth.mjs")
  assert.deepEqual(equalEarth(0, 0), [0, 0])
  for (const lat of [0, 20, 40, 60, 80]) {
    const p = equalEarth(75, lat)
    assert.equal(equalEarth(-75, lat)[0], -p[0])
    assert.equal(equalEarth(75, -lat)[1], -p[1])
    // A spherical equal-area projection has Jacobian proportional to cos(phi).
    // Finite differences catch a swapped term/constant, beyond testing fixtures.
    const h = 0.00001
    const dx = (equalEarth(75 + h, lat)[0] - equalEarth(75 - h, lat)[0]) / (2 * h * Math.PI / 180)
    const dy = (equalEarth(75, lat + h)[1] - equalEarth(75, lat - h)[1]) / (2 * h * Math.PI / 180)
    assert.ok(Math.abs(dx * dy / Math.cos(lat * Math.PI / 180) - 1) < 0.0001, `area at ${lat}`)
  }
  assert.deepEqual(worldPoint(0, 0), [500, 270])
  assert.ok(worldPoint(0, 60)[1] < worldPoint(0, -60)[1], "north stays above south")
})

test("complete world geometry, including New Zealand and Antarctica, fits an undistorted viewport", () => {
  assert.equal(world.projection, "Equal Earth")
  assert.equal(world.countries.length, 177)
  assert.equal(new Set(world.countries.map(c => c.code)).size, 177)
  assert.match(world.sourceSha256, /^[a-f0-9]{64}$/)
  for (const country of world.countries) {
    assert.match(country.path, /^M[\d.,LZM]+$/)
    const coordinates = [...country.path.matchAll(/([\d.]+),([\d.]+)/g)].map(([, x, y]) => [+x, +y])
    assert.ok(coordinates.length > 3)
    for (const [x, y] of coordinates) assert.ok(x >= 0 && x <= 1000 && y >= 0 && y <= 572, country.code)
  }
  for (const code of ["COL", "AUS", "NZL", "ATA"]) assert.ok(world.countries.some(c => c.code === code))
  assert.ok((world.countries.find(c => c.code === "NZL").path.match(/M/g) || []).length >= 2, "both main islands remain separate")
})

test("map generation is reproducible with the reviewed input", async () => {
  const { execFileSync } = require("node:child_process")
  const root = join(__dirname, "..")
  const source = readFileSync(join(root, "scripts/generate-world-map.mjs"), "utf8")
  assert.ok(source.includes(world.sourceSha256))
  // Missing input must fail rather than downloading an unreviewed moving dataset.
  assert.throws(() => execFileSync(process.execPath, ["scripts/generate-world-map.mjs"], { cwd: root, stdio: "pipe" }), /Command failed/)
})
