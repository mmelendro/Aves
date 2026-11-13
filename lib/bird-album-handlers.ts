import "server-only"
import {requireAccountUser} from "@/lib/account-auth"
import {accountBody,accountHandler} from "./account-http"
import {AccountError} from "./account-errors"
import {requireOwnedTrip,requireOwnedTripDetails} from "./trip-workspace-handlers"
import {albumSchema,albumWriteSchema,emptyAlbum,type BirdAlbum} from "./bird-album"
import {getReferenceSpecies,isSpeciesCountry} from "./species-reference"
import {countryRegionOptions,type TripCountry} from "@/content/trip-options"
import type {SupabaseClient} from "@supabase/supabase-js"
const unavailable=()=>new AccountError(503,"Your bird album could not be confirmed. Keep your edits and retry.")
export async function readAlbum(client:SupabaseClient,id:string){
 const {data,error}=await client.from("trip_bird_albums").select("revision,data").eq("plan_id",id).maybeSingle()
 if(error)throw unavailable()
 if(!data)return {revision:0,data:emptyAlbum()}
 const parsed=albumSchema.safeParse(data.data)
 if(!parsed.success||!Number.isSafeInteger(data.revision)||data.revision<1)throw unavailable()
 return {revision:data.revision as number,data:parsed.data}
}
function validBirds(data:BirdAlbum,country:TripCountry){
 if(!isSpeciesCountry(country))return false
 const regions=new Set(countryRegionOptions[country].map(r=>r.id))
 return data.birds.every(b=>{
  return (!b.regionId||regions.has(b.regionId))&&!!getReferenceSpecies(country,b.speciesId)
 })
}
export const albumGet=(id:string)=>accountHandler(async()=>{
 const {client,user}=await requireAccountUser();const {country,details}=await requireOwnedTripDetails(client,user.id,id)
 if(!isSpeciesCountry(country))throw new AccountError(400,"This destination does not yet have a bird album catalogue.")
 const saved=await readAlbum(client,id)
 const ids:unknown[]=country==="new-zealand"&&Array.isArray(details?.questionnaire?.birdIds)?details.questionnaire.birdIds:[]
 const wishes=[...new Set(ids)].flatMap(id=>{const b=typeof id==="string"?getReferenceSpecies(country,id):null;return b?[{id:b.id,name:b.commonName,scientificName:b.scientificName}]:[]})
 return {...saved,species:[...new Set(saved.data.birds.map(b=>b.speciesId))].map(id=>{const b=getReferenceSpecies(country,id);return {id,name:b?.commonName||"Species needs review",scientificName:b?.scientificName||""}}),wishes,unmatchedWishCount:ids.length-wishes.length}
})
export const albumPut=(request:Request,id:string)=>accountHandler(async()=>{
 const {client,user}=await requireAccountUser(),body=await accountBody(request,albumWriteSchema)
 const country=await requireOwnedTrip(client,user.id,id)
 if(!validBirds(body.data,country))throw new AccountError(400,"Choose a species and broad region from this trip’s country.")
 const next=body.expectedRevision+1
 const query=body.expectedRevision===0?client.from("trip_bird_albums").insert({plan_id:id,revision:next,data:body.data}):client.from("trip_bird_albums").update({revision:next,data:body.data}).eq("plan_id",id).eq("revision",body.expectedRevision)
 const {data,error}=await query.select("revision,data").maybeSingle()
 if(error&&error.code!=="23505")throw unavailable()
 if(!error&&data)return {revision:data.revision,data:albumSchema.parse(data.data)}
 const current=await readAlbum(client,id)
 if(current.revision===next&&JSON.stringify(current.data)===JSON.stringify(body.data))return current
 throw new AccountError(409,"Your album changed in another tab. Copy your unsaved notes before reopening.")
})
