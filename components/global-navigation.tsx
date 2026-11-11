/**
 * Header and footer for the global landing page and New Zealand pages.
 * Passing country changes the logo subtitle, while My Trips remains one shared account.
 * Destination links come from content/destinations rather than a second hard-coded list.
 */
import { BrandMark, type BrandCountry } from "@/components/brand-mark"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { destinations } from "@/content/destinations"
import { NewZealandHeader } from "@/components/new-zealand-header"

interface GlobalBrandProps {
  country?: BrandCountry | "global"
}

export function GlobalHeader({ country }: GlobalBrandProps = {}) {
  return <NewZealandHeader country={country ?? "global"} />
}

export interface FooterNavigationGroup {
  label: string
  links: readonly { href: string; label: string }[]
}

export function GlobalFooter({ country, navigationGroups = [], transparent = false }: GlobalBrandProps & { navigationGroups?: readonly FooterNavigationGroup[]; transparent?: boolean } = {}) {
  return (
    <footer className={`${transparent ? "bg-gray-900/90 backdrop-blur-lg" : "bg-gray-900"} py-12 text-gray-300`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <BrandMark country={country} inverse size="footer" />
            <p className="mt-4 max-w-xs leading-7">From mountains to ocean.</p>
          </div>
          <nav aria-label="Explore destinations">
            <h2 className="mb-3 font-semibold text-white">Choose your destination</h2>
            <a href="/" className="inline-flex min-h-11 items-center text-emerald-300 underline-offset-4 hover:underline">All destinations</a>
            <ul>{destinations.map(destination => <li key={destination.id}><a href={destination.href} className="inline-flex min-h-11 items-center gap-2 text-emerald-300 underline-offset-4 hover:underline">{destination.name}<ArrowRight className="h-4 w-4" aria-hidden="true" /></a></li>)}</ul>
          </nav>
          <div>
            <h2 className="mb-3 font-semibold text-white">Keep in touch</h2>
            <a href="/australia/contact?topic=general#inquiry" className="inline-flex min-h-11 items-center text-emerald-300 underline-offset-4 hover:underline">Contact AVES</a>
            <a href="/account" className="ml-5 inline-flex min-h-11 items-center text-emerald-300 underline-offset-4 hover:underline">My Trips</a>
            <p className="mt-2 text-sm leading-6">Have a trip in mind? Explore a destination and start a conversation with us.</p>
          </div>
        </div>
        {navigationGroups.length > 0 && <div className="mt-8 grid gap-6 border-t border-gray-700 pt-7 sm:grid-cols-3">
          {navigationGroups.map(group => <nav key={group.label} aria-label={group.label}>
            <h2 className="mb-3 font-semibold text-white">{group.label}</h2>
            <ul>{group.links.map(link => <li key={link.href}><a href={link.href} className="inline-flex min-h-11 items-center text-sm text-emerald-300 underline-offset-4 hover:underline">{link.label}</a></li>)}</ul>
          </nav>)}
        </div>}
        <p className="mt-9 max-w-4xl border-t border-gray-700 pt-7 text-sm leading-6 text-gray-300">{country === "australia" ? "AVES acknowledges Aboriginal and Torres Strait Islander peoples as the Traditional Owners and Custodians of Country throughout Australia. We pay our respects to Elders past and present and recognise their continuing connections to land, waters and community." : "We recognise the Indigenous peoples of the places we visit and their continuing relationships with lands, waters and communities. We aim to travel with respect, listen to local voices and follow local guidance."}</p>
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
