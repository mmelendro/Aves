"use client"
import {useMemo,useCallback} from "react"
import SharedBirdCarousel from "@/components/homepage-bird-carousel"
import {birdData,type BirdProfile} from "@/features/australia/content/birds"
import {sitePath} from "@/features/australia/lib/site-path"
import type {BirdProfile as SharedBird} from "@/content/birds"
type Props={className?:string;autoPlay?:boolean;autoPlayInterval?:number;birds?:BirdProfile[];showBirdPicker?:boolean;onBirdChange?:(bird:BirdProfile)=>void;fillPanel?:boolean;label?:string}
/** Australian routes use the same tested viewer as country discovery. Only local asset paths differ. */
export default function AustralianBirdCarousel({birds=birdData,onBirdChange,...props}:Props){
 const normalized=useMemo(()=>birds.map(bird=>({...bird,countryId:"australia",image:sitePath(bird.image),audioFile:bird.audioFile?sitePath(bird.audioFile):undefined,regionHref:sitePath(`/regions/${bird.regionSlug}`),audioCreditHref:sitePath("/credits"),photoCredit:{...bird.photoCredit,teamLink:bird.photoCredit.teamLink?sitePath(bird.photoCredit.teamLink):undefined}})),[birds])
 const changed=useCallback((bird:SharedBird)=>{const original=birds.find(item=>item.id===bird.id);if(original)onBirdChange?.(original)},[birds,onBirdChange])
 return <SharedBirdCarousel {...props} birds={normalized} countryId="australia" onBirdChange={changed}/>
}
