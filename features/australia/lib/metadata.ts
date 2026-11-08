import type { Metadata } from "next"

/** Keep each country page's search title, canonical and social preview in agreement. */
export function australiaMetadata(metadata: Metadata): Metadata {
  const title = typeof metadata.title === "string" ? `${metadata.title} | AVES Australia` : "AVES Australia"
  const description = typeof metadata.description === "string" ? metadata.description : "Explore Australian birds and regions, then discuss a personal nature journey with AVES."
  const url = metadata.alternates?.canonical
  return { ...metadata, description,
    openGraph: { title, description, url: typeof url === "string" ? url : "/australia", siteName: "AVES", locale: "en_AU", type: "website", images: [{ url: "/images/brand/aves-australia-bird.png", alt: "AVES Australia" }], ...metadata.openGraph },
    twitter: { card: "summary_large_image", title, description, images: ["/images/brand/aves-australia-bird.png"], ...metadata.twitter },
  }
}
