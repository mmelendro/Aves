"use client"

/** Same controlled picker on the public discovery page and private brief editor.
 * The parent owns selection/storage; searching this public reference saves nothing.
 */
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

export default function NewZealandBirdPicker({ selected, onChange }: { selected: string[]; onChange: (ids: string[]) => void }) {
  const prefix = useId()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState("all")
  const [limit, setLimit] = useState(40)
  const [origin, setOrigin] = useState<NzOriginFilter>("all")
  const results = filterNzBirds(newZealandChecklist, { query, origin, selectedOnly: filter === "selected", selected })
  function toggle(id: string) { onChange(selected.includes(id) ? selected.filter(value => value !== id) : [...selected, id]) }

  return <div className="space-y-4">
    <p role="status" aria-live="polite" className="text-sm font-medium text-emerald-900">{selected.length} {selected.length === 1 ? "bird" : "birds"} on your wish list. Sightings and access are not guaranteed.</p>
    {selected.length > 0 && <div className="flex flex-wrap gap-2" aria-label="Selected birds">{selected.slice(0, 8).map(id => <button key={id} type="button" onClick={() => toggle(id)} aria-label={`Remove ${nzBirdName(id)} from wish list`} className="min-h-11 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-left text-sm text-emerald-950 hover:bg-emerald-100">{nzBirdName(id)} <span aria-hidden="true">×</span></button>)}{selected.length > 8 && <span className="self-center text-sm text-gray-600">+ {selected.length - 8} more; choose Selected below to review all.</span>}</div>}
    <details className="rounded-xl border border-emerald-200 bg-white p-4" onToggle={event => setOpen(event.currentTarget.open)}>
      <summary className="min-h-11 cursor-pointer content-center font-medium text-emerald-950">Search {newZealandChecklist.length} species</summary>
      {open && <div className="mt-4 space-y-4">
        <p id={`${prefix}-scope`} className="text-sm leading-6 text-gray-600">Species from the published Birds New Zealand main checklist (2024). Includes rare visitors and offshore islands, not just the South Island; this is not a live presence report. Reference images are available for {nzChecklistMedia.size} entries. Open a thumbnail for the source and full credits. A few images await verification. Viewing an image does not select the bird.</p>
        <div><label htmlFor={`${prefix}-search`} className="mb-2 block text-sm font-medium">Search by English, Māori or scientific name</label><input id={`${prefix}-search`} type="search" value={query} onChange={event => { setQuery(event.target.value); setLimit(40) }} className="min-h-11 w-full rounded-md border border-emerald-200 px-3 text-base" placeholder="Try kea, kiwi or albatross" aria-describedby={`${prefix}-scope`} /></div>
        <div><label htmlFor={`${prefix}-filter`} className="mr-3 text-sm font-medium">Show</label><select id={`${prefix}-filter`} value={filter} onChange={event => { setFilter(event.target.value); setLimit(40) }} className="min-h-11 rounded-md border border-emerald-200 bg-white px-3 text-sm"><option value="all">All species</option><option value="selected">Selected birds</option></select></div>
        <div><label htmlFor={`${prefix}-origin`} className="mr-3 text-sm font-medium">Origin</label><select id={`${prefix}-origin`} value={origin} onChange={event => { setOrigin(event.target.value as NzOriginFilter); setLimit(40) }} className="min-h-11 max-w-full rounded-md border border-emerald-200 bg-white px-3 text-sm" aria-describedby={`${prefix}-origin-help`}>{originOptions.map(option => <option key={option.value} value={option.value}>{option.label} ({newZealandChecklist.filter(bird => matchesNzOrigin(bird.origin, option.value)).length})</option>)}</select><p id={`${prefix}-origin-help`} className="mt-2 text-xs leading-5 text-gray-600">Native includes endemic species. Origin describes the published New Zealand checklist, not presence on your chosen island. Filtering keeps your bird choices selected.</p></div>
        <p role="status" className="text-xs text-gray-600">{results.length} matching {results.length === 1 ? "entry" : "entries"} · showing {Math.min(limit, results.length)}</p>
        <ul className="max-h-96 divide-y divide-emerald-100 overflow-y-auto rounded-lg border border-emerald-100">{results.slice(0, limit).map(bird => <li key={bird.id} className="p-3"><div className="flex items-start gap-2"><label className="flex min-h-11 min-w-0 flex-1 items-start gap-3 text-gray-900"><input type="checkbox" checked={selected.includes(bird.id)} onChange={() => toggle(bird.id)} className="mt-1.5 h-4 w-4 shrink-0 accent-emerald-700" aria-label={`Select ${bird.commonName}`} /><span className="min-w-0"><span className="block text-sm font-medium">{bird.commonName}{bird.maoriName && ` / ${bird.maoriName}`}</span><span className="block break-words text-xs italic leading-6">{bird.scientificName}</span><span className="block text-xs">{nzOriginLabel(bird.origin)}{bird.extinct ? " · Extinct historical reference" : bird.rare ? " · Rare visitor, not a dependable trip target" : ""}</span></span></label>{nzChecklistMedia.has(bird.id) ? <NewZealandChecklistPhoto photo={nzChecklistMedia.get(bird.id)!} name={nzBirdName(bird.id)} /> : <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-emerald-100 bg-emerald-50 px-1 text-center text-[10px] text-gray-600">Image pending</span>}</div></li>)}</ul>
        {results.length === 0 && <p className="text-sm text-gray-600">No matching birds. Try another name or change the filter.</p>}
        {results.length > limit && <button type="button" onClick={() => setLimit(value => value + 40)} className="min-h-11 rounded-md border border-emerald-300 px-4 text-sm font-medium text-emerald-900">Show more birds</button>}
        <p className="text-xs leading-6 text-gray-600">Names and status: <a href={newZealandChecklistSource.url} target="_blank" rel="noreferrer" className="underline underline-offset-2">Birds New Zealand, sixth edition (2024)</a>, checked 8 November 2026. A source-version checklist, not live availability. A guide will check season, location, conservation restrictions and realistic chances for your selected birds.</p>
      </div>}
    </details>
  </div>
}
