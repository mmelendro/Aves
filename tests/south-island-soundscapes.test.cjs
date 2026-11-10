const {test}=require('node:test')
const assert=require('node:assert/strict')
const fs=require('node:fs')
const path=require('node:path')
const crypto=require('node:crypto')
const load=require('./helpers/load-ts.cjs')()
test('authentic Canterbury source assets keep reuse rights, provenance and exact derived hashes',()=>{
 const {southIslandSoundscapes:tracks,southIslandSoundscape:choose}=load('content/south-island-soundscapes.ts')
 const provenance=load('content/south-island-soundscape-provenance.json')
 assert.equal(tracks.length,3);assert.equal(choose('all').id,'forest');assert.equal(choose('mountains'),null)
 for(const track of tracks){
  assert.match(track.source,/^https:\/\/freesound.org\/people\/Desmond178\/sounds\/\d+\/$/)
  const asset=provenance.assets.find(a=>a.path===track.src)
  assert.ok(asset);assert.equal(asset.excerptStart,track.excerptStart);assert.equal(asset.excerptSeconds,60)
  const data=fs.readFileSync(path.join(__dirname,'../public',track.src))
  assert.equal(crypto.createHash('sha256').update(data).digest('hex'),asset.sha256)
  assert.ok(data.length<800000,'Opt-in excerpt stays below 800KB')
 }
 assert.equal(provenance.licence,'CC0 1.0')
})

test('all foreground players must stop before ambience can return, with unknown embeds held separate',()=>{
 const {foregroundMediaStatus:status}=load('lib/media-focus.ts')
 const playing={paused:false,ended:false,muted:false,volume:1},paused={...playing,paused:true}
 assert.equal(status([playing,paused],[]).busy,true)
 assert.equal(status([paused,paused],[]).busy,false)
 assert.equal(status([{...playing,muted:true}],[]).busy,false)
 assert.equal(status([paused],['playing']).busy,true)
 assert.equal(status([],['unknown']).uncertain,true)
 assert.equal(status([],[],true).busy,true)
})

test('foreground intent is announced synchronously before play and released after rejection',async()=>{
 const events=[]
 const custom=require('./helpers/load-ts.cjs')({globals:{window:{dispatchEvent:e=>events.push(e.type)}}})
 const {playForegroundMedia}=custom('lib/media-focus.ts')
 await assert.rejects(playForegroundMedia({play(){assert.deepEqual(events,['aves:media-focus']);return Promise.reject(new Error('Blocked'))}}))
 assert.equal(events.length,2)
})


test('region listening uses one shared dock and keeps missing mountain recordings unavailable', () => {
 const React = require('react')
 let habitat = 'all'
 const requests = []
 const media = {resourceId:null,playing:false,play(resource){requests.push(resource);this.resourceId=resource.id;this.playing=true},pause(){this.playing=false}}
 const custom = require('./helpers/load-ts.cjs')({mocks:{
  react:{...React,useContext:()=>({value:habitat})},
  './south-island-habitat-context':{SouthIslandHabitatContext:{}},
  './aves-media-provider':{useAvesMedia:()=>media},
 }})
 const Button = custom('components/south-island-soundscapes.tsx').default
 let tree = Button()
 assert.equal(tree.props['aria-label'],'Listen to this region')
 tree.props.onClick()
 assert.equal(requests.length,1)
 assert.equal(requests[0].kind,'Soundscape')
 assert.equal(requests[0].regionId,'south-island')
 assert.equal(requests[0].mapPlace,undefined,'Canterbury recording must not claim the selected Fiordland/Otago place')
 assert.match(requests[0].description,/Peel Forest, Canterbury/)
 tree = Button();assert.equal(tree.props['aria-label'],'Pause region soundscape')
 tree.props.onClick();assert.equal(media.playing,false)
 habitat='mountains';tree=Button();assert.equal(tree.props.disabled,true)
 tree.props.onClick();assert.equal(requests.length,1,'never substitute a forest track for mountain ambience')
 habitat='coast';tree=Button();tree.props.onClick()
 assert.match(requests[1].description,/Wakanui Beach, Canterbury/)
 assert.equal(requests[1].playback.src,'/audio/soundscapes/south-island-coast.mp3')
})
