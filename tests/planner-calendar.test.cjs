const {test}=require('node:test');const assert=require('node:assert/strict');
const load=require('./helpers/load-ts.cjs')();const {northIslandPlanner:n,islandPlanner}=load('lib/island-planners.ts');const s=islandPlanner('south-island');
test('Orokonui is offered only for a reviewed matching day; old guest selections are retained for review',()=>{
 const place=s.tripPlaceById.get('trip-orokonui');
 const input={...s.defaultTripInput,days:1,areaId:'otago',departureDate:'2026-11-17'};
 assert.equal(s.placeFitsCalendar(place,input,0),false);
 assert.equal(s.buildTrip(input).days[0].birdingId==='trip-orokonui',false);
 const legacy=s.buildTrip(input);legacy.days[0].birdingId=place.id;legacy.days[0].extraId='';
 assert.equal(s.validTripDraft(legacy),true);assert.match(s.tripDraftText(legacy),/Day 1 calendar review/);assert.match(s.tripDayWorkload(legacy,0).notes.join(' '),/selected date conflicts/);
 const m=new Map(),storage={setItem:(k,v)=>m.set(k,v),getItem:k=>m.get(k)||null,removeItem:k=>m.delete(k)};
 assert.equal(s.writeTripDraft(storage,legacy),true);assert.equal(s.readTripDraft(storage).days[0].birdingId,place.id);
 assert.equal(s.placeFitsCalendar(place,{...input,departureDate:'2026-11-19'},0),true);
 assert.equal(s.placeFitsCalendar(place,{...input,departureDate:''},0),false);
});
test('indoor museum is an optional dated alternative, never an automatic extra arrival activity',()=>{
 const place=n.tripPlaceById.get('trip-ni-waikato-museum');assert.equal(place.indoorAlternative,true);assert.deepEqual(place.birdIds,[]);
 assert.equal(n.placeFitsCalendar(place,{...n.defaultTripInput,departureDate:'2026-12-25'},4),false);
 assert.equal(n.placeFitsCalendar(place,{...n.defaultTripInput,departureDate:'2026-12-24'},4),true);
 const d=n.buildTrip({...n.defaultTripInput,days:3,interests:['culture']});
 assert.notEqual(d.days[1].extraId,place.id);assert.equal(n.validTripDraft(d),true);
});
test('walking references retain distinct scopes and do not claim complete outing durations',()=>{
 const redwoods=n.tripPlaceById.get('trip-ni-redwoods'),sulphur=n.tripPlaceById.get('trip-ni-sulphur-bay');
 assert.equal(redwoods.visitReference.minutes,30);assert.match(redwoods.visitReference.scope,/2 km/);assert.equal(sulphur.visitReference.minutes,120);
 const d=n.buildTrip({...n.defaultTripInput,days:3});d.days[2].birdingId='';d.days[2].extraId=redwoods.id;
 assert.equal(n.validTripDraft(d),true);assert.match(n.tripDayWorkload(d,2).notes.join(' '),/Local travel, birding and breaks are additional/);
 assert.equal(s.tripPlaceById.get('trip-lake-gunn').visitReference,undefined);
});
