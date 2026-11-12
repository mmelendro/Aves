import "server-only"
import {requireAccountUser} from "@/lib/account-auth"
import {requireOwnedTrip,readWorkspace} from "./trip-workspace-handlers"
import {readTripRecords} from "./trip-records-handlers"
import {readTripMedia} from "./trip-media-handlers"
import {AccountError} from "./account-errors"
import {accountHandler} from "./account-http"
/** An explicit owner download, never a public/share link. Saved sections retain their own revisions. */
export async function tripExport(planId:string){
 try{
  const {user,client}=await requireAccountUser();const country=await requireOwnedTrip(client,user.id,planId)
  const [workspace,records,media,plan]=await Promise.all([readWorkspace(client,planId),readTripRecords(client,planId),readTripMedia(client,planId,user.id),client.from("trip_plans").select("title,details,status").eq("id",planId).eq("user_id",user.id).maybeSingle()])
  if(plan.error||!plan.data)throw new AccountError(503,"Your saved trip could not be exported. Please retry.")
  const pack={format:"aves-private-trip",version:1,exportedAt:new Date().toISOString(),scope:"Saved records only. Private references and removed items included. Attachment files and unsaved edits excluded. Section revisions are independent snapshots.",trip:{id:planId,country,...plan.data},workspace,travelRecords:records,attachments:media.items}
  return new Response(JSON.stringify(pack,null,2),{headers:{"Content-Type":"application/json; charset=utf-8","Content-Disposition":"attachment; filename=\"aves-private-trip.json\"","Cache-Control":"private, no-store","X-Content-Type-Options":"nosniff","Content-Security-Policy":"default-src 'none'; sandbox"}})
 }catch(error){return accountHandler(async()=>{throw error})}
}
