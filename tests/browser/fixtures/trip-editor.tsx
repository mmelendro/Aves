"use client"
import { useState } from "react"
import { TripPlanEditor } from "@/components/account/trip-plan-editor"
import type { TripPlan } from "@/components/account/account-api"
// Only copied into a throwaway CI build. This file is not an application route.
export default function SyntheticTripEditor() {
  const [saved, setSaved] = useState<TripPlan | null>(null)
  return <main>{saved ? <section><h1>Confirmed synthetic draft</h1><p>{saved.title}</p><p>{saved.message}</p></section> : <TripPlanEditor initial={{country: "new-zealand", regions: ["north-island"]}} onSaved={setSaved} onCancel={() => {}} />}</main>
}
