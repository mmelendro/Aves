import { australiaMetadata } from "@/features/australia/lib/metadata"
/*
 * Public region-explorer route. A region query parameter can preselect the interactive map
 * when a visitor follows a bird or regional link. RegionExplorer owns the browser interaction.
 */
import type { Metadata } from "next"
import { PageShell } from "@/features/australia/components/page-shell"
import { RegionExplorer } from "@/features/australia/components/region-explorer"
import { canonicalUrl } from "@/features/australia/lib/site-path"
export const metadata: Metadata = australiaMetadata({ title: "Explore Australian Regions", description: "Explore every Australian state and mainland territory on an interactive map. Discover birding habitats, seasonal considerations and ideas for a custom Australian journey.", alternates: { canonical: canonicalUrl("/aves-explorer") } })
// The key resets the client chooser when its URL preselection changes; the child validates unknown IDs.
export default async function RegionsPage({ searchParams }: { searchParams: Promise<{ region?: string }> }) {
  const { region } = await searchParams
  return <PageShell path="/aves-explorer" title="Explore Australia's Regions" description="Rainforest, coastal bushland and island shores. Find a place that speaks to you, and see what to consider before planning your journey."><RegionExplorer key={region || "queensland"} initialRegion={region} /></PageShell>
}
