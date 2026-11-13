import "server-only"
import {requireAccountUser} from "@/lib/account-auth"
import {accountBody,accountHandler} from "./account-http"
import {requireOwnedTrip,readWorkspace} from "./trip-workspace-handlers"
import {readTripRecords} from "./trip-records-handlers"
import {AccountError} from "./account-errors"
import {tripPackSelection,renderTripPack} from "./trip-pack"
import {readItineraries} from "./saved-itinerary-handlers"
import {islandPlanner} from "./island-planners"
import {countryLabels,countryRegionLabels} from "@/content/trip-options"
import {questionnaireSchema} from "./account-models"
import {planningSummary} from "@/content/planning-questionnaire"
export const tripPackInfo=(planId:string)=>accountHandler(async()=>{
 const {user,client}=await requireAccountUser();await requireOwnedTrip(client,user.id,planId)
 const [plan,itineraries]=await Promise.all([client.from("trip_plans").select("updated_at").eq("id",planId).eq("user_id",user.id).maybeSingle(),readItineraries(client,planId)])
 if(plan.error||!plan.data)throw new AccountError(503,"Your saved trip could not be opened. Please retry.")
 return {planUpdatedAt:plan.data.updated_at,itineraryRevision:itineraries.revision,routeCount:itineraries.data.routes.length}
})
export async function tripPack(request:Request,planId:string){
 try{
  const {user,client}=await requireAccountUser(),selection=await accountBody(request,tripPackSelection)
  const country=await requireOwnedTrip(client,user.id,planId)
  const [workspace,records,plan]=await Promise.all([readWorkspace(client,planId),readTripRecords(client,planId),client.from("trip_plans").select("title,details,updated_at").eq("id",planId).eq("user_id",user.id).maybeSingle()])
  if(plan.error||!plan.data)throw new AccountError(503,"Your saved trip could not be opened. Please retry.")
  if(workspace.revision!==selection.workspaceRevision||records.revision!==selection.recordsRevision)throw new AccountError(409,"Saved records changed. Reopen the trip and review your pack selection again.")
  if(selection.planUpdatedAt&&selection.planUpdatedAt!==plan.data.updated_at)throw new AccountError(409,"Your saved brief changed. Refresh the pack details and review your selection.")
  const itineraries=selection.includeEditableRoutes?await readItineraries(client,planId):null
  if(itineraries&&itineraries.revision!==selection.itineraryRevision)throw new AccountError(409,"Your saved itinerary changed. Refresh the pack details and review your selection.")
  const answers=questionnaireSchema.safeParse(plan.data.details?.questionnaire)
  const brief=selection.includeBrief?[{label:"Destination",value:countryLabels[country]},{label:"Regions",value:(plan.data.details?.regions??[]).map((r:string)=>countryRegionLabels[country][r]??r).join(", ")||"Open"},{label:"Travel timing",value:plan.data.details?.travelWhen||"Open"},{label:"Party",value:plan.data.details?.partySize||"Open"},...(answers.success?planningSummary(answers.data):[])]:null
  const routes=itineraries?.data.routes.map(r=>{const p=islandPlanner(r.input.islandId);return {name:p?.context.name??r.input.islandId,text:p?.validTripDraft(r)?p.tripDraftText(r):`Catalogue references need review. Saved route: ${JSON.stringify(r)}`}})??[]
  const preparations=selection.preparationIds.map(id=>workspace.data.tasks.find(t=>t.id===id&&!t.deleted)),practical=selection.recordIds.map(id=>records.data.records.find(r=>r.id===id&&!r.deleted))
  if(preparations.some(t=>!t)||practical.some(r=>!r))throw new AccountError(400,"Choose active saved records from this trip.")
  const file=renderTripPack({title:plan.data.title,itinerary:selection.includeItinerary?plan.data.details?.message??"":null,preparations:preparations.filter(t=>t!==undefined),records:practical.filter(r=>r!==undefined),generatedOn:new Date().toISOString(),brief,routes})
  return new Response(file,{headers:{"Content-Type":"text/html; charset=utf-8","Content-Disposition":"attachment; filename=\"aves-private-trip-pack.html\"","Cache-Control":"private, no-store","X-Content-Type-Options":"nosniff","Content-Security-Policy":"default-src 'none'; style-src 'unsafe-inline'; sandbox","X-Robots-Tag":"noindex, nofollow, noarchive"}})
 }catch(error){return accountHandler(async()=>{throw error})}
}
