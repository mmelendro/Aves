import type { Metadata } from "next"
import DeckClientPage from "./DeckClientPage"

export const metadata: Metadata = {
  title: "Investor Deck - AVES: Colombia's Premier Birding Experience",
  description:
    "Explore AVES investment opportunity presentation. Discover Colombia's premier birding experience with 2,000+ species, 80 endemics, and sustainable eco-tourism.",
  keywords: "AVES, investor deck, birding tours, Colombia, eco-tourism, investment opportunity, sustainable travel",
  openGraph: {
    title: "Investor Deck - AVES: Colombia's Premier Birding Experience",
    description:
      "Explore AVES investment opportunity presentation. Discover Colombia's premier birding experience with 2,000+ species, 80 endemics, and sustainable eco-tourism.",
    type: "website",
    url: "https://aves.com/deck",
    images: [
      {
        url: "/images/aves-logo.png",
        width: 1200,
        height: 630,
        alt: "AVES - Colombia's Premier Birding Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Investor Deck - AVES: Colombia's Premier Birding Experience",
    description:
      "Explore AVES investment opportunity presentation. Discover Colombia's premier birding experience with 2,000+ species, 80 endemics, and sustainable eco-tourism.",
    images: ["/images/aves-logo.png"],
  },
}

export default function DeckPage() {
  return <DeckClientPage />
}
