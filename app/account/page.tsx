/**
 * Server entry for the shared My Trips page at the public /account URL.
 * Verify the user before rendering their email/workspace. Country/region query
 * parameters may prefill a draft; they do not load another person's trip.
 */

import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { accountUrl } from "@/lib/account-path"
import { AccountShell } from "@/components/account/account-shell"
import { AccountDashboard } from "@/components/account/account-dashboard"
import { getAccountUser } from "@/lib/account-auth"
import { accountEntryHref, type AccountSearchParams } from "@/components/account/account-navigation"
import { accountPlanPath, planIntentFromSearch } from "@/components/account/plan-intent"

export const metadata: Metadata = { title: "My Trip Plans" }
/**
 * Resolve safe plan intent, verify the visitor, then render the dashboard or redirect to sign-in.
 */
export default async function AccountPage({ searchParams }: { searchParams: Promise<AccountSearchParams> }) {
  const initialPlan = planIntentFromSearch(await searchParams)
  const user = await getAccountUser()
  if (!user) redirect(accountEntryHref("/account/sign-in", accountPlanPath(initialPlan)))
  return <AccountShell title="Your AVES Journeys, Taking Shape" description="Keep your destination ideas together. Save and review a private draft, then share it with AVES when ready. New Zealand is available for planning only."><AccountDashboard key={accountPlanPath(initialPlan)} email={user.email || ""} initialPlan={initialPlan} /></AccountShell>
}
