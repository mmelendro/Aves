import type { Metadata } from "next"

const descriptions: Record<string, string> = {
  "/about": "Learn about AVES Colombia, personal birding journeys and our approach to people, places and responsible travel.",
  "/about/partners": "Learn about AVES's approach to guides and local partners, with trip arrangements discussed before booking.",
  "/blog": "Explore AVES stories about Colombia's birds, habitats and places, with ideas for a personal birding journey.",
  "/conservation": "Read about AVES's approach to conservation, responsible birding and respect for local people and habitats.",
  "/team": "Meet the people developing AVES and learn how a personal conversation helps shape your birding journey.",
  "/privacy": "Read how AVES handles enquiries, account details, private trip plans and your information choices.",
  "/cookies": "Learn about AVES cookie preferences and how to manage optional website storage.",
  "/credits": "Find the creators, original sources and licences for AVES photographs and bird recordings.",
  "/site-map": "Find AVES destinations, region guides, birdlife, planning information and media credits.",
  "/tours": "Explore AVES birding experiences in Colombia and discuss a journey shaped around your interests and pace.",
  "/tours/adventure": "Explore the AVES Adventure collection for birding and nature journeys in Colombia.",
  "/tours/vision": "Explore the AVES Vision collection for birding and photography interests in Colombia.",
  "/tours/elevate": "Explore the AVES Elevate collection and discuss your preferred accommodation, comfort and pace.",
  "/tours/souls": "Explore the AVES Souls collection for couples who want to share birds, nature and time together.",
}

/** Align each public page's search and social identity without changing its established URL or media. */
export function publicMetadata(metadata: Metadata, options: { brand?: string; locale?: string; image?: string } = {}): Metadata {
  const brand = options.brand || "AVES"
  const rawTitle = typeof metadata.title === "string" ? metadata.title : metadata.title && "absolute" in metadata.title ? metadata.title.absolute : brand
  const cleanTitle = rawTitle.replace(/\bAVES Tours\b/g, "AVES")
  const title = /\bAVES\b/.test(cleanTitle) ? cleanTitle : `${cleanTitle} | ${brand}`
  const socialTitle = (value: unknown) => typeof value === "string" ? value.replace(/\bAVES Tours\b/g, "AVES") : title
  const canonical = metadata.alternates?.canonical
  const url = typeof canonical === "string" ? canonical : "https://aves.bio/"
  const path = url.replace(/^https:\/\/aves\.bio/, "").replace(/\/$/, "") || "/"
  const description = metadata.description || descriptions[path] || `${cleanTitle}. Explore information and planning ideas from ${brand}.`
  const images = metadata.openGraph?.images || [{ url: options.image || "/images/brand/aves-global-bird.png", alt: brand }]
  return { ...metadata, title: { absolute: title }, description,
    openGraph: { type: "website", locale: options.locale || "en_US", ...metadata.openGraph, title: socialTitle(metadata.openGraph?.title), description: metadata.openGraph?.description || description, url, siteName: "AVES", images },
    twitter: { card: "summary_large_image", ...metadata.twitter, title: socialTitle(metadata.twitter?.title), description: metadata.twitter?.description || description, images: metadata.twitter?.images || images },
  }
}
