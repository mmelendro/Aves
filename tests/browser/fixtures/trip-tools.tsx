"use client"
import {DeleteDraft} from "@/components/account/delete-draft"
import {useState} from "react"
import dynamic from "next/dynamic"
// Match the account's deferred tools. A fixture must not make private tools
// enter shared initial chunks on otherwise unrelated public pages.
const SavedTripTools=dynamic(()=>import("@/components/account/saved-trip-tools"))
const TripPackDownload=dynamic(()=>import("@/components/account/trip-pack-download"))
import type {TripPlan} from "@/components/account/account-api"
const initial:TripPlan[]=[{id:"a13b0801-1c6d-41d4-94da-12e3adeebf13",title:"Synthetic southern journey",country:"new-zealand",regions:["south-island"],travelWhen:"January",partySize:"2",message:"Day 1: original southern itinerary",status:"draft",updatedAt:"2026-11-13T00:00:00Z"},{id:"f4fa711d-3730-49df-8c5b-bd90394b428f",title:"Synthetic northern journey",country:"new-zealand",regions:["north-island"],travelWhen:"February",partySize:"3",message:"Day 1: original northern itinerary",status:"draft",updatedAt:"2026-11-13T00:00:00Z"}]
export default function TripToolsFixture(){const [plans,setPlans]=useState(initial);const [removed,setRemoved]=useState(false),[deleted,setDeleted]=useState(false);return <main id="main-content" className="mx-auto max-w-5xl px-4 py-8"><h1 className="mb-6 text-2xl">Synthetic private trip tools</h1><SavedTripTools plans={plans} onSaved={plan=>setPlans(current=>current.map(p=>p.id===plan.id?plan:p))}/><div className="mt-8"><TripPackDownload planId={initial[0].id} preparations={removed?[]:[{id:"19603428-6cb3-4c05-b280-d873ea13d9a4",title:"Synthetic preparation",category:"Transport",done:false,dueDate:"",notes:"",url:"",arrangement:"idea",deleted:false}]} records={[]} workspaceRevision={0} recordsRevision={0} ready/></div><button onClick={()=>setRemoved(true)}>Remove synthetic preparation</button>{deleted?<p>Deleted synthetic draft</p>:<DeleteDraft plan={initial[0]} onDeleted={()=>setDeleted(true)} disabled={false}/>}</main>}
