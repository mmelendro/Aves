const { test } = require('node:test')
const assert = require('node:assert/strict')

test('responsive header keeps wildlife inside narrow and wide viewports without stretching birds', async () => {
  const { newZealandHeaderGeometry } = await import('../lib/header-landscape.mjs')
  for (const width of [320, 340, 390, 640, 768, 1363, 1920, 2560]) {
    const wordCenter = width > 1280 ? (width - 1280) / 2 + 130 : 110
    const right = width > 1280 ? (width + 1280) / 2 - 32 : width - 12
    const g = newZealandHeaderGeometry({ width, wordCenter, navLeft: right - (width < 640 ? 44 : 370), navRight: right })
    for (const bird of g.birds) {
      assert.ok(bird.x - bird.size >= 0 && bird.x + bird.size <= width, `bird fits ${width}`)
      assert.ok(bird.y >= 65 && bird.y < 95, 'flock clears menu and sea')
      assert.ok(bird.size <= 4.6, 'no large bird at a wider viewport')
    }
    for (const d of [g.boundary, ...g.ridges, ...g.water, ...g.whales]) {
      assert.ok(!/NaN|Infinity/.test(d))
    }
    assert.equal((g.boundary.match(/M/g) || []).length, 1, 'one main connected boundary')
    assert.equal(g.birds.length, width < 640 ? 4 : 9)
    assert.equal(g.whales.length, 2)
  }
})

test('flock follows menu bounds when menu changes without a viewport resize', async () => {
  const { newZealandHeaderGeometry } = await import('../lib/header-landscape.mjs')
  const draw = navLeft => newZealandHeaderGeometry({ width: 1363, wordCenter: 160, navLeft, navRight: 1300 })
  assert.ok(draw(700).birds[0].x < draw(1000).birds[0].x)
  assert.equal(draw(700).birds[0].size, draw(1000).birds[0].size)
})
