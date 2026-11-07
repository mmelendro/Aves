import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { accountUrl } from "@/lib/account-path"
import { AccountShell } from "@/components/account/account-shell"
import { OwnerQuoteInbox } from "@/components/account/owner-quote-inbox"
import { getAccountUser } from "@/lib/account-auth"
export const metadata: Metadata = { title: "Private Quote Inbox" }
export default async function OwnerQuotePage() {
  const user = await getAccountUser()
  if (!user) redirect(accountUrl("/account/sign-in?next=/australia/admin/quotes"))
  return <AccountShell title="Your AVES Quote Inbox" description="Review Colombia and Australia trip requests and prepare personal proposals, quoted in AUD."><OwnerQuoteInbox /></AccountShell>
}
