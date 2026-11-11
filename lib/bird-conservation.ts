/** Versioned species facts, never inferred from a photograph or a common name. */
import snapshot from "@/content/bird-conservation.json"

export type ConservationBird = { scientificName: string }
export type GlobalBirdStatus = "CR" | "EN" | "VU" | "NT" | "LC" | "DD" | "NE" | "EW" | "EX" | "unknown"
export type BirdStatusFilter = "all" | "threatened" | "national-threatened" | GlobalBirdStatus
export type BirdFilters = { endemicOnly: boolean; status: BirdStatusFilter }
export const defaultBirdFilters: BirdFilters = { endemicOnly:false, status:"all" }
export const statusLabels: Record<GlobalBirdStatus,string> = {CR:"Critically Endangered",EN:"Endangered",VU:"Vulnerable",NT:"Near Threatened",LC:"Least Concern",DD:"Data Deficient",NE:"Not Evaluated",EW:"Extinct in the Wild",EX:"Extinct",unknown:"Status not verified"}
export type ConservationRecord = { scientificName:string; globalStatus:GlobalBirdStatus; statusSource?:string; checkedAt:string; endemicTo?:string; endemicSource?:string; nationalStatus?:{label:string;code:string;system:string;source:string} }
const records = new Map<string,ConservationRecord>(snapshot.species.map(row=>[row.scientificName,row as ConservationRecord]))
/** Species-level assessments also label subspecies photos, explicitly as species status. */
export function birdSpeciesName(scientificName:string) { return scientificName.trim().split(/\s+/).slice(0,2).join(" ") }
export function birdConservation(bird:ConservationBird) { return records.get(birdSpeciesName(bird.scientificName)) }
export function birdFiltersActive(filters:BirdFilters) { return filters.endemicOnly || filters.status !== "all" }
export function matchesBirdFilters(bird:ConservationBird,filters:BirdFilters) {
 const record=birdConservation(bird), status=record?.globalStatus ?? "unknown"
 return (!filters.endemicOnly || Boolean(record?.endemicTo)) && (filters.status === "all" || (filters.status === "national-threatened" ? ["CR","EN","VU"].includes(record?.nationalStatus?.code ?? "") : filters.status === "threatened" ? ["CR","EN","VU"].includes(status) : status === filters.status))
}
export function filterConservationBirds<T extends ConservationBird>(birds:readonly T[],filters:BirdFilters):T[] { return birds.filter(bird=>matchesBirdFilters(bird,filters)) }
