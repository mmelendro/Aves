"use client"
import HostPhoto from "@/components/new-zealand-checklist-photo"
import type { NzChecklistMedia } from "../content/new-zealand-checklist-media"
export default function ReferencePhoto({photo,name}:{photo:NzChecklistMedia;name:string}) {
 return <HostPhoto name={name} photo={{id:photo.bird.scientificName,commonName:photo.bird.commonName,scientificName:photo.bird.scientificName,asset:photo.bird.image,kind:photo.kind || "photograph",credit:photo.credit}}/>
}
