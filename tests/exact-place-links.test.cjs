const {test}=require('node:test'),assert=require('node:assert/strict');
const load=require('./helpers/load-ts.cjs')();
const {searchDiscovery,discoveryItems}=load('lib/discovery-index.ts');
test('distinct Colombian landscape search results retain exact stable place IDs',()=>{
 const links=['Cocora Valley','Nevado del Ruiz','Laguna del Otún'].map(name=>searchDiscovery(name,'colombia','place').items[0]);
 assert.equal(new Set(links.map(p=>p.href)).size,3);
 for(const p of links){const url=new URL(p.href,'https://aves.bio');assert.equal(url.searchParams.get('place'),p.id.split(':').at(-1));assert.equal(url.searchParams.get('region'),'central-andes');}
 for(const p of discoveryItems.filter(x=>x.kind==='place'&&x.countryId==='new-zealand'&&x.id.includes(':trip-'))){assert.ok(new URL(p.href,'https://aves.bio').searchParams.get('place'));assert.match(p.href,/#public-place-trip-/);}
});
