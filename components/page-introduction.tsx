import type { ReactNode } from "react"
import { Badge } from "@/components/ui/badge"

/** Shared editorial heading; map-first explorer routes keep their existing card entry. */
export function PageIntroduction({ title, description, eyebrow, children }: { title: string; description: string; eyebrow: string; children?: ReactNode }) {
  return <section data-page-introduction className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-8 sm:py-10 lg:py-12">
    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Badge className="mb-5 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">{eyebrow}</Badge>
        <h1 className="mb-5 text-3xl font-medium tracking-tight text-emerald-950 md:text-4xl lg:text-5xl">{title}</h1>
        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 lg:text-xl">{description}</p>
      </div>
      {children && <div className="mt-8">{children}</div>}
    </div>
  </section>
}
