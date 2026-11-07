import type { Metadata } from "next"
import { AccountShell } from "@/components/account/account-shell"
import { AuthForm } from "@/components/account/auth-form"
import { accountNextFromSearch, type AccountSearchParams } from "@/components/account/account-navigation"
import { configuredOAuthProviders } from "@/lib/oauth-providers"
export const metadata: Metadata = { title: "Create an Account" }
export default async function SignUpPage({ searchParams }: { searchParams: Promise<AccountSearchParams> }) {
  const next = accountNextFromSearch(await searchParams)
  return <AccountShell compact title="Keep Your Travel Ideas Together" description="Create one AVES account for Colombia and Australia trip plans and personal quotes."><AuthForm mode="sign-up" next={next} oauthProviders={configuredOAuthProviders()} /></AccountShell>
}
