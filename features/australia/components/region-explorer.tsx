"use client"

/*
 * Interactive region chooser shared by the homepage and /aves-explorer. One selected ID
 * controls the map, buttons and detail card. Text, photos and planning notes come from content/regions.ts.
 * The compact variant hides the extra directory cards, not any selectable regions.
 */

import { useHeaderLandscape } from "./header-landscape-context"
import { useRegionPreview } from "./use-region-preview"
import { useId, useState } from "react"
import Image from "next/image"
import { SiteLink as Link } from "@/features/australia/components/site-link"
import { ArrowRight, CalendarDays, MapPin } from "lucide-react"
import { AustraliaRegionMap } from "@/features/australia/components/australia-region-map"
import { Button } from "@/components/ui/button"
import { regions } from "@/features/australia/content/regions"
import { regionShortLabel } from "@/features/australia/content/region-options"
import { sitePath } from "@/features/australia/lib/site-path"

export function RegionExplorer({ compact = false, initialRegion = "queensland" }: { compact?: boolean; initialRegion?: string }) {
  // A single state value keeps map clicks, text buttons and the information card in sync.
  const [selectedRegion, setSelectedRegion] = useState(regions.some(region => region.id === initialRegion) ? initialRegion : "queensland")
  const { publish } = useHeaderLandscape()
  const preview = useRegionPreview(id=>{setSelectedRegion(id);publish({country:"australia",regionId:id})})
  const activate = (id: string) => preview.activateButton(id, sitePath(`/regions/${id}`))
  const region = regions.find(item => item.id === selectedRegion) || regions[0]
  // Unique IDs let multiple explorer instances coexist without colliding accessible labels.
  const prefix = useId()

  return <section className="bg-gradient-to-br from-blue-50 to-emerald-50 py-12 lg:py-16" aria-labelledby={`${prefix}-heading`}>
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-700">Across Australia. A whole world of birdlife.</p>
        <h2 id={`${prefix}-heading`} className="text-3xl font-bold text-gray-900 lg:text-4xl">{compact ? "Where will your curiosity take you?" : "Find your place on the map"}</h2>
        <p className="mt-4 text-lg leading-relaxed text-gray-600">Tap a state or territory to preview its birds, places and planning notes. Tap it again, or choose Explore, to open the guide.</p>
      </div>
      {/* Large text buttons offer the same choices as the map, including the smallest territories. */}
      <div className="mb-6 flex flex-wrap gap-3" role="group" aria-label="Choose Australian region">{regions.map(item => <Button key={item.id} type="button" variant={item.id === selectedRegion ? "default" : "outline"} aria-pressed={item.id === selectedRegion} aria-controls={`${prefix}-detail`} onClick={() => activate(item.id)} className={`min-h-11 rounded-lg px-4 ${item.id === selectedRegion ? "bg-emerald-600 text-white hover:bg-emerald-700" : "border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-50"}`}>{item.state}</Button>)}</div>
      <p className="sr-only" role="status" aria-live="polite">Showing {region.state}: {region.landscape}.</p>
      <div className="grid items-start gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7"><AustraliaRegionMap selectedRegion={selectedRegion} onSelectRegion={activate} /></div>
        {/* The selected region card reads one content record; its request link prefills the contact form. */}
        <article id={`${prefix}-detail`} aria-labelledby={`${prefix}-region-name`} className="overflow-hidden rounded-xl border border-emerald-100 bg-white shadow-lg lg:col-span-5">
          <figure><div className="relative aspect-[16/7]"><Image key={region.id} src={sitePath(region.image)} alt={region.alt} fill sizes="(max-width: 1023px) 100vw, 480px" className="object-cover" /></div>{region.photoCaption && <figcaption className="border-b border-emerald-100 bg-emerald-50/50 px-6 py-3 text-xs leading-relaxed text-gray-600">{region.photoCaption} <Link href="/credits" className="font-medium text-emerald-800 underline underline-offset-2">Photo credits</Link></figcaption>}</figure>
          <div className="p-6">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800"><MapPin className="h-3.5 w-3.5" aria-hidden="true" />{region.state}</p>
            <h3 id={`${prefix}-region-name`} className="text-2xl font-bold text-gray-900">{region.landscape}</h3>
            <p className="mt-3 leading-relaxed text-gray-600">{region.description}</p>
            <dl className="mt-5 space-y-3 text-sm"><div><dt className="font-semibold text-gray-900">Start your planning</dt><dd className="mt-1 leading-relaxed text-gray-600">{region.gateway}</dd></div><div><dt className="flex items-center gap-2 font-semibold text-gray-900"><CalendarDays className="h-4 w-4 text-emerald-700" aria-hidden="true" />Seasonal perspective</dt><dd className="mt-1 leading-relaxed text-gray-600">{region.season.summary}</dd></div></dl>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row"><Button asChild className="h-auto min-h-11 whitespace-normal rounded-lg bg-emerald-600 px-4 py-3 text-center hover:bg-emerald-700"><Link href={`/regions/${region.id}`}>Explore {regionShortLabel(region.id)}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></Button><Button asChild variant="outline" className="h-auto min-h-11 whitespace-normal rounded-lg border-emerald-200 px-4 py-3 text-center text-emerald-700"><Link href={`/contact?region=${region.id}`}>Discuss your trip</Link></Button></div>
          </div>
        </article>
      </div>
      {/* The standalone explorer adds a complete directory beneath the interactive selection. */}
      {!compact && <div className="mt-12"><h2 className="mb-6 text-2xl font-bold text-gray-900">Explore each region in more detail</h2><div className="grid gap-5 md:grid-cols-3">{regions.map(item => <article key={item.id} className="flex flex-col rounded-xl border border-emerald-100 bg-white p-6 shadow-md"><h3 className="text-xl font-bold text-gray-900">{item.state}</h3><p className="mt-2 text-sm font-medium text-emerald-700">{item.landscape}</p><p className="mt-4 flex-1 leading-relaxed text-gray-600">{item.planningLength}</p><Link href={`/regions/${item.id}`} className="mt-4 inline-flex min-h-11 items-center gap-2 font-medium text-emerald-700 underline-offset-4 hover:underline">Read the {regionShortLabel(item.id)} guide <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link></article>)}</div></div>}
      <div className="mt-8 flex flex-col gap-3 rounded-xl border border-emerald-100 bg-white/80 p-5 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-2xl text-sm leading-relaxed text-gray-600">Every region is open for a trip request. AVES will confirm routes, guides, availability and pricing personally before a booking. Planning an offshore island journey?</p><Link href="/contact" className="inline-flex min-h-11 shrink-0 items-center gap-2 font-semibold text-emerald-700 underline-offset-4 hover:underline">Tell us your ideas <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
    </div>
  </section>
}
