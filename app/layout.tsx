/**
 * The shared document around every route in this Next.js app. Page content arrives as children.
 * Default search/social metadata lives here; individual routes can override it.
 * The cookie provider shares preferences with the banner and preference dialog.
 */
import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { MapBackgroundProvider } from "@/components/map-background-context"
import { PreviewModeProvider } from "@/components/preview-mode"
import { isReadOnlyPreview } from "@/lib/deployment-mode"
import { HeaderLandscapeProvider } from "@/components/header-landscape-context"
import { publicNavigationPaths } from "@/lib/public-navigation"
import { BirdFilterProvider } from "@/components/bird-filter-context"
import { AvesMediaProvider } from "@/components/aves-media-provider"
import { CookieBanner } from "@/components/cookie-banner"
import { CookieConsentProvider } from "@/components/cookie-consent-manager"
import { CookiePreferenceCenter } from "@/components/cookie-preference-center"
import {MediaPreferencesProvider} from "@/components/media-preferences"

// Search-engine and link-preview information; this object is not visible page copy.
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
  metadataBase: new URL("https://aves.bio"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AVES | Follow the birds",
    description:
      "Explore Colombia and Australia, and discover our developing New Zealand destination. Follow the birds with AVES.",
    url: "https://aves.bio",
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
  robots: {
    index: !isReadOnlyPreview(),
    follow: !isReadOnlyPreview(),
    googleBot: {
      index: !isReadOnlyPreview(),
      follow: !isReadOnlyPreview(),
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
        <PreviewModeProvider readOnly={isReadOnlyPreview()}>
          <CookieConsentProvider>
            <MediaPreferencesProvider><MapBackgroundProvider><BirdFilterProvider><HeaderLandscapeProvider><AvesMediaProvider navigationPaths={publicNavigationPaths}>{children}</AvesMediaProvider></HeaderLandscapeProvider></BirdFilterProvider></MapBackgroundProvider></MediaPreferencesProvider>
            <CookiePreferenceCenter />
            <CookieBanner />
          </CookieConsentProvider>
        </PreviewModeProvider>
        {/* Structured organization data for search tools. Keep claims aligned with verified public copy. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "AVES",
              description:
                "Personally planned birding and nature journeys in Colombia and Australia",
              url: "https://aves.bio",
              logo: "https://aves.bio/images/brand/aves-global-bird.png",
              contactPoint: {
                "@type": "ContactPoint",
                url: "https://aves.bio/contact?topic=general#inquiry",
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
