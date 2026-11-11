import { GlobalFooter } from "@/components/global-navigation"
import { sitePath } from "@/features/australia/lib/site-path"

// Edit these arrays to change each navigation group; the rendering below stays shared and consistent.
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

// One renderer controls spacing, type, legal links and destination navigation site-wide.
const navigationGroups = [
  { label: "Explore Australia", links: exploreLinks },
  { label: "Plan your trip", links: planningLinks },
  { label: "About AVES", links: aboutLinks },
].map(group => ({ ...group, links: group.links.map(link => ({ ...link, href: link.href === "/account" ? "/account" : sitePath(link.href) })) }))

export function Footer({ transparent = false }: { transparent?: boolean }) {
  return <GlobalFooter country="australia" navigationGroups={navigationGroups} transparent={transparent} />
}
