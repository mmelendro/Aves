const { test }=require('node:test')
const assert=require('node:assert/strict')
const {readFileSync}=require('node:fs')
const {resolve,dirname,extname}=require('node:path')
const ts=require('typescript')
const root=resolve(__dirname,'..'),cache=new Map()
function load(file){
 if(cache.has(file))return cache.get(file)
 if(file.endsWith('.json'))return JSON.parse(readFileSync(resolve(root,file),'utf8'))
 const result={};cache.set(file,result)
 const code=ts.transpileModule(readFileSync(resolve(root,file),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,esModuleInterop:true}}).outputText
 new Function('require','exports',code)(name=>name.startsWith('@/')?load(name.slice(2)+(extname(name)?'':'.ts')):name.startsWith('.')?load(resolve(dirname(file),name).replace(root+'/','')+(extname(name)?'':'.ts')):require(name),result)
 return result
}
const {explorerLocation,readExplorerLocation,explorerLocationHref}=load('lib/explorer-location.ts')
const {destinationRegions}=load('content/destination-regions.ts')
test('every country and all 23 known regions round-trip through a public URL',()=>{
 let count=0
 for(const [country,regions] of Object.entries(destinationRegions)){
  const overview=explorerLocation(country)
  assert.deepEqual(readExplorerLocation(explorerLocationHref('/',overview).split('?')[1],explorerLocation()),overview)
  for(const {id} of regions){const value=explorerLocation(country,id);const href=explorerLocationHref('/colombia?utm_source=example#places',value);assert.ok(href.includes('utm_source=example'));assert.ok(href.endsWith('#places'));assert.deepEqual(readExplorerLocation(new URL(href,'https://aves.bio').search,overview),value);count++}
 }
 assert.equal(count,23)
})
test('unknown or cross-country regions never turn into a false selected place',()=>{
 const fallback=explorerLocation('colombia','caribbean')
 assert.deepEqual(readExplorerLocation('',fallback),fallback)
 for(const country of ['missing','constructor','__proto__'])assert.deepEqual(readExplorerLocation('?explore='+country+'&region=south-island',fallback),fallback)
 assert.deepEqual(readExplorerLocation('?explore=colombia&region=south-island',fallback),explorerLocation('colombia'))
 assert.deepEqual(readExplorerLocation('?explore=world&region=caribbean',fallback),explorerLocation())
 assert.equal(explorerLocationHref('/regions/caribbean?explore=colombia&region=caribbean',explorerLocation()),'/regions/caribbean?explore=world')
})
