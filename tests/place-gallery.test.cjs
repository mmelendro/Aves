const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const load=require('./helpers/load-ts.cjs')();
const {galleryPhotos,placeGalleryPhotos}=load('lib/place-gallery.ts');
const {southIslandPlaceContexts}=load('content/south-island-place-media.ts');
const {destinationRegions}=load('content/destination-regions.ts');
const credits=require('../content/image-credits.json').images;

test('country curation represents all reviewed islands before repeating an island or place',()=>{
 const photos=galleryPhotos('new-zealand');
 assert.equal(new Set(photos.slice(0,3).map(p=>p.regionId)).size,3);
 assert.deepEqual([...new Set(photos.map(p=>p.regionId))].sort(),destinationRegions['new-zealand'].map(r=>r.id).sort());
 for(const id of new Set(photos.map(p=>p.regionId)))assert.ok(photos.filter(p=>p.regionId===id).length<=2);
 const south=photos.filter(p=>p.regionId==='south-island');
 assert.equal(new Set(south.map(p=>p.placeId)).size,south.length);
});

test('region scopes expose the full same-photo collection and fail closed for unknown scopes',()=>{
 for(const place of southIslandPlaceContexts)for(const photo of place.photos){
  const shared=galleryPhotos('new-zealand','south-island').find(p=>p.src===photo.src);
  assert.ok(shared);assert.equal(shared.sourceUrl,photo.sourceUrl);assert.equal(shared.licence,photo.licence);assert.equal(shared.creator,photo.creator);
 }
 assert.equal(southIslandPlaceContexts.find(p=>p.id==='mountains').photos.length,5);
 assert.equal(galleryPhotos('new-zealand','north-island').length,1);
 assert.deepEqual(galleryPhotos('new-zealand','missing'),[]);
 assert.deepEqual(galleryPhotos('missing'),[]);
});

test('every gallery image has unique identity, an existing local file, explicit map region and matching credits',()=>{
 assert.equal(new Set(placeGalleryPhotos.map(p=>p.id)).size,placeGalleryPhotos.length);
 for(const p of placeGalleryPhotos){
  assert.ok(destinationRegions[p.countryId].some(r=>r.id===p.regionId));
  assert.ok(fs.existsSync(path.join(__dirname,'../public',p.src)));
  const c=credits.find(c=>c.path===p.src);assert.ok(c,p.src);
  assert.equal(c.creator,p.creator);assert.equal(c.sourceUrl,p.sourceUrl);assert.equal(c.license,p.licence);
  assert.ok(p.alt.length>20);assert.ok(p.modifications.length>10);assert.match(p.sourceUrl,/^https:\/\//);assert.match(p.licenceUrl,/^https:\/\//);
  assert.doesNotMatch(p.licence,/NC|noncommercial/i);
 }
});
