/**
 * Server entry for the owner quote workspace.
 * This page requires sign-in, while the admin API/database additionally require
 * an active owner grant before returning any quote records.
 */

import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { accountUrl } from "@/lib/account-path"
import { AccountShell } from "@/components/account/account-shell"
import { OwnerQuoteInbox } from "@/components/account/owner-quote-inbox"
import { getAccountUser } from "@/lib/account-auth"
export const metadata: Metadata = { title: "Private Quote Inbox" }
/**
 * Require a verified login before rendering the workspace; the inbox API checks the additional owner grant.
 */
export default async function OwnerQuotePage() {
  const user = await getAccountUser()
  if (!user) redirect(accountUrl("/account/sign-in?next=/australia/admin/quotes"))
  return <AccountShell title="Your AVES Quote Inbox" description="Review requests across AVES destinations and prepare personal proposals, quoted in AUD."><OwnerQuoteInbox /></AccountShell>
}
