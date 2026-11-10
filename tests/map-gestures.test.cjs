const { test } = require('node:test')
const assert = require('node:assert/strict')

test('pinch preserves the map coordinate under a stationary midpoint', async () => {
  const { mapGestureView }=await import('../lib/map-gestures.mjs')
  const start={x:0,y:0,zoom:1},box={width:400,height:300}
  const view=mapGestureView(start,[{x:100,y:150},{x:300,y:150}],[{x:0,y:150},{x:400,y:150}],box)
  assert.equal(view.zoom,2)
  assert.equal((200-view.x)/view.zoom,200)
  assert.equal((150-view.y)/view.zoom,150)
})
test('pinch can zoom and pan together, clamps at edges, and survives zero-distance contacts', async () => {
  const {mapGestureView,zoomMapAt}=await import('../lib/map-gestures.mjs')
  const box={width:400,height:300},start={x:-200,y:-150,zoom:2}
  const next=mapGestureView(start,[{x:100,y:100},{x:200,y:100}],[{x:110,y:120},{x:310,y:120}],box)
  assert.equal(next.zoom,4)
  assert.equal(next.x,-490)
  assert.equal(next.y,-380)
  assert.deepEqual(mapGestureView(start,[{x:10,y:10}],[{x:2000,y:2000}],box),{x:0,y:0,zoom:2})
  const zero=mapGestureView(start,[{x:10,y:10},{x:10,y:10}],[{x:20,y:10},{x:30,y:10}],box)
  assert.ok(Object.values(zero).every(Number.isFinite))
  const reset=zoomMapAt(next,.01,{x:200,y:150},box)
  assert.deepEqual(reset,{zoom:1,x:0,y:0})
})
