"use client"
import {useState} from "react"
import SavedTripTools from "@/components/account/saved-trip-tools"
import TripPackDownload from "@/components/account/trip-pack-download"
import type {TripPlan} from "@/components/account/account-api"
const initial:TripPlan[]=[{id:"a13b0801-1c6d-41d4-94da-12e3adeebf13",title:"Synthetic southern journey",country:"new-zealand",regions:["south-island"],travelWhen:"January",partySize:"2",message:"Day 1: original southern itinerary",status:"draft",updatedAt:"2026-11-13T00:00:00Z"},{id:"f4fa711d-3730-49df-8c5b-bd90394b428f",title:"Synthetic northern journey",country:"new-zealand",regions:["north-island"],travelWhen:"February",partySize:"3",message:"Day 1: original northern itinerary",status:"draft",updatedAt:"2026-11-13T00:00:00Z"}]
export default function TripToolsFixture(){const [plans,setPlans]=useState(initial);return <main id="main-content" className="mx-auto max-w-5xl px-4 py-8"><h1 className="mb-6 text-2xl">Synthetic private trip tools</h1><SavedTripTools plans={plans} onSaved={plan=>setPlans(current=>current.map(p=>p.id===plan.id?plan:p))}/><div className="mt-8"><TripPackDownload planId={initial[0].id} preparations={[]} records={[]} workspaceRevision={0} recordsRevision={0} ready/></div></main>}
