"use client";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Background = "habitats" | "satellite" | "roads" | "topographic";
const Context = createContext<{background:Background;setBackground:(value:Background)=>void;expanded:boolean;setExpanded:(value:boolean)=>void}|null>(null);
/** One public display preference survives client route changes, independent of trip/account data. */
export function MapBackgroundProvider({children}:{children:ReactNode}) {
  const [background,setValue]=useState<Background>("habitats");
  const [expanded,setExpandedValue]=useState(false);
  useEffect(()=>{try{const value=window.sessionStorage.getItem("aves.map.background.v1");if(value==='satellite'||value==='roads'||value==='topographic')setValue(value);setExpandedValue(window.sessionStorage.getItem('aves.map.expanded.v1')==='true');}catch{/* Display still works in memory. */}},[]);
  const setBackground=useCallback((value:Background)=>{setValue(value);try{window.sessionStorage.setItem("aves.map.background.v1",value);}catch{/* No persistent storage is required to explore. */}},[]);
  const setExpanded=useCallback((value:boolean)=>{setExpandedValue(value);try{window.sessionStorage.setItem('aves.map.expanded.v1',String(value))}catch{/* Memory-only preference. */}},[]);
  return <Context.Provider value={{background,setBackground,expanded,setExpanded}}>{children}</Context.Provider>;
}
export const useMapBackground = () => useContext(Context);
