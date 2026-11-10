const { test } = require('node:test')
const assert = require('node:assert/strict')
test('satellite shading affects only the selected habitat and can disappear completely', async () => {
  const { satelliteHabitatStyle: paint } = await import('../lib/satellite-overlay.mjs')
  const habitats=['forest','mountains','freshwater']
  for(const selected of ['all','coast',...habitats]) for(const habitat of habitats) for(const opacity of [0,.5,1]) {
    const p=paint({satellite:true,selected,habitat,opacity})
    assert.equal(p.fillOpacity,selected===habitat?opacity:0)
    assert.equal(p.strokeOpacity,selected===habitat?1:0)
  }
  assert.equal(paint({satellite:true,selected:'forest',habitat:'forest',opacity:5}).fillOpacity,1)
  assert.equal(paint({satellite:true,selected:'forest',habitat:'forest',opacity:-1}).fillOpacity,0)
  assert.equal(paint({satellite:false,selected:'all',habitat:'forest',opacity:0}).fillOpacity,1)
})
