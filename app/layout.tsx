import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { CookieBanner } from "@/components/cookie-banner"
import { CookieConsentProvider } from "@/components/cookie-consent-manager"
import { CookiePreferenceCenter } from "@/components/cookie-preference-center"

export const metadata: Metadata = {
  title: {
    default: "AVES | Follow the birds",
    template: "%s | AVES",
  },
  description:
    "Explore Colombia and Australia with AVES, and discover our developing New Zealand destination. Birdlife, nature and journeys shaped around you.",
  keywords: [
    "Colombia bird watching",
    "Australia bird watching",
    "birding tours",
    "sustainable tourism",
    "Australian birds",
    "nature photography",
    "conservation travel",
    "Andes birding",
    "Caribbean Coast birds",
    "Amazon birds",
    "hummingbirds Colombia",
    "endemic species",
  ],
  authors: [{ name: "AVES" }],
  creator: "AVES",
  publisher: "AVES",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://aves.bio"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AVES | Follow the birds",
    description:
      "Explore Colombia and Australia, and discover our developing New Zealand destination. Follow the birds with AVES.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://aves.bio",
    siteName: "AVES",
    images: [
      {
        url: "/images/brand/aves-global-bird.png",
        alt: "AVES — Follow the birds",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AVES | Follow the birds",
    description:
      "Explore Colombia and Australia, and discover our developing New Zealand destination. Follow the birds with AVES.",
    images: ["/images/brand/aves-global-bird.png"],
  },
  // TODO: Add real Google Search Console verification code
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <CookieConsentProvider>
          {children}
          <CookiePreferenceCenter />
          <CookieBanner />
        </CookieConsentProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "AVES",
              description:
                "Personally planned birding and nature journeys in Colombia and Australia",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://aves.bio",
              logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://aves.bio"}/images/brand/aves-global-bird.png`,
              contactPoint: {
                "@type": "ContactPoint",
                url: "https://aves.bio/australia/contact?topic=general#inquiry",
                contactType: "customer service",
                availableLanguage: ["English", "Spanish"],
              },
              areaServed: [
                { "@type": "Country", name: "Colombia" },
                { "@type": "Country", name: "Australia" },
              ],
              offers: {
                "@type": "Offer",
                category: "Eco-Tourism",
                description: "Bird watching tours and sustainable travel experiences",
              },
            }),
          }}
        />
      </body>
    </html>
  )
}
