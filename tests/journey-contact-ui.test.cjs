const {test}=require("node:test")
const assert=require("node:assert/strict")
const {componentHarness,nodes,find}=require("./helpers/contact-harness.cjs")
function core(props={},overrides={}){return componentHarness("components/journey-contact-form.tsx","JourneyContactForm",props,overrides)}
function fill(h,name,value){find(h.render(),n=>n.props.name===name).props.onChange({target:{value}})}
function review(h){find(h.render(),n=>n.type==="button"&&Array.isArray(n.props.children)&&n.props.children.includes("Review and reply")).props.onClick()}
function submit(h){return find(h.render(),n=>n.type==="form").props.onSubmit({preventDefault(){}})}

test("Enter before review changes step without sending; support and journey answers remain distinct",async()=>{
 const calls=[];const h=core({initialTopic:"new-zealand"},{fetch:async(url,options)=>{calls.push(JSON.parse(options.body));return{ok:true,json:async()=>({success:true,status:"stored",intent:"inquiry",country:"new-zealand"})}}})
 await submit(h);assert.equal(calls.length,0)
 fill(h,"name","Test visitor");fill(h,"email","visitor@example.com");review(h);await submit(h)
 assert.equal(calls.length,1);assert.equal(calls[0].country,"new-zealand");assert.equal(calls[0].updates,false)
 assert.match(JSON.stringify(h.render()),/has been saved/)
})
test("retry keeps answers and request key, changed data gets a new key, wrong-country receipts fail closed",async()=>{
 const requests=[];const h=core({initialTopic:"privacy"},{fetch:async(url,options)=>{requests.push(options);return{ok:true,json:async()=>({success:true,status:"stored",intent:"inquiry",country:"colombia"})}}})
 fill(h,"name","Test visitor");fill(h,"email","visitor@example.com");fill(h,"message","Please review my privacy request")
 await submit(h);await submit(h)
 assert.equal(requests.length,2);assert.equal(requests[0].headers["Idempotency-Key"],requests[1].headers["Idempotency-Key"])
 assert.match(JSON.stringify(h.render()),/could not confirm/)
 assert.equal(find(h.render(),n=>n.props.name==="email").props.value,"visitor@example.com")
 fill(h,"message","An updated privacy request");await submit(h)
 assert.notEqual(requests[1].headers["Idempotency-Key"],requests[2].headers["Idempotency-Key"])
})
test("same-tick double submission sends once and only a stored same-country receipt reports success",async()=>{
 let finish;let count=0;const h=core({initialTopic:"account"},{fetch:()=>{count++;return new Promise(resolve=>finish=resolve)}})
 fill(h,"name","Test visitor");fill(h,"email","visitor@example.com");fill(h,"message","Please help with my account")
 const first=submit(h);await submit(h);assert.equal(count,1)
 finish({ok:true,json:async()=>({success:true,status:"stored",intent:"inquiry",country:"australia"})});await first
 assert.match(JSON.stringify(h.render()),/has been saved/)
})
