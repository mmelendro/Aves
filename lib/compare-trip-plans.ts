import type {TripPlan} from "@/components/account/account-api"
import {countryLabel,regionSummary} from "@/components/account/account-api"
import {planningSummary} from "@/content/planning-questionnaire"
export function compareTripPlans(left:TripPlan,right:TripPlan){
 const rows=[{label:"Destination",left:countryLabel(left.country),right:countryLabel(right.country)},{label:"Regions",left:regionSummary(left.regions,left.country),right:regionSummary(right.regions,right.country)},{label:"Travel timing",left:left.travelWhen||"Not specified",right:right.travelWhen||"Not specified"},{label:"Group size",left:left.partySize||"Not specified",right:right.partySize||"Not specified"}]
 const l=new Map(left.questionnaire?planningSummary(left.questionnaire).map(r=>[r.label,r.value]):[]),r=new Map(right.questionnaire?planningSummary(right.questionnaire).map(r=>[r.label,r.value]):[])
 for(const label of new Set([...l.keys(),...r.keys()]))rows.push({label,left:l.get(label)||"Not specified",right:r.get(label)||"Not specified"})
 return rows.map(row=>({...row,different:row.left!==row.right}))
}
