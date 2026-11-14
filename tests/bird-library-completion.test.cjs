const {test}=require('node:test'),assert=require('node:assert/strict')
const loader=require('./helpers/load-ts.cjs')
const {componentHarness,find}=require('./helpers/component-harness.cjs')
test('all featured birds have exact eBird identity links with explicit parent scope',()=>{
 const load=loader(),{destinationBirds}=load('content/destination-birds.ts'),{ebirdProfile}=load('lib/ebird-profile.ts');let count=0,parents=0
 for(const birds of Object.values(destinationBirds))for(const bird of birds){const link=ebirdProfile(bird);assert.match(link.url,/^https:\/\/ebird\.org\/species\/[a-z0-9]+$/);count++;if(link.parentSpecies)parents++}
 assert.equal(count,73);assert.equal(parents,4);assert.equal(ebirdProfile({id:'nz-kea',scientificName:'Wrong identity'}),null)
})
test('resized photos offer actual originals while light mode remains bounded',()=>{
 const manifest=require('../content/photo-renditions.json'),[src,row]=Object.entries(manifest.images).find(([,r])=>r.width>1280)
 for(const light of [false,true]){
 const h=componentHarness('components/responsive-photo.tsx','default',{src,alt:'Credited original',fill:true},{mocks:{'./media-preferences':{useMediaPreferences:()=>({lowBandwidth:light,resolved:true})}}})
 const source=find(h.render(),n=>n.type==='source');if(light){assert.match(source.props.srcSet,/640w$/);assert.doesNotMatch(source.props.srcSet,/,/)}else assert.ok(source.props.srcSet.endsWith(`${src} ${row.width}w`))
 }
})
test('reference links use current exact names and larger previews preserve the original Commons file',()=>{
 const registry=require('../content/ebird-reference-links.json');assert.equal(registry['Nestor notabilis'],'kea1');assert.equal(registry['invented species'],undefined)
 const {nzChecklistMedia}=loader()('content/new-zealand-checklist-media.ts')
 const previews=[...nzChecklistMedia.values()].filter(x=>x.preview);assert.equal(previews.length,331)
 for(const photo of previews){assert.equal(new URL(photo.preview).hostname,'thumb.wikimedia.org');assert.match(photo.preview,/\/960px-/);assert.ok(photo.credit.sourceUrl.startsWith('https://commons.wikimedia.org/'))}
})
