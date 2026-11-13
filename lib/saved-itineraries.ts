import {z} from "zod"
import {tripCategories,tripCurrencies,type TripDraft} from "./island-planning-types"
import {islandPlanner} from "./island-planners"
const id=z.string().max(100).regex(/^[a-z0-9:-]*$/)
const day=z.object({baseId:id,transferFrom:id.optional(),birdingId:id,extraId:id,stayId:id}).strict()
const input=z.object({
 islandId:z.enum(["north-island","south-island"]),days:z.number().int().min(1).max(30),areaId:id,
 birdIds:z.array(id).max(512),interests:z.array(z.enum(tripCategories.map(c=>c.id) as [typeof tripCategories[number]["id"],...Array<typeof tripCategories[number]["id"]>])).max(11),
 includeManaged:z.boolean(),startCity:id,endCity:id,departureDate:z.union([z.iso.date(),z.literal("")]),currency:z.enum(tripCurrencies),
 allowances:z.object({accommodation:z.number().int().min(0).max(10000).optional(),food:z.number().int().min(0).max(10000).optional(),activities:z.number().int().min(0).max(10000).optional(),transport:z.number().int().min(0).max(10000).optional()}).strict(),
 activityBasis:z.enum(["day","experience"]),maxDrivingMinutes:z.union([z.literal(120),z.literal(180),z.literal(240),z.literal(300)]).optional(),adults:z.number().int().min(1).max(12).optional(),rooms:z.number().int().min(1).max(12).optional(),
}).strict()
export const savedRouteSchema=z.object({version:z.literal(1),input,days:z.array(day).min(1).max(30),style:z.enum(["birds","slower","variety"]).optional()}).strict().refine(r=>r.days.length===r.input.days)
/** The storage version and byte limit apply to reads and complete exports.
 * Source validation is a separate write rule so old IDs are never silently lost. */
export const itinerariesSchema=z.object({version:z.literal(1),routes:z.array(savedRouteSchema).max(2)}).strict()
 .refine(v=>new Set(v.routes.map(r=>r.input.islandId)).size===v.routes.length,"Keep one reviewed route per island")
 .refine(v=>new TextEncoder().encode(JSON.stringify(v)).length<=48000,"Shorten this saved route collection")
export const itineraryWriteSchema=z.object({expectedRevision:z.number().int().min(0).max(Number.MAX_SAFE_INTEGER-1),data:itinerariesSchema}).strict()
export const itineraryReceiptSchema=z.object({revision:z.number().int().nonnegative(),data:itinerariesSchema}).strict()
export type SavedItineraries=z.infer<typeof itinerariesSchema>
export const emptyItineraries=():SavedItineraries=>({version:1,routes:[]})
export function itinerarySourcesValid(data:SavedItineraries){return data.routes.every(r=>islandPlanner(r.input.islandId)?.validTripDraft(r))}
export function replaceSavedRoute(data:SavedItineraries,route:TripDraft):SavedItineraries{
 const normalized={...route,input:{...route.input,islandId:route.input.islandId||"south-island"}}
 const parsed=savedRouteSchema.parse(normalized)
 return itinerariesSchema.parse({...data,routes:[...data.routes.filter(r=>r.input.islandId!==parsed.input.islandId),parsed]})
}
