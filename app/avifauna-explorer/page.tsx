import type { Metadata } from "next"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { ColombianBirdsExplorer } from "@/components/colombian-birds-explorer"

export const metadata: Metadata = {
  title: "Explore Colombian Birds | Interactive Bioregions & Species Guide | AVES Colombia",
  description:
    "Discover Colombia's incredible bird diversity across 11 bioregions and 31 ecoregions. Interactive maps, species guides, and expert insights into the world's most biodiverse country for birds.",
  keywords: [
    "Colombian birds",
    "Colombia bird diversity",
    "Colombian bioregions",
    "bird watching Colombia",
    "Colombian avifauna",
    "endemic birds Colombia",
    "birding Colombia",
    "Colombia bird guide",
    "interactive bird explorer",
    "Colombian biodiversity",
    "AVES Colombia tours",
    "birding tours Colombia",
    "Colombian ecoregions",
    "bird identification Colombia",
    "Colombia geography birding",
  ],
  openGraph: {
    title: "Explore Colombian Birds | Interactive Guide",
    description:
      "Discover Colombia's incredible bird diversity across 11 bioregions. Interactive maps, species guides, and expert insights.",
    images: ["/images/aves-logo.png"],
  },
}

export default function ExploreColombianBirdsPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader currentPage="/avifauna-explorer" />
      <ColombianBirdsExplorer />
      <Footer />
    </div>
  )
}
