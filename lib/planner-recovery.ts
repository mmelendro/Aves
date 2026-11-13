import type {IslandTripPlanner} from "./island-trip-planner"
import type {TripDraft,TripPlannerInput} from "./island-planning-types"
type Planner=Pick<IslandTripPlanner,"context"|"validTripInput"|"validTripDraft">
type Recovery={version:1;at:number;input:TripPlannerInput;draft:TripDraft|null}
export const recoveryKey=(planner:Planner)=>`${planner.context.draftKey}:recovery`
/** Tab-only recovery. This is separate from the explicit account handoff slot. */
export function readPlannerRecovery(storage:Pick<Storage,"getItem"|"removeItem">,planner:Planner,now=Date.now()):Recovery|null{
 try{
  const raw=storage.getItem(recoveryKey(planner));if(!raw)return null
  const v=JSON.parse(raw)
  if(v?.version===1&&Number.isFinite(v.at)&&now>=v.at&&now-v.at<=86400000&&planner.validTripInput(v.input)&&(v.draft===null||planner.validTripDraft(v.draft)))return v
  storage.removeItem(recoveryKey(planner))
 }catch{}
 return null
}
export function writePlannerRecovery(storage:Pick<Storage,"setItem">,planner:Planner,input:TripPlannerInput,draft:TripDraft|null,now=Date.now()){
 if(!planner.validTripInput(input)||(draft!==null&&!planner.validTripDraft(draft)))return false
 try{storage.setItem(recoveryKey(planner),JSON.stringify({version:1,at:now,input,draft}));return true}catch{return false}
}
