"use client";
import type {Map as GeographicMap} from "leaflet";
import catalogue from "@/content/colombia-protected-areas.json";
import ProtectedAreaExplorer from "./protected-area-explorer";
const presentation={
  layerLabel:"National protected areas",title:"Colombia’s national areas",recordLabel:"Official RUNAP record",
  description:"Amber outlines show 109 national areas from RUNAP, 6 November 2026. Regional, private and provisional records are omitted. Boundaries are generalised. Check current entry rules and closures with the area’s manager.",
  credit:'Protected areas: <a href="https://runap.parquesnacionales.gov.co/cifras">PNN / RUNAP · 6 Nov 2026</a> (AVES adaptation · <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>)',
};
export default function GeographicProtectedAreas({map}:{map:GeographicMap}){
  return <ProtectedAreaExplorer map={map} catalogue={catalogue} presentation={presentation}/>;
}
