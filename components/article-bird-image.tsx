"use client"
import Image from "next/image"
import Link from "next/link"
interface EnhancedBirdImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  photographer: string;
  guide: string;
  guideLink: string;
  location: string;
  locationLink: string;
  species: {
    commonName: string;
    spanishName?: string;
    scientificName: string;
    conservation?: string;
  };
  ebirdUrl: string;
  regions: string[];
  ecosystems: string[];
  className?: string;
  aspectRatio?: string;
  imagePosition?: string;
}

export default function EnhancedBirdImage({src,alt,width,height,photographer,guide,guideLink,location,locationLink,species,ebirdUrl,regions,ecosystems,className="",aspectRatio="4/3",imagePosition="center"}:EnhancedBirdImageProps){
 function escape(event:React.KeyboardEvent<HTMLDetailsElement>){if(event.key==="Escape"){event.currentTarget.open=false;event.currentTarget.querySelector("summary")?.focus()}}
 return <figure className={`overflow-hidden rounded-xl border border-emerald-100 bg-white shadow-lg ${className}`}>
  <div className="overflow-hidden" style={{aspectRatio}}><Image src={src||"/placeholder.svg"} alt={alt} width={width} height={height} className="h-full w-full object-cover" style={{objectPosition:imagePosition}}/></div>
  <figcaption className="px-4 py-2 text-xs leading-6 text-gray-600">Photo by {photographer}. {species.commonName} · <i>{species.scientificName}</i></figcaption>
  <details onKeyDown={escape} className="border-t border-emerald-100 px-4"><summary className="flex min-h-11 cursor-pointer items-center text-sm font-medium text-emerald-900">Photo credit and location</summary><div className="space-y-2 pb-4 text-sm leading-6 text-gray-700"><p>Photo by {photographer}</p>{guide&&<p>Guide credited in this story: <Link href={guideLink} className="inline-flex min-h-11 items-center text-emerald-800 underline">{guide}</Link></p>}{location&&<p>Location: <Link href={locationLink} className="inline-flex min-h-11 items-center text-emerald-800 underline">{location}</Link></p>}<p>Story credits refer to this image or past trip. They do not establish a current AVES appointment or permission to reuse the photograph.</p></div></details>
  <details onKeyDown={escape} className="border-t border-emerald-100 px-4"><summary className="flex min-h-11 cursor-pointer items-center text-sm font-medium text-emerald-900">Bird information</summary><div className="space-y-3 pb-4 text-sm leading-6 text-gray-700"><h3 className="text-lg font-medium text-emerald-950">{species.commonName}</h3>{species.spanishName&&<p>{species.spanishName}</p>}<p><i>{species.scientificName}</i></p><Link href={ebirdUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-emerald-800 underline">View the species on eBird</Link><p>Regions described in this article: {regions.join(", ")}</p><p>Habitats: {ecosystems.join(", ")}</p>{species.conservation&&<p>Conservation status stated in this article: {species.conservation}. Check the species source for current assessment.</p>}</div></details>
 </figure>
}
