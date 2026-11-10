/**
 * Explicit Caribbean route and metadata. It uses the same ColombiaRegionPage
 * template as the dynamic region routes, with the Caribbean content record.
 */
import { canonicalUrl } from "@/lib/site-path"
import type { Metadata } from "next"
import { ColombiaRegionPage } from "@/components/colombia-region-page"
import { regions, colombiaBirdingTitle } from "@/content/regions"

export const metadata: Metadata = {
  alternates: { canonical: canonicalUrl("/regions/caribbean") },
  title: `${colombiaBirdingTitle(regions.find(region => region.id === "caribbean")!)} | AVES Colombia`,
  description:
    "Discover coastal & Sierra Nevada foothills birding in Colombia. Explore Riohacha, Las Gaviotas, mangroves & dry forest with expert guides.",
  keywords:
    "Caribbean coastal birding, Colombia foothills, Riohacha birding, Las Gaviotas, mangrove birding, dry forest birds, Tayrona National Park",
}

export default function CaribbeanRegionPage() {
  return <ColombiaRegionPage region={regions.find(region => region.id === "caribbean")!} />
}
