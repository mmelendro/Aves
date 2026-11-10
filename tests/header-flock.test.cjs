const {test}=require('node:test')
const assert=require('node:assert/strict')
const catalogue=require('../content/header-flocks.json').flocks

test('every configured header context keeps a sourced local flock',async()=>{
 const {selectHeaderFlock,birdFamilies}=await import('../lib/header-flock.mjs')
 for(const [context,flock] of Object.entries(catalogue)){
  const [country,area]=context.split('/')
  assert.equal(selectHeaderFlock(catalogue,country,area==='country'?undefined:area),flock)
  assert.ok(birdFamilies.includes(flock.family),context)
  assert.match(flock.source,/^https:\/\//)
  if(context!=='global')assert.match(flock.scientificName,/^[A-Z][a-z]+ [a-z]+$/)
 }
 assert.equal(selectHeaderFlock(catalogue,'new-zealand','south-island','mountains').name,'Kea')
 assert.equal(selectHeaderFlock(catalogue,'australia','unrecognised'),catalogue['australia/country'])
})
test('family outlines differ and quiet flocks stay within the responsive header',async()=>{
 const {headerFlockGeometry,birdOutline,birdFamilies}=await import('../lib/header-flock.mjs')
 assert.equal(new Set(birdFamilies.map(f=>birdOutline(f))).size,birdFamilies.length)
 for(const width of [320,340,390,640,768,1440,2560])for(const family of birdFamilies){
  const birds=headerFlockGeometry({width,wordCenter:width<640?95:160,navLeft:width-110,navRight:width-20},family)
  assert.ok(birds.length>=2)
  for(const bird of birds){
   assert.ok(Object.values(bird).every(Number.isFinite))
   assert.ok(bird.x>=0 && bird.x+bird.size*1.3<width,`${family} at ${width}`)
   assert.ok(bird.y>=65 && bird.y<100)
  }
 }
})
