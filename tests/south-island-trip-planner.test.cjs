const {test}=require('node:test')
const assert=require('node:assert/strict')
const load=require('./helpers/load-ts.cjs')()
const p=load('lib/south-island-trip-planner.ts')
const catalogue=load('content/south-island-trip-catalogue.json')
const {selectableNzBirds}=load('content/new-zealand-checklist.ts')
const id=name=>selectableNzBirds.find(b=>b.commonName===name).id
const input=overrides=>({...p.defaultTripInput,birdIds:[id('Kea'),id('Northern Royal Albatross')],days:7,...overrides})

test('reviewed seasons exclude boundary dates and Christmas closures and qualify local access alternatives',()=>{
 const {placeFitsCalendar,tripDayWorkload}=p.southIslandPlanner
 const market=p.tripPlaceById.get('trip-remarkables-market')
 for(const date of ['2026-10-03','2027-04-10'])assert.equal(placeFitsCalendar(market,input({days:1,departureDate:date}),0),true,date)
 for(const date of ['2026-09-26','2026-12-26','2027-04-17','2026-12-23'])assert.equal(placeFitsCalendar(market,input({days:1,departureDate:date}),0),false,date)
 const access=p.tripPlaceById.get('trip-arthurs-pass-information')
 assert.equal(placeFitsCalendar(access,input({days:1,departureDate:'2026-12-25'}),0),false)
 const d=p.buildSouthIslandTrip(input({days:1,areaId:'arthurs-pass',birdIds:[id('Kea')],departureDate:'2026-12-24'}))
 assert.ok(tripDayWorkload(d,0).notes.some(n=>n.includes('Local access alternative')))
 assert.equal(access.indoorAlternative,undefined,'temporary information portacom is not promised as indoor recreation')
})
function storage(){const s=new Map();return{getItem:k=>s.get(k)||null,setItem:(k,v)=>s.set(k,v),removeItem:k=>s.delete(k)}}
test('the broader catalogue covers every requested category, named stays and evidence-scoped food',()=>{
 assert.ok(catalogue.places.length>=40);assert.equal(catalogue.areas.length,15)
 assert.equal(new Set(p.tripPlaces.map(p=>p.id)).size,p.tripPlaces.length)
 for(const c of p.tripCategories)assert.ok(p.tripPlaces.some(p=>p.categories.includes(c.id)),c.id)
 assert.ok(p.tripPlaces.filter(p=>p.categories.includes('stays')).length>=10)
 assert.ok(p.tripPlaces.filter(p=>p.categories.includes('markets')).length>=4)
 for(const place of p.tripPlaces){
  assert.ok(p.tripAreaById.has(place.base));assert.equal(new URL(place.url).protocol,'https:')
  assert.match(place.checkedAt,/^2026-11-(11|12|13)$/)
  assert.ok(place.birdIds.every(id=>selectableNzBirds.some(b=>b.id===id)))
  if(place.tags.includes('organic-ingredients')||place.tags.includes('farm-to-table'))assert.ok(place.eco?.kind==='operator')
 }
 assert.ok(!p.tripPlaces.some(p=>p.name.includes('Curio Scape')),'published closed campsite is not offered')
})
test('selected kea and albatross produce source-linked stops, separate transfers and exactly the requested days',()=>{
 const d=p.buildSouthIslandTrip(input())
 assert.equal(d.days.length,7);assert.equal(p.validTripDraft(d),true)
 assert.deepEqual(p.tripCoverage(d).unmatched,[])
 const transfers=d.days.filter(x=>x.transferFrom);assert.equal(transfers.length,1)
 assert.ok(transfers.every(x=>!x.birdingId&&!x.extraId))
 assert.equal(d.days.filter(x=>x.stayId).length,6);assert.equal(d.days.at(-1).stayId,'')
 assert.ok(d.days.some(x=>x.baseId==='arthurs-pass'));assert.ok(d.days.some(x=>x.baseId==='otago'))
})
test('one-day and short drafts do not promise cross-island coverage or extra nights',()=>{
 for(const days of [1,2,3]){
  const d=p.buildSouthIslandTrip(input({days}))
  assert.equal(d.days.length,days);assert.equal(new Set(d.days.map(d=>d.baseId)).size,1)
  assert.equal(p.tripCoverage(d).unmatched.length,1)
  assert.equal(d.days.filter(x=>x.stayId).length,days-1)
 }
})
test('a fixed base keeps all days local and reports other selected birds as unmatched',()=>{
 const d=p.buildSouthIslandTrip(input({areaId:'arthurs-pass',days:10}))
 assert.ok(d.days.every(x=>x.baseId==='arthurs-pass'&&!x.transferFrom))
 assert.deepEqual(p.tripCoverage(d).unmatched,[id('Northern Royal Albatross')])
})
test('managed or sanctuary opportunities can be excluded without falsely covering takahē',()=>{
 const d=p.buildSouthIslandTrip(input({birdIds:[id('South Island Takahe')],includeManaged:false}))
 assert.deepEqual(p.tripCoverage(d).covered,[])
 assert.deepEqual(p.tripCoverage(d).unmatched,[id('South Island Takahe')])
 assert.ok(d.days.every(x=>!x.birdingId||p.tripPlaceById.get(x.birdingId).encounter==='wild'))
})
test('unmapped birds are never invented as stop matches',()=>{
 const d=p.buildSouthIslandTrip(input({birdIds:[id('Great Spotted Kiwi')]}))
 assert.deepEqual(p.tripCoverage(d).covered,[])
 assert.ok(p.tripDraftText(d).includes('No scheduled sourced stop yet: Great Spotted Kiwi'))
})
test('invalid length, bird, area and category inputs fail before route generation',()=>{
 for(const patch of [{days:0},{days:31},{days:2.5},{areaId:'north-island'},{birdIds:['fake']},{birdIds:[id('Kea'),id('Kea')]},{interests:['fake']},{includeManaged:null}]){
  assert.equal(p.validTripInput(input(patch)),false)
  assert.throws(()=>p.buildSouthIslandTrip(input(patch)))
 }
})
test('all supported trip lengths remain valid, bounded and retain a final departure day',()=>{
 for(let days=1;days<=30;days++){
  const d=p.buildSouthIslandTrip(input({days}));assert.equal(p.validTripDraft(d),true,days)
  assert.equal(d.days.length,days);assert.equal(d.days.at(-1).stayId,'')
 }
})
test('edited stops must belong to their base and category; transfer days cannot become imaginary outings',()=>{
 const d=p.buildSouthIslandTrip(input())
 for(const patch of [{birdingId:'trip-taiaroa'},{stayId:'trip-onsen'},{extraId:'https://example.invalid'},{baseId:'fake'}]){
  const bad=structuredClone(d);bad.days[0]={...bad.days[0],...patch};assert.equal(p.validTripDraft(bad),false)
 }
 const transfer=structuredClone(d),i=transfer.days.findIndex(d=>d.transferFrom)
 transfer.days[i].birdingId='trip-taiaroa';assert.equal(p.validTripDraft(transfer),false)
 const changed=structuredClone(d);changed.days[1].baseId='lakes';assert.equal(p.validTripDraft(changed),false)
})
test('accommodation searches are labelled choices, not inventory or eco certification',()=>{
 const u=new URL(p.airbnbAreaUrl('arthurs-pass'))
 assert.equal(u.origin,'https://www.airbnb.com');assert.equal(u.searchParams.get('query'),'Arthurs Pass, New Zealand')
 assert.equal(p.airbnbAreaUrl('fake'),'')
 const d=p.buildSouthIslandTrip(input({areaId:'catlins',days:2,birdIds:[id('Yellow-eyed Penguin')]}))
 d.days[0].stayId='airbnb:catlins';assert.equal(p.validTripDraft(d),true);assert.match(d.days[0].stayId,/^airbnb:/);assert.match(p.tripDraftText(d),/listing to choose/)
})
test('external directions contain public base labels only and never invent road times',()=>{
 const u=new URL(p.tripDirectionsUrl('arthurs-pass','otago'))
 assert.equal(u.searchParams.get('api'),'1');assert.equal(u.searchParams.get('origin'),'Arthurs Pass, New Zealand')
 assert.equal(u.searchParams.get('destination'),'Dunedin, New Zealand');assert.equal(u.searchParams.has('key'),false)
 assert.equal(p.tripDirectionsUrl('fake','otago'),'')
 assert.doesNotMatch(p.tripDraftText(p.buildSouthIslandTrip(input())),/\d+ (hours|minutes) driving/)
})
test('itinerary import preserves existing guest notes, avoids exact retry duplication and rejects overflow',()=>{
 const d=p.buildSouthIslandTrip(input()),original='My original travel notes.'
 const result=p.mergeTripNotes(original,d)
 assert.ok(!result.error);assert.ok(result.message.startsWith(original));assert.match(result.message,/Day 7:/)
 assert.equal(p.mergeTripNotes(result.message,d).message,result.message)
 const full='x'.repeat(59990);assert.equal(p.mergeTripNotes(full,d).message,full);assert.ok(p.mergeTripNotes(full,d).error)
})
test('tab draft expiry, corruption, blocked storage and server-confirmed consumption preserve pending work',()=>{
 const s=storage(),d=p.buildSouthIslandTrip(input())
 assert.equal(p.writeTripDraft(s,d,100),true);assert.deepEqual(p.readTripDraft(s,101),d)
 assert.equal(p.readTripDraft(s,99),null)
 p.writeTripDraft(s,d,100);assert.equal(p.readTripDraft(s,86400101),null)
 assert.equal(p.writeTripDraft({setItem(){throw Error('denied')}},d),false)
 p.writeTripDraft(s,d);p.consumeTripDraft(s,'No saved itinerary here');assert.deepEqual(p.readTripDraft(s),d)
 p.consumeTripDraft(s,p.tripDraftText(d));assert.equal(p.readTripDraft(s),null)
})

const {componentHarness,nodes,find}=require('./helpers/component-harness.cjs')
test('private editor imports the explicit itinerary without replacing guest notes or region choices',()=>{
 const s=storage(),draft=p.buildSouthIslandTrip(input({days:3,areaId:'arthurs-pass',birdIds:[id('Kea')]}))
 p.writeTripDraft(s,draft)
 const existing={id:'synthetic',title:'Synthetic existing brief',country:'new-zealand',regions:['north-island'],message:'Keep my earlier ideas.'}
 const h=componentHarness('components/account/trip-plan-editor.tsx','TripPlanEditor',{plan:existing,onSaved(){},onCancel(){}},{window:{sessionStorage:s},runEffects:true})
 h.render();let tree=h.render()
 find(tree,n=>n.type==='button'&&n.props.children==='Add Itinerary to Notes').props.onClick()
 tree=h.render()
 const message=find(tree,n=>n.props.name==='message').props.value
 assert.ok(message.startsWith(existing.message));assert.match(message,/Day 3:/)
 assert.ok(nodes(tree).some(n=>n.type==='input'&&n.props.name==='regions'&&n.props.value==='north-island'&&n.props.checked))
 assert.ok(nodes(tree).some(n=>n.type==='input'&&n.props.name==='regions'&&n.props.value==='south-island'&&n.props.checked))
 find(tree,n=>n.type==='button'&&n.props.children==='Add Itinerary to Notes').props.onClick()
 assert.equal(find(h.render(),n=>n.props.name==='message').props.value,message)
 assert.equal(existing.message,'Keep my earlier ideas.')
})
test('private editor refuses itinerary overflow while retaining notes, birds and regions',()=>{
 const s=storage(),draft=p.buildSouthIslandTrip(input({days:3,areaId:'arthurs-pass'}));p.writeTripDraft(s,draft)
 const existing={id:'synthetic',title:'Synthetic full brief',country:'new-zealand',regions:['north-island'],message:'x'.repeat(59990)}
 const h=componentHarness('components/account/trip-plan-editor.tsx','TripPlanEditor',{plan:existing,onSaved(){},onCancel(){}},{window:{sessionStorage:s},runEffects:true})
 h.render();let tree=h.render();find(tree,n=>n.type==='button'&&n.props.children==='Add Itinerary to Notes').props.onClick();tree=h.render()
 assert.equal(find(tree,n=>n.props.name==='message').props.value,existing.message)
 assert.ok(nodes(tree).some(n=>n.type==='input'&&n.props.name==='regions'&&n.props.value==='south-island'&&!n.props.checked))
})

test('fixed start and finish cities are honoured for every alternative, including a return loop',()=>{
 for(const [startCity,endCity] of [['christchurch','queenstown'],['christchurch','christchurch'],['nelson','invercargill'],['picton','greymouth']]){
  const value=input({days:9,startCity,endCity,departureDate:'2027-01-19'})
  const plans=p.buildSouthIslandPlans(value);assert.ok(plans.length>=1&&plans.length<=3)
  for(const {draft}of plans){
   assert.equal(draft.days.length,9);assert.equal(p.validTripDraft(draft),true)
   assert.equal(draft.days[0].baseId,p.gatewayById.get(startCity).baseId)
   assert.equal(draft.days.at(-1).baseId,p.gatewayById.get(endCity).baseId)
   assert.equal(p.tripDayDate(draft.input,0),'2027-01-11');assert.equal(p.tripDayDate(draft.input,8),'2027-01-19')
  }
 }
})
test('all endpoint/day combinations tested remain valid or explicitly reject an impossible single-day base transfer',()=>{
 for(const days of [1,2,3,4,5,7,14,30])for(const style of ['birds','slower','variety']){
  const value=input({days,startCity:'christchurch',endCity:'queenstown'})
  if(days===1){assert.throws(()=>p.buildSouthIslandTrip(value,style));continue}
  const d=p.buildSouthIslandTrip(value,style);assert.equal(p.validTripDraft(d),true,days+' '+style);assert.equal(d.days.length,days)
 }
})
test('departure dates reject invalid calendar values and support leap-day and month boundaries',()=>{
 for(const departureDate of ['2027-02-29','2026-02-30','11/11/2026','not a date'])assert.equal(p.validTripInput(input({departureDate})),false)
 assert.equal(p.tripDayDate(input({days:3,departureDate:'2028-03-01'}),0),'2028-02-28')
 assert.equal(p.validTripInput(input({startCity:'unknown'})),false)
})
test('markets require a date, matching weekday and reviewed seasonal months',()=>{
 const market=p.tripPlaceById.get('trip-chch-market')
 assert.equal(p.marketFitsDay(market,input({departureDate:'',days:1}),0),false)
 assert.equal(p.marketFitsDay(market,input({departureDate:'2027-01-16',days:1}),0),true)
 assert.equal(p.marketFitsDay(market,input({departureDate:'2027-01-17',days:1}),0),false)
 const seasonal=p.tripPlaceById.get('trip-remarkables-market')
 assert.equal(p.marketFitsDay(seasonal,input({departureDate:'2027-07-17',days:1}),0),false)
 const d=p.buildSouthIslandTrip(input({areaId:'christchurch',birdIds:[],days:3,departureDate:'2027-01-18',interests:['markets']}))
 assert.ok(d.days.every((day,i)=>!day.extraId||p.marketFitsDay(p.tripPlaceById.get(day.extraId),d.input,i)))
})
test('category allowances distinguish nights, daily amounts and per-experience amounts without quoting prices',()=>{
 const d=p.buildSouthIslandTrip(input({days:5,areaId:'arthurs-pass',birdIds:[id('Kea')],currency:'NZD',allowances:{accommodation:100,food:50,activities:40,transport:30}}))
 const b=p.tripAllowanceSummary(d)
 assert.equal(b.total,100*4+50*5+40*5+30*5);assert.equal(b.complete,true)
 assert.match(p.tripDraftText(d),/not quoted prices/)
 const perExperience={...d,input:{...d.input,activityBasis:'experience'}}
 const e=p.tripAllowanceSummary(perExperience);assert.equal(e.rows.find(r=>r.id==='activities').units,e.experiences)
 const partial={...d,input:{...d.input,allowances:{food:0}}};assert.equal(p.tripAllowanceSummary(partial).complete,false);assert.equal(p.tripAllowanceSummary(partial).total,0)
 for(const allowances of [{food:-1},{food:10001},{food:1.5},{madeUp:5}])assert.equal(p.validTripInput(input({allowances})),false)
 assert.equal(p.validTripInput(input({currency:'made-up'})),false)
})
test('route suggestions are distinct, budget and endpoint choices survive tab storage, and city links exclude dates',()=>{
 const value=input({days:10,startCity:'wanaka',endCity:'christchurch',departureDate:'2027-01-20',allowances:{food:70}})
 const options=p.buildSouthIslandPlans(value);assert.ok(options.length>=2)
 assert.equal(new Set(options.map(o=>JSON.stringify(o.draft.days))).size,options.length)
 const s=storage();p.writeTripDraft(s,options[0].draft);assert.deepEqual(p.readTripDraft(s).input,value)
 const d=options[0].draft,i=d.days.findIndex(x=>x.transferFrom),u=new URL(p.tripTransferUrl(d,i))
 assert.equal(u.searchParams.get('origin'),'Wānaka, New Zealand');assert.ok(!u.href.includes(value.departureDate))
})

test('varied fixed-endpoint routes avoid the reviewed north-south backtrack',()=>{
 const d=p.buildSouthIslandTrip(input({days:10,startCity:'christchurch',endCity:'queenstown',interests:['food','hikes','ecotourism','markets','hot-springs']}),'variety')
 const bases=d.days.filter((day,i)=>i===0||day.baseId!==d.days[i-1].baseId).map(d=>d.baseId)
 assert.equal(bases[0],'christchurch');assert.equal(bases.at(-1),'lakes')
 assert.ok(bases.indexOf('kaikoura')<bases.indexOf('otago'),bases.join(' > '))
 assert.deepEqual(p.tripCoverage(d).unmatched,[])
})

test('the modular day editor limits transfer and fixed departure days while retaining editable stays',()=>{
 const {componentHarness,nodes,find}=require('./helpers/component-harness.cjs')
 const draft=p.buildSouthIslandTrip(input({startCity:'christchurch',endCity:'queenstown',days:7}))
 const index=draft.days.findIndex(day=>day.transferFrom)
 let patch
 const h=componentHarness('components/trip-planner/trip-day-card.tsx','default',{id:'day-test',draft,index,onChange:value=>{patch=value}},{context:()=>p.southIslandPlanner})
 const tree=h.render(),selects=nodes(tree).filter(n=>n.type==='select')
 assert.equal(selects.length,1,'a transfer day edits its overnight, not an impossible extra outing')
 const stay=selects[0],value=`airbnb:${draft.days[index].baseId}`
 stay.props.onChange({target:{value}})
 assert.deepEqual(patch,{stayId:value})
 assert.ok(nodes(tree).some(n=>n.type==='a'&&n.props.href?.includes('google.com/maps/dir/')))
 const last=componentHarness('components/trip-planner/trip-day-card.tsx','default',{id:'day-test',draft,index:draft.days.length-1,onChange(){assert.fail('departure is unscheduled')}},{context:()=>p.southIslandPlanner}).render()
 assert.equal(nodes(last).filter(n=>n.type==='select').length,0)
})
test('the modular budget summary preserves per-person nights and explicit zero without inventing prices',()=>{
 const {componentHarness,nodes}=require('./helpers/component-harness.cjs')
 const draft=p.buildSouthIslandTrip(input({days:7,allowances:{accommodation:100,food:0}}))
 const tree=componentHarness('components/trip-planner/trip-allowance-summary.tsx','default',{draft},{context:()=>p.southIslandPlanner}).render()
 const text=JSON.stringify(tree)
 assert.match(text,/600/);assert.match(text,/nights/);assert.match(text,/other costs remain open/)
 assert.ok(nodes(tree).some(n=>n.type==='td'&&n.props.children==='NZ$0.00'))
 assert.match(text,/not a priced proposal/)
})
