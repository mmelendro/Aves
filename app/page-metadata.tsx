import type { Metadata } from "next"

export const homePageMetadata: Metadata = {
  title: "AVES Colombia | Premium Bird Watching Tours & Eco-Tourism Experiences",
  description:
    "Discover Colombia's 1,900+ bird species with expert-guided tours. B Corp certified eco-tourism supporting conservation and local communities. Small groups, premium accommodations, carbon-neutral expeditions.",
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
    "B Corp certified tours",
    "carbon neutral travel",
    "small group tours",
    "premium eco-lodges",
  ],
  openGraph: {
    title: "AVES Colombia | Premium Bird Watching & Eco-Tourism",
    description:
      "Expert-guided bird watching tours across Colombia's diverse ecosystems. B Corp certified, carbon-neutral expeditions supporting conservation and local communities.",
    url: "https://aves-colombia.com",
    siteName: "AVES Colombia",
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
    title: "AVES Colombia | Premium Bird Watching & Eco-Tourism",
    description:
      "Discover Colombia's 1,900+ bird species with B Corp certified, carbon-neutral tours supporting conservation.",
    images: ["/images/cardinal-guajiro.jpg"],
    creator: "@AVESColombia",
  },
  alternates: {
    canonical: "https://aves-colombia.com",
  },
}
