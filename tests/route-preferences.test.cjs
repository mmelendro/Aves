const {test}=require('node:test'),assert=require('node:assert/strict');
const load=require('./helpers/load-ts.cjs')();
const {routePreferences,routeTiming,routeParty}=load('lib/route-preferences.ts');
const p=load('lib/island-planners.ts').northIslandPlanner;
const {questionnaireSchema}=load('lib/account-models.ts');
test('explicit preference import retains currency, zero allowances, basis, transport and rooms without converting the general budget',()=>{
 const draft=p.buildTrip({...p.defaultTripInput,days:7,departureDate:'2027-02-14',currency:'CAD',activityBasis:'experience',adults:2,rooms:1,allowances:{accommodation:0,activities:70,transport:30}});
 const pref=routePreferences(draft);assert.equal(routeTiming(pref),'2027-02-08 to 2027-02-14');assert.equal(routeParty(pref),'2 people');
 const current={version:1,pace:'open',birding:'open',comfort:'open',interests:[],budget:{currency:'AUD',food:65}};
 const imported=questionnaireSchema.parse({...current,routePreferences:pref});assert.deepEqual(imported.budget,current.budget);assert.equal(imported.routePreferences.currency,'CAD');assert.equal(imported.routePreferences.allowances.accommodation,0);assert.equal(imported.routePreferences.allowances.transport,30);assert.equal(imported.routePreferences.activityBasis,'experience');assert.equal(imported.routePreferences.rooms,1);
 assert.deepEqual(current.budget,{currency:'AUD',food:65});
});
