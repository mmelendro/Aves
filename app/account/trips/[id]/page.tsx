import type {Metadata} from "next"
import {notFound,redirect} from "next/navigation"
import {z} from "zod"
import {requireAccountUser} from "@/lib/account-auth"
import {AccountError} from "@/lib/account-errors"
import {AccountShell} from "@/components/account/account-shell"
import {UiText} from "@/components/ui-copy-context"
import {TripWorkspace} from "@/components/account/trip-workspace"
import {isKnownTripCountry} from "@/content/trip-options"
export const dynamic="force-dynamic"
export const metadata:Metadata={title:"Your private trip workspace",robots:{index:false,follow:false}}
export default async function TripWorkspacePage({params}:{params:Promise<{id:string}>}){
  const {id}=await params
  if(!z.uuid().safeParse(id).success)notFound()
  let account
  try{account=await requireAccountUser()}catch(error){if(error instanceof AccountError&&(error.status===401||error.status===403))redirect(`/account/sign-in?${new URLSearchParams({next:`/account/trips/${id}`})}`);throw error}
  const {data,error}=await account.client.from("trip_plans").select("title,details").eq("id",id).eq("user_id",account.user.id).maybeSingle()
  if(error)throw new Error("Your trip could not be loaded. Please try again.")
  if(!data)notFound()
  const country=data.details?.country??"australia"
  if(!isKnownTripCountry(country))notFound()
  return <AccountShell privateTitle title={data.title} description="Your private preparations and travel journal. Save what matters, then return to your journey."><a href="/account" className="mb-6 inline-flex min-h-11 items-center text-emerald-800 underline"><UiText source="Back to My Trips"/></a><TripWorkspace key={id} planId={id} country={country}/></AccountShell>
}
