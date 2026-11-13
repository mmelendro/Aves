const {test}=require('node:test'),assert=require('node:assert/strict');
const load=require('./helpers/load-ts.cjs')();
const {destinationBirds}=load('content/destination-birds.ts');
const {filterConservationBirds}=load('lib/bird-conservation.ts');
test('world endemic and native results equal the combined correctly scoped country results',()=>{
 for(const filter of [{endemicOnly:true,status:'all'},{endemicOnly:false,status:'all',origin:'native'}]){
  const expected=Object.entries(destinationBirds).flatMap(([country,birds])=>filterConservationBirds(birds,filter,country));
  const world=filterConservationBirds(Object.values(destinationBirds).flat(),filter,'world');
  assert.deepEqual(world.map(b=>[b.countryId,b.id]),expected.map(b=>[b.countryId,b.id]));
  assert.ok(new Set(world.map(b=>b.countryId)).size>1);
 }
});
