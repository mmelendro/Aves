import Image from "next/image"
import Link from "next/link"

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
]

const linkClassName = "inline-flex min-h-11 items-center rounded-lg text-sm text-gray-200 transition-colors hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"

export function Footer({ transparent = false }: FooterProps) {
  return (
    <footer className={`relative z-10 border-t border-white/10 py-12 text-white sm:py-16 ${transparent ? "bg-gray-900/90 backdrop-blur-lg" : "bg-gray-900/95 backdrop-blur-sm"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" aria-label="AVES Colombia home" className="mb-4 inline-flex min-h-11 items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-4 focus-visible:ring-offset-gray-900">
              <Image src="/images/aves-logo.png" alt="" width={56} height={56} className="h-14 w-14 rounded-xl bg-white object-contain p-1" />
              <span className="text-lg font-semibold text-emerald-300">AVES Colombia</span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-gray-200">
              Birding, nature and personal journey planning across Colombia.
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-300">Pursuing B Corp certification. AVES is not yet certified.</p>
            <a href="mailto:mmelendro@gmail.com" className={`mt-3 ${linkClassName}`}>
              mmelendro@gmail.com
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
            </ul>
          </nav>

          <nav aria-label="About AVES">
            <h2 className="mb-3 text-base font-semibold text-emerald-300">About AVES</h2>
            <ul>
              {aboutLinks.map(({ href, label }) => <li key={href}><Link href={href} className={linkClassName}>{label}</Link></li>)}
              <li><a href="https://aves.bio/australia" className={linkClassName}>Visit AVES Australia</a></li>
            </ul>
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-gray-700/70 pt-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm text-gray-300">© 2026 AVES. All rights reserved.</p>
          <nav aria-label="Legal information and credits">
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {legalLinks.map(({ href, label }) => <li key={href}><Link href={href} className={linkClassName}>{label}</Link></li>)}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
