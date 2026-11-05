import type { Metadata } from "next"
import "./globals.css"
import { CookieBanner } from "@/components/cookie-banner"
import { CookieConsentProvider } from "@/components/cookie-consent-manager"
import { CookiePreferenceCenter } from "@/components/cookie-preference-center"
import { canonicalUrl } from "@/lib/site-path"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

export const metadata: Metadata = {
  metadataBase: new URL(new URL(canonicalUrl()).origin),
  alternates: { canonical: canonicalUrl() },
  title: { default: "AVES Australia — Follow the birds", template: "%s | AVES Australia" },
  description: "A new Australian chapter for AVES. Explore birding and nature inspiration, plan a custom journey, or join our launch list.",
  robots: { index: process.env.VERCEL_ENV === "production" && Boolean(siteUrl), follow: true },
  openGraph: { title: "AVES Australia — Follow the birds", description: "Birding. Nature. A little more wonder.", type: "website", locale: "en_AU", siteName: "AVES Australia" },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-AU"><body><CookieConsentProvider>{children}<CookiePreferenceCenter /><CookieBanner /></CookieConsentProvider></body></html>
}
