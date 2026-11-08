"use client"

/**
 * Colombia footer. The four link lists below are the editable navigation groups.
 * My Trips points to the shared account service; informational links stay in this app.
 */
import { useColombiaHomeCopy } from "@/components/colombia-home-language"
import { BrandMark } from "@/components/brand-mark"
import Link from "next/link"
import { sharedAccountHref } from "@/lib/shared-account"

interface FooterProps {
  transparent?: boolean
}

const exploreLinks = [
  { href: "/aves-explorer", label: "Regions" },
  { href: "/tours", label: "Birding Experiences" },
  { href: "/species", label: "Colombian Birdlife" },
  { href: "/blog", label: "Birding Blog" },
  { href: "/resources", label: "Birding Resources" },
  { href: "/travel-tips", label: "Travel Tips" },
]

const planningLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/contact", label: "Plan My Trip" },
  { href: "/tours/adventure", label: "Adventure Tours" },
  { href: "/tours/vision", label: "Vision Tours" },
  { href: "/tours/elevate", label: "Elevate Tours" },
  { href: "/tours/souls", label: "Souls Tours" },
]

const aboutLinks = [
  { href: "/about", label: "About AVES" },
  { href: "/team", label: "Our Team" },
  { href: "/about/partners", label: "Our Partners" },
  { href: "/about/b-corp", label: "Our B Corp Journey" },
  { href: "/conservation", label: "Responsible Birding" },
]

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/cookies", label: "Cookies" },
  { href: "/credits", label: "Photo & Sound Credits" },
  { href: "/site-map", label: "Site Map" },
]

const linkClassName = "inline-flex min-h-11 items-center rounded-lg text-sm text-gray-200 transition-colors hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"

export function Footer({ transparent = false }: FooterProps) {
  const localizeHome = useColombiaHomeCopy()

  return localizeHome((
    <footer className={`relative z-10 border-t border-white/10 py-12 text-white sm:py-16 ${transparent ? "bg-gray-900/90 backdrop-blur-lg" : "bg-gray-900/95 backdrop-blur-sm"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="mb-4 inline-flex">
              <BrandMark country="colombia" inverse size="footer" />
            </span>
            <p className="max-w-sm text-sm leading-relaxed text-gray-200">
              Birding, nature and personal journey planning across Colombia.
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-300">Pursuing B Corp certification. AVES is not yet certified.</p>
            <a href="https://aves.bio/australia/contact?topic=general#inquiry" className={`mt-3 ${linkClassName}`}>
              Contact AVES
            </a>
          </div>

          <nav aria-label="Explore Colombia">
            <h2 className="mb-3 text-base font-semibold text-emerald-300">Explore Colombia</h2>
            <ul>
              {exploreLinks.map(({ href, label }) => <li key={href}><Link href={href} className={linkClassName}>{label}</Link></li>)}
            </ul>
          </nav>

          <nav aria-label="Plan your trip">
            <h2 className="mb-3 text-base font-semibold text-emerald-300">Plan Your Trip</h2>
            <ul>
              {planningLinks.map(({ href, label }) => <li key={href}><Link href={href} className={linkClassName}>{label}</Link></li>)}
              <li><a href={sharedAccountHref()} className={linkClassName}>My Trips</a></li>
            </ul>
          </nav>

          <nav aria-label="About AVES">
            <h2 className="mb-3 text-base font-semibold text-emerald-300">About AVES</h2>
            <ul>
              {aboutLinks.map(({ href, label }) => <li key={href}><Link href={href} className={linkClassName}>{label}</Link></li>)}
              <li><Link href="/" className={linkClassName}>All AVES Destinations</Link></li>
              <li><a href="https://aves.bio/australia" className={linkClassName}>Visit AVES Australia</a></li>
            </ul>
          </nav>
        </div>

        <p className="mt-8 max-w-4xl border-t border-gray-700/70 pt-6 text-sm leading-relaxed text-gray-300">We recognise Colombia’s Indigenous peoples and Afro-descendant communities and their enduring relationships with their territories, waters and cultural heritage. We aim to listen to local voices, respect community decisions and follow local guidance wherever we travel.</p>

        <div className="mt-8 flex flex-col gap-4 border-t border-gray-700/70 pt-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm text-gray-300">© 2026 AVES. All rights reserved.</p>
          <nav aria-label="Website information">
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {legalLinks.map(({ href, label }) => <li key={href}><Link href={href} className={linkClassName}>{label}</Link></li>)}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  ))
}
