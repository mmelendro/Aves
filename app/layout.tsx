import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { CookieBanner } from "@/components/cookie-banner"
import { CookieConsentProvider } from "@/components/cookie-consent-manager"
import { CookiePreferenceCenter } from "@/components/cookie-preference-center"
import { MobileNavigationOverlay } from "@/components/mobile-navigation-overlay"
import { AuthProvider } from "@/hooks/use-auth-enhanced"

export const metadata: Metadata = {
  title: {
    default: "AVES Colombia | Authentic Bird Watching & Eco-Tourism Experiences",
    template: "%s | AVES Colombia",
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
  authors: [{ name: "AVES Colombia" }],
  creator: "AVES Colombia",
  publisher: "AVES Colombia",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://aves-colombia.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AVES Colombia | Authentic Bird Watching & Eco-Tourism",
    description:
      "Expert-guided bird watching tours across Colombia's diverse ecosystems. Sustainable travel supporting conservation and local communities.",
    url: "https://aves-colombia.com",
    siteName: "AVES Colombia",
    images: [
      {
        url: "/images/aves-logo.png",
        width: 1200,
        height: 630,
        alt: "AVES Colombia - Bird Watching & Eco-Tourism",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AVES Colombia | Authentic Bird Watching & Eco-Tourism",
    description:
      "Expert-guided bird watching tours across Colombia's diverse ecosystems. Sustainable travel supporting conservation and local communities.",
    images: ["/images/aves-logo.png"],
    creator: "@AVESColombia",
  },
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
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
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
              name: "AVES Colombia",
              description:
                "Expert-guided bird watching and eco-tourism experiences across Colombia's diverse ecosystems",
              url: "https://aves-colombia.com",
              logo: "https://aves-colombia.com/images/aves-logo.png",
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
              sameAs: [
                "https://facebook.com/AVESColombia",
                "https://instagram.com/AVESColombia",
                "https://twitter.com/AVESColombia",
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
