/**
 * Compatibility route for old shopping links. It converts supported old query
 * parameters into a shared planning destination, then redirects. This route has no cart,
 * payment processing or customer database of its own.
 */
import { redirect } from "next/navigation"
import { legacyPlanningHref } from "@/lib/shared-account"

export default async function ShoppingPage({searchParams}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  redirect(legacyPlanningHref(await searchParams))
}
