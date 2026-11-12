const {test}=require('node:test'),assert=require('node:assert/strict');
const {componentHarness,find}=require('./helpers/component-harness.cjs');
const initial=require('./helpers/load-ts.cjs')()('components/map-layer-context.tsx').initialMapLayers;
test('direct globe toggle changes only the background and retains all selected overlay state',()=>{
 let layers={...initial,protectedAreas:true,park:'a-reviewed-park',point:'planning-base-auckland',protectedAreaSelections:{parks:'a-region'}},patches=[];
 const h=componentHarness('components/map-background-toggle.tsx','default',{}, {mocks:{'./map-layer-context':{useMapLayers:()=>({layers,update:patch=>{patches.push(patch);layers={...layers,...patch}}})}}});
 let tree=h.render();assert.equal(tree.props['aria-label'],'Satellite map');assert.equal(tree.props['aria-pressed'],false);
 tree.props.onClick();tree=h.render();assert.equal(tree.props['aria-pressed'],true);assert.equal(layers.point,'planning-base-auckland');assert.equal(layers.park,'a-reviewed-park');assert.deepEqual(layers.protectedAreaSelections,{parks:'a-region'});
 tree.props.onClick();assert.deepEqual(patches,[{background:'satellite'},{background:'habitats'}]);assert.equal(layers.protectedAreas,true);
});
test('country and South Island adapters both expose the same direct toggle outside the closed layer dialog',()=>{
 for(const [file,name,props] of [['components/country-satellite-layer.tsx','CountrySatelliteControl',{country:'colombia'}],['components/south-island-map-layers.tsx','default',{}]]){
  const h=componentHarness(file,name,props,{mocks:{'./map-layer-context':{initialMapLayers:initial,useMapLayers:()=>({layers:initial,update(){}})}}});
  const tree=h.render();assert.ok(find(tree,n=>typeof n.type==='function'&&n.type.name==='MapBackgroundToggle'));assert.equal(find(tree,n=>n.props['aria-label']==='Map layers').props['aria-expanded'],false);
 }
});
