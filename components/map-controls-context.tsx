"use client"
import {createContext,useContext} from "react"
export type MapZoomControls={zoomIn:()=>void;zoomOut:()=>void;reset:()=>void}
export const MapControlsContext=createContext<((controls:MapZoomControls)=>()=>void)|null>(null)
export const useMapControlsRegistration=()=>useContext(MapControlsContext)
