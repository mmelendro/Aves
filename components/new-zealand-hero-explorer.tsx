/**
 * Pairs New Zealand bird photographs and calls with the small island map.
 * The carousel reports its current bird; its stable ID selects explicit, sourced
 * planning-island associations rather than guessing from a location label. The enquiry link preserves the New Zealand topic.
 */
"use client"

import { useEffect, useId, useState } from "react"
import ResizableDiscoveryPair from "@/components/resizable-discovery-pair"
import { ArrowRight } from "lucide-react"
import HomepageBirdCarousel from "@/components/homepage-bird-carousel"
import NewZealandMap from "@/components/new-zealand-map"
import { newZealandContactHref, newZealandRegions } from "@/content/new-zealand"
import { newZealandRegionBirds } from "@/content/new-zealand-carousel"
import { newZealandBirdIslands, type NewZealandIslandId } from "@/content/new-zealand-bird-islands"
import { newZealandRegionHref } from "@/lib/new-zealand-region-links"
import NewZealandBirdPicker from "@/components/new-zealand-bird-picker"
import { featuredNzBirdId } from "@/content/new-zealand-checklist"
import { readNzBirdBasket, writeNzBirdBasket } from "@/lib/nz-bird-selection"

import { filterSouthIslandBirds, southIslandEcosystems, type SouthIslandEcosystemFilter } from "@/content/south-island-ecosystems"

export default function NewZealandHeroExplorer({ regionId }: { regionId?: NewZealandIslandId } = {}) {
  const [chosenRegion, setChosenRegion] = useState<NewZealandIslandId | undefined>(regionId)
  const ecosystemId = useId()
  const [ecosystem, setEcosystem] = useState<SouthIslandEcosystemFilter>("all")
  // Pilot only on the dedicated South Island page; the country overview keeps
  // its existing island navigation and full collection unchanged.
  const birds = regionId === "south-island" ? filterSouthIslandBirds(newZealandRegionBirds(chosenRegion), ecosystem) : newZealandRegionBirds(chosenRegion)
  const activeEcosystem = southIslandEcosystems.find(item => item.id === ecosystem)
  const collectionLabel = activeEcosystem ? `South Island birds · ${activeEcosystem.name}` : chosenRegion === "south-island" ? "South Island bird photographs" : chosenRegion === "north-island" ? "North Island bird photographs" : chosenRegion === "rakiura" ? "Rakiura bird photographs" : "New Zealand bird photographs"
  const [currentBird, setCurrentBird] = useState(birds[0])
  const briefHref = `/account?country=new-zealand&region=${chosenRegion || "south-island"}`
  const overview = newZealandRegions.find(region => region.id === chosenRegion)
  const [selected, setSelected] = useState<string[]>([])
  const [storageAvailable, setStorageAvailable] = useState(true)
  useEffect(() => {
    function restore() { try { setSelected(readNzBirdBasket(window.sessionStorage)) } catch { setStorageAvailable(false) } }
    restore()
    window.addEventListener("pageshow", restore)
    return () => window.removeEventListener("pageshow", restore)
  }, [])
  function selectBirds(ids: string[]) {
    setSelected(ids)
    try { setStorageAvailable(writeNzBirdBasket(window.sessionStorage, ids)) } catch { setStorageAvailable(false) }
  }

  return (
    <>{regionId === "south-island" && <section aria-label="Explore South Island ecosystems" className="mb-5 rounded-2xl border border-emerald-200 bg-white/80 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <label htmlFor={ecosystemId} className="text-sm font-medium text-emerald-950">Explore by ecosystem</label>
          <select id={ecosystemId} value={ecosystem} aria-describedby={`${ecosystemId}-context`} onChange={event => {
            const next = event.target.value as SouthIslandEcosystemFilter
            setEcosystem(next)
            setCurrentBird(filterSouthIslandBirds(newZealandRegionBirds("south-island"), next)[0])
          }} className="min-h-11 max-w-full rounded-lg border border-emerald-200 bg-white px-3 text-base text-emerald-950">
            <option value="all">All habitats</option>
            {southIslandEcosystems.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
          <p role="status" className="text-xs font-medium text-emerald-800">{birds.length} featured birds · {activeEcosystem?.name || "All habitats"}</p>
        </div>
        <p id={`${ecosystemId}-context`} className="mt-2 text-sm leading-6 text-gray-600">{activeEcosystem?.description || "Choose a habitat to explore its South Island birds and calls. Your saved bird wishes stay selected when you switch."}</p>
        <p className="mt-2 text-xs leading-5 text-gray-500">Broad habitat associations, not mapped ecosystem boundaries or promised sightings. Species details retain local range, access guidance and sources; photograph and recording locations may differ.</p>
      </section>}<ResizableDiscoveryPair mediaId="birdlife" mapLabel="Explore the islands" media={<>
        {/* A new collection stops old playback/Info; wishes remain in this parent. */}
        <HomepageBirdCarousel key={`${chosenRegion || "all-islands"}-${ecosystem}`} birds={birds} label={collectionLabel} fillPanel autoPlay={false} showBirdPicker onBirdChange={setCurrentBird} selection={{ isSelected: bird => selected.includes(featuredNzBirdId(bird.scientificName) || ""), onToggle: bird => { const id = featuredNzBirdId(bird.scientificName); if (id) selectBirds(selected.includes(id) ? selected.filter(value => value !== id) : [...selected, id]) } }} />
        <p className="mt-3 text-center text-sm leading-6 text-gray-600">{birds.length} featured species{chosenRegion ? ` associated with ${chosenRegion === "south-island" ? "South Island" : chosenRegion === "north-island" ? "North Island" : "Rakiura"}` : ", with a South Island focus"}. A selection, not a complete checklist. Open species details for range, habitat and sources.</p>
      </>} map={<>
        <NewZealandMap compact frameHeight="var(--discovery-panel-height, auto)" focusedIsland={chosenRegion} onSelectIsland={regionId ? undefined : id => { setChosenRegion(id); setCurrentBird(newZealandRegionBirds(id)[0]) }} onResetFocus={regionId ? undefined : () => { setChosenRegion(undefined); setCurrentBird(newZealandRegionBirds()[0]) }} highlightedIslands={chosenRegion ? [chosenRegion] : newZealandBirdIslands[currentBird.id] ?? []} />
        {chosenRegion && !regionId && <a href={newZealandRegionHref(chosenRegion)} className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-emerald-800 underline underline-offset-4">Open the {chosenRegion === "south-island" ? "South Island" : chosenRegion === "north-island" ? "North Island" : "Rakiura"} guide<ArrowRight className="h-4 w-4" aria-hidden="true" /></a>}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <a href={newZealandContactHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 font-semibold text-white shadow-sm hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">Discuss a New Zealand trip<ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
          <span className="text-xs leading-5 text-gray-600">In development · Begin with a personal conversation.</span>
        </div>
      </>} />
      {overview && !regionId && <section className="mt-5 rounded-2xl border border-emerald-100 bg-white p-5 sm:p-7" aria-label={`${overview.name} planning overview`}><h2 className="text-xl font-medium text-emerald-950">{overview.name}</h2><p className="mt-3 text-sm leading-7 text-gray-600">{overview.description}</p><p className="mt-2 text-sm leading-7 text-gray-600">{overview.balance}</p><a href={briefHref} className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-emerald-800 underline underline-offset-4">Start a private {overview.name} brief<ArrowRight className="h-4 w-4" aria-hidden="true" /></a></section>}
      <section aria-labelledby="nz-bird-wishlist-title" className="mt-7 rounded-2xl border border-emerald-200 bg-white p-5 sm:p-7">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4"><div><h2 id="nz-bird-wishlist-title" className="text-xl font-medium text-emerald-950">Birds you would love to see</h2><p className="mt-2 text-sm leading-6 text-gray-600">Tap the heart on a photograph, or search the living-species checklist below. The checklist includes other New Zealand islands and rare visitors; inclusion does not mean a bird occurs on the South Island. Want-to-see choices are separate from birds you have already seen.</p></div><a href={briefHref} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800">Save {selected.length || "your"} bird choice{selected.length === 1 ? "" : "s"} in a private brief<ArrowRight className="h-4 w-4" aria-hidden="true" /></a></div>
        <NewZealandBirdPicker selected={selected} onChange={selectBirds} />
        <p className="mt-4 text-xs leading-6 text-gray-600">{storageAvailable ? "Unsaved choices stay in this browser tab for up to a day. Follow the link in this tab, sign in, review your choices and press Save My Draft to save them privately. Sharing with AVES is a separate step." : "This browser cannot carry the choices between pages. Open the private brief and choose birds there before saving."}</p>
      </section>
    </>
  )
}
