import type {Metadata} from "next"
import {redirect} from "next/navigation"
import {getAccountUser} from "@/lib/account-auth"
import {AccountShell} from "@/components/account/account-shell"
import {accountEntryHref} from "@/components/account/account-navigation"
import {UiText} from "@/components/ui-copy-context"
import PrivateBirdCollection from "@/components/account/bird-collection"
export const dynamic="force-dynamic"
export const metadata:Metadata={title:"Your private bird collection",robots:{index:false,follow:false}}
export default async function CollectionPage(){
 if(!await getAccountUser())redirect(accountEntryHref("/account/sign-in","/account/collection"))
 return <AccountShell title="Your bird collection" description="Your wishes, observations and linked photos across trips. Private to you."><a href="/account" className="mb-6 inline-flex min-h-11 items-center underline text-emerald-800"><UiText source="Back to My Trips"/></a><PrivateBirdCollection/></AccountShell>
}
