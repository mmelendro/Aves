import data from "@/content/south-island-trip-catalogue.json"
import { validNzBirdIds, nzBirdName } from "@/content/new-zealand-checklist"

export const tripCategories = [
  {id:"birding",label:"Birding"},{id:"stays",label:"Places to stay"},{id:"food",label:"Food & local produce"},
  {id:"markets",label:"Markets"},{id:"hot-springs",label:"Hot springs & pools"},{id:"hikes",label:"Hikes & walks"},
  {id:"adventures",label:"Adventures"},{id:"ecotourism",label:"Ecotourism"},{id:"culture",label:"Culture & local stories"},
  {id:"wellness",label:"Wellness"},{id:"transport",label:"Transport"},
] as const
export type TripCategory = typeof tripCategories[number]["id"]
export type TripArea = typeof data.areas[number]
export type TripPlace = {id:string;name:string;base:string;categories:TripCategory[];url:string;description:string;birdIds:string[];encounter:string;tags:string[];checkedAt:string;weekdays?:number[];months?:number[];eco?:{kind:string;note:string;url:string};when?:string;access?:string}
export const tripAreas: TripArea[] = data.areas
export const tripPlaces = data.places as TripPlace[]
export const tripPlaceById = new Map(tripPlaces.map(p=>[p.id,p]))
export const tripAreaById = new Map(tripAreas.map(a=>[a.id,a]))
export const tripGateways = [
  {id:"christchurch",name:"Christchurch",baseId:"christchurch"},{id:"queenstown",name:"Queenstown",baseId:"lakes"},
  {id:"wanaka",name:"Wānaka",baseId:"lakes"},{id:"glenorchy",name:"Glenorchy",baseId:"lakes"},
  {id:"dunedin",name:"Dunedin",baseId:"otago"},{id:"oamaru",name:"Ōamaru",baseId:"otago"},
  {id:"nelson",name:"Nelson",baseId:"tasman"},{id:"motueka",name:"Motueka",baseId:"tasman"},{id:"marahau",name:"Mārahau",baseId:"tasman"},
  {id:"kaikoura",name:"Kaikōura",baseId:"kaikoura"},{id:"te-anau",name:"Te Anau",baseId:"fiordland"},
  {id:"arthurs-pass",name:"Arthur’s Pass",baseId:"arthurs-pass"},{id:"st-arnaud",name:"St Arnaud",baseId:"nelson-lakes"},
  {id:"hanmer",name:"Hanmer Springs",baseId:"hanmer"},{id:"maruia",name:"Maruia Springs",baseId:"maruia"},
  {id:"franz-josef",name:"Franz Josef",baseId:"west-coast"},{id:"curio-bay",name:"Curio Bay",baseId:"catlins"},
  {id:"invercargill",name:"Invercargill",baseId:"invercargill"},{id:"greymouth",name:"Greymouth",baseId:"greymouth"},{id:"picton",name:"Picton",baseId:"picton"},
] as const
export const gatewayById=new Map<string,typeof tripGateways[number]>(tripGateways.map(g=>[g.id,g]))
export const tripCurrencies=["NZD","AUD","USD","CAD","EUR","GBP"] as const
export const allowanceCategories=[{id:"accommodation",label:"Accommodation",unit:"per night"},{id:"food",label:"Food",unit:"per day"},{id:"activities",label:"Activities",unit:"per day or experience"},{id:"transport",label:"Transport",unit:"per day"}] as const
export type TripAllowances=Partial<Record<typeof allowanceCategories[number]["id"],number>>
export type TripPlannerInput = {days:number;areaId:string;birdIds:string[];interests:TripCategory[];includeManaged:boolean;startCity:string;endCity:string;departureDate:string;currency:typeof tripCurrencies[number];allowances:TripAllowances;activityBasis:"day"|"experience"}
export type TripDay = {baseId:string;transferFrom?:string;birdingId:string;extraId:string;stayId:string}
export type TripStyle="birds"|"slower"|"variety"
export type TripDraft = {version:1;input:TripPlannerInput;days:TripDay[];style?:TripStyle}
export const defaultTripInput: TripPlannerInput = {days:5,areaId:"all",birdIds:[],interests:["food","hikes","ecotourism"],includeManaged:true,startCity:"flexible",endCity:"flexible",departureDate:"",currency:"NZD",allowances:{},activityBasis:"day"}
export const TRIP_DRAFT_KEY = "aves:south-island-itinerary:v1"
export const categoryName = (id:string)=>tripCategories.find(c=>c.id===id)?.label || id
export const placesAt = (base:string)=>tripPlaces.filter(p=>p.base===base)
function validDate(value:string){
  if(value==="")return true
  if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return false
  const date=new Date(`${value}T12:00:00Z`)
  return Number.isFinite(date.getTime())&&date.toISOString().slice(0,10)===value
}
export function tripDayDate(input:TripPlannerInput,index:number){
  if(!input.departureDate)return ""
  const date=new Date(`${input.departureDate}T12:00:00Z`)
  date.setUTCDate(date.getUTCDate()-(input.days-1-index))
  return date.toISOString().slice(0,10)
}
export function marketFitsDay(place:TripPlace,input:TripPlannerInput,index:number){
  if(!place.categories.includes("markets"))return true
  const date=tripDayDate(input,index)
  if(!date)return false
  const at=new Date(`${date}T12:00:00Z`)
  return (!place.weekdays||place.weekdays.includes(at.getUTCDay()))&&(!place.months||place.months.includes(at.getUTCMonth()+1))
}
export function validTripInput(value:unknown): value is TripPlannerInput {
  if(!value || typeof value!=="object")return false
  const v=value as TripPlannerInput
  return Number.isInteger(v.days)&&v.days>=1&&v.days<=30&&(v.areaId==="all"||tripAreaById.has(v.areaId))
    &&typeof v.startCity==="string"&&(v.startCity==="flexible"||gatewayById.has(v.startCity))
    &&typeof v.endCity==="string"&&(v.endCity==="flexible"||gatewayById.has(v.endCity))
    &&typeof v.departureDate==="string"&&validDate(v.departureDate)&&tripCurrencies.includes(v.currency)
    &&(v.activityBasis==="day"||v.activityBasis==="experience")
    &&v.allowances!==null&&typeof v.allowances==="object"&&!Array.isArray(v.allowances)
    &&Object.entries(v.allowances).every(([key,n])=>allowanceCategories.some(c=>c.id===key)&&Number.isInteger(n)&&n>=0&&n<=10000)
    &&validNzBirdIds(v.birdIds)&&typeof v.includeManaged==="boolean"&&Array.isArray(v.interests)
    &&v.interests.length<=tripCategories.length&&new Set(v.interests).size===v.interests.length
    &&v.interests.every(c=>tripCategories.some(option=>option.id===c))
}
const eligibleBirdStop=(p:TripPlace,input:TripPlannerInput)=>p.categories.includes("birding")&&(input.includeManaged||p.encounter==="wild")
const matched=(p:TripPlace,ids:readonly string[])=>p.birdIds.filter(id=>ids.includes(id))
/** Bound is five bases. Compare geographic order only, never road distance or duration. */
function orderTripBases(bases:string[],fixedFinish:boolean){
  if(bases.length<3)return
  const first=bases[0],end=fixedFinish?bases.at(-1):undefined
  const middle=bases.slice(1,end?-1:undefined)
  const leg=(a:string,b:string)=>{const x=tripAreaById.get(a)!,y=tripAreaById.get(b)!;return Math.hypot(x.latitude-y.latitude,(x.longitude-y.longitude)*Math.cos((x.latitude+y.latitude)*Math.PI/360))}
  const cost=(route:string[])=>route.slice(1).reduce((n,b,i)=>n+leg(route[i],b),0)
  let best=[...bases],bestCost=cost(best)
  const visit=(prefix:string[],remaining:string[])=>{
    if(!remaining.length){const route=[first,...prefix,...(end?[end]:[])],score=cost(route);if(score<bestCost){best=route;bestCost=score}return}
    remaining.forEach((b,i)=>visit([...prefix,b],remaining.filter((_,j)=>j!==i)))
  }
  visit([],middle);bases.splice(0,bases.length,...best)
}
/** Coverage is sourced opportunity, never sightings, driving optimisation or access. */
export function buildSouthIslandTrip(input:TripPlannerInput,style:TripStyle="birds"):TripDraft {
  if(!validTripInput(input))throw new Error("Review the trip length, cities, date, birds and allowances.")
  const start=gatewayById.get(input.startCity),finish=gatewayById.get(input.endCity)
  if(start&&finish&&start.baseId!==finish.baseId&&input.days<2)throw new Error("Allow at least two days for different start and departure bases. Road time still needs checking.")
  const pool=tripPlaces.filter(p=>eligibleBirdStop(p,input)&&(input.areaId==="all"||p.base===input.areaId))
  const remaining=new Set(input.birdIds)
  const bases:string[]=start?[start.baseId]:[]
  for(const p of pool.filter(p=>p.base===start?.baseId||p.base===finish?.baseId))for(const id of p.birdIds)remaining.delete(id)
  const hasEndpoints=Boolean(start||finish)
  const capacity=hasEndpoints?Math.min(5,Math.max(1,Math.floor((input.days+2)/2))):Math.min(style==="slower"?1:4,Math.max(1,Math.floor((input.days+1)/3)))
  const endpointSlots=finish?1:0
  const extraLimit=style==="slower"?(hasEndpoints?1:1):capacity
  let added=0
  while(bases.length+endpointSlots<capacity&&added<extraLimit){
    const ranked=tripAreas.filter(a=>!bases.includes(a.id)&&a.id!==finish?.baseId&&(input.areaId==="all"||a.id===input.areaId))
      .map(a=>{const birds=new Set(pool.filter(p=>p.base===a.id).flatMap(p=>matched(p,[...remaining]))).size
        const variety=style==="variety"?new Set(placesAt(a.id).flatMap(p=>p.categories.filter(c=>input.interests.includes(c)))).size:0
        const previous=tripAreaById.get(bases.at(-1)||"")
        const distance=previous?Math.hypot(a.latitude-previous.latitude,a.longitude-previous.longitude):0
        return {id:a.id,score:birds*20+variety/(1+distance),birds}})
      .sort((a,b)=>b.score-a.score)
    if(!ranked[0]?.score)break
    bases.push(ranked[0].id);added++
    for(const p of pool.filter(p=>p.base===ranked[0].id))for(const id of p.birdIds)remaining.delete(id)
    if(input.areaId!=="all")break
  }
  if(!bases.length)bases.push(finish?.baseId||(input.areaId==="all"?"arthurs-pass":input.areaId))
  if(finish&&bases.at(-1)!==finish.baseId)bases.push(finish.baseId)
  orderTripBases(bases,Boolean(finish))
  const days:TripDay[]=[],visitDays=input.days-(bases.length-1)
  if(visitDays<1)throw new Error("Add days or simplify the start, finish and base choices.")
  const counts=bases.map(()=>0)
  let spare=visitDays
  for(let b=0;b<bases.length&&spare>0;b++){counts[b]++;spare--}
  const last=bases.length-1
  if(finish&&spare>0&&pool.some(p=>p.base===bases[last]&&matched(p,input.birdIds).length)){counts[last]++;spare--}
  const preferred=bases.map((base,i)=>({i,score:pool.filter(p=>p.base===base).reduce((n,p)=>n+matched(p,input.birdIds).length,0)})).sort((a,b)=>b.score-a.score)
  let round=0
  while(spare>0){const options=preferred.some(p=>p.score)?preferred.filter(p=>p.score):preferred;counts[options[round%options.length].i]++;round++;spare--}
  const covered=new Set<string>(),usedExtras=new Set<string>()
  for(let b=0;b<bases.length;b++){
    const baseId=bases[b],stays=placesAt(baseId).filter(p=>p.categories.includes("stays"))
    const stayId=(style==="variety"&&stays[1]?stays[1].id:stays[0]?.id)||`airbnb:${baseId}`
    if(b>0)days.push({baseId,transferFrom:bases[b-1],birdingId:"",extraId:"",stayId})
    const count=counts[b],usedStops=new Set<string>()
    for(let d=0;d<count;d++){
      const ordered=pool.filter(p=>p.base===baseId).sort((a,z)=>matched(z,input.birdIds.filter(id=>!covered.has(id))).length-matched(a,input.birdIds.filter(id=>!covered.has(id))).length||Number(usedStops.has(a.id))-Number(usedStops.has(z.id)))
      const stop=ordered[0]
      if(stop){usedStops.add(stop.id);for(const id of stop.birdIds)covered.add(id)}
      const extras=placesAt(baseId).filter(p=>p.id!==stop?.id&&!usedExtras.has(p.id)&&!p.categories.includes("stays")&&!p.categories.includes("birding")&&p.categories.some(c=>input.interests.includes(c))&&marketFitsDay(p,input,days.length))
      const extra=style==="variety"?extras.at(-1):extras[0]
      if(extra)usedExtras.add(extra.id)
      days.push({baseId,birdingId:stop?.id||"",extraId:extra?.id||"",stayId})
    }
  }
  days[days.length-1].stayId=""
  if(finish){days[days.length-1].birdingId="";days[days.length-1].extraId=""}
  return {version:1,input:{...input,birdIds:[...input.birdIds],interests:[...input.interests],allowances:{...input.allowances}},days,style}
}
export const tripStyles=[{id:"birds",label:"Bird priorities"},{id:"slower",label:"Fewer bases"},{id:"variety",label:"More variety"}] as const
export function buildSouthIslandPlans(input:TripPlannerInput){
  const seen=new Set<string>()
  return tripStyles.flatMap(style=>{const draft=buildSouthIslandTrip(input,style.id),key=JSON.stringify(draft.days);if(seen.has(key))return [];seen.add(key);return [{...style,draft}]})
}
export function tripAllowanceSummary(draft:TripDraft){
  const {input}=draft
  const experiences=draft.days.reduce((n,d)=>n+Number(Boolean(d.birdingId))+Number(Boolean(d.extraId&&tripPlaceById.get(d.extraId)?.categories.some(c=>!["food","markets","transport"].includes(c)))),0)
  const units={accommodation:input.days-1,food:input.days,activities:input.activityBasis==="day"?input.days:experiences,transport:input.days}
  const rows=allowanceCategories.filter(c=>input.allowances[c.id]!==undefined).map(c=>({...c,amount:input.allowances[c.id]!,units:units[c.id],total:input.allowances[c.id]!*units[c.id]}))
  return {rows,total:rows.reduce((n,r)=>n+r.total,0),experiences,complete:rows.length===4}
}
const validPlaceAt=(id:string,base:string,category?:TripCategory)=>!id||Boolean(tripPlaceById.get(id)?.base===base&&(!category||tripPlaceById.get(id)?.categories.includes(category)))
export function validTripDraft(value:unknown):value is TripDraft {
  if(!value||typeof value!=="object")return false
  const v=value as TripDraft
  if(v.version!==1||!validTripInput(v.input)||!Array.isArray(v.days)||v.days.length!==v.input.days)return false
  if(v.style!==undefined&&!tripStyles.some(s=>s.id===v.style))return false
  const start=gatewayById.get(v.input.startCity),finish=gatewayById.get(v.input.endCity)
  if(start&&v.days[0]?.baseId!==start.baseId||finish&&v.days.at(-1)?.baseId!==finish.baseId)return false
  return v.days.every((d,i)=>d&&tripAreaById.has(d.baseId)
    &&(v.input.areaId==="all"||d.baseId===v.input.areaId||d.baseId===start?.baseId||d.baseId===finish?.baseId)
    &&(!(finish&&i===v.days.length-1)||(!d.birdingId&&!d.extraId))
    &&typeof d.birdingId==="string"&&validPlaceAt(d.birdingId,d.baseId,"birding")
    &&(!d.birdingId||eligibleBirdStop(tripPlaceById.get(d.birdingId)!,v.input))
    &&typeof d.extraId==="string"&&validPlaceAt(d.extraId,d.baseId)
    &&(!d.extraId||(!tripPlaceById.get(d.extraId)!.categories.includes("stays")&&!tripPlaceById.get(d.extraId)!.categories.includes("birding")&&d.extraId!==d.birdingId))
    &&(!d.extraId||marketFitsDay(tripPlaceById.get(d.extraId)!,v.input,i))
    &&typeof d.stayId==="string"&&(i===v.days.length-1?d.stayId==="":d.stayId===`airbnb:${d.baseId}`||validPlaceAt(d.stayId,d.baseId,"stays"))
    &&(i===0?!d.transferFrom:d.baseId===v.days[i-1].baseId?!d.transferFrom:d.transferFrom===v.days[i-1].baseId)
    &&(!d.transferFrom||(!d.birdingId&&!d.extraId)))
}
export function tripCoverage(draft:TripDraft){
  const covered=new Set(draft.days.flatMap(d=>tripPlaceById.get(d.birdingId)?.birdIds || []))
  return {covered:draft.input.birdIds.filter(id=>covered.has(id)),unmatched:draft.input.birdIds.filter(id=>!covered.has(id))}
}
export function airbnbAreaUrl(baseId:string){
  const area=tripAreaById.get(baseId)
  return area?`https://www.airbnb.com/s/homes?${new URLSearchParams({query:area.search})}`:""
}
export function tripDirectionsUrl(from:string,to:string,origin?:string,destination?:string){
  const a=tripAreaById.get(from),b=tripAreaById.get(to)
  return a&&b?`https://www.google.com/maps/dir/?${new URLSearchParams({api:"1",origin:origin||a.search,destination:destination||b.search,travelmode:"driving"})}`:""
}
export function tripTransferUrl(draft:TripDraft,index:number){
  const day=draft.days[index]
  if(!day?.transferFrom)return ""
  const firstLeg=!draft.days.slice(0,index).some(d=>d.transferFrom)
  const lastLeg=draft.days.slice(index).every(d=>d.baseId===day.baseId)
  const start=gatewayById.get(draft.input.startCity),end=gatewayById.get(draft.input.endCity)
  return tripDirectionsUrl(day.transferFrom,day.baseId,firstLeg&&start?`${start.name}, New Zealand`:undefined,lastLeg&&end?`${end.name}, New Zealand`:undefined)
}
const stayName=(id:string)=>id.startsWith("airbnb:")?`Airbnb home near ${tripAreaById.get(id.slice(7))?.name} (listing to choose)`:tripPlaceById.get(id)?.name || "Stay to choose"
export function tripDraftText(draft:TripDraft){
  if(!validTripDraft(draft))return ""
  const coverage=tripCoverage(draft),budget=tripAllowanceSummary(draft)
  return ["[AVES South Island itinerary v1]",`${draft.input.days} days / ${draft.input.days-1} nights. Draft only; access, road times and availability to confirm.`,
    `Start: ${gatewayById.get(draft.input.startCity)?.name||"Open to suggestions"}. Finish: ${gatewayById.get(draft.input.endCity)?.name||"Open to suggestions"}${draft.input.departureDate?` on ${draft.input.departureDate}`:""}.`,
    budget.rows.length?`Per-person allowances (${draft.input.currency}, not quoted prices): ${budget.rows.map(r=>`${r.label} ${r.amount} × ${r.units} = ${r.total}`).join("; ")}. Entered allowance total ${budget.total}.`:"Budget allowances still open; prices not checked.",
    `Bird wishes: ${draft.input.birdIds.map(nzBirdName).join(", ")||"Open to suggestions"}.`,
    ...draft.days.map((d,i)=>`Day ${i+1}${tripDayDate(draft.input,i)?` (${tripDayDate(draft.input,i)})`:""}: ${d.transferFrom?`Transfer ${tripAreaById.get(d.transferFrom)?.name} to `:""}${tripAreaById.get(d.baseId)?.name}. ${[tripPlaceById.get(d.birdingId)?.name,d.extraId?`Optional: ${tripPlaceById.get(d.extraId)?.name}`:"",d.stayId?`Night: ${stayName(d.stayId)}`:"Final day, no overnight included"].filter(Boolean).join("; ")}.`),
    coverage.unmatched.length?`No scheduled sourced stop yet: ${coverage.unmatched.map(nzBirdName).join(", ")}.`:"", "[/AVES South Island itinerary]"].filter(Boolean).join("\n")
}
export function mergeTripNotes(message:string,draft:TripDraft){
  const text=tripDraftText(draft)
  if(!text)return {message,error:"This itinerary needs to be rebuilt before importing."}
  if(message.includes(text))return {message}
  // Earlier generated blocks are left for the guest to review; never erase their edits.
  const merged=`${message}${message?"\n\n":""}${text}`
  return merged.length<=5000?{message:merged}:{message,error:"The itinerary and notes exceed 5,000 characters. Shorten the itinerary or notes before adding it; existing notes are unchanged."}
}
export function writeTripDraft(storage:Pick<Storage,"setItem">,draft:TripDraft,now=Date.now()){
  if(!validTripDraft(draft))return false
  try{storage.setItem(TRIP_DRAFT_KEY,JSON.stringify({at:now,draft}));return true}catch{return false}
}
export function readTripDraft(storage:Pick<Storage,"getItem"|"removeItem">,now=Date.now()):TripDraft|null{
  try{const v=JSON.parse(storage.getItem(TRIP_DRAFT_KEY)||"null");if(Number.isFinite(v?.at)&&now>=v.at&&now-v.at<=86400000&&validTripDraft(v.draft))return v.draft;storage.removeItem(TRIP_DRAFT_KEY)}catch{}
  return null
}
export function consumeTripDraft(storage:Pick<Storage,"getItem"|"removeItem">,savedMessage:string){
  const draft=readTripDraft(storage)
  if(draft&&savedMessage.includes(tripDraftText(draft)))storage.removeItem(TRIP_DRAFT_KEY)
}
