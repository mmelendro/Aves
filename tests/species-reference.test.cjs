const {test}=require('node:test')
const assert=require('node:assert/strict')
const load=require('./helpers/load-ts.cjs')()
const {searchSpeciesReference:search,isSpeciesCountry}=load('lib/species-reference.ts')
const references=['colombia','australia','new-zealand'].map(id=>require('../content/species/'+id+'.json'))
const query=(country,values={})=>search(country,new URLSearchParams(values))

// These checks protect the data pipeline's identity, scope and evidence boundaries.
test('national references have unique stable species identities and dated source provenance',()=>{
 assert.deepEqual(references.map(d=>d.species.length),[1983,977,432])
 for(const data of references){
  assert.equal(new Set(data.species.map(b=>b.id)).size,data.species.length)
  assert.equal(new Set(data.species.map(b=>b.scientificName)).size,data.species.length)
  const sources=new Set(data.sources.map(s=>s.id))
  for(const source of data.sources){assert.match(source.url,/^https:\/\//);assert.match(source.sha256,/^[a-f0-9]{64}$/);assert.ok(source.edition&&source.reviewed)}
  for(const bird of data.species){assert.ok(sources.has(bird.sourceId));assert.ok(bird.scientificName&&bird.commonName);assert.ok(['native','endemic','introduced','unknown'].includes(bird.origin))}
 }
})
test('Colombia preserves incomplete source rows and uncertainty without manufacturing taxa or names',()=>{
 const data=references[0]
 assert.deepEqual(data.excludedRows.map(r=>r.previousName),['Chaetocercus bombus','Pionus fuscus','Polioptila guianensis'])
 assert.ok(!data.species.some(b=>b.scientificName.includes('#N/A')))
 const uncertain=data.species.find(b=>b.scientificName==='Sporophila maximiliani')
 assert.equal(uncertain.occurrence,'uncertain');assert.equal(uncertain.historical,false)
 const renamed=data.species.find(b=>b.scientificName==='Dacnis egregia')
 assert.equal(renamed.previousScientificName,'Dacnis lineata')
 assert.equal(renamed.sourceCrosswalk,'Dacnis lineata egregia')
 assert.notEqual(renamed.commonName,'Black-faced Dacnis','an older broader name must not silently describe a split taxon')
})
test('Australian source flags and local extinction do not become false national or global assertions',()=>{
 const data=references[1]
 const local=data.species.find(b=>b.scientificName==='Pterodroma pycrofti')
 assert.equal(local.regionalExtinction,true);assert.equal(local.historical,false)
 assert.notEqual(local.occurrence,'historical')
 const breeding=data.species.filter(b=>b.populationStatus==='Endemic (breeding only)')
 assert.equal(breeding.length,20);assert.ok(breeding.every(b=>b.origin!=='endemic'))
 const domestic=data.species.find(b=>b.scientificName==='Struthio camelus')
 assert.equal(domestic.referenceOnly,true)
 const noOlderMatch=data.species.find(b=>b.sourceFlags.includes('V')&&!b.populationStatus)
 assert.ok(noOlderMatch);assert.equal(noOlderMatch.occurrence,'unknown')
})
test('New Zealand checklist and saved wish-list identities remain intact',()=>{
 const legacy=require('../content/new-zealand-checklist.json')
 assert.deepEqual(references[2].species.map(b=>b.id),legacy.species.map(b=>b.id))
 assert.equal(query('new-zealand').defaultTotal,377)
 assert.equal(query('new-zealand',{reference:'1'}).matched,432)
 assert.ok(query('new-zealand',{q:'tui'}).results.some(b=>b.localName==='Tūī'))
})
test('all national records are reachable in bounded pages, with reference-only entries opt-in',()=>{
 for(const data of references){
  let seen=[]
  for(let offset=0;offset<data.species.length;offset+=40){
   const page=query(data.countryId,{reference:'1',offset:String(offset)})
   assert.ok(page.results.length<=40)
   seen.push(...page.results.map(b=>b.id))
  }
  assert.equal(new Set(seen).size,data.species.length)
  const ordinary=query(data.countryId)
  assert.ok(ordinary.results.every(b=>!b.historical&&!b.referenceOnly))
 }
})
test('regional evidence permits legitimate overlap and never projects national lists into every region',()=>{
 for(const data of references){
  const all=[]
  for(let offset=0;offset<data.species.length;offset+=40)all.push(...query(data.countryId,{reference:'1',offset:String(offset)}).results)
  assert.ok(all.some(b=>b.regions.length>1),data.countryId)
  assert.ok(all.some(b=>b.regions.length===0),data.countryId)
  assert.ok(query(data.countryId).regionalCoverage<data.species.length)
  for(const region of query(data.countryId).regions){
   const result=query(data.countryId,{reference:'1',region:region.id})
   assert.equal(result.matched,region.reviewedCount)
   assert.ok(result.results.every(b=>b.regions.some(r=>r.id===region.id)))
  }
 }
 assert.equal(query('colombia',{region:'south-island'}),null)
 for(const value of ['constructor','__proto__','unknown',null])assert.equal(isSpeciesCountry(value),false)
})
test('species/place edges retain explicit encounter and access context without inferring nearby businesses',()=>{
 const bird=query('new-zealand',{q:'Nestor meridionalis'}).results[0]
 assert.ok(bird.places.some(p=>p.id==='trip-ni-totara'))
 for(const place of bird.places){
  assert.ok(place.encounter&&place.reviewed&&place.access)
  assert.match(place.url,/^https:\/\//)
  assert.ok(place.activities.includes('birding')||place.activities.includes('ecotourism'))
  assert.ok(!('latitude'in place)&&!('longitude'in place))
 }
 assert.equal(query('colombia',{q:'Momotus aequatorialis'}).results[0].places.length,0)
})

test('stale and malformed pagination stays aligned inside the filtered result set',()=>{
 for(const country of ['colombia','australia','new-zealand']){
  const last=query(country,{offset:'99999'})
  assert.ok(last.results.length>0);assert.equal(last.offset%40,0)
  assert.equal(query(country,{offset:'41'}).offset,40)
  for(const offset of ['-1','1.5','Infinity','garbage'])assert.equal(query(country,{offset}).offset,0)
  const one=query(country,{q:last.results[0].scientificName,offset:'99999'})
  assert.equal(one.offset,0);assert.ok(one.results.length>0)
 }
 assert.equal(query('colombia',{q:'not-a-real-bird-xxxx',offset:'99999'}).offset,0)
})
test('query contract rejects duplicate/unsupported filters and strips non-search tracking',()=>{
 const {readSpeciesQuery,normalizeSpeciesQuery}=load('lib/species-reference-query.ts')
 assert.equal(readSpeciesQuery({country:['colombia','australia']}),null)
 assert.equal(normalizeSpeciesQuery(new URLSearchParams('origin=native&origin=endemic')),null)
 for(const bad of [{origin:'made-up'},{occurrence:'sometimes'},{reference:'yes'},{country:'constructor'}])assert.equal(readSpeciesQuery(bad),null)
 assert.equal(readSpeciesQuery({country:'australia',q:'   ',origin:'all',occurrence:'all',reference:'0',offset:'0',utm_source:'test'}).toString(),'country=australia')
 assert.equal(readSpeciesQuery({q:' x '.repeat(200)}).get('q').length,120)
})
