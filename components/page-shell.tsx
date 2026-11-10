/*
 * Reusable frame for public information, species and regional pages. Callers supply a
 * title, description, optional hero media and the page body as children. The homepage has
 * its own section composition in app/page.tsx. Discovery media uses the shared country map/photo pair; original route content stays below.
 */
import { AustraliaUnifiedExplorer } from "./australia-unified-explorer"
import { ExplorerHeader, ExplorerFooter } from "./explorer-navigation"
import type { ReactNode } from "react"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { AustraliaHomeExplorer } from "@/components/australia-home-explorer"
import { Badge } from "@/components/ui/badge"

export function PageShell({ title, description, children, path = "", eyebrow = "AVES Australia", footer, media, explorerRegion }: { title: string; description: string; children: ReactNode; path?: string; eyebrow?: string; footer?: ReactNode; media?: ReactNode; explorerRegion?: string }) {
  if(explorerRegion)return <div className="min-h-screen bg-white"><ExplorerHeader/><main id="main-content" tabIndex={-1}><AustraliaUnifiedExplorer initialRegion={explorerRegion} titleStyle="birding">{children}</AustraliaUnifiedExplorer></main>{footer ?? <ExplorerFooter/>}</div>
  return <div className="min-h-screen bg-white">
    <NavigationHeader currentPage={path} />
    <main id="main-content" tabIndex={-1}>
      <section className={`bg-gradient-to-br from-emerald-50 via-white to-blue-50 ${media ? "py-6 sm:py-10 lg:py-12" : "py-12 lg:py-16"}`}>
        <div className={`container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center`}>
          <div>
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-5">🌿 {eyebrow}</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-gray-900 mb-5">{title}</h1>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{description}</p>
          </div>
          {/* Media owns its internal sizing; for example, the bird carousel keeps its narrow portrait cap. */}
          {media && <div className="mt-8"><AustraliaHomeExplorer resizable key={path} initialRegion={path.startsWith("/regions/") ? path.split("/")[2] : undefined} media={media} /></div>}
        </div>
      </section>
      {/* The calling route supplies editable page sections here, below the common hero. */}
      {children}
    </main>
    {/* A caller may supply a context-specific footer; otherwise use the Australian public one. */}
    {footer ?? <Footer />}
  </div>
}
