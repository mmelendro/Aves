import { redirect } from "next/navigation"
import { AccountShell } from "@/components/account/account-shell"
import { EmailUpdatesPreference } from "@/components/account/email-updates-preference"
import { getAccountUser } from "@/lib/account-auth"
import { safeAuthNext } from "@/lib/auth-redirect"
import { accountUrl } from "@/lib/account-path"

export const metadata = { title: "Email preferences" }
export default async function EmailUpdatesPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const next = safeAuthNext((await searchParams).next || "/account")
  const preferencePath = `/account/email-updates?next=${encodeURIComponent(next)}`
  if (!await getAccountUser()) redirect(accountUrl(`/account/sign-in?${new URLSearchParams({ next: preferencePath })}`))
  return <AccountShell title="Stay connected with AVES" description="Choose which optional news you receive." compact><EmailUpdatesPreference next={next} /></AccountShell>
}
