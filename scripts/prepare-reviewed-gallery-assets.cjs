/** Local review helper: consume an explicit reviewed source manifest, never scrape or select images automatically. */
const fs=require('node:fs'),path=require('node:path'),sharp=require('sharp')
async function main(){
 const input=process.argv[2]
 if(!input)throw Error('Pass the local source manifest after source review.')
 const records=JSON.parse(fs.readFileSync(input,'utf8'))
 for(const r of records){
  const output=path.join('public/images/places',`au-${r.place}.webp`)
  await sharp(r.originalLocal).autoOrient().resize({width:1600,withoutEnlargement:true}).webp({quality:84}).toFile(output)
  console.log(output)
 }
}
main().catch(e=>{console.error(e.message);process.exitCode=1})
