"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
import source from "@/content/world-satellite-source.json";
const Context = createContext({ satellite: false, setSatellite: (_: boolean) => {}, failed: false, setFailed: (_: boolean) => {} });
export function WorldSatelliteProvider({children}: {children: ReactNode}) {
  const [satellite, setSatellite] = useState(false);
  const [failed,setFailed] = useState(false);
  return <Context.Provider value={{satellite,setSatellite,failed,setFailed}}><div className="h-full min-h-0" data-world-satellite={satellite || undefined}>{children}</div></Context.Provider>;
}
export function WorldSatelliteControl() {
  const {satellite,setSatellite,setFailed}=useContext(Context);
  return <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 text-xs font-semibold text-emerald-950"><input type="checkbox" checked={satellite} onChange={e=>{setFailed(false);setSatellite(e.target.checked)}}/>Satellite overview · 2004</label>;
}
export function WorldSatelliteLayer() {
  const {satellite,setSatellite,setFailed}=useContext(Context);
  return satellite ? <image href={source.asset} x="0" y="0" width="1000" height="572" preserveAspectRatio="none" clipPath="url(#world-satellite-outline)" pointerEvents="none" data-map-layer="world-satellite" onError={()=>{setFailed(true);setSatellite(false)}}/> : null;
}
export function WorldSatelliteCredit() {
  const {satellite,failed}=useContext(Context);
  if(failed) return <span role="status" className="basis-full">Satellite imagery could not load. The planning map remains available.</span>;
  return satellite ? <span className="basis-full">Historical satellite composite · <a href={source.sourceUrl} target="_blank" rel="noreferrer" className="underline">NASA Blue Marble (opens in a new tab)</a> · overview, not current conditions. Zoom adds no detail.</span> : null;
}
