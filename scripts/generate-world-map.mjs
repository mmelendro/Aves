/**
 * Build the public SVG geometry once, not in a visitor's browser.
 * Usage (from source): node scripts/generate-world-map.mjs <downloaded GeoJSON>
 * The pinned hash prevents a silently different source replacing our reviewed map.
 * See docs/WORLD-MAP.md for the public-domain source and regeneration steps.
 */
import { readFile, writeFile } from "node:fs/promises"
import { createHash } from "node:crypto"
import { fileURLToPath } from "node:url"
import { worldPoint } from "./equal-earth.mjs"

const input = process.argv[2]
if (!input) throw new Error("Pass the downloaded Natural Earth 110m countries GeoJSON path")
const bytes = await readFile(input)
const hash = createHash("sha256").update(bytes).digest("hex")
if (hash !== "6866c877d39cba9c357620878839b336d569f8c662d3cfab4cb1dbe2d39c977f") {
  throw new Error("Natural Earth source changed; review it before updating the pinned hash")
}

// Densifying long edges keeps projected curves smooth, including Antarctica's
// pole edge. Natural Earth already splits other polygons at the date line.
function line(points, close = false) {
  const sampled = [points[0]]
  for (let i = 1; i < points.length; i++) {
    const [a, b] = [points[i - 1], points[i]]
    const steps = Math.max(1, Math.ceil(Math.max(Math.abs(b[0] - a[0]), Math.abs(b[1] - a[1])) / 2))
    for (let step = 1; step <= steps; step++) sampled.push([a[0] + (b[0] - a[0]) * step / steps, a[1] + (b[1] - a[1]) * step / steps])
  }
  return sampled.map(([lon, lat], i) => `${i ? "L" : "M"}${worldPoint(lon, lat).join(",")}`).join("") + (close ? "Z" : "")
}

const features = JSON.parse(bytes).features
const countries = features.map(({ properties: p, geometry: g }) => ({
  code: p.ADM0_A3,
  name: p.NAME_EN,
  anchor: worldPoint(p.LABEL_X, p.LABEL_Y),
  path: (g.type === "Polygon" ? [g.coordinates] : g.coordinates).map(polygon => polygon.map(ring => line(ring, true)).join("")).join(""),
}))
if (countries.length !== 177 || new Set(countries.map(country => country.code)).size !== 177) throw new Error("Unexpected country coverage")
const graticule = []
for (let lon = -150; lon <= 150; lon += 30) graticule.push(line(Array.from({ length: 91 }, (_, i) => [lon, -90 + i * 2])))
for (let lat = -60; lat <= 60; lat += 30) graticule.push(line(Array.from({ length: 181 }, (_, i) => [-180 + i * 2, lat])))
const outline = line([[-180, -90], [-180, 90], [180, 90], [180, -90], [-180, -90]], true)
const result = {
  projection: "Equal Earth",
  viewBox: "0 0 1000 572",
  source: "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson",
  sourceSha256: hash,
  license: "Public domain — Natural Earth",
  outline, graticule: graticule.join(""), countries,
}
const output = fileURLToPath(new URL("../content/world-map.json", import.meta.url))
await writeFile(output, JSON.stringify(result) + "\n")
console.log(`Generated ${countries.length} Equal Earth country shapes`)
