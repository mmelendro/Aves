const {test}=require('node:test')
const assert=require('node:assert/strict')
const load=require('./helpers/load-ts.cjs')()
const pilot=load('content/bcorp-south-island-pilot.json')
const {bcorpPinEligible,eligibleBcorpPilotPins}=load('lib/bcorp-pilot.ts')
const now=Date.parse('2026-11-11T12:00:00Z')
function synthetic(){return{...structuredClone(pilot.records[0]),id:'synthetic-coordinate-fixture',location:{...pilot.records[0].location,coordinates:{latitude:-43,longitude:172},coordinateReview:'verified-public-location',coordinateSourceUrl:'https://example.invalid/synthetic-coordinate-proof'}}}
test('reviewed pilot exposes five address references from four certified companies only in its region',()=>{
 assert.equal(pilot.records.length,5);assert.equal(pilot.accessReview.mapLayerEnabled,true);assert.equal(pilot.accessReview.logoUse,false)
 assert.equal(new Set(pilot.records.map(r=>r.company)).size,4)
 assert.equal(eligibleBcorpPilotPins('new-zealand','south-island',now).length,5)
 assert.deepEqual(eligibleBcorpPilotPins('australia','south-island',now),[])
 assert.deepEqual(eligibleBcorpPilotPins('new-zealand','north-island',now),[])
 assert.deepEqual(eligibleBcorpPilotPins('new-zealand','south-island',Date.parse('2027-03-01')),[])
 for(const record of pilot.records){
  assert.equal(bcorpPinEligible(record,now),true)
  assert.match(record.location.coordinateSourceUrl,/^https:\/\/www.openstreetmap.org\/(node|way)\//)
  assert.ok(record.certification.scopeNote && record.location.precision && record.limitations)
 }
})
test('display guard requires all manual provenance states and the exact official certification host',()=>{
 assert.equal(bcorpPinEligible(synthetic(),now),true)
 for(const url of ['https://www.bcorporation.net.example.invalid/en-us/find-a-b-corp/company/x/','http://www.bcorporation.net/en-us/find-a-b-corp/company/x/','not a url']){
  const record=synthetic();record.certification.profileUrl=url;assert.equal(bcorpPinEligible(record,now),false)
 }
 const record=synthetic();record.location.review='pending';assert.equal(bcorpPinEligible(record,now),false)
})
test('missing, invalid, stale or future provenance cannot yield a pin',()=>{
 for(const date of ['2020-01-01','2026-11-12','2026-02-30','']){
  const record=synthetic();record.certification.checkedAt=date;assert.equal(bcorpPinEligible(record,now),false)
 }
 for(const coordinates of [null,{latitude:NaN,longitude:172},{latitude:-91,longitude:172},{latitude:-43,longitude:181}]){
  const record=synthetic();record.location.coordinates=coordinates;assert.equal(bcorpPinEligible(record,now),false)
 }
 const record=synthetic();record.location.coordinateSourceUrl=null;assert.equal(bcorpPinEligible(record,now),false)
})

test('B Corp toggle is separate from general business listings and fails closed after review expiry',()=>{
 const {visiblePublicPlaces,publicPlaceCategories}=load('lib/south-island-public-places.ts')
 const layers=Object.fromEntries(publicPlaceCategories.map(c=>[c.id,false]))
 assert.deepEqual(visiblePublicPlaces(layers,now),[])
 const pins=visiblePublicPlaces({...layers,bcorps:true},now)
 assert.equal(pins.length,5);assert.ok(pins.every(p=>p.bcorp && p.categories.length===1 && p.categories[0]==='bcorps'))
 assert.equal(visiblePublicPlaces({...layers,businesses:true},now).length,2)
 assert.deepEqual(visiblePublicPlaces({...layers,bcorps:true},Date.parse('2027-03-01')),[])
})

test('visitor categories are explicit and unsupported categories cannot become eligible pins',()=>{
 const {bcorpCategoryLabel}=load('lib/bcorp-pilot.ts')
 assert.equal(bcorpCategoryLabel('food-and-drink'),'Food & drink')
 assert.equal(bcorpCategoryLabel('guiding'),'Guided tours & tour transport')
 assert.equal(bcorpCategoryLabel('unknown'),'Business')
 const record=synthetic();record.category='unknown';assert.equal(bcorpPinEligible(record,now),false)
 const pins=eligibleBcorpPilotPins('new-zealand','south-island',now)
 assert.deepEqual([...new Set(pins.map(p=>p.category))].sort(),['accommodation','food-and-drink','guiding','retail'])
 const tour=pins.find(p=>p.id==='wild-kiwi-christchurch')
 assert.equal(tour.company,'Danai Ltd')
 assert.match(tour.certification.scopeNote,/not certification of the departure hotel/)
 assert.match(tour.location.precision,/not an office or confirmed pickup/)
})
