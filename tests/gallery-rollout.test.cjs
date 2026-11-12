const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{createHash}=require('node:crypto');
const load=require('./helpers/load-ts.cjs')();const {galleryPhotos}=load('lib/place-gallery.ts'),{destinationRegions}=load('content/destination-regions.ts');
const additions=require('../content/place-gallery-additions.json').photos;
const rollout=['sierra-nevada-de-santa-marta','caribbean','pacific','llanos','amazonia','colombian-massif'];
for(const region of rollout)test(`${region} has five independent, credited and reviewed landscape references`,()=>{
 const p=galleryPhotos('colombia',region);assert.equal(p.length,5);assert.equal(new Set(p.map(x=>x.originalSha256)).size,5);for(const x of p){assert.equal(createHash('sha256').update(fs.readFileSync(path.join(__dirname,'../public',x.src))).digest('hex'),x.webSha256);assert.ok(x.creator.trim());assert.ok(x.alt.length>35);assert.equal(x.reviewedOn,'2026-11-12');assert.match(x.sourceUrl,/^https:\/\/commons.wikimedia.org\/wiki\/File:/);assert.ok(x.dateBasis);if(x.capturedOn)assert.match(x.capturedOn,/^\d{4}-\d{2}-\d{2}$/);else assert.match(x.dateBasis,/not normalised|unnormalised/);assert.ok(x.sourceDateText!==undefined);assert.match(x.licence,/^CC BY(?:-SA)? [1-4]\.|^CC0$|^Public domain$/);}
});
test('Colombia overview covers all eleven regions through the same regional objects',()=>{
 const regions=destinationRegions.colombia,preview=galleryPhotos('colombia');assert.equal(regions.length,11);assert.equal(additions.filter(p=>p.countryId==='colombia').length,55);assert.equal(preview.length,22);assert.equal(new Set(preview.slice(0,11).map(p=>p.regionId)).size,11);assert.deepEqual([...new Set(preview.map(p=>p.regionId))].sort(),regions.map(r=>r.id).sort());for(const r of regions){const regional=galleryPhotos('colombia',r.id);assert.equal(regional.length,5);const sampled=preview.filter(p=>p.regionId===r.id);assert.equal(sampled.length,2);for(const p of sampled)assert.ok(regional.includes(p));}
});

for(const region of ['new-south-wales','queensland'])test(`${region} reuses five reviewed local landscape photographs`,()=>{
 const photos=galleryPhotos('australia',region);assert.equal(photos.length,5);assert.equal(new Set(photos.map(p=>p.originalSha256)).size,5);for(const p of photos){assert.ok(p.creator.trim());assert.equal(createHash('sha256').update(fs.readFileSync(path.join(__dirname,'../public',p.src))).digest('hex'),p.webSha256);assert.match(p.dateBasis,/metadata|normalised/);assert.match(p.licence,/^CC BY(?:-SA)? [1-4]\.|^Public domain$/);}if(region==='queensland'){const historical=photos.find(p=>p.placeId==='daintree');assert.equal(historical.capturedOn,'');assert.match(historical.dateBasis,/1986.*2010/);}
});
test('Australia overview balances the two published galleries without inventing other regions',()=>{
 const p=galleryPhotos('australia');assert.equal(p.length,4);assert.equal(new Set(p.slice(0,2).map(p=>p.regionId)).size,2);assert.deepEqual(galleryPhotos('australia','victoria'),[]);for(const x of p)assert.ok(galleryPhotos('australia',x.regionId).includes(x));
});
test('Australian inventory holds five explicitly scoped candidates for all nine regions',()=>{
 const inventory=require('../docs/data/australia-landscape-inventory.json');assert.equal(inventory.candidates.length,45);assert.equal(new Set(inventory.candidates.map(p=>p.sourceUrl)).size,45);assert.deepEqual([...new Set(inventory.candidates.map(p=>p.regionId))].sort(),destinationRegions.australia.map(p=>p.id).sort());for(const r of destinationRegions.australia){const p=inventory.candidates.filter(p=>p.regionId===r.id);assert.equal(p.length,5);for(const x of p){assert.ok(x.creator);assert.match(x.licence,/^CC BY(?:-SA)? [1-4]\.|^CC0$|^Public domain$/);assert.match(x.licenceUrl,/^https?:\/\//);assert.match(x.status,/review|screened/);}}assert.match(inventory.scope,/current access/);
});
