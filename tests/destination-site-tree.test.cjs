const {test}=require('node:test')
const assert=require('node:assert/strict')
const load=require('./helpers/load-ts.cjs')()
const {componentHarness,nodes,find}=require('./helpers/component-harness.cjs')
const {destinationSiteTree:tree}=load('lib/destination-site-tree.ts')
const flatten=n=>[n,...(n.children??[]).flatMap(flatten)]

test('the public site hierarchy is World, countries, then their reviewed regions and islands',()=>{
 const {destinationRegions}=load('content/destination-regions.ts')
 assert.equal(tree.id,'world');assert.equal(tree.href,'/')
 assert.deepEqual(tree.children.slice(0,3).map(n=>n.id),['colombia','australia','new-zealand'])
 for(const country of tree.children.slice(0,3)){
  const regions=destinationRegions[country.id]
  for(const region of regions)assert.ok(country.children.some(n=>n.href===region.href&&n.label===region.name),`${country.id}/${region.id}`)
 }
 assert.equal(tree.children.find(n=>n.id==='australia').children.filter(n=>n.id.startsWith('australia:')).length,9)
 assert.equal(tree.children.find(n=>n.id==='colombia').children.filter(n=>n.id.startsWith('colombia:')).length,11)
 assert.equal(tree.children.find(n=>n.id==='new-zealand').children.filter(n=>n.id.startsWith('new-zealand:')).length,3)
})
test('every canonical public navigation URL is retained exactly once and no private route is introduced',()=>{
 const links=flatten(tree).flatMap(n=>n.href?[n.href]:[]),actual=new Set(links)
 assert.equal(actual.size,links.length,'no duplicated directories or country overview links')
 const {publicNavigationPaths}=load('lib/public-navigation.ts')
 for(const path of publicNavigationPaths)assert.ok(actual.has(path),path)
 assert.ok(links.every(path=>!/^\/(account|admin|api|auth)(\/|$)/.test(path)))
 assert.ok(actual.has('/new-zealand/north-island'),'the published North Island guide uses its canonical route')
})
test('native branch controls expand/collapse only the directory and keep links available',()=>{
 const h=componentHarness('components/destination-site-tree.tsx','default',{tree,initialCountry:'australia'})
 const rendered=h.render(),nav=find(rendered,n=>n.type==='nav')
 const details=nodes(rendered).filter(n=>n.type==='details')
 assert.equal(details.find(n=>n.props['data-site-tree-branch']==='world').props.open,true)
 assert.equal(details.find(n=>n.props['data-site-tree-branch']==='australia').props.open,true)
 assert.equal(details.find(n=>n.props['data-site-tree-branch']==='colombia').props.open,false)
 const elements=details.map(n=>({open:Boolean(n.props.open)}))
 nav.props.ref.current={querySelectorAll:()=>elements}
 find(rendered,n=>n.type==='button'&&n.props.children==='Expand all').props.onClick()
 assert.ok(elements.every(n=>n.open))
 find(rendered,n=>n.type==='button'&&n.props.children==='Collapse all').props.onClick()
 assert.ok(elements.every(n=>!n.open))
 assert.ok(nodes(rendered).some(n=>n.type==='Link'&&n.props.href==='/australia/regions/new-south-wales'&&n.props.prefetch===false))
})

test('country ownership survives editorial group renames and South Island tools are directly discoverable',()=>{
 const {publicNavigationGroups}=load('lib/public-navigation.ts')
 const groups=publicNavigationGroups.map(group=>({...group,id:group.country==='new-zealand'?'travel-tools':group.id}))
 const next=load('lib/destination-site-tree.ts').buildDestinationSiteTree(groups)
 const nz=next.children.find(n=>n.id==='new-zealand')
 const south=nz.children.find(n=>n.href==='/new-zealand/south-island')
 assert.ok(south.children.some(n=>n.href==='/new-zealand/south-island#trip-planner'))
 assert.ok(south.children.some(n=>n.href==='/new-zealand/south-island#south-island-bird-map'))
 assert.ok(!next.children.find(n=>n.id==='colombia').children.some(n=>n.id==='travel-tools'))
 for(const group of groups)assert.ok([null,'colombia','australia','new-zealand'].includes(group.country))
})
