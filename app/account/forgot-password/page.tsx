import type { Metadata } from "next"
import { AccountShell } from "@/components/account/account-shell"
import { AuthForm } from "@/components/account/auth-form"
export const metadata: Metadata = { title: "Reset Your Password" }
export default function ForgotPasswordPage() {
  return <AccountShell compact title="Return to Your Plans" description="Request a link to reset your AVES account password."><AuthForm mode="forgot-password" /></AccountShell>
}
