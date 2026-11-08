"use client"

/**
 * Owner's browser form for an editable proposal draft, priced in AUD cents.
 * Saving only stores a draft; issuing it to the client is a separate action in the
 * owner inbox. An older issued proposal may seed a new draft without changing the
 * issued version. Authorization is enforced by the admin API/database.
 */

import { useEffect, useId, useRef, useState } from "react"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AccountRequestError, accountRequest, errorMessage, type Proposal, type ProposalFields } from "./account-api"

/**
 * Parse a decimal amount into bounded integer cents, or null when invalid; avoid floating-point money arithmetic.
 */
export function parseAUD(value: string): number | null {
  if (!/^\d{1,7}(?:\.\d{1,2})?$/.test(value.trim())) return null
  const [whole, fraction = ""] = value.trim().split(".")
  const cents = Number(whole) * 100 + Number(fraction.padEnd(2, "0"))
  return Number.isSafeInteger(cents) && cents >= 1 && cents <= 100_000_000 ? cents : null
}

/**
 * Edit proposal, or create a new draft optionally seeded from initial; onSaved receives the confirmed draft.
 * quoteId links the request being priced; the server checks that relationship and owner access.
 */
export function ProposalEditor({ quoteId, proposal, initial, onSaved, onCancel }: { quoteId: string; proposal?: Proposal; initial?: Proposal; onSaved: (proposal: Proposal) => void; onCancel: () => void }) {
  const prefix = useId()
  const headingRef = useRef<HTMLHeadingElement>(null)
  // Reveal newly opened forms without opening the phone keyboard unexpectedly.
  useEffect(() => {
    const heading = headingRef.current
    heading?.focus({ preventScroll: true })
    heading?.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })
  }, [])
  // proposal edits an existing draft; initial only copies an older version
  // into a new form and must never rewrite an issued proposal.
  const valuesFrom = proposal || initial
  const request = useRef<{ payload: string; key: string } | null>(null)
  const busyRef = useRef(false)
  const [busy, setBusy] = useState(false)
  const [feedback, setFeedback] = useState("")

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busyRef.current) return
    const values = new FormData(event.currentTarget)
    const totalCents = parseAUD(String(values.get("total") || ""))
    if (totalCents === null) { setFeedback("Enter an AUD amount from 0.01 to 1,000,000.00 using no more than two decimal places and no commas."); return }
    const fields: ProposalFields = { totalCents, currency: "AUD", itinerary: String(values.get("itinerary") || "").trim(), inclusions: String(values.get("inclusions") || "").trim(), exclusions: String(values.get("exclusions") || "").trim(), validUntil: String(values.get("validUntil") || "") || null }
    busyRef.current = true; setBusy(true); setFeedback("")
    try {
      // Reuse a creation UUID for identical retries; PATCH carries the revision
      // so a concurrent owner edit cannot be silently overwritten.
      const payload = JSON.stringify(fields)
      if (request.current?.payload !== payload) request.current = { payload, key: crypto.randomUUID() }
      const key = request.current.key
      const result = await accountRequest<{ proposal: Proposal }>(proposal ? `/api/admin/proposals/${proposal.id}` : `/api/admin/quotes/${quoteId}/proposals`, { method: proposal ? "PATCH" : "POST", headers: proposal ? {} : { "Idempotency-Key": key }, body: JSON.stringify(proposal ? { ...fields, expectedUpdatedAt: proposal.updatedAt } : { ...fields, id: key }) })
      if (result.proposal?.id !== (proposal?.id || key) || result.proposal.status !== "draft" || result.proposal.quoteRequestId !== quoteId) throw new Error("The proposal draft could not be confirmed. Please try again; your details are still here.")
      request.current = null
      onSaved(result.proposal)
    } catch (error) { setFeedback(error instanceof AccountRequestError && error.status === 409 ? `${error.message} Your unsaved details are still here. Cancel editing, then choose Refresh Inbox to load the current version.` : errorMessage(error)) }
    finally { busyRef.current = false; setBusy(false) }
  }

  return <Card className="border-0 shadow-xl bg-white"><CardContent className="p-6 lg:p-8"><h3 ref={headingRef} tabIndex={-1} className="text-2xl font-bold text-gray-900 mb-3 scroll-mt-32 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600">{proposal ? `Edit Proposal · Version ${proposal.version}` : initial ? "Prepare a New Revision" : "Prepare a Proposal"}</h3><p className="text-gray-600 mb-8">This is a private draft. Save it, review the details, then choose Send Proposal when you're ready to issue it to the customer.</p>
    <form onSubmit={submit} className="space-y-6"><fieldset disabled={busy} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4"><div><label htmlFor={`${prefix}-total`} className="block text-sm font-medium text-gray-700 mb-2">Total Price in AUD *</label><Input id={`${prefix}-total`} name="total" inputMode="decimal" defaultValue={valuesFrom ? (valuesFrom.totalCents / 100).toFixed(2) : ""} placeholder="2500.00" maxLength={12} required /><p className="text-sm text-gray-500 mt-2">Use the full proposal total in Australian dollars, including for Colombia trips, with up to two decimal places.</p></div><div><label htmlFor={`${prefix}-valid`} className="block text-sm font-medium text-gray-700 mb-2">Valid Until (Optional)</label><Input id={`${prefix}-valid`} name="validUntil" type="date" defaultValue={valuesFrom?.validUntil || ""} /></div></div>
      <div><label htmlFor={`${prefix}-itinerary`} className="block text-sm font-medium text-gray-700 mb-2">Proposed Journey and Itinerary *</label><Textarea id={`${prefix}-itinerary`} name="itinerary" rows={8} maxLength={10000} defaultValue={valuesFrom?.itinerary || ""} placeholder="Describe the proposed journey, timing and arrangements clearly." required /></div>
      <div><label htmlFor={`${prefix}-inclusions`} className="block text-sm font-medium text-gray-700 mb-2">Inclusions</label><Textarea id={`${prefix}-inclusions`} name="inclusions" rows={4} maxLength={5000} defaultValue={valuesFrom?.inclusions || ""} placeholder="List what the quoted total includes." /></div>
      <div><label htmlFor={`${prefix}-exclusions`} className="block text-sm font-medium text-gray-700 mb-2">Exclusions</label><Textarea id={`${prefix}-exclusions`} name="exclusions" rows={4} maxLength={5000} defaultValue={valuesFrom?.exclusions || ""} placeholder="List costs or arrangements outside the quoted total." /></div>
      <p className="text-sm text-gray-500">An issued proposal is kept unchanged. Later changes require a new version. This website does not take payment or confirm a booking.</p>
      <div className="flex flex-wrap gap-3"><Button type="submit" className="bg-emerald-600 hover:bg-emerald-700"><Save className="w-4 h-4 mr-2" />{busy ? "Saving…" : "Save Proposal Draft"}</Button><Button type="button" variant="outline" onClick={onCancel}>Cancel</Button></div>
    </fieldset>{feedback && <p role="alert" className="text-sm text-red-700">{feedback}</p>}</form>
  </CardContent></Card>
}
