const {test}=require('node:test'),assert=require('node:assert/strict');
const {componentHarness,find,nodes}=require('./helpers/component-harness.cjs');
const id='a13b0801-1c6d-41d4-94da-12e3adeebf13';
const flush=()=>new Promise(resolve=>setImmediate(resolve));
function setup(fail=false){let receipt={revision:0,data:{version:1,tasks:[],entries:[]}};const calls=[];
 const h=componentHarness('components/account/trip-workspace.tsx','TripWorkspace',{planId:id,country:'new-zealand'},{runEffects:true,window:{addEventListener(){},removeEventListener(){}},mocks:{'./account-api':{errorMessage:e=>e.message,accountRequest:async(path,options)=>{calls.push({path,options});if(!options)return receipt;if(fail)throw Error('Save failed');const body=JSON.parse(options.body);return receipt={revision:body.expectedRevision+1,data:body.data}}}}});return {h,calls};}
const button=(tree,label)=>find(tree,n=>n.type==='Button'&&n.props.children===label);
test('workspace adds, checks, saves and restores journal entries without implying bookings',async()=>{
 const {h,calls}=setup();h.render();await flush();let tree=h.render();
 find(tree,n=>n.props['aria-label']==='New preparation').props.onChange({target:{value:'Check flights'}});tree=h.render();find(tree,n=>n.type==='form').props.onSubmit({preventDefault(){}});tree=h.render();
 find(tree,n=>n.type==='input'&&n.props.type==='checkbox').props.onChange({target:{checked:true}});tree=h.render();
 find(tree,n=>n.props['aria-label']==='New journal entry').props.onChange({target:{value:'Lake morning'}});tree=h.render();nodes(tree).filter(n=>n.type==='form')[1].props.onSubmit({preventDefault(){}});tree=h.render();
 button(tree,'Move entry to removed items').props.onClick();tree=h.render();find(tree,n=>n.type==='Button'&&n.props['aria-expanded']===false).props.onClick();tree=h.render();button(tree,'Restore journal entry').props.onClick();tree=h.render();
 await button(tree,'Save workspace').props.onClick();await flush();tree=h.render();
 const saved=JSON.parse(calls.at(-1).options.body);assert.equal(saved.data.tasks[0].done,true);assert.equal(saved.data.tasks[0].arrangement,'idea');assert.equal(saved.data.entries[0].deleted,false);assert.equal(saved.expectedRevision,0);assert.equal(button(tree,'Save workspace').props.disabled,true);
});
test('failed workspace save keeps edits and allows retry',async()=>{
 const {h}=setup(true);h.render();await flush();let tree=h.render();find(tree,n=>n.props['aria-label']==='New journal entry').props.onChange({target:{value:'Keep this note'}});tree=h.render();nodes(tree).filter(n=>n.type==='form')[1].props.onSubmit({preventDefault(){}});tree=h.render();await button(tree,'Save workspace').props.onClick();await flush();tree=h.render();assert.ok(nodes(tree).some(n=>n.type==='input'&&n.props.value==='Keep this note'));assert.equal(button(tree,'Save workspace').props.disabled,false);assert.ok(nodes(tree).some(n=>n.props.role==='alert'&&n.props.children==='Save failed'));
});
