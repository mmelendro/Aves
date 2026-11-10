const { test } = require('node:test')
const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
test('all configured Australian region headers resolve with appropriate inland water', async () => {
  const { releasedAustraliaHeaders, contextualHeaderGeometry } = await import('../lib/header-landscape.mjs')
  const ids = [...readFileSync('content/region-options.ts','utf8').matchAll(/id: "([a-z-]+)"/g)].map(m=>m[1])
  assert.equal(ids.length,9)
  for (const id of ids) assert.ok(releasedAustraliaHeaders['/regions/'+id], id)
  assert.equal(releasedAustraliaHeaders['/regions/australian-capital-territory'].water,'river')
  for (const id of ['queensland','victoria','western-australia','northern-territory']) assert.notEqual(releasedAustraliaHeaders['/regions/'+id].water,'ocean')
  for (const p of Object.values(releasedAustraliaHeaders)) for (const width of [320,340,390,768,1440,2560]) {
    const g=contextualHeaderGeometry({width,wordCenter:Math.min(width/3,140)},p)
    assert.ok(!/NaN|undefined|Infinity/.test([g.boundary,...g.ridges,...g.water].join(' ')))
    assert.equal(g.whales.length,0)
  }
  assert.equal(releasedAustraliaHeaders['/account'],undefined)
})
