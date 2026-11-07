import Link from "next/link"
import { BrandMark } from "@/components/brand-mark"

interface FooterProps {
  transparent?: boolean
}

const exploreLinks = [
  { href: "/aves-explorer", label: "Regions" },
  { href: "/tours", label: "Birding Experiences" },
  { href: "/species", label: "Australian Birdlife" },
]

const planningLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/contact", label: "Plan My Trip" },
  { href: "/account", label: "My Trips" },
  { href: "/contact?intent=waitlist", label: "Australian Updates" },
]

const aboutLinks = [
  { href: "/about", label: "About AVES" },
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
  return (
    <footer className={`relative z-10 border-t border-white/10 py-12 text-white sm:py-16 ${transparent ? "bg-gray-900/90 backdrop-blur-lg" : "bg-gray-900/95 backdrop-blur-sm"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" aria-label="AVES Australia home" className="mb-4 inline-flex min-h-11 items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-gray-900">
              <BrandMark country="australia" inverse size="footer" />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-gray-200">
              Birding, nature and custom trip planning across Australia.
            </p>
            <a href="mailto:mmelendro@gmail.com" className={`mt-3 ${linkClassName}`}>
              mmelendro@gmail.com
            </a>
          </div>

          <nav aria-label="Explore Australia">
            <h2 className="mb-3 text-base font-semibold text-emerald-300">Explore Australia</h2>
            <ul>
              {exploreLinks.map(({ href, label }) => <li key={href}><Link href={href} className={linkClassName}>{label}</Link></li>)}
            </ul>
          </nav>

          <nav aria-label="Plan your trip">
            <h2 className="mb-3 text-base font-semibold text-emerald-300">Plan Your Trip</h2>
            <ul>
              {planningLinks.map(({ href, label }) => <li key={href}><Link href={href} className={linkClassName}>{label}</Link></li>)}
            </ul>
          </nav>

          <nav aria-label="About AVES">
            <h2 className="mb-3 text-base font-semibold text-emerald-300">About AVES</h2>
            <ul>
              {aboutLinks.map(({ href, label }) => <li key={href}><Link href={href} className={linkClassName}>{label}</Link></li>)}
              <li><a href="https://aves.bio/colombia" className={linkClassName}>Visit AVES Colombia</a></li>
              <li><a href="https://aves.bio/" className={linkClassName}>All destinations</a></li>
            </ul>
          </nav>
        </div>

        <p className="mt-8 max-w-4xl border-t border-gray-700/70 pt-6 text-sm leading-relaxed text-gray-300">AVES acknowledges Aboriginal and Torres Strait Islander peoples as the Traditional Owners and Custodians of Country throughout Australia. We pay our respects to Elders past and present and recognise their continuing connections to land, waters and community.</p>

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
  )
}
