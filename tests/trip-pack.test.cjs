const {test}=require('node:test'),assert=require('node:assert/strict')
const load=require('./helpers/load-ts.cjs')(),{tripPackSelection,renderTripPack}=load('lib/trip-pack.ts')
test('selected packs escape private text and contain no scripts, remote assets or unselected content',()=>{
 const file=renderTripPack({title:'<img src=x onerror=alert(1)>',itinerary:'Day 1: <script>secret</script>',preparations:[],records:[],generatedOn:'2026-11-13'})
 assert.match(file,/&lt;script&gt;secret&lt;\/script&gt;/);assert.doesNotMatch(file,/<script|<img|<iframe|<link|https?:\/\//);assert.doesNotMatch(file,/Selected preparations|Selected practical records/)
 const noItinerary=renderTripPack({title:'Only selected records',itinerary:null,preparations:[],records:[],generatedOn:'2026-11-13'});assert.doesNotMatch(noItinerary,/<h2>Saved itinerary/)
 const empty={includeItinerary:false,preparationIds:[],recordIds:[],workspaceRevision:0,recordsRevision:0}
 assert.equal(tripPackSelection.safeParse(empty).success,false);assert.equal(tripPackSelection.safeParse({...empty,includeItinerary:true,includeJournal:true}).success,false)
})
