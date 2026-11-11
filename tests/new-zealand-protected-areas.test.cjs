const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {createHash}=require('node:crypto');
const manifest=require('../content/new-zealand-protected-areas.json');
const bytes=fs.readFileSync(`public${manifest.geometryPath}`),data=JSON.parse(bytes);
const polygons=f=>f.geometry.type==='Polygon'?[f.geometry.coordinates]:f.geometry.coordinates;
const inRing=(p,r)=>{let inside=false;for(let i=0,j=r.length-1;i<r.length;j=i++){const [x,y]=r[i],[u,v]=r[j];if((y>p[1])!==(v>p[1])&&p[0]<(u-x)*(p[1]-y)/(v-y)+x)inside=!inside;}return inside;};
const contains=(f,p)=>polygons(f).some(r=>inRing(p,r[0])&&!r.slice(1).some(h=>inRing(p,h)));
test('remaining NZ park pilot preserves four official units and clearly separates South Island coverage',()=>{
 assert.equal(data.type,'FeatureCollection');assert.equal(manifest.count,4);assert.equal(data.features.length,4);
 assert.deepEqual(manifest.areas.map(a=>a.id).sort(),['2792897','2792901','2793719','2801496']);
 assert.equal(manifest.areas.filter(a=>a.island==='north-island').length,3);assert.equal(manifest.areas.filter(a=>a.island==='rakiura').length,1);
 assert.ok(manifest.areas.every(a=>a.sourceType==='NATIONAL_PARK'&&a.legislationCode==='NATIONAL_PARK_ACT'));
 assert.equal(manifest.areas.find(a=>a.id==='2792897').name,'Te Papa-Kura-o-Taranaki');
 assert.match(manifest.areas.find(a=>a.id==='2792897').sourceName,/formerly Egmont/);
 assert.match(manifest.limitations,/not complete conservation-land coverage/);assert.match(manifest.limitations,/South Island retains/);assert.match(manifest.limitations,/Te Urewera/);
 const south=require('../content/south-island-layer-catalogue.json');assert.equal(south.parks.length,9);
 assert.ok(!manifest.areas.some(a=>south.parks.some(s=>s.name===a.name)));
});
test('NZ park data has exact source integrity, licence and retrieval-date scope without a live feature API',()=>{
 assert.equal(createHash('sha256').update(bytes).digest('hex'),manifest.geometrySha256);assert.ok(bytes.length<300000);
 assert.equal(manifest.inputSha256,'ba50d1bafed8bca4fe148a0529f737a9a0541ad0e8a99ca5d4f687b4c024b03a');
 assert.equal(manifest.licenceUrl,'https://creativecommons.org/licenses/by/4.0/');assert.match(manifest.attribution,/Crown Copyright: Department of Conservation Te Papa Atawhai 2026/);
 assert.equal(manifest.sourceDate,'2026-11-12');assert.match(manifest.dateScope,/Retrieval date, not a new legal gazettal/);
 const url=new URL(manifest.downloadUrl);assert.equal(url.searchParams.get('f'),'json');assert.equal(url.searchParams.get('outSR'),'4326');assert.match(manifest.sourceCrs,/EPSG:2193/);
 assert.equal(data.provenance.inputSha256,manifest.inputSha256);
 for(const a of manifest.areas)assert.equal(new URL(a.sourceUrl).hostname,'www.doc.govt.nz');
});
test('NZ park geometry preserves offshore islands and exclusion holes instead of filling nested Esri rings',()=>{
 const expected={'2792897':[15,1],'2792901':[155,6],'2793719':[23,1],'2801496':[131,4]};
 for(const f of data.features){
  const a=manifest.areas.find(a=>a.id===f.properties.id),check=manifest.geometryChecks.find(c=>c.id===a.id),parts=polygons(f);
  assert.deepEqual(f.properties,a);assert.ok(contains(f,a.labelPoint),a.name);
  assert.deepEqual([parts.length,parts.reduce((n,r)=>n+r.length-1,0)],expected[a.id]);assert.equal(check.polygons,parts.length);assert.ok(check.symmetricAreaChange<=.02);
  let w=Infinity,s=Infinity,e=-Infinity,n=-Infinity;
  for(const rings of parts)for(const r of rings){assert.ok(r.length>=4);assert.deepEqual(r[0],r.at(-1));for(const [x,y] of r){assert.ok(Number.isFinite(x)&&Number.isFinite(y)&&x>166&&x<177&&y>-48&&y<-38);w=Math.min(w,x);s=Math.min(s,y);e=Math.max(e,x);n=Math.max(n,y);}}
  assert.deepEqual(a.bounds,[w,s,e,n]);
  // Every hole contains excluded space. Its polygon centroid may lie outside a
  // concave hole, so test a deterministic interior sample near its first edge.
  for(const rings of parts)for(const hole of rings.slice(1)){
   const centre=hole.reduce((p,v)=>[p[0]+v[0]/hole.length,p[1]+v[1]/hole.length],[0,0]);
   if(inRing(centre,hole))assert.equal(contains(f,centre),false,a.name);
  }
 }
});
test('NZ named park boundaries align with independent summit and island control points',()=>{
 for(const [id,p] of [['2792897',[174.063,-39.296]],['2793719',[175.632,-39.159]],['2801496',[167.8,-47.05]]])assert.ok(contains(data.features.find(f=>f.properties.id===id),p),id);
 assert.equal(contains(data.features.find(f=>f.properties.id==='2801496'),[174.063,-39.296]),false);
});
