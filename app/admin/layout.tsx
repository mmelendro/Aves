/**
 * Request-rendered owner-area layout with no-index metadata.
 * No-index is a search-engine hint, not a permission check; admin APIs/database
 * functions enforce the owner grant on every protected operation.
 */

import type { Metadata } from "next"
import type { ReactNode } from "react"
export const dynamic = "force-dynamic"
export const metadata: Metadata = { title: { default: "AVES Owner Workspace", template: "%s | AVES" }, robots: { index: false, follow: false } }
/**
 * Pass nested owner screens through; sensitive data is separately authorized by admin APIs.
 */
export default function AdminLayout({ children }: { children: ReactNode }) { return children }
