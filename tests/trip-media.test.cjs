const {test}=require('node:test'),assert=require('node:assert/strict'),loader=require('./helpers/load-ts.cjs');
const {createHash}=require('node:crypto');
const p=loader()('lib/trip-media.ts');
const owner='19603428-6cb3-4c05-b280-d873ea13d9a4',plan='a13b0801-1c6d-41d4-94da-12e3adeebf13',entry='f4fa711d-3730-49df-8c5b-bd90394b428f',id='0dc1eacf-82e0-4b27-b318-4fe19bb95fa5';
const wav=new Uint8Array(Buffer.from('RIFF0000WAVE'+String.fromCharCode(0).repeat(32)));
const hash=createHash('sha256').update(wav).digest('hex');
const row={id,plan_id:plan,user_id:owner,entry_id:entry,object_path:`${owner}/${plan}/${id}.wav`,kind:'audio',mime:'audio/wav',byte_size:wav.length,content_hash:hash,state:'pending',caption:'',creator:'',recorded_on:null,position:0,notes:'',revision:1};
function harness(results=[],auth=0,storageOptions={}){let AccountError;const queries=[],storageCalls=[],queue=[...results];
 const bucket={upload:async(...args)=>{storageCalls.push(['upload',...args]);return storageOptions.upload||{data:{path:row.object_path},error:null}},download:async(...args)=>{storageCalls.push(['download',...args]);return storageOptions.download||{data:new Blob([wav],{type:'audio/wav'}),error:null}},remove:async(...args)=>{storageCalls.push(['remove',...args]);return storageOptions.remove||{data:[],error:null}}};
 const client={storage:{from(name){assert.equal(name,p.TRIP_MEDIA_BUCKET);return bucket}},from(table){const q={table,ops:[]};queries.push(q);const b={};for(const name of ['select','eq','insert','update','order','delete','limit'])b[name]=(...args)=>{q.ops.push([name,...args]);return b};const result=()=>{if(!queue.length)throw Error('Unexpected query');return Promise.resolve(queue.shift())};b.maybeSingle=result;b.then=(yes,no)=>result().then(yes,no);return b}};
 const load=loader({mocks:{'@/lib/account-auth':{requireAccountUser:async()=>{if(auth)throw new AccountError(auth,'Denied');return {user:{id:owner},client}}}}});AccountError=load('lib/account-errors.ts').AccountError;return {...load('lib/trip-media-handlers.ts'),queries,storageCalls};}
const own={data:{id:plan,details:{country:'new-zealand'}},error:null},workspace={data:{data:{entries:[{id:entry,deleted:false}]}},error:null};
const req=(bytes=wav,type='audio/wav',origin='https://aves.bio')=>new Request(`https://aves.bio/api/account/plans/${plan}/media?entry=${entry}`,{method:'POST',headers:{origin,'content-type':type,'idempotency-key':id},body:bytes});
const patch=(body,method='PATCH')=>new Request('https://aves.bio/api/account/plans/'+plan+'/media/'+id,{method,headers:{origin:'https://aves.bio','content-type':'application/json'},body:JSON.stringify(body)});
test('media supports bounded known formats and rejects HTML, SVG and malformed signatures',()=>{
 assert.equal(p.mediaSignature(wav),'audio/wav');assert.equal(p.mediaSignature(new Uint8Array(Buffer.from('<svg onload="alert(1)"></svg>'))),null);assert.equal(p.mediaSignature(new Uint8Array(2)),null);assert.equal(p.MAX_TRIP_MEDIA_BYTES,3145728);
 assert.equal(p.mediaDetailsSchema.safeParse({caption:'Lake',creator:'Photographer',recordedOn:'2026-02-30',position:0,notes:''}).success,false);
});
test('owner upload reserves a stable path and marks ready only after storage confirms bytes',async()=>{
 const h=harness([own,workspace,{data:null,error:null},{data:row,error:null},{data:{...row,state:'ready',revision:2},error:null}]);const r=await h.mediaPost(req(),plan);assert.equal(r.status,200);const item=(await r.json()).item;assert.equal(item.state,'ready');assert.equal(item.object_path,undefined);assert.equal(item.content_hash,undefined);assert.equal(h.storageCalls[0][0],'upload');assert.equal(h.storageCalls[0][3].upsert,false);assert.equal(h.queries[3].ops.find(op=>op[0]==='insert')[1].user_id,owner);
});
test('a completed retry does not upload again and a changed payload conflicts',async()=>{
 const ready={...row,state:'ready',revision:2};const exact=harness([own,workspace,{data:ready,error:null}]);assert.equal((await exact.mediaPost(req(),plan)).status,200);assert.equal(exact.storageCalls.length,0);
 const changed=harness([own,workspace,{data:{...ready,content_hash:'b'.repeat(64)},error:null}]);assert.equal((await changed.mediaPost(req(),plan)).status,409);assert.equal(changed.storageCalls.length,0);
});
test('failed storage leaves a retryable pending record and never returns a false saved receipt',async()=>{
 const h=harness([own,workspace,{data:null,error:null},{data:row,error:null}],0,{upload:{error:{message:'provider secret'}},download:{data:null,error:{message:'missing'}}});const r=await h.mediaPost(req(),plan);assert.equal(r.status,503);assert.doesNotMatch(JSON.stringify(await r.json()),/provider secret/);assert.equal(h.queries.length,4);
});
test('cross-site, wrong ownership, removed entries and oversized/unsupported bytes fail before storage',async()=>{
 const cross=harness();assert.equal((await cross.mediaPost(req(wav,'audio/wav','https://else.test'),plan)).status,403);assert.equal(cross.queries.length,0);
 const other=harness([{data:null,error:null}]);assert.equal((await other.mediaPost(req(),plan)).status,404);assert.equal(other.storageCalls.length,0);
 const removed=harness([own,{data:{data:{entries:[{id:entry,deleted:true}]}},error:null}]);assert.equal((await removed.mediaPost(req(),plan)).status,409);
 const large=harness([own,workspace]);assert.equal((await large.mediaPost(req(new Uint8Array(p.MAX_TRIP_MEDIA_BYTES+1)),plan)).status,413);assert.equal(large.storageCalls.length,0);
 const unsupported=harness([own,workspace]);assert.equal((await unsupported.mediaPost(req(new Uint8Array(Buffer.from('<html>bad file</html>')),'image/jpeg'),plan)).status,415);
});
test('media details keep explicit units, notes and expected revision without accepting a path rewrite',async()=>{
 const details={caption:'Lake recording',creator:'My own recording',recordedOn:'2026-12-02',position:4,notes:'Synthetic field notes'};
 const h=harness([own,{data:{...row,state:'ready',revision:2},error:null},{data:{...row,state:'ready',revision:3,caption:details.caption,creator:details.creator,recorded_on:details.recordedOn,position:4,notes:details.notes},error:null}]);const r=await h.mediaPatch(patch({...details,expectedRevision:2}),plan,id);assert.equal(r.status,200);assert.equal((await r.json()).item.notes,details.notes);
 const forged=harness();assert.equal((await forged.mediaPatch(patch({...details,expectedRevision:2,object_path:'other/file'}),plan,id)).status,400);assert.equal(forged.queries.length,0);
});
test('private content verifies integrity and sends no-store, nosniff and correct media type',async()=>{
 const h=harness([own,{data:{...row,state:'ready',revision:2},error:null}]);const r=await h.mediaContent(plan,id);assert.equal(r.status,200);assert.equal(r.headers.get('content-type'),'audio/wav');assert.equal(r.headers.get('cache-control'),'private, no-store');assert.equal(r.headers.get('x-content-type-options'),'nosniff');assert.deepEqual(new Uint8Array(await r.arrayBuffer()),wav);
 const anon=harness([],401);assert.equal((await anon.mediaContent(plan,id)).status,401);assert.equal(anon.storageCalls.length,0);
 const corrupt=harness([own,{data:{...row,state:'ready',content_hash:'b'.repeat(64)},error:null}]);assert.equal((await corrupt.mediaContent(plan,id)).status,503);
});
test('removal reserves a revision before deleting bytes and never deletes on a stale revision',async()=>{
 const ready={...row,state:'ready',revision:2};const stale=harness([own,{data:ready,error:null}]);assert.equal((await stale.mediaDelete(patch({expectedRevision:1},'DELETE'),plan,id)).status,409);assert.equal(stale.storageCalls.length,0);
 const h=harness([own,{data:ready,error:null},{data:{...ready,state:'deleting',revision:3},error:null},{data:{id},error:null}]);const r=await h.mediaDelete(patch({expectedRevision:2},'DELETE'),plan,id);assert.equal(r.status,200);assert.equal((await r.json()).removed,true);assert.equal(h.storageCalls[0][0],'remove');assert.equal(h.queries[2].ops.find(op=>op[0]==='update')[1].state,'deleting');
});
test('private audio supports bounded range seeking and rejects invalid byte ranges',async()=>{
 const ready={...row,state:'ready',revision:2};
 const h=harness([own,{data:ready,error:null}]);const r=await h.mediaContent(plan,id,'bytes=0-11');assert.equal(r.status,206);assert.equal(r.headers.get('content-range'),`bytes 0-11/${wav.length}`);assert.equal((await r.arrayBuffer()).byteLength,12);
 const invalid=harness([own,{data:ready,error:null}]);assert.equal((await invalid.mediaContent(plan,id,'bytes=9999-')).status,416);
});

test('private PDF copies require a PDF signature and always download as sandboxed attachments',async()=>{
 const pdf=new Uint8Array(Buffer.from('%PDF-1.4\nSynthetic receipt only\n%%EOF\n'));
 assert.equal(p.mediaSignature(pdf),'application/pdf');assert.equal(p.mediaSignature(new Uint8Array(Buffer.from('%PDF-9.9\nunsupported\n%%EOF'))),null);assert.equal(p.mediaSignature(new Uint8Array(Buffer.from('%PDF-1.4\ntruncated'))),null);
 const pdfRow={...row,kind:'document',mime:'application/pdf',object_path:row.object_path.replace('.wav','.pdf'),byte_size:pdf.length,content_hash:createHash('sha256').update(pdf).digest('hex'),state:'ready',revision:2};
 const h=harness([own,{data:pdfRow,error:null}],0,{download:{data:new Blob([pdf],{type:'application/pdf'}),error:null}});
 const r=await h.mediaContent(plan,id);assert.equal(r.status,200);assert.equal(r.headers.get('content-type'),'application/pdf');assert.match(r.headers.get('content-disposition'),/^attachment; filename="aves-journal.pdf"/);assert.match(r.headers.get('content-security-policy'),/sandbox/);assert.deepEqual(new Uint8Array(await r.arrayBuffer()),pdf);
});
test('an explicit owner download sends attachment disposition for a photograph or recording',async()=>{
 const h=harness([own,{data:{...row,state:'ready',revision:2},error:null}]);const r=await h.mediaContent(plan,id,null,true);assert.equal(r.status,200);assert.match(r.headers.get('content-disposition'),/^attachment/);assert.equal(r.headers.get('cache-control'),'private, no-store');
});
