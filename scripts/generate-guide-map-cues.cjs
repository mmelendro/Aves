/** Regenerate only from the site's reviewed geometry. No downloads or paid APIs. */
const {readFileSync,writeFileSync,mkdirSync}=require('node:fs')
const {resolve}=require('node:path')
const {createHash}=require('node:crypto')
const ts=require('typescript')
const root=resolve(__dirname,'..')
const json=path=>JSON.parse(readFileSync(resolve(root,path),'utf8'))
function readTs(file, dependencies={}) {
 const output={}
 const compiled=ts.transpileModule(readFileSync(resolve(root,file),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText
 new Function('require','exports',compiled)(name=>{
  if(!Object.hasOwn(dependencies,name))throw Error(`Unexpected generator import: ${name}`)
  return dependencies[name]
 },output)
 return output
}
const exportsAu=readTs('content/global-australian-map.ts')
const links=readTs('lib/region-links.ts')
const {colombiaMapMarkers}=readTs('content/colombia-map-markers.ts',{'@/lib/region-links':links})
const {australiaMapStates,australiaMapViewBox}=exportsAu
const world=json('content/world-map.json'),nz=json('content/new-zealand-map.json'),co=json('content/colombia-planning-boundaries.json')
const path=(d,fill='#c5dbd0')=>`<path d="${d}" fill="${fill}" stroke="#6e9582" stroke-width="1.4" fill-rule="evenodd"/>`
const svg=(viewBox,body,description)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"><desc>${description}</desc>${body}</svg>\n`
const files={
 'world.svg':svg(world.viewBox,path(world.outline)+world.countries.filter(c=>['COL','AUS','NZL'].includes(c.code)).map(c=>path(c.path,'#065f46')).join(''),'Natural Earth public-domain world overview; AVES destinations highlighted.'),
 'australia.svg':svg(australiaMapViewBox,australiaMapStates.map(s=>path(s.path)).join(''),'Natural Earth public-domain states and territories; generalised mainland and nearby islands. External territories omitted.'),
 'new-zealand.svg':svg(nz.viewBox,nz.islands.flatMap(i=>i.paths).map(d=>path(d)).join(''),'Natural Earth public-domain main-island overview.'),
 'colombia.svg':svg(co.viewBox,co.regions.map(r=>path(r.path)).join(''),'AVES planning regions from the existing Colombia artwork; not official ecological or administrative boundaries.')
}
const directory=resolve(root,'public/images/map-cues');mkdirSync(directory,{recursive:true})
const cues={
 world:{label:'World map',image:'/images/map-cues/world.svg',viewBox:world.viewBox},
 australia:{label:'Australia',image:'/images/map-cues/australia.svg',viewBox:australiaMapViewBox},
 'new-zealand':{label:'New Zealand',image:'/images/map-cues/new-zealand.svg',viewBox:nz.viewBox},
 colombia:{label:'Colombia',image:'/images/map-cues/colombia.svg',viewBox:co.viewBox},
}
function regional(country,id,label,viewBox,shape,point) {
 const file=`${country}-${id}.svg`
 const selected=`<g data-selected-region="${id}">${path(shape,'#065f46')}${point?`<circle cx="${point[0]}" cy="${point[1]}" r="15" fill="#065f46"/>`:''}</g>`
 files[file]=files[`${country}.svg`].replace('</svg>',selected+'</svg>')
 cues[`${country}/${id}`]={label,image:`/images/map-cues/${file}`,viewBox}
}
for(const state of australiaMapStates.filter(state=>state.regionId))regional('australia',state.regionId,state.name,australiaMapViewBox,state.path,state.label)
for(const island of nz.islands)regional('new-zealand',island.id,island.label,nz.viewBox,island.paths.join(' '))
for(const region of colombiaMapMarkers) {
 const boundary=co.regions.find(boundary=>boundary.name===region.name)
 if(!boundary)throw Error(`Missing reviewed boundary: ${region.slug}`)
 regional('colombia',region.slug,region.name,co.viewBox,boundary.path)
}
for(const [file,content] of Object.entries(files))writeFileSync(resolve(directory,file),content)
const inputs=['content/global-australian-map.ts','content/new-zealand-map.json','content/colombia-planning-boundaries.json','content/colombia-map-markers.ts','lib/region-links.ts','scripts/generate-guide-map-cues.cjs']
const sourceDigests=Object.fromEntries(inputs.map(file=>[file,createHash('sha256').update(readFileSync(resolve(root,file))).digest('hex')]))
const index=JSON.stringify({sources:{australia:exportsAu.australiaMapProvenance.sourceUrl,'new-zealand':nz.source.url},sourceDigests,cues},null,2)+'\n'
const indexPath=resolve(root,'content/guide-map-cues.json')
if(process.argv.includes('--check')) {
 if(readFileSync(indexPath,'utf8')!==index)throw Error('Map geometry changed. Run node scripts/generate-guide-map-cues.cjs and commit its index before building.')
} else writeFileSync(indexPath,index)
console.log(`Generated ${Object.keys(files).length} map cue assets from existing geometry`)
