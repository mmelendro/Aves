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

test('actual South Island place selection IDs resolve inland artwork and unknown contexts fail closed', async () => {
  const {selectLandscapeProfile}=await import('../lib/landscape-study.mjs')
  const source=require('node:fs').readFileSync(require('node:path').join(__dirname,'../content/south-island-place-media.ts'),'utf8')
  for(const id of ['mountains','forest-and-lakes','southern-forest','coast']) {
    assert.ok(source.includes(`id: "${id}"`))
    const profile=selectLandscapeProfile(catalogue.profiles,'new-zealand','south-island',id)
    assert.ok(profile)
    if(id!=='coast') { assert.notEqual(profile.water,'ocean'); assert.equal(profile.whales,false) }
  }
  assert.equal(selectLandscapeProfile(catalogue.profiles,'new-zealand','unknown'),undefined)
  assert.equal(selectLandscapeProfile(catalogue.profiles,'new-zealand','south-island','unknown'),undefined)
})
