"use client";
import type {Map as GeographicMap} from "leaflet";
import catalogue from "@/content/new-zealand-protected-areas.json";
import ProtectedAreaExplorer from "./protected-area-explorer";
const presentation={
  layerLabel:"North Island & Rakiura parks",title:"North Island & Rakiura parks",recordLabel:"DOC visitor guide",
  description:"Amber outlines show three North Island national parks and Rakiura National Park from a DOC snapshot retrieved 12 November 2026. South Island’s nine parks and conservation land remain on its regional map. Other reserves, marine areas and Te Urewera are omitted. These generalised boundaries do not establish current access, track conditions or bird presence. Follow DOC closures, permits and cultural guidance.",
  credit:'North Island / Rakiura parks: <a href="https://services1.arcgis.com/3JjYDyG3oajxU6HO/arcgis/rest/services/DOC_Public_Conservation_Land/FeatureServer/0">Crown Copyright: DOC Te Papa Atawhai 2026</a> (AVES adaptation · <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>)',
};
export default function NewZealandProtectedAreas({map}:{map:GeographicMap}){
  return <ProtectedAreaExplorer map={map} catalogue={catalogue} presentation={presentation}/>;
}
