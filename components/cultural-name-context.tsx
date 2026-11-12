import {reviewedNames,type CulturalNameRecord} from "@/content/cultural-names"
import {useColombiaHomeCopy} from "@/components/colombia-home-language"
/** Native disclosure below the media, never over the photograph or map.
 * References open independently; this component fetches and plays no recordings. */
export default function CulturalNameContext({kind,entityId,countryId,onOpen}:{kind:CulturalNameRecord["kind"];entityId:string;countryId?:string;onOpen?:()=>void}){
 const records=reviewedNames(kind,entityId,countryId)
 const localizeHome=useColombiaHomeCopy()
 if(!records.length)return null
 return localizeHome(<details onToggle={event=>{if(event.currentTarget.open)onOpen?.()}} className="mt-3 rounded-xl border border-emerald-100 bg-emerald-50/40 px-4 text-xs text-emerald-950">
  <summary className="min-h-11 cursor-pointer py-3 font-medium">{records.some(record=>record.pronunciationGuide)?"Names and pronunciation":"Names and language"} · {records.map(r=>r.name).join(", ")}</summary>
  <div className="pb-4 space-y-3">{records.map(record=><div key={record.id}><p className="font-medium">{record.name}{record.language?` · ${record.language}`:""}</p><p className="mt-1 leading-6">{record.context}</p><a href={record.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline">Name source: {record.publisher}</a>{record.pronunciationGuide&&<a href={record.pronunciationGuide.url} target="_blank" rel="noopener noreferrer" className="ml-4 inline-flex min-h-11 items-center underline">{record.pronunciationGuide.label}</a>}</div>)}</div>
 </details>)
}
