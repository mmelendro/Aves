import { redirect } from "next/navigation"
import { sharedAccountHref } from "@/lib/shared-account"

export default function LegacyDashboardPage() {
  redirect(sharedAccountHref())
}
