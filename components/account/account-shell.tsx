"use client"
import {useUiCopy} from "@/components/ui-copy-context"
import {UiLanguageToggle} from "@/components/ui-language"
/**
 * Shared visual frame for account pages: heading, navigation, and content width.
 * This client-rendered visual shell does not authorize access; pages and APIs do that separately.
 */

import type { ReactNode } from "react"
import { GlobalFooter } from "@/components/global-navigation"
import { PortalNavigation } from "@/components/account/portal-navigation"
import { PageIntroduction } from "@/components/page-introduction"

/**
 * Wrap supplied content with a shared title/description; compact narrows form pages only.
 */
export function AccountShell({ title, description, children, compact = false, privateTitle = false }: { title: string; description: string; children: ReactNode; compact?: boolean; privateTitle?: boolean }) {
  const uiCopy=useUiCopy()
  const footer = <GlobalFooter country="global" navigationGroups={[{
    label: uiCopy("One AVES account. All your journeys."),
    links: [
      { href: "/account", label: uiCopy("My Trips") },
      { href: "/account/email-updates", label: uiCopy("Manage optional email updates") },
      { href: "/contact?topic=account#inquiry", label: uiCopy("Contact AVES") },
    ],
  }]} />
  // Account screens do not need the public map/gallery shell. Importing that
  // shell here made its explorer client code an initial dependency of sign-in.
  return <div className="min-h-screen bg-white">
    <PortalNavigation currentPage="/account" /><UiLanguageToggle/>
    <main id="main-content" tabIndex={-1}>
    <PageIntroduction title={privateTitle?title:uiCopy(title)} description={description?uiCopy(description):description} eyebrow={uiCopy("Your AVES Account")} />
    <section className="bg-gradient-to-br from-emerald-50 to-blue-50 py-8 sm:py-10 lg:py-12">
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${compact ? "max-w-xl" : "max-w-7xl"}`}>{children}<p className="mt-8 text-sm"><a href="/account/email-updates" className="text-emerald-800 underline">{uiCopy("Manage optional email updates")}</a></p></div>
    </section>
    </main>
    {footer}
  </div>
}
