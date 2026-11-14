import "server-only";
import codes from "@/content/ebird-species-links.json";
/** Exact names in eBird's published taxonomy; never manufacture a species code. */
export function ebirdLink(scientificName:string){
 const code=(codes as Record<string,string>)[scientificName.trim()];
 return code?{code,url:`https://ebird.org/species/${code}`,label:"eBird"}:{code:undefined,url:`https://www.google.com/search?q=${encodeURIComponent('site:ebird.org/species/ "'+scientificName+'"')}`,label:"Find on eBird"};
}
