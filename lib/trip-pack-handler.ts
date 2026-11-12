import "server-only"
import {requireAccountUser} from "@/lib/account-auth"
import {accountBody,accountHandler} from "./account-http"
import {requireOwnedTrip,readWorkspace} from "./trip-workspace-handlers"
import {readTripRecords} from "./trip-records-handlers"
import {AccountError} from "./account-errors"
import {tripPackSelection,renderTripPack} from "./trip-pack"
export async function tripPack(request:Request,planId:string){
 try{
  const {user,client}=await requireAccountUser(),selection=await accountBody(request,tripPackSelection)
  await requireOwnedTrip(client,user.id,planId)
  const [workspace,records,plan]=await Promise.all([readWorkspace(client,planId),readTripRecords(client,planId),client.from("trip_plans").select("title,details").eq("id",planId).eq("user_id",user.id).maybeSingle()])
  if(plan.error||!plan.data)throw new AccountError(503,"Your saved trip could not be opened. Please retry.")
  if(workspace.revision!==selection.workspaceRevision||records.revision!==selection.recordsRevision)throw new AccountError(409,"Saved records changed. Reopen the trip and review your pack selection again.")
  const preparations=selection.preparationIds.map(id=>workspace.data.tasks.find(t=>t.id===id&&!t.deleted)),practical=selection.recordIds.map(id=>records.data.records.find(r=>r.id===id&&!r.deleted))
  if(preparations.some(t=>!t)||practical.some(r=>!r))throw new AccountError(400,"Choose active saved records from this trip.")
  const file=renderTripPack({title:plan.data.title,itinerary:selection.includeItinerary?plan.data.details?.message??"":null,preparations:preparations.filter(t=>t!==undefined),records:practical.filter(r=>r!==undefined),generatedOn:new Date().toISOString()})
  return new Response(file,{headers:{"Content-Type":"text/html; charset=utf-8","Content-Disposition":"attachment; filename=\"aves-private-trip-pack.html\"","Cache-Control":"private, no-store","X-Content-Type-Options":"nosniff","Content-Security-Policy":"default-src 'none'; style-src 'unsafe-inline'; sandbox","X-Robots-Tag":"noindex, nofollow, noarchive"}})
 }catch(error){return accountHandler(async()=>{throw error})}
}
