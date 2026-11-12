const {test}=require('node:test')
const assert=require('node:assert/strict')
const {componentHarness,nodes,find}=require('./helpers/component-harness.cjs')
const props={creator:'Test Photographer',sourceUrl:'https://example.org/photo',licence:'CC BY 4.0',licenceUrl:'https://creativecommons.org/licenses/by/4.0/',modifications:'Resized.'}
test('compact credits keep source and licence in a local disclosure and open references separately',()=>{
 const tree=componentHarness('components/photo-credit.tsx','default',props).render()
 assert.ok(find(tree,n=>n.type==='summary').props['aria-label'].includes(props.creator))
 for(const link of nodes(tree).filter(n=>n.type==='a')) assert.equal(link.props.target,'_blank')
 assert.ok(nodes(tree).some(n=>n.type==='a'&&n.props.href===props.licenceUrl))
})
test('Escape and close return focus without scrolling or navigating the gallery',()=>{
 const tree=componentHarness('components/photo-credit.tsx','default',props).render()
 const details=find(tree,n=>n.type==='details'),summary=find(tree,n=>n.type==='summary')
 const focus=[];details.props.ref.current={open:true};summary.props.ref.current={focus:options=>focus.push(options)}
 let prevented=false,stopped=false
 details.props.onKeyDown({key:'Escape',preventDefault(){prevented=true},stopPropagation(){stopped=true}})
 assert.equal(details.props.ref.current.open,false);assert.ok(prevented&&stopped);assert.deepEqual(focus,[{preventScroll:true}])
 details.props.ref.current.open=true
 find(tree,n=>n.props['aria-label']==='Close photo credits').props.onClick()
 assert.equal(details.props.ref.current.open,false)
})
test('opening credits notifies the gallery so automatic slides can pause',()=>{
 let opened=0
 const tree=componentHarness('components/photo-credit.tsx','default',{...props,onOpen:()=>opened++}).render()
 const details=find(tree,n=>n.type==='details')
 details.props.onToggle({currentTarget:{open:false}})
 assert.equal(opened,0)
 details.props.onToggle({currentTarget:{open:true}})
 assert.equal(opened,1)
})
