const {test}=require('node:test')
const assert=require('node:assert/strict')
const {componentHarness,nodes,find}=require('./helpers/component-harness.cjs')
const articleMocks={
 '@/components/article-hero':{__esModule:true,default:'ArticleHero'},
 '@/components/navigation-header':{NavigationHeader:'NavigationHeader'},
 '@/components/footer':{Footer:'Footer'},
 '@/components/audio-player':{AudioPlayer:'AudioPlayer'},
}
for(const route of ['choco-toucan-expedition','hummingbird-vision-journey','paramo-manizales-thornbill','sierra-nevada-indigenous-birding']){
 test(`${route} has one main target, wrapping breadcrumbs and its existing media hero`,()=>{
  const tree=componentHarness(`app/blog/${route}/page.tsx`,'default',{}, {mocks:articleMocks}).render()
  const mains=nodes(tree).filter(node=>node.type==='main')
  assert.equal(mains.length,1)
  assert.equal(mains[0].props.id,'main-content')
  assert.equal(mains[0].props.tabIndex,-1)
  find(mains[0],node=>node.type==='ArticleHero')
  const breadcrumb=find(mains[0],node=>node.type==='nav'&&node.props['aria-label']==='Breadcrumb')
  assert.match(breadcrumb.props.className,/flex-wrap/)
  assert.equal(nodes(mains[0]).some(node=>['Footer','NavigationHeader'].includes(node.type)),false)
 })
}
test('account header uses shared chrome and global identity despite a previous map selection',()=>{
 const tree=componentHarness('components/new-zealand-header.tsx','NewZealandHeader',{country:'global',surface:'account',navigationLinks:[{href:'/account',label:'My Trips'}]}, {mocks:{
  'next/navigation':{usePathname:()=>'/account/sign-in'},
  '@/components/header-landscape-context':{useHeaderLandscape:()=>({selection:{country:'colombia',regionId:'caribbean'}})},
 }}).render()
 const brand=find(tree,node=>node.type?.name==='BrandMark')
 assert.equal(brand.props.country,'global')
 assert.equal(brand.props.label,'Your Account')
 assert.equal(brand.props.labelHref,'/account')
 const contour=find(tree,node=>node.type==='HeaderContour')
 assert.equal(contour.props.country,'global')
 assert.equal(contour.props.regionId,undefined)
 find(tree,node=>node.type==='nav'&&node.props['aria-label']==='Account and country navigation')
 assert.ok(nodes(tree).filter(node=>node.type==='a'&&node.props.href==='/account').every(node=>node.props['aria-current']==='page'))
})
test('article hero shares PageHeading while retaining metadata and bird media',()=>{
 const tree=componentHarness('components/article-hero.tsx','default',{article:'paramo',title:'A title',eyebrow:'Birding',location:'Andes',date:'A date',readTime:'8 min read'}, {mocks:{'@/components/article-bird-carousel':{__esModule:true,default:'ArticleBirdCarousel'}}}).render()
 assert.equal(tree.type,'section')
 const heading=find(tree,node=>node.type?.name==='PageHeading')
 assert.equal(heading.props.title,'A title')
 assert.equal(find(tree,node=>node.type==='ArticleBirdCarousel').props.article,'paramo')
 assert.match(JSON.stringify(tree),/Andes/)
})
