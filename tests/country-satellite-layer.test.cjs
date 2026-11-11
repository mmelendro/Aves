const {test}=require('node:test');const assert=require('node:assert/strict');
const fs=require('node:fs'),{createHash}=require('node:crypto');
const load=require('./helpers/load-ts.cjs')();
const {countrySatelliteSource}=load('components/country-satellite-layer.tsx');
test('country reference imagery is traceable, bounded and fitted to matching geography',()=>{
 for(const country of ['australia','new-zealand','colombia']){
  const s=countrySatelliteSource(country),bytes=fs.readFileSync('public'+s.asset);
  assert.equal(createHash('sha256').update(bytes).digest('hex'),s.sha256);assert.ok(bytes.length<500000);
  assert.equal(s.year,2004);assert.ok(s.maxVertexResidual<.1);assert.equal(s.fit.length,3);assert.match(s.limitations,/not current conditions/);
 }
 for(const country of ['unknown','world'])assert.equal(countrySatelliteSource(country),null);
 const shared=load('content/global-australian-map.ts'),legacy=load('features/australia/content/australia-map.ts');
 assert.deepEqual(legacy.australiaMapStates.map(s=>s.path),shared.australiaMapStates.map(s=>s.path));
});
test('country image is conditional, clipped and fails back without losing the map',()=>{
 for(const background of ['habitats','satellite']){
  const changes=[];const loader=require('./helpers/load-ts.cjs')({mocks:{'./map-layer-context':{useMapLayers:()=>({layers:{background},update:p=>changes.push(p)})}}});
  const c=loader('components/country-satellite-layer.tsx');const result=c.CountrySatelliteImage({country:'australia',clip:'url(#test)'});
  if(background==='habitats')assert.equal(result,null);else{
   assert.equal(result.props.clipPath,'url(#test)');assert.equal(result.props.pointerEvents,'none');result.props.onError();assert.deepEqual(changes,[{background:'habitats',satelliteError:'australia'}]);
  }
 }
});
test('Colombia switches geographic renderers without stretching the editorial artwork',()=>{
 const React=require('react'),child=React.createElement('div',{'data-editorial-map':true});
 for(const background of ['habitats','satellite']){
  const loader=require('./helpers/load-ts.cjs')({mocks:{react:{...React,useId:()=>':test:'},'./map-layer-context':{useMapLayers:()=>({layers:{background},update:()=>{}})}}});
  const c=loader('components/country-satellite-layer.tsx');const tree=c.ColombiaSatelliteReplacement({children:child});
  if(background==='habitats')assert.equal(tree,child);
  else{const [svg,note]=tree.props.children;assert.equal(svg.type,'svg');assert.equal(svg.props.viewBox,'0 0 634 802');assert.match(note.props.children,/editorial boundaries are not geographic overlays/);assert.equal(svg.props['aria-label'],'Colombia geographic satellite overview');}
 }
});
