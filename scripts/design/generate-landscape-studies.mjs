import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { profileSvg } from '../../lib/landscape-study.mjs'
const root = fileURLToPath(new URL('../../',import.meta.url))
const catalogue=JSON.parse(await readFile(`${root}content/landscape-profiles.json`,'utf8'))
await mkdir(`${root}docs/design/landscapes`,{recursive:true})
for(const profile of catalogue.profiles) await writeFile(`${root}docs/design/landscapes/${profile.id.replaceAll('/','--')}.svg`,profileSvg(profile)+'\n')
console.log(`Generated ${catalogue.profiles.length} review-only vector studies.`)
