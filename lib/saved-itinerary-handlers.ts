import "server-only"
import {requireAccountUser} from "./account-auth"
import {accountBody,accountHandler} from "./account-http"
import {AccountError} from "./account-errors"
import {requireOwnedTrip} from "./trip-workspace-handlers"
import {emptyItineraries,itinerariesSchema,itineraryWriteSchema,itinerarySourcesValid} from "./saved-itineraries"
import type {SupabaseClient} from "@supabase/supabase-js"
const unavailable=()=>new AccountError(503,"Your saved itineraries could not be confirmed. Keep your edits and retry.")
/** Reads preserve structurally valid historical references for complete backups.
 * Writes below additionally require current island sources and the owned NZ trip. */
export async function readItineraries(client:SupabaseClient,id:string){
 const {data,error}=await client.from("trip_itineraries").select("revision,data").eq("plan_id",id).maybeSingle()
 if(error)throw unavailable();if(!data)return {revision:0,data:emptyItineraries()}
 const parsed=itinerariesSchema.safeParse(data.data)
 if(!parsed.success||!Number.isSafeInteger(data.revision)||data.revision<1)throw unavailable()
 return {revision:data.revision as number,data:parsed.data}
}
export const itinerariesGet=(id:string)=>accountHandler(async()=>{
 const {client,user}=await requireAccountUser();await requireOwnedTrip(client,user.id,id);return readItineraries(client,id)
})
export const itinerariesPut=(request:Request,id:string)=>accountHandler(async()=>{
 const {client,user}=await requireAccountUser(),body=await accountBody(request,itineraryWriteSchema,65536),country=await requireOwnedTrip(client,user.id,id)
 if(country!=="new-zealand"||!itinerarySourcesValid(body.data))throw new AccountError(400,"Review each itinerary against this trip's island catalogue before saving.")
 const next=body.expectedRevision+1,query=body.expectedRevision===0?client.from("trip_itineraries").insert({plan_id:id,revision:next,data:body.data}):client.from("trip_itineraries").update({revision:next,data:body.data}).eq("plan_id",id).eq("revision",body.expectedRevision)
 const {data,error}=await query.select("revision,data").maybeSingle()
 if(error&&error.code!=="23505")throw unavailable()
 if(!error&&data)return {revision:data.revision,data:itinerariesSchema.parse(data.data)}
 const current=await readItineraries(client,id)
 if(current.revision===next&&JSON.stringify(current.data)===JSON.stringify(body.data))return current
 throw new AccountError(409,"This saved itinerary changed in another tab. Keep your edits before refreshing the saved route.")
})
