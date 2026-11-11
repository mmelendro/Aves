const {test}=require('node:test');
const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const {createHash}=require('node:crypto');
const load=require('./helpers/load-ts.cjs')();
const source=load('content/world-satellite-source.json');
test('packaged satellite raster has traceable source bytes and a bounded transfer size',()=>{
 const bytes=readFileSync('public'+source.asset);
 assert.equal(bytes.toString('ascii',0,4),'RIFF');
 assert.equal(createHash('sha256').update(bytes).digest('hex'),source.sha256);
 assert.ok(bytes.length<500000);assert.match(source.projection,/Equal Earth/);
 assert.equal(source.year,2004);assert.match(source.limitations,/not current conditions/);
});
test('satellite fetch is conditional and overlay preserves country hit targets',()=>{
 const React=require('react');
 for(const satellite of [false,true]){
  const loader=require('./helpers/load-ts.cjs')({mocks:{react:{...React,useContext:()=>({satellite,setSatellite:()=>{},setFailed:()=>{}})}}});
  const result=loader('components/world-satellite-layer.tsx').WorldSatelliteLayer();
  if(!satellite)assert.equal(result,null);
  else{assert.equal(result.type,'image');assert.equal(result.props.href,source.asset);assert.equal(result.props.pointerEvents,'none');assert.equal(result.props.clipPath,'url(#world-satellite-outline)');}
 }
});
test('world map remains one SVG with selectable countries above the imagery',()=>{
 const source=readFileSync('components/world-destination-map.tsx','utf8');
 assert.equal((source.match(/<svg\b/g)||[]).length,1);
 assert.ok(source.indexOf('<WorldSatelliteLayer/>')<source.indexOf('<WorldMapCountry'));
 assert.match(source,/<WorldSatelliteCredit\/>/);
});
