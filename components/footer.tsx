"use client"

import { GlobalFooter } from "@/components/global-navigation"
import { sharedAccountHref } from "@/lib/shared-account"

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

const navigationGroups = [
  { label: "Explore Colombia", links: exploreLinks },
  { label: "Plan Your Trip", links: planningLinks },
  { label: "About AVES", links: aboutLinks },
]

export function Footer({ transparent = false }: { transparent?: boolean }) {
  return <GlobalFooter country="colombia" navigationGroups={navigationGroups} accountHref={sharedAccountHref()} transparent={transparent} />
}
