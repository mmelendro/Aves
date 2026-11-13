import {journalPlaces,type TripWorkspaceData} from "./trip-workspace"
import type {TripCountry} from "@/content/trip-options"
/** Private review only. Text is deliberately not claimed to be automatically redacted. */
export function selectedJournalPreview(data:TripWorkspaceData,selectedIds:string[],country:TripCountry){
 const active=data.entries.filter(e=>!e.deleted),ids=new Set(selectedIds),places=new Map(journalPlaces(country).map(p=>[p.id,p.label]))
 if(ids.size!==selectedIds.length||selectedIds.some(id=>!active.some(e=>e.id===id)))throw Error("Review your selected entries. An entry is no longer available.")
 return active.filter(entry=>ids.has(entry.id)).map(entry=>({title:entry.title,body:entry.body,date:entry.date,day:entry.day,place:places.get(entry.placeId)||""}))
}
