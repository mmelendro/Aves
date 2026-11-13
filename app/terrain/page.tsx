import {NavigationHeader} from "@/components/navigation-header"
import {Footer} from "@/components/footer"
import {PageIntroduction} from "@/components/page-introduction"
import TerrainPreview from "@/components/terrain-preview"
import {publicMetadata} from "@/lib/public-metadata"
export const metadata=publicMetadata({title:"Explore the landscape in 3D | AVES",description:"An optional lightweight terrain preview, with the shared AVES planning map always available.",alternates:{canonical:"https://aves.bio/terrain"}})
export default function TerrainPage(){return <><NavigationHeader/><main id="main-content" tabIndex={-1} className="mx-auto max-w-5xl px-5 pt-28 pb-16"><PageIntroduction title="See the shape of the landscape" description="An optional terrain preview for your next journey."/><TerrainPreview/></main><Footer/></>}
