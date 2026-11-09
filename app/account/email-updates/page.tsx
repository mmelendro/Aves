import { redirect } from "next/navigation"
import { AccountShell } from "@/components/account/account-shell"
import { EmailUpdatesPreference } from "@/components/account/email-updates-preference"
import { getAccountUser } from "@/lib/account-auth"
import { accountEntryHref, accountNextFromSearch, type AccountSearchParams } from "@/components/account/account-navigation"
import { isReadOnlyPreview } from "@/lib/deployment-mode"

export const metadata = { title: "Email preferences" }
export default async function EmailUpdatesPage({ searchParams }: { searchParams: Promise<AccountSearchParams> }) {
  const next = accountNextFromSearch(await searchParams)
  const preferencePath = `/account/email-updates?next=${encodeURIComponent(next)}`
  if (!isReadOnlyPreview() && !await getAccountUser()) redirect(accountEntryHref("/account/sign-in", preferencePath))
  return <AccountShell title="Stay connected with AVES" description="Choose which optional news you receive." compact><EmailUpdatesPreference next={next} /></AccountShell>
}
