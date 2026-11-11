"use client";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

type Background = "habitats" | "satellite";
const Context = createContext<{background:Background;setBackground:(value:Background)=>void}|null>(null);
/** One public display preference survives client route changes, independent of trip/account data. */
export function MapBackgroundProvider({children}:{children:ReactNode}) {
  const [background,setValue]=useState<Background>("habitats");
  useEffect(()=>{try{if(window.sessionStorage.getItem("aves.map.background.v1")==="satellite")setValue("satellite");}catch{/* The preference still works in memory when browser storage is unavailable. */}},[]);
  const setBackground=useCallback((value:Background)=>{setValue(value);try{window.sessionStorage.setItem("aves.map.background.v1",value);}catch{/* No persistent storage is required to explore. */}},[]);
  return <Context.Provider value={{background,setBackground}}>{children}</Context.Provider>;
}
export const useMapBackground = () => useContext(Context);
