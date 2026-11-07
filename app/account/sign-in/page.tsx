/**
 * Server-rendered account entry screen.
 * Render sign-in with a safe return path and the server-approved provider buttons.
 * This page supplies presentation; Auth operations live in components/account/auth-form.tsx.
 */

import type { Metadata } from "next"
import { AccountShell } from "@/components/account/account-shell"
import { AuthForm } from "@/components/account/auth-form"
import { accountNextFromSearch, type AccountSearchParams } from "@/components/account/account-navigation"
import { configuredOAuthProviders } from "@/lib/oauth-providers"
export const metadata: Metadata = { title: "Sign In" }
/**
 * Render sign-in with a safe return path and the server-approved provider buttons.
 */
export default async function SignInPage({ searchParams }: { searchParams: Promise<AccountSearchParams> }) {
  const next = accountNextFromSearch(await searchParams)
  return <AccountShell compact title="Your AVES Journey Starts Here" description="Return to your saved ideas, trip plans and conversations for Colombia and Australia."><AuthForm mode="sign-in" next={next} oauthProviders={configuredOAuthProviders()} /></AccountShell>
}
