const {test}=require('node:test')
const assert=require('node:assert/strict')
const load=require('./helpers/load-ts.cjs')()
const {importPlanningIdeas}=load('lib/import-planning-ideas.ts')
const {southIslandPlanner:south}=load('lib/south-island-trip-planner.ts')
const {northIslandPlanner:north}=load('lib/island-planners.ts')

test('combined import retains notes and regions, joins both islands, and remains repeatable without duplicates',()=>{
  const current={message:'My own plans and questions',birdIds:[],regions:['rakiura']}
  const incoming={birdIds:[],placeIds:['mountains'],itineraries:[south.buildTrip(south.defaultTripInput),north.buildTrip(north.defaultTripInput)]}
  const result=importPlanningIdeas(current,incoming)
  assert.equal(result.error,undefined)
  assert.ok(result.message.startsWith(current.message))
  assert.match(result.message,/Place idea: Arthur/)
  assert.match(result.message,/AVES South Island itinerary/)
  assert.match(result.message,/AVES North Island itinerary/)
  assert.deepEqual(new Set(result.regions),new Set(['rakiura','south-island','north-island']))
  assert.deepEqual(importPlanningIdeas(result,incoming),result)
  assert.deepEqual(current,{message:'My own plans and questions',birdIds:[],regions:['rakiura']})
})

test('failed combined import retains every field, including choices merged before an overflowing itinerary',()=>{
  const current={message:'x'.repeat(59990),birdIds:[],regions:['rakiura']}
  const incoming={birdIds:[],placeIds:[],itineraries:[south.buildTrip(south.defaultTripInput)]}
  const result=importPlanningIdeas(current,incoming)
  assert.ok(result.error)
  const {error,...unchanged}=result
  assert.deepEqual(unchanged,current)
  for(const invalid of [{birdIds:['made-up'],placeIds:[],itineraries:[]},{birdIds:[],placeIds:['not-a-place'],itineraries:[]}]){
    const original={message:'Keep these notes',birdIds:[],regions:['rakiura']}
    const {error,...unchanged}=importPlanningIdeas(original,invalid)
    assert.ok(error);assert.deepEqual(unchanged,original)
  }
})
