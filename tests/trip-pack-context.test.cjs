const {test}=require('node:test'),assert=require('node:assert/strict'),loader=require('./helpers/load-ts.cjs');
const id='a13b0801-1c6d-41d4-94da-12e3adeebf13',owner='19603428-6cb3-4c05-b280-d873ea13d9a4',stamp='2026-11-13T00:00:00.123456Z';
const own={data:{id,details:{country:'new-zealand'}},error:null},workspace={data:null,error:null},records={data:null,error:null};
const plan={data:{title:'Selected brief',updated_at:stamp,details:{country:'new-zealand',regions:['north-island'],travelWhen:'2027-02-08 to 2027-02-14',partySize:'2 people',questionnaire:{version:1,pace:'open',birding:'open',comfort:'open',interests:[],budget:{currency:'CAD',food:0}}}},error:null};
function harness(results=[]){
 const queue=[...results],queries=[];
 const client={from(table){queries.push(table);const builder={};for(const method of ['select','eq','order','limit'])builder[method]=()=>builder;builder.maybeSingle=async()=>queue.shift()||{data:null,error:null};return builder}};
 const load=loader({mocks:{'@/lib/account-auth':{requireAccountUser:async()=>({client,user:{id:owner}})}}});
 return {...load('lib/trip-pack-handler.ts'),queries};
}
const request=body=>new Request('https://aves.bio/api/account/plans/'+id+'/pack',{method:'POST',headers:{origin:'https://aves.bio','content-type':'application/json'},body:JSON.stringify(body)});
const selection={includeItinerary:false,includeBrief:true,planUpdatedAt:stamp,preparationIds:[],recordIds:[],workspaceRevision:0,recordsRevision:0};
test('selected brief uses saved fields without requiring duplicated notes and rejects stale plan snapshots',async()=>{
 const h=harness([own,workspace,records,plan]);const response=await h.tripPack(request(selection),id);assert.equal(response.status,200);const file=await response.text();assert.match(file,/Selected saved brief/);assert.match(file,/2027-02-08 to 2027-02-14/);assert.match(file,/2 people/);assert.match(file,/CAD/);assert.doesNotMatch(file,/<h2>Saved itinerary/);
 const stale=harness([own,workspace,records,plan]);assert.equal((await stale.tripPack(request({...selection,planUpdatedAt:'2026-11-12T00:00:00Z'}),id)).status,409);
});
test('editable-route selection checks its own revision and does not expose routes when unselected',async()=>{
 const h=harness([own,workspace,records,plan,{data:{revision:2,data:{version:1,routes:[]}},error:null}]);assert.equal((await h.tripPack(request({...selection,includeEditableRoutes:true,itineraryRevision:1}),id)).status,409);
 const hidden=harness([own,workspace,records,plan]);assert.equal((await hidden.tripPack(request(selection),id)).status,200);assert.equal(hidden.queries.includes('trip_itineraries'),false);
});
