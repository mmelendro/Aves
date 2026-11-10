"use client"

import { useState } from "react"
import type { NzChecklistMedia } from "@/content/new-zealand-checklist-media"
import { sitePath } from "@/lib/site-path"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

/** Deliberately receives no selection/save callbacks. Every trigger is a non-submit button. */
export default function NewZealandChecklistPhoto({ photo, name }: { photo: NzChecklistMedia; name: string }) {
  const [failed, setFailed] = useState(false)
  const illustration = photo.kind === "illustration"
  return <Dialog>
    <DialogTrigger asChild><button type="button" aria-label={`View image and credits for ${name}`} className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-emerald-200 bg-emerald-50 text-xs text-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">
      {failed ? <span>Image unavailable</span> : <img src={sitePath(photo.asset)} alt="" width={64} height={64} loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={() => setFailed(true)} className="h-full w-full object-cover" />}
      {illustration && <span className="absolute inset-x-0 bottom-0 bg-white/90 text-[9px]">Illustration</span>}
    </button></DialogTrigger>
    <DialogContent className="max-h-[90dvh] w-[calc(100vw_-_1.5rem)] overflow-y-auto rounded-xl bg-white text-emerald-950 motion-reduce:animate-none [&>button]:min-h-11 [&>button]:min-w-11 [&>button]:grid [&>button]:place-items-center">
      <DialogTitle className="pr-8 leading-6">{name}</DialogTitle>
      <DialogDescription>Reference {illustration ? "illustration" : "photograph"} of {photo.commonName} ({photo.scientificName}). It does not establish local presence or a guaranteed sighting. Viewing it does not change or save your bird choices.</DialogDescription>
      {failed ? <p role="status" className="rounded-lg bg-emerald-50 p-6 text-sm">Image unavailable. You can still select this bird.</p> : <img src={sitePath(photo.asset)} alt={`${photo.commonName} (${photo.scientificName}) reference ${illustration ? "illustration" : "photograph"}`} loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={() => setFailed(true)} className="mx-auto max-h-[45dvh] max-w-full rounded-lg object-contain" />}
      <div className="space-y-2 break-words text-xs leading-5 text-gray-700">
        <p>Creator: {photo.credit.creator}. Location: {photo.credit.location}.</p>
        <p><a href={photo.credit.sourceUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2">{photo.credit.title}<span className="sr-only"> (source, opens in a new tab)</span></a> · <a href={photo.credit.licenseUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2">{photo.credit.license}<span className="sr-only"> (licence, opens in a new tab)</span></a></p>
        <p>{photo.credit.modifications}</p>
        <p>Checklist selection applies to the parent species. The image retains its named species or subspecies.</p>
      </div>
    </DialogContent>
  </Dialog>
}
