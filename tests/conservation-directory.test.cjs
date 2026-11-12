const {test}=require('node:test')
const assert=require('node:assert/strict')
const load=require('./helpers/load-ts.cjs')()
const directory=require('../content/conservation-directory.json')
test('conservation references resolve to existing country regions and keep precise wildlife locations out',()=>{
 const {destinationRegions}=load('content/destination-regions.ts')
 assert.equal(directory.records.length,4)
 assert.equal(new Set(directory.records.map(r=>r.id)).size,4)
 for(const r of directory.records){
  assert.ok(destinationRegions[r.countryId].some(region=>region.id===r.regionId),r.id)
  for(const key of ['sourceUrl','visitorUrl'])assert.equal(new URL(r[key]).protocol,'https:')
  assert.equal(r.checkedAt,'2026-11-13')
  assert.equal(r.coordinates,undefined)
  assert.equal(r.partnership,undefined)
 }
})
