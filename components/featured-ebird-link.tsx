import codes from "@/content/ebird-featured-links.json";
import EbirdAnchor from "./ebird-anchor";
export default function FeaturedEbirdLink({scientificName}:{scientificName:string}){return <EbirdAnchor scientificName={scientificName} code={(codes as Record<string,string>)[scientificName.trim()]}/>;}
