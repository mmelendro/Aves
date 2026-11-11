const {test}=require('node:test');
const assert=require('node:assert/strict');
const load=require('./helpers/load-ts.cjs')();
const {createIslandTripPlanner}=load('lib/island-trip-planner.ts');
const {southIslandPlanning}=load('content/new-zealand-planning-context.ts');
const {southIslandPlanner:south}=load('lib/south-island-trip-planner.ts');
// A disjoint fixture proves engine isolation before another real island is registered.
function other(){
 const context=structuredClone(southIslandPlanning);
 context.id='fixture-island';context.name='Fixture Island';context.draftKey='aves:fixture-itinerary:v1';
 context.legacyUntagged=false;context.defaultBaseId='fixture-base';context.accountHref='/account?country=new-zealand&region=fixture-island';
 context.catalogue.areas=[{...context.catalogue.areas[0],id:'fixture-base',name:'Fixture base'}];
 context.catalogue.places=context.catalogue.places.slice(0,3).map((p,i)=>({...p,id:'fixture-place-'+i,base:'fixture-base'}));
 context.gateways=[{id:'fixture-town',name:'Fixture town',baseId:'fixture-base'}];
 context.roads.corridors=[];context.prices.references=[];
 return createIslandTripPlanner(context);
}
function storage(){const m=new Map();return {getItem:k=>m.get(k)||null,setItem:(k,v)=>m.set(k,v),removeItem:k=>m.delete(k)}}
test('the shared engine uses only the supplied catalogue, gateways, references and labels',()=>{
 const p=other();const input={...p.defaultTripInput,startCity:'fixture-town',endCity:'fixture-town',days:3};
 const draft=p.buildTrip(input);
 assert.equal(p.validTripDraft(draft),true);assert.equal(draft.input.islandId,'fixture-island');
 assert.ok(draft.days.every(d=>d.baseId==='fixture-base'));
 assert.match(p.tripDraftText(draft),/\[AVES Fixture Island itinerary v1\]/);
 assert.doesNotMatch(p.tripDraftText(draft),/South Island/);
 assert.equal(p.prices.priceByPlace.has('trip-apam'),false);
 assert.equal(p.roads.roadReference('christchurch','arthurs-pass'),null);
 assert.equal(p.validTripDraft(south.buildTrip(south.defaultTripInput)),false);
 assert.equal(south.validTripDraft(draft),false);
 assert.equal(p.validTripInput({...input,startCity:'christchurch'}),false);
});
test('two contexts retain independent pending drafts and consume only a confirmed exact import',()=>{
 const p=other(),s=storage(),now=Date.now();const a=south.buildTrip(south.defaultTripInput),b=p.buildTrip(p.defaultTripInput);
 assert.equal(south.writeTripDraft(s,a,now),true);assert.equal(p.writeTripDraft(s,b,now),true);
 assert.deepEqual(south.readTripDraft(s,now),a);assert.deepEqual(p.readTripDraft(s,now),b);
 p.consumeTripDraft(s,south.tripDraftText(a));assert.deepEqual(p.readTripDraft(s,now),b);
 south.consumeTripDraft(s,south.tripDraftText(a));assert.equal(s.getItem(south.TRIP_DRAFT_KEY),null);
 assert.deepEqual(p.readTripDraft(s,now),b);
 assert.equal(p.writeTripDraft(s,a,now),false);assert.deepEqual(p.readTripDraft(s,now),b);
});
test('untagged historical storage is South Island only and foreign envelopes are preserved',()=>{
 const p=other(),s=storage(),now=Date.now();const draft=south.buildTrip(south.defaultTripInput);delete draft.input.islandId;
 s.setItem(south.TRIP_DRAFT_KEY,JSON.stringify({at:now,draft}));assert.deepEqual(south.readTripDraft(s,now),draft);
 const b=p.buildTrip(p.defaultTripInput);delete b.input.islandId;
 assert.equal(p.validTripDraft(b),false);
 const raw=JSON.stringify({at:now,draft:b});s.setItem(p.TRIP_DRAFT_KEY,raw);
 assert.equal(p.readTripDraft(s,now),null);assert.equal(s.getItem(p.TRIP_DRAFT_KEY),raw);
});
test('expired own drafts cannot remove another island pending slot',()=>{
 const p=other(),s=storage(),now=Date.now();const a=south.buildTrip(south.defaultTripInput),b=p.buildTrip(p.defaultTripInput);
 south.writeTripDraft(s,a,now-86400001);p.writeTripDraft(s,b,now);
 assert.equal(south.readTripDraft(s,now),null);assert.deepEqual(p.readTripDraft(s,now),b);
});
