const {test}=require('node:test'),assert=require('node:assert/strict'),loader=require('./helpers/load-ts.cjs');
const p=loader()('lib/trip-workspace.ts');
const owner='19603428-6cb3-4c05-b280-d873ea13d9a4',id='a13b0801-1c6d-41d4-94da-12e3adeebf13';
const task={id,title:'Arrange transfer',category:'Transport',done:false,dueDate:'2026-12-01',notes:'Ask about luggage',url:'https://example.test/transfer',arrangement:'requested',deleted:false};
const entry={id,title:'Lake morning',body:'My own field notes',date:'2026-12-02',day:2,placeId:'region:north-island',deleted:false};
const data={version:1,tasks:[task],entries:[entry]};
const request=(value,origin='https://aves.bio')=>new Request('https://aves.bio/api/account/plans/'+id+'/workspace',{method:'PUT',headers:{origin,'content-type':'application/json'},body:JSON.stringify(value)});
function harness(results=[],auth=0){
 const queries=[],queue=[...results];let AccountError;
 const client={from(table){const q={table,operations:[]};queries.push(q);const b={};for(const name of ['select','eq','insert','update'])b[name]=(...args)=>{q.operations.push([name,...args]);return b};b.maybeSingle=async()=>{if(!queue.length)throw Error('Unexpected query');return queue.shift()};return b}};
 const load=loader({mocks:{'@/lib/account-auth':{requireAccountUser:async()=>{if(auth)throw new AccountError(auth,'Denied');return {user:{id:owner,user_metadata:{user_id:'forged'}},client}}}}});AccountError=load('lib/account-errors.ts').AccountError;
 return {...load('lib/trip-workspace-handlers.ts'),queries};
}
const own={data:{id,details:{country:'new-zealand'}},error:null};
test('workspace validates dates, public country associations and bounded private data',()=>{
 assert.equal(p.workspaceSchema.safeParse(data).success,true);assert.equal(p.workspacePlacesValid(data,'new-zealand'),true);assert.equal(p.workspacePlacesValid(data,'colombia'),false);
 for(const patch of [{dueDate:'2026-02-30'},{url:'javascript:alert(1)'},{url:'https://user:pass@example.test/'},{url:'https://example.test/\nunsafe'}])assert.equal(p.preparationSchema.safeParse({...task,...patch}).success,false);
 assert.equal(p.workspaceSchema.safeParse({...data,tasks:[task,task]}).success,false);
 assert.equal(p.workspaceSchema.safeParse({...data,entries:Array.from({length:9},(_,i)=>({...entry,id:require('node:crypto').randomUUID(),body:'x'.repeat(3000)+i}))}).success,false);
});
test('check completion, arrangement status and recoverable journal removal are independent',()=>{
 const saved=p.workspaceSchema.parse({...data,tasks:[{...task,done:true,arrangement:'idea'}],entries:[{...entry,deleted:true}]});assert.equal(saved.tasks[0].arrangement,'idea');assert.equal(saved.entries[0].body,entry.body);assert.equal(p.workspaceSchema.safeParse({...saved,entries:[{...saved.entries[0],deleted:false}]}).success,true);
});
test('workspace reads verify the session and parent owner before loading a row',async()=>{
 const h=harness([own,{data:{revision:3,data},error:null}]);const r=await h.workspaceGet(id);assert.equal(r.status,200);assert.equal(r.headers.get('cache-control'),'private, no-store');assert.deepEqual(await r.json(),{revision:3,data});assert.ok(h.queries[0].operations.some(op=>op[0]==='eq'&&op[1]==='user_id'&&op[2]===owner));
 const other=harness([{data:null,error:null}]);assert.equal((await other.workspaceGet(id)).status,404);assert.equal(other.queries.length,1);
 assert.equal((await harness([],401).workspaceGet(id)).status,401);
});
test('reading an uninitialised workspace never writes an empty replacement',async()=>{
 const h=harness([own,{data:null,error:null}]);assert.deepEqual(await (await h.workspaceGet(id)).json(),{revision:0,data:p.emptyWorkspace()});assert.equal(h.queries.length,2);
});
test('new workspace save and later edits use the exact trip and expected revision',async()=>{
 const h=harness([own,{data:{revision:1,data},error:null}]);assert.equal((await h.workspacePut(request({expectedRevision:0,data}),id)).status,200);assert.deepEqual(h.queries[1].operations.find(op=>op[0]==='insert')[1],{plan_id:id,revision:1,data});
 const update=harness([own,{data:{revision:4,data},error:null}]);assert.equal((await update.workspacePut(request({expectedRevision:3,data}),id)).status,200);assert.ok(update.queries[1].operations.some(op=>op[0]==='eq'&&op[1]==='revision'&&op[2]===3));
});
test('lost save receipts accept only the next matching revision and preserve conflicts',async()=>{
 const exact=harness([own,{data:null,error:{code:'23505'}},{data:{revision:1,data},error:null}]);assert.equal((await exact.workspacePut(request({expectedRevision:0,data}),id)).status,200);
 const stale=harness([own,{data:null,error:null},{data:{revision:5,data:{...data,tasks:[]}},error:null}]);assert.equal((await stale.workspacePut(request({expectedRevision:3,data}),id)).status,409);
});
test('cross-site, forged fields, malformed IDs and country mismatches never write',async()=>{
 const cross=harness();assert.equal((await cross.workspacePut(request({expectedRevision:0,data},'https://other.test'),id)).status,403);assert.equal(cross.queries.length,0);
 const fields=harness();assert.equal((await fields.workspacePut(request({expectedRevision:0,data,user_id:owner}),id)).status,400);assert.equal(fields.queries.length,0);
 const malformed=harness();assert.equal((await malformed.workspaceGet('not-an-id')).status,404);assert.equal(malformed.queries.length,0);
 const places=harness([{data:{id,details:{country:'colombia'}},error:null}]);assert.equal((await places.workspacePut(request({expectedRevision:0,data}),id)).status,400);assert.equal(places.queries.length,1);
});
