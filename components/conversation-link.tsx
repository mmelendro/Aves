"use client"

import type { ReactNode } from "react"
import { useHeaderLandscape } from "./header-landscape-context"
import { enquiryHref } from "@/lib/enquiry-entry"

/** Uses the same public map context as the footer. No personal form data enters URLs. */
export default function ConversationLink({ children, className }: { children: ReactNode; className?: string }) {
  const { selection } = useHeaderLandscape()
  const href = selection && selection.country !== "global"
    ? enquiryHref(selection.country, selection.regionId)
    : "/contact?topic=general#inquiry"
  return <a href={href} className={className}>{children}</a>
}
