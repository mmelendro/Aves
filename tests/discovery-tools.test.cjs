const {test}=require('node:test'),assert=require('node:assert/strict')
const load=require('./helpers/load-ts.cjs')()
const {discoveryItems,publicFavouritePlaces,searchDiscovery,appendFavouritePlaces}=load('lib/discovery-index.ts')
test('unified search keeps stable public references, accent matching, bounded results and safe pagination',()=>{
 assert.equal(new Set(discoveryItems.map(p=>p.id)).size,discoveryItems.length)
 assert.ok(searchDiscovery('hawea','new-zealand','place').items.some(p=>p.name.includes('Hāwea')))
 assert.ok(searchDiscovery('Nueva Zelanda','','country').items.some(p=>p.countryId==='new-zealand'))
 assert.ok(searchDiscovery('','colombia','region').items.every(p=>p.countryId==='colombia'&&p.kind==='region'))
 const last=searchDiscovery('','','',999999);assert.ok(last.items.length>0&&last.items.length<=30);assert.equal(last.offset%30,0)
 assert.equal(searchDiscovery('a place that does not exist 818181').total,0)
 for(const p of discoveryItems){assert.ok(p.href.startsWith('/'));assert.ok(!p.href.startsWith('//'));assert.ok(!/\/(account|admin|api|auth)(\/|$)/.test(p.href));if(p.sourceUrl)assert.equal(new URL(p.sourceUrl).protocol,'https:')}
 for(const p of publicFavouritePlaces.filter(p=>p.countryId!=='new-zealand')){const url=new URL(p.href,'https://aves.bio');assert.equal(url.searchParams.get('explore'),p.countryId);assert.equal(url.searchParams.get('region'),p.regionId)}
})
test('favourite public places append once without replacing notes, crossing countries or overflowing',()=>{
 const place=publicFavouritePlaces.find(p=>p.countryId==='new-zealand'),message='Keep my earlier notes.'
 const first=appendFavouritePlaces(message,[place.id],'new-zealand');assert.ok(first.message.startsWith(message));assert.ok(first.message.includes(`[${place.id}]`))
 assert.equal(appendFavouritePlaces(first.message,[place.id],'new-zealand').message,first.message)
 assert.ok(appendFavouritePlaces(message,[place.id],'colombia').error)
 assert.equal(appendFavouritePlaces('x'.repeat(5000),[place.id],'new-zealand').message,'x'.repeat(5000))
 assert.ok(appendFavouritePlaces(message,['https://else.test'],'new-zealand').error)
})
test('saved trip comparisons preserve explicit currencies, missing details and original plans',()=>{
 const {compareTripPlans}=load('lib/compare-trip-plans.ts')
 const a={id:'a',title:'First',country:'new-zealand',regions:['south-island'],travelWhen:'',partySize:'',message:'Day 1: original route',questionnaire:{version:1,pace:'relaxed',birding:'daily',comfort:'simple',interests:[],budget:{currency:'NZD',food:0}}}
 const b={...a,id:'b',title:'Second',travelWhen:'January',questionnaire:{...a.questionnaire,budget:{currency:'AUD',food:90}}},before=structuredClone([a,b])
 const rows=compareTripPlans(a,b);assert.equal(rows.find(r=>r.label==='Travel timing').left,'Not specified');assert.equal(rows.find(r=>r.label==='Travel timing').different,true)
 const budget=rows.find(r=>r.label==='Food budget');assert.match(budget.left,/NZD/);assert.match(budget.right,/AUD/);assert.deepEqual([a,b],before)
})
