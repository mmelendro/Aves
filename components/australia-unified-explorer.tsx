import type { ReactNode } from "react"
import DestinationExplorerPage from "./public-explorer/components/destination-explorer-page"
import WorldDestinationMap from "./public-explorer/components/world-destination-map"
import { regionOptions } from "@/content/region-options"

/** Public explorer only. Shared accounts, APIs and authenticated plans remain
 * implemented by their existing host modules and layout providers. */
export function AustraliaUnifiedExplorer({children,initialRegion,titleStyle="explore"}:{children:ReactNode;initialRegion?:string;titleStyle?:"explore"|"birding"}) {
  const region=regionOptions.some(item=>item.id===initialRegion) ? initialRegion : undefined
  return <DestinationExplorerPage initialCountryId="australia" initialRegionId={region} titleStyle={titleStyle} map={<WorldDestinationMap/>}>{children}</DestinationExplorerPage>
}
