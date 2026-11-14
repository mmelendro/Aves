"use client";
import type {Map as GeographicMap} from "leaflet";
import catalogue from "@/content/australia-protected-areas.json";
import ProtectedAreaExplorer from "./protected-area-explorer";
const presentation={
  layerLabel:"National parks · pilot",title:"Australia’s selected national parks",recordLabel:"Official CAPAD record",
  description:"Amber outlines show 13 selected national parks across the six states, ACT, NT and Jervis Bay Territory. CAPAD snapshot: 30 June 2024. This pilot omits other parks, separate marine parks, interim areas and other reserve categories. Generalised boundaries do not establish visitor access or bird presence. Check current closures, permits and cultural restrictions with park managers.",
  credit:'Selected parks: <a href="https://www.dcceew.gov.au/environment/land/nrs/science/capad/2024">CAPAD 2024 · Commonwealth of Australia 2025</a> (AVES adaptation · <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>)',
};
export default function AustraliaProtectedAreas({map}:{map:GeographicMap}){
  return <ProtectedAreaExplorer countryId="australia" map={map} catalogue={catalogue} presentation={presentation}/>;
}
