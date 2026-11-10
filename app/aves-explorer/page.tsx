import { publicMetadata } from "@/lib/public-metadata"
/**
 * Route wrapper for the full Colombia Explorer. Metadata belongs here; region
 * selection, map markers and bird panels belong in ColombianBirdsExplorer.
 * The header and footer frame that client-side explorer.
 */
import { canonicalUrl } from "@/lib/site-path"
import { ColombianBirdsExplorer } from "@/components/colombian-birds-explorer"
import { GlobalHeader, GlobalFooter } from "@/components/global-navigation"
import type { Metadata } from "next"

export const metadata: Metadata = publicMetadata({
  alternates: { canonical: canonicalUrl("/aves-explorer") },
  title: "AVES Explorer - Discover Colombia's Incredible Bird Diversity",
  description:
    "Explore Colombia's 11 bioregions and discover over 1,900 bird species with our interactive map. Plan your birding adventure with expert guides.",
  keywords: "Colombia birding, bird watching tours, Colombian birds, bioregions, endemic species, birding guide",
  openGraph: {
    title: "AVES Explorer - Colombia's Bird Diversity",
    description: "Interactive exploration of Colombia's incredible avian biodiversity across 11 unique bioregions.",
    images: ["/images/aves-logo.png"],
  },
})

export default function AvesExplorerPage() {
  return (
    <div className="relative min-h-screen">
      <GlobalHeader/>
      <main id="main-content" tabIndex={-1} className="relative">
        <ColombianBirdsExplorer />
      </main>
      <GlobalFooter/>
    </div>
  )
}
