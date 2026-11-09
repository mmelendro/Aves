const { test } = require("node:test")
const assert = require("node:assert/strict")
const { readFileSync } = require("node:fs")
const { join } = require("node:path")
const ts = require("typescript")
const result = {}
const code = ts.transpileModule(readFileSync(join(__dirname, "../lib/cover-focal-position.ts"), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText
new Function("exports", code)(result)
const { coverFocalPosition } = result

function placement(frameWidth, frameHeight, imageWidth, imageHeight, position) {
  const offsets = coverFocalPosition({ frameWidth, frameHeight, imageWidth, imageHeight, position }).split(" ").map(Number.parseFloat)
  const scale = Math.max(frameWidth / imageWidth, frameHeight / imageHeight)
  return { offsets, width: imageWidth * scale, height: imageHeight * scale }
}
const near = (actual, expected) => assert.ok(Math.abs(actual - expected) < 0.00001, `${actual} ≠ ${expected}`)

test("the same off-centre bird stays centred while a landscape photo frame narrows", () => {
  for (const frameWidth of [650, 480, 320, 240]) {
    const { offsets, width, height } = placement(frameWidth, 700, 1600, 900, "35% center")
    near(offsets[0] + width * 0.35, frameWidth / 2)
    near(offsets[1] + height * 0.5, 350)
  }
})

test("portrait and short-frame crops centre the authored vertical focal point", () => {
  for (const frameHeight of [200, 300, 500]) {
    const { offsets, width, height } = placement(600, frameHeight, 900, 1600, "center 25%")
    near(offsets[0] + width * 0.5, 300)
    near(offsets[1] + height * 0.25, frameHeight / 2)
  }
})

test("edge and uncropped focal points clamp without exposing empty padding", () => {
  for (const [frameWidth, frameHeight] of [[240, 700], [700, 240], [480, 600], [900, 700]]) {
    for (const position of ["left top", "right bottom", "center", "5% 95%", "35% center"]) {
      const { offsets, width, height } = placement(frameWidth, frameHeight, 1600, 900, position)
      assert.ok(offsets[0] <= 0 && offsets[1] <= 0, position)
      assert.ok(offsets[0] + width >= frameWidth - 0.00001, position)
      assert.ok(offsets[1] + height >= frameHeight - 0.00001, position)
    }
  }
  assert.equal(coverFocalPosition({ frameWidth: 800, frameHeight: 450, imageWidth: 1600, imageHeight: 900 }), "0px 0px")
})

test("keyword ordering is preserved and incomplete or unsupported measurements keep authored CSS", () => {
  const dimensions = { frameWidth: 320, frameHeight: 700, imageWidth: 1600, imageHeight: 900 }
  assert.equal(coverFocalPosition({ ...dimensions, position: "top left" }), coverFocalPosition({ ...dimensions, position: "left top" }))
  assert.equal(coverFocalPosition({ ...dimensions, position: "top" }), coverFocalPosition({ ...dimensions, position: "center top" }))
  for (const imageWidth of [0, NaN, Infinity]) assert.equal(coverFocalPosition({ ...dimensions, imageWidth, position: "35% center" }), "35% center")
  assert.equal(coverFocalPosition({ ...dimensions, position: "12px center" }), "12px center")
})
