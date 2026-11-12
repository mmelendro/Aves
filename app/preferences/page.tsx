import type {Metadata} from "next"
import {GlobalHeader,GlobalFooter} from "@/components/global-navigation"
import AppPreferences from "@/components/app-preferences"
export const metadata:Metadata={title:"Display and installation preferences",alternates:{canonical:"https://aves.bio/preferences"}}
export default async function PreferencesPage({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}){
 const es=(await searchParams).lang==="es"
 return <><GlobalHeader/><main id="main-content" tabIndex={-1} lang={es?"es":"en"} className="mx-auto max-w-3xl px-4 py-10"><div className="mb-7 flex flex-wrap items-center justify-between gap-4"><h1 className="text-3xl font-medium text-emerald-950">{es?"AVES, a tu manera":"AVES, your way"}</h1><a className="inline-flex min-h-11 items-center underline" href={es?"/preferences":"/preferences?lang=es"} lang={es?"en":"es"}>{es?"English":"Español"}</a></div><AppPreferences spanish={es}/></main><GlobalFooter/></>
}
