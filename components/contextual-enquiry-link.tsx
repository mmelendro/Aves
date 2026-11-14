"use client"

import type { ReactNode } from "react"
import { useHeaderLandscape } from "@/components/header-landscape-context"
import { isEnabledTripCountry, type TripCountry } from "@/content/trip-options"
import { enquiryHref } from "@/lib/enquiry-entry"

/** Only public geographic context belongs in these URLs, never enquiry text. */
export function useContextualEnquiryHref(country?: TripCountry) {
  const { selection } = useHeaderLandscape()
  const currentCountry = selection ? selection.country : country
  return isEnabledTripCountry(currentCountry)
    ? enquiryHref(currentCountry, selection?.country === currentCountry ? selection.regionId : "")
    : "/contact?topic=general#inquiry"
}

export function ContextualEnquiryLink({ country, children, className }: {
  country?: TripCountry
  children: ReactNode
  className?: string
}) {
  return <a href={useContextualEnquiryHref(country)} className={className}>{children}</a>
}
