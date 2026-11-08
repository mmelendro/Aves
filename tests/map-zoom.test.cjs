const { test } = require("node:test")
const assert = require("node:assert/strict")
const { readFileSync, existsSync } = require("node:fs")
const { resolve, join } = require("node:path")
const ts = require("typescript")
const root = resolve(__dirname, "..")

const exportsForTest = {}
const code = ts.transpileModule(readFileSync(join(root, "lib/map-zoom.ts"), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText
new Function("exports", code)(exportsForTest)
const { mapZoomTransform } = exportsForTest

function transform(value) {
  const match = value.match(/^translate\(\s*([-+\d.e]+)px\s*,\s*([-+\d.e]+)px\s*\)\s+scale\(\s*([-+\d.e]+)\s*\)$/i)
  assert.ok(match, `A uniform SVG transform is required: ${value}`)
  const [x, y, scale] = match.slice(1).map(Number)
  assert.ok([x, y, scale].every(Number.isFinite))
  return { x, y, scale }
}

test("a regional zoom preserves proportions, fits every selected polygon and centers the real bounds", () => {
  const { x, y, scale } = transform(mapZoomTransform("0 0 720 620", [
    "M100,200L200,200L200,300L100,300Z",
    "M220,320L240,320L240,340L220,340Z",
  ]))
  assert.ok(scale > 1, "the selected small region receives a closer view")
  for (const [px, py] of [[100, 200], [200, 200], [200, 300], [100, 300], [220, 320], [240, 320], [240, 340], [220, 340]]) {
    assert.ok(x + px * scale > 0 && x + px * scale < 720, "all selected rings remain visible horizontally")
    assert.ok(y + py * scale > 0 && y + py * scale < 620, "all selected rings remain visible vertically")
  }
  assert.ok(Math.abs(x + 170 * scale - 360) < .001)
  assert.ok(Math.abs(y + 270 * scale - 310) < .001)
  assert.ok(Math.abs(((x + 200 * scale) - (x + 100 * scale)) - ((y + 300 * scale) - (y + 200 * scale))) < .001, "one uniform scale never stretches geography")
})

test("small territories respect the explicit zoom cap and nonzero viewBox origins", () => {
  const { x, y, scale } = transform(mapZoomTransform("50 100 720 620", ["M573,458L575,458L575,460L573,460Z"], 12))
  assert.equal(scale, 12)
  assert.ok(Math.abs(x + 574 * scale - 410) < .001)
  assert.ok(Math.abs(y + 459 * scale - 410) < .001)
})

test("the existing Australian territory and New Zealand island outlines remain inside their own zoom viewports", () => {
  const australianSource = readFileSync(join(root, existsSync(join(root, "content/australia-map.ts")) ? "content/australia-map.ts" : "content/global-australian-map.ts"), "utf8")
  const australianExports = {}
  new Function("exports", ts.transpileModule(australianSource, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText)(australianExports)
  const cases = australianExports.australiaMapStates.map(state => ({ name: state.name, viewBox: australianExports.australiaMapViewBox, paths: [state.path] }))
  if (existsSync(join(root, "content/new-zealand-map.json"))) {
    const nz = JSON.parse(readFileSync(join(root, "content/new-zealand-map.json"), "utf8"))
    cases.push(...nz.islands.map(island => ({ name: island.id, viewBox: nz.viewBox, paths: island.paths })))
  }
  for (const item of cases) {
    const { x, y, scale } = transform(mapZoomTransform(item.viewBox, item.paths, 12))
    const [vx, vy, width, height] = item.viewBox.split(/\s+/).map(Number)
    assert.ok(scale >= 1 && scale <= 12, item.name)
    const points = item.paths.flatMap(path => [...path.matchAll(/([-\d.]+),([-\d.]+)/g)].map(([, px, py]) => [+px, +py]))
    for (const [px, py] of points) {
      assert.ok(x + px * scale >= vx - .001 && x + px * scale <= vx + width + .001, `${item.name}: horizontal bounds`)
      assert.ok(y + py * scale >= vy - .001 && y + py * scale <= vy + height + .001, `${item.name}: vertical bounds`)
    }
  }
})

test("missing or invalid geometry keeps a safe world/region overview", () => {
  for (const [viewBox, paths] of [
    ["0 0 720 620", []],
    ["0 0 720 620", [""]],
    ["0 0 720 620", ["not a path"]],
    ["0 0 720 620", ["MNaN,20L30,40Z"]],
    ["0 0 0 620", ["M10,10L20,20Z"]],
    ["0 0 -720 620", ["M10,10L20,20Z"]],
    ["0 0 720 Infinity", ["M10,10L20,20Z"]],
    ["broken", ["M10,10L20,20Z"]],
  ]) {
    const result = transform(mapZoomTransform(viewBox, paths))
    assert.deepEqual(result, { x: 0, y: 0, scale: 1 }, `${viewBox}/${paths}`)
  }
})
