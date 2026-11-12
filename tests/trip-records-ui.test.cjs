const {test}=require('node:test'),assert=require('node:assert/strict');
const {componentHarness,find,nodes}=require('./helpers/component-harness.cjs');
const id='a13b0801-1c6d-41d4-94da-12e3adeebf13',flush=()=>new Promise(resolve=>setImmediate(resolve));
function setup({fail=false,saved=true}={}){let receipt={revision:0,data:{version:1,records:[]}};const calls=[];
 const h=componentHarness('components/account/trip-travel-records.tsx','TripTravelRecords',{planId:id,entries:[],workspaceSaved:saved},{runEffects:true,window:{addEventListener(){},removeEventListener(){}},mocks:{'./account-api':{errorMessage:e=>e.message,accountRequest:async(path,options)=>{calls.push({path,options});if(!options)return receipt;if(fail)throw Error('Conflict: keep your edits');const body=JSON.parse(options.body);return receipt={revision:body.expectedRevision+1,data:body.data}}}}});return {h,calls};}
const button=(tree,label)=>find(tree,n=>n.type==='Button'&&n.props.children===label);
async function add(h){h.render();await flush();let tree=h.render();find(tree,n=>n.type==='input'&&n.props.placeholder==='Airport transfer receipt').props.onChange({target:{value:'Synthetic transfer'}});tree=h.render();find(tree,n=>n.type==='form').props.onSubmit({preventDefault(){}});return h.render();}
test('expense records save explicitly and removed records can be restored with the same identity',async()=>{
 const {h,calls}=setup();let tree=await add(h);button(tree,'Move record to removed items').props.onClick();tree=h.render();find(tree,n=>n.type==='Button'&&n.props['aria-expanded']===false).props.onClick();tree=h.render();button(tree,'Restore travel record').props.onClick();tree=h.render();button(tree,'Save travel records').props.onClick();await flush();tree=h.render();const saved=JSON.parse(calls.at(-1).options.body);assert.equal(saved.data.records[0].title,'Synthetic transfer');assert.equal(saved.data.records[0].status,'estimated');assert.equal(saved.data.records[0].deleted,false);assert.equal(saved.expectedRevision,0);assert.equal(button(tree,'Save travel records').props.disabled,true);
});
test('conflicting record save preserves entered records for retry rather than overwriting them',async()=>{
 const {h}=setup({fail:true});let tree=await add(h);button(tree,'Save travel records').props.onClick();await flush();tree=h.render();assert.ok(nodes(tree).some(n=>n.type==='input'&&n.props.value==='Synthetic transfer'));assert.equal(button(tree,'Save travel records').props.disabled,false);assert.ok(nodes(tree).some(n=>n.props.role==='status'&&n.props.children==='Conflict: keep your edits'));
});
test('records cannot save against an unsaved journal and owner export clearly targets saved data',async()=>{
 const {h,calls}=setup({saved:false});const tree=await add(h);assert.equal(button(tree,'Save travel records').props.disabled,true);button(tree,'Save travel records').props.onClick();await flush();assert.equal(calls.filter(c=>c.options).length,0);const link=find(tree,n=>n.type==='a'&&n.props.children==='Download saved private trip JSON');assert.equal(link.props.href,`/api/account/plans/${id}/export`);
});
