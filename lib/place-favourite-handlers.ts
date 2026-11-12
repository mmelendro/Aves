import "server-only"
import {z} from "zod"
import {requireAccountUser} from "@/lib/account-auth"
import {accountBody,accountHandler} from "./account-http"
import {AccountError} from "./account-errors"
import {publicFavouritePlaces,publicPlaceById} from "./discovery-index"
const bodySchema=z.object({placeId:z.string().max(160).refine(id=>publicPlaceById.has(id),"Choose a reviewed public place.")}).strict()
const unavailable=()=>new AccountError(503,"Your favourite places could not be confirmed. Please retry.")
export const favouritesGet=()=>accountHandler(async()=>{
 const {user,client}=await requireAccountUser()
 const {data,error}=await client.from("account_place_favourites").select("place_id").eq("user_id",user.id).order("created_at").limit(201)
 if(error||!data)throw unavailable()
 return {ids:data.map(r=>r.place_id).filter(id=>publicPlaceById.has(id)),places:publicFavouritePlaces}
})
export const favouritesPost=(request:Request)=>accountHandler(async()=>{
 const {user,client}=await requireAccountUser(),body=await accountBody(request,bodySchema)
 const {data,error}=await client.from("account_place_favourites").insert({user_id:user.id,place_id:body.placeId}).select("place_id").maybeSingle()
 if(error?.code==="23505"){
  const existing=await client.from("account_place_favourites").select("place_id").eq("user_id",user.id).eq("place_id",body.placeId).maybeSingle()
  if(!existing.error&&existing.data?.place_id===body.placeId)return {stored:true,placeId:body.placeId}
 }
 if(error?.code==="23514")throw new AccountError(409,"You can keep up to 200 favourite places. Remove one before adding another.")
 if(error||data?.place_id!==body.placeId)throw unavailable()
 return {stored:true,placeId:body.placeId}
})
export const favouritesDelete=(request:Request)=>accountHandler(async()=>{
 const {user,client}=await requireAccountUser(),body=await accountBody(request,bodySchema)
 const {error}=await client.from("account_place_favourites").delete().eq("user_id",user.id).eq("place_id",body.placeId)
 if(error)throw unavailable()
 return {removed:true,placeId:body.placeId}
})
