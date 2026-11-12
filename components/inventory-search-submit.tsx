"use client"
import { useEffect, useState } from "react"
/** Progressive feedback only: the browser still owns native GET submission. */
export default function InventorySearchSubmit() {
  const [pending, setPending] = useState(false)
  useEffect(() => {
    const restore = () => setPending(false)
    window.addEventListener("pageshow", restore)
    return () => window.removeEventListener("pageshow", restore)
  }, [])
  return <button type="submit" aria-busy={pending} onClick={() => setPending(true)} className="min-h-11 rounded-lg bg-emerald-700 px-5 text-sm font-semibold text-white hover:bg-emerald-800">{pending ? "Searching birds…" : "Search birds"}</button>
}
