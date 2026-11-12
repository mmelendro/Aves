const {test}=require('node:test'),assert=require('node:assert/strict');
const load=require('./helpers/load-ts.cjs')();const {northIslandPlanner:n,islandPlanner}=load('lib/island-planners.ts');const {buildTripJourney}=load('lib/trip-journey.ts');
for(const planner of [n,islandPlanner('south-island')])test(`${planner.context.name} visual steps preserve days, nights, route and local evidence`,()=>{
 const d=planner.buildTrip({...planner.defaultTripInput,days:3});const original=JSON.stringify(d);
 const steps=buildTripJourney(d,planner.tripAreas,planner.tripPlaces);
 assert.equal(JSON.stringify(d),original);assert.equal(steps[0].kind,'arrival');assert.equal(steps.at(-1).kind,'departure');
 assert.equal(steps.filter(s=>s.kind==='overnight').length,2);assert.equal(steps.filter(s=>s.kind==='transfer').length,d.days.filter(d=>d.transferFrom).length);
 assert.equal(new Set(steps.map(s=>s.id)).size,steps.length);
 for(const step of steps){assert.equal(step.baseId,d.days[step.day-1].baseId);assert.ok(step.places.every(p=>planner.tripPlaceById.get(p.id).base===step.baseId));assert.ok(step.birdIds.every(id=>planner.tripPlaces.some(p=>p.base===step.baseId&&p.birdIds.includes(id))));}
});
test('no fake airports or precise hotel coordinates are introduced and optional outings remain alternatives',()=>{
 const d=n.buildTrip({...n.defaultTripInput,days:7});const steps=buildTripJourney(d,n.tripAreas,n.tripPlaces);
 assert.match(steps[0].note,/not an airport/);assert.ok(steps.every(s=>!('latitude' in s)&&!('longitude' in s)));
 const shared=d.days.findIndex(day=>day.birdingId&&day.extraId);if(shared>=0)assert.match(steps.find(s=>s.day===shared+1&&s.kind==='outing').note,/alternatives/);
});
test('excluding managed encounters also excludes their bird evidence from visual preview',()=>{
 const d=n.buildTrip({...n.defaultTripInput,days:3,includeManaged:false});const steps=buildTripJourney(d,n.tripAreas,n.tripPlaces);
 for(const step of steps)assert.ok(step.birdIds.every(id=>n.tripPlaces.some(p=>p.base===step.baseId&&p.encounter==='wild'&&p.birdIds.includes(id))));
});

test('visual bird profiles show current-base evidence while retaining original photo credits',()=>{
 const {journeyBirdProfiles}=load('lib/trip-journey.ts'),{getDestinationRegionBirds}=load('content/destination-regions.ts'),{featuredNzBirdId}=load('content/new-zealand-checklist.ts');
 const d=n.buildTrip({...n.defaultTripInput,days:3}),step=buildTripJourney(d,n.tripAreas,n.tripPlaces).find(s=>s.baseId==='hamilton');
 const source=getDestinationRegionBirds('new-zealand'),before=JSON.stringify(source),birds=journeyBirdProfiles(source,step,'north-island',featuredNzBirdId);
 assert.ok(birds.length);assert.equal(JSON.stringify(source),before);
 for(const b of birds){assert.match(b.localOccurrence,/Local references near Hamilton/);assert.equal(b.regionHref,'/new-zealand/north-island');assert.equal(b.photoCredit,source.find(x=>x.id===b.id).photoCredit);assert.ok(b.sources.some(s=>step.birdSources[featuredNzBirdId(b.scientificName)].some(ref=>ref.url===s.url)));}
});
