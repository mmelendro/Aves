"use client"
import {MAX_PLAN_NOTES} from "@/lib/planning-limits"

import RoutePreferenceImport from "./route-preference-import"
import {routePreferences,routeParty,routeTiming} from "@/lib/route-preferences"
import {itineraryReceiptSchema} from "@/lib/saved-itineraries"
import {useUiCopy} from "@/components/ui-copy-context"

/**
 * Browser form for a new or existing draft trip idea.
 * Country/region selections are checked again on the server and in the database.
 * Saving a draft does not request a quote, reserve dates, or make a payment.
 */

import {useUnsavedChanges,confirmDiscardPendingEdits} from "./unsaved-changes"
import { importPlanningIdeas } from "@/lib/import-planning-ideas"
import { useEffect, useId, useRef, useState } from "react"
import { nzPublicPlanningPlaces, readNzPlaceIdeas, mergeNzPlaceNotes, consumeSavedNzPlaceIdeas } from "@/lib/nz-place-ideas"
import {islandPlanners,islandPlanner} from "@/lib/island-planners"
import type {TripDraft} from "@/lib/island-planning-types"
import NewZealandBirdPicker from "@/components/new-zealand-bird-picker"
import { consumeNzBirdBasket, readNzBirdBasket } from "@/lib/nz-bird-selection"
import { BudgetQuestions } from "./budget-questions"
import { budgetCategories, type TripBudget } from "@/content/trip-budget"
import { PlanningQuestions } from "./planning-questions"
import type { PlanningQuestionnaire } from "@/content/planning-questionnaire"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AccountRequestError, accountRequest, errorMessage, tripCountry, type TripFields, type TripPlan } from "./account-api"
import { countryLabels, countryRegionOptions, enabledCountries, isEnabledTripCountry, type TripCountry } from "@/content/trip-options"
import { normalizePlanRegions, type PlanIntent } from "./plan-intent"

/**
 * Edit plan or start from initial destination hints; onSaved receives only a server-confirmed draft.
 * onCancel discards this form view, not a previously saved database plan.
 */
export function TripPlanEditor({ plan, initial, onSaved, onCancel }: { plan?: TripPlan; initial?: PlanIntent; onSaved: (plan: TripPlan) => void; onCancel: () => void }) {
 const uiCopy=useUiCopy()

  const [dirty,setDirty]=useState(false)
  useUnsavedChanges(dirty,uiCopy("You have unsaved trip edits. Leave and discard them?"))
  const prefix = useId()
  const busyRef = useRef(false)
  const request = useRef<{ payload: string; key: string } | null>(null)
  const [busy, setBusy] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [country, setCountry] = useState<TripCountry>(tripCountry(plan?.country || initial?.country))
  const [selectedRegions, setSelectedRegions] = useState(() => normalizePlanRegions(tripCountry(plan?.country || initial?.country), plan?.regions || initial?.regions || []))
  const [regionNotice, setRegionNotice] = useState("")
  const [birdIds, setBirdIds] = useState<string[]>(plan?.questionnaire?.birdIds || [])
  const [incomingBirds, setIncomingBirds] = useState<string[]>([])
  const [incomingPlaces, setIncomingPlaces] = useState<string[]>([])
  const [incomingItineraries, setIncomingItineraries] = useState<TripDraft[]>([])
  const [savedRoutes,setSavedRoutes]=useState<TripDraft[]>([])
  const [importedPreferences,setImportedPreferences]=useState(plan?.questionnaire?.routePreferences)
  const [travelWhen,setTravelWhen]=useState(plan?.travelWhen||"")
  const [partySize,setPartySize]=useState(plan?.partySize||"")
  useEffect(()=>{if(!plan?.id||country!=="new-zealand")return;let live=true;accountRequest<unknown>(`/api/account/plans/${plan.id}/itineraries`).then(raw=>{if(live)setSavedRoutes(itineraryReceiptSchema.parse(raw).data.routes)}).catch(()=>{});return()=>{live=false}},[plan?.id,country])
  const [message, setMessage] = useState(plan?.message || "")
  const [placeNotice, setPlaceNotice] = useState("")
  const initialRegionsKey = initial?.regions.join("|") || ""
  const isNew = !plan
  // Guest choices prefill a new form. Existing saved answers are never silently
  // overwritten: explicitly merge, review and save to modify an owned plan.
  useEffect(() => {
    if (country !== "new-zealand") return
    try {
      setIncomingPlaces(readNzPlaceIdeas(window.sessionStorage))
      setIncomingItineraries(islandPlanners.filter(p=>!initialRegionsKey||initialRegionsKey.split("|").includes(p.context.id)).flatMap(p=>{const draft=p.readTripDraft(window.sessionStorage);return draft?[draft]:[]}))
      const incoming = readNzBirdBasket(window.sessionStorage)
      setIncomingBirds(incoming)
      if (isNew) setBirdIds(incoming)
    } catch { /* The complete picker also works without browser storage. */ }
  }, [country, plan?.id, isNew, initialRegionsKey])
  const options = countryRegionOptions[country]
  const olderSelections = selectedRegions.filter(value => !options.some(option => option.id === value))

  // Regions belong to one country; do not carry a previous country's selected
  // IDs into the new form. Old disabled destinations may remain on saved plans.
  function changeCountry(value: string) {
    if (plan || !isEnabledTripCountry(value) || value === country) return
    setCountry(value)
    setSelectedRegions([])
    setBirdIds([]);setImportedPreferences(undefined);setTravelWhen("");setPartySize("");setSavedRoutes([])
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
    if (country === "new-zealand") fields.questionnaire = {
      version: 1, pace: String(values.get("pace") || "open") as PlanningQuestionnaire["pace"],
      birding: String(values.get("birding") || "open") as PlanningQuestionnaire["birding"],
      comfort: String(values.get("comfort") || "open") as PlanningQuestionnaire["comfort"],
      interests: values.getAll("interests").map(String) as PlanningQuestionnaire["interests"],
      ...(birdIds.length ? { birdIds } : {}),
      ...(importedPreferences ? {routePreferences:importedPreferences} : {}),
    }
    if (fields.questionnaire) {
      const amounts = Object.fromEntries(budgetCategories.flatMap(({key}) => {
        const value = String(values.get(`budget-${key}`) ?? "").trim()
        return value === "" ? [] : [[key, Number(value)]]
      }))
      if (Object.keys(amounts).length) fields.questionnaire.budget = { currency: String(values.get("budgetCurrency")) as TripBudget["currency"], ...amounts }
    }
    busyRef.current = true
    setBusy(true)
    setFeedback("")
    try {
      // Keep the same key for an unchanged retry after an uncertain response. A
      // changed payload gets a fresh key; edits instead carry the saved revision.
      const payload = JSON.stringify(fields)
      if (request.current?.payload !== payload) request.current = { payload, key: crypto.randomUUID() }
      const key = request.current.key
      const result = await accountRequest<{ plan: TripPlan }>(plan ? `/api/account/plans/${plan.id}` : "/api/account/plans", { method: plan ? "PATCH" : "POST", headers: plan ? {} : { "Idempotency-Key": key }, body: JSON.stringify(plan ? { ...fields, expectedUpdatedAt: plan.updatedAt } : { ...fields, id: key }) })
      // Update the parent workspace only after checking the essential receipt.
      // HTTP success alone is not enough to claim this particular draft saved.
      if (!result.plan || result.plan.id !== (plan?.id || key) || result.plan.status !== "draft" || !result.plan.updatedAt) throw new Error("Your saved plan could not be confirmed. Please try again; your details are still here.")
      request.current = null
      if (country === "new-zealand") {
        try { islandPlanners.forEach(p=>p.consumeTripDraft(window.sessionStorage, result.plan.message || "")) } catch { /* Confirmed save remains successful if storage is blocked. */ }
        try { consumeSavedNzPlaceIdeas(window.sessionStorage, result.plan.message || "") } catch { /* Confirmed private save remains successful if browser storage is blocked. */ }
        try { consumeNzBirdBasket(window.sessionStorage, fields.questionnaire?.birdIds || []) } catch { /* Server save is already confirmed. */ }
      }
      setDirty(false)
      onSaved(result.plan)
    } catch (error) { setFeedback(error instanceof AccountRequestError && error.status === 409 ? `${error.message} Your unsaved details are still here. Cancel editing, then choose Refresh Saved Plans to load the current version.` : errorMessage(error)) }
    finally { busyRef.current = false; setBusy(false) }
  }

  return <Card className="border-0 shadow-xl bg-white"><CardContent className="p-6 lg:p-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-3">{country === "new-zealand" ? uiCopy("Your New Zealand starting points") : plan ? uiCopy("Refine Your Trip Plan") : uiCopy("Start with What Inspires You")}</h2><p className="text-gray-600 mb-8">{country === "new-zealand" ? uiCopy("A short planning questionnaire. Save privately, review your answers, then choose whether to share the brief with AVES. New Zealand is a planning beta, not a confirmed tour.") : uiCopy("Save a few ideas now. You can return to your draft before asking AVES for a quote.")}</p>
    <form onChange={()=>setDirty(true)} onSubmit={submit} className="space-y-6"><fieldset disabled={busy} className="space-y-6">
      <div><label htmlFor={`${prefix}-title`} className="block text-sm font-medium text-gray-700 mb-2">{uiCopy("Give Your Plan a Name *")}</label><Input id={`${prefix}-title`} name="title" defaultValue={plan?.title || ""} maxLength={120} placeholder={uiCopy("A spring birding escape")} required /></div>
      <div><label htmlFor={`${prefix}-country`} className="block text-sm font-medium text-gray-700 mb-2">{uiCopy("Destination Country *")}</label><select id={`${prefix}-country`} name="country" disabled={Boolean(plan)} value={country} onChange={event => changeCountry(event.target.value)} aria-describedby={`${prefix}-country-help`} className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">{enabledCountries.map(option => <option key={option.id} value={option.id}>{option.label}</option>)}{plan?.country && !isEnabledTripCountry(plan.country) && <option value={plan.country}>{countryLabels[plan.country]} {uiCopy(" (saved destination)")}</option>}</select><p id={`${prefix}-country-help`} className="text-sm text-gray-500 mt-2">{plan ? uiCopy("A saved trip keeps its destination so its journal and bird album stay together. Start a separate plan for another country.") : uiCopy("Choose one country per plan. You can save separate plans for different destinations.")}</p></div>
      <fieldset><legend className="block text-sm font-medium text-gray-700 mb-3">{uiCopy("Regions in ")}{countryLabels[country]}</legend><div className="flex flex-wrap gap-x-4 gap-y-2">{options.map(({ id, label }) => <label key={id} className="flex min-h-11 items-center gap-2 text-sm text-gray-700"><input type="checkbox" name="regions" value={id} checked={selectedRegions.includes(id)} onChange={event => toggleRegion(id, event.target.checked)} className="accent-emerald-600" />{label}</label>)}{olderSelections.map(value => <label key={value} className="flex min-h-11 items-center gap-2 text-sm text-amber-800"><input type="checkbox" name="regions" value={value} checked onChange={event => toggleRegion(value, event.target.checked)} className="accent-emerald-600" />{value} {uiCopy(" (saved selection)")}</label>)}</div>{olderSelections.length > 0 && <p className="text-sm text-amber-800 mt-2">{uiCopy("Review these older place names before saving. You can move additional places into Your Interests and Ideas.")}</p>}<p className="text-sm text-gray-500 mt-2">{uiCopy("Leave these open if you're looking for inspiration. You can mention other places below.")}</p><p role="status" aria-live="polite" className="text-sm text-emerald-700 mt-2">{uiCopy(regionNotice)}</p></fieldset>
      <div className="grid sm:grid-cols-2 gap-4"><div><label htmlFor={`${prefix}-when`} className="block text-sm font-medium text-gray-700 mb-2">{uiCopy("Travel Timing")}</label><Input id={`${prefix}-when`} name="travelWhen" value={travelWhen} onChange={event=>setTravelWhen(event.target.value)} maxLength={160} placeholder={country === "new-zealand" ? "Dates including year, or a flexible window" : "A month, a season, or flexible"} /></div><div><label htmlFor={`${prefix}-party`} className="block text-sm font-medium text-gray-700 mb-2">{uiCopy("Group Size")}</label><select id={`${prefix}-party`} name="partySize" value={partySize} onChange={event=>setPartySize(event.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"><option value="">{uiCopy("Still deciding")}</option><option value={"1 person"}>{uiCopy("1 person")}</option><option value={"2 people"}>{uiCopy("2 people")}</option><option value={"3–4 people"}>{uiCopy("3–4 people")}</option><option value={"5+ people"}>{uiCopy("5+ people")}</option></select></div></div>
      {country === "new-zealand" && <><p className="text-sm text-gray-500">{uiCopy("Please include the year in your timing. No dates are assumed or reserved.")}</p><PlanningQuestions key={country} prefix={prefix} answers={plan?.country === country ? plan.questionnaire : undefined} /></>}
      {country === "new-zealand" && <RoutePreferenceImport routes={[...incomingItineraries,...savedRoutes.filter(r=>!incomingItineraries.some(i=>i.input.islandId===r.input.islandId))]} onApply={draft=>{const p=routePreferences(draft);setImportedPreferences(p);setTravelWhen(routeTiming(p));setPartySize(routeParty(p));setDirty(true);setPlaceNotice("Route preferences added to this unsaved brief. Review the timing, party and separate general budget before saving.")}}/>}
      {importedPreferences&&<p className="text-sm">{uiCopy("Imported route preferences")}: {importedPreferences.currency} · {importedPreferences.departureDate?routeTiming(importedPreferences):uiCopy("{days} days, dates open",{days:importedPreferences.days})} · {importedPreferences.adults} {uiCopy("adults")} · {importedPreferences.rooms} {uiCopy("rooms/units")}. <button type="button" className="min-h-11 underline" onClick={()=>{setImportedPreferences(undefined);setDirty(true)}}>{uiCopy("Remove imported preferences")}</button></p>}
      {country === "new-zealand" && <BudgetQuestions key={`${country}-${plan?.id || "new"}`} prefix={prefix} budget={plan?.country === country ? plan.questionnaire?.budget : undefined} />}
      {country === "new-zealand" && (incomingBirds.length > 0 || incomingPlaces.length > 0 || incomingItineraries.length > 0) && <section aria-label={uiCopy("Bring ideas from this tab")} className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
        <h3 className="font-medium text-emerald-950">{uiCopy("Bring your ideas together")}</h3>
        <p className="mt-2 text-sm leading-6">{incomingBirds.length} {uiCopy(" bird choices, ")}{incomingPlaces.length} {uiCopy(" place ideas and ")}{incomingItineraries.length} {uiCopy(" itineraries are available in this tab. Add them together, or use the individual choices below.")}</p>
        <button type="button" className="mt-3 min-h-11 rounded-lg bg-emerald-800 px-4 text-sm font-medium text-white" onClick={() => {
          const merged = importPlanningIdeas({ message, birdIds, regions: selectedRegions }, { birdIds: incomingBirds, placeIds: incomingPlaces, itineraries: incomingItineraries })
          if (merged.error) { setPlaceNotice(merged.error); return }
          setMessage(merged.message);setDirty(true); setBirdIds(merged.birdIds); setSelectedRegions(merged.regions)
          setPlaceNotice("Your ideas have been added to this draft. Review your notes and choices, then Save My Draft to save privately. Nothing has been shared.")
        }}>{uiCopy("Add All Ideas to This Draft")}</button>
        <p className="mt-2 text-xs leading-6">{uiCopy("Existing notes and choices stay intact. Adding ideas does not save or share the draft. Repeating this action does not duplicate the same ideas.")}</p>
      </section>}
      {country === "new-zealand" && <section aria-labelledby={`${prefix}-birds`} className="space-y-4 rounded-xl border border-emerald-200 p-5"><h3 id={`${prefix}-birds`} className="font-medium text-emerald-950">{uiCopy("Birds you would love to see (optional)")}</h3><p className="text-sm leading-6 text-gray-600">{uiCopy("These choices join this private draft only when you save. Review the full checklist here, or bring choices from this browser tab. They are wishes, not guaranteed sightings or an itinerary.")}</p>{plan && incomingBirds.length > 0 && <button type="button" onClick={() => { setBirdIds(current => [...new Set([...current, ...incomingBirds])]);setDirty(true); setIncomingBirds([]) }} className="min-h-11 rounded-md border border-emerald-300 px-4 text-sm font-medium text-emerald-900">{uiCopy("Add ")}{incomingBirds.length} {uiCopy(" bird choices from this tab")}</button>}<NewZealandBirdPicker selected={birdIds} onChange={value=>{setBirdIds(value);setDirty(true)}} /></section>}
      {country === "new-zealand" && incomingItineraries.map(incomingItinerary=>{ const planner=islandPlanner(incomingItinerary.input.islandId||"south-island"); if(!planner)return null; return <section key={planner.context.id} aria-label={uiCopy("Itinerary from this browser tab")} className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
        <h3 className="font-medium text-emerald-950">{uiCopy("Your ")}{incomingItinerary.input.days} {uiCopy(" day ")}{planner.context.name} {uiCopy(" itinerary")}</h3>
        <p className="mt-2 text-sm leading-6">{uiCopy("Bring the daily draft, bird wishes and ")}{planner.context.name} {uiCopy(" region into this private brief. Existing notes stay intact. Review the full itinerary in your notes before saving.")}</p>
        <button type="button" className="mt-3 min-h-11 rounded-lg border border-emerald-300 bg-white px-4 text-sm font-medium text-emerald-950" onClick={()=>{
          const merged=planner.mergeTripNotes(message,incomingItinerary)
          if(merged.error){setPlaceNotice(merged.error);return}
          setMessage(merged.message);setDirty(true);setBirdIds(current=>[...new Set([...current,...incomingItinerary.input.birdIds])]);setSelectedRegions(current=>[...new Set([...current,planner.context.id])])
          setPlaceNotice("Itinerary added to your notes. Review, then Save My Draft to save privately.")
        }}>{uiCopy("Add Itinerary to Notes")}</button>
        <p className="mt-2 text-xs leading-6">{uiCopy("A draft route only. Access, road times, dates, rooms and bookings require confirmation. Importing does not save or share it.")}</p>
      </section>})}
      {country === "new-zealand" && incomingPlaces.length > 0 && <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-4" aria-label={uiCopy("Place ideas from this browser tab")}>
        <h3 className="font-medium text-emerald-950">{uiCopy("Your place ideas")}</h3>
        <p className="mt-2 text-sm">{nzPublicPlanningPlaces.filter(place => incomingPlaces.includes(place.id)).map(place => place.label).join(", ")}</p>
        <button type="button" disabled={busy} className="mt-3 min-h-11 rounded-md border border-emerald-300 bg-white px-4 text-sm font-medium text-emerald-950" onClick={() => {
          const merged = mergeNzPlaceNotes(message, incomingPlaces)
          if (merged.error) { setPlaceNotice(merged.error); return }
          setMessage(merged.message);setDirty(true); setPlaceNotice("Place ideas added to your notes below. Review them, then Save My Draft to save privately.")
        }}>{uiCopy("Add Place Ideas to Notes")}</button>
        <p className="mt-2 text-xs leading-6">{uiCopy("Adding notes does not save or share your plan. Existing notes stay intact. These are ideas to discuss, not confirmed visits or bookings.")}</p>
      </section>}
      <p role="status" className="text-sm text-emerald-800">{uiCopy(placeNotice)}</p>
      <div><label htmlFor={`${prefix}-message`} className="block text-sm font-medium text-gray-700 mb-2">{uiCopy("Your Interests and Ideas")}</label><Textarea id={`${prefix}-message`} name="message" value={message} onChange={event => setMessage(event.target.value)} maxLength={MAX_PLAN_NOTES} rows={6} placeholder={uiCopy("Birds, landscapes, photography, your preferred pace, or anything else you'd like us to know…")} /></div>
      <p className="text-sm text-gray-500">{country === "new-zealand" ? uiCopy("Optional notes: already-arranged plans, arrival/departure points, budget with currency, must-haves or practical access needs. Share only what is needed, without passport, payment or medical details. Save before leaving this page; unfinished answers are not autosaved. Sharing is a separate choice after review.") : uiCopy("Saving a draft does not request a quote or create a booking.")}</p>
      <div className="flex flex-wrap gap-3"><Button type="submit" className="bg-emerald-600 hover:bg-emerald-700"><Save className="w-4 h-4 mr-2" />{busy ? uiCopy("Saving…") : uiCopy("Save My Draft")}</Button><Button type="button" variant="outline" onClick={()=>{if(confirmDiscardPendingEdits())onCancel()}}>{uiCopy("Cancel")}</Button></div>
    </fieldset>{feedback && <p role="alert" className="text-sm text-red-700">{uiCopy(feedback)}</p>}</form>
  </CardContent></Card>
}
