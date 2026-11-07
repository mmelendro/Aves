"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import HomepageBirdCarousel from "@/components/homepage-bird-carousel"
import NewZealandMap from "@/components/new-zealand-map"
import { newZealandCarouselBirds } from "@/content/new-zealand-carousel"

// Only highlight islands explicitly named in the catalogue's featured-area
// label. Broad or ambiguous labels stay unhighlighted; this is not a range map.
function featuredIslands(region: string) {
  if (region === "North, South & Stewart Islands") return ["north-island", "south-island", "rakiura"]
  return [
    ...(region.includes("North Island") ? ["north-island"] : []),
    ...(region.includes("South Island") ? ["south-island"] : []),
    ...(region.includes("Stewart Island") || region.includes("Rakiura") ? ["rakiura"] : []),
  ]
}

export default function NewZealandHeroExplorer() {
  const [currentBird, setCurrentBird] = useState(newZealandCarouselBirds[0])

  return (
    <div className="mx-auto grid max-w-6xl items-start gap-6 lg:grid-cols-[0.85fr_1.35fr] lg:gap-10">
      <div id="birdlife" className="order-1 min-w-0 scroll-mt-24 lg:order-2">
        <HomepageBirdCarousel birds={newZealandCarouselBirds} className="w-full max-w-none" autoPlay={false} showBirdPicker onBirdChange={setCurrentBird} />
        <p className="mt-3 text-center text-sm leading-6 text-gray-600">{newZealandCarouselBirds.length} featured species, with a South Island focus. A selection, not a complete checklist. Open species details for range, habitat and sources.</p>
      </div>
      <div className="order-2 min-w-0 lg:order-1">
        <NewZealandMap compact highlightedIslands={featuredIslands(currentBird.primaryRegion)} />
        <div className="mt-4 flex items-center gap-4">
          <a href="#your-journey" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-700 px-6 font-semibold text-white shadow-sm hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">Share your ideas<ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
          <span className="max-w-36 text-xs leading-5 text-gray-600">Help shape this new AVES destination.</span>
        </div>
      </div>
    </div>
  )
}
