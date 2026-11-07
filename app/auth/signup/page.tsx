/**
 * Legacy sign-up URL: redirect to the shared account portal using the central helper.
 * This file renders no password form and does not create a separate login session.
 */
import { redirect } from "next/navigation"
import { sharedSignInHref } from "@/lib/shared-account"

export default function SignupPage() {
  redirect(sharedSignInHref("sign-up"))
}
