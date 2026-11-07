import { BrandMark, type BrandCountry } from "@/components/brand-mark"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { destinations } from "@/content/destinations"

interface GlobalBrandProps {
  country?: BrandCountry
}

export function GlobalHeader({ country }: GlobalBrandProps = {}) {
  return (
    <>
      <a href="#main-content" className="sr-only fixed left-4 top-4 z-[100] rounded-lg bg-white px-5 py-3 font-medium text-emerald-900 shadow-lg focus:not-sr-only">Skip to content</a>
      <header className="sticky top-0 z-40 border-b border-emerald-100 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-2 px-3 sm:gap-3 sm:px-6 lg:px-8">
          <Link href="/" aria-label="AVES home" className="flex shrink-0 items-center gap-2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">
            <BrandMark country={country} priority />
          </Link>
          <nav aria-label="Main navigation" className="flex items-center gap-1 sm:gap-3">
            <a href="/#destinations" className="inline-flex min-h-11 items-center rounded-full px-2 text-[13px] font-medium text-emerald-800 hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700 sm:px-3 sm:text-sm">Destinations</a>
            <a href="/#planning" className="hidden min-h-11 items-center rounded-full px-3 text-sm font-medium text-gray-700 hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700 sm:inline-flex">How it works</a>
            <a href="/australia/account" className="inline-flex min-h-11 items-center whitespace-nowrap rounded-full border border-emerald-200 px-2 text-[13px] font-semibold text-emerald-800 hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 sm:px-5 sm:text-sm">My Trips</a>
          </nav>
        </div>
      </header>
    </>
  )
}

export function GlobalFooter({ country }: GlobalBrandProps = {}) {
  return (
    <footer className="bg-gray-900 py-12 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Link href="/" aria-label="AVES home" className="inline-flex min-h-11 items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"><BrandMark country={country} inverse size="footer" /></Link>
            <p className="mt-4 max-w-xs leading-7">From mountains to ocean.</p>
          </div>
          <nav aria-label="Explore destinations">
            <h2 className="mb-3 font-semibold text-white">Choose your destination</h2>
            <ul>{destinations.map(destination => <li key={destination.id}><a href={destination.href} className="inline-flex min-h-11 items-center gap-2 text-emerald-300 underline-offset-4 hover:underline">{destination.name}<ArrowRight className="h-4 w-4" aria-hidden="true" /></a></li>)}</ul>
          </nav>
          <div>
            <h2 className="mb-3 font-semibold text-white">Keep in touch</h2>
            <a href="/australia/contact?topic=general#inquiry" className="inline-flex min-h-11 items-center text-emerald-300 underline-offset-4 hover:underline">Contact AVES</a>
            <p className="mt-2 text-sm leading-6">Have a trip in mind? Explore a destination and start a conversation with us.</p>
          </div>
        </div>
        <p className="mt-9 max-w-4xl border-t border-gray-700 pt-7 text-sm leading-6 text-gray-300">We recognise the Indigenous peoples of the places we visit and their continuing relationships with lands, waters and communities. We aim to travel with respect, listen to local voices and follow local guidance.</p>
        <div className="mt-7 flex flex-col justify-between gap-5 border-t border-gray-700 pt-7 text-sm md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} AVES. All rights reserved.</p>
          <nav aria-label="Website information" className="flex flex-wrap gap-x-5 gap-y-2">
            {[["Privacy", "/privacy"], ["Terms", "/terms"], ["Cookies", "/cookies"], ["Photo & audio credits", "/credits"], ["Site map", "/site-map"]].map(([label, href]) => <Link key={href} href={href} className="inline-flex min-h-11 items-center underline-offset-4 hover:text-white hover:underline">{label}</Link>)}
          </nav>
        </div>
      </div>
    </footer>
  )
}
