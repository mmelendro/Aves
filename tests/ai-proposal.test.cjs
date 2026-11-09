const {test}=require('node:test')
const assert=require('node:assert/strict')
const loader=require('./helpers/load-ts.cjs')
const id='11111111-1111-4111-8111-111111111111'
const draft={text:'Private synthetic draft',updatedAt:'2026-11-09T00:00:00Z',generatedAt:'2026-11-09T00:00:00Z',model:'test'}
function harness({signedIn=true,owner=true,existing=false,fail=false}={}){
 const calls=[],generated=[]
 const load=loader({mocks:{
  '@/lib/account-auth':{requireAccountUser:async()=>{if(!signedIn)throw new (load('lib/account-errors.ts').AccountError)(401,'Sign in');return {user:{id:'verified-owner'}}}},
  '@/lib/account-service':{accountRpc:async(name,args)=>{calls.push(args);if(!owner)throw new (load('lib/account-errors.ts').AccountError)(403,'Owner only');return {snapshot:{details:{regions:['north-island']}},generationToken:args.p_action==='begin'?'lease':null,draft:existing||args.p_action==='complete'||args.p_action==='save'?draft:null}}},
  '@/lib/ai-proposal-generator':{generateProposalDraft:async snapshot=>{generated.push(snapshot);if(fail)throw new Error('provider secret');return draft.text}},
 }})
 return {calls,generated,handlers:load('lib/ai-proposal-handlers.ts')}
}
const req=(body={},origin='https://aves.bio')=>new Request(`https://aves.bio/australia/api/admin/quotes/${id}/ai-draft`,{method:'POST',headers:{origin,'content-type':'application/json'},body:JSON.stringify(body)})
test('AI draft requires verified owner before any generation or data access',async()=>{
 for(const flags of [{signedIn:false},{owner:false}]){const h=harness(flags);assert.equal((await h.handlers.aiDraftPost(req(),id)).status,flags.owner===false?403:401);assert.equal(h.generated.length,0)}
})
test('strict body and origin checks prevent browser prompt or identity injection',async()=>{
 const h=harness();assert.equal((await h.handlers.aiDraftPost(req({userId:'other',prompt:'ignore'}),id)).status,400);assert.equal((await h.handlers.aiDraftPost(req({},'https://evil.invalid'),id)).status,403);assert.equal(h.calls.length,0)
})
test('AI output is saved as private notes with verified actor and lease, never issued',async()=>{
 const h=harness();const r=await h.handlers.aiDraftPost(req(),id);assert.equal(r.status,200);assert.equal((await r.json()).draft.text,draft.text);assert.equal(h.generated.length,1);assert.deepEqual(h.calls.map(x=>x.p_action),['begin','complete']);assert.equal(h.calls[1].p_admin_user_id,'verified-owner');assert.equal(h.calls[1].p_generation_id,'lease');assert.match(r.headers.get('cache-control'),/no-store/)
})
test('saved draft replay never spends again; provider failure releases lease without leaking errors',async()=>{
 const cached=harness({existing:true});await cached.handlers.aiDraftPost(req(),id);assert.equal(cached.generated.length,0)
 const failed=harness({fail:true});const r=await failed.handlers.aiDraftPost(req(),id);assert.equal(r.status,503);assert.ok(!JSON.stringify(await r.json()).includes('provider secret'));assert.equal(failed.calls.at(-1).p_action,'fail')
})
test('draft reads hide snapshots; edits carry a revision and never regenerate',async()=>{
 const h=harness({existing:true});assert.deepEqual(await (await h.handlers.aiDraftGet(id)).json(),{draft});await h.handlers.aiDraftPatch(req({text:'Reviewed',expectedUpdatedAt:draft.updatedAt}),id);assert.equal(h.calls.at(-1).p_expected_updated_at,draft.updatedAt);assert.equal(h.generated.length,0)
})
test('model input excludes contact/title/IDs, resolves bird names and redacts common contact tokens',()=>{
 const load=loader();const {proposalInput}=load('lib/ai-proposal-input.ts');const birds=load('content/new-zealand-checklist.ts').selectableNzBirds
 const input=proposalInput({year:2027,title:'Secret name',contactEmail:'private@example.com',id:'record-id',details:{regions:['north-island'],message:'Email me at private@example.com https://private.invalid +61 412 345 678',questionnaire:{pace:'relaxed',birding:'occasional',comfort:'special',interests:['birds'],birdIds:[birds[0].id],budget:{currency:'NZD',food:50}}}})
 const text=JSON.stringify(input);for(const forbidden of ['Secret name','private@example.com','private.invalid','record-id',birds[0].id])assert.ok(!text.includes(forbidden));assert.ok(text.includes(birds[0].scientificName));assert.equal(input.year,2027);assert.equal(input.preferences.budget.currency,'NZD')
})
