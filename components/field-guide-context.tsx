"use client"

import { createContext } from "react"
import type { GuideMapCue } from "@/lib/guide-map-cue"
export type GuidePreviewOpener = (onClose:()=>void)=>void
/** Register the mounted viewers, so previews open the real map/carousel once. */
export const FieldGuideContext = createContext<{
  mediaVisible?: boolean
  bird?:{commonName:string;image:string;imagePosition?:string}; mapCue?:GuideMapCue
  showBirds:()=>void
  openMap?:()=>void; openBirds?:()=>void
  registerMap?:(open:GuidePreviewOpener)=>()=>void
  registerBirds?:(open:GuidePreviewOpener)=>()=>void
} | null>(null)
