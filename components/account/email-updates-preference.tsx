"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { accountRequest, errorMessage } from "./account-api"
import { EMAIL_UPDATES_WORDING } from "@/lib/email-updates"

/** Shared, explicit confirmation for email and social signup; never required for an account. */
export function EmailUpdatesPreference({ next = "/account" }: { next?: string }) {
  const [subscribed, setSubscribed] = useState(false)
  const [ready, setReady] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [busy, setBusy] = useState(false)
  const busyRef = useRef(false)
  useEffect(() => {
    let active = true
    accountRequest<{ subscribed: boolean }>("/api/account/email-updates").then(result => {
      if (active) { setSubscribed(result.subscribed === true); setReady(true) }
    }).catch(error => { if (active) setFeedback(errorMessage(error)) })
    return () => { active = false }
  }, [])
  async function save() {
    if (!ready || busyRef.current) return
    busyRef.current = true; setBusy(true); setFeedback("")
    try {
      const result = await accountRequest<{ subscribed: boolean }>("/api/account/email-updates", { method: "PUT", body: JSON.stringify({ subscribed }) })
      if (result.subscribed !== subscribed) throw new Error("Your preference could not be confirmed. Please try again.")
      setFeedback(subscribed ? "You're subscribed to optional AVES email updates." : "You're unsubscribed from optional AVES email updates.")
    } catch (error) { setFeedback(errorMessage(error)) }
    finally { busyRef.current = false; setBusy(false) }
  }
  return <section className="rounded-2xl bg-white border border-emerald-100 p-6 space-y-5">
    <h2 className="text-2xl font-semibold">Your email updates</h2>
    <p>Optional updates are separate from essential account and trip messages. Your account works with either choice.</p>
    <label className="flex items-start gap-3"><input type="checkbox" checked={subscribed} disabled={!ready || busy} onChange={event => setSubscribed(event.target.checked)} className="mt-1 accent-emerald-700" /><span>{EMAIL_UPDATES_WORDING}</span></label>
    <div className="flex flex-wrap gap-4 items-center"><Button disabled={!ready || busy} onClick={save}>{busy ? "Saving…" : "Save email preference"}</Button><a href={next} className="underline text-emerald-800">Continue to My Trips</a></div>
    <p role="status" className="text-sm">{feedback || (!ready ? "Loading your preference…" : "Check the box to subscribe, or leave it unchecked to stay unsubscribed. Save to confirm.")}</p>
  </section>
}
