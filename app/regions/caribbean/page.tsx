import type { Metadata } from "next"
import { ColombiaRegionPage } from "@/components/colombia-region-page"
import { regions } from "@/content/regions"

export const metadata: Metadata = {
  title: "Caribbean Region - Coastal & Foothill Birding Tours | AVES",
  description:
    "Discover coastal & Sierra Nevada foothills birding in Colombia. Explore Riohacha, Las Gaviotas, mangroves & dry forest with expert guides.",
  keywords:
    "Caribbean coastal birding, Colombia foothills, Riohacha birding, Las Gaviotas, mangrove birding, dry forest birds, Tayrona National Park",
}

export default function CaribbeanRegionPage() {
  return <ColombiaRegionPage region={regions.find(region => region.id === "caribbean")!} />
}
