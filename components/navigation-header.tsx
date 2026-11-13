"use client"

import { NewZealandHeader } from "@/components/new-zealand-header"
import { sharedAccountHref } from "@/lib/shared-account"

const navigationLinks = [
  { href: "/", label: "Destinations" },
  { href: "/aves-explorer", label: "Regions" },
  { href: "/tours", label: "Birding Experiences" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About AVES" },
  { href: sharedAccountHref(), label: "My Trips" },
  { href: "/contact", label: "Plan My Trip" },
  { href: "/site-map", label: "Site Map" },
] as const

/** Shared public shell. Account intent and Colombia-home language choice survive. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Retain currentPage for existing country-page callers; active state comes from the route.
export function NavigationHeader(_props: { currentPage?: string }) {
  return <NewZealandHeader country="colombia" navigationLinks={navigationLinks} />
}
