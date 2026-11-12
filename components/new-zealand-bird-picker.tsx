"use client"

import { useState, type ComponentType } from "react"
import { newZealandChecklist, nzBirdName } from "@/content/new-zealand-checklist"

type PickerProps = { selected: string[]; onChange: (ids: string[]) => void }

/** Selection belongs to the parent. Loading, closing or retrying a public search
 * never stores choices or replaces them. Keep loaded search state on close. */
export default function NewZealandBirdPicker({ selected, onChange }: PickerProps) {
  const [open, setOpen] = useState(false)
  const [Search, setSearch] = useState<ComponentType<PickerProps> | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState(false)

  async function loadSearch() {
    if (Search || loading) return
    setLoading(true)
    setLoadError(false)
    try {
      const searchModule = await import("./new-zealand-bird-search")
      setSearch(() => searchModule.default)
    } catch {
      setLoadError(true)
    } finally {
      setLoading(false)
    }
  }
  function toggle(id: string) { onChange(selected.includes(id) ? selected.filter(value => value !== id) : [...selected, id]) }

  return <div className="space-y-4">
    <p role="status" aria-live="polite" className="text-sm font-medium text-emerald-900">{selected.length} {selected.length === 1 ? "bird" : "birds"} on your wish list. Sightings and access are not guaranteed.</p>
    {selected.length > 0 && <div className="flex flex-wrap gap-2" aria-label="Selected birds">{selected.slice(0, 8).map(id => <button key={id} type="button" onClick={() => toggle(id)} aria-label={`Remove ${nzBirdName(id)} from wish list`} className="min-h-11 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-left text-sm text-emerald-950 hover:bg-emerald-100">{nzBirdName(id)} <span aria-hidden="true">×</span></button>)}{selected.length > 8 && <span className="self-center text-sm text-gray-600">+ {selected.length - 8} more; choose Selected below to review all.</span>}</div>}
    <details className="rounded-xl border border-emerald-200 bg-white p-4" onToggle={event => {
      setOpen(event.currentTarget.open)
      if (event.currentTarget.open) void loadSearch()
    }}>
      <summary className="min-h-11 cursor-pointer content-center font-medium text-emerald-950">Search {newZealandChecklist.length} species</summary>
      <div hidden={!open} aria-busy={loading}>
        {loading && <p role="status" className="mt-4 text-sm text-gray-600">Loading bird search. Your choices are kept.</p>}
        {loadError && <div className="mt-4 space-y-3"><p role="alert" className="text-sm text-amber-900">Bird search could not load. Your choices are kept.</p><button type="button" onClick={() => void loadSearch()} className="min-h-11 rounded-lg border border-emerald-300 px-4 text-sm font-medium text-emerald-900">Try bird search again</button></div>}
        {Search && <Search selected={selected} onChange={onChange} />}
        <noscript><p className="mt-4 text-sm"><a href="/species/reference?country=new-zealand" className="text-emerald-800 underline">Browse the New Zealand inventory</a>. Enable JavaScript to select birds for this wish list.</p></noscript>
      </div>
    </details>
  </div>
}
