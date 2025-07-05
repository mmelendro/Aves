import { ColombianBirdsExplorer } from "@/components/colombian-birds-explorer"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AVES Explorer - Discover Colombia's Incredible Bird Diversity",
  description:
    "Explore Colombia's 11 bioregions and discover over 1,900 bird species with our interactive map. Plan your birding adventure with expert guides.",
  keywords: "Colombia birding, bird watching tours, Colombian birds, bioregions, endemic species, birding guide",
  openGraph: {
    title: "AVES Explorer - Colombia's Bird Diversity",
    description: "Interactive exploration of Colombia's incredible avian biodiversity across 11 unique bioregions.",
    images: ["/images/aves-logo.png"],
  },
}

export default function AvesExplorerPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationHeader currentPage="/aves-explorer" />
      <main className="flex-1">
        <ColombianBirdsExplorer />
      </main>
      <Footer />
    </div>
  )
}
