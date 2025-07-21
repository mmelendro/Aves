"use client"

import type React from "react"
import "./globals.css"
import "../styles/mobile-navigation.css"
import { CookieBanner } from "@/components/cookie-banner"
import { CookieConsentProvider } from "@/components/cookie-consent-manager"
import { CookiePreferenceCenter } from "@/components/cookie-preference-center"
import { MobileNavigationOverlay } from "@/components/mobile-navigation-overlay"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState } from "react"

function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            retry: 1,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default function ClientRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <CookieConsentProvider>
            {children}
            <CookiePreferenceCenter />
            <CookieBanner />
            <MobileNavigationOverlay />
          </CookieConsentProvider>
        </QueryProvider>
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
