const {test}=require('node:test'),assert=require('node:assert/strict');
const {appendDesiredWishes}=require('./helpers/load-ts.cjs')()('lib/bird-album.ts');
const existing={id:'a13b0801-1c6d-41d4-94da-12e3adeebf13',speciesId:'nz-existing',state:'observed',date:'2026-11-13',regionId:'north-island',notes:'Original observation',deleted:false};
test('selected wishes add desired records once and preserve every existing observation',()=>{
 const data={version:1,birds:[existing]},allowed=['nz-existing','nz-new'];
 const result=appendDesiredWishes(data,allowed,allowed,()=> 'b13b0801-1c6d-41d4-94da-12e3adeebf13');
 assert.equal(result.added,1);assert.deepEqual(result.data.birds[0],existing);assert.equal(result.data.birds[1].state,'desired');assert.equal(result.data.birds[1].date,'');assert.equal(data.birds.length,1);
 const retry=appendDesiredWishes(result.data,allowed,allowed);assert.equal(retry.added,0);assert.deepEqual(retry.data,result.data);
 const invalid=appendDesiredWishes(data,['nz-unavailable'],allowed);assert.ok(invalid.error);assert.equal(invalid.data,data);
});
