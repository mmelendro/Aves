/** Authoring helper. Keep deferred catalogues derived from reviewed sources.
 * Run after editing source media; --check verifies without changing files. */
const fs=require('node:fs');
const check=process.argv.includes('--check');
function output(path,value){const text=JSON.stringify(value)+'\n';if(check){if(fs.readFileSync(path,'utf8')!==text)throw Error(`Refresh ${path} with node scripts/generate-gallery-snapshots.cjs`)}else fs.writeFileSync(path,text)}
const additions=JSON.parse(fs.readFileSync('content/place-gallery-additions.json','utf8'));
output('content/south-island-gallery-additions.json',{photos:additions.photos.filter(p=>p.countryId==='new-zealand'&&p.regionId==='south-island')});
const load=require('../tests/helpers/load-ts.cjs')();
const {southIslandPlaceContexts:places}=load('content/south-island-place-media.ts');
output('content/south-island-discovery-index.json',{places:places.map(({id,label,latitude,longitude,location,source,habitat})=>({id,label,latitude,longitude,location,source,habitat})),slides:places.flatMap(p=>p.photos.map(()=>({place:{id:p.id,habitat:p.habitat}})))});
const {placeGalleryPhotos}=load('lib/place-gallery.ts');
for(const country of ['colombia','australia','new-zealand'])output(`content/gallery-${country}.json`,placeGalleryPhotos.filter(p=>p.countryId===country));
output('content/nz-landscape-ideas.json',placeGalleryPhotos.filter(p=>p.countryId==='new-zealand').map(p=>({id:`landscape:${p.id}`,label:p.caption,regionId:p.regionId,sourceUrl:p.sourceUrl,creator:p.creator,licence:p.licence})));
console.log(check?'Deferred gallery snapshots match reviewed sources.':'Updated deferred gallery snapshots.');
