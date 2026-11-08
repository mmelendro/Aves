"use client"
import { createContext, useContext, type ReactNode, type CSSProperties } from "react"

const PreviewContext = createContext(false)
export const useReadOnlyPreview = () => useContext(PreviewContext)

/** Explicitly separate website review from real trip/account actions. */
export function PreviewModeProvider({ readOnly, children }: { readOnly: boolean; children: ReactNode }) {
  return <PreviewContext.Provider value={readOnly}>
    {readOnly && <aside aria-label="Preview notice" className="sticky top-0 z-[60] flex h-16 items-center justify-center border-b border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm text-amber-950">
      <p>Preview. Sign-in, saving and sending are disabled. <a href="https://aves.bio/" className="font-semibold underline">Use live AVES.</a></p>
    </aside>}
    <div style={readOnly ? { "--aves-preview-offset": "64px" } as CSSProperties : undefined}>{children}</div>
  </PreviewContext.Provider>
}
