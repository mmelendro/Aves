const {test}=require('node:test');
const assert=require('node:assert/strict');
const {ebirdLink}=require('./helpers/load-ts.cjs')()('lib/ebird-link.ts');
test('exact taxonomy matches use eBird species codes',()=>{
 assert.equal(ebirdLink('Nestor notabilis').url,'https://ebird.org/species/kea1');
 assert.equal(ebirdLink(' Nestor notabilis ').url,'https://ebird.org/species/kea1');
});
test('unresolved taxonomy names stay explicit searches rather than guessed species',()=>{
 const name='Syntheticus unmatchedus';const link=ebirdLink(name),url=new URL(link.url);
 assert.equal(link.label,'Find on eBird');assert.equal(link.code,undefined);
 assert.equal(url.searchParams.get('q'),'site:ebird.org/species/ "'+name+'"');
});
