const {test}=require('node:test')
const assert=require('node:assert/strict')
const fs=require('node:fs')
const path=require('node:path')
const load=require('./helpers/load-ts.cjs')()
const {regionalBrandBird}=load('lib/regional-brand.ts')
const {brandContext}=load('lib/brand-context.ts')
const catalogue=require('../content/regional-brand-birds.json').birds
const contexts=require('../content/landscape-profiles.json').profiles

test('every configured region and subregion has its own sourced, packaged brand identity',()=>{
 for(const context of contexts){
  const bird=catalogue[context.level === "place" ? `${context.country}/${context.selectionId}` : context.id]
  assert.ok(bird,context.id)
  assert.match(bird.scientificName,/^[A-Z][a-z]+ [a-z]+/)
  assert.ok(bird.rationale)
  assert.ok(fs.existsSync(path.join(__dirname,'../public/images/brand',bird.file)),bird.file)
  assert.ok(['left','right'].includes(bird.facing))
 }
 assert.equal(new Set(contexts.filter(x=>x.level==='region').map(x=>catalogue[x.id].scientificName)).size,contexts.filter(x=>x.level==='region').length)
})
test('subregion wins, unknown place preserves region, unknown context safely keeps its own country',()=>{
 assert.equal(regionalBrandBird('new-zealand','south-island','coast').scientificName,'Megadyptes antipodes')
 assert.equal(regionalBrandBird('new-zealand','south-island','forest-and-lakes').scientificName,'Nestor meridionalis')
 assert.equal(regionalBrandBird('new-zealand','north-island','unknown').scientificName,'Callaeas wilsoni')
 assert.equal(regionalBrandBird('colombia','unknown').scientificName,'Momotus aequatorialis')
 assert.deepEqual(regionalBrandBird('missing','coast'),catalogue.global)
})
test('all page logos resolve the same selection, direct routes and country boundaries',()=>{
 const selected={country:'new-zealand',regionId:'south-island',placeId:'coast'}
 assert.equal(brandContext('/new-zealand/south-island','new-zealand',selected),selected)
 assert.equal(brandContext('/','new-zealand',selected),selected)
 assert.deepEqual(brandContext('/regions/pacific','colombia',selected),{country:'colombia',regionId:'pacific'})
 assert.equal(brandContext('/',undefined,selected),selected)
 assert.equal(brandContext('/account',undefined,selected).country,'global')
})
