import { redirect } from "next/navigation"
import { sharedSignInHref } from "@/lib/shared-account"

export default function LoginPage() {
  redirect(sharedSignInHref())
}
