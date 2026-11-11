const {test}=require('node:test');
const assert=require('node:assert/strict');
const {componentHarness,nodes,find}=require('./helpers/component-harness.cjs');
const initial=require('./helpers/load-ts.cjs')()('components/map-layer-context.tsx').initialMapLayers;
const button=tree=>find(tree,n=>n.props['aria-label']==='Map layers');
test('shared country picker offers only available overlays and changing the background preserves display choices',()=>{
 let layers={...initial,protectedAreas:true,protectedAreaSelections:{"/data/australia-national-parks-pilot.geojson":"NSW_N0030"}};
 const h=componentHarness('components/country-satellite-layer.tsx','CountrySatelliteControl',{country:'australia'},{mocks:{'./map-layer-context':{useMapLayers:()=>({layers,update:next=>{layers={...layers,...next}}})}}});
 let tree=h.render();assert.equal(nodes(tree).filter(n=>n.type==='input').length,0);button(tree).props.onClick();tree=h.render();
 assert.equal(nodes(tree).filter(n=>n.props.type==='radio').length,2);assert.equal(nodes(tree).filter(n=>n.props.type==='checkbox').length,0);
 find(tree,n=>n.props['aria-label']==='Satellite').props.onChange();tree=h.render();
 assert.equal(layers.background,'satellite');assert.equal(layers.protectedAreas,true);assert.equal(layers.planningRegions,true);assert.equal(layers.protectedAreaSelections['/data/australia-national-parks-pilot.geojson'],'NSW_N0030');assert.equal(button(tree).props['aria-expanded'],false);
 button(tree).props.onClick();tree=h.render();assert.equal(nodes(tree).filter(n=>n.props.type==='checkbox').length,2);
 const world=componentHarness('components/country-satellite-layer.tsx','CountrySatelliteControl',{country:''},{mocks:{'./map-layer-context':{useMapLayers:()=>({layers,update(){}})}}});
 let w=world.render();button(w).props.onClick();w=world.render();assert.equal(nodes(w).filter(n=>n.props.type==='checkbox').length,0,'world must not advertise unsupported reserve coverage');
});
test('Escape cancellation closes only the layer dialog and returns focus to its own control',()=>{
 const h=componentHarness('components/country-satellite-layer.tsx','CountrySatelliteControl',{country:'colombia'},{mocks:{'./map-layer-context':{useMapLayers:()=>({layers:initial,update(){}})}}});
 let tree=h.render();button(tree).props.onClick();tree=h.render();
 let cancelled=0,stopped=0,closed=0,focused=0;
 const dialog=find(tree,n=>n.type==='dialog');dialog.props.ref.current={close(){closed++;}};button(tree).props.ref.current={focus(){focused++;}};
 dialog.props.onCancel({preventDefault(){cancelled++;},stopPropagation(){stopped++;}});tree=h.render();
 assert.equal(cancelled,1);assert.equal(stopped,1,'must not cancel an expanded map underneath');assert.equal(closed,1);assert.equal(focused,1);assert.equal(nodes(tree).some(n=>n.type==='dialog'),false);
});
