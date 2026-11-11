/*
 * Reusable frame for public information, species and regional pages. Callers supply a
 * title, description, optional hero media and the page body as children. The homepage has
 * its own section composition in app/page.tsx. Discovery media uses the shared country map/photo pair; original route content stays below.
 */
import { AustraliaUnifiedExplorer } from "./australia-unified-explorer"
import { ExplorerHeader, ExplorerFooter } from "./explorer-navigation"
import type { ReactNode } from "react"
import { NavigationHeader } from "@/features/australia/components/navigation-header"
import { Footer } from "@/features/australia/components/footer"
import { AustraliaHomeExplorer } from "@/features/australia/components/australia-home-explorer"
import { PageIntroduction } from "@/components/page-introduction"

export function PageShell({ title, description, children, path = "", eyebrow = "AVES Australia", footer, media, explorerRegion }: { title: string; description: string; children: ReactNode; path?: string; eyebrow?: string; footer?: ReactNode; media?: ReactNode; explorerRegion?: string }) {
  if(explorerRegion)return <div className="min-h-screen bg-white"><ExplorerHeader/><main id="main-content" tabIndex={-1}><AustraliaUnifiedExplorer initialRegion={explorerRegion} titleStyle="birding">{children}</AustraliaUnifiedExplorer></main>{footer ?? <ExplorerFooter/>}</div>
  return <div className="min-h-screen bg-white">
    <NavigationHeader currentPage={path} />
    <main id="main-content" tabIndex={-1}>
    <PageIntroduction title={title} description={description} eyebrow={eyebrow}>
      {media && <AustraliaHomeExplorer resizable key={path} initialRegion={path.startsWith("/regions/") ? path.split("/")[2] : undefined} media={media} />}
    </PageIntroduction>
      {/* The calling route supplies editable page sections here, below the common hero. */}
      {children}
    </main>
    {/* A caller may supply a context-specific footer; otherwise use the Australian public one. */}
    {footer ?? <Footer />}
  </div>
}
