/**
 * Pairs New Zealand bird photographs and calls with the small island map.
 * The carousel reports its current bird; its stable ID selects explicit, sourced
 * planning-island associations rather than guessing from a location label. The enquiry link preserves the New Zealand topic.
 */
"use client"

import { useState } from "react"
import ResizableDiscoveryPair from "@/components/resizable-discovery-pair"
import { ArrowRight } from "lucide-react"
import HomepageBirdCarousel from "@/components/homepage-bird-carousel"
import NewZealandMap from "@/components/new-zealand-map"
import { newZealandContactHref } from "@/content/new-zealand"
import { newZealandCarouselBirds } from "@/content/new-zealand-carousel"
import { newZealandBirdIslands } from "@/content/new-zealand-bird-islands"

export default function NewZealandHeroExplorer() {
  const [currentBird, setCurrentBird] = useState(newZealandCarouselBirds[0])

  return (
    <ResizableDiscoveryPair mediaId="birdlife" mapLabel="Explore the islands" media={<>
        <HomepageBirdCarousel birds={newZealandCarouselBirds} fillPanel autoPlay={false} showBirdPicker onBirdChange={setCurrentBird} />
        <p className="mt-3 text-center text-sm leading-6 text-gray-600">{newZealandCarouselBirds.length} featured species, with a South Island focus. A selection, not a complete checklist. Open species details for range, habitat and sources.</p>
      </>} map={<>
        <NewZealandMap compact frameHeight="var(--discovery-panel-height, auto)" highlightedIslands={newZealandBirdIslands[currentBird.id] ?? []} />
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <a href={newZealandContactHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 font-semibold text-white shadow-sm hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">Discuss a New Zealand trip<ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
          <span className="text-xs leading-5 text-gray-600">In development · Begin with a personal conversation.</span>
        </div>
      </>} />
  )
}
