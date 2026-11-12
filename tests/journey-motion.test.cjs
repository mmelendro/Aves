const {test}=require('node:test'),assert=require('node:assert/strict');
const {componentHarness}=require('./helpers/component-harness.cjs');
for(const [name,reduced,enabled,expected] of [['system reduced motion',true,true,0],['manual static mode',false,false,0],['enabled transition',false,true,1]])test(`${name} keeps the sourced transfer usable`,()=>{
 const oldDocument=global.document,oldRaf=global.requestAnimationFrame,oldCancel=global.cancelAnimationFrame;
 let frames=0;const fits=[];
 global.document={createElement:()=>({setAttribute(){},textContent:'',className:''})};
 global.requestAnimationFrame=()=>{frames++;return 1};global.cancelAnimationFrame=()=>{};
 try {
  const point=(id,latitude,longitude)=>({id,name:id,latitude,longitude});
  const from=point('auckland',-36.85,174.76),to=point('hamilton',-37.78,175.28);
  const step={id:'day-2-transfer',kind:'transfer',baseId:'hamilton',transfer:{from,to,minutes:95,sourceUrl:'https://www.gorentals.co.nz/explore/trip-planner/auckland-to-napier-drive/',publisher:'GO Rentals'}};
  const trip={bases:['auckland','hamilton'],journey:{islandId:'north-island',index:0,steps:[step]},journeyMotion:enabled};
  const layer={layers:{planning:true,itinerary:true}},dataset={};
  const map={getContainer:()=>({dataset}),fitBounds:(points,options)=>fits.push({points,options}),setView(){},stop(){}};
  const entry=()=>({addTo(){return this},remove(){},setLatLng(){}});
  const h=componentHarness('components/north-island-planning-layer.tsx','default',{map},{runEffects:true,window:{matchMedia:()=>({matches:reduced,addEventListener(){},removeEventListener(){}})},mocks:{leaflet:{marker:entry,polyline:entry,divIcon:x=>x},'./trip-planner/trip-map-context':{useTripMap:()=>trip},'@/components/trip-planner/trip-map-context':{useTripMap:()=>trip},'./map-layer-context':{useMapLayers:()=>layer},'@/components/map-layer-context':{useMapLayers:()=>layer}}});
  h.render();assert.equal(frames,expected);assert.equal(fits.length,1);assert.equal(fits[0].options.animate,false);assert.deepEqual(fits[0].points,[[from.latitude,from.longitude],[to.latitude,to.longitude]]);assert.equal(dataset.journeyAnimation,expected?'on':'off');
 } finally {global.document=oldDocument;global.requestAnimationFrame=oldRaf;global.cancelAnimationFrame=oldCancel}
});
