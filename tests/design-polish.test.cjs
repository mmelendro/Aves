const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const load=require('./helpers/load-ts.cjs')();
test('each country owns its inventory and shared tools remain separate from legal information',()=>{
 const tree=load('lib/destination-site-tree.ts').buildDestinationSiteTree();
 const descend=n=>[n,...(n.children||[]).flatMap(descend)];
 for(const country of ['colombia','australia','new-zealand']){
  const branch=tree.children.find(n=>n.id===country);
  assert.ok(descend(branch).some(n=>n.href===`/species/reference?country=${country}`));
 }
 const info=tree.children.find(n=>n.id==='website-information');
 assert.ok(!descend(info).some(n=>n.href?.startsWith('/species/reference')));
 assert.ok(descend(tree.children.find(n=>n.id==='shared-tools')).some(n=>n.href==='/search'));
});
test('receipt validation failures get recovery text while conflicts retain actionable messages',()=>{
 const api=load('components/account/account-api.ts');
 const validation=Object.assign(new Error('[technical receipt fields]'),{name:'ZodError'});
 assert.equal(api.errorMessage(validation),'The saved result could not be confirmed. Keep your edits and retry.');
 assert.equal(api.errorMessage(new api.AccountRequestError('Keep your edits: version conflict.',409)),'Keep your edits: version conflict.');
});
test('consolidated legacy image URLs retain byte-identical canonical files through explicit aliases',()=>{
 const manifest=require('../docs/audit/ASSET-CONSOLIDATION-70.json');
 const aliases=require('../content/legacy-asset-aliases.json');
 const crypto=require('node:crypto');
 for(const row of manifest.aliases){
  assert.equal(aliases[row.old],row.target);
  assert.equal(crypto.createHash('sha256').update(fs.readFileSync('public'+row.target)).digest('hex'),row.sha256);
  assert.ok(!fs.existsSync('public'+row.old));
 }
});

test('old gallery bookmark intent requires a reviewed place in the selected country and region',()=>{
 const {isReviewedGalleryPlace:valid}=load('lib/explorer-location.ts');
 assert.ok(valid({country:'colombia',region:'central-andes'},'nevado-del-ruiz'));
 assert.ok(valid({country:'colombia',region:''},'nevado-del-ruiz'));
 assert.ok(!valid({country:'colombia',region:'eastern-andes'},'nevado-del-ruiz'));
 assert.ok(!valid({country:'australia',region:''},'nevado-del-ruiz'));
 assert.ok(!valid({country:'__proto__',region:''},'constructor'));
});
