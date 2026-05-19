import type { Metadata } from "next"

export const homePageMetadata: Metadata = {
  title: "AVES Tours | Premium Bird Watching Tours & Eco-Tourism Experiences",
  description:
    "Discover Colombia's 1,900+ bird species with expert-guided tours. Eco-tourism supporting conservation and local communities. Small groups, premium accommodations, carbon-neutral expeditions.",
  keywords: [
    "Colombia bird watching tours",
    "eco-tourism Colombia",
    "birding expeditions",
    "sustainable tourism",
    "Colombian endemic birds",
    "nature photography tours",
    "conservation travel",
    "indigenous communities",
    "Andes birding",
    "Caribbean Coast birds",
    "Amazon rainforest birds",
    "hummingbirds Colombia",
    "carbon neutral travel",
    "small group tours",
    "premium eco-lodges",
  ],
  openGraph: {
    title: "AVES Tours | Premium Bird Watching & Eco-Tourism",
    description:
      "Expert-guided bird watching tours across Colombia's diverse ecosystems. Carbon-neutral expeditions supporting conservation and local communities.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://aves.bio",
    siteName: "AVES Tours",
    images: [
      {
        url: "/images/cardinal-guajiro.jpg",
        width: 1200,
        height: 630,
        alt: "Vermilion Cardinal - Endemic Colombian bird representing AVES eco-tourism",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AVES Tours | Premium Bird Watching & Eco-Tourism",
    description:
      "Discover Colombia's 1,900+ bird species with carbon-neutral tours supporting conservation.",
    images: ["/images/cardinal-guajiro.jpg"],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://aves.bio",
  },
}
