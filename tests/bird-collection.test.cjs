const {test}=require('node:test'),assert=require('node:assert/strict'),loader=require('./helpers/load-ts.cjs');
const load=loader(),{collectAlbumEntries,collectionResponseSchema}=load('lib/bird-collection.ts');
const country='colombia',species=load('lib/species-reference.ts').searchSpeciesReference(country,new URLSearchParams({q:'Santa Marta Warbler'})).results[0];
const p1='a13b0801-1c6d-41d4-94da-12e3adeebf13',p2='b13b0801-1c6d-41d4-94da-12e3adeebf13',r1='c13b0801-1c6d-41d4-94da-12e3adeebf13',r2='d13b0801-1c6d-41d4-94da-12e3adeebf13',owner='19603428-6cb3-4c05-b280-d873ea13d9a4';
const record=(id,state='desired')=>({id,speciesId:species.id,state,date:state==='observed'?'2026-11-13':'',regionId:'',notes:'Private notes must not enter the collection response',deleted:false});
test('collection deduplicates stable country/species identities while retaining repeated observations and excluding removed records',()=>{
 const albums=[{planId:p1,title:'First',country,data:{version:1,birds:[record(r1,'observed')]}},{planId:p2,title:'Second',country,data:{version:1,birds:[record(r2,'observed'),{...record(p1),deleted:true}]}}];
 const result=collectAlbumEntries(albums,()=>species);assert.equal(result.length,1);assert.equal(result[0].references.length,2);assert.equal(result[0].observed,true);assert.equal(result[0].desired,false);assert.equal(Object.hasOwn(result[0],'verified'),false);assert.equal(JSON.stringify(result).includes('Private notes'),false);
 const both=collectAlbumEntries([{...albums[0],data:{version:1,birds:[record(r1)]}},albums[1]],()=>species);assert.equal(both[0].desired,true);assert.equal(both[0].observed,true);
 const unavailable=collectAlbumEntries(albums,()=>undefined);assert.equal(unavailable[0].currentCatalogue,false);assert.equal(unavailable[0].references.length,2);
});
function harness(results=[],authStatus){
 const queue=[...results],queries=[];let AccountError;
 const client={from(table){const q={table,ops:[]};queries.push(q);const b={};for(const m of ['select','eq','order','limit','in'])b[m]=(...args)=>{q.ops.push([m,...args]);return b};b.then=(yes,no)=>Promise.resolve(queue.shift()||{data:[],error:null}).then(yes,no);return b}};
 const l=loader({mocks:{'@/lib/account-auth':{requireAccountUser:async()=>{if(authStatus)throw new AccountError(authStatus,'Sign in');return {client,user:{id:owner}}}}}});AccountError=l('lib/account-errors.ts').AccountError;
 return {...l('lib/bird-collection-handler.ts'),queries};
}
test('private collection scopes every query to owned plans and returns valid catalogue metadata even when empty',async()=>{
 const denied=harness([],401);assert.equal((await denied.birdCollectionGet(new Request('https://aves.bio/api/account/collection'))).status,401);assert.equal(denied.queries.length,0);
 const empty=harness([{data:[],count:0,error:null}]);const response=await empty.birdCollectionGet(new Request('https://aves.bio/api/account/collection'));assert.equal(response.status,200);const body=await response.json();assert.ok(collectionResponseSchema.safeParse(body).success);assert.equal(body.total,0);assert.equal(body.catalogues.length,3);assert.equal(empty.queries.length,1);assert.ok(empty.queries[0].ops.some(o=>o[0]==='eq'&&o[1]==='user_id'&&o[2]===owner));
 const foreign=harness([{data:[{id:p1,title:'Mine',details:{country}}],count:1,error:null},{data:[{plan_id:p2,revision:1,data:{version:1,birds:[record(r1)]}}],error:null}]);assert.equal((await foreign.birdCollectionGet(new Request('https://aves.bio/api/account/collection'))).status,503);
});
test('owner collection keeps linked trips and self-reported states without leaking album notes or awarding verification',async()=>{
 const h=harness([{data:[{id:p1,title:'First',details:{country}},{id:p2,title:'Second',details:{country}}],count:2,error:null},{data:[{plan_id:p1,revision:1,data:{version:1,birds:[record(r1)]}},{plan_id:p2,revision:1,data:{version:1,birds:[record(r2,'observed')]}}],error:null}]);
 const response=await h.birdCollectionGet(new Request('https://aves.bio/api/account/collection?country=colombia&state=observed'));assert.equal(response.status,200);const body=collectionResponseSchema.parse(await response.json());assert.equal(body.items.length,1);assert.equal(body.items[0].references.length,2);assert.equal(body.items[0].desired,true);assert.equal(body.items[0].observed,true);assert.equal(body.catalogues.find(c=>c.countryId===country).observed,1);assert.equal(JSON.stringify(body).includes('Private notes'),false);
});
