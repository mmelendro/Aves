const {test}=require('node:test')
const assert=require('node:assert/strict')
const {componentHarness,nodes,find}=require('./helpers/component-harness.cjs')
const initial={background:'habitats',overlayOpacity:.45,nationalParks:false,conservation:false,park:'',nature:false,projects:false,heritage:false,towns:false,businesses:false,point:''}
test('mobile map options stay collapsed until requested and selections retain the open layer panel',()=>{
 let layers={...initial}
 const h=componentHarness('components/south-island-map-layers.tsx','default',{}, {mocks:{'./map-layer-context':{initialMapLayers:initial,useMapLayers:()=>({layers,update:next=>{layers={...layers,...next}}})}}})
 let tree=h.render()
 assert.equal(nodes(tree).filter(n=>n.type==='input').length,0)
 find(tree,n=>n.props['aria-label']==='Map layers').props.onClick();tree=h.render()
 assert.equal(nodes(tree).filter(n=>n.type==='input'&&n.props.type==='radio').length,4)
 find(tree,n=>n.props['aria-label']==='Satellite').props.onChange();tree=h.render()
 assert.equal(layers.background,'satellite')
 assert.equal(nodes(tree).filter(n=>n.props['aria-label']==='South Island layer choices').length,1)
 assert.ok(nodes(tree).some(n=>n.props.type==='range'),'satellite opacity remains available inside options')
})
test('the shared viewer owns regional controls and long details start collapsed',()=>{
 const h=componentHarness('components/south-island-ecosystem-map.tsx','default',{selected:'all',onSelect(){}},{mocks:{'next/dynamic':()=> 'ConservationOverlay','./south-island-soundscapes':{__esModule:true,default:'Sounds'},'./map-viewer':{MapViewer:'MapViewer'},'./south-island-map-layers':{__esModule:true,default:'Layers'},'./south-island-public-place-overlay':{__esModule:true,default:'Places',PublicPlaceDetails:'PlaceDetails'},'./map-layer-context':{useMapLayers:()=>({layers:initial})},'./south-island-ecosystem-map.module.css':{__esModule:true,default:{}}}})
 const tree=h.render(),all=nodes(tree)
 const svg=find(tree,n=>n.type==='svg'&&n.props.onPointerDown);assert.equal(svg.props.style.touchAction,'none');let prevented=false;svg.props.onClickCapture({preventDefault(){prevented=true},stopPropagation(){}});assert.equal(prevented,false,'single taps still select habitats');
 const viewer=find(tree,n=>n.type==='MapViewer')
 assert.equal(all.filter(n=>n.type==='MapViewer').length,1)
 assert.ok(nodes(viewer.props.layerControl).some(n=>n.props['aria-label']==='Zoom ecosystem map in'))
 assert.equal(nodes(find(tree,n=>n.type==='figure')).filter(n=>n.type==='Layers').length,0)
 const details=find(tree,n=>n.type==='details'&&nodes(n).some(child=>child.type==='summary'&&child.props.children==='Places, habitats & map details'))
 assert.equal(details.props.open,undefined)
})
