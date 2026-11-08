import type { Metadata } from "next"
import { canonicalUrl } from "@/lib/site-path"
import ColombiaHomePage from "@/components/colombia-home-page"

export const metadata: Metadata = {
  title: { absolute: "AVES Colombia | Birdwatching Journeys" },
  description: "Explore Colombia's regions and birdlife, listen to bird calls and plan a personal birdwatching journey with AVES.",
  alternates: { canonical: canonicalUrl("/colombia") },
  openGraph: {
    title: "AVES Colombia | Birdwatching Journeys",
    description: "Explore Colombia's regions and birdlife, and shape a personal birdwatching journey with AVES.",
    url: canonicalUrl("/colombia"),
  },
  twitter: {
    card: "summary_large_image",
    title: "AVES Colombia | Birdwatching Journeys",
    description: "Explore Colombia's regions and birdlife, and shape a personal birdwatching journey with AVES.",
    images: ["/images/green-bearded-helmetcrest.png"],
  },
}

/** Keep metadata server-rendered; build the translated copy tree in one client boundary. */
export default function ColombiaPage() {
  return <ColombiaHomePage />
}
