const {test}=require('node:test')
const assert=require('node:assert/strict')
const load=require('./helpers/load-ts.cjs')()
const {birdMediaResource}=load('lib/media-resource.ts')
const {birdData}=load('content/birds.ts')

test('shared bird tracks retain the exact recording, country identity and credits',()=>{
 for(const bird of birdData){
  const resource=birdMediaResource(bird)
  if(!bird.audioFile){assert.equal(resource,null);continue}
  assert.equal(resource.title,bird.commonName)
  assert.equal(resource.kind,'Bird call')
  assert.ok(resource.playback.src.endsWith(bird.audioFile))
  assert.equal(resource.country,bird.id.startsWith('au-')?'australia':bird.id.startsWith('nz-')?'new-zealand':'colombia')
  assert.equal(resource.regionId,bird.regionSlug)
  assert.match(resource.href,/credits/)
  assert.match(resource.description,/do not use playback to attract wildlife/)
 }
})
