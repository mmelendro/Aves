const {test}=require('node:test'),assert=require('node:assert/strict')
const {componentHarness,find,nodes}=require('./helpers/component-harness.cjs'),load=require('./helpers/load-ts.cjs')()
test('new name records retain diacritics, source scope and external pronunciation without assumed recordings',()=>{
 const {reviewedNames}=load('content/cultural-names.ts')
 for(const [id,name]of [['nz-tui','tūī'],['nz-kaka','kākā'],['nz-kereru','kererū']]){const r=reviewedNames('bird',id,'new-zealand')[0];assert.equal(r.name,name);assert.equal(r.pronunciationGuide,undefined)}
 const r=reviewedNames('bird','au-laughing-kookaburra','australia')[0];assert.equal(r.language,'Dharug');assert.match(r.context,/Sydney Basin/);assert.match(r.pronunciationGuide.url,/dharug\.dalang\.com\.au/)
})
test('story disclosure preserves country context, offers Spanish prose and pauses the slideshow',()=>{
 let opened=0
 const h=componentHarness('components/bird-story.tsx','default',{birdId:'nz-kea',countryId:'new-zealand',onOpen:()=>opened++})
 let tree=h.render();find(tree,n=>n.type==='details').props.onToggle({currentTarget:{open:true}});assert.equal(opened,1)
 assert.equal(find(tree,n=>n.type==='article').props.lang,'en')
 find(tree,n=>n.type==='button').props.onClick();tree=h.render();assert.equal(find(tree,n=>n.type==='article').props.lang,'es')
 assert.ok(nodes(tree).some(n=>n.type==='a'&&n.props.href.startsWith('https://www.doc.govt.nz/')))
 assert.equal(componentHarness('components/bird-story.tsx','default',{birdId:'nz-kea',countryId:'australia'}).render(),null)
})
test('lower-bandwidth photos retain their credited source and small rendition even in expanded media',()=>{
 const manifest=require('../content/photo-renditions.json'),[src,row]=Object.entries(manifest.images)[0]
 const h=componentHarness('components/responsive-photo.tsx','default',{src,alt:'Same credited bird',fill:true},{context:()=>true,mocks:{'./media-preferences':{useMediaPreferences:()=>({lowBandwidth:true})}}})
 const tree=h.render(),source=find(tree,n=>n.type==='source'),image=find(tree,n=>n.type==='Image')
 assert.match(source.props.srcSet,/640w$/);assert.doesNotMatch(source.props.srcSet,/,/);assert.equal(image.props.src,src);assert.equal(image.props.alt,'Same credited bird')
})
