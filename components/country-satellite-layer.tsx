"use client";
import { useId, type ReactNode, type CSSProperties } from "react";
import { MapLayerProvider, useMapLayers } from "./map-layer-context";
import au from "@/content/australia-satellite-source.json";
import nz from "@/content/new-zealand-satellite-source.json";
import co from "@/content/colombia-satellite-source.json";
import colombiaGeography from "@/content/colombia-geographic-map.json";
export const countrySatelliteSource = (country: string) => country === "australia" ? au : country === "new-zealand" ? nz : country === "colombia" ? co : null;
/** Uses the same layer state and geographic transform as the active country map. */
export function CountrySatelliteControl({country}: {country:string}) {
  const {layers,update}=useMapLayers();
  if(!countrySatelliteSource(country)) return null;
  return <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 text-xs font-semibold text-emerald-950"><input type="checkbox" checked={layers.background === "satellite"} onChange={e=>update({background:e.target.checked ? "satellite" : "habitats", satelliteError:""})}/>Satellite · 2004</label>;
}
export function CountrySatelliteImage({country,clip}: {country:string;clip:string}) {
  const {layers,update}=useMapLayers(),source=countrySatelliteSource(country);
  if(layers.background !== "satellite" || !source) return null;
  return <image data-map-layer={`satellite-${country}`} href={source.asset} width={source.size[0]} height={source.size[1]} x="0" y="0" clipPath={clip} pointerEvents="none" onError={()=>update({background:"habitats",satelliteError:country})}/>;
}
export function CountrySatelliteCredit({country}: {country:string}) {
  const {layers}=useMapLayers(),source=countrySatelliteSource(country);
  if(layers.satelliteError === country) return <p role="status" className="text-xs text-gray-600">Satellite imagery could not load. The planning map remains available.</p>;
  return layers.background === "satellite" && source ? <p className="mt-1 text-[10px] leading-4 text-gray-600">Satellite overview · 2004 · <a href={source.sourceUrl} target="_blank" rel="noreferrer" className="underline">NASA Blue Marble (opens in a new tab)</a>. Historical composite, not current conditions. Zoom adds no source detail.</p> : null;
}

export function CountrySatelliteGeometry({children, className, style}: {children:ReactNode;className?:string;style?:CSSProperties}) {
  const {layers}=useMapLayers();
  return <g data-country-satellite={layers.background === "satellite" || undefined} className={className} style={style}>{children}</g>;
}
function SatelliteScopeBody({children}: {children:ReactNode}) {
  const {layers}=useMapLayers();
  return <div className="contents" data-country-satellite={layers.background === "satellite" || undefined}>{children}</div>;
}
export function CountrySatelliteScope({children}: {children:ReactNode}) {
  return <MapLayerProvider><SatelliteScopeBody>{children}</SatelliteScopeBody></MapLayerProvider>;
}

/** The editorial Colombia artwork has no geographic transform. Satellite uses
 * a real country projection; native region selectors retain planning choices. */
export function ColombiaSatelliteReplacement({children}: {children:ReactNode}) {
  const {layers}=useMapLayers();
  const id=`colombia-geographic-${useId().replace(/:/g, "")}`;
  if(layers.background !== "satellite") return children;
  return <div className="flex h-full min-h-0 w-full flex-col"><svg viewBox={colombiaGeography.viewBox} role="group" aria-label="Colombia geographic satellite overview" className="min-h-0 w-full flex-1" preserveAspectRatio="xMidYMid meet">
    <defs><clipPath id={id}>{colombiaGeography.paths.map((path,i)=><path key={i} d={path} fillRule="evenodd"/>)}</clipPath></defs>
    <CountrySatelliteImage country="colombia" clip={`url(#${id})`}/>
    {colombiaGeography.paths.map((path,i)=><path key={i} d={path} fill="none" stroke="#6e9582" strokeWidth="1" vectorEffect="non-scaling-stroke"/>)}
  </svg><p className="shrink-0 px-2 text-[10px] leading-4 text-gray-600">Geographic country overview. Your planning-region choice stays in the selector; the artwork’s editorial boundaries are not geographic overlays.</p></div>;
}
