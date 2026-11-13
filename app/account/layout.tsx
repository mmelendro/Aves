/**
 * Request-rendered account layout with no-index metadata for private screens.
 * Dynamic rendering and search-engine instructions are not authorization. Pages and
 * API handlers still verify the user before returning personal data.
 */

import {UiLanguageProvider} from "@/components/ui-language"
import type { Metadata } from "next"
import type { ReactNode } from "react"

export const dynamic = "force-dynamic"
export const metadata: Metadata = { title: { default: "AVES Account", template: "%s | AVES" }, description: "One AVES account for your trip plans and personal proposals.", robots: { index: false, follow: false } }

/**
 * Pass nested account screens through; authentication happens in the page/API, not in this wrapper.
 */
export default function AccountLayout({ children }: { children: ReactNode }) {
  return <UiLanguageProvider scope="account">{children}</UiLanguageProvider>
}
