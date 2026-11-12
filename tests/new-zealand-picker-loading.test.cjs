const {test}=require('node:test')
const assert=require('node:assert/strict')
const {componentHarness,nodes,find}=require('./helpers/component-harness.cjs')
const catalogue=require('../content/new-zealand-checklist.json').species.filter(b=>!b.extinct)
const tick=()=>new Promise(resolve=>setImmediate(resolve))
function setup(module){
 const props={selected:[catalogue[0].id],onChange:ids=>{props.selected=ids}}
 const harness=componentHarness('components/new-zealand-bird-picker.tsx','default',props,{mocks:{'./new-zealand-bird-search':module}})
 return {props,harness}
}
function details(tree){return find(tree,n=>n.type==='details')}

test('closed picker does not load search; selection updates survive opening, closing and reopening',async()=>{
 let loaded=0
 function Search(){}
 const module={__esModule:true,get default(){loaded++;return Search}}
 const {props,harness}=setup(module)
 let tree=harness.render()
 assert.equal(loaded,0)
 assert.equal(nodes(tree).filter(n=>n.type===Search).length,0)
 details(tree).props.onToggle({currentTarget:{open:true}})
 // A choice removed during loading must not be replaced by a stale snapshot.
 find(tree,n=>n.type==='button'&&n.props['aria-label']?.startsWith('Remove ')).props.onClick()
 assert.deepEqual(props.selected,[])
 await tick()
 tree=harness.render()
 let search=find(tree,n=>n.type===Search)
 assert.equal(loaded,1);assert.deepEqual(search.props.selected,[])
 search.props.onChange([catalogue[1].id])
 tree=harness.render();details(tree).props.onToggle({currentTarget:{open:false}})
 tree=harness.render()
 assert.ok(nodes(tree).some(n=>n.type==='div'&&n.props.hidden===true))
 assert.deepEqual(find(tree,n=>n.type===Search).props.selected,[catalogue[1].id])
 details(tree).props.onToggle({currentTarget:{open:true}})
 await tick();tree=harness.render()
 assert.equal(loaded,1)
 assert.deepEqual(find(tree,n=>n.type===Search).props.selected,[catalogue[1].id])
})
test('failed search load exposes retry and keeps current choices',async()=>{
 let tries=0
 function Search(){}
 const module={__esModule:true,get default(){if(++tries===1)throw new Error('Synthetic chunk load failure');return Search}}
 const {props,harness}=setup(module)
 const selected=[...props.selected]
 details(harness.render()).props.onToggle({currentTarget:{open:true}})
 await tick()
 let tree=harness.render()
 assert.ok(find(tree,n=>n.props.role==='alert'))
 assert.deepEqual(props.selected,selected)
 find(tree,n=>n.type==='button'&&n.props.children==='Try bird search again').props.onClick()
 await tick();tree=harness.render()
 assert.equal(tries,2)
 assert.equal(nodes(tree).filter(n=>n.props.role==='alert').length,0)
 assert.deepEqual(find(tree,n=>n.type===Search).props.selected,selected)
})
