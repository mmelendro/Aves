const { test } = require('node:test')
const assert = require('node:assert/strict')
test('released inland headers cannot inherit marine wildlife or surf', async () => {
  const { releasedColombiaHeaders, contextualHeaderGeometry } = await import('../lib/header-landscape.mjs')
  assert.equal(Object.keys(releasedColombiaHeaders).length, 9)
  assert.equal(releasedColombiaHeaders['/regions/eastern-andes'], undefined)
  for (const [route, profile] of Object.entries(releasedColombiaHeaders)) {
    if (route !== '/colombia') assert.notEqual(profile.water, 'ocean')
    for (const width of [320, 340, 390, 768, 1440, 2560]) {
      const g = contextualHeaderGeometry({width, wordCenter: Math.min(width/3,140), navLeft: width-60, navRight:width-16}, profile)
      assert.equal(g.whales.length, 0)
      assert.equal(g.birds.length, 0)
      assert.ok(!/NaN|undefined|Infinity/.test([g.boundary,...g.ridges,...g.water].join(' ')))
      if (profile.water === 'none') assert.equal(g.water.length, 0)
    }
  }
})
