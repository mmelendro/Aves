const {test}=require('node:test')
const assert=require('node:assert/strict')
const load=require('./helpers/load-ts.cjs')()
const {enquiryContext,enquiryHref,enquiryParams}=load('lib/enquiry-entry.ts')

test('enquiry entry preserves supported country, canonical region, tour and intent',()=>{
  for(const [country,region] of [['colombia','eastern-andes'],['australia','tasmania'],['new-zealand','north-island']]){
    const url=new URL(enquiryHref(country,region,'vision'),'https://aves.bio')
    assert.equal(url.pathname,'/contact')
    assert.equal(url.hash,'#inquiry')
    assert.deepEqual(enquiryContext(url.searchParams),{country,region,tour:'vision',intent:'inquiry'})
  }
  assert.equal(enquiryContext(new URLSearchParams('country=colombia&region=snsm')).region,'sierra-nevada-de-santa-marta')
  assert.equal(enquiryContext(new URLSearchParams('country=australia&intent=waitlist')).intent,'waitlist')
  assert.equal(enquiryContext(new URLSearchParams('topic=new-zealand&region=south-island'),'australia').country,'new-zealand')
})

test('enquiry URLs reject foreign regions and arbitrary hints without copying private answers',()=>{
  const query=enquiryParams({country:'australia',region:'eastern-andes',tour:'invented',topic:['account','general'],email:'private@example.com',message:'private answers'})
  assert.deepEqual(enquiryContext(query),{country:'australia',region:'',tour:'',intent:'inquiry'})
  assert.equal(query.has('email'),false)
  assert.equal(query.has('message'),false)
  assert.equal(query.has('topic'),false)
  assert.equal(enquiryContext(new URLSearchParams('country=ecuador')).country,'colombia')
  assert.equal(enquiryContext(new URLSearchParams('country=__proto__&region=constructor')).region,'')
})
