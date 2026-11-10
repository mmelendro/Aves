/** Regenerate only from the site's reviewed geometry. No downloads or paid APIs. */
const {readFileSync,writeFileSync,mkdirSync}=require('node:fs')
const {resolve}=require('node:path')
const ts=require('typescript')
const root=resolve(__dirname,'..')
const json=path=>JSON.parse(readFileSync(resolve(root,path),'utf8'))
const exportsAu={}
const compiled=ts.transpileModule(readFileSync(resolve(root,'content/global-australian-map.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText
new Function('exports',compiled)(exportsAu)
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
for(const [file,content] of Object.entries(files))writeFileSync(resolve(directory,file),content)
console.log(`Generated ${Object.keys(files).length} map cue assets from existing geometry`)
