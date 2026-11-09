const {test}=require('node:test')
const assert=require('node:assert/strict')
const fs=require('node:fs')
const path=require('node:path')
const crypto=require('node:crypto')
const load=require('./helpers/load-ts.cjs')()
const {AmbienceController}=load('lib/ambience-controller.ts')
const tick=()=>new Promise(resolve=>setImmediate(resolve))
function fixture(){
 const voices=[],params=[],status=[]
 const param=()=>{const p={value:0,events:[],cancelScheduledValues(){},setTargetAtTime(v){this.value=v;this.events.push(['target',v])},setValueAtTime(v){this.value=v},linearRampToValueAtTime(v){this.value=v}};params.push(p);return p}
 const context={currentTime:1,destination:{},createGain(){return {gain:param(),connect(){},disconnect(){}}},createMediaElementSource(){return {connect(){},disconnect(){}}},resume(){return Promise.resolve()},close(){this.closed=true;return Promise.resolve()}}
 const make=()=>{let resolve,reject;const promise=new Promise((a,b)=>{resolve=a;reject=b});const audio={pause(){this.paused=true},load(){},removeAttribute(){this.src=''},remove(){this.removed=true},play(){return promise},resolve,reject,removed:false,paused:false};voices.push(audio);return audio}
 return {engine:new AmbienceController(context,make,s=>status.push(s)),voices,params,status,context}
}

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

test('rapid habitat requests cancel stale loads and never stack more than two live voices',async()=>{
 const f=fixture(),a={id:'forest',src:'/forest'},b={id:'stream',src:'/stream'},c={id:'coast',src:'/coast'}
 assert.equal(f.voices.length,0)
 f.engine.select(a);const first=f.voices[0]
 f.engine.select(b);assert.equal(first.removed,true)
 first.resolve();await tick();assert.ok(!f.status.includes('playing'))
 f.voices[1].resolve();await tick();assert.equal(f.status.at(-1),'playing')
 f.engine.select(c);assert.equal(f.voices.filter(v=>!v.removed).length,2)
 f.voices[2].resolve();await tick();assert.equal(f.voices.filter(v=>!v.removed).length,2)
 f.engine.select(a);assert.equal(f.voices[1].removed,true);assert.equal(f.voices.filter(v=>!v.removed).length,2)
 f.engine.select(null);assert.equal(f.voices.filter(v=>!v.removed).length,0)
 f.voices[3].reject(new Error('Cancelled'));await tick();assert.equal(f.status.at(-1),'unavailable')
 f.engine.dispose();assert.equal(f.context.closed,true)
})

test('ducking and mute restore only the visitor volume, and load failure releases every voice',async()=>{
 const f=fixture();f.engine.level(.25,false,true);assert.equal(f.params[0].value,.02)
 f.engine.level(.25,true,false);assert.equal(f.params[0].value,0)
 f.engine.level(.25,false,false);assert.equal(f.params[0].value,.25)
 f.engine.select({id:'forest',src:'/forest'});f.voices[0].resolve();await tick()
 f.engine.select({id:'coast',src:'/coast'});f.voices[1].reject(new Error('Unavailable'));await tick()
 assert.equal(f.status.at(-1),'error');assert.ok(f.voices.every(v=>v.removed))
 f.engine.dispose()
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

test('returning to the already playing habitat cancels pending audio and clears Loading',async()=>{
 const f=fixture(),forest={id:'forest',src:'/forest'}
 f.engine.select(forest);f.voices[0].resolve();await tick()
 f.engine.select({id:'coast',src:'/coast'});assert.equal(f.status.at(-1),'loading')
 f.engine.select(forest);assert.equal(f.status.at(-1),'playing');assert.equal(f.voices.length,2)
 assert.equal(f.voices[1].removed,true);assert.equal(f.voices[0].removed,false)
 f.voices[1].resolve();await tick();assert.equal(f.status.at(-1),'playing')
 f.engine.dispose()
})
