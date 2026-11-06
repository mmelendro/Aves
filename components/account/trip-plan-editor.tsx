"use client"

import { useId, useRef, useState } from "react"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AccountRequestError, accountRequest, errorMessage, tripCountry, type TripFields, type TripPlan } from "./account-api"
import { countryLabels, countryRegionOptions, type TripCountry } from "@/content/trip-options"
import { normalizePlanRegions, type PlanIntent } from "./plan-intent"

export function TripPlanEditor({ plan, initial, onSaved, onCancel }: { plan?: TripPlan; initial?: PlanIntent; onSaved: (plan: TripPlan) => void; onCancel: () => void }) {
  const prefix = useId()
  const busyRef = useRef(false)
  const request = useRef<{ payload: string; key: string } | null>(null)
  const [busy, setBusy] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [country, setCountry] = useState<TripCountry>(tripCountry(plan?.country || initial?.country))
  const [selectedRegions, setSelectedRegions] = useState(() => normalizePlanRegions(tripCountry(plan?.country || initial?.country), plan?.regions || initial?.regions || []))
  const [regionNotice, setRegionNotice] = useState("")
  const options = countryRegionOptions[country]
  const olderSelections = selectedRegions.filter(value => !options.some(option => option.id === value))

  function changeCountry(value: TripCountry) {
    if (value === country) return
    setCountry(value)
    setSelectedRegions([])
    setRegionNotice(`Choose regions in ${countryLabels[value]}. Previous region selections have been cleared.`)
  }

  function toggleRegion(value: string, checked: boolean) {
    setSelectedRegions(current => checked ? [...current, value] : current.filter(region => region !== value))
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busyRef.current) return
    const values = new FormData(event.currentTarget)
    const fields: TripFields = { country, title: String(values.get("title") || "").trim(), regions: values.getAll("regions").map(String), travelWhen: String(values.get("travelWhen") || "").trim(), partySize: String(values.get("partySize") || ""), message: String(values.get("message") || "").trim() }
    busyRef.current = true
    setBusy(true)
    setFeedback("")
    try {
      const payload = JSON.stringify(fields)
      if (request.current?.payload !== payload) request.current = { payload, key: crypto.randomUUID() }
      const key = request.current.key
      const result = await accountRequest<{ plan: TripPlan }>(plan ? `/api/account/plans/${plan.id}` : "/api/account/plans", { method: plan ? "PATCH" : "POST", headers: plan ? {} : { "Idempotency-Key": key }, body: JSON.stringify(plan ? { ...fields, expectedUpdatedAt: plan.updatedAt } : { ...fields, id: key }) })
      if (!result.plan || result.plan.id !== (plan?.id || key) || result.plan.status !== "draft" || !result.plan.updatedAt) throw new Error("Your saved plan could not be confirmed. Please try again; your details are still here.")
      request.current = null
      onSaved(result.plan)
    } catch (error) { setFeedback(error instanceof AccountRequestError && error.status === 409 ? `${error.message} Your unsaved details are still here. Cancel editing, then choose Refresh Saved Plans to load the current version.` : errorMessage(error)) }
    finally { busyRef.current = false; setBusy(false) }
  }

  return <Card className="border-0 shadow-xl bg-white"><CardContent className="p-6 lg:p-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-3">{plan ? "Refine Your Trip Plan" : "Start with What Inspires You"}</h2><p className="text-gray-600 mb-8">Save a few ideas now. You can return to your draft before asking AVES for a quote.</p>
    <form onSubmit={submit} className="space-y-6"><fieldset disabled={busy} className="space-y-6">
      <div><label htmlFor={`${prefix}-title`} className="block text-sm font-medium text-gray-700 mb-2">Give Your Plan a Name *</label><Input id={`${prefix}-title`} name="title" defaultValue={plan?.title || ""} maxLength={120} placeholder="A spring birding escape" required /></div>
      <div><label htmlFor={`${prefix}-country`} className="block text-sm font-medium text-gray-700 mb-2">Destination Country *</label><select id={`${prefix}-country`} name="country" value={country} onChange={event => changeCountry(event.target.value as TripCountry)} aria-describedby={`${prefix}-country-help`} className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"><option value="australia">Australia</option><option value="colombia">Colombia</option></select><p id={`${prefix}-country-help`} className="text-sm text-gray-500 mt-2">Choose one country per plan. You can save separate plans for both.</p></div>
      <fieldset><legend className="block text-sm font-medium text-gray-700 mb-3">Regions in {countryLabels[country]}</legend><div className="flex flex-wrap gap-x-4 gap-y-2">{options.map(({ id, label }) => <label key={id} className="flex min-h-11 items-center gap-2 text-sm text-gray-700"><input type="checkbox" name="regions" value={id} checked={selectedRegions.includes(id)} onChange={event => toggleRegion(id, event.target.checked)} className="accent-emerald-600" />{label}</label>)}{olderSelections.map(value => <label key={value} className="flex min-h-11 items-center gap-2 text-sm text-amber-800"><input type="checkbox" name="regions" value={value} checked onChange={event => toggleRegion(value, event.target.checked)} className="accent-emerald-600" />{value} (saved selection)</label>)}</div>{olderSelections.length > 0 && <p className="text-sm text-amber-800 mt-2">Review these older place names before saving. You can move additional places into Your Interests and Ideas.</p>}<p className="text-sm text-gray-500 mt-2">Leave these open if you're looking for inspiration. You can mention other places below.</p><p role="status" aria-live="polite" className="text-sm text-emerald-700 mt-2">{regionNotice}</p></fieldset>
      <div className="grid sm:grid-cols-2 gap-4"><div><label htmlFor={`${prefix}-when`} className="block text-sm font-medium text-gray-700 mb-2">Travel Timing</label><Input id={`${prefix}-when`} name="travelWhen" defaultValue={plan?.travelWhen || ""} maxLength={100} placeholder="A month, a season, or flexible" /></div><div><label htmlFor={`${prefix}-party`} className="block text-sm font-medium text-gray-700 mb-2">Group Size</label><select id={`${prefix}-party`} name="partySize" defaultValue={plan?.partySize || ""} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"><option value="">Still deciding</option><option>1 person</option><option>2 people</option><option>3–4 people</option><option>5+ people</option></select></div></div>
      <div><label htmlFor={`${prefix}-message`} className="block text-sm font-medium text-gray-700 mb-2">Your Interests and Ideas</label><Textarea id={`${prefix}-message`} name="message" defaultValue={plan?.message || ""} maxLength={3000} rows={6} placeholder="Birds, landscapes, photography, your preferred pace, or anything else you'd like us to know…" /></div>
      <p className="text-sm text-gray-500">Saving a draft does not request a quote or create a booking.</p>
      <div className="flex flex-wrap gap-3"><Button type="submit" className="bg-emerald-600 hover:bg-emerald-700"><Save className="w-4 h-4 mr-2" />{busy ? "Saving…" : "Save My Draft"}</Button><Button type="button" variant="outline" onClick={onCancel}>Cancel</Button></div>
    </fieldset>{feedback && <p role="alert" className="text-sm text-red-700">{feedback}</p>}</form>
  </CardContent></Card>
}
