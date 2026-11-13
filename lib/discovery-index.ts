import {MAX_PLAN_NOTES,MAX_PLAN_NOTES_BYTES} from "@/lib/planning-limits"
import {destinations} from "@/content/destinations"
import {destinationRegions} from "@/content/destination-regions"
import {placeGalleryPhotos} from "./place-gallery"
import north from "@/content/north-island-trip-catalogue.json"
import south from "@/content/south-island-trip-catalogue.json"
import conservation from "@/content/conservation-directory.json"

export type DiscoveryItem={id:string;kind:"country"|"region"|"place";countryId:string;name:string;description:string;href:string;sourceUrl?:string;regionId?:string}
const countries=new Map(destinations.map(d=>[d.id,d]))
const items:DiscoveryItem[]=[]
for(const d of destinations){
 items.push({id:`country:${d.id}`,kind:"country",countryId:d.id,name:d.name,description:d.description,href:d.href})
 for(const r of destinationRegions[d.id]??[])items.push({id:`region:${d.id}:${r.id}`,kind:"region",countryId:d.id,regionId:r.id,name:r.name,description:r.description??"Broad planning region",href:r.href})
}
for(const catalogue of [north,south])for(const place of catalogue.places)items.push({id:`place:new-zealand:${place.id}`,kind:"place",countryId:"new-zealand",regionId:catalogue.region,name:place.name,description:place.description,href:`/new-zealand/${catalogue.region}?base=${place.base}&place=${place.id}#public-place-${place.id}`,sourceUrl:place.url})
for(const photo of placeGalleryPhotos){
 const id=`place:${photo.countryId}:${photo.placeId}`
 if(items.some(item=>item.id===id))continue
 const region=destinationRegions[photo.countryId]?.find(r=>r.id===photo.regionId)
 const href=photo.countryId==="new-zealand"?`/new-zealand/${photo.regionId}?place=${photo.placeId}${photo.regionId==="south-island"?"#places":"#place-gallery"}`:`${countries.get(photo.countryId)?.href??"/"}?explore=${photo.countryId}&region=${photo.regionId}&place=${photo.placeId}#place-gallery`
 items.push({id,kind:"place",countryId:photo.countryId,regionId:photo.regionId,name:photo.placeName,description:`Reviewed landscape reference in ${region?.name??photo.regionId}. A photograph is not current access or a promised sighting.`,href,sourceUrl:photo.sourceUrl})
}
for(const r of conservation.records)items.push({id:`place:${r.countryId}:${r.id}`,kind:"place",countryId:r.countryId,regionId:r.regionId,name:r.name,description:r.description,href:`${countries.get(r.countryId)?.href??"/"}?explore=${r.countryId}&region=${r.regionId}&place=${r.id}#reference-${r.id}`,sourceUrl:r.sourceUrl})
export const discoveryItems:readonly DiscoveryItem[]=items
export const publicFavouritePlaces=items.filter(item=>item.kind==="place")
export const publicPlaceById=new Map(publicFavouritePlaces.map(item=>[item.id,item]))
export const searchText=(value:string)=>value.normalize("NFKD").replace(/\p{M}/gu,"").toLowerCase().replace(/[’']/g,"")
const aliases:Record<string,string>={"new-zealand":"Nueva Zelanda Aotearoa Isla Norte Isla Sur",colombia:"Colombia",australia:"Australia"}
export function searchDiscovery(query:string,country="",kind="",offset=0){
 const words=searchText(query.trim().slice(0,120)).split(/\s+/).filter(Boolean)
 const results=items.filter(item=>(!country||item.countryId===country)&&(!kind||item.kind===kind)&&words.every(word=>searchText(`${item.name} ${item.description} ${item.countryId} ${item.regionId??""} ${aliases[item.countryId]??""}`).includes(word)))
 const start=Math.min(Math.floor(Math.max(0,offset)/30)*30,Math.max(0,Math.floor((results.length-1)/30)*30))
 return {items:results.slice(start,start+30),total:results.length,offset:start}
}
/** Stable public references only. Existing notes and their private contents remain intact. */
export function appendFavouritePlaces(message:string,ids:string[],countryId:string){
 const places=ids.map(id=>publicPlaceById.get(id))
 if(!ids.length||ids.length>20||new Set(ids).size!==ids.length||places.some(p=>!p||p.countryId!==countryId))return {message,error:"Choose up to 20 distinct places in this trip’s country."}
 const lines=places.map(p=>`Place idea [${p!.id}]: ${p!.name}. Reference: ${p!.sourceUrl??"https://aves.bio"+p!.href}`)
 const existing=new Set(message.split(/\r?\n/).map(line=>line.trim()))
 const added=lines.filter(line=>!existing.has(line))
 const merged=added.length?`${message}${message?"\n\n":""}${added.join("\n")}`:message
 return merged.length<=MAX_PLAN_NOTES && new TextEncoder().encode(merged).length<=MAX_PLAN_NOTES_BYTES?{message:merged}:{message,error:"Your notes are nearly full. Shorten them before adding favourite places."}
}
