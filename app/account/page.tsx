import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { AccountShell } from "@/components/account/account-shell"
import { AccountDashboard } from "@/components/account/account-dashboard"
import { getAccountUser } from "@/lib/account-auth"
import { accountEntryHref, type AccountSearchParams } from "@/components/account/account-navigation"
import { accountPlanPath, planIntentFromSearch } from "@/components/account/plan-intent"

export const metadata: Metadata = { title: "My Trip Plans" }
export default async function AccountPage({ searchParams }: { searchParams: Promise<AccountSearchParams> }) {
  const initialPlan = planIntentFromSearch(await searchParams)
  const user = await getAccountUser()
  if (!user) redirect(accountEntryHref("/account/sign-in", accountPlanPath(initialPlan)))
  return <AccountShell title="Your AVES Journeys, Taking Shape" description="Keep Colombia and Australia ideas together, refine a trip plan and request a personal quote when you're ready."><AccountDashboard key={accountPlanPath(initialPlan)} email={user.email || ""} initialPlan={initialPlan} /></AccountShell>
}
