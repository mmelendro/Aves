const {test}=require('node:test'),assert=require('node:assert/strict');
const load=require('./helpers/load-ts.cjs')();
const recovery=load('lib/planner-recovery.ts');
const north=load('lib/island-planners.ts').islandPlanner('north-island');
const south=load('lib/south-island-trip-planner.ts').southIslandPlanner;
const basket=load('lib/nz-bird-selection.ts');
const storage=()=>{const m=new Map();return {getItem:k=>m.get(k)||null,setItem:(k,v)=>m.set(k,v),removeItem:k=>m.delete(k)}};
test('recovery retains generated day edits and changed inputs without implying a handoff',()=>{
 const s=storage(),at=1000,d=north.buildTrip({...north.defaultTripInput,days:7});d.days[0].extraId='';
 const input={...d.input,days:6};assert.ok(recovery.writePlannerRecovery(s,north,input,d,at));
 assert.deepEqual(recovery.readPlannerRecovery(s,north,at+1).input,input);
 assert.deepEqual(recovery.readPlannerRecovery(s,north,at+1).draft,d);
 assert.equal(north.readTripDraft(s,at),null);assert.equal(recovery.readPlannerRecovery(s,south,at),null);
 assert.equal(recovery.readPlannerRecovery(s,north,at+86400001),null);
 assert.equal(recovery.writePlannerRecovery({setItem(){throw Error('blocked')}},north,input,d),false);
});
test('an explicit empty bird choice differs from an absent basket',()=>{
 const s=storage();assert.equal(basket.readNzBirdBasketSelection(s,1000),null);
 assert.ok(basket.writeNzBirdBasket(s,[],1000));assert.deepEqual(basket.readNzBirdBasketSelection(s,1001),[]);
 assert.equal(basket.readNzBirdBasketSelection(s,1000+86400001),null);
});
