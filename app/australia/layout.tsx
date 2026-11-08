import type { Metadata } from "next"
import type { ReactNode } from "react"
export const metadata: Metadata = {
  title: { default: "Australia Birding & Nature Journeys", template: "%s | AVES Australia" },
  description: "Explore Australian birds, regional guides and nature experiences with AVES. Shape a personal journey around your interests, comfort and pace.",
  alternates: { canonical: "/australia" },
  openGraph: {
    title: "Australia Birding & Nature Journeys | AVES",
    description: "Discover Australia's birdlife and regions, then plan a personal nature journey with AVES.",
    url: "/australia", siteName: "AVES", locale: "en_AU", type: "website",
    images: [{ url: "/images/brand/aves-australia-bird.png", alt: "AVES Australia" }],
  },
  twitter: { card: "summary_large_image", title: "Australia Birding & Nature Journeys | AVES", description: "Discover Australia's birdlife and regions, then plan a personal nature journey with AVES.", images: ["/images/brand/aves-australia-bird.png"] },
}
export default function AustraliaLayout({ children }: { children: ReactNode }) { return children }
