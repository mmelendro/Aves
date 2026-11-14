import {ebirdLink} from "@/lib/ebird-link";
import EbirdAnchor from "./ebird-anchor";
/** The complete national lookup stays on the server. */
export default function EbirdLink({scientificName}:{scientificName:string}){return <EbirdAnchor scientificName={scientificName} code={ebirdLink(scientificName).code}/>;}
