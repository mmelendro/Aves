import { FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { dateLabel, type Proposal } from "./account-api"

export function NotificationStatus({ status }: { status: string }) {
  return <p className="text-sm text-gray-500">{status === "accepted" ? "The email service accepted the notification. Delivery is not confirmed." : status === "failed" ? "The proposal is saved, but its email notification was not accepted. The customer can still view an issued proposal in their account." : "Email notification is pending. This is separate from the saved request or proposal."}</p>
}

export function ProposalCard({ proposal, owner = false }: { proposal: Proposal; owner?: boolean }) {
  return <Card className="border-0 shadow-lg bg-white"><CardContent className="p-6 lg:p-8">
    <div className="flex flex-wrap items-center justify-between gap-3 mb-5"><div className="flex items-center gap-3"><FileText className="w-6 h-6 text-emerald-600" /><h3 className="text-xl font-bold text-gray-900">Proposal · Version {proposal.version}</h3></div><Badge className={proposal.status === "sent" ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100" : "bg-amber-100 text-amber-800 hover:bg-amber-100"}>{proposal.status === "sent" ? "Issued" : "Draft"}</Badge></div>
    <p className="text-xs text-gray-500 mb-4">Proposal reference: {proposal.id.slice(0, 8).toUpperCase()}</p>
    <p className="text-sm text-gray-600 mb-2">Proposal total (AUD)</p><p className="text-3xl font-bold text-emerald-700 mb-5">{new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(proposal.totalCents / 100)}</p>
    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 mb-6">{proposal.issuedAt && <span>Issued {dateLabel(proposal.issuedAt)}</span>}{proposal.validUntil && <span>Valid until {dateLabel(proposal.validUntil)}</span>}</div>
    <div className="space-y-6">{[["Your Proposed Journey", proposal.itinerary], ["Inclusions", proposal.inclusions], ["Exclusions", proposal.exclusions]].map(([title, text]) => <div key={title}><h4 className="font-semibold text-gray-900 mb-2">{title}</h4><p className="text-gray-600 whitespace-pre-wrap break-words leading-relaxed">{text || "Not specified"}</p></div>)}</div>
    <p className="mt-6 pt-5 border-t border-gray-200 text-sm text-gray-500">This page does not take payments or confirm a booking. Please discuss any questions or changes with AVES.</p>
    {owner && <div className="mt-4"><NotificationStatus status={proposal.notificationStatus} /></div>}
  </CardContent></Card>
}
