const {test}=require('node:test')
const assert=require('node:assert/strict')
const {readFileSync}=require('node:fs')
const React=require('react')
const ts=require('typescript')

async function harness() {
  const gestures=await import('../lib/map-gestures.mjs')
  const states=[], refs=[]
  let si=0,ri=0
  const hooks={...React,useEffect(){},useRef(value){const i=ri++;return refs[i]??={current:value}},useState(value){const i=si++;if(!(i in states))states[i]=value;return [states[i],next=>{states[i]=typeof next==='function'?next(states[i]):next}]}}
  const exports={}
  const code=ts.transpileModule(readFileSync('components/map-viewer.tsx','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText
  new Function('require','exports','requestAnimationFrame','cancelAnimationFrame','document',code)(name=>name==='react'?hooks:name==='@/lib/map-gestures.mjs'?gestures:name.endsWith('.css')?{default:{}}:require(name),exports,fn=>{fn();return 1},()=>{},{dispatchEvent(){}})
  const capture=new Set()
  const surface={clientWidth:400,clientHeight:300,getBoundingClientRect:()=>({left:0,top:0}),hasPointerCapture:id=>capture.has(id),setPointerCapture:id=>capture.add(id),releasePointerCapture:id=>capture.delete(id)}
  function render(){si=0;ri=0;const tree=exports.MapViewer({label:'Test map',children:React.createElement('a',{href:'/guide'},'Guide')});refs[1].current=surface;return tree}
  function nodes(tree){if(!tree||typeof tree!=='object')return [];if(Array.isArray(tree))return tree.flatMap(nodes);return [tree,...nodes(tree.props?.children)]}
  const find=(tree,label)=>nodes(tree).find(n=>n.props?.['aria-label']===label)
  const event=(pointerId,x,y)=>({pointerId,pointerType:'touch',clientX:x,clientY:y,currentTarget:surface,preventDefault(){this.prevented=true},stopPropagation(){this.stopped=true}})
  return {render,find,event,refs}
}

test('inline map leaves native page gestures alone until Move is enabled',async()=>{
 const h=await harness();let tree=h.render();let surface=h.find(tree,'Test map gesture surface')
 assert.equal(surface.props.style.touchAction,'pan-y pinch-zoom')
 const e=h.event(1,100,150);surface.props.onPointerDown(e);surface.props.onPointerMove(h.event(1,200,150));tree=h.render()
 assert.equal(h.find(tree,'Zoom Test map out').props.disabled,true)
 h.find(tree,'Use touch gestures on Test map').props.onClick();tree=h.render()
 assert.equal(h.find(tree,'Test map gesture surface').props.style.touchAction,'none')
})

test('two-finger pinch changes zoom and suppresses guide activation while a simple tap stays usable',async()=>{
 const h=await harness();let tree=h.render();h.find(tree,'Use touch gestures on Test map').props.onClick();tree=h.render()
 const surface=h.find(tree,'Test map gesture surface')
 surface.props.onPointerDown(h.event(1,100,150));surface.props.onPointerDown(h.event(2,300,150))
 surface.props.onPointerMove(h.event(1,0,150));surface.props.onPointerMove(h.event(2,400,150))
 surface.props.onPointerUp(h.event(1,0,150));surface.props.onPointerUp(h.event(2,400,150))
 tree=h.render();assert.equal(h.find(tree,'Zoom Test map out').props.disabled,false)
 const click=h.event(0,0,0);surface.props.onClickCapture(click);assert.equal(click.prevented,true);assert.equal(click.stopped,true)
 surface.props.onPointerDown(h.event(3,200,150));surface.props.onPointerUp(h.event(3,200,150))
 const tap=h.event(0,0,0);surface.props.onClickCapture(tap);assert.equal(tap.prevented,undefined)
})

test('enlargement preserves the mounted guide and Escape restores the trigger',async()=>{
 const h=await harness();let tree=h.render();const originalChild=tree.props.children[2].props.children.props.children
 let opened=false,focused=false
 h.refs[0].current={toggleAttribute(){},close(){},showModal(){opened=true},show(){opened=false}}
 h.refs[2].current={focus(){focused=true}}
 h.find(tree,'Enlarge Test map').props.onClick();tree=h.render()
 assert.equal(opened,true);assert.equal(tree.props['aria-modal'],true)
 assert.equal(tree.props.children[2].props.children.props.children.props.href,originalChild.props.href)
 const event={preventDefault(){this.prevented=true}};tree.props.onCancel(event);tree=h.render()
 assert.equal(event.prevented,true);assert.equal(opened,false);assert.equal(focused,true);assert.equal(tree.props['aria-modal'],undefined)
})
