"use client"
import {createContext,useContext,useEffect,useState,type ReactNode} from "react"
type Preferences={lowBandwidth:boolean;setLowBandwidth:(value:boolean)=>void;storageAvailable:boolean;resolved:boolean}
const fallback:Preferences={lowBandwidth:false,setLowBandwidth(){},storageAvailable:true,resolved:true}
const Context=createContext<Preferences|null>(null)
export const useMediaPreferences=()=>useContext(Context)??fallback
export const MEDIA_PREFERENCE_KEY="aves:media-preferences:v1"
export function MediaPreferencesProvider({children}:{children:ReactNode}){
 const [lowBandwidth,setLow]=useState(false),[storageAvailable,setStorage]=useState(true),[resolved,setResolved]=useState(false)
 useEffect(()=>{
  try{const stored=localStorage.getItem(MEDIA_PREFERENCE_KEY),connection=(navigator as Navigator&{connection?:{saveData?:boolean}}).connection;setLow(stored==="light"||(stored===null&&connection?.saveData===true))}catch{setStorage(false)}finally{setResolved(true)}
 },[])
 function setLowBandwidth(value:boolean){setLow(value);try{localStorage.setItem(MEDIA_PREFERENCE_KEY,value?"light":"standard");setStorage(true)}catch{setStorage(false)}}
 return <Context.Provider value={{lowBandwidth,setLowBandwidth,storageAvailable,resolved}}>{children}</Context.Provider>
}
