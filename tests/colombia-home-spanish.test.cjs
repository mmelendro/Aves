const {test}=require('node:test')
const assert=require('node:assert/strict')
const fs=require('node:fs'),path=require('node:path'),ts=require('typescript'),React=require('react')
const root=path.resolve(__dirname,'..')
const code=ts.transpileModule(fs.readFileSync(path.join(root,'components/colombia-home-language.tsx'),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText
const exported={}
new Function('require','exports',code)(name=>name.startsWith('@/content/')?require(path.join(root,name.slice(2))):require(name),exported)

test('Colombia copy translates rendered labels without changing links, values, identity or handlers',()=>{
 const callback=()=>{}
 const original=React.createElement('a',{href:'/regions/central-andes',id:'English-id',onClick:callback},React.createElement('input',{placeholder:'Your first name',value:'Your first name'}),'Explore Colombia')
 const result=exported.translateColombiaHomeTree(original)
 assert.equal(result.props.href,original.props.href)
 assert.equal(result.props.id,'English-id')
 assert.equal(result.props.onClick,callback)
 assert.equal(result.props.children[0].props.placeholder,'Tu nombre')
 assert.equal(result.props.children[0].props.value,'Your first name')
 assert.equal(result.props.children[1],'Explora Colombia')
})
test('homepage defaults to English and provides an explicit language switch',()=>{
 const {renderToStaticMarkup}=require('react-dom/server')
 const html=renderToStaticMarkup(React.createElement(exported.ColombiaHomeLanguage,{},React.createElement('h1',{},'Explore Colombia'),React.createElement(exported.ColombiaHomeLanguageToggle)))
 assert.ok(html.includes('lang="en"'))
 assert.ok(html.includes('Explore Colombia'))
 assert.ok(html.includes('Cambiar a español colombiano'))
 assert.ok(!html.includes('Explora Colombia'))
})

test('shared Colombia navigation and footer translate their rendered copy and keep account intent',()=>{
 const {renderToStaticMarkup}=require('react-dom/server')
 const load=require('./helpers/load-ts.cjs')({mocks:{
  '@/components/colombia-home-language':{useColombiaHomeCopy:()=>exported.translateColombiaHomeTree,ColombiaHomeLanguageToggle:()=>React.createElement('button',{},'Language')},
  '@/lib/header-landscape.mjs':{selectedHeaderProfile:()=>undefined},
  'next/navigation':{usePathname:()=>'/colombia'},
  '@/components/header-landscape-context':{useHeaderLandscape:()=>({selection:{country:'colombia'}})},
  '@/components/header-contour':{HeaderContour:()=>null},
  '@/components/brand-mark':{BrandMark:()=>null},
  'next/link':({children,...props})=>React.createElement('a',props,children),
 }})
 const header=renderToStaticMarkup(React.createElement(load('components/navigation-header.tsx').NavigationHeader))
 assert.match(header,/Mis viajes/)
 assert.match(header,/href="\/account\?country=colombia"/)
 assert.match(header,/href="\/aves-explorer"/)
 const footer=renderToStaticMarkup(React.createElement(load('components/footer.tsx').Footer))
 assert.match(footer,/Elige tu destino/)
 assert.match(footer,/href="\/account\?country=colombia"/)
 assert.match(footer,/href="\/site-map"/)
 assert.match(footer,/certificad/)
})

test('shared navigation labels and destinations have complete Spanish copy',()=>{
 for (const [english,spanish] of Object.entries({
  'How it works':'Cómo funciona','Open navigation menu':'Abrir menú de navegación',
  'Close navigation menu':'Cerrar menú de navegación','Mobile navigation':'Navegación móvil',
  'Explore destinations':'Explorar destinos','New Zealand':'Nueva Zelanda',
 })) assert.equal(exported.colombiaHomeText(english),spanish)
})
