const {test}=require('node:test'),assert=require('node:assert/strict')
const data=require('../content/species-regional-evidence.json'),national=require('../content/species/colombia.json')
const load=require('./helpers/load-ts.cjs')(),{searchSpeciesReference}=load('lib/species-reference.ts')
test('regional evidence joins exact taxa independently of common names and keeps every source exclusion',()=>{
 const byId=new Map(national.species.map(s=>[s.id,s])),sources=new Set(data.sources.map(s=>s.id))
 assert.equal(data.edges.filter(e=>e.sourceId==='umagdalena-2025').length,177)
 assert.equal(data.excludedRows.length,7)
 for(const edge of data.edges){assert.equal(byId.get(edge.speciesId)?.scientificName,edge.scientificName);assert.equal(edge.sourceName,edge.scientificName);assert.equal(edge.match,'exact');assert.ok(sources.has(edge.sourceId));assert.equal(edge.regionId,'sierra-nevada-de-santa-marta');assert.equal(edge.latitude,undefined);assert.equal(edge.longitude,undefined)}
 const excluded=data.excludedRows.find(s=>s.sourceName==='Xenops minutus');assert.ok(excluded.candidates.length>1)
 assert.ok(!data.edges.some(e=>e.sourceName===excluded.sourceName))
})
test('every Santa Marta-named national species receives a primary-source regional link',()=>{
 const birds=national.species.filter(b=>b.commonName.includes('Santa Marta'))
 assert.equal(birds.length,13)
 for(const bird of birds){const r=searchSpeciesReference('colombia',new URLSearchParams({country:'colombia',q:bird.scientificName,region:'sierra-nevada-de-santa-marta'}));assert.ok(r.results.some(b=>b.id===bird.id),bird.commonName);assert.ok(data.edges.some(e=>e.speciesId===bird.id&&['santa-marta-tourism-guide','proaves-wren-2012'].includes(e.sourceId)),bird.commonName)}
 const result=searchSpeciesReference('colombia',new URLSearchParams({country:'colombia',q:'Aburria aburri',region:'sierra-nevada-de-santa-marta'}))
 assert.ok(result.results[0].regionEvidence.some(e=>e.sourceId==='umagdalena-2025'));assert.equal(result.results[0].places.length,0,'regional occurrence never invents a supplier or activity edge')
})
