"use client";
import type { ReactNode } from "react";
import { MapLayerProvider, useMapLayers } from "./map-layer-context";
/** This control uses the document-wide background preference on every route. */
export function CountrySatelliteControl(_props: {country:string}) {
  const {layers,update}=useMapLayers();
  return <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 text-xs font-semibold text-emerald-950"><input type="checkbox" checked={layers.background === "satellite"} onChange={e=>update({background:e.target.checked ? "satellite" : "habitats"})}/>Satellite</label>;
}
export function CountrySatelliteScope({children}: {children:ReactNode}) {
  return <MapLayerProvider>{children}</MapLayerProvider>;
}
