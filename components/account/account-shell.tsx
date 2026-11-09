/**
 * Shared visual frame for account pages: heading, navigation, and content width.
 * This server component does not authorize access; pages and APIs do that separately.
 */

import type { ReactNode } from "react"
import Link from "next/link"
import { PortalNavigation } from "./portal-navigation"

/**
 * Wrap supplied content with a shared title/description; compact narrows form pages only.
 */
export function AccountShell({ title, description, children, compact = false }: { title: string; description: string; children: ReactNode; compact?: boolean }) {
  const footer = <footer className="border-t border-emerald-100 bg-white py-8"><div className="container mx-auto px-4 sm:px-6 lg:px-8"><p className="font-semibold text-emerald-900 mb-3">One AVES account. All your journeys.</p><nav aria-label="Account footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-emerald-800"><a className="flex min-h-11 items-center underline" href="/">All destinations</a><a className="flex min-h-11 items-center underline" href="/colombia">Colombia</a><a className="flex min-h-11 items-center underline" href="/australia">Australia</a><a className="flex min-h-11 items-center underline" href="/new-zealand">New Zealand</a><Link className="flex min-h-11 items-center underline" href="/privacy">Privacy</Link><Link className="flex min-h-11 items-center underline" href="/terms">Terms</Link><Link className="flex min-h-11 items-center underline" href="/contact?topic=account#inquiry">Contact AVES</Link></nav></div></footer>
  return <div className="min-h-screen bg-white"><PortalNavigation currentPage="/account" />
    <main id="main-content" tabIndex={-1} className="bg-gradient-to-br from-emerald-50 to-blue-50 py-12 lg:py-20">
      <div className={["container mx-auto px-4", compact ? "max-w-xl" : "max-w-7xl"].join(" ")}>
        <h1 className="mb-4 text-3xl font-medium tracking-tight text-emerald-950">{title}</h1>
        <p className="mb-8 text-lg leading-relaxed text-gray-600">{description}</p>
        {children}
        <p className="mt-8 text-sm"><Link href="/account/email-updates" className="text-emerald-800 underline">Manage optional email updates</Link></p>
      </div>
    </main>{footer}</div>
}
