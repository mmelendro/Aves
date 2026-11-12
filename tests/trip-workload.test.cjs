const {test}=require('node:test');const assert=require('node:assert/strict');
const load=require('./helpers/load-ts.cjs')();const {northIslandPlanner:n,islandPlanner}=load('lib/island-planners.ts');const s=islandPlanner('south-island');
test('short corridor references remain partial and compare against a preserved preference',()=>{
 const d=n.buildTrip({...n.defaultTripInput,days:3,maxDrivingMinutes:120});
 assert.deepEqual(n.tripWorkloadSummary(d),{knownDrivingMinutes:198,unknownTransfers:0,abovePreference:0});
 assert.equal(n.tripDayWorkload(d,1).label,'Travel and one local outing');
 assert.match(n.tripDayWorkload(d,1).notes.join(' '),/local travel/);
 assert.match(n.tripDraftText(d),/Driving preference: up to 2 h/);
 const m=new Map(),storage={setItem:(k,v)=>m.set(k,v),getItem:k=>m.get(k)||null,removeItem:k=>m.delete(k)};
 assert.equal(n.writeTripDraft(storage,d),true);assert.equal(n.readTripDraft(storage).input.maxDrivingMinutes,120);
});
test('long South Island references flag the chosen preference without silently rewriting the route',()=>{
 const d=s.buildTrip({...s.defaultTripInput,days:3,startCity:'christchurch',endCity:'queenstown',maxDrivingMinutes:120});
 const i=d.days.findIndex(d=>d.transferFrom);assert.ok(i>0);
 assert.equal(s.tripDayWorkload(d,i).abovePreference,true);assert.equal(s.tripDayWorkload(d,i).label,'Travel focus');
 assert.equal(s.validTripDraft(d),true);assert.equal(d.days.at(-1).baseId,'lakes');
});
test('missing road times never become zero-duration journeys or feasibility claims',()=>{
 const d=s.buildTrip({...s.defaultTripInput,days:3,startCity:'arthurs-pass',endCity:'queenstown'});
 const i=d.days.findIndex(d=>d.transferFrom);assert.equal(s.tripDayWorkload(d,i).minutes,null);
 assert.equal(s.tripWorkloadSummary(d).unknownTransfers,1);assert.match(s.tripDayWorkload(d,i).notes.join(' '),/No reviewed road time/);
});
test('legacy inputs remain valid and unsupported preference values fail before saving',()=>{
 assert.equal(s.validTripInput(s.defaultTripInput),true);
 for(const value of [null,0,119,'120',Infinity,10000])assert.equal(s.validTripInput({...s.defaultTripInput,maxDrivingMinutes:value}),false);
});
