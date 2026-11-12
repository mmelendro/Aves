const {test}=require('node:test'),assert=require('node:assert/strict'),loader=require('./helpers/load-ts.cjs');
const p=loader()('lib/trip-records.ts');
const owner='19603428-6cb3-4c05-b280-d873ea13d9a4',id='a13b0801-1c6d-41d4-94da-12e3adeebf13',entry='f4fa711d-3730-49df-8c5b-bd90394b428f';
const expense={...p.newTravelRecord('expense',id,'Transfer receipt'),amountMinor:1999,currency:'NZD',status:'paid'};
const booking={...p.newTravelRecord('booking',entry,'Flight confirmation'),provider:'Synthetic airline',reference:'TEST ONLY',status:'requested'};
const data={version:1,records:[expense,booking]};
const request=(value,origin='https://aves.bio')=>new Request('https://aves.bio/api/account/plans/'+id+'/records',{method:'PUT',headers:{origin,'content-type':'application/json'},body:JSON.stringify(value)});
function harness(results=[],auth=0){
 const queries=[],queue=[...results];let AccountError;
 const client={from(table){const q={table,operations:[]};queries.push(q);const b={};for(const name of ['select','eq','insert','update','order','limit'])b[name]=(...args)=>{q.operations.push([name,...args]);return b};b.maybeSingle=async()=>{if(!queue.length)throw Error('Unexpected query');return queue.shift()};b.then=(yes,no)=>b.maybeSingle().then(yes,no);return b}};
 const load=loader({mocks:{'@/lib/account-auth':{requireAccountUser:async()=>{if(auth)throw new AccountError(auth,'Denied');return {user:{id:owner},client}}}}});AccountError=load('lib/account-errors.ts').AccountError;
 return {...load('lib/trip-records-handlers.ts'),...load('lib/trip-export-handler.ts'),queries};
}
const own={data:{id,details:{country:'new-zealand'}},error:null};
test('expense amounts use exact integer units and reject ambiguous text or excess precision',()=>{
 for(const [text,currency,expected] of [['19.99','NZD',1999],['0.10','USD',10],['120','JPY',120],['0','COP',0],['10000000.00','AUD',1000000000]])assert.equal(p.parseRecordAmount(text,currency),expected);
 for(const text of ['', ' ', '-1','1e2','1,000','0.001','Infinity','10000000.01'])assert.equal(p.parseRecordAmount(text,'NZD'),null);
 assert.equal(p.parseRecordAmount('1.1','JPY'),null);assert.equal(p.recordAmountText(1999,'NZD'),'19.99');
});
test('expense totals separate currencies, refunds and estimates and omit removed records',()=>{
 const totals=p.expenseTotals([expense,{...expense,id:entry,status:'estimated'}, {...expense,status:'refunded',amountMinor:500},{...expense,currency:'USD',amountMinor:100}, {...expense,deleted:true},booking]);
 assert.deepEqual(totals,[{currency:'NZD',estimated:1999,paid:1999,refunded:500},{currency:'USD',estimated:0,paid:100,refunded:0}]);
});
test('records reject unsupported fields, unknown payment states, unsafe links, bad dates and duplicates',()=>{
 assert.equal(p.recordsSchema.safeParse(data).success,true);
 for(const patch of [{amountMinor:0.5},{amountMinor:-1},{currency:'BTC'},{status:'confirmed'},{date:'2026-02-30'},{url:'https://person:secret@example.test/'},{reference:'extra'}])assert.equal(p.travelRecordSchema.safeParse({...expense,...patch}).success,false);
 assert.equal(p.recordsSchema.safeParse({...data,records:[expense,expense]}).success,false);
 assert.equal(p.recordsSchema.safeParse({...data,records:Array.from({length:51},()=>({...expense,id:require('node:crypto').randomUUID()}))}).success,false);
 assert.equal(p.bookingRecordSchema.safeParse({...booking,status:'paid'}).success,false);
});
test('travel record read is owner scoped and empty reads never write a replacement',async()=>{
 const h=harness([own,{data:null,error:null}]);assert.deepEqual(await(await h.recordsGet(id)).json(),{revision:0,data:p.emptyTravelRecords()});assert.equal(h.queries.length,2);assert.ok(h.queries[0].operations.some(op=>op[0]==='eq'&&op[1]==='user_id'&&op[2]===owner));
 const other=harness([{data:null,error:null}]);assert.equal((await other.recordsGet(id)).status,404);assert.equal(other.queries.length,1);assert.equal((await harness([],401).recordsGet(id)).status,401);
});
test('records save and exact receipt retries preserve revision guards',async()=>{
 const h=harness([own,{data:{revision:1,data},error:null}]);assert.equal((await h.recordsPut(request({expectedRevision:0,data}),id)).status,200);
 const exact=harness([own,{data:null,error:{code:'23505'}},{data:{revision:1,data},error:null}]);assert.equal((await exact.recordsPut(request({expectedRevision:0,data}),id)).status,200);
 const conflict=harness([own,{data:null,error:null},{data:{revision:2,data},error:null}]);assert.equal((await conflict.recordsPut(request({expectedRevision:0,data}),id)).status,409);
});
test('receipt and booking links must refer to a saved journal entry in the owned trip',async()=>{
 const linked={version:1,records:[{...expense,entryId:entry}]};
 const h=harness([own,{data:{data:{entries:[]}},error:null}]);assert.equal((await h.recordsPut(request({expectedRevision:0,data:linked}),id)).status,400);assert.equal(h.queries.length,2);
 const good=harness([own,{data:{data:{entries:[{id:entry,deleted:false}]}},error:null},{data:{revision:1,data:linked},error:null}]);assert.equal((await good.recordsPut(request({expectedRevision:0,data:linked}),id)).status,200);
});
test('foreign Origin and forged ownership fail before practical-record writes',async()=>{
 const h=harness();assert.equal((await h.recordsPut(request({expectedRevision:0,data},'https://other.test'),id)).status,403);assert.equal(h.queries.length,0);
 assert.equal((await harness().recordsPut(request({expectedRevision:0,data,user_id:owner}),id)).status,400);
});
test('owner export includes saved sections and removed records without storage paths or public links',async()=>{
 const removed={...expense,deleted:true},records={version:1,records:[removed]};
 const h=harness([own,{data:{revision:3,data:{version:1,tasks:[],entries:[]}},error:null},{data:{revision:2,data:records},error:null},{data:{title:'Synthetic trip',details:{country:'new-zealand'},status:'draft'},error:null},{data:[],error:null}]);
 const response=await h.tripExport(id);assert.equal(response.status,200);assert.equal(response.headers.get('cache-control'),'private, no-store');assert.match(response.headers.get('content-disposition'),/^attachment/);assert.equal(response.headers.get('x-content-type-options'),'nosniff');const pack=await response.json();assert.equal(pack.travelRecords.data.records[0].deleted,true);assert.equal(pack.workspace.revision,3);assert.equal(pack.trip.title,'Synthetic trip');assert.equal(pack.format,'aves-private-trip');assert.deepEqual(pack.attachments,[]);assert.doesNotMatch(JSON.stringify(pack),/object_path|signedUrl|service_role/);
 const stranger=harness([{data:null,error:null}]);assert.equal((await stranger.tripExport(id)).status,404);assert.equal(stranger.queries.length,1);
});
