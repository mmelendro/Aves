import type { Metadata } from "next"
import CaribbeanRegionPageClient from "./CaribbeanRegionPageClient"

export const metadata: Metadata = {
  title: "Caribbean Region - Coastal & Foothill Birding Tours | AVES",
  description:
    "Discover coastal & Sierra Nevada foothills birding in Colombia. Explore Riohacha, Las Gaviotas, mangroves & dry forest with expert guides.",
  keywords:
    "Caribbean coastal birding, Colombia foothills, Riohacha birding, Las Gaviotas, mangrove birding, dry forest birds, Tayrona National Park",
}

export default function CaribbeanRegionPage() {
  return <CaribbeanRegionPageClient />
}
