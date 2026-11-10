const {test}=require("node:test")
const assert=require("node:assert/strict")
const fs=require("node:fs"),path=require("node:path")
const load=require("./helpers/load-ts.cjs")()
const {initialJourney,inquiryHints,makeJourneyInquiry,journeySummary,contactDestinations}=load("lib/journey-inquiry.ts")
const contact={name:"Test visitor",email:"visitor@example.com",phone:"",reply:"email",language:"English",message:"Please discuss my ideas.",updates:false,website:""}

test("contact destination snapshot matches every supported planning region",()=>{
 assert.deepEqual(Object.keys(contactDestinations).sort(),["australia","colombia","new-zealand"])
 const registry=fs.existsSync(path.join(__dirname,"../content/trip-options.ts"))?load("content/trip-options.ts").countryRegionOptions:load("content/destination-regions.ts").destinationRegions
 for(const [country,data] of Object.entries(contactDestinations))assert.deepEqual(data.regions.map(r=>r.id).sort(),registry[country].map(r=>r.id).sort())
})
test("every regional contact link preserves country and exact region through the shared payload",()=>{
 for(const [country,data] of Object.entries(contactDestinations))for(const region of data.regions){
  const {answers}=inquiryHints(`?country=${country}&region=${region.id}`,"australia")
  const payload=makeJourneyInquiry("journey",answers,contact)
  assert.equal(payload.country,country);assert.equal(payload.region,region.id);assert.equal(payload.updates,false)
  assert.match(payload.message,new RegExp(region.label.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")))
 }
})
test("New Zealand topic becomes a destination-aware journey, while support remains a short message",()=>{
 const nz=inquiryHints("?topic=new-zealand&region=south-island","australia")
 assert.equal(nz.mode,"journey");assert.equal(nz.answers.country,"new-zealand")
 assert.equal(makeJourneyInquiry(nz.mode,nz.answers,contact).country,"new-zealand")
 for(const topic of ["privacy","account","partnership","unsubscribe"]){const hints=inquiryHints(`?topic=${topic}`,"australia");assert.equal(hints.mode,"message");const p=makeJourneyInquiry(hints.mode,hints.answers,{...contact,updates:true},hints.reason);assert.equal(p.updates,false);assert.equal(p.region,"")}
 assert.equal(inquiryHints("?country=constructor&topic=__proto__&region=queensland","colombia").answers.country,"colombia")
})
test("legacy Colombian aliases and tour interests are carried into the common form",()=>{
 const h=inquiryHints("?regions=pacific-choco,sierra-nevada,eastern-plains,amazon&tour=vision","colombia")
 assert.deepEqual(h.answers.regions,["pacific","sierra-nevada-de-santa-marta","llanos","amazonia"])
 assert.deepEqual(h.answers.interests,["photography"])
 assert.equal(makeJourneyInquiry("journey",h.answers,contact).region,"")
})
test("all planning answers are reviewed and transmitted without implying conversion or confirmed arrangements",()=>{
 const answers={...initialJourney("colombia"),regions:["llanos","amazonia"],interests:["birds","culture"],travelWhen:"Flexible in May",duration:"12",partySize:"3",ages:"Two adults and a teenager",pace:"relaxed",birding:"alternate",comfort:"comfortable",experience:"casual",targets:"Scarlet ibis and river forest",budget:"4500",currency:"CAD",practical:"Short walks; vegetarian meals"}
 const payload=makeJourneyInquiry("journey",answers,{...contact,reply:"whatsapp",phone:"+1 555 0100",language:"Spanish"})
 assert.equal(payload.region,"");assert.equal(payload.partySize,3);assert.equal(payload.travelWhen,"Flexible in May")
 for(const row of journeySummary(answers))assert.ok(payload.message.includes(row.value),row.label)
 assert.match(payload.message,/CAD 4500 per person/);assert.match(payload.message,/vegetarian/);assert.match(payload.message,/Spanish/)
 assert.ok(payload.message.length<=5000)
})
test("updates require explicit consent, while unknown, oversized and invalid data fail before transmission",()=>{
 const answers=initialJourney("new-zealand")
 assert.throws(()=>makeJourneyInquiry("updates",answers,contact),/updates/)
 assert.equal(makeJourneyInquiry("updates",answers,{...contact,updates:true}).intent,"waitlist")
 assert.throws(()=>makeJourneyInquiry("journey",{...answers,partySize:"51"},contact),/group size/)
 assert.throws(()=>makeJourneyInquiry("journey",{...answers,budget:"-100"},contact),/budget/)
 assert.throws(()=>makeJourneyInquiry("journey",answers,{...contact,reply:"phone"}),/phone/)
 assert.throws(()=>makeJourneyInquiry("message",answers,{...contact,message:"x".repeat(1201)}),/too long/)
})
