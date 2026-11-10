import { notFound } from "next/navigation"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"
export const metadata: Metadata = { title:"AVES viewport review", robots:{index:false,follow:false} }

/** Preview-only native iframe viewports; absent from production and sitemaps. */
export default function MobileReview() {
  if (process.env.VERCEL_ENV !== "preview") notFound()
  return <main className="p-4"><h1 className="mb-3 text-lg">South Island responsive review</h1><div className="flex items-start gap-4">{[320,390,402].map(width=><section key={width}><h2 className="mb-2 text-sm">{width} × 780 CSS pixels</h2><div className="border border-emerald-200"><iframe title={`South Island at ${width} pixels`} src="/new-zealand/south-island#south-island-bird-map" width={width} height={780} className="block border-0"/></div></section>)}</div></main>
}
