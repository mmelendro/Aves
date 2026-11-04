import type { Metadata } from "next"
import { AccountShell } from "@/components/account/account-shell"
import { AuthForm } from "@/components/account/auth-form"
export const metadata: Metadata = { title: "Sign In" }
export default function SignInPage() {
  return <AccountShell compact title="Your Australian Journey Starts Here" description="Return to your saved ideas, trip plans and conversations with AVES."><AuthForm mode="sign-in" /></AccountShell>
}
