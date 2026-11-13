import {z} from "zod"
import {tripCurrencies,type TripDraft} from "./island-planning-types"
const amount=z.number().int().min(0).max(10000)
export const routePreferencesSchema=z.object({
 version:z.literal(1),islandId:z.enum(["north-island","south-island"]),days:z.number().int().min(1).max(30),
 departureDate:z.union([z.iso.date(),z.literal("")]),currency:z.enum(tripCurrencies),
 allowances:z.object({accommodation:amount.optional(),food:amount.optional(),activities:amount.optional(),transport:amount.optional()}).strict(),
 activityBasis:z.enum(["day","experience"]),adults:z.number().int().min(1).max(12),rooms:z.number().int().min(1).max(12),
}).strict().refine(v=>v.rooms<=v.adults,"Review rooms and adults")
export type RoutePreferences=z.infer<typeof routePreferencesSchema>
export function routePreferences(draft:TripDraft):RoutePreferences{
 const i=draft.input;return routePreferencesSchema.parse({version:1,islandId:i.islandId||"south-island",days:i.days,departureDate:i.departureDate,currency:i.currency,allowances:i.allowances,activityBasis:i.activityBasis,adults:i.adults??1,rooms:i.rooms??1})
}
export function routeTiming(p:RoutePreferences){
 if(!p.departureDate)return `${p.days} days, dates open`
 const start=new Date(`${p.departureDate}T00:00:00Z`);start.setUTCDate(start.getUTCDate()-(p.days-1));return `${start.toISOString().slice(0,10)} to ${p.departureDate}`
}
export const routeParty=(p:RoutePreferences)=>p.adults===1?"1 person":p.adults===2?"2 people":p.adults<=4?"3–4 people":"5+ people"
