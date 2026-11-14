"use client"

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"
import { usePathname } from "next/navigation"

/** Public display state only. Stable geographic IDs can be reused by a future app. */
export type HeaderLandscapeSelection = { country: string; regionId?: string; placeId?: string }
const noop: (selection: HeaderLandscapeSelection) => void = () => {}
const Context = createContext<{ selection: HeaderLandscapeSelection | null; publish: (selection: HeaderLandscapeSelection) => void }>({selection:null,publish:noop})

export function HeaderLandscapeProvider({children}:{children:ReactNode}) {
  const path = usePathname()
  const [preview,setPreview] = useState<{path:string|null;selection:HeaderLandscapeSelection}|null>(null)
  const publish = useCallback((selection:HeaderLandscapeSelection)=>setPreview({path,selection}),[path])
  const selection = preview?.path === path ? preview.selection : null
  const value = useMemo(()=>({selection,publish}),[selection,publish])
  return <Context.Provider value={value}>{children}</Context.Provider>
}
export function useHeaderLandscape(){ return useContext(Context) }
