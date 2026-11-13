"use client"

/**
 * Browser navigation for the shared account portal and public destinations.
 * Showing a link does not grant access to its destination; private APIs enforce it.
 */

import {useUiCopy} from "@/components/ui-language"
import { NewZealandHeader } from "@/components/new-zealand-header"

const portalLinks = [
  { href: "/account", label: "My Trips" },
  { href: "https://aves.bio/", label: "All destinations" },
  { href: "https://aves.bio/colombia", label: "Colombia" },
  { href: "https://aves.bio/australia", label: "Australia" },
  { href: "https://aves.bio/new-zealand", label: "New Zealand" },
  { href: "/contact?topic=account#inquiry", label: "Contact AVES" },
] as const

/**
 * Render shared account/country links and highlight currentPage; the overlay manages its mobile menu state.
 */
export function PortalNavigation({ currentPage }: { currentPage: string }) {
  const uiCopy=useUiCopy()
  return <NewZealandHeader country="global" surface="account" currentPage={currentPage} navigationLinks={portalLinks.map(link=>({...link,label:uiCopy(link.label)}))} />
}
