/*
 * Public region-explorer route. A region query parameter can preselect the interactive map
 * when a visitor follows a bird or regional link. RegionExplorer owns the browser interaction.
 */
import type { Metadata } from "next"
import Link from "next/link"
import { regions } from "@/content/regions"
import { AustraliaUnifiedExplorer } from "@/components/australia-unified-explorer"
import { ExplorerHeader, ExplorerFooter } from "@/components/explorer-navigation"
import { canonicalUrl } from "@/lib/site-path"
export const metadata: Metadata = { title: "Explore Australian Regions", description: "Explore every Australian state and mainland territory on an interactive map. Discover birding habitats, seasonal considerations and ideas for a custom Australian journey.", alternates: { canonical: canonicalUrl("/aves-explorer") } }
// The key resets the client chooser when its URL preselection changes; the child validates unknown IDs.
export default async function RegionsPage({ searchParams }: { searchParams: Promise<{ region?: string }> }) {
  const { region } = await searchParams
  return <div className="min-h-screen bg-white"><ExplorerHeader/><main id="main-content" tabIndex={-1}><AustraliaUnifiedExplorer initialRegion={region}><section aria-label="Australian regional guides" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><h2 className="text-2xl font-medium text-emerald-950">Explore Australian regions</h2><nav aria-label="Australian regional guides" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{regions.map(item=><Link key={item.id} href={`/regions/${item.id}`} className="rounded-2xl border border-emerald-100 p-5"><h3 className="font-semibold text-emerald-950">{item.state}</h3><p className="mt-3 text-sm leading-7 text-gray-600">{item.description}</p></Link>)}</nav></section></AustraliaUnifiedExplorer></main><ExplorerFooter/></div>
}
