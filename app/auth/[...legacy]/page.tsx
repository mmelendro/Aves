import { redirect } from "next/navigation"
import { sharedSignInHref } from "@/lib/shared-account"

export default async function LegacyAuthPage({params}: {params: Promise<{legacy: string[]}>}) {
  const {legacy} = await params
  if (legacy.length === 1 && ["forgot-password", "reset-password"].includes(legacy[0])) {
    redirect("/account/forgot-password")
  }
  // Old project tokens and arbitrary redirect parameters must never be forwarded.
  redirect(sharedSignInHref())
}
