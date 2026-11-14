"use client"

/** Heavy checklist search and credited media, loaded after an explicit open. */
import ebirdLinks from "@/content/new-zealand-ebird-links.json"
const ebirdByName:Record<string,string>=ebirdLinks
import BirdFilterControls from "./bird-filter-controls"
import {useBirdFilters} from "./bird-filter-context"
import {filterConservationBirds} from "@/lib/bird-conservation"
import { useId, useState } from "react"
import { newZealandChecklist, newZealandChecklistSource, nzBirdName } from "@/content/new-zealand-checklist"

import { nzChecklistMedia } from "@/content/new-zealand-checklist-media"
import NewZealandChecklistPhoto from "@/components/new-zealand-checklist-photo"

import { filterNzBirds, matchesNzOrigin, nzOriginLabel, type NzOriginFilter } from "@/lib/nz-bird-filters"

const originOptions: { value: NzOriginFilter; label: string }[] = [
  { value: "all", label: "All origins" }, { value: "native", label: "Native, including endemic" },
  { value: "endemic", label: "Endemic to New Zealand" }, { value: "introduced", label: "Introduced" },
  { value: "unknown", label: "Origin not confirmed" },
]

export default function NewZealandBirdSearch({ selected, onChange }: { selected: string[]; onChange: (ids: string[]) => void }) {
  const {filters}=useBirdFilters()
  const prefix = useId()
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState("all")
  const [limit, setLimit] = useState(40)
  const [origin, setOrigin] = useState<NzOriginFilter>("all")
  const results = filterConservationBirds(filterNzBirds(newZealandChecklist, { query, origin, selectedOnly: filter === "selected", selected }),filters,"new-zealand")
  function toggle(id: string) { onChange(selected.includes(id) ? selected.filter(value => value !== id) : [...selected, id]) }


  return <div className="mt-4 space-y-4">
    <BirdFilterControls align="left"/>

        <p id={`${prefix}-scope`} className="text-sm leading-6 text-gray-600">Species from the published Birds New Zealand main checklist (2024). Includes rare visitors and offshore islands, not just the South Island; this is not a live presence report. Reference images are available for {nzChecklistMedia.size} entries. Open a thumbnail for the source and full credits. A few images await verification. Viewing an image does not select the bird.</p>
        <div><label htmlFor={`${prefix}-search`} className="mb-2 block text-sm font-medium">Search by English, Māori or scientific name</label><input id={`${prefix}-search`} type="search" value={query} onChange={event => { setQuery(event.target.value); setLimit(40) }} className="min-h-11 w-full rounded-md border border-emerald-200 px-3 text-base" placeholder="Try kea, kiwi or albatross" aria-describedby={`${prefix}-scope`} /></div>
        <div><label htmlFor={`${prefix}-filter`} className="mr-3 text-sm font-medium">Show</label><select id={`${prefix}-filter`} value={filter} onChange={event => { setFilter(event.target.value); setLimit(40) }} className="min-h-11 rounded-md border border-emerald-200 bg-white px-3 text-sm"><option value="all">All species</option><option value="selected">Selected birds</option></select></div>
        <div><label htmlFor={`${prefix}-origin`} className="mr-3 text-sm font-medium">Origin</label><select id={`${prefix}-origin`} value={origin} onChange={event => { setOrigin(event.target.value as NzOriginFilter); setLimit(40) }} className="min-h-11 max-w-full rounded-md border border-emerald-200 bg-white px-3 text-sm" aria-describedby={`${prefix}-origin-help`}>{originOptions.map(option => <option key={option.value} value={option.value}>{option.label} ({newZealandChecklist.filter(bird => matchesNzOrigin(bird.origin, option.value)).length})</option>)}</select><p id={`${prefix}-origin-help`} className="mt-2 text-xs leading-5 text-gray-600">Native includes endemic species. Origin describes the published New Zealand checklist, not presence on your chosen island. Filtering keeps your bird choices selected.</p></div>
        <p role="status" className="text-xs text-gray-600">{results.length} matching {results.length === 1 ? "entry" : "entries"} · showing {Math.min(limit, results.length)}</p>
        <ul className="max-h-96 divide-y divide-emerald-100 overflow-y-auto rounded-lg border border-emerald-100">{results.slice(0, limit).map(bird => <li key={bird.id} className="p-3"><div className="flex items-start gap-2"><label className="flex min-h-11 min-w-0 flex-1 items-start gap-3 text-gray-900"><input type="checkbox" checked={selected.includes(bird.id)} onChange={() => toggle(bird.id)} className="mt-1.5 h-4 w-4 shrink-0 accent-emerald-700" aria-label={`Select ${bird.commonName}`} /><span className="min-w-0"><span className="block text-sm font-medium">{bird.commonName}{bird.maoriName && ` / ${bird.maoriName}`}</span><span className="block break-words text-xs italic leading-6">{bird.scientificName}</span><span className="block text-xs">{nzOriginLabel(bird.origin)}{bird.extinct ? " · Extinct historical reference" : bird.rare ? " · Rare visitor, not a dependable trip target" : ""}</span></span></label>{nzChecklistMedia.has(bird.id) ? <NewZealandChecklistPhoto photo={nzChecklistMedia.get(bird.id)!} name={nzBirdName(bird.id)} /> : <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-emerald-100 bg-emerald-50 px-1 text-center text-[10px] text-gray-600">Image pending</span>}</div>{Object.hasOwn(ebirdByName,bird.scientificName)&&<a href={`https://ebird.org/species/${ebirdByName[bird.scientificName]}`} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center text-xs text-emerald-800 underline" aria-label={`Explore ${bird.commonName} on eBird`}>Explore on eBird</a>}</li>)}</ul>
        {results.length === 0 && <p className="text-sm text-gray-600">No matching birds. Try another name or change the filter.</p>}
        {results.length > limit && <button type="button" onClick={() => setLimit(value => value + 40)} className="min-h-11 rounded-md border border-emerald-300 px-4 text-sm font-medium text-emerald-900">Show more birds</button>}
        <p className="text-xs leading-6 text-gray-600">Names and status: <a href={newZealandChecklistSource.url} target="_blank" rel="noreferrer" className="underline underline-offset-2">Birds New Zealand, sixth edition (2024)</a>, checked 8 November 2026. A source-version checklist, not live availability. A guide will check season, location, conservation restrictions and realistic chances for your selected birds.</p>
  </div>
}
