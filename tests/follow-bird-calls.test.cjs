const { test } = require('node:test')
const assert = require('node:assert/strict')
const load = require('./helpers/load-ts.cjs')()
const { FollowBirdCalls } = load('lib/follow-bird-calls.ts')
const tick = () => new Promise(resolve => setImmediate(resolve))
function audio() { return { paused: true, volume: .3, muted: false, pause() { this.paused = true } } }
function fixture() {
 const attempts = [], states = []
 const session = new FollowBirdCalls(element => {
  let resolve, reject
  const promise = new Promise((a,b) => { resolve=a; reject=b })
  element.paused = false
  attempts.push({ element, resolve, reject })
  return promise
 }, status => states.push(status))
 return { session, attempts, states }
}
test('following is opt-in and changes use only the selected recording with retained volume', async () => {
 const f=fixture(), a=audio(), b=audio()
 f.session.select(a); assert.equal(f.attempts.length,0)
 f.session.start(a); f.attempts[0].resolve(); await tick()
 assert.equal(f.states.at(-1),'playing')
 a.muted=true; f.session.select(b)
 assert.equal(a.paused,true); assert.equal(b.volume,.3); assert.equal(b.muted,true)
 f.attempts[1].resolve(); await tick(); f.session.ended()
 assert.equal(f.states.at(-1),'ready'); assert.equal(f.attempts.length,2)
})
test('rapid changes ignore stale rejection and stop late playback after switching or stopping', async () => {
 const f=fixture(), a=audio(), b=audio()
 f.session.start(a); f.session.select(b)
 f.attempts[0].reject(new Error('old request')); await tick()
 assert.equal(f.session.enabled,true); assert.equal(f.states.at(-1),'loading')
 f.session.stop(); f.attempts[1].resolve(); await tick()
 assert.equal(b.paused,true); assert.equal(f.states.at(-1),'off')
})
test('missing recording preserves opt-in and rejection requires another deliberate activation', async () => {
 const f=fixture(), a=audio()
 f.session.start(null); assert.equal(f.states.at(-1),'missing'); assert.equal(f.session.enabled,true)
 f.session.select(a); f.attempts[0].reject(new Error('NotAllowedError')); await tick()
 assert.equal(f.session.enabled,false); assert.equal(f.states.at(-1),'blocked'); assert.equal(a.paused,true)
 f.session.select(audio()); assert.equal(f.attempts.length,1)
})
test('disposal invalidates pending playback without notifying an unmounted viewer', async () => {
 const f=fixture(), a=audio(); f.session.start(a)
 f.session.dispose(); const count=f.states.length
 f.attempts[0].resolve(); await tick()
 assert.equal(a.paused,true); assert.equal(f.states.length,count)
})
test('volume and mute survive a bird without a recording', () => {
 const f=fixture(), a=audio(), b=audio()
 f.session.start(a); a.volume=.17; a.muted=true
 f.session.select(null); f.session.select(b)
 assert.equal(b.volume,.17); assert.equal(b.muted,true); assert.equal(a.paused,true)
})
test('an older completion on the same recording does not pause a new activation', async () => {
 const f=fixture(), a=audio()
 f.session.start(a); f.session.stop(); f.session.start(a)
 f.attempts[0].resolve(); await tick(); assert.equal(a.paused,false)
 f.attempts[1].resolve(); await tick(); assert.equal(f.states.at(-1),'playing')
})
