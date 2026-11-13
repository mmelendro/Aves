"use client"
import {useUiCopy} from "@/components/ui-language"
/**
 * Read-only presentation of a proposal returned by the account/admin API.
 * The owner prop changes displayed details, not permission to fetch the record.
 * Text is rendered as React text rather than injected HTML.
 */

import { FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { dateLabel, type Proposal } from "./account-api"

/**
 * Describe provider acceptance separately from delivery; failed notification does not mean lost proposal.
 */
export function NotificationStatus({ status }: { status: string }) {
 const uiCopy=useUiCopy()

  return <p className="text-sm text-gray-500">{status === "accepted" ? uiCopy("The email service accepted the notification. Delivery is not confirmed.") : status === "failed" ? uiCopy("The proposal is saved, but its email notification was not accepted. The customer can still view an issued proposal in their account.") : uiCopy("Email notification is pending. This is separate from the saved request or proposal.")}</p>
}

/**
 * Display an authorized proposal and optional owner-only presentation details; no data mutation occurs here.
 */
export function ProposalCard({ proposal, owner = false }: { proposal: Proposal; owner?: boolean }) {
 const uiCopy=useUiCopy()

  return <Card className="border-0 shadow-lg bg-white"><CardContent className="p-6 lg:p-8">
    <div className="flex flex-wrap items-center justify-between gap-3 mb-5"><div className="flex items-center gap-3"><FileText className="w-6 h-6 text-emerald-600" /><h3 className="text-xl font-bold text-gray-900">{uiCopy("Proposal · Version ")}{proposal.version}</h3></div><Badge className={proposal.status === "sent" ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100" : "bg-amber-100 text-amber-800 hover:bg-amber-100"}>{proposal.status === "sent" ? uiCopy("Issued") : uiCopy("Draft")}</Badge></div>
    <p className="text-xs text-gray-500 mb-4">{uiCopy("Proposal reference: ")}{proposal.id.slice(0, 8).toUpperCase()}</p>
    <p className="text-sm text-gray-600 mb-2">{uiCopy("Proposal total (AUD)")}</p><p className="text-3xl font-bold text-emerald-700 mb-5">{new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(proposal.totalCents / 100)}</p>
    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 mb-6">{proposal.issuedAt && <span>{uiCopy("Issued ")}{dateLabel(proposal.issuedAt)}</span>}{proposal.validUntil && <span>{uiCopy("Valid until ")}{dateLabel(proposal.validUntil)}</span>}</div>
    <div className="space-y-6">{[["Your Proposed Journey", proposal.itinerary], ["Inclusions", proposal.inclusions], ["Exclusions", proposal.exclusions]].map(([title, text]) => <div key={title}><h4 className="font-semibold text-gray-900 mb-2">{title}</h4><p className="text-gray-600 whitespace-pre-wrap break-words leading-relaxed">{text || uiCopy("Not specified")}</p></div>)}</div>
    <p className="mt-6 pt-5 border-t border-gray-200 text-sm text-gray-500">{uiCopy("This page does not take payments or confirm a booking. Please discuss any questions or changes with AVES.")}</p>
    {owner && <div className="mt-4">{proposal.status === "draft" ? <p className="text-sm text-gray-500">{uiCopy("Draft — only you can see this; no email has been sent.")}</p> : <NotificationStatus status={proposal.notificationStatus} />}</div>}
  </CardContent></Card>
}
