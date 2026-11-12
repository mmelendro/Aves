const {test}=require('node:test'),assert=require('node:assert/strict')
const {componentHarness,find,nodes}=require('./helpers/component-harness.cjs')
const load=require('./helpers/load-ts.cjs')()
test('all national inventories are included in public XML and visible directories',()=>{
 const {publicNavigationPaths,publicNavigationGroups}=load('lib/public-navigation.ts')
 for(const country of ['colombia','australia','new-zealand']){
  const href='/species/reference?country='+country
  assert.ok(publicNavigationPaths.includes(href))
  assert.ok(publicNavigationGroups.some(g=>g.pages.some(p=>p.href===href)))
 }
})
test('thumbnail failure leaves a usable guide and truthful fallback',()=>{
 const h=componentHarness('components/inventory-bird-image.tsx','default',{src:'/image.jpg',name:'Test bird'})
 find(h.render(),n=>n.type==='Image').props.onError()
 assert.ok(find(h.render(),n=>n.type==='span'&&n.props.children==='Image unavailable'))
})
test('generic page recovery retries without exposing raw errors or implying save success',()=>{
 let retries=0
 const h=componentHarness('app/error.tsx','default',{error:new Error('PRIVATE_TEST_VALUE'),reset:()=>retries++})
 const tree=h.render()
 assert.equal(find(tree,n=>n.type==='main').props.id,'main-content')
 assert.ok(!JSON.stringify(tree).includes('PRIVATE_TEST_VALUE'))
 find(tree,n=>n.type==='button').props.onClick();assert.equal(retries,1)
 assert.ok(nodes(tree).some(n=>n.type==='a'&&n.props.href==='/account'))
})
test('search progress preserves native form submission and recovers after browser Back',()=>{
 let restored
 const h=componentHarness('components/inventory-search-submit.tsx','default',{}, {runEffects:true,window:{addEventListener:(event,handler)=>{assert.equal(event,'pageshow');restored=handler},removeEventListener(){}}})
 let tree=h.render();assert.equal(tree.props.type,'submit');assert.equal(tree.props.disabled,undefined)
 tree.props.onClick();tree=h.render();assert.equal(tree.props['aria-busy'],true)
 restored();assert.equal(h.render().props['aria-busy'],false)
})
