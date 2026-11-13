const {test}=require('node:test'),assert=require('node:assert/strict');
const p=require('./helpers/load-ts.cjs')()('lib/south-island-trip-planner.ts').southIslandPlanner;
test('adding an alternative does not charge for two mutually exclusive outings',()=>{
 const d=p.buildTrip({...p.defaultTripInput,days:3,activityBasis:'experience',allowances:{activities:100}});
 const before=p.tripAllowanceSummary(d).total;d.days[0].extraId='trip-arthurs-pass-information';
 assert.ok(p.validTripDraft(d));assert.equal(p.tripAllowanceSummary(d).total,before);
 d.days[0].birdingId='';assert.equal(p.tripAllowanceSummary(d).total,before);
 d.days[0].extraId='';assert.equal(p.tripAllowanceSummary(d).total,before-100);
});
