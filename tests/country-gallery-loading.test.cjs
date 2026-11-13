const {test}=require('node:test'),assert=require('node:assert/strict');
const load=require('./helpers/load-ts.cjs')();
const {placeGalleryPhotos,galleryPhotos}=load('lib/place-gallery.ts');
const {orderGalleryPhotos}=load('lib/gallery-order.ts');
test('deferred country catalogues preserve all licensed photos and the original balanced ordering',()=>{
 for(const country of ['colombia','australia','new-zealand']){
  const photos=require('../content/gallery-'+country+'.json');
  assert.deepEqual(photos,placeGalleryPhotos.filter(p=>p.countryId===country));
  for(const region of ['',...new Set(photos.map(p=>p.regionId))])assert.deepEqual(orderGalleryPhotos(photos,region),galleryPhotos(country,region));
 }
 assert.deepEqual(require('../content/gallery-place-index.json'),Object.fromEntries(['colombia','australia','new-zealand'].map(country=>[country,Object.fromEntries(placeGalleryPhotos.filter(p=>p.countryId===country).map(p=>[p.placeId,p.regionId]))])));
 const expected=placeGalleryPhotos.filter(p=>p.countryId==='new-zealand').map(p=>({id:`landscape:${p.id}`,label:p.caption,regionId:p.regionId,sourceUrl:p.sourceUrl,creator:p.creator,licence:p.licence}));
 assert.deepEqual(require('../content/nz-landscape-ideas.json'),expected);
 const contexts=load('content/south-island-place-media.ts').southIslandPlaceContexts;
 const index=require('../content/south-island-discovery-index.json');
 assert.deepEqual(index.slides,contexts.flatMap(p=>p.photos.map(()=>({place:{id:p.id,habitat:p.habitat}}))));
 assert.deepEqual(require('../content/south-island-gallery-additions.json').photos,require('../content/place-gallery-additions.json').photos.filter(p=>p.countryId==='new-zealand'&&p.regionId==='south-island'));
});
