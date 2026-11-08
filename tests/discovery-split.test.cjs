const { test } = require("node:test")
const assert = require("node:assert/strict")
const { readFileSync } = require("node:fs")
const { resolve } = require("node:path")
const ts = require("typescript")

const exportsForTest = {}
const code = ts.transpileModule(readFileSync(resolve(__dirname, "../lib/discovery-split.ts"), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText
new Function("exports", code)(exportsForTest)
const { discoverySplitBounds, clampDiscoverySplit, dragDiscoverySplit, DISCOVERY_HANDLE_WIDTH, DISCOVERY_MIN_PANEL_WIDTH, DISCOVERY_PAIR_MIN_WIDTH } = exportsForTest

test("drag and keyboard limits keep both panels usable at every paired width", () => {
  for (const width of [DISCOVERY_PAIR_MIN_WIDTH, 640, 672, 900, 1216]) {
    const { min, max } = discoverySplitBounds(width)
    const available = width - DISCOVERY_HANDLE_WIDTH
    for (const request of [-500, min, 50, max, 500]) {
      const share = clampDiscoverySplit(request, width)
      assert.ok(share >= min && share <= max)
      assert.ok(available * share / 100 >= DISCOVERY_MIN_PANEL_WIDTH - 0.001)
      assert.ok(available * (100 - share) / 100 >= DISCOVERY_MIN_PANEL_WIDTH - 0.001)
    }
    assert.equal(clampDiscoverySplit(50, width), 50, "balanced reset always fits")
  }
})

test("dragging is continuous from the grab point and cannot overshoot either edge", () => {
  const width = 672
  const { min, max } = discoverySplitBounds(width)
  assert.equal(dragDiscoverySplit(50, 0, width), 50)
  assert.ok(dragDiscoverySplit(50, 25, width) > 50)
  assert.ok(dragDiscoverySplit(50, -25, width) < 50)
  assert.equal(dragDiscoverySplit(50, 10000, width), max)
  assert.equal(dragDiscoverySplit(50, -10000, width), min)
})

test("narrowing the container clamps the previous split; unusable geometry stays balanced", () => {
  const previous = clampDiscoverySplit(65, 900)
  assert.ok(clampDiscoverySplit(previous, 624) < previous)
  for (const width of [0, 30, 44, 390]) {
    assert.ok(Number.isFinite(clampDiscoverySplit(NaN, width)))
    assert.equal(clampDiscoverySplit(NaN, width), 50)
  }
})

test("wide-screen ratios keep either panel within forty to sixty percent", () => {
  for (const width of [900, 1216]) {
    assert.equal(clampDiscoverySplit(-100, width), 40)
    assert.equal(clampDiscoverySplit(200, width), 60)
  }
})
