/**
 * Reusable Colombia page frame: navigation, heading, optional hero media and footer.
 * children is the route-specific content rendered below the introduction.
 * Passing media pairs its original birds with the map below a centred heading.
 */
import DestinationExplorerPage from "./destination-explorer-page"
import WorldDestinationMap from "./world-destination-map"
import { GlobalHeader, GlobalFooter } from "./global-navigation"
import type { ReactNode } from "react"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import ColombiaHeroExplorer from "@/components/colombia-hero-explorer"
import { PageIntroduction } from "@/components/page-introduction"

export function PageShell({ title, description, children, path = "", eyebrow = "AVES Colombia", media, explorerRegion }: { title: string; description: string; children: ReactNode; path?: string; eyebrow?: string; media?: ReactNode; explorerRegion?: string }) {
  if(explorerRegion) return <div className="min-h-screen bg-white"><GlobalHeader/><main id="main-content" tabIndex={-1}><DestinationExplorerPage initialCountryId="colombia" initialRegionId={explorerRegion} titleStyle="birding" map={<WorldDestinationMap/>}>{children}</DestinationExplorerPage></main><GlobalFooter/></div>
  return <div className="min-h-screen bg-white"><NavigationHeader currentPage={path} /><main id="main-content" tabIndex={-1}>
    <PageIntroduction title={title} description={description} eyebrow={eyebrow}>
      {media && <ColombiaHeroExplorer resizable key={path} initialRegion={path.startsWith("/regions/") ? path.split("/")[2] : undefined} media={media} />}
    </PageIntroduction>{children}</main><Footer /></div>
}
