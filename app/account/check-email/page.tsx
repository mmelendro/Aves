import type { Metadata } from "next"
import { AccountShell } from "@/components/account/account-shell"
import { CheckEmail } from "@/components/account/auth-form"
export const metadata: Metadata = { title: "Check Your Email" }
export default function CheckEmailPage() {
  return <AccountShell compact title="One More Step" description="Confirm your email to start saving your Australian trip plans."><CheckEmail /></AccountShell>
}
