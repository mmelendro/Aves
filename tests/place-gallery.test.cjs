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
 assert.equal(photos.length,6);
 assert.equal(new Set(photos.slice(0,3).map(p=>p.regionId)).size,3);
 assert.deepEqual([...new Set(photos.map(p=>p.regionId))].sort(),destinationRegions['new-zealand'].map(r=>r.id).sort());
 for(const id of new Set(photos.map(p=>p.regionId)))assert.ok(photos.filter(p=>p.regionId===id).length===2);
 const south=photos.filter(p=>p.regionId==='south-island');
 assert.equal(new Set(south.map(p=>p.placeId)).size,south.length);
});

test('region scopes expose the full same-photo collection and fail closed for unknown scopes',()=>{
 for(const place of southIslandPlaceContexts)for(const photo of place.photos){
  const shared=galleryPhotos('new-zealand','south-island').find(p=>p.src===photo.src);
  assert.ok(shared);assert.equal(shared.sourceUrl,photo.sourceUrl);assert.equal(shared.licence,photo.licence);assert.equal(shared.creator,photo.creator);
 }
 for(const place of southIslandPlaceContexts)assert.equal(place.photos.length,5,place.label);
 assert.equal(galleryPhotos('new-zealand','south-island').length,20);
 assert.equal(galleryPhotos('new-zealand','north-island').length,5);
 assert.equal(galleryPhotos('new-zealand','rakiura').length,5);
 assert.equal(placeGalleryPhotos.length,100);
 assert.equal(galleryPhotos("colombia","central-andes").length,5);
 assert.equal(galleryPhotos("colombia").length,22);
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

 test('Central Andes photographs are distinct licensed local references with matching file hashes',()=>{
 const {createHash}=require('node:crypto');const additions=require('../content/place-gallery-additions.json').photos.filter(p=>p.countryId==='colombia'&&p.regionId==='central-andes');assert.equal(additions.length,5);assert.equal(new Set(additions.map(p=>p.placeId)).size,5);assert.equal(new Set(additions.map(p=>p.originalSha256)).size,5);for(const p of additions){assert.equal(p.regionId,'central-andes');assert.equal(p.licence,'CC BY-SA 4.0');assert.equal(createHash('sha256').update(fs.readFileSync(path.join(__dirname,'../public',p.src))).digest('hex'),p.webSha256);assert.match(p.capturedOn,/^\d{4}-\d{2}-\d{2}$/);assert.ok(p.localityReview.includes('editorial'));}
 });

test('Colombia preview balances both reviewed regions and Eastern Andes keeps five independent photographs',()=>{
 const {createHash}=require('node:crypto');const photos=galleryPhotos('colombia','eastern-andes');assert.equal(photos.length,5);assert.equal(new Set(photos.map(p=>p.placeId)).size,5);assert.equal(new Set(photos.map(p=>p.originalSha256)).size,5);const preview=galleryPhotos('colombia');assert.deepEqual(preview.slice(0,2).map(p=>p.regionId),['central-andes','eastern-andes']);for(const p of photos){assert.equal(createHash('sha256').update(fs.readFileSync(path.join(__dirname,'../public',p.src))).digest('hex'),p.webSha256);assert.match(p.capturedOn,/^\d{4}-\d{2}-\d{2}$/);assert.match(p.licence,/^CC (BY|BY-SA) 4.0$|^CC0$/);}
});

test('Western Andes curation preserves independent sources and represents distinct places before repeat views',()=>{
 const {createHash}=require('node:crypto');const p=galleryPhotos('colombia','western-andes');assert.equal(p.length,5);assert.equal(new Set(p.map(p=>p.originalSha256)).size,5);assert.equal(new Set(p.slice(0,4).map(p=>p.placeId)).size,4);for(const x of p){assert.equal(createHash('sha256').update(fs.readFileSync(path.join(__dirname,'../public',x.src))).digest('hex'),x.webSha256);assert.match(x.contextSourceUrl,/parquesnacionales.gov.co/);assert.match(x.licence,/^CC BY-SA (2|4).0$/);}const preview=galleryPhotos('colombia');assert.deepEqual(preview.slice(0,3).map(p=>p.regionId),['central-andes','eastern-andes','western-andes']);
});

test('Cauca Valley landscapes preserve real wetland sources and balance the two places',()=>{
 const {createHash}=require('node:crypto');const p=galleryPhotos('colombia','cauca-valley');assert.equal(p.length,5);assert.equal(new Set(p.map(p=>p.originalSha256)).size,5);assert.deepEqual(p.slice(0,2).map(p=>p.placeId),['laguna-de-sonso','videles']);for(const x of p){assert.equal(createHash('sha256').update(fs.readFileSync(path.join(__dirname,'../public',x.src))).digest('hex'),x.webSha256);assert.match(x.contextSourceUrl,/cvc.gov.co/);assert.equal(x.licence,'CC BY-SA 4.0');}const preview=galleryPhotos('colombia');assert.equal(preview.length,22);for(const id of new Set(preview.map(p=>p.regionId)))assert.equal(preview.filter(p=>p.regionId===id).length,2);
});

test('Magdalena Valley gallery preserves four distinct places and source-specific licences',()=>{
 const {createHash}=require('node:crypto');const p=galleryPhotos('colombia','magdalena-valley');assert.equal(p.length,5);assert.equal(new Set(p.map(p=>p.originalSha256)).size,5);assert.equal(new Set(p.slice(0,4).map(p=>p.placeId)).size,4);assert.ok(p.some(p=>p.licence==='CC0'));for(const x of p){assert.equal(createHash('sha256').update(fs.readFileSync(path.join(__dirname,'../public',x.src))).digest('hex'),x.webSha256);assert.match(x.capturedOn,/^\d{4}-\d{2}-\d{2}$/);assert.ok(x.reviewedOn>=x.capturedOn);assert.match(x.licence,/^CC0$|^CC BY-SA 4.0$/);}const preview=galleryPhotos('colombia');assert.equal(new Set(preview.slice(0,5).map(p=>p.regionId)).size,5);
});
