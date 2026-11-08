"use client"

/**
 * Browser workspace for reviewing quote requests and preparing priced proposals.
 * This UI is not the owner permission check: the admin API and database functions
 * verify the signed-in actor against private.site_admins on each operation.
 * Draft, issued, and email-notification states are intentionally separate.
 */

import { useCallback, useEffect, useRef, useState } from "react"
import { CheckCircle, Edit3, FileText, Mail, RefreshCw, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { AccountRequestError, accountRequest, dateLabel, errorMessage, countryLabel, regionSummary, type OwnerQuote, type Proposal } from "./account-api"
import { PlanningAnswers } from "./planning-questions"
import { ProposalCard } from "./proposal-card"
import { ProposalEditor } from "./proposal-editor"

/**
 * Show the reviewed proposal before issuing it; reuse one request key and report the issued receipt via onSent.
 */
function SendProposal({ proposal, onSent, onCancel }: { proposal: Proposal; onSent: (proposal: Proposal) => void; onCancel: () => void }) {
  const busyRef = useRef(false)
  const keyRef = useRef<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [feedback, setFeedback] = useState("")
  async function send() {
    if (busyRef.current) return
    busyRef.current = true; setBusy(true); setFeedback("")
    try {
      // Retain this key if the response is lost: retry the same issue operation,
      // not a fresh instruction to issue/notify again.
      keyRef.current ||= crypto.randomUUID()
      const result = await accountRequest<{ success: boolean; status: string; proposal: Proposal }>(`/api/admin/proposals/${proposal.id}/send`, { method: "POST", headers: { "Idempotency-Key": keyRef.current }, body: JSON.stringify({ expectedUpdatedAt: proposal.updatedAt }) })
      if (result.success !== true || result.status !== "sent" || result.proposal?.id !== proposal.id || result.proposal.status !== "sent") throw new Error("Issuing this proposal could not be confirmed. Please try again.")
      keyRef.current = null
      onSent(result.proposal)
    } catch (error) { setFeedback(errorMessage(error)) }
    finally { busyRef.current = false; setBusy(false) }
  }
  return <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 space-y-4"><h4 className="font-bold text-gray-900">Ready to Send Version {proposal.version}?</h4><p className="text-gray-700">The customer will be able to view this proposal for <strong>{new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(proposal.totalCents / 100)} AUD</strong> in their account. Its content will be kept unchanged after issue. Email notification is tracked separately.</p><div className="flex flex-wrap gap-3"><Button onClick={send} disabled={busy} className="bg-emerald-600 hover:bg-emerald-700"><Send className="w-4 h-4 mr-2" />{busy ? "Issuing…" : "Send Proposal"}</Button><Button variant="outline" onClick={onCancel} disabled={busy}>Keep as Draft</Button></div>{feedback && <p className="text-sm text-red-700" role="alert">{feedback}</p>}</div>
}

const statusLabels: Record<string, string> = { new: "New Request", submitted: "New Request", pending: "New Request", reviewing: "Reviewing", responded: "Responded", closed: "Closed" }

/**
 * Fetch the authorized owner inbox and coordinate draft/edit/issue/status actions; APIs remain authoritative.
 */
export function OwnerQuoteInbox() {
  const [quotes, setQuotes] = useState<OwnerQuote[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [feedback, setFeedback] = useState("")
  const [statusBusy, setStatusBusy] = useState(false)
  const [editor, setEditor] = useState<{ proposal?: Proposal; initial?: Proposal } | null>(null)
  const [sending, setSending] = useState<string | null>(null)
  const statusRef = useRef(false)
  const selected = quotes.find(quote => quote.id === selectedId)
  const hasDraft = selected?.proposals?.some(proposal => proposal.status === "draft") || false
  const newProposalUnavailable = hasDraft || selected?.status === "closed"
  const newProposalHint = selected?.status === "closed" ? "Reopen this request to prepare another proposal." : hasDraft ? "Edit or send the existing draft before creating another proposal." : undefined
  const load = useCallback(async () => {
    setLoading(true); setError("")
    try {
      const result = await accountRequest<{ quotes: OwnerQuote[] }>("/api/admin/quotes")
      if (!Array.isArray(result.quotes)) throw new Error("The quote inbox could not be loaded. Please try again.")
      setQuotes(result.quotes)
      setSelectedId(current => result.quotes.some(quote => quote.id === current) ? current : result.quotes[0]?.id || null)
    } catch (error) {
      if (error instanceof AccountRequestError && (error.status === 401 || error.status === 403)) {
        setQuotes([]); setSelectedId(null)
        setError("This inbox is available only to the signed-in AVES owner account.")
      } else setError(errorMessage(error))
    } finally { setLoading(false) }
  }, [])
  useEffect(() => { void load() }, [load])

  // This changes displayed state only after an API receipt; it is not a database
  // write and cannot grant client visibility by itself.
  function replaceProposal(proposal: Proposal) {
    setQuotes(current => current.map(quote => quote.id === proposal.quoteRequestId ? { ...quote, proposals: [proposal, ...(quote.proposals || []).filter(item => item.id !== proposal.id)] } : quote))
  }
  async function updateStatus(status: "reviewing" | "responded" | "closed") {
    if (!selected || statusRef.current) return
    statusRef.current = true; setStatusBusy(true); setError(""); setFeedback("")
    try {
      const result = await accountRequest<{ quote: OwnerQuote }>(`/api/admin/quotes/${selected.id}`, { method: "PATCH", body: JSON.stringify({ status }) })
      if (result.quote?.id !== selected.id || result.quote.status !== status) throw new Error("The status change could not be confirmed. Please try again.")
      setQuotes(current => current.map(quote => quote.id === result.quote.id ? { ...quote, status: result.quote.status } : quote))
      setFeedback(`Request marked ${statusLabels[status].toLowerCase()}. This action does not send an email.`)
    } catch (error) { setError(errorMessage(error)) }
    finally { statusRef.current = false; setStatusBusy(false) }
  }

  return <div className="space-y-8"><div className="flex flex-wrap items-center justify-between gap-4"><div><h2 className="text-2xl font-bold text-gray-900 mb-2">Customer Quote Requests</h2><p className="text-gray-600">Review Colombia and Australia plans, prepare an AUD proposal and issue it when ready.</p></div><Button variant="outline" onClick={() => void load()} disabled={loading || Boolean(editor || sending) || statusBusy}><RefreshCw className="w-4 h-4 mr-2" />Refresh Inbox</Button></div>
    {error && <p role="alert" className="text-red-700">{error}</p>}{feedback && <p role="status" className="text-emerald-700 font-medium">{feedback}</p>}
    {loading ? <p role="status" className="text-gray-600">Loading the private inbox…</p> : quotes.length === 0 && !error ? <Card className="border-0 shadow-lg bg-white"><CardContent className="p-8 text-center"><Mail className="w-10 h-10 text-emerald-600 mx-auto mb-4" /><h3 className="text-xl font-bold text-gray-900 mb-3">Your Inbox Is Ready</h3><p className="text-gray-600">Customer quote requests will appear here once submitted.</p></CardContent></Card> : <div className="grid lg:grid-cols-3 gap-8"><aside className="space-y-4" aria-label="Quote requests">{quotes.map(quote => <Card key={quote.id} className={`border-0 shadow-lg ${quote.id === selectedId ? "bg-emerald-50 ring-1 ring-emerald-200" : "bg-white"}`}><CardContent className="p-5"><Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-3">{statusLabels[quote.status] || quote.status}</Badge><h3 className="font-bold text-gray-900 break-words mb-2">{quote.plan.title}</h3><p className="text-sm text-gray-600 mb-1">{quote.contactName} · {countryLabel(quote.plan.country)}</p><p className="text-xs text-gray-500 mb-4">Received {dateLabel(quote.submittedAt)}</p><Button variant="outline" size="sm" disabled={Boolean(editor || sending) || statusBusy} aria-pressed={quote.id === selectedId} onClick={() => { setSelectedId(quote.id); setFeedback(""); setError("") }}>Open Request</Button></CardContent></Card>)}</aside>
      <div className="lg:col-span-2 space-y-6">{selected && <><Card className="border-0 shadow-xl bg-white"><CardContent className="p-6 lg:p-8"><div className="flex flex-wrap items-center gap-3 mb-5"><h2 className="text-2xl font-bold text-gray-900 break-words">{selected.plan.title}</h2><Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">{statusLabels[selected.status] || selected.status}</Badge></div><p className="font-medium text-gray-900 mb-1">{selected.contactName}</p><a href={`mailto:${selected.contactEmail}`} className="text-emerald-700 underline break-all">{selected.contactEmail}</a><dl className="grid sm:grid-cols-2 gap-4 mt-6 mb-6 text-sm"><div><dt className="font-semibold text-gray-900">Destination Country</dt><dd className="text-gray-600">{countryLabel(selected.plan.country)}</dd></div><div><dt className="font-semibold text-gray-900">Regions</dt><dd className="text-gray-600">{regionSummary(selected.plan.regions, selected.plan.country)}</dd></div><div><dt className="font-semibold text-gray-900">Travel Timing</dt><dd className="text-gray-600">{selected.plan.travelWhen || "Flexible"}</dd></div><div><dt className="font-semibold text-gray-900">Group Size</dt><dd className="text-gray-600">{selected.plan.partySize || "Still deciding"}</dd></div><div><dt className="font-semibold text-gray-900">Submitted</dt><dd className="text-gray-600">{dateLabel(selected.submittedAt)}</dd></div></dl><PlanningAnswers answers={selected.plan.questionnaire} />{selected.plan.country === "new-zealand" && <p className="mb-5 text-sm text-emerald-800">New Zealand planning beta: a private preference brief, not a confirmed tour or reservation.</p>}<h3 className="font-semibold text-gray-900 mb-2">Customer Interests</h3><p className="text-gray-600 whitespace-pre-wrap break-words leading-relaxed mb-6">{selected.plan.message || "No additional details supplied."}</p><p className="text-sm text-gray-500 mb-6">{selected.notificationStatus === "accepted" ? "The owner's notification was accepted by the email service; inbox delivery is not confirmed." : selected.notificationStatus === "failed" ? "The request is saved here, but its email notification was not accepted." : "The request is saved here. Its email notification is pending."}</p><div className="flex flex-wrap gap-3">{(["reviewing", "responded", "closed"] as const).map(status => <Button key={status} variant="outline" size="sm" onClick={() => void updateStatus(status)} disabled={statusBusy || Boolean(editor || sending) || selected.status === status}>{statusBusy ? "Updating…" : `Mark ${statusLabels[status]}`}</Button>)}</div></CardContent></Card>
        <div className="flex flex-wrap items-center justify-between gap-4"><h3 className="text-2xl font-bold text-gray-900">Proposals</h3><Button className="bg-emerald-600 hover:bg-emerald-700" disabled={Boolean(editor || sending) || statusBusy || newProposalUnavailable} title={newProposalHint} onClick={() => { setEditor({}); setFeedback("") }}><FileText className="w-4 h-4 mr-2" />Prepare a Proposal</Button></div>
        {editor && <ProposalEditor key={editor.proposal?.id || editor.initial?.id || `new-${selected.id}`} quoteId={selected.id} proposal={editor.proposal} initial={editor.initial} onCancel={() => setEditor(null)} onSaved={proposal => { replaceProposal(proposal); setEditor(null); setFeedback("Proposal draft saved. It is private until you choose Send Proposal.") }} />}
        {(selected.proposals || []).length === 0 && !editor && <p className="text-gray-600">There are no proposals for this request yet.</p>}
        {(selected.proposals || []).map(proposal => <div key={proposal.id} className="space-y-3"><ProposalCard proposal={proposal} owner /><div className="flex flex-wrap gap-3">{proposal.status === "draft" ? <><Button variant="outline" disabled={Boolean(editor || sending) || statusBusy} onClick={() => { setEditor({ proposal }); setFeedback("") }}><Edit3 className="w-4 h-4 mr-2" />Edit Draft</Button><Button className="bg-emerald-600 hover:bg-emerald-700" disabled={Boolean(editor || sending) || statusBusy} onClick={() => { setSending(proposal.id); setFeedback("") }}><CheckCircle className="w-4 h-4 mr-2" />Review &amp; Send</Button></> : <Button variant="outline" disabled={Boolean(editor || sending) || statusBusy || newProposalUnavailable} title={newProposalHint} onClick={() => { setEditor({ initial: proposal }); setFeedback("") }}>Create a New Revision</Button>}</div>{sending === proposal.id && <SendProposal key={`${proposal.id}-${proposal.updatedAt}`} proposal={proposal} onCancel={() => setSending(null)} onSent={sent => { replaceProposal(sent); setSending(null); setFeedback("Proposal issued and available in the customer's account. Check its separate email notification status below.") }} />}</div>)}
      </>}</div>
    </div>}
  </div>
}
