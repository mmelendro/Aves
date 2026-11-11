const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const load=require('./helpers/load-ts.cjs')();
const {destinationRegions}=load('content/destination-regions.ts');
const insideRing=(point,ring)=>{
 let inside=false;
 for(let i=0,j=ring.length-1;i<ring.length;j=i++){
  const [x,y]=ring[i],[u,v]=ring[j];
  if((y>point[1])!==(v>point[1])&&point[0]<(u-x)*(point[1]-y)/(v-y)+x)inside=!inside;
 }
 return inside;
};
const insidePolygon=(point,rings)=>insideRing(point,rings[0])&&!rings.slice(1).some(r=>insideRing(point,r));
const contains=(feature,point)=>(feature.geometry.type==='Polygon'?[feature.geometry.coordinates]:feature.geometry.coordinates).some(rings=>insidePolygon(point,rings));
const collection=country=>JSON.parse(fs.readFileSync(`content/geographic-planning-regions/${country}.json`));
test('every selector has exactly one geographic planning feature with a label on its own land area',()=>{
 for(const [country,regions] of Object.entries(destinationRegions)){
  const data=collection(country);
  assert.equal(data.type,'FeatureCollection');assert.equal(data.features.length,regions.length);
  assert.deepEqual(data.features.map(f=>f.properties.id).sort(),regions.map(r=>r.id).sort());
  assert.ok(fs.statSync(`content/geographic-planning-regions/${country}.json`).size<100000);
  for(const f of data.features){
   assert.ok(['Polygon','MultiPolygon'].includes(f.geometry.type));assert.ok(contains(f,f.properties.labelPoint),`${country}/${f.properties.id}`);
   const polygons=f.geometry.type==='Polygon'?[f.geometry.coordinates]:f.geometry.coordinates;
   for(const rings of polygons)for(const ring of rings){
    assert.ok(ring.length>=4);assert.deepEqual(ring[0],ring.at(-1));
    for(const [lon,lat] of ring)assert.ok(Number.isFinite(lon)&&Number.isFinite(lat)&&lon>=-180&&lon<=180&&lat>=-90&&lat<=90);
   }
  }
 }
});
test('Colombian editorial areas preserve distinct valleys and Andes without claiming ecological boundaries',()=>{
 const data=collection('colombia'),features=Object.fromEntries(data.features.map(f=>[f.properties.id,f]));
 for(const [id,point] of Object.entries({'pacific':[-77.27,5.71],'western-andes':[-76.1,5.1],'central-andes':[-75.32,4.89],'eastern-andes':[-74.07,4.71],'cauca-valley':[-76.52,3.45],'magdalena-valley':[-74.73,4.3],'sierra-nevada-de-santa-marta':[-73.7,10.8],'amazonia':[-71,0]}))assert.ok(contains(features[id],point),id);
 assert.equal(contains(features['cauca-valley'],[-74.73,4.3]),false);
 assert.equal(contains(features['magdalena-valley'],[-76.52,3.45]),false);
 assert.ok(data.features.every(f=>f.properties.kind==='approximate-planning-area'));
 assert.match(data.provenance.limitations,/may overlap or leave gaps/);assert.match(data.provenance.contextSourceRole,/does not supply/);
});
test('administrative and island outlines do not masquerade as the Colombian editorial classification',()=>{
 assert.ok(collection('australia').features.every(f=>f.properties.kind==='generalised-state-or-territory'));
 assert.ok(collection('new-zealand').features.every(f=>f.properties.kind==='generalised-main-island-group'));
 for(const [id,point] of Object.entries({'north-island':[176,-38],'south-island':[170,-44],'rakiura':[167.8,-47]}))assert.ok(contains(collection('new-zealand').features.find(f=>f.properties.id===id),point),id);
});

test('New Zealand groups assign each source island only once, including Cook Strait islands',()=>{
 const islands=Object.fromEntries(collection('new-zealand').features.map(f=>[f.properties.id,f]));
 assert.equal(contains(islands['south-island'],[173.87,-40.83]),true);
 assert.equal(contains(islands['north-island'],[173.87,-40.83]),false);
 assert.deepEqual(Object.values(islands).map(f=>f.geometry.type==='Polygon'?1:f.geometry.coordinates.length),[2,4,1]);
});
