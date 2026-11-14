import records from "@/content/ebird-profile-links.json"
const birds:Record<string,{scientificName:string;targetScientificName:string;code:string;scope:string}>=records.birds
/** Public outbound reference only. Never infer taxonomy or species presence from a URL. */
export function ebirdProfile(bird:{id:string;scientificName:string}) {
 const row=Object.hasOwn(birds,bird.id)?birds[bird.id]:undefined
 if(!row||row.scientificName!==bird.scientificName||!/^[a-z0-9]+$/.test(row.code))return null
 return {url:`https://ebird.org/species/${row.code}`,parentSpecies:row.scope==='parent species'}
}
