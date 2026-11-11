const {test}=require('node:test');
const assert=require('node:assert/strict');
const load=require('./helpers/load-ts.cjs')();
const p=load('lib/south-island-trip-planner.ts');
const {planningContext,southIslandPlanning:c}=load('content/new-zealand-planning-context.ts');
function storage(){const m=new Map();return {getItem:k=>m.get(k)||null,setItem:(k,v)=>m.set(k,v),removeItem:k=>m.delete(k)}}
test('only an operational island resolves to a planning context',()=>{
 assert.equal(planningContext('south-island'),c);assert.equal(planningContext('north-island').id,'north-island');
 for(const id of ['rakiura','unknown','__proto__'])assert.equal(planningContext(id),null);
 assert.equal(p.TRIP_DRAFT_KEY,c.draftKey);assert.equal(p.tripGateways,c.gateways);
 assert.ok(c.accountHref.endsWith('region='+c.id));
});
test('untagged South Island drafts remain readable and new writes carry island identity',()=>{
 const s=storage(),now=Date.now();const input={...p.defaultTripInput};delete input.islandId;
 const draft=p.buildSouthIslandTrip(input);
 s.setItem(p.TRIP_DRAFT_KEY,JSON.stringify({at:now,draft}));
 assert.deepEqual(p.readTripDraft(s,now),draft);
 assert.equal(p.writeTripDraft(s,draft,now),true);
 assert.equal(JSON.parse(s.getItem(p.TRIP_DRAFT_KEY)).islandId,'south-island');
});
test('other island envelopes and inputs cannot be imported, overwritten by a failed write or consumed',()=>{
 const s=storage(),now=Date.now(),draft=p.buildSouthIslandTrip(p.defaultTripInput);
 for(const other of ['north-island','unknown']){
  const foreign={...draft,input:{...draft.input,islandId:other}};
  assert.equal(p.validTripInput(foreign.input),false);assert.equal(p.validTripDraft(foreign),false);
  assert.throws(()=>p.buildSouthIslandTrip(foreign.input));
  for(const envelope of [{at:now,islandId:other,draft},{at:now,draft:foreign}]){
   const raw=JSON.stringify(envelope);s.setItem(p.TRIP_DRAFT_KEY,raw);
   assert.equal(p.readTripDraft(s,now),null);assert.equal(p.writeTripDraft(s,foreign,now),false);
   p.consumeTripDraft(s,p.tripDraftText(draft));assert.equal(s.getItem(p.TRIP_DRAFT_KEY),raw);
  }
 }
});
