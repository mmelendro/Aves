const {test}=require('node:test'),assert=require('node:assert/strict'),loader=require('./helpers/load-ts.cjs');
const load=loader(),model=load('lib/saved-itineraries.ts'),p=load('lib/island-planners.ts').northIslandPlanner;
const id='a13b0801-1c6d-41d4-94da-12e3adeebf13',owner='19603428-6cb3-4c05-b280-d873ea13d9a4';
const draft=p.buildTrip(p.defaultTripInput),data=model.replaceSavedRoute(model.emptyItineraries(),draft),own={data:{id,details:{country:'new-zealand'}},error:null};
const request=(body,origin='https://aves.bio')=>new Request('https://aves.bio/api/account/plans/'+id+'/itineraries',{method:'PUT',headers:{origin,'content-type':'application/json'},body:JSON.stringify(body)});
function harness(results=[],authStatus){
 const queries=[],queue=[...results];let AccountError;
 const client={from(table){
  const q={table,ops:[]};queries.push(q);const builder={};
  for(const method of ['select','eq','insert','update'])builder[method]=(...args)=>{q.ops.push([method,...args]);return builder};
  builder.maybeSingle=async()=>queue.shift()||{data:null,error:null};return builder;
 }};
 const l=loader({mocks:{'./account-auth':{
  requireAccountUser:async()=>{if(authStatus)throw new AccountError(authStatus,'Sign in');return {client,user:{id:owner}}}
 }}});
 AccountError=l('lib/account-errors.ts').AccountError;
 return {...l('lib/saved-itinerary-handlers.ts'),queries};
}
test('owned versioned routes retain exact day choices and reject unknown versions, islands and injected fields',()=>{
 assert.ok(model.itinerarySourcesValid(data));assert.deepEqual(model.replaceSavedRoute(data,draft),data);
 assert.equal(model.itinerariesSchema.safeParse({...data,version:2}).success,false);
 const bad=structuredClone(data);bad.routes[0].input.country='other';assert.equal(model.itinerariesSchema.safeParse(bad).success,false);
 const removed=structuredClone(data);removed.routes[0].days[0].birdingId='removed-reference';assert.ok(model.itinerariesSchema.safeParse(removed).success);assert.equal(model.itinerarySourcesValid(removed),false);
});
test('itinerary endpoints authenticate, enforce ownership and destination, and preserve conflicts and replay',async()=>{
 assert.equal((await harness([],401).itinerariesGet(id)).status,401);
 assert.equal((await harness([{data:null,error:null}]).itinerariesGet(id)).status,404);
 const write=harness([own,{data:{revision:1,data},error:null}]);const receipt=await write.itinerariesPut(request({expectedRevision:0,data}),id);assert.equal(receipt.status,200);assert.deepEqual((await receipt.json()).data,data);
 const country=harness([{data:{id,details:{country:'colombia'}},error:null}]);assert.equal((await country.itinerariesPut(request({expectedRevision:0,data}),id)).status,400);assert.equal(country.queries.length,1);
 const foreign=harness();assert.equal((await foreign.itinerariesPut(request({expectedRevision:0,data},'https://other.test'),id)).status,403);assert.equal(foreign.queries.length,0);
 const retry=harness([own,{data:null,error:{code:'23505'}},{data:{revision:1,data},error:null}]);assert.equal((await retry.itinerariesPut(request({expectedRevision:0,data}),id)).status,200);
 const conflict=harness([own,{data:null,error:null},{data:{revision:2,data},error:null}]);assert.equal((await conflict.itinerariesPut(request({expectedRevision:0,data}),id)).status,409);
});
