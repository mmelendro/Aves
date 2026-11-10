const { test } = require('node:test')
const assert = require('node:assert/strict')
const catalogue = require('../content/landscape-profiles.json')

test('all configured countries, planning regions and South Island place contexts have a unique water-aware study', async () => {
  const { profileSvg, terrainNames } = await import('../lib/landscape-study.mjs')
  assert.equal(catalogue.profiles.length, 30)
  assert.equal(new Set(catalogue.profiles.map(p=>p.id)).size, 30)
  assert.equal(catalogue.profiles.filter(p=>p.level==='country').length,3)
  assert.equal(catalogue.profiles.filter(p=>p.level==='region').length,23)
  for (const p of catalogue.profiles) {
    assert.ok(terrainNames.includes(p.terrain))
    assert.ok(['none','river','lake','lagoon','wetland','ocean'].includes(p.water))
    if (p.water !== 'ocean') assert.equal(p.whales,false,`${p.id} cannot contain a marine whale`)
    assert.ok(p.source)
    for (const compact of [false,true]) {
      const svg=profileSvg(p,{compact})
      assert.ok(!/NaN|Infinity|undefined/.test(svg),p.id)
      assert.ok(svg.includes('<svg') && svg.endsWith('</svg>'))
    }
  }
  for (const id of ['new-zealand/arthurs-pass','australia/australian-capital-territory','colombia/amazonia','colombia/llanos']) assert.notEqual(catalogue.profiles.find(p=>p.id===id).water,'ocean')
})
