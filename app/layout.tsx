import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import "../styles/mobile-navigation.css"
import { CookieBanner } from "@/components/cookie-banner"
import { CookieConsentProvider } from "@/components/cookie-consent-manager"
import { CookiePreferenceCenter } from "@/components/cookie-preference-center"
import { MobileNavigationOverlay } from "@/components/mobile-navigation-overlay"
import { AuthProvider } from "@/hooks/use-auth-enhanced"

export const metadata: Metadata = {
  title: {
    default: "AVES Tours | Authentic Bird Watching & Eco-Tourism Experiences",
    template: "%s | AVES Tours",
  },
  description:
    "Discover Colombia's incredible biodiversity with AVES. Expert-guided bird watching tours across the Caribbean Coast, Andes, and Amazon. Sustainable eco-tourism supporting local communities and conservation.",
  keywords: [
    "Colombia bird watching",
    "eco-tourism Colombia",
    "birding tours",
    "sustainable tourism",
    "Colombian birds",
    "nature photography",
    "conservation travel",
    "indigenous communities",
    "Andes birding",
    "Caribbean Coast birds",
    "Amazon birds",
    "hummingbirds Colombia",
    "endemic species",
  ],
  authors: [{ name: "AVES Tours" }],
  creator: "AVES Tours",
  publisher: "AVES Tours",
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
    title: "AVES Tours | Authentic Bird Watching & Eco-Tourism",
    description:
      "Expert-guided bird watching tours across Colombia's diverse ecosystems. Sustainable travel supporting conservation and local communities.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://aves.bio",
    siteName: "AVES Tours",
    images: [
      {
        url: "/images/aves-logo.png",
        width: 1200,
        height: 630,
        alt: "AVES Tours - Bird Watching & Eco-Tourism",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AVES Tours | Authentic Bird Watching & Eco-Tourism",
    description:
      "Expert-guided bird watching tours across Colombia's diverse ecosystems. Sustainable travel supporting conservation and local communities.",
    images: ["/images/aves-logo.png"],
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
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CookieConsentProvider>
            {children}
            <CookiePreferenceCenter />
            <CookieBanner />
            <MobileNavigationOverlay />
          </CookieConsentProvider>
        </AuthProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "AVES Tours",
              description:
                "Expert-guided bird watching and eco-tourism experiences across Colombia's diverse ecosystems",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://aves.bio",
              logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://aves.bio"}/images/aves-logo.png`,
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+57-XXX-XXX-XXXX",
                contactType: "customer service",
                availableLanguage: ["English", "Spanish"],
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "CO",
                addressRegion: "Colombia",
              },
              sameAs: [],
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
