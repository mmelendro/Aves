"use client"

import { useRef, useState } from "react"
import Image from "./responsive-photo"
import { Portal as HoverCardPortal } from "@radix-ui/react-hover-card"
import type { NzChecklistMedia } from "@/content/new-zealand-checklist-media"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

function Photograph({ photo }: { photo: NzChecklistMedia }) {
  const [failed, setFailed] = useState(false)
  return failed
    ? <p role="status" className="rounded-lg bg-emerald-50 p-6 text-sm text-emerald-950">Image unavailable. You can still select this bird.</p>
    : <Image src={photo.bird.image} width={1600} height={1200} sizes="(max-width: 767px) 90vw, 640px" alt={`${photo.bird.commonName} (${photo.bird.scientificName}) reference ${photo.kind === "illustration" ? "illustration" : "photograph"}`} loading="lazy" decoding="async" onError={() => setFailed(true)} className="max-h-[45dvh] h-auto w-full rounded-lg object-contain" />
}

/** Hover/focus is a quick look; the independent button opens a keyboard/touch
 * dialog with complete provenance. Neither path receives a selection callback.
 */
export default function NewZealandChecklistPhoto({ photo, name }: { photo: NzChecklistMedia; name: string }) {
  const [thumbnailFailed, setThumbnailFailed] = useState(false)
  const [quickLook, setQuickLook] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const dismissUntilExit = useRef(false)
  return <Dialog open={expanded} onOpenChange={setExpanded}>
    <HoverCard open={quickLook && !expanded} onOpenChange={open => { if (!open || !dismissUntilExit.current) setQuickLook(open) }} openDelay={250} closeDelay={200}>
      <HoverCardTrigger asChild>
        <DialogTrigger asChild>
          <button type="button" onBlur={() => { dismissUntilExit.current = false }} onPointerLeave={() => { dismissUntilExit.current = false }} onClick={() => setQuickLook(false)} aria-label={`View image and credits for ${name}`} className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-emerald-200 bg-emerald-50 text-xs text-emerald-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">
            {thumbnailFailed ? <span>Image unavailable</span> : <Image src={photo.bird.image} alt="" width={64} height={64} loading="lazy" sizes="64px" decoding="async" onError={() => setThumbnailFailed(true)} className="h-full w-full object-cover" />}
            {photo.kind === "illustration" && <span className="absolute inset-x-0 bottom-0 bg-white/90 text-[9px]">Illustration</span>}
          </button>
        </DialogTrigger>
      </HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent side="top" align="end" collisionPadding={12} className="w-72 max-w-[calc(100vw_-_1.5rem)] max-h-[var(--radix-hover-card-content-available-height)] overflow-y-auto bg-white text-emerald-950 motion-reduce:animate-none" onEscapeKeyDown={() => { dismissUntilExit.current = true; setQuickLook(false) }}>
          <Photograph photo={photo} />
          <p className="mt-2 text-sm font-medium">{photo.bird.commonName}</p>
          <p className="mt-1 text-xs">Image: {photo.credit.creator} · {photo.credit.license}</p>
          <p className="mt-1 text-xs text-gray-600">Open the image for its source and full credits.</p>
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCard>
    <DialogContent onCloseAutoFocus={() => { dismissUntilExit.current = true; setQuickLook(false) }} className="max-h-[90dvh] w-[calc(100vw_-_1.5rem)] overflow-y-auto rounded-xl bg-white text-emerald-950 motion-reduce:animate-none [&>button]:min-h-11 [&>button]:min-w-11 [&>button]:grid [&>button]:place-items-center">
      <DialogTitle className="pr-8 leading-6">{name}</DialogTitle>
      <DialogDescription>Reference {photo.kind === "illustration" ? "illustration" : "photograph"} of {photo.bird.commonName} ({photo.bird.scientificName}). It does not establish local presence or a guaranteed sighting.</DialogDescription>
      <Photograph photo={photo} />
      <div className="space-y-2 break-words text-xs leading-5 text-gray-700">
        <p>Creator: {photo.credit.creator}. Location: {photo.credit.location}.</p>
        <p><a href={photo.credit.sourceUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2">{photo.credit.title}<span className="sr-only"> (source, opens in a new tab)</span></a> · <a href={photo.credit.licenseUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2">{photo.credit.license}<span className="sr-only"> (licence, opens in a new tab)</span></a></p>
        <p>{photo.credit.modifications}</p>
        <p>Checklist selection applies to the parent species. The image retains its named species or subspecies.</p>
      </div>
    </DialogContent>
  </Dialog>
}
