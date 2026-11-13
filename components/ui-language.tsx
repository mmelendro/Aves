"use client"
import {createContext,useCallback,useContext,useEffect,useRef,useState,type ReactNode} from "react"
import {translateUiCopy} from "@/lib/ui-copy"
type Copy=(text:string,values?:Record<string,string|number>)=>string
const Context=createContext<{copy:Copy;spanish:boolean;toggle:()=>void;busy:boolean;error:string}>({copy:(s,values)=>translateUiCopy(s,{},values),spanish:false,toggle:()=>{},busy:false,error:""})
const key="aves-ui-language"
export function UiLanguageProvider({children,scope}:{children:ReactNode;scope:"account"|"island"}){
 const [spanish,setSpanish]=useState(false),[dictionary,setDictionary]=useState<Record<string,string>>({}),[busy,setBusy]=useState(false),[error,setError]=useState(""),generation=useRef(0)
 const select=useCallback(async(es:boolean)=>{const current=++generation.current;setError("");if(!es){setSpanish(false);setBusy(false);try{sessionStorage.setItem(key,"en")}catch{};return}setBusy(true);try{const asset=scope==="account"?await import("@/content/account-ui-es.json"):await import("@/content/island-ui-es.json");if(current===generation.current){setDictionary(asset.default);setSpanish(true);try{sessionStorage.setItem(key,"es")}catch{}}}catch{if(current===generation.current)setError("Spanish could not load. Try the language button again.")}finally{if(current===generation.current)setBusy(false)}},[scope])
 useEffect(()=>{try{if(sessionStorage.getItem(key)==="es")void select(true)}catch{};return()=>{generation.current++}},[select])
 const copy:Copy=useCallback((text,values)=>translateUiCopy(text,spanish?dictionary:{},values),[spanish,dictionary])
 return <Context.Provider value={{copy,spanish,toggle:()=>void select(!spanish),busy,error}}><div lang={spanish?"es-CO":"en"}>{children}</div></Context.Provider>
}
export function UiLanguageToggle(){const {spanish,toggle,busy,error}=useContext(Context);return <div className="mx-auto flex max-w-7xl flex-wrap justify-end gap-3 px-5 py-3"><button type="button" className="inline-flex min-h-11 items-center rounded-full border border-emerald-300 bg-white px-4 text-sm text-emerald-950" disabled={busy} aria-pressed={spanish} onClick={toggle} lang={spanish?"en":"es-CO"}>{busy?"Cargando español…":spanish?"Switch to English":"Cambiar a español"}</button>{error&&<p role="status" className="text-sm">{error}</p>}</div>}
export const useUiCopy=()=>useContext(Context).copy
export function UiText({source}:{source:string}){const copy=useUiCopy();return <>{copy(source)}</>}
