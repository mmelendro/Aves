"use client"

import dynamic from "next/dynamic"

/** The detailed land-cover geometry belongs to the South Island view. World,
 * Colombia and Australia can render without downloading that optional payload. */
const SouthIslandMap = dynamic(() => import("./south-island-ecosystem-map"), {
  loading: ({ error, retry }) => <div className="flex min-h-[28rem] w-full flex-col items-center justify-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center text-emerald-950">
    <p role={error ? "alert" : "status"} className="text-sm">{error ? "The South Island map could not load. Your place and bird choices are kept." : "Loading the South Island map. Your place and bird choices are kept."}</p>
    {error && retry && <button type="button" className="min-h-11 rounded-lg border border-emerald-700 bg-white px-4 text-sm font-medium" onClick={retry}>Try South Island Map Again</button>}
    <a href="/new-zealand/south-island" className="inline-flex min-h-11 items-center text-sm underline">Open the South Island guide</a>
  </div>,
})

export default SouthIslandMap
