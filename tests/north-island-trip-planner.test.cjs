const {test}=require('node:test');
const assert=require('node:assert/strict');
const load=require('./helpers/load-ts.cjs')();
const {northIslandPlanner:p,islandPlanner}=load('lib/island-planners.ts');
const {selectableNzBirds}=load('content/new-zealand-checklist.ts');
const id=name=>selectableNzBirds.find(b=>b.commonName===name).id;
const input=patch=>({...p.defaultTripInput,...patch});
test('North Island has one canonical operational guide and an independently scoped engine',()=>{
 assert.equal(islandPlanner('north-island'),p);assert.equal(islandPlanner('__proto__'),null);
 assert.equal(load('lib/new-zealand-region-links.ts').newZealandRegionHref('north-island'),'/new-zealand/north-island');
 assert.equal(p.context.accountHref,'/account?country=new-zealand&region=north-island');
 assert.equal(p.tripPlaces.length,18);assert.equal(p.tripAreas.length,3);
 for(const place of p.tripPlaces){assert.ok(p.tripAreaById.has(place.base));assert.ok(place.categories.every(c=>p.tripCategories.some(k=>k.id===c)));assert.equal(new URL(place.url).protocol,'https:');assert.ok(place.birdIds.every(id=>selectableNzBirds.some(b=>b.id===id)))}
 assert.equal(p.prices.priceByPlace.has('trip-apam'),false);
 assert.equal(p.prices.priceByPlace.get('trip-ni-hamilton-gardens').low,27.5);
});
test('every supported length preserves fixed endpoints, exactly three ordered bases and two reviewed short arrivals',()=>{
 for(const days of [3,4,5,6,7])for(const includeManaged of [false,true])for(const departureDate of ['', '2026-12-13']){
  const choices=p.buildPlans(input({days,includeManaged,departureDate,birdIds:[id('New Zealand Dabchick'),id('Stitchbird')]}));
  assert.ok(choices.length>=1);
  for(const {draft:d} of choices){
   assert.equal(p.validTripDraft(d),true,JSON.stringify(d));assert.equal(d.days.length,days);
   assert.deepEqual(d.days.filter((day,i)=>i===0||day.baseId!==d.days[i-1].baseId).map(day=>day.baseId),['auckland','hamilton','rotorua']);
   assert.equal(d.days.filter(d=>d.stayId).length,days-1);
   for(const day of d.days.filter(d=>d.transferFrom)){
    const chosen=[day.birdingId,day.extraId].filter(Boolean);assert.ok(chosen.length<=1);assert.ok(chosen.every(id=>p.tripPlaceById.get(id).shortTransferStop));
   }
   assert.deepEqual(p.tripRoadSummary(d),{total:2,reviewed:2,unknown:0,long:0});
   assert.ok(p.tripDraftText(d).startsWith('[AVES North Island itinerary v1]'));
  }
 }
 for(const patch of [{days:2},{days:8},{startCity:'rotorua'},{endCity:'auckland'},{areaId:'hamilton'}])assert.equal(p.validTripInput(input(patch)),false);
});
test('managed wishes remain unmatched when excluded, and full day excursions never share an arrival or extra outing',()=>{
 const d=p.buildTrip(input({days:7,includeManaged:false,birdIds:[id('New Zealand Falcon'),id('Stitchbird')]}));
 assert.equal(p.tripCoverage(d).covered.length,0);
 assert.ok(d.days.every(day=>!day.birdingId||p.tripPlaceById.get(day.birdingId).encounter==='wild'));
 for(const days of [3,5,7]){
  const d=p.buildTrip(input({days,departureDate:'2026-12-13',birdIds:[id('Stitchbird')]}));
  for(const day of d.days)if(p.tripPlaceById.get(day.birdingId)?.separateDay){assert.ok(!day.transferFrom);assert.equal(day.extraId,'')}
 }
});
test('edits cannot add ferry trips to arrival days, skip the corridor, overfill a short day or import a South Island stop',()=>{
 const d=p.buildTrip(input({days:3}));
 for(const change of [day=>{day.birdingId='trip-ni-maungatautari';day.extraId=''},day=>{day.birdingId='trip-ni-sulphur-bay'},day=>{day.extraId='trip-ni-hamilton-gardens';day.birdingId='trip-ni-maungatautari'},day=>{day.baseId='rotorua'},day=>{day.stayId='trip-apam'}]){const bad=structuredClone(d);change(bad.days[1]);assert.equal(p.validTripDraft(bad),false)}
 const final=structuredClone(d);final.days.at(-1).extraId='trip-ni-te-puia';assert.equal(p.validTripDraft(final),false,'one arrival outing, not two');
});
test('a ferry or timed falconry day requires a matching date and cannot become an assumed sailing',()=>{
 const ferry=p.tripPlaceById.get('trip-ni-tiritiri'),wingspan=p.tripPlaceById.get('trip-ni-wingspan');
 assert.equal(p.marketFitsDay(ferry,input({days:3}),0),false);
 // Monday and Tuesday are outside the reviewed ferry weekly pattern.
 assert.equal(p.marketFitsDay(ferry,input({days:3,departureDate:'2026-12-09'}),0),false);
 assert.equal(p.marketFitsDay(wingspan,input({days:3,departureDate:'2026-12-09'}),0),false);
});
