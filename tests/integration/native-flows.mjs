/** Real SDK, Auth, HTTP and PostgreSQL checks, using disposable synthetic data. */
export async function runFlows(c) {
  const {assert,check}=c
  const status=(result,expected=200)=>assert.equal(result.status,expected,JSON.stringify(result.data))
  const write=(path,jar,body,method='POST',id)=>c.request(path,{jar,body,method,headers:id?{'Idempotency-Key':id}:{}})
  const login=async(guest,{legacy=false}={})=>{
    const jar=new c.CookieJar(),client=c.authClient(jar,{legacy})
    const {error}=await client.auth.signInWithPassword({email:guest.email,password:guest.password})
    assert.equal(error,null,error?.message)
    return {...guest,jar,client}
  }
  let guest,other,owner
  const plans={}

  await check('email signup requires confirmation, and SMTP confirmation plus PKCE establish the root account session',async()=>{
    guest=await c.signup('guest-a@example.test')
    const result=await c.request('/api/account/plans',{jar:guest.jar});status(result)
    assert.deepEqual(result.data.plans,[]);assert.equal(result.data.isAdmin,false)
    const pending=await c.signup('unconfirmed@example.test',{confirm:false})
    const attempt=await pending.client.auth.signInWithPassword({email:pending.email,password:pending.password})
    assert(attempt.error);assert.equal(attempt.error.code,'email_not_confirmed')
    status(await c.request('/api/account/plans',{jar:pending.jar}),401)
    other=await c.signup('guest-b@example.test')
    owner=await c.signup('owner@example.test')
    await c.sql.query('insert into private.site_admins(user_id,grant_note) values($1,$2)',[owner.id,'Disposable QA owner only'])
  })

  await check('Australia, Colombia and New Zealand drafts persist through real user-scoped HTTP and database writes',async()=>{
    const questionnaire={version:1,pace:'relaxed',birding:'alternate',comfort:'comfortable',interests:['birds','scenery'],birdIds:['nz-de1ba81fa03b']}
    for(const [country,region] of [['australia','tasmania'],['colombia','central-andes'],['new-zealand','south-island']]){
      const body={id:c.randomUUID(),title:'QA '+country,country,regions:[region],travelWhen:'Flexible',partySize:'2',message:'Synthetic planning check',...(country==='new-zealand'?{questionnaire}:{})}
      const response=await write('/api/account/plans',guest.jar,body,'POST',body.id);status(response)
      assert.equal(response.data.plan.country,country);assert.deepEqual(response.data.plan.regions,[region])
      if(country==='new-zealand')assert.deepEqual(response.data.plan.questionnaire,questionnaire)
      plans[country]={body,plan:response.data.plan}
      const row=(await c.sql.query('select user_id,details from public.trip_plans where id=$1',[body.id])).rows[0]
      assert.equal(row.user_id,guest.id);assert.equal(row.details.country||'australia',country)
    }
    assert.equal((await c.sql.query('select count(*)::int as n from public.trip_plans')).rows[0].n,3)
  })

  await check('same-key retries preserve one saved plan and reject changed payloads',async()=>{
    const {body}=plans.australia
    status(await write('/api/account/plans',guest.jar,body,'POST',body.id))
    status(await write('/api/account/plans',guest.jar,{...body,title:'Changed retry'},'POST',body.id),409)
    assert.equal((await c.sql.query('select count(*)::int as n from public.trip_plans')).rows[0].n,3)
  })

  await check('a new password session reopens all countries, saves an edit and rejects a stale tab',async()=>{
    guest=await login(guest)
    const reopened=await c.request('/api/account/plans',{jar:guest.jar});status(reopened)
    assert.deepEqual(reopened.data.plans.map(x=>x.country).sort(),['australia','colombia','new-zealand'])
    const {id,...values}=plans.colombia.body
    const update={...values,title:'Edited Colombia plan',expectedUpdatedAt:plans.colombia.plan.updatedAt}
    const edited=await write('/api/account/plans/'+id,guest.jar,update,'PATCH');status(edited)
    assert.notEqual(edited.data.plan.updatedAt,update.expectedUpdatedAt);plans.colombia.plan=edited.data.plan
    status(await write('/api/account/plans/'+id,guest.jar,{...update,title:'Stale edit'},'PATCH'),409)
    assert.equal((await c.sql.query('select title from public.trip_plans where id=$1',[id])).rows[0].title,'Edited Colombia plan')
  })

  await check('existing NZ briefs accept bounded budgets and retain them after reopen and edits without currency conversion',async()=>{
    const entry=plans['new-zealand'],id=entry.plan.id
    for(const currency of ['NZD','AUD','USD','CAD','EUR','GBP']){
      const budget={currency,accommodation:0,food:450,activities:10000}
      const {id:ignored,...fields}=entry.body
      const questionnaire={...fields.questionnaire,budget}
      const saved=await write('/api/account/plans/'+id,guest.jar,{...fields,questionnaire,expectedUpdatedAt:entry.plan.updatedAt},'PATCH');status(saved)
      assert.deepEqual(saved.data.plan.questionnaire.budget,budget)
      entry.body={...entry.body,questionnaire};entry.plan=saved.data.plan
      const row=(await c.sql.query('select details from public.trip_plans where id=$1',[id])).rows[0]
      assert.deepEqual(row.details.questionnaire.budget,budget)
    }
    guest=await login(guest)
    const reopened=await c.request('/api/account/plans',{jar:guest.jar});status(reopened)
    assert.deepEqual(reopened.data.plans.find(plan=>plan.id===id).questionnaire,entry.body.questionnaire)
    const hidden=await other.client.from('trip_plans').select('details').eq('id',id)
    assert.equal(hidden.error,null);assert.deepEqual(hidden.data,[])
    const {id:ignored,...fields}=entry.body
    status(await write('/api/account/plans/'+id,other.jar,{...fields,expectedUpdatedAt:entry.plan.updatedAt},'PATCH'),404)
  })

  await check('the database budget validator rejects malformed amounts and preserves an undecided category',async()=>{
    const valid=plans['new-zealand'].body
    const {id,title,...details}=valid
    for(const budget of [null,{}, {currency:'XXX',food:20}, {currency:'AUD',food:-1}, {currency:'AUD',food:10001}, {currency:'AUD',food:0.5}, {currency:'AUD',food:'20'}, {currency:'AUD',food:null}, {currency:'AUD',food:20,role:'owner'}]){
      const payload={...details,questionnaire:{...details.questionnaire,budget}}
      assert.equal((await c.sql.query('select public.trip_details_valid($1::jsonb) as valid',[JSON.stringify(payload)])).rows[0].valid,false)
    }
    const partial={...details,questionnaire:{...details.questionnaire,budget:{currency:'NZD',accommodation:0}}}
    assert.equal((await c.sql.query('select public.trip_details_valid($1::jsonb) as valid',[JSON.stringify(partial)])).rows[0].valid,true)
  })

  await check('another account cannot read or edit plans, become an owner or bypass database row permissions',async()=>{
    const id=plans.australia.plan.id
    const list=await c.request('/api/account/plans',{jar:other.jar});status(list);assert.deepEqual(list.data.plans,[])
    const {id:ignored,...values}=plans.australia.body
    status(await write('/api/account/plans/'+id,other.jar,{...values,expectedUpdatedAt:plans.australia.plan.updatedAt},'PATCH'),404)
    status(await c.request('/api/admin/quotes',{jar:other.jar}),403)
    const rows=await other.client.from('trip_plans').select('id').eq('id',id)
    assert.equal(rows.error,null,JSON.stringify(rows.error));assert.deepEqual(rows.data,[])
    const forged=await other.client.from('trip_plans').insert({id:c.randomUUID(),user_id:guest.id,title:'Forged owner',details:{regions:['Tasmania'],travelWhen:'',partySize:'2',message:''},create_payload_hash:'a'.repeat(64)})
    assert.equal(forged.error?.code,'42501')
    const rpc=await other.client.rpc('list_admin_quotes',{p_admin_user_id:owner.id,p_limit:100})
    assert.equal(rpc.error?.code,'42501','A visitor cannot invoke the service-only RPC even with an owner ID')
  })

  await check('legacy Australian cookies migrate to root without losing the country query or overwriting a newer user',async()=>{
    const legacy=await login(guest,{legacy:true}),next='/account?country=new-zealand&region=south-island'
    assert(!legacy.jar.getAll(c.appUrl).some(x=>x.name.startsWith('aves-au-auth')))
    const result=await c.request('/australia/auth/session?'+new URLSearchParams({next}),{jar:legacy.jar})
    status(result,303);assert.equal(result.headers.get('location'),next)
    assert(legacy.jar.items.some(x=>/^aves-auth(?:\.\d+)?$/.test(x.name)&&x.path==='/'))
    assert(!legacy.jar.items.some(x=>/^aves-au-auth(?:\.\d+)?$/.test(x.name)))
    status(await c.request('/api/account/plans',{jar:legacy.jar}))
    const oldOther=await login(other,{legacy:true}),combined=await login(guest)
    combined.jar.items.push(...oldOther.jar.items)
    status(await c.request('/australia/auth/session?next=%2Faccount',{jar:combined.jar}),303)
    const current=await c.authClient(combined.jar).auth.getUser()
    assert.equal(current.data.user.id,guest.id)
    assert(!combined.jar.items.some(x=>/^aves-au-auth(?:\.\d+)?$/.test(x.name)))
  })

  await check('New Zealand quote submission freezes the private brief, notifies once and prevents guest edits',async()=>{
    const {plan}=plans['new-zealand'],id=c.randomUUID(),body={contactName:'Synthetic Guest',expectedUpdatedAt:plan.updatedAt}
    const count=c.appMessages.length
    const response=await write('/api/account/plans/'+plan.id+'/quote-requests',guest.jar,body,'POST',id);status(response)
    assert.equal(response.data.status,'stored');assert.equal(response.data.plan.status,'quote_requested')
    const quote=(await c.sql.query('select * from public.quote_requests where id=$1',[response.data.requestId])).rows[0]
    assert.deepEqual(quote.plan_snapshot.details.questionnaire,plans['new-zealand'].body.questionnaire)
    assert.equal(quote.notification_status,'accepted');assert.equal(c.appMessages.length,count+1)
    assert(!c.appMessages.at(-1).payload.text.includes('nz-de1ba81fa03b'),'Private questionnaire must remain out of email')
    status(await write('/api/account/plans/'+plan.id+'/quote-requests',guest.jar,body,'POST',id))
    assert.equal(c.appMessages.length,count+1)
    const {id:ignored,...values}=plans['new-zealand'].body
    status(await write('/api/account/plans/'+plan.id,guest.jar,{...values,expectedUpdatedAt:response.data.plan.updatedAt},'PATCH'),409)
    plans.quote=quote
  })

  await check('only the owner can draft and issue a proposal, which becomes visible only to its guest',async()=>{
    const quoteId=plans.quote.id,id=c.randomUUID()
    const details={id,totalCents:120000,currency:'AUD',itinerary:'Synthetic itinerary',inclusions:'Guiding',exclusions:'Flights',validUntil:null}
    const path='/api/admin/quotes/'+quoteId+'/proposals'
    status(await write(path,other.jar,details,'POST',id),403)
    const inbox=await c.request('/api/admin/quotes',{jar:owner.jar});status(inbox);assert.equal(inbox.data.quotes.length,1)
    assert.deepEqual(inbox.data.quotes[0].plan.questionnaire.budget,plans['new-zealand'].body.questionnaire.budget)
    const response=await write(path,owner.jar,details,'POST',id);status(response)
    status(await write(path,owner.jar,details,'POST',id))
    const hidden=await c.request('/api/account/proposals',{jar:guest.jar});status(hidden);assert.deepEqual(hidden.data.proposals,[])
    const count=c.appMessages.length,sendId=c.randomUUID(),revision={expectedUpdatedAt:response.data.proposal.updatedAt}
    const sent=await write('/api/admin/proposals/'+id+'/send',owner.jar,revision,'POST',sendId);status(sent)
    assert.equal(sent.data.proposal.status,'sent');assert.equal(sent.data.proposal.notificationStatus,'accepted')
    status(await write('/api/admin/proposals/'+id+'/send',owner.jar,revision,'POST',sendId))
    assert.equal(c.appMessages.length,count+1);assert.equal(c.appMessages.at(-1).payload.to,guest.email)
    const visible=await c.request('/api/account/proposals',{jar:guest.jar});status(visible);assert.equal(visible.data.proposals[0].id,id)
    const absent=await c.request('/api/account/proposals',{jar:other.jar});status(absent);assert.deepEqual(absent.data.proposals,[])
    const {id:ignored,...values}=details
    status(await write('/api/admin/proposals/'+id,owner.jar,{...values,expectedUpdatedAt:sent.data.proposal.updatedAt},'PATCH'),409)
  })

  await check('country enquiries save durable receipts, versioned consent and one notification despite retries',async()=>{
    for(const [country,region,updates] of [['australia','tasmania',true],['colombia','central-andes',false],['new-zealand','south-island',true]]){
      const id=c.randomUUID(),count=c.appMessages.length
      const body={country,region,name:'Synthetic Inquiry',email:'inquiry-'+country+'@example.test',intent:'inquiry',updates,message:'Synthetic inquiry'}
      const result=await write('/api/inquiries',null,body,'POST',id);status(result);assert.equal(result.data.status,'stored');assert.equal(result.data.country,country)
      status(await write('/api/inquiries',null,body,'POST',id));assert.equal(c.appMessages.length,count+1)
      const row=(await c.sql.query('select id,country,notification_status from private.contact_requests where idempotency_key=$1',[id])).rows[0]
      assert.equal(row.country,country);assert.equal(row.notification_status,'accepted')
      const events=(await c.sql.query('select consent_version from private.consent_events where contact_request_id=$1',[row.id])).rows
      assert.equal(events.length,updates?1:0)
      if(updates)assert.match(events[0].consent_version,new RegExp('^'+(country==='australia'?'au':country==='colombia'?'co':'nz')+'-'))
      status(await write('/api/inquiries',null,{...body,message:'Changed retry'},'POST',id),409)
    }
  })

  await check('legacy Colombian and Australian enquiry URLs store in the same shared backend',async()=>{
    const coId=c.randomUUID(),auId=c.randomUUID()
    const co={firstName:'Synthetic',lastName:'Legacy',email:'legacy-co@example.test',message:'Compatibility check',regions:['central-andes'],updates:false}
    // The compatibility adapter accepts the established canonical production
    // origin. Next dev normalizes its request URL to localhost internally.
    status(await c.request('/api/contact',{method:'POST',body:co,headers:{'Idempotency-Key':coId,Origin:'https://aves.bio'}}))
    status(await write('/australia/api/contact',null,{name:'Synthetic Legacy',email:'legacy-au@example.test',intent:'inquiry',updates:false,region:'Tasmania'},'POST',auId))
    const rows=(await c.sql.query('select country from private.contact_requests where idempotency_key=any($1::uuid[]) order by country',[[coId,auId]])).rows
    assert.deepEqual(rows.map(x=>x.country),['australia','colombia'])
  })

  await check('notification rejection preserves the stored enquiry and records a distinct failure',async()=>{
    c.setMailFailure(true)
    const id=c.randomUUID(),body={name:'Synthetic Failure',email:'mail-failure@example.test',intent:'inquiry',updates:false,region:'Tasmania'}
    try {const result=await write('/api/inquiries',null,body,'POST',id);status(result);assert.equal(result.data.status,'stored')}
    finally {c.setMailFailure(false)}
    const row=(await c.sql.query('select notification_status,notification_error_code from private.contact_requests where idempotency_key=$1',[id])).rows[0]
    assert.equal(row.notification_status,'failed');assert.equal(row.notification_error_code,'email_provider_rejected')
    status(await write('/api/inquiries',null,{...body,intent:'waitlist'},'POST',c.randomUUID()),400)
    const denied=await other.client.from('contact_requests').select('*')
    assert(denied.error,'Private contact records cannot be read through the visitor API')
  })

  await check('password recovery uses a one-time email callback, changes credentials and sign-out revokes refresh',async()=>{
    const jar=new c.CookieJar(),client=c.authClient(jar),before=c.smtpMessages.length
    const reset=await client.auth.resetPasswordForEmail(guest.email,{redirectTo:c.appUrl+'/australia/auth/callback?next=%2Faccount%2Freset-password'})
    assert.equal(reset.error,null,reset.error?.message)
    const mail=await c.waitMail(before,guest.email),link=c.mailLink(mail)
    const confirmed=await c.request(link,{jar,follow:true});status(confirmed);assert.equal(new URL(confirmed.url).pathname,'/account/reset-password')
    const recovered=c.authClient(jar),password='AVES-new-local-'+c.randomUUID()
    const changed=await recovered.auth.updateUser({password});assert.equal(changed.error,null,changed.error?.message)
    const old=c.authClient(new c.CookieJar()),invalid=await old.auth.signInWithPassword({email:guest.email,password:guest.password});assert(invalid.error)
    guest=await login({...guest,password})
    const replay=await c.request(link,{jar:new c.CookieJar()});assert.equal(replay.status,303)
    assert(new URL(replay.headers.get('location'),c.appUrl).searchParams.has('error'),'Consumed email link must not create another session')
    const session=await guest.client.auth.getSession(),refreshToken=session.data.session.refresh_token
    const signedOut=await guest.client.auth.signOut({scope:'local'});assert.equal(signedOut.error,null,signedOut.error?.message)
    status(await c.request('/api/account/plans',{jar:guest.jar}),401)
    const revoked=await c.authClient(new c.CookieJar()).auth.refreshSession({refresh_token:refreshToken});assert(revoked.error)
  })

  await check('an owned draft deletes through the real API with revision protection',async()=>{
    guest=await login(guest)
    const {plan}=plans.australia
    status(await write('/api/account/plans/'+plan.id,guest.jar,{expectedUpdatedAt:plan.updatedAt},'DELETE'))
    assert.equal((await c.sql.query('select count(*)::int as n from public.trip_plans where id=$1',[plan.id])).rows[0].n,0)
  })
}
