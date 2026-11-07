import type { Metadata } from "next"
import type { ReactNode } from "react"

export const dynamic = "force-dynamic"
export const metadata: Metadata = { title: { default: "AVES Account", template: "%s | AVES" }, description: "One AVES account for your trip plans and personal proposals.", robots: { index: false, follow: false } }

export default function AccountLayout({ children }: { children: ReactNode }) {
  return children
}
