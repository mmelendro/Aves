/**
 * Shared visual frame for account pages: heading, navigation, and content width.
 * This server component does not authorize access; pages and APIs do that separately.
 */

import type { ReactNode } from "react"
import { GlobalFooter } from "@/components/global-navigation"
import { PageShell } from "@/features/australia/components/page-shell"

/**
 * Wrap supplied content with a shared title/description; compact narrows form pages only.
 */
export function AccountShell({ title, description, children, compact = false }: { title: string; description: string; children: ReactNode; compact?: boolean }) {
  const footer = <GlobalFooter country="global" navigationGroups={[{
    label: "One AVES account. All your journeys.",
    links: [
      { href: "/account", label: "My Trips" },
      { href: "/account/email-updates", label: "Manage optional email updates" },
      { href: "/contact?topic=account#inquiry", label: "Contact AVES" },
    ],
  }]} />
  return <PageShell path="/account" title={title} description={description} eyebrow="Your AVES Account" footer={footer}>
    <section className="bg-gradient-to-br from-emerald-50 to-blue-50 py-8 sm:py-10 lg:py-12">
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${compact ? "max-w-xl" : "max-w-7xl"}`}>{children}<p className="mt-8 text-sm"><a href="/account/email-updates" className="text-emerald-800 underline">Manage optional email updates</a></p></div>
    </section>
  </PageShell>
}
