import type { Metadata } from "next"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { BirdSpeciesExplorer } from "@/components/bird-species-explorer"

export const metadata: Metadata = {
  title: "Discover Colombian Bird Species | Interactive Species Explorer | AVES Colombia",
  description:
    "Explore Colombia's incredible bird diversity with our interactive species explorer. Listen to bird songs, learn about habitats, and create your personalized birding itinerary with expert recommendations.",
  keywords: [
    "Colombian birds",
    "bird species Colombia",
    "bird songs",
    "birding itinerary",
    "bird watching Colombia",
    "Colombian avifauna",
    "bird identification",
    "birding tours Colombia",
    "bird photography",
    "endemic birds Colombia",
    "bird sounds",
    "ornithology Colombia",
    "bird habitat",
    "conservation status",
    "personalized birding",
  ],
  openGraph: {
    title: "Discover Colombian Bird Species | Interactive Explorer",
    description:
      "Explore Colombia's incredible bird diversity with our interactive species explorer. Create your personalized birding itinerary.",
    images: ["/images/aves-logo.png"],
  },
}

export default function BirdSpeciesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      <NavigationHeader currentPage="/species" />
      <BirdSpeciesExplorer />
      <Footer />
    </div>
  )
}
