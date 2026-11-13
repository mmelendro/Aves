/** Versioned species facts, never inferred from a photograph or a common name. */
import snapshot from "@/content/bird-conservation.json"
import origins from "@/content/featured-bird-origins.json"

export type ConservationBird = { scientificName: string; origin?: string; countryId?: string }
export type GlobalBirdStatus = "CR" | "EN" | "VU" | "NT" | "LC" | "DD" | "NE" | "EW" | "EX" | "unknown"
export type BirdStatusFilter = "all" | "threatened" | "national-threatened" | GlobalBirdStatus
export type BirdOriginFilter = "all" | "native" | "introduced" | "unknown"
export type BirdFilters = { endemicOnly: boolean; status: BirdStatusFilter; origin?: BirdOriginFilter }
export const defaultBirdFilters: BirdFilters = { endemicOnly:false, status:"all", origin:"all" }
export const statusLabels: Record<GlobalBirdStatus,string> = {CR:"Critically Endangered",EN:"Endangered",VU:"Vulnerable",NT:"Near Threatened",LC:"Least Concern",DD:"Data Deficient",NE:"Not Evaluated",EW:"Extinct in the Wild",EX:"Extinct",unknown:"Status not verified"}
export type ConservationRecord = { scientificName:string; globalStatus:GlobalBirdStatus; statusSource?:string; checkedAt:string; endemicTo?:string; endemicSource?:string; nationalStatus?:{label:string;code:string;system:string;source:string} }
const records = new Map<string,ConservationRecord>(snapshot.species.map(row=>[row.scientificName,row as ConservationRecord]))
/** Species-level assessments also label subspecies photos, explicitly as species status. */
export function birdSpeciesName(scientificName:string) { return scientificName.trim().split(/\s+/).slice(0,2).join(" ") }
export function birdConservation(bird:ConservationBird) { return records.get(birdSpeciesName(bird.scientificName)) }
export function birdFiltersActive(filters:BirdFilters) { return filters.endemicOnly || filters.status !== "all" || Boolean(filters.origin && filters.origin !== "all") }
/** National origin is deliberately separate from a local introduction or a sighting. */
export function birdCountryOrigin(bird:ConservationBird,countryId?:string) {
 const direct=countryId==="new-zealand" ? bird.origin?.toLowerCase() : undefined
 if(direct && ["native","endemic","introduced"].includes(direct))return direct
 const countries=origins.countries as Record<string,{species:Record<string,{origin:string}>}>
 return countryId ? countries[countryId]?.species[birdSpeciesName(bird.scientificName)]?.origin ?? "unknown" : "unknown"
}
export function matchesBirdFilters(bird:ConservationBird,filters:BirdFilters,countryId?:string) {
 countryId=countryId==="world"||!countryId ? bird.countryId : countryId
 const record=birdConservation(bird), status=record?.globalStatus ?? "unknown"
 const origin=birdCountryOrigin(bird,countryId)
 const countryName=({colombia:"Colombia",australia:"Australia","new-zealand":"New Zealand"} as Record<string,string>)[countryId ?? ""]
 const endemicMatches=Boolean(record?.endemicTo) && (!countryId || record?.endemicTo===countryName)
 const originMatches=!filters.origin || filters.origin==="all" || (filters.origin==="native" ? ["native","endemic"].includes(origin) : origin===filters.origin)
 return originMatches && (!filters.endemicOnly || endemicMatches) && (filters.status === "all" || (filters.status === "national-threatened" ? ["CR","EN","VU"].includes(record?.nationalStatus?.code ?? "") : filters.status === "threatened" ? ["CR","EN","VU"].includes(status) : status === filters.status))
}
export function filterConservationBirds<T extends ConservationBird>(birds:readonly T[],filters:BirdFilters,countryId?:string):T[] { return birds.filter(bird=>matchesBirdFilters(bird,filters,countryId)) }
