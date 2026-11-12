"use client"

import dynamic from "next/dynamic"

/** The world view needs no country geometry. The native region selector below
 * remains available while this optional map loads or is retried. */
const CountryMap = dynamic(() => import("./destination-regional-map"), {
  loading: ({ error, retry }) => <div className="flex min-h-96 w-full flex-col items-center justify-center gap-3 rounded-xl bg-emerald-50 p-5 text-center text-emerald-950">
    <p role={error ? "alert" : "status"} className="text-sm">{error ? "The regional map could not load. Choose a region using the selector below." : "Loading the regional map. You can also use the region selector below."}</p>
    {error && retry && <button type="button" className="min-h-11 rounded border border-emerald-700 bg-white px-4 text-sm" onClick={retry}>Try Regional Map Again</button>}
  </div>,
})

export default CountryMap
