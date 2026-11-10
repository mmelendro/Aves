const {test}=require('node:test')
const assert=require('node:assert/strict')
const {componentHarness,nodes,find}=require('./helpers/component-harness.cjs')
test('registered bird preview opens the existing carousel and invokes its close restoration',()=>{
 const previousDocument=global.document
 global.document={body:{style:{overflow:''}}}
 try{
  let open,restored=0,modals=0
  const guide={registerBirds:callback=>{open=callback;return()=>{}}}
  const media={type:'Carousel',props:{slide:4}}
  const h=componentHarness('components/expandable-media.tsx','default',{children:media,label:'South Island birds'},{runEffects:true,context:()=>guide,mocks:{'./guide-map-thumbnail':{__esModule:true,default:'MapThumbnail'},'./field-guide-context':{FieldGuideContext:'Guide'},'./expandable-media.module.css':{__esModule:true,default:{}}}})
  let tree=h.render()
  tree.props.ref.current={close(){},show(){},showModal(){modals++}}
  open(()=>restored++);tree=h.render()
  assert.equal(modals,1);assert.equal(tree.props['data-expanded'],true)
  assert.ok(nodes(tree).includes(media));assert.equal(media.props.slide,4)
  tree.props.onCancel({preventDefault(){}});tree=h.render()
  assert.equal(tree.props['data-expanded'],undefined);assert.equal(restored,1)
 }finally{global.document=previousDocument}
})
test('place viewers do not replace the registered bird preview',()=>{
 let registered=0
 const h=componentHarness('components/expandable-media.tsx','default',{children:'places',label:'Landscapes',kind:'place'},{runEffects:true,context:()=>({registerBirds:()=>registered++}),mocks:{'./guide-map-thumbnail':{__esModule:true,default:'MapThumbnail'},'./field-guide-context':{FieldGuideContext:'Guide'},'./expandable-media.module.css':{__esModule:true,default:{}}}})
 h.render();assert.equal(registered,0)
})
