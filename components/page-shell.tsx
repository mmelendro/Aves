/**
 * Reusable Colombia page frame: navigation, heading, optional hero media and footer.
 * children is the route-specific content rendered below the introduction.
 * Passing media enables the two-column desktop layout; small screens remain stacked.
 */
import type { ReactNode } from "react"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"

export function PageShell({ title, description, children, path = "", eyebrow = "AVES Colombia", media }: { title: string; description: string; children: ReactNode; path?: string; eyebrow?: string; media?: ReactNode }) {
  return <div className="min-h-screen bg-white"><NavigationHeader currentPage={path} /><main id="main-content" tabIndex={-1}>
    <section className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-8 lg:py-12">
      <div className={`container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${media ? "grid items-center gap-8 lg:grid-cols-2 lg:gap-14" : "text-center"}`}>
        <div><Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-5">🌿 {eyebrow}</Badge><h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-gray-900 mb-5">{title}</h1><p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{description}</p></div>
        {media && <div className="mx-auto w-full min-w-0 max-w-xl">{media}</div>}
      </div>
    </section>{children}</main><Footer /></div>
}
