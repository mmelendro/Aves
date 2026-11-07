/**
 * Compatibility fallback for an old/local account URL. It redirects to the shared
 * account helper rather than implementing a second customer system. On production,
 * middleware handles the canonical /account paths before these pages are reached;
 * read middleware.ts and lib/shared-account before changing account routing.
 */
import { redirect } from "next/navigation"
import { sharedAccountHref } from "@/lib/shared-account"

export default function LegacyDashboardPage() {
  redirect(sharedAccountHref())
}
