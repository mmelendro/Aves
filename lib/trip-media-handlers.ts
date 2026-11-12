import "server-only"
import {createHash} from "node:crypto"
import {z} from "zod"
import {requireAccountUser} from "@/lib/account-auth"
import {AccountError} from "./account-errors"
import {accountBody,accountHandler,requireSameOrigin,requestKey} from "./account-http"
import {requireOwnedTrip} from "./trip-workspace-handlers"
import {MAX_TRIP_MEDIA_BYTES,TRIP_MEDIA_BUCKET,mediaDetailsSchema,mediaPatchSchema,mediaDeleteSchema,mediaSignature,mediaTypes,type TripMediaItem} from "./trip-media"
import type {SupabaseClient} from "@supabase/supabase-js"
const columns="id,plan_id,user_id,entry_id,object_path,kind,mime,byte_size,content_hash,state,caption,creator,recorded_on,position,notes,revision"
type MediaRow={id:string;plan_id:string;user_id:string;entry_id:string;object_path:string;kind:"photo"|"audio"|"document";mime:keyof typeof mediaTypes;byte_size:number;content_hash:string;state:"pending"|"ready"|"deleting";caption:string;creator:string;recorded_on:string|null;position:number;notes:string;revision:number}
const unavailable=()=>new AccountError(503,"This upload could not be confirmed. Keep your file and retry.")
function mapMedia(r:MediaRow):TripMediaItem{return {id:r.id,entryId:r.entry_id,kind:r.kind,mime:r.mime,bytes:r.byte_size,state:r.state,caption:r.caption,creator:r.creator,recordedOn:r.recorded_on||"",position:r.position,notes:r.notes,revision:r.revision}}
async function ownMedia(client:SupabaseClient,planId:string,userId:string,id:string){
  if(!z.uuid().safeParse(id).success)throw new AccountError(404,"This upload could not be found.")
  const {data,error}=await client.from("trip_media").select(columns).eq("plan_id",planId).eq("user_id",userId).eq("id",id).maybeSingle()
  if(error)throw unavailable();return data as MediaRow|null
}
async function uploadBytes(request:Request){
  const reader=request.body?.getReader();if(!reader)throw new AccountError(400,"Choose a file to upload.")
  const chunks:Uint8Array[]=[];let size=0
  try{while(true){const {value,done}=await reader.read();if(done)break;size+=value.byteLength;if(size>MAX_TRIP_MEDIA_BYTES){await reader.cancel();throw new AccountError(413,"Choose a file up to 3 MiB.")}chunks.push(value)}}finally{reader.releaseLock()}
  if(!size)throw new AccountError(400,"This file is empty.")
  const bytes=new Uint8Array(size);let at=0;for(const chunk of chunks){bytes.set(chunk,at);at+=chunk.length}return bytes
}
export async function readTripMedia(client:SupabaseClient,planId:string,userId:string){
  const {data,error}=await client.from("trip_media").select(columns).eq("plan_id",planId).eq("user_id",userId).order("position").order("created_at").limit(20)
  if(error||!data)throw unavailable();return {items:(data as MediaRow[]).map(mapMedia)}
}
export const mediaGet=(planId:string)=>accountHandler(async()=>{
  const {user,client}=await requireAccountUser();await requireOwnedTrip(client,user.id,planId)
  return readTripMedia(client,planId,user.id)
})
export const mediaPost=(request:Request,planId:string)=>accountHandler(async()=>{
  const {user,client}=await requireAccountUser();requireSameOrigin(request);await requireOwnedTrip(client,user.id,planId)
  const id=requestKey(request),entryId=new URL(request.url).searchParams.get("entry")
  if(!z.uuid().safeParse(entryId).success)throw new AccountError(400,"Choose a saved journal entry first.")
  const {data:workspace,error:workspaceError}=await client.from("trip_workspaces").select("data").eq("plan_id",planId).maybeSingle()
  if(workspaceError)throw unavailable()
  if(!workspace?.data?.entries?.some((e:{id:string;deleted:boolean})=>e.id===entryId&&!e.deleted))throw new AccountError(409,"Save and reopen this journal entry before uploading.")
  const bytes=await uploadBytes(request),mime=mediaSignature(bytes)
  if(!mime||request.headers.get("content-type")?.split(";")[0]!==mime)throw new AccountError(415,"Use a supported photo, audio or PDF file with the correct format.")
  const format=mediaTypes[mime],hash=createHash("sha256").update(bytes).digest("hex")
  let row=await ownMedia(client,planId,user.id,id)
  if(row&&(row.content_hash!==hash||row.entry_id!==entryId||row.mime!==mime))throw new AccountError(409,"Choose this file again to start a new upload.")
  if(row?.state==="ready")return {item:mapMedia(row)}
  if(row?.state==="deleting")throw new AccountError(409,"Finish removing this upload before adding it again.")
  if(!row){
    const {data,error}=await client.from("trip_media").insert({id,plan_id:planId,user_id:user.id,entry_id:entryId,object_path:`${user.id}/${planId}/${id}.${format.extension}`,kind:format.kind,mime,byte_size:bytes.length,content_hash:hash}).select(columns).maybeSingle()
    if(error?.code==="PT409")throw new AccountError(409,"The private upload limit has been reached. Remove an unused upload before adding another.")
    if(error?.code==="23505"){row=await ownMedia(client,planId,user.id,id);if(!row||row.content_hash!==hash||row.entry_id!==entryId)throw new AccountError(409,"This upload reference has changed.")}
    else if(error||!data)throw unavailable();else row=data as MediaRow
  }
  if(!row)throw unavailable()
  const bucket=client.storage.from(TRIP_MEDIA_BUCKET)
  const uploaded=await bucket.upload(row.object_path,bytes,{contentType:mime,upsert:false,cacheControl:"0"})
  if(uploaded.error){
    // Verify a potentially completed first upload; never overwrite a retry path.
    const existing=await bucket.download(row.object_path)
    if(existing.error||!existing.data||createHash("sha256").update(new Uint8Array(await existing.data.arrayBuffer())).digest("hex")!==hash)throw unavailable()
  }
  const {data:ready,error}=await client.from("trip_media").update({state:"ready",revision:row.revision+1}).eq("id",id).eq("plan_id",planId).eq("user_id",user.id).eq("revision",row.revision).select(columns).maybeSingle()
  if(error)throw unavailable()
  if(!ready){const current=await ownMedia(client,planId,user.id,id);if(current?.state==="ready"&&current.content_hash===hash)return {item:mapMedia(current)};throw unavailable()}
  return {item:mapMedia(ready as MediaRow)}
})
export const mediaPatch=(request:Request,planId:string,id:string)=>accountHandler(async()=>{
  const {user,client}=await requireAccountUser();const body=await accountBody(request,mediaPatchSchema);await requireOwnedTrip(client,user.id,planId)
  const row=await ownMedia(client,planId,user.id,id);if(!row)throw new AccountError(404,"This upload could not be found.")
  if(row.state!=="ready")throw new AccountError(409,"Finish uploading or removing this file before editing its notes.")
  const details=mediaDetailsSchema.strip().parse(body)
  const {data,error}=await client.from("trip_media").update({caption:details.caption,creator:details.creator,recorded_on:details.recordedOn||null,position:details.position,notes:details.notes,revision:body.expectedRevision+1}).eq("id",id).eq("plan_id",planId).eq("user_id",user.id).eq("revision",body.expectedRevision).eq("state","ready").select(columns).maybeSingle()
  if(error)throw unavailable()
  if(!data){const current=await ownMedia(client,planId,user.id,id);if(current?.revision===body.expectedRevision+1&&JSON.stringify(mediaDetailsSchema.strip().parse(mapMedia(current)))===JSON.stringify(details))return {item:mapMedia(current)};throw new AccountError(409,"This upload changed. Keep your notes and reopen the saved version before editing.")}
  return {item:mapMedia(data as MediaRow)}
})
export const mediaDelete=(request:Request,planId:string,id:string)=>accountHandler(async()=>{
  const {user,client}=await requireAccountUser();const body=await accountBody(request,mediaDeleteSchema);await requireOwnedTrip(client,user.id,planId)
  const row=await ownMedia(client,planId,user.id,id);if(!row)return {removed:true,id}
  let reserved=row
  if(row.state!=="deleting"){
    if(row.revision!==body.expectedRevision)throw new AccountError(409,"This upload changed. Reopen it before removing it.")
    const {data,error}=await client.from("trip_media").update({state:"deleting",revision:row.revision+1}).eq("id",id).eq("plan_id",planId).eq("user_id",user.id).eq("revision",row.revision).select(columns).maybeSingle()
    if(error)throw unavailable();if(!data)throw new AccountError(409,"This upload changed before removal. Reopen it and review.")
    reserved=data as MediaRow
  }else if(row.revision!==body.expectedRevision&&row.revision!==body.expectedRevision+1)throw new AccountError(409,"Reopen this upload before retrying removal.")
  const {error:storageError}=await client.storage.from(TRIP_MEDIA_BUCKET).remove([row.object_path]);if(storageError)throw unavailable()
  const {data,error}=await client.from("trip_media").delete().eq("id",id).eq("plan_id",planId).eq("user_id",user.id).eq("revision",reserved.revision).eq("state","deleting").select("id").maybeSingle()
  if(error||!data)throw unavailable();return {removed:true,id}
})
export async function mediaContent(planId:string,id:string,range?:string|null,download=false){
  try{
    const {user,client}=await requireAccountUser();await requireOwnedTrip(client,user.id,planId)
    const row=await ownMedia(client,planId,user.id,id);if(!row||row.state!=="ready")throw new AccountError(404,"This upload could not be found.")
    const {data,error}=await client.storage.from(TRIP_MEDIA_BUCKET).download(row.object_path);if(error||!data)throw unavailable()
    const bytes=new Uint8Array(await data.arrayBuffer())
    if(bytes.length!==row.byte_size||mediaSignature(bytes)!==row.mime||createHash("sha256").update(bytes).digest("hex")!==row.content_hash)throw unavailable()
    const headers:Record<string,string>={"Content-Type":row.mime,"Content-Length":String(bytes.length),"Content-Disposition":`${download||row.kind==="document"?"attachment":"inline"}; filename="aves-journal.${mediaTypes[row.mime].extension}"`,"Cache-Control":"private, no-store","X-Content-Type-Options":"nosniff","Content-Security-Policy":"default-src 'none'; sandbox","Accept-Ranges":"bytes"}
    if(range){
      const match=/^bytes=(\d*)-(\d*)$/.exec(range)
      const start=match?.[1]?Number(match[1]):match?.[2]?Math.max(0,bytes.length-Number(match[2])):NaN
      const end=match?.[1]&&match?.[2]?Math.min(bytes.length-1,Number(match[2])):bytes.length-1
      if(!Number.isSafeInteger(start)||!Number.isSafeInteger(end)||start<0||start>=bytes.length||end<start)return new Response(null,{status:416,headers:{...headers,"Content-Length":"0","Content-Range":`bytes */${bytes.length}`}})
      return new Response(bytes.slice(start,end+1),{status:206,headers:{...headers,"Content-Length":String(end-start+1),"Content-Range":`bytes ${start}-${end}/${bytes.length}`}})
    }
    return new Response(bytes,{headers})
  }catch(error){return accountHandler(async()=>{throw error})}
}
