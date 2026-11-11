const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {createHash}=require('node:crypto');
const manifest=require('../content/australia-protected-areas.json');
const bytes=fs.readFileSync(`public${manifest.geometryPath}`),data=JSON.parse(bytes);
const polygons=f=>f.geometry.type==='Polygon'?[f.geometry.coordinates]:f.geometry.coordinates;
const inRing=(p,r)=>{let inside=false;for(let i=0,j=r.length-1;i<r.length;j=i++){const [x,y]=r[i],[u,v]=r[j];if((y>p[1])!==(v>p[1])&&p[0]<(u-x)*(p[1]-y)/(v-y)+x)inside=!inside;}return inside;};
const contains=(f,p)=>polygons(f).some(r=>inRing(p,r[0])&&!r.slice(1).some(h=>inRing(p,h)));
test('Australian pilot has thirteen named parks across nine jurisdictions and preserves official classifications',()=>{
 assert.equal(data.type,'FeatureCollection');assert.equal(data.features.length,13);assert.equal(manifest.count,13);
 assert.deepEqual([...new Set(manifest.areas.map(a=>a.state))].sort(),['ACT','JBT','NSW','NT','QLD','SA','TAS','VIC','WA']);
 assert.deepEqual(data.features.map(f=>f.properties.id).sort(),manifest.areas.map(a=>a.id).sort());
 assert.equal(new Set(manifest.areas.map(a=>a.id)).size,13);
 for(const a of manifest.areas){assert.equal(a.status,'Y');assert.ok(['T','B'].includes(a.environment));assert.ok(['National Park','National Park (Commonwealth)'].includes(a.category));}
 assert.equal(manifest.areas.find(a=>a.id==='CWTH_06').category,'National Park (Commonwealth)');
 assert.equal(manifest.areas.find(a=>a.id==='NSW_N0004').governance,'J');
 assert.match(manifest.limitations,/not national coverage/);assert.match(manifest.limitations,/current access/);assert.match(manifest.limitations,/Indigenous Protected Areas/);
 // Do not display the small NP residual as the entire Aboriginal-managed Daintree estate.
 assert.ok(!manifest.areas.some(a=>a.name==='Daintree'));
});
test('Australian boundary payload is optional, bounded and attributed to the reviewed CAPAD edition',()=>{
 assert.equal(createHash('sha256').update(bytes).digest('hex'),manifest.geometrySha256);assert.ok(bytes.length<600000);
 assert.equal(manifest.sourceDate,'2024-06-30');assert.equal(manifest.licenceUrl,'https://creativecommons.org/licenses/by/4.0/');
 assert.match(manifest.attribution,/CAPAD\) 2024, Commonwealth of Australia 2025/);
 assert.match(manifest.sourceCrs,/EPSG:4283/);assert.match(manifest.outputCrs,/WGS84/);
 for(const s of manifest.inputSources){assert.match(s.sha256,/^[a-f0-9]{64}$/);const u=new URL(s.url);assert.equal(u.hostname,'gis.environment.gov.au');assert.equal(u.searchParams.get('outSR'),'4326');assert.equal(u.searchParams.get('resultRecordCount'),'3000');}
 assert.deepEqual(data.provenance.inputSources,manifest.inputSources);
});
test('Australian park unions preserve all islands and holes, valid rings, interior labels and catalogue bounds',()=>{
 for(const f of data.features){
  const a=manifest.areas.find(a=>a.id===f.properties.id),check=manifest.geometryChecks.find(c=>c.id===a.id),parts=polygons(f);
  assert.deepEqual(f.properties,a);assert.ok(contains(f,a.labelPoint),a.name);
  assert.equal(parts.length,check.polygons);assert.equal(parts.reduce((n,r)=>n+r.length-1,0),check.holes);assert.ok(check.symmetricAreaChange<=.02);
  let w=Infinity,s=Infinity,e=-Infinity,n=-Infinity;
  for(const rings of parts)for(const ring of rings){assert.ok(ring.length>=4);assert.deepEqual(ring[0],ring.at(-1));for(const [x,y] of ring){assert.ok(Number.isFinite(x)&&Number.isFinite(y)&&x>110&&x<155&&y>-45&&y<-10);w=Math.min(w,x);s=Math.min(s,y);e=Math.max(e,x);n=Math.max(n,y);}}
  assert.deepEqual(a.bounds,[w,s,e,n]);
  const record=new URL(a.sourceUrl);assert.equal(record.searchParams.get('where'),`PA_ID='${a.id}'`);assert.equal(record.searchParams.get('returnGeometry'),'false');
 }
 assert.equal(manifest.geometryChecks.find(c=>c.id==='ACT_39').sourceParcels,13);
 assert.equal(manifest.geometryChecks.find(c=>c.id==='TAS_50251').sourceParcels,92);
});
test('Royal, Blue Mountains and Kakadu boundaries align with independent geographic control points',()=>{
 for(const [id,p] of [['NSW_N0030',[151.05,-34.1]],['NSW_N0004',[150.3,-33.7]],['CWTH_06',[132.55,-13]]])assert.ok(contains(data.features.find(f=>f.properties.id===id),p),id);
 assert.equal(contains(data.features.find(f=>f.properties.id==='NSW_N0030'),[151.21,-33.86]),false);
});
