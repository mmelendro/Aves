const {test}=require('node:test');
const assert=require('node:assert/strict');
const load=require('./helpers/load-ts.cjs')();
const focus=require('../content/geographic-map-focus.json');
const {destinationRegions}=load('content/destination-regions.ts');
test('every selectable region has a geographic camera extent, including Colombia',()=>{
 for(const [country,regions] of Object.entries(destinationRegions)) {
  const entry=focus[country];assert.ok(entry,country);
  for(const region of regions){
   const b=entry.regions[region.id];assert.ok(b,`${country}/${region.id}`);
   assert.equal(b.length,4);assert.ok(b.every(Number.isFinite));
   assert.ok(b[0]<b[2]&&b[1]<b[3]);assert.ok(b[0]>=-180&&b[2]<=180&&b[1]>-85&&b[3]<85);
  }
 }
});
test('Colombian regional camera extents contain known geographic reference locations',()=>{
 for(const [region,lng,lat] of [['caribbean',-75.5,10.4],['sierra-nevada-de-santa-marta',-73.7,10.8],['colombian-massif',-76.5,1.8],['amazonia',-69.94,-4.2],['llanos',-73.6+1,4.15]]){
  const b=focus.colombia.regions[region];assert.ok(lng>=b[0]&&lng<=b[2]&&lat>=b[1]&&lat<=b[3],region);
 }
 assert.match(focus.provenance.colombiaRegions,/not administrative\/ecological boundaries/);
});
