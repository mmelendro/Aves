const {test}=require('node:test')
const assert=require('node:assert/strict')
const load=require('./helpers/load-ts.cjs')()
const p=load('lib/south-island-trip-planner.ts'),r=p.southIslandPlanner.prices
const now=Date.parse('2026-11-11T12:00:00Z')
const input=overrides=>({...p.defaultTripInput,...overrides})
test('published price records retain product, unit, currency, reviewed source and unknown inventory',()=>{
 assert.equal(r.priceReferences.length,7)
 for(const ref of r.priceReferences){assert.ok(p.tripPlaceById.has(ref.placeId));assert.equal(ref.currency,'NZD');assert.equal(ref.availability,'not-checked');assert.ok(ref.product&&ref.conditions&&ref.publisher);assert.equal(new URL(ref.url).protocol,'https:');assert.ok(ref.low>=0&&ref.high>=ref.low)}
})
test('room prices divide by adults and multiply units, while adult entry prices never divide',()=>{
 const shared=r.referenceAmounts('trip-apam',input({adults:2,rooms:1}),'2027-01-20',now)
 assert.equal(shared.low,67.5);assert.equal(shared.high,82.5)
 assert.equal(r.referenceAmounts('trip-apam',input({adults:2,rooms:2}),'',now).low,135)
 assert.equal(r.referenceAmounts('trip-hanmer',input({adults:2,rooms:1}),'',now).low,43)
 assert.equal(r.referenceAmounts('trip-apam',input({adults:3,rooms:1}),'',now).low,null)
})
test('untyped lodging ranges, other currencies, expired tariffs and stale reviews never imply a match',()=>{
 assert.equal(r.referenceAmounts('trip-teanau-top10',input(),'',now).low,null)
 assert.equal(r.referenceAmounts('trip-apam',input({currency:'AUD'}),'',now).low,null)
 assert.equal(r.referenceAmounts('trip-whale-watch',input(),'2027-10-01',now).low,null)
 assert.equal(r.referenceAmounts('trip-whale-watch',input(),'2027-09-30',now).low,185)
 assert.equal(r.referenceAmounts('trip-hanmer',input(),'',now+91*86400000).low,null)
 assert.equal(r.referenceAmounts('airbnb:lakes',input(),'',now).low,null)
})
test('published sanctuary opening days block price comparison for a closed day',()=>{
 assert.equal(r.referenceAmounts('trip-orokonui',input(),'2027-01-19',now).low,null)
 assert.equal(r.referenceAmounts('trip-orokonui',input(),'2027-01-17',now).low,27)
})
test('primary and alternative outings remain separate costs, including missing references',()=>{
 const draft={version:1,input:input({days:1,activityBasis:'day',allowances:{activities:50}}),days:[{baseId:'hanmer',birdingId:'trip-orokonui',extraId:'trip-hanmer',stayId:''}]}
 const review=r.priceReviewRows(draft,now)
 assert.deepEqual(review.rows.map(row=>row.low),[27,43]);assert.match(review.rows[0].label,/Primary outing/);assert.match(review.rows[1].label,/Alternative/)
 draft.days[0].birdingId='trip-arthurs-birds'
 const partial=r.priceReviewRows(draft,now).rows
 assert.equal(partial[0].low,null);assert.equal(partial[0].unknown,1);assert.equal(partial[1].low,43);assert.match(r.comparisonLabel(partial[0]),/needs review/)
 draft.input.activityBasis='experience'
 assert.equal(r.priceReviewRows(draft,now).rows.length,2)
})
test('new adult/unit fields validate without discarding old tab drafts and survive copy and storage',()=>{
 const old=input();delete old.adults;delete old.rooms;assert.equal(p.validTripInput(old),true)
 for(const bad of [{adults:0},{adults:13},{adults:2,rooms:3},{rooms:0}])assert.equal(p.validTripInput(input(bad)),false)
 const draft=p.buildSouthIslandTrip(input({adults:2,rooms:1,areaId:'arthurs-pass',days:3}))
 assert.match(p.tripDraftText(draft),/Cost sharing: 2 adults, 1 room\/unit/)
 assert.match(p.tripDraftText(draft),/Cabin starting-price band for two guests/)
 const saved=new Map(),storage={getItem:k=>saved.get(k)||null,setItem:(k,v)=>saved.set(k,v),removeItem:k=>saved.delete(k)}
 p.writeTripDraft(storage,draft,now);assert.equal(p.readTripDraft(storage,now).input.adults,2)
})

test('a dated access conflict stays visible beside its selected reference',()=>{
 const {componentHarness,nodes}=require('./helpers/component-harness.cjs')
 const tree=componentHarness('components/trip-planner/trip-price-reference.tsx','default',{placeId:'trip-orokonui',date:'2027-01-19'},{context:()=>p.southIslandPlanner}).render()
 assert.ok(nodes(tree).some(n=>n.type==='p'&&JSON.stringify(n).includes('Date does not match published opening days')))
})

test('mixed room sharing keeps per-person units and unsupported transport units remain unknown',()=>{
 assert.equal(r.referenceAmounts('trip-apam',input({adults:3,rooms:2}),'',now).low,90);
 assert.equal(r.referenceAmounts('trip-hanmer',input({adults:3,rooms:2}),'',now).low,43);
 const {createPriceReferences}=load('lib/island-price-references.ts');
 const context=p.southIslandPlanner.context,existing=r.priceReferences[0];
 const unsupported=createPriceReferences({...context,prices:{references:[{...existing,basis:'vehicle-day',category:'transport'}]}}).referenceAmounts(existing.placeId,input(),'',now);
 assert.equal(unsupported.low,null);assert.match(unsupported.reason,/unit needs a quote/);
 assert.equal(r.referenceAmounts('trip-tranzalpine',input(),'',now).low,null,'an unpriced rail connection is not free');
});
