import type { Metadata } from "next"
import { AccountShell } from "@/components/account/account-shell"
import { AuthForm } from "@/components/account/auth-form"
export const metadata: Metadata = { title: "Choose a New Password" }
export default function ResetPasswordPage() {
  return <AccountShell compact title="A Fresh Start" description="Choose a new password for your AVES account."><AuthForm mode="reset-password" /></AccountShell>
}
