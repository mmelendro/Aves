import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { AccountShell } from "@/components/account/account-shell"
import { AccountDashboard } from "@/components/account/account-dashboard"
import { getAccountUser } from "@/lib/account-auth"

export const metadata: Metadata = { title: "My Trip Plans" }
export default async function AccountPage() {
  const user = await getAccountUser()
  if (!user) redirect("/account/sign-in")
  return <AccountShell title="Your Australian Journey, Taking Shape" description="Keep your ideas together, refine a trip plan and request a personal quote when you're ready."><AccountDashboard email={user.email || ""} /></AccountShell>
}
