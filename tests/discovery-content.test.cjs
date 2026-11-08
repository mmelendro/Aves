const { test } = require('node:test')
const assert = require('node:assert/strict')
const { existsSync } = require('node:fs')
const { resolve } = require('node:path')
const loader = require('./helpers/load-ts.cjs')
const original = require('../features/australia/content/birds-original.json')
const expansionA = require('../features/australia/content/birds-expansion-a.json')
const expansionB = require('../features/australia/content/birds-expansion-b.json')
const photos = require('../features/australia/content/image-credits.json').images
const audio = require('../features/australia/content/audio-credits.json').recordings
const load = loader({ mocks: { './birds-original.json': original, './birds-expansion-a.json': expansionA, './birds-expansion-b.json': expansionB } })
const { birdData } = load('features/australia/content/birds.ts')
const { regionOptions } = load('content/region-options.ts')
const { regions } = load('features/australia/content/regions.ts')
const { australiaMapStates } = load('features/australia/content/australia-map.ts')
const publicFile = asset => resolve(__dirname,'../public/australia',asset.replace(/^\//,''))

test('every mapped Australian region has a guide and a selectable enquiry/saved-plan choice', () => {
  const expected = ['australian-capital-territory','jervis-bay-territory','new-south-wales','northern-territory','queensland','south-australia','tasmania','victoria','western-australia']
  assert.deepEqual(australiaMapStates.map(s=>s.regionId).sort(), expected)
  assert.deepEqual(regions.map(s=>s.id).sort(), expected)
  assert.deepEqual(regionOptions.map(s=>s.id).sort(), expected)
  const { createPlanSchema } = load('lib/account-models.ts')
  const parsed = createPlanSchema.parse({id:'a13b0801-1c6d-41d4-94da-12e3adeebf13',title:'All Australian regions',regions:expected,travelWhen:'Flexible',partySize:'2',message:''})
  assert.deepEqual(parsed.regions,expected)
})

test('all carousel birds have distribution, a real image, a source and a working regional destination', () => {
  assert.ok(birdData.length >= 20)
  assert.equal(new Set(birdData.map(b=>b.id)).size,birdData.length)
  for(const bird of birdData) {
    assert.ok(bird.distribution.length > 35, `${bird.id}: missing distribution`)
    assert.ok(bird.habitat.length > 10, `${bird.id}: missing habitat`)
    assert.ok(bird.sources.length > 0 && bird.sources.every(s=>s.url.startsWith('https://')), `${bird.id}: missing primary sources`)
    assert.ok(regions.some(r=>r.id===bird.regionSlug), `${bird.id}: unknown region`)
    assert.ok(australiaMapStates.some(state=>state.regionId===bird.regionSlug), `${bird.id}: no highlighted map region`)
    assert.ok(existsSync(publicFile(bird.image)), `${bird.id}: missing image`)
    const credit = photos.find(p=>p.path===bird.image)
    assert.ok(credit?.sourceUrl && credit?.licenseUrl, `${bird.id}: missing photo attribution`)
    assert.ok(!/\bNC\b|noncommercial/i.test(credit.license), `${bird.id}: incompatible photo licence`)
  }
})

test('every offered recording has a local file and a matching commercial-compatible credit', () => {
  for(const bird of birdData.filter(b=>b.audioFile)) {
    assert.ok(existsSync(publicFile(bird.audioFile)), `${bird.id}: missing audio`)
    const credit = audio.find(a=>a.id===bird.id && a.path===bird.audioFile)
    assert.ok(credit?.sourceUrl && credit?.licenseUrl, `${bird.id}: missing recording credit`)
    assert.ok(!/\bNC\b|noncommercial/i.test(credit.license), `${bird.id}: incompatible audio licence`)
  }
})

test('each regional bird gives a location and each region image has attribution', () => {
  for(const region of regions) {
    assert.ok(region.birds.length > 0)
    for(const bird of region.birds) assert.ok(bird.whereFound?.length > 15,`${region.id}: ${bird.name} has no location`)
    assert.ok(existsSync(publicFile(region.image)), `${region.id}: missing region image`)
    assert.ok(photos.some(p=>p.path===region.image), `${region.id}: missing photo credit`)
  }
})

 test('every regional carousel contains locally sourced birds from the shared catalogue', () => {
  const { regionalBirdSelections } = load('features/australia/content/regional-birds.ts')
  assert.deepEqual(Object.keys(regionalBirdSelections).sort(), regions.map(r=>r.id).sort())
  for (const [region, selections] of Object.entries(regionalBirdSelections)) {
    assert.ok(selections.length >= 3, region)
    assert.equal(new Set(selections.map(b=>b.birdId)).size,selections.length, region)
    for (const selection of selections) {
      assert.ok(birdData.some(b=>b.id===selection.birdId), selection.birdId)
      assert.ok(selection.whereFound.length > 25, region)
      assert.ok(selection.sources.length && selection.sources.every(s=>s.url.startsWith('https://')), region)
    }
  }
})
