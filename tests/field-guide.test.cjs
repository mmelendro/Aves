const {test}=require('node:test')
const assert=require('node:assert/strict')
const {readFileSync}=require('node:fs')
const {componentHarness,nodes,find}=require('./helpers/component-harness.cjs')
const css=readFileSync('components/resizable-discovery-pair.module.css','utf8')
function guide(){const media={type:'Bird photographs',props:{}},map={type:'Map',props:{}};return {media,map,h:componentHarness('components/resizable-discovery-pair.tsx','default',{map,media,mapLabel:'Map and birds',mapCue:{label:'South Island',image:'/images/map-cues/new-zealand.svg',viewBox:'0 0 560 640'},birdCue:{commonName:'Kea',image:'/images/kea.jpg'}},{mocks:{'./field-guide-context':{FieldGuideContext:{Provider:'FieldGuideProvider'}},'@/components/colombia-home-language':{useColombiaHomeCopy:()=>x=>x},'./resizable-discovery-pair.module.css':{__esModule:true,default:{}}}})}}
const button=(tree,text)=>find(tree,n=>n.type==='button'&&nodes(n).some(x=>x.props.children===text||Array.isArray(x.props.children)&&x.props.children.includes(text)))
test('turning the field guide keeps both media instances mounted and only the visible face interactive',()=>{
 const {h,media,map}=guide();let tree=h.render()
 assert.ok(nodes(tree).includes(media));assert.ok(nodes(tree).includes(map))
 let panels=nodes(tree).filter(n=>n.props.inert!==undefined)
 assert.deepEqual(panels.map(n=>n.props.inert),[false,true])
 button(tree,'Turn to the map').props.onClick();tree=h.render()
 assert.ok(nodes(tree).includes(media));assert.ok(nodes(tree).includes(map))
 panels=nodes(tree).filter(n=>n.props.inert!==undefined)
 assert.deepEqual(panels.map(n=>n.props.inert),[true,false])
 find(tree,n=>n.props['aria-label']==='View Kea in the bird guide').props.onClick()
 assert.deepEqual(nodes(h.render()).filter(n=>n.props.inert!==undefined).map(n=>n.props.inert),[false,true])
})
test('a deliberate comparison mode retains the existing split controls and both interactive panels',()=>{
 const {h}=guide();button(h.render(),'Show map & birds together').props.onClick()
 const tree=h.render();assert.equal(find(tree,n=>n.props['data-layout']).props['data-layout'],'paired')
 assert.deepEqual(nodes(tree).filter(n=>n.props.inert!==undefined).map(n=>n.props.inert),[false,false])
 button(tree,'Return to the guide').props.onClick();assert.equal(find(h.render(),n=>n.props['data-layout']).props['data-layout'],'guide')
})
test('3D has reduced-motion support and the guide never captures swipe or page-scroll gestures',()=>{
 assert.match(css,/perspective:1500px/);assert.match(css,/prefers-reduced-motion:reduce/)
 const src=readFileSync('components/resizable-discovery-pair.tsx','utf8')
 assert.doesNotMatch(src,/onTouchStart|onWheel/)
 assert.match(src,/aria-hidden=\{layout === "guide"/)
})
test('existing map-fragment links reveal the map without cancelling native navigation',()=>{
 const previousDocument=global.document,previousElement=global.Element
 const listeners={},place={},outside={}
 class LinkElement {constructor(hash){this.hash=hash}closest(){return this}getAttribute(){return this.hash}}
 global.Element=LinkElement
 global.document={getElementById:id=>id==='test-id-map'?{contains:target=>target===place}:id==='map-place'?place:outside,addEventListener:(name,fn)=>{listeners[name]=fn},removeEventListener(){}}
 const win={location:{hash:''},addEventListener:(name,fn)=>{listeners[name]=fn},removeEventListener(){}}
 try{
  const h=componentHarness('components/resizable-discovery-pair.tsx','default',{map:'map',media:'birds',mapLabel:'Map and birds'},{runEffects:true,window:win,mocks:{'./field-guide-context':{FieldGuideContext:{Provider:'FieldGuideProvider'}},'@/components/colombia-home-language':{useColombiaHomeCopy:()=>x=>x},'./resizable-discovery-pair.module.css':{__esModule:true,default:{}}}})
  h.render();listeners.click({button:0,target:new LinkElement('#outside')})
  assert.equal(find(h.render(),n=>n.props['data-face']).props['data-face'],'birds')
  const event={button:0,target:new LinkElement('#map-place')};listeners.click(event)
  assert.equal(find(h.render(),n=>n.props['data-face']).props['data-face'],'map')
  assert.equal(event.defaultPrevented,undefined)
 }finally{global.document=previousDocument;global.Element=previousElement}
})
test('map-first entry and later turns put the map before its bird cue and reveal the fitted frame',()=>{
 const previousDocument=global.document
 global.document={getElementById:()=>null,addEventListener(){},removeEventListener(){}}
 try {
  const map={type:'Map',props:{camera:'preserved'}}
  const h=componentHarness('components/resizable-discovery-pair.tsx','default',{map,media:'birds',initialFace:'map',mapLabel:'Map and birds',birdCue:{commonName:'Kea',image:'/kea.jpg'}},{runEffects:true,window:{location:{hash:''},addEventListener(){},removeEventListener(){}},mocks:{'./field-guide-context':{FieldGuideContext:{Provider:'FieldGuideProvider'}},'@/components/colombia-home-language':{useColombiaHomeCopy:()=>x=>x},'./resizable-discovery-pair.module.css':{__esModule:true,default:{}}}})
  let tree=h.render()
  assert.equal(find(tree,n=>n.props['data-face']).props['data-face'],'map')
  const all=nodes(tree)
  assert.ok(all.indexOf(map)<all.indexOf(find(tree,n=>n.props['aria-label']==='View Kea in the bird guide')))
  const panel=find(tree,n=>n.props.id==='test-id-map')
  const scroll={scrollTop:120};panel.props.ref.current=scroll
  const reveals=[];find(tree,n=>n.props['data-face']).props.ref.current={scrollIntoView:options=>reveals.push(options)}
  button(tree,'Turn to the birds').props.onClick();tree=h.render()
  button(tree,'Turn to the map').props.onClick();tree=h.render()
  assert.equal(scroll.scrollTop,0);assert.equal(reveals.at(-1).block,'start')
  assert.ok(nodes(tree).includes(map));assert.equal(map.props.camera,'preserved')
 } finally {global.document=previousDocument}
})

test('the bird face has a reciprocal map thumbnail that turns the same mounted card',()=>{
 const {h,map,media}=guide();let tree=h.render()
 const cue=find(tree,n=>n.props['aria-label']==='View South Island on the map')
 assert.ok(nodes(cue).some(n=>n.type==='img'&&n.props.src==='/images/map-cues/new-zealand.svg'))
 cue.props.onClick();tree=h.render()
 assert.equal(find(tree,n=>n.props['data-face']).props['data-face'],'map')
 assert.ok(nodes(tree).includes(map));assert.ok(nodes(tree).includes(media))
 find(tree,n=>n.props['aria-label']==='View Kea in the bird guide').props.onClick()
 assert.equal(find(h.render(),n=>n.props['data-face']).props['data-face'],'birds')
})
