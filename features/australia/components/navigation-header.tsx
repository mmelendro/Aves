"use client"

import { usePathname } from "next/navigation"
import { NewZealandHeader } from "@/components/new-zealand-header"
import { PortalNavigation } from "@/components/account/portal-navigation"
import { SITE_BASE_PATH } from "@/features/australia/lib/site-path"

// Fully qualified public routes bypass the legacy Australian Link prefix adapter.
const navigationLinks = [
  { href: "/", label: "All destinations" },
  { href: "/australia/aves-explorer", label: "Regions" },
  { href: "/australia/tours", label: "Birding experiences" },
  { href: "/australia/how-it-works", label: "How it works" },
  { href: "/australia/about", label: "About AVES" },
  { href: "/account", label: "My Trips" },
  { href: "/australia/contact", label: "Plan your trip" },
  { href: "/site-map", label: "Site map" },
] as const

export function NavigationHeader({ currentPage }: { currentPage?: string }) {
  const rawPath = usePathname() || currentPage || "/"
  const activePath = rawPath === SITE_BASE_PATH ? "/" : rawPath.startsWith(SITE_BASE_PATH + "/") ? rawPath.slice(SITE_BASE_PATH.length) : rawPath
  // Display routing only. Authentication and authorisation remain in the portal/API.
  if (["/account", "/admin", "/auth"].some(path => activePath === path || activePath.startsWith(path + "/"))) {
    return <PortalNavigation currentPage={activePath} />
  }
  return <NewZealandHeader country="australia" navigationLinks={navigationLinks} />
}
