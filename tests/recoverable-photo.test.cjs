const {test}=require('node:test')
const assert=require('node:assert/strict')
const {componentHarness,nodes,find}=require('./helpers/component-harness.cjs')

test('photo failure exposes an accessible retry and retains the original source, alt and caller error handling',()=>{
  let notified=0, stopped=false
  const props={src:'/images/reviewed-place.jpg',alt:'The reviewed coastal landscape',fill:true,sizes:'100vw',onError(){notified++}}
  const h=componentHarness('components/recoverable-photo.tsx','default',props,{mocks:{'./responsive-photo':{__esModule:true,default:'Image'}}})
  find(h.render(),n=>n.type==='Image').props.onError({})
  let tree=h.render()
  assert.equal(notified,1)
  assert.equal(nodes(tree).some(n=>n.type==='Image'),false)
  assert.match(JSON.stringify(tree),/The reviewed coastal landscape/)
  find(tree,n=>n.type==='button').props.onClick({stopPropagation(){stopped=true}})
  tree=h.render()
  const retried=find(tree,n=>n.type==='Image')
  assert.equal(stopped,true)
  assert.equal(retried.props.src,props.src)
  assert.equal(retried.props.alt,props.alt)
  assert.equal(retried.props.sizes,props.sizes)
  assert.equal(nodes(tree).some(n=>n.type==='button'),false)
})
