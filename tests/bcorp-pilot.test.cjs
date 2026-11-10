const {test}=require('node:test')
const assert=require('node:assert/strict')
const load=require('./helpers/load-ts.cjs')()
const pilot=load('content/bcorp-south-island-pilot.json')
const {bcorpPinEligible,eligibleBcorpPilotPins}=load('lib/bcorp-pilot.ts')
const now=Date.parse('2026-11-10T12:00:00Z')
function synthetic(){return{...structuredClone(pilot.records[0]),id:'synthetic-coordinate-fixture',location:{...pilot.records[0].location,coordinates:{latitude:-43,longitude:172},coordinateReview:'verified-public-location',coordinateSourceUrl:'https://example.invalid/synthetic-coordinate-proof'}}}
test('reviewed real candidate stays unmapped without verified coordinates and the layer stays off',()=>{
 assert.equal(pilot.records.length,1);assert.equal(pilot.accessReview.mapLayerEnabled,false);assert.equal(pilot.accessReview.logoUse,false)
 assert.equal(pilot.records[0].location.coordinates,null)
 assert.equal(bcorpPinEligible(pilot.records[0],now),false)
 assert.deepEqual(eligibleBcorpPilotPins('new-zealand','south-island',now),[])
})
test('display guard requires all manual provenance states and the exact official certification host',()=>{
 assert.equal(bcorpPinEligible(synthetic(),now),true)
 for(const url of ['https://www.bcorporation.net.example.invalid/en-us/find-a-b-corp/company/x/','http://www.bcorporation.net/en-us/find-a-b-corp/company/x/','not a url']){
  const record=synthetic();record.certification.profileUrl=url;assert.equal(bcorpPinEligible(record,now),false)
 }
 const record=synthetic();record.location.review='pending';assert.equal(bcorpPinEligible(record,now),false)
})
test('missing, invalid, stale or future provenance cannot yield a pin',()=>{
 for(const date of ['2020-01-01','2026-11-11','2026-02-30','']){
  const record=synthetic();record.certification.checkedAt=date;assert.equal(bcorpPinEligible(record,now),false)
 }
 for(const coordinates of [null,{latitude:NaN,longitude:172},{latitude:-91,longitude:172},{latitude:-43,longitude:181}]){
  const record=synthetic();record.location.coordinates=coordinates;assert.equal(bcorpPinEligible(record,now),false)
 }
 const record=synthetic();record.location.coordinateSourceUrl=null;assert.equal(bcorpPinEligible(record,now),false)
})
