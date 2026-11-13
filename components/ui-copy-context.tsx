"use client"
import {createContext,useContext} from "react"
export type UiCopy=(text:string,values?:Record<string,string|number>)=>string
const identity:UiCopy=(text,values={})=>{for(const [key,value] of Object.entries(values))text=text.replaceAll(`{${key}}`,String(value));return text}
export const UiCopyContext=createContext<{copy:UiCopy;spanish:boolean;toggle:()=>void;busy:boolean;error:string}>({copy:identity,spanish:false,toggle:()=>{},busy:false,error:""})
export const useUiCopy=()=>useContext(UiCopyContext).copy
export function UiText({source}:{source:string}){const copy=useUiCopy();return <>{copy(source)}</>}
