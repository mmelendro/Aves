"use client"

import {createContext,useContext,useState,type ReactNode} from "react"
import {defaultBirdFilters,type BirdFilters} from "@/lib/bird-conservation"
type FilterState={filters:BirdFilters;setFilters:(filters:BirdFilters)=>void}
const BirdFilterContext=createContext<FilterState|null>(null)
export function BirdFilterProvider({children}:{children:ReactNode}) {
 const [filters,setFilters]=useState<BirdFilters>(defaultBirdFilters)
 return <BirdFilterContext.Provider value={{filters,setFilters}}>{children}</BirdFilterContext.Provider>
}
/** No provider leaves editorial/server-rendered callers at their unfiltered default. */
export function useBirdFilters() { const value=useContext(BirdFilterContext); return value?.filters ? value : {filters:defaultBirdFilters,setFilters:(_filters:BirdFilters)=>{}} }
