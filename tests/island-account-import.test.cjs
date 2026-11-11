const {test}=require('node:test');
const assert=require('node:assert/strict');
const {componentHarness,nodes}=require('./helpers/component-harness.cjs');
const load=require('./helpers/load-ts.cjs')();
const {southIslandPlanner:p}=load('lib/south-island-trip-planner.ts');
function harness(regions){
 const m=new Map(),storage={getItem:k=>m.get(k)||null,setItem:(k,v)=>m.set(k,v),removeItem:k=>m.delete(k)};
 p.writeTripDraft(storage,p.buildTrip(p.defaultTripInput));
 return componentHarness('components/account/trip-plan-editor.tsx','TripPlanEditor',{initial:{country:'new-zealand',regions},onSaved(){assert.fail('Import must not save')},onCancel(){}},{runEffects:true,window:{sessionStorage:storage}});
}
test('explicit North Island account intent never offers a pending South Island itinerary',()=>{
 const h=harness(['north-island']);h.render();const tree=h.render();
 assert.equal(nodes(tree).some(n=>n.props?.['aria-label']==='Itinerary from this browser tab'),false);
});
test('South Island pending itinerary remains an explicit append, not an automatic save',()=>{
 const h=harness(['south-island']);h.render();let tree=h.render();
 assert.ok(nodes(tree).some(n=>n.props?.['aria-label']==='Itinerary from this browser tab'));
 const importButton=nodes(tree).find(n=>n.type==='button'&&n.props.children==='Add Itinerary to Notes');
 assert.ok(importButton);importButton.props.onClick();tree=h.render();
 assert.match(JSON.stringify(tree),/\[AVES South Island itinerary v1\]/);
 assert.match(JSON.stringify(tree),/Review, then Save My Draft/);
});
