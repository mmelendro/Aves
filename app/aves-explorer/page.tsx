import type { Metadata } from "next"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { ColombianBirdsExplorer } from "@/components/colombian-birds-explorer"

export const metadata: Metadata = {
  title: "Explore Colombia | Interactive Colombian Birds & Bioregions Guide | AVES Colombia",
  description:
    "Discover Colombia's incredible bird diversity with our interactive Explore Colombia tool. Navigate through 11 bioregions and 31 ecoregions, explore over 1,900 species, and plan your perfect birding adventure with expert insights.",
  keywords: [
    "Explore Colombia",
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
    "Explore Colombia tool",
    "explore Colombian birds",
    "Colombia birding map",
  ],
  openGraph: {
    title: "Explore Colombia | Interactive Colombian Birds Guide",
    description:
      "Discover Colombia's incredible bird diversity with our interactive Explore Colombia tool. Navigate through 11 bioregions, explore over 1,900 species, and plan your perfect birding adventure.",
    images: ["/images/aves-logo.png"],
  },
}

export default function AVESExplorerPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader currentPage="/aves-explorer" />
      <ColombianBirdsExplorer />
      <Footer />
    </div>
  )
}
