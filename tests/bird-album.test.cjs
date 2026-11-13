const {test}=require('node:test'),assert=require('node:assert/strict'),loader=require('./helpers/load-ts.cjs')
const load=loader(),a=load('lib/bird-album.ts'),reference=load('lib/species-reference.ts')
const country='colombia',bird=reference.searchSpeciesReference(country,new URLSearchParams({q:'Santa Marta Warbler'})).results[0]
const id='a13b0801-1c6d-41d4-94da-12e3adeebf13',owner='19603428-6cb3-4c05-b280-d873ea13d9a4'
const record={id,speciesId:bird.id,state:'desired',date:'',regionId:'sierra-nevada-de-santa-marta',notes:'My own memory',deleted:false},data={version:1,birds:[record]}
const own={data:{id,details:{country}},error:null}
const request=(body,origin='https://aves.bio')=>new Request('https://aves.bio/api/account/plans/'+id+'/album',{method:'PUT',headers:{origin,'content-type':'application/json'},body:JSON.stringify(body)})
function harness(results=[],auth=0){const queries=[],queue=[...results];let AccountError;const client={from(table){const q={table,ops:[]};queries.push(q);const b={};for(const name of ['select','eq','insert','update'])b[name]=(...args)=>{q.ops.push([name,...args]);return b};b.maybeSingle=async()=>{assert.ok(queue.length,'Unexpected query');return queue.shift()};return b}};const l=loader({mocks:{'@/lib/account-auth':{requireAccountUser:async()=>{if(auth)throw new AccountError(auth,'Denied');return {user:{id:owner},client}}}}});AccountError=l('lib/account-errors.ts').AccountError;return {...l('lib/bird-album-handlers.ts'),queries}}
test('wishes and observed records stay separate; verification and coordinates cannot be client-supplied',()=>{
 assert.equal(a.albumSchema.safeParse(data).success,true)
 for(const patch of [{state:'verified'},{verified:true},{latitude:10},{date:'2026-02-30'},{state:'desired',date:'2025-02-01'}])assert.equal(a.albumSchema.safeParse({...data,birds:[{...record,...patch}]}).success,false)
 const observed=a.albumSchema.parse({...data,birds:[{...record,state:'observed',date:'2025-02-01'}]});assert.match(a.albumStateLabel(observed.birds[0]),/Unverified/);assert.equal(a.albumSchema.safeParse({...data,birds:[record,record]}).success,false)
})
test('album reads require a session and parent ownership, never create blank records',async()=>{
 assert.equal((await harness([],401).albumGet(id)).status,401)
 const other=harness([{data:null,error:null}]);assert.equal((await other.albumGet(id)).status,404);assert.equal(other.queries.length,1)
 const h=harness([own,{data:null,error:null}]),r=await h.albumGet(id);assert.equal(r.status,200);assert.equal(r.headers.get('cache-control'),'private, no-store');assert.deepEqual((await r.json()).data,a.emptyAlbum());assert.ok(h.queries[0].ops.some(o=>o[0]==='eq'&&o[1]==='user_id'&&o[2]===owner))
})
test('album saves exact canonical country species with version checks and receipt retry',async()=>{
 const h=harness([own,{data:{revision:1,data},error:null}]);assert.equal((await h.albumPut(request({expectedRevision:0,data}),id)).status,200);assert.equal(h.queries[1].table,'trip_bird_albums')
 const edit=harness([own,{data:{revision:4,data},error:null}]);assert.equal((await edit.albumPut(request({expectedRevision:3,data}),id)).status,200);assert.ok(edit.queries[1].ops.some(o=>o[0]==='eq'&&o[1]==='revision'&&o[2]===3))
 const retry=harness([own,{data:null,error:{code:'23505'}},{data:{revision:1,data},error:null}]);assert.equal((await retry.albumPut(request({expectedRevision:0,data}),id)).status,200)
 const stale=harness([own,{data:null,error:null},{data:{revision:2,data},error:null}]);assert.equal((await stale.albumPut(request({expectedRevision:0,data}),id)).status,409)
})
test('forged verification, cross-site, wrong-country, unknown species and mismatched regions cannot write',async()=>{
 for(const patch of [{state:'verified'},{speciesId:'made-up-bird'},{regionId:'north-island'}]){const h=harness([own]);assert.equal((await h.albumPut(request({expectedRevision:0,data:{...data,birds:[{...record,...patch}]}}),id)).status,400);assert.ok(h.queries.length<=1)}
 const cross=harness();assert.equal((await cross.albumPut(request({expectedRevision:0,data},'https://other.test'),id)).status,403);assert.equal(cross.queries.length,0)
 const other=harness([{data:{id,details:{country:'australia'}},error:null}]);assert.equal((await other.albumPut(request({expectedRevision:0,data}),id)).status,400)
 assert.equal((await harness().albumGet('invalid')).status,404)
})
test('stored invalid album data fails closed without overwriting records',async()=>{assert.equal((await harness([own,{data:{revision:1,data:{version:1,birds:[{...record,state:'verified'}]}},error:null}]).albumGet(id)).status,503)})
