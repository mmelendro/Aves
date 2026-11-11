const {test}=require('node:test');
const assert=require('node:assert/strict');
const {readFileSync,existsSync}=require('node:fs');
const load=require('./helpers/load-ts.cjs')();
const {googleMapsLink}=load('lib/google-maps-links.ts');
test('external Maps actions encode public place names without private origins or credentials',()=>{
 const q='Komitimiti / Riverside Café, Nelson & Tasman, New Zealand';
 for(const action of ['search','directions']){
  const u=new URL(googleMapsLink(action,q));
  assert.equal(u.origin,'https://www.google.com');assert.equal(u.searchParams.get('api'),'1');
  assert.equal(u.searchParams.get(action==='search'?'query':'destination'),q);
  assert.deepEqual([...u.searchParams.keys()],['api',action==='search'?'query':'destination']);
 }
});
test('regional templates delegate to one explorer and the planner cannot mount a second map',()=>{
 const source=f=>readFileSync(f,'utf8');
 assert.match(source('components/colombia-region-page.tsx'),/explorerRegion=\{region.id\}/);
 assert.match(source('app/australia/regions/[slug]/page.tsx'),/explorerRegion=\{region.id\}/);
 assert.equal((source('app/new-zealand/south-island/page.tsx').match(/<DestinationExplorerPage\b/g)||[]).length,1);
 assert.doesNotMatch(source('components/south-island-trip-planner.tsx'),/<svg|TripBaseMap|<iframe/);
 assert.equal(existsSync('components/trip-planner/trip-base-map.tsx'),false);
 const map=source('components/south-island-ecosystem-map.tsx');
 assert.ok(map.indexOf('<TripRouteOverlay />')>map.indexOf('<PublicPlaceOverlay unit='),'route numbers paint above clickable public markers');
 assert.equal((source('components/homepage-destination-explorer.tsx').match(/<SouthIslandEcosystemMap\b/g)||[]).length,1);
});
test('itinerary overlay retains order and ignores unknown geography without capturing map gestures',()=>{
 const loader=require('./helpers/load-ts.cjs')({mocks:{
  './trip-map-context':{useTripMap:()=>({bases:['christchurch','invalid','arthurs-pass']})},
  '../map-layer-context':{useMapLayers:()=>({layers:{itinerary:true}})}
 }});
 const tree=loader('components/trip-planner/trip-route-overlay.tsx').default();
 assert.equal(tree.props.pointerEvents,'none');
 const [line,markers]=tree.props.children;
 assert.equal(line.type,'polyline');assert.equal(line.props.points.split(' ').length,2);
 assert.equal(markers.length,2);assert.match(markers[0].props.children[0].props.children.join(''),/Christchurch/);
 const hidden=require('./helpers/load-ts.cjs')({mocks:{'./trip-map-context':{useTripMap:()=>({bases:['christchurch']})},'../map-layer-context':{useMapLayers:()=>({layers:{itinerary:false}})}}});
 assert.equal(hidden('components/trip-planner/trip-route-overlay.tsx').default(),null);
});
