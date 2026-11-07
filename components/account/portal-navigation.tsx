"use client"

import { SiteLink as Link } from "@/components/site-link"
import { BrandMark } from "@/components/brand-mark"
import { MobileNavigationOverlay } from "@/components/mobile-navigation-overlay"

const portalLinks = [
  { href: "/account", label: "My Trips" },
  { href: "https://aves.bio/", label: "All destinations" },
  { href: "https://aves.bio/colombia", label: "Colombia" },
  { href: "https://aves.bio/australia", label: "Australia" },
] as const

export function PortalNavigation({ currentPage }: { currentPage: string }) {
  return <>
    <header className="fixed inset-x-0 top-0 z-50 border-b border-emerald-100 bg-white/95 shadow-sm backdrop-blur-md">
      <a href="#main-content" className="absolute left-4 top-3 z-10 flex min-h-11 -translate-y-24 items-center rounded-xl bg-emerald-800 px-4 font-semibold text-white focus:translate-y-0">Skip to content</a>
      <div className="container mx-auto flex h-[72px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <BrandMark label="Your Account" labelHref="/account" priority />
        <nav aria-label="Account and country navigation" className="hidden items-center gap-2 lg:flex">
          {portalLinks.map(({ href, label }) => <Link key={href} href={href} aria-current={href === "/account" && currentPage === "/account" ? "page" : undefined} className="flex min-h-11 items-center rounded-xl px-4 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700">{label}</Link>)}
          <Link href="/contact?topic=account#inquiry" className="flex min-h-11 items-center rounded-xl bg-emerald-600 px-5 text-sm font-semibold text-white hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2">Contact AVES</Link>
        </nav>
        <MobileNavigationOverlay currentPage={currentPage} links={portalLinks} title="AVES Account" description="Your shared trip plans, with links to the Colombia and Australia websites." callToAction={{ href: "/contact?topic=account#inquiry", label: "Contact AVES" }} />
      </div>
    </header>
    <div aria-hidden="true" className="h-[72px]" />
  </>
}
