"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import * as Dialog from "@radix-ui/react-dialog"
import { BrandMark, type BrandCountry } from "./brand-mark"
import { Footer } from "./footer"
import { useHeaderLandscape } from "./header-landscape-context"
import { HeaderContour } from "./public-explorer/components/header-contour"
import { selectedHeaderProfile } from "./public-explorer/lib/header-landscape.mjs"
const links=[{href:"/#destinations",label:"Destinations"},{href:"/#planning",label:"How it works"},{href:"/account",label:"My Trips"}]
const linkClass="inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium text-emerald-800 hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700"
function countryName(country:string){return country==="new-zealand"?"New Zealand":country==="colombia"?"Colombia":country==="australia"?"Australia":""}
export function ExplorerHeader(){
 const {selection}=useHeaderLandscape(),country=selection?.country || "australia"
 const [open,setOpen]=useState(false)
 return <header className="fixed inset-x-0 top-0 z-50 isolate h-[108px]">
  <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:p-3">Skip to content</a>
  <HeaderContour country={country} regionId={selection?.regionId} placeId={selection?.placeId} profile={selectedHeaderProfile(country,selection?.regionId,selection?.placeId)}/>
  <div className="relative mx-auto flex max-w-7xl items-start justify-between gap-4 px-4 pt-2 sm:px-6 lg:px-8"><BrandMark country={country==="global"?undefined:country as BrandCountry} priority unifiedHeaderContour/>
   <div data-contour-navigation="true" className="mt-1"><nav aria-label="Main navigation" className="hidden items-center gap-2 sm:flex">{links.map(link=><a className={linkClass} key={link.href} href={link.href}>{link.label}</a>)}</nav>
   <Dialog.Root open={open} onOpenChange={setOpen}><Dialog.Trigger asChild><button type="button" aria-label="Open navigation menu" className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-200 bg-white text-emerald-900 sm:hidden"><Menu aria-hidden="true"/></button></Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="fixed inset-0 z-[70] bg-emerald-950/40"/><Dialog.Content className="fixed inset-x-4 top-4 z-[80] mx-auto max-w-md rounded-2xl border border-emerald-100 bg-white p-5"><div className="flex items-center justify-between"><Dialog.Title className="font-semibold text-emerald-950">AVES {countryName(country)}</Dialog.Title><Dialog.Close asChild><button type="button" aria-label="Close navigation menu" className="grid h-11 w-11 place-items-center"><X aria-hidden="true"/></button></Dialog.Close></div><Dialog.Description className="sr-only">Choose a destination, an Australian regional guide, or My Trips.</Dialog.Description><nav aria-label="Mobile navigation" className="mt-3 flex flex-col">{links.map(link=><a key={link.href} href={link.href} className={linkClass} onClick={()=>setOpen(false)}>{link.label}</a>)}</nav></Dialog.Content></Dialog.Portal></Dialog.Root></div>
  </div>
 </header>
}
export function ExplorerFooter(){
 const {selection}=useHeaderLandscape(),country=selection?.country || "australia"
 if(country==="australia")return <Footer/>
 return <footer className="bg-gray-900 px-5 py-12 text-emerald-50"><div className="mx-auto max-w-7xl"><BrandMark country={country==="global"?undefined:country as BrandCountry} inverse size="footer"/><p className="mt-3">From mountains to ocean.</p><nav aria-label="Explore destinations" className="mt-4 flex flex-wrap gap-5">{["colombia","australia","new-zealand"].map(id=><a key={id} href={`/${id}`} className="inline-flex min-h-11 items-center underline">{countryName(id)}</a>)}<a href="/account" className="inline-flex min-h-11 items-center underline">My Trips</a><a href="/australia/contact?topic=general#inquiry" className="inline-flex min-h-11 items-center underline">Contact AVES</a><a href="/australia/privacy" className="inline-flex min-h-11 items-center underline">Privacy</a></nav></div></footer>
}
