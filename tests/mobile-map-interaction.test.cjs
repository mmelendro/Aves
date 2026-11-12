const {test}=require('node:test'),assert=require('node:assert/strict');
const {componentHarness,find}=require('./helpers/component-harness.cjs');
test('shared maps accept dragging, pinch and double tap without an activation button',()=>{
 const oldRaf=global.requestAnimationFrame,oldCancel=global.cancelAnimationFrame;
 global.requestAnimationFrame=fn=>{fn();return 1};global.cancelAnimationFrame=()=>{};
 try {
  const h=componentHarness('components/map-viewer.tsx','MapViewer',{children:'map',label:'World map'},{mocks:{'next/dynamic':()=> 'SatelliteMap','./map-layer-context':{useMapLayers:()=>({layers:{background:'habitats'}})},'./field-guide-context':{FieldGuideContext:'Guide'},'./bird-filter-controls':{__esModule:true,default:'Filters'}}});
  let tree=h.render(),surface=find(tree,n=>n.props['data-map-surface']);
  const target={clientWidth:400,clientHeight:300,getBoundingClientRect:()=>({left:0,top:0,width:400,height:300}),hasPointerCapture:()=>false,setPointerCapture(){},releasePointerCapture(){}};
  surface.props.ref.current=target;
  assert.equal(surface.props.style.touchAction,'none');
  const e=(x,y,at)=>({clientX:x,clientY:y,pointerId:1,pointerType:'touch',button:0,timeStamp:at,currentTarget:target,preventDefault(){}});
  surface.props.onPointerDown(e(100,100,0));surface.props.onPointerMove(e(150,120,60));surface.props.onPointerUp(e(150,120,80));tree=h.render();
  assert.equal(find(tree,n=>n.props.style?.transform?.includes('translate')).props.style.transform,'translate(50px,20px) scale(1)');
  surface=find(tree,n=>n.props['data-map-surface']);
  surface.props.onPointerDown(e(100,100,1000));surface.props.onPointerDown({...e(200,100,1010),pointerId:2});
  surface.props.onPointerMove(e(50,100,1060));surface.props.onPointerMove({...e(250,100,1060),pointerId:2});
  surface.props.onPointerUp(e(50,100,1100));surface.props.onPointerUp({...e(250,100,1100),pointerId:2});tree=h.render();
  assert.match(find(tree,n=>n.props.style?.transform?.includes('translate')).props.style.transform,/scale\(2\)/);
  surface=find(tree,n=>n.props['data-map-surface']);
  for(const at of [2000,2250]){surface.props.onPointerDown(e(200,150,at));surface.props.onPointerUp(e(200,150,at+30));}
  tree=h.render();assert.match(find(tree,n=>n.props.style?.transform?.includes('translate')).props.style.transform,/scale\(3\)/);

 } finally {global.requestAnimationFrame=oldRaf;global.cancelAnimationFrame=oldCancel}
});
test('double taps zoom within the map while a single tap remains available for selection',async()=>{
 const {isMapDoubleTap,mapGestureView}=await import('../lib/map-gestures.mjs');
 const first={x:120,y:200,at:1000};assert.equal(isMapDoubleTap(null,first),false);assert.equal(isMapDoubleTap(first,{x:125,y:205,at:1250}),true);
 assert.equal(isMapDoubleTap(first,{x:120,y:200,at:1800}),false);assert.equal(isMapDoubleTap(first,{x:200,y:200,at:1200}),false);
 const view=mapGestureView({x:0,y:0,zoom:1},[{x:100,y:100}],[{x:150,y:120}],{width:400,height:300},.35);assert.deepEqual(view,{x:50,y:20,zoom:1});
});
