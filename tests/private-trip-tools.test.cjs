const {test}=require('node:test'),assert=require('node:assert/strict'),loader=require('./helpers/load-ts.cjs')
const owner='19603428-6cb3-4c05-b280-d873ea13d9a4',plan='a13b0801-1c6d-41d4-94da-12e3adeebf13',taskId='f4fa711d-3730-49df-8c5b-bd90394b428f',recordId='0dc1eacf-82e0-4b27-b318-4fe19bb95fa5'
const placeId='place:new-zealand:trip-arthurs-pass-information'
function harness(results=[],auth=0){const queries=[],queue=[...results];let AccountError
 const client={from(table){const q={table,ops:[]};queries.push(q);const b={};for(const m of ['select','eq','order','limit','insert','delete'])b[m]=(...args)=>{q.ops.push([m,...args]);return b};const result=()=>{assert.ok(queue.length,'Unexpected database read');return Promise.resolve(queue.shift())};b.maybeSingle=result;b.then=(yes,no)=>result().then(yes,no);return b}}
 const load=loader({mocks:{'@/lib/account-auth':{requireAccountUser:async()=>{if(auth)throw new AccountError(auth,'Denied');return{user:{id:owner},client}}}}});AccountError=load('lib/account-errors.ts').AccountError
 return{...load('lib/place-favourite-handlers.ts'),...load('lib/trip-pack-handler.ts'),queries}}
const request=(body,method='POST',origin='https://aves.bio')=>new Request('https://aves.bio/api/account/favourites',{method,headers:{origin,'content-type':'application/json'},body:JSON.stringify(body)})
test('favourites save only reviewed public place IDs to the verified owner, preserving idempotent retries',async()=>{
 const h=harness([{data:{place_id:placeId},error:null}]);assert.equal((await h.favouritesPost(request({placeId}))).status,200)
 assert.deepEqual(h.queries[0].ops.find(op=>op[0]==='insert')[1],{user_id:owner,place_id:placeId})
 const retry=harness([{data:null,error:{code:'23505'}},{data:{place_id:placeId},error:null}]);assert.equal((await retry.favouritesPost(request({placeId}))).status,200)
 assert.ok(retry.queries[1].ops.some(op=>op[0]==='eq'&&op[1]==='user_id'&&op[2]===owner))
 const foreign=harness();assert.equal((await foreign.favouritesPost(request({placeId,user_id:'someone'}))).status,400);assert.equal(foreign.queries.length,0)
 const cross=harness();assert.equal((await cross.favouritesPost(request({placeId},'POST','https://else.test'))).status,403);assert.equal(cross.queries.length,0)
 const unknown=harness();assert.equal((await unknown.favouritesPost(request({placeId:'place:fake:invented'}))).status,400)
})
test('favourite list and removal filter ownership and never report provider failures as saved',async()=>{
 const h=harness([{data:[{place_id:placeId},{place_id:'not-in-catalogue'}],error:null}]);const r=await h.favouritesGet();assert.deepEqual((await r.json()).ids,[placeId]);assert.ok(h.queries[0].ops.some(op=>op[1]==='user_id'&&op[2]===owner))
 const remove=harness([{data:[],error:null}]);assert.equal((await remove.favouritesDelete(request({placeId},'DELETE'))).status,200);assert.ok(remove.queries[0].ops.some(op=>op[1]==='user_id'&&op[2]===owner));assert.ok(remove.queries[0].ops.some(op=>op[1]==='place_id'&&op[2]===placeId))
 const failed=harness([{data:null,error:{message:'provider secret'}}]);const f=await failed.favouritesPost(request({placeId}));assert.equal(f.status,503);assert.doesNotMatch(JSON.stringify(await f.json()),/provider secret/)
 const anon=harness([],401);assert.equal((await anon.favouritesGet()).status,401);assert.equal(anon.queries.length,0)
})
const selection={includeItinerary:true,preparationIds:[taskId],recordIds:[],workspaceRevision:1,recordsRevision:1}
const own={data:{id:plan,details:{country:'new-zealand'}},error:null}
const task={id:taskId,title:'Selected transport',category:'Transport',done:false,dueDate:'',notes:'Only selected task',url:'',arrangement:'idea',deleted:false}
const workspace={data:{revision:1,data:{version:1,tasks:[task],entries:[{id:recordId,title:'Private unselected journal',body:'Do not export this',date:'',day:null,placeId:'',deleted:false}]}},error:null}
const records={data:{revision:1,data:{version:1,records:[]}},error:null}
const saved={data:{title:'Synthetic saved trip',details:{message:'Day 1: saved itinerary'}},error:null}
test('selected trip packs deny other trip owners and stale revisions before producing a file',async()=>{
 const no=harness([{data:null,error:null}]);assert.equal((await no.tripPack(request(selection),plan)).status,404);assert.equal(no.queries.length,1)
 const stale=harness([own,workspace,records,saved]);assert.equal((await stale.tripPack(request({...selection,workspaceRevision:0}),plan)).status,409)
 const missing=harness([own,workspace,records,saved]);assert.equal((await missing.tripPack(request({...selection,preparationIds:[recordId]}),plan)).status,400)
 const anon=harness([],401);assert.equal((await anon.tripPack(request(selection),plan)).status,401);assert.equal(anon.queries.length,0)
})
test('selected trip pack includes exactly the active records requested and downloads privately',async()=>{
 const h=harness([own,workspace,records,saved]);const r=await h.tripPack(request(selection),plan)
 assert.equal(r.status,200);assert.match(r.headers.get('content-disposition'),/^attachment/);assert.equal(r.headers.get('cache-control'),'private, no-store');assert.match(r.headers.get('content-security-policy'),/sandbox/)
 const html=await r.text();assert.match(html,/Only selected task/);assert.match(html,/Day 1: saved itinerary/);assert.doesNotMatch(html,/Private unselected journal|Do not export this/)
 assert.ok(h.queries.at(-1).ops.some(op=>op[1]==='user_id'&&op[2]===owner))
})
