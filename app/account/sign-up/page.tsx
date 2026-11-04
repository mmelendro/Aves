import type { Metadata } from "next"
import { AccountShell } from "@/components/account/account-shell"
import { AuthForm } from "@/components/account/auth-form"
export const metadata: Metadata = { title: "Create an Account" }
export default function SignUpPage() {
  return <AccountShell compact title="Keep Your Australian Ideas Together" description="Create your AVES account to save a trip plan and request a personal quote."><AuthForm mode="sign-up" /></AccountShell>
}
