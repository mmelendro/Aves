"use client"

/** The same compact native control is available on both discovery images.
 * It changes only the page-local habitat, never a visitor's saved bird wishes.
 */
import { southIslandEcosystems, type SouthIslandEcosystemFilter } from "@/components/public-explorer/content/south-island-ecosystems"

export default function SouthIslandHabitatSelect({ value, onChange, label }: {
  value: SouthIslandEcosystemFilter; onChange: (value: SouthIslandEcosystemFilter) => void; label: string
}) {
  return <select aria-label={label} title="Filter by habitat" value={value} onChange={event => onChange(event.target.value as SouthIslandEcosystemFilter)}
    className="min-h-11 w-full max-w-full rounded-xl border border-white/50 bg-slate-950/65 px-3 text-sm text-white shadow-sm backdrop-blur-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
    <option value="all" className="bg-white text-emerald-950">All habitats</option>
    {southIslandEcosystems.map(item => <option key={item.id} value={item.id} className="bg-white text-emerald-950">{item.name}</option>)}
  </select>
}
