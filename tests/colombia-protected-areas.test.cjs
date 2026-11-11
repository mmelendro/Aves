const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {createHash}=require('node:crypto');
const manifest=require('../content/colombia-protected-areas.json');
const bytes=fs.readFileSync(`public${manifest.geometryPath}`);
const data=JSON.parse(bytes);
const polygons=f=>f.geometry.type==='Polygon'?[f.geometry.coordinates]:f.geometry.coordinates;
const insideRing=(point,ring)=>{
 let inside=false;
 for(let i=0,j=ring.length-1;i<ring.length;j=i++){
  const [x,y]=ring[i],[u,v]=ring[j];
  if((y>point[1])!==(v>point[1])&&point[0]<(u-x)*(point[1]-y)/(v-y)+x)inside=!inside;
 }
 return inside;
};
const contains=(f,p)=>polygons(f).some(r=>insideRing(p,r[0])&&!r.slice(1).some(h=>insideRing(p,h)));
test('national protected snapshot has explicit scope, accepted source status and matched catalogue',()=>{
 assert.equal(data.type,'FeatureCollection');assert.equal(data.features.length,109);
 assert.equal(manifest.count,109);assert.equal(manifest.nationalSourceCount,124);assert.equal(manifest.omittedProvisional.length,15);
 const ids=data.features.map(f=>f.properties.id);assert.equal(new Set(ids).size,109);
 assert.deepEqual(ids.slice().sort(),manifest.areas.map(a=>a.id).sort());
 assert.ok(data.features.every(f=>['INSCRITA','REGISTRADA'].includes(f.properties.status)));
 assert.ok(manifest.omittedProvisional.every(f=>f.status==='CONSTRUCCION'&&!ids.includes(f.id)));
 assert.equal(manifest.categories['Parque Nacional Natural'],43);
 assert.ok(!data.features.some(f=>/Regional|Sociedad Civil/.test(f.properties.category)));
 assert.match(manifest.limitations,/Regional\/private/);assert.match(manifest.limitations,/current access/);
});
test('derived geometry has verified integrity, licence, source date and bounded optional payload',()=>{
 assert.equal(createHash('sha256').update(bytes).digest('hex'),manifest.geometrySha256);
 assert.ok(bytes.length<2000000);assert.equal(manifest.sourceDate,'2026-11-06');
 assert.equal(data.provenance.licence,'CC BY-SA 4.0');assert.equal(manifest.licenceUrl,'https://creativecommons.org/licenses/by-sa/4.0/');
 assert.match(manifest.sourceCrs,/EPSG:4686/);assert.match(manifest.outputCrs,/WGS84/);
 assert.equal(manifest.inputSha256,'90f39221a5161561299429f917acf51763d232f5716eaafc80ae05f520b5a4cd');
});
test('all islands, holes, positions and record URLs survive the reviewed transformation',()=>{
 for(const f of data.features){
  const p=f.properties,area=manifest.areas.find(a=>a.id===p.id),check=manifest.geometryChecks.find(a=>a.id===p.id);
  assert.ok(['Polygon','MultiPolygon'].includes(f.geometry.type));
  const parts=polygons(f);assert.equal(parts.length,check.polygons);assert.equal(parts.reduce((sum,r)=>sum+r.length-1,0),check.holes);
  assert.ok(contains(f,p.labelPoint),p.name);
  assert.equal(p.sourceUrl,`https://runap.parquesnacionales.gov.co/area-protegida/${p.id}`);
  let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
  for(const rings of parts)for(const ring of rings){
   assert.ok(ring.length>=4);assert.deepEqual(ring[0],ring.at(-1));
   for(const [lon,lat] of ring){
    assert.ok(Number.isFinite(lon)&&Number.isFinite(lat)&&lon>-86&&lon<-66&&lat>-5&&lat<17,p.name);
    minX=Math.min(minX,lon);minY=Math.min(minY,lat);maxX=Math.max(maxX,lon);maxY=Math.max(maxY,lat);
   }
  }
  assert.deepEqual(area.bounds,[minX,minY,maxX,maxY]);
 }
});
test('known Tayrona, Los Nevados and Chingaza locations align with the correct protected polygons',()=>{
 for(const [id,point] of [['25',[-74.04,11.30]],['11',[-75.36,4.8]],['48',[-73.75,4.6]]]){
  assert.ok(contains(data.features.find(f=>f.properties.id===id),point),id);
 }
 assert.equal(contains(data.features.find(f=>f.properties.id==='25'),[-75.36,4.8]),false);
});
