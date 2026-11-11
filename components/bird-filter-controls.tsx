"use client"

import {useId,useRef} from "react"
import {ListFilter} from "lucide-react"
import {useBirdFilters} from "./bird-filter-context"
import {birdFiltersActive,defaultBirdFilters,statusLabels,type BirdStatusFilter} from "@/lib/bird-conservation"
import styles from "./bird-filter-controls.module.css"

/** Each map/carousel edits one shared, page-session filter. Native popovers overlay, never resize the map. */
export default function BirdFilterControls(_props:{align?:"left"|"right"}={}) {
 const {filters,setFilters}=useBirdFilters(), id=useId(), ref=useRef<HTMLDivElement>(null)
 function close(){ref.current?.hidePopover()}
 return <div className={styles.control} data-bird-filters>
  <button type="button" popoverTarget={`${id}-filters`} className={styles.trigger} aria-label="Bird filters" title="Endemic and conservation filters"><ListFilter size={18} aria-hidden="true"/>{birdFiltersActive(filters)&&<span className={styles.active} aria-hidden="true"/>}<span className="sr-only">{birdFiltersActive(filters) ? "Filters active" : "All birds"}</span></button>
  <div ref={ref} id={`${id}-filters`} popover="auto" role="dialog" aria-label="Bird filters" className={styles.panel}>
   <h3 className="font-semibold">Explore by bird</h3>
   <label className="flex min-h-11 items-center gap-2"><input type="checkbox" checked={filters.endemicOnly} onChange={e=>setFilters({...filters,endemicOnly:e.target.checked})}/>Country endemics only</label>
   <label htmlFor={`${id}-status`}>Conservation status</label>
   <select id={`${id}-status`} className={styles.select} value={filters.status} onChange={e=>setFilters({...filters,status:e.target.value as BirdStatusFilter})}>
    <option value="all">All conservation statuses</option><option value="threatened">Threatened · CR, EN &amp; VU</option>{(["CR","EN","VU","NT","LC","DD","NE","unknown"] as const).map(status=><option key={status} value={status}>{statusLabels[status]}{status!=="unknown" ? ` · ${status}` : ""}</option>)}
   <option value="national-threatened">Nationally threatened · verified entries</option></select>
   <p className="mt-3 text-xs text-gray-600">Filters combine with your region and habitat. Country endemics describe native range, not a species found only in the selected subregion. Threatened includes Critically Endangered, Endangered and Vulnerable.</p>
   <p className="mt-2 text-xs text-gray-600">Global species assessments are a dated GBIF/IUCN snapshot. National listings appear separately in bird details. Unverified status stays unknown. Highlighted planning areas are based on featured birds, not complete ranges or live sightings.</p>
   <div className="mt-3 flex flex-wrap gap-2"><button type="button" className="min-h-11 rounded-lg border border-emerald-200 px-3" onClick={()=>setFilters(defaultBirdFilters)}>Clear bird filters</button><button type="button" className="min-h-11 rounded-lg px-3 underline" onClick={close}>Close bird filters</button></div>
  </div>
 </div>
}
