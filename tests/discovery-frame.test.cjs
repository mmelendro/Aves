const {test}=require('node:test')
const assert=require('node:assert/strict')
const fs=require('node:fs')
const ts=require('typescript')
function load(name){const out={};new Function('exports','require',ts.transpileModule(fs.readFileSync(`${__dirname}/../lib/${name}.ts`,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText)(out,p=>load(p.replace('./','')));return out}
const {fitDiscoveryFrame,resizeDiscoveryFrame:resize}=load('discovery-frame')
const start={left:0,top:0,width:1000,height:640,share:50}
test('both inner edges move the shared boundary without changing the workspace',()=>{
 for(const [side,edge] of [['left','e'],['right','w']]){const next=resize(start,edge,side,100,0,1000);assert.ok(next.share>50);assert.equal(next.width,1000);assert.equal(next.left,0)}
})
test('outer sides preserve the opposite edge and stay in the container',()=>{
 const west=resize(start,'w','left',120,0,1000);assert.equal(west.left,120);assert.equal(west.width,880)
 const east=resize(start,'e','right',-180,0,1000);assert.equal(east.width,820);assert.equal(east.left,0)
 assert.equal(resize(start,'e','right',500,0,1000).width,1000)
 assert.equal(resize(start,'w','left',9999,0,1000).width,624)
})
test('corners combine dimensions and vertical edges preserve their opposite boundary',()=>{
 const north=resize(start,'nw','left',100,80,1000);assert.equal(north.top,80);assert.equal(north.height,560);assert.equal(north.width,900)
 const south=resize(start,'se','right',-100,200,1000);assert.equal(south.width,900);assert.equal(south.height,840)
 assert.equal(resize(start,'s','left',0,-9999,1000).height,480)
 assert.equal(resize(start,'s','right',0,9999,1000).height,1200)
})
test('viewport shrink keeps the entire frame in bounds',()=>{
 const next=fitDiscoveryFrame({...start,left:200,width:800,share:90},700)
 assert.equal(next.width,700);assert.equal(next.left,0);assert.ok(next.share<90)
 for(const side of ['left','right'])for(const edge of ['n','s','e','w','ne','nw','se','sw'])for(const delta of [-10000,10000]){
  const f=resize(start,edge,side,delta,delta,1000);assert.ok(f.left>=0&&f.left+f.width<=1000);assert.ok(f.height>=480&&f.height<=1200);assert.ok(f.width>=624)
 }
})
