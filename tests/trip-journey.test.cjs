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
test('reviewed property points apply only to the selected stay and airport arrivals remain opt-in',()=>{
 const p=islandPlanner('south-island'),d=p.buildTrip({...p.defaultTripInput,days:3});
 d.days[0]={...d.days[0],baseId:'christchurch',stayId:'trip-novotel-chc'};
 const before=JSON.stringify(d),steps=buildTripJourney(d,p.tripAreas,p.tripPlaces);
 assert.equal(steps[0].mapPoint,undefined,'starting city never implies a flight');
 const night=steps.find(s=>s.day===1&&s.kind==='overnight');
 assert.equal(night.mapPoint.id,'novotel-chc');assert.match(night.note,/not a room reservation/);
 assert.equal(night.mapPoint.latitude,-43.486398);assert.equal(JSON.stringify(d),before);
 d.days[0].stayId='airbnb:christchurch';
 assert.equal(buildTripJourney(d,p.tripAreas,p.tripPlaces).find(s=>s.day===1&&s.kind==='overnight').mapPoint,undefined);
});
test('airport references are limited by base and step kind with explicit provenance',()=>{
 const {arrivalReferences}=load('lib/journey-reference-points.ts');
 assert.equal(arrivalReferences('christchurch','arrival')[0].id,'chc-airport');
 assert.equal(arrivalReferences('christchurch','departure').length,1);
 assert.equal(arrivalReferences('christchurch','overnight').length,0);
 assert.equal(arrivalReferences('auckland','arrival')[0].id,'akl-airport');
 const point=arrivalReferences('christchurch','arrival')[0];assert.match(point.scope,/not a terminal door/);assert.ok(point.sourceUrl&&point.coordinateSourceUrl&&point.reviewedAt);
});

test('North Island property and transfer references retain their bounded source',()=>{
 const d=n.buildTrip({...n.defaultTripInput,days:3});d.days[0].stayId='trip-ni-ibis-airport';
 const before=JSON.stringify(d),steps=buildTripJourney(d,n.tripAreas,n.tripPlaces);
 assert.equal(steps.find(s=>s.kind==='overnight').mapPoint.id,'ibis-akl');
 const transfer=steps.find(s=>s.kind==='transfer');assert.equal(transfer.transfer.minutes,95);assert.equal(transfer.transfer.from.id,'auckland');assert.equal(transfer.transfer.to.id,'hamilton');assert.match(transfer.transfer.sourceUrl,/gorentals/);
 assert.equal(steps[0].mapPoint,undefined);assert.equal(JSON.stringify(d),before);
});
