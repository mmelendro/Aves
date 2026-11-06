import { redirect } from "next/navigation"
import { legacyPlanningHref } from "@/lib/shared-account"

export default async function ShoppingPage({searchParams}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  redirect(legacyPlanningHref(await searchParams))
}
