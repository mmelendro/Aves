/**
 * Server-rendered account entry screen.
 * Render the public reset-link request form; it does not reveal whether an email is registered.
 * This page supplies presentation; Auth operations live in components/account/auth-form.tsx.
 */

import type { Metadata } from "next"
import { AccountShell } from "@/components/account/account-shell"
import { AuthForm } from "@/components/account/auth-form"
export const metadata: Metadata = { title: "Reset Your Password" }
/**
 * Render the public reset-link request form; it does not reveal whether an email is registered.
 */
export default function ForgotPasswordPage() {
  return <AccountShell compact title="Return to Your Plans" description="Request a link to reset your AVES account password."><AuthForm mode="forgot-password" /></AccountShell>
}
