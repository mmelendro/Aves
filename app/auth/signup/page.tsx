import { redirect } from "next/navigation"
import { sharedSignInHref } from "@/lib/shared-account"

export default function SignupPage() {
  redirect(sharedSignInHref("sign-up"))
}
