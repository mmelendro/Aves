"use client"

import { createContext } from "react"
/** The expanded map can turn back to its mounted bird viewer without losing scope. */
export const FieldGuideContext = createContext<{ bird?: {commonName:string;image:string;imagePosition?:string}; showBirds:()=>void } | null>(null)
