/** Owner-only trip preparations and journal data. Sharing a brief never shares this workspace. */
import reviewedPlaces from "@/content/journal-places.json"
import { z } from "zod"
import { nzPublicPlanningPlaces } from "./nz-place-ideas"
import { countryRegionOptions, type TripCountry } from "@/content/trip-options"

export const preparationCategories = ["Flights", "Accommodation", "Activities", "Transport", "Gear", "Documents", "Other"] as const
export const arrangementStates = ["idea", "requested", "provisional", "confirmed", "cancelled"] as const
const text = (max: number) => z.string().max(max).refine(value => !/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value))
export const privateReferenceUrl = z.string().max(1500).refine(value => {
  if (!value) return true
  try { const url = new URL(value); return url.protocol === "https:" && !url.username && !url.password && !/[\s\u0000-\u001f]/.test(value) } catch { return false }
}, "Use a complete HTTPS link without a username or password")
export const preparationSchema = z.object({
  id: z.uuid(), title: text(160).min(1), category: z.enum(preparationCategories), done: z.boolean(),
  dueDate: z.union([z.iso.date(), z.literal("")]), notes: text(500), url: privateReferenceUrl,
  arrangement: z.enum(arrangementStates), deleted: z.boolean(),
}).strict()
export const journalEntrySchema = z.object({
  id: z.uuid(), title: text(160).min(1), body: text(3000), date: z.union([z.iso.date(), z.literal("")]),
  day: z.number().int().min(1).max(365).nullable(), placeId: z.string().max(250), deleted: z.boolean(),
}).strict()
export const workspaceSchema = z.object({version:z.literal(1),tasks:z.array(preparationSchema).max(50),entries:z.array(journalEntrySchema).max(50)}).strict()
  .refine(value => [value.tasks,value.entries].every(items => new Set(items.map(item => item.id)).size === items.length), "Each item needs its own reference")
  .refine(value => new TextEncoder().encode(JSON.stringify(value)).length <= 24000, "This trip workspace is full. Shorten notes before saving.")
export const workspaceWriteSchema = z.object({expectedRevision:z.number().int().min(0).max(Number.MAX_SAFE_INTEGER),data:workspaceSchema}).strict()
export const workspaceReceiptSchema = z.object({revision:z.number().int().nonnegative(),data:workspaceSchema}).strict()
export type Preparation = z.infer<typeof preparationSchema>
export type JournalEntry = z.infer<typeof journalEntrySchema>
export type TripWorkspaceData = z.infer<typeof workspaceSchema>
export type WorkspaceReceipt = z.infer<typeof workspaceReceiptSchema>
export const emptyWorkspace = (): TripWorkspaceData => ({version:1,tasks:[],entries:[]})
/** Public choices only. A journal association is the owner's label, not proof of a visit. */
export function journalPlaces(country: TripCountry) {
  const regions=countryRegionOptions[country].map(region=>({id:`region:${region.id}`,label:region.label}))
  return country === "new-zealand" ? [...regions,...nzPublicPlanningPlaces] : [...regions,...reviewedPlaces.filter(place=>place.countryId===country).map(({id,label})=>({id,label}))]
}
export function workspacePlacesValid(data:TripWorkspaceData,country:TripCountry) {
  const ids=new Set(journalPlaces(country).map(place=>place.id))
  return data.entries.every(entry=>!entry.placeId||ids.has(entry.placeId))
}
