/**
 * Server-rendered account entry screen.
 * Render the password form; the browser verifies session availability and Auth authorizes the update.
 * This page supplies presentation; Auth operations live in components/account/auth-form.tsx.
 */

import type { Metadata } from "next"
import { AccountShell } from "@/components/account/account-shell"
import { AuthForm } from "@/components/account/auth-form"
export const metadata: Metadata = { title: "Choose a New Password" }
/**
 * Render the password form; the browser verifies session availability and Auth authorizes the update.
 */
export default function ResetPasswordPage() {
  return <AccountShell compact title="A Fresh Start" description="Choose a new password for your AVES account."><AuthForm mode="reset-password" /></AccountShell>
}
