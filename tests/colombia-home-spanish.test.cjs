const {test}=require('node:test')
const assert=require('node:assert/strict')
const fs=require('node:fs'),path=require('node:path'),ts=require('typescript'),React=require('react')
const root=path.resolve(__dirname,'..')
let pathname='/colombia'
const code=ts.transpileModule(fs.readFileSync(path.join(root,'components/colombia-home-language.tsx'),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,esModuleInterop:true}}).outputText
const exported={}
new Function('require','exports',code)(name=>name==='next/navigation'?{usePathname:()=>pathname}:name.startsWith('@/content/')?require(path.join(root,name.slice(2))):require(name),exported)

test('Colombia copy translates rendered labels without changing links, values, identity or handlers',()=>{
 const callback=()=>{}
 const original=React.createElement('a',{href:'/regions/central-andes',id:'English-id',onClick:callback},React.createElement('input',{placeholder:'Your first name',value:'Your first name'}),'Explore Colombia')
 const result=exported.useColombiaHomeCopy()(original)
 assert.equal(result.props.href,original.props.href)
 assert.equal(result.props.id,'English-id')
 assert.equal(result.props.onClick,callback)
 assert.equal(result.props.children[0].props.placeholder,'Tu nombre')
 assert.equal(result.props.children[0].props.value,'Your first name')
 assert.equal(result.props.children[1],'Explora Colombia')
})
test('other destinations keep their original English React tree',()=>{
 for(const path of ['/','/new-zealand','/regions/central-andes','/australia']){
  pathname=path
  const original=React.createElement('p',{},'Explore Colombia')
  assert.equal(exported.useColombiaHomeCopy()(original),original)
 }
 pathname='/colombia'
})
