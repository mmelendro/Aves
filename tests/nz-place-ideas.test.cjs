const {test}=require('node:test')
const assert=require('node:assert/strict')
const load=require('./helpers/load-ts.cjs')()
const p=load('lib/nz-place-ideas.ts')
function storage(){const values=new Map();return{getItem:k=>values.get(k)||null,setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k)}}
test('portable public place IDs reject unknown and duplicate selections',()=>{
 assert.equal(p.nzPlanningPlaces.length,4)
 assert.equal(p.validNzPlaceIdeas(['mountains','coast']),true)
 for(const ids of [['unknown'],['mountains','mountains'],['__proto__'],null])assert.equal(p.validNzPlaceIdeas(ids),false)
})
test('place basket expires, rejects invalid/future records and handles denied storage',()=>{
 const s=storage();assert.equal(p.writeNzPlaceIdeas(s,['mountains'],100),true)
 assert.deepEqual(p.readNzPlaceIdeas(s,101),['mountains'])
 assert.deepEqual(p.readNzPlaceIdeas(s,99),[])
 p.writeNzPlaceIdeas(s,['coast'],100);assert.deepEqual(p.readNzPlaceIdeas(s,86400101),[])
 assert.equal(p.writeNzPlaceIdeas({setItem(){throw Error('denied')}},['coast']),false)
})
test('place note import preserves guest text, avoids duplicates and refuses overflow',()=>{
 const original='My existing travel ideas.'
 const first=p.mergeNzPlaceNotes(original,['mountains','coast'])
 assert.equal(first.error,undefined);assert.ok(first.message.startsWith(original))
 assert.equal(p.mergeNzPlaceNotes(first.message,['mountains']).message,first.message)
 const full='x'.repeat(4995), result=p.mergeNzPlaceNotes(full,['coast'])
 assert.ok(result.error);assert.equal(result.message,full)
 assert.equal(p.mergeNzPlaceNotes(original,['unknown']).message,original)
})
test('only ideas in the confirmed saved notes are consumed; new choices survive',()=>{
 const s=storage();p.writeNzPlaceIdeas(s,['mountains','coast'])
 p.consumeSavedNzPlaceIdeas(s,'Place idea: Arthur’s Pass')
 assert.deepEqual(p.readNzPlaceIdeas(s),['coast'])
 p.consumeSavedNzPlaceIdeas(s,'Place idea: Otago & the Catlins (maybe)')
 assert.deepEqual(p.readNzPlaceIdeas(s),['coast'])
})
