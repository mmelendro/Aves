import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';

const source=await readFile(process.argv[2]);
const hash=createHash('sha256').update(source).digest('hex');
if(hash!=='6866c877d39cba9c357620878839b336d569f8c662d3cfab4cb1dbe2d39c977f')throw Error('Review changed Natural Earth source before regeneration');
const ids={COL:'colombia',AUS:'australia',NZL:'new-zealand'};
const features=JSON.parse(source).features.map(({geometry,properties:p})=>({type:'Feature',properties:{name:p.NAME_EN,id:ids[p.ADM0_A3]||''},geometry}));
await writeFile('public/data/planning-world.geojson',JSON.stringify({type:'FeatureCollection',source:'Natural Earth 110m countries, public domain',sourceSha256:hash,features})+'\n');
