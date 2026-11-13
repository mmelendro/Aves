const {test}=require('node:test'),assert=require('node:assert/strict');
const load=require('./helpers/load-ts.cjs')();
const p=load('lib/south-island-trip-planner.ts').southIslandPlanner;
const {selectableNzBirds}=load('content/new-zealand-checklist.ts');
const {MAX_PLAN_NOTES}=load('lib/planning-limits.ts');
const {createPlanSchema}=load('lib/account-models.ts');
test('a maximum-length route with every selectable bird survives notes handoff and API validation',()=>{
 const draft=p.buildTrip({...p.defaultTripInput,days:30,birdIds:selectableNzBirds.map(b=>b.id),departureDate:'2027-02-28',startCity:'christchurch',endCity:'queenstown',maxDrivingMinutes:120,allowances:{accommodation:10000,food:10000,activities:10000,transport:10000}});
 const notes='Existing private notes.\n'.repeat(200),result=p.mergeTripNotes(notes,draft);
 assert.equal(result.error,undefined);assert.ok(result.message.startsWith(notes));assert.ok(result.message.includes(p.tripDraftText(draft)));
 assert.ok(createPlanSchema.safeParse({id:'a1111111-1111-4111-8111-111111111111',country:'new-zealand',title:'Thirty days',regions:['south-island'],travelWhen:'',partySize:'',message:result.message}).success);
 const full='x'.repeat(MAX_PLAN_NOTES);assert.equal(p.mergeTripNotes(full,draft).message,full);assert.ok(p.mergeTripNotes(full,draft).error);
});
