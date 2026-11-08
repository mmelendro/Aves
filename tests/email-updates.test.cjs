const {test}=require('node:test')
const assert=require('node:assert/strict')
const loader=require('./helpers/load-ts.cjs')

function harness(authorized=true){
 const calls=[]
 const load=loader({mocks:{
  '@/lib/account-auth':{requireAccountUser:async()=>{if(!authorized){const {AccountError}=load('lib/account-errors.ts');throw new AccountError(401,'Sign in required')}return {user:{id:'verified-actor'}}}},
  '@/lib/account-service':{accountRpc:async(name,args)=>{calls.push({name,args});return {subscribed:args.p_subscribed===true}}},
 }})
 return {calls,route:load('app/api/account/email-updates/route.ts')}
}
test('email preference reads and changes only the verified account; rejects injected identity and foreign origin',async()=>{
 const h=harness()
 assert.equal((await h.route.GET()).status,200)
 const request=(body,origin='https://aves.bio')=>new Request('https://aves.bio/australia/api/account/email-updates',{method:'PUT',headers:{origin,'content-type':'application/json'},body:JSON.stringify(body)})
 assert.equal((await h.route.PUT(request({subscribed:true}))).status,200)
 assert.deepEqual(h.calls[1],{name:'account_email_updates',args:{p_user_id:'verified-actor',p_subscribed:true}})
 assert.equal((await h.route.PUT(request({subscribed:false}))).status,200)
 assert.equal((await h.route.PUT(request({subscribed:true,userId:'someone-else'}))).status,400)
 assert.equal((await h.route.PUT(request({subscribed:true},'https://elsewhere.invalid'))).status,403)
 assert.equal(h.calls.length,3)
})
test('email preferences require verified sign-in for reads and writes',async()=>{
 const h=harness(false)
 assert.equal((await h.route.GET()).status,401)
 assert.equal((await h.route.PUT(new Request('https://aves.bio/australia/api/account/email-updates',{method:'PUT'}))).status,401)
 assert.deepEqual(h.calls,[])
})
