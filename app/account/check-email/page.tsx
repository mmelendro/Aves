import type { Metadata } from "next"
import { AccountShell } from "@/components/account/account-shell"
import { CheckEmail } from "@/components/account/auth-form"
import { accountNextFromSearch, type AccountSearchParams } from "@/components/account/account-navigation"
export const metadata: Metadata = { title: "Check Your Email" }
export default async function CheckEmailPage({ searchParams }: { searchParams: Promise<AccountSearchParams> }) {
  const next = accountNextFromSearch(await searchParams)
  return <AccountShell compact title="One More Step" description="Confirm your email to start saving trip plans for Colombia and Australia."><CheckEmail next={next} /></AccountShell>
}
