export default function EbirdAnchor({scientificName,code}:{scientificName:string;code?:string}){
 const url=code?`https://ebird.org/species/${code}`:`https://www.google.com/search?q=${encodeURIComponent('site:ebird.org/species/ "'+scientificName+'"')}`;
 const label=code?"eBird":"Find on eBird";
 return <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-xs text-emerald-800 underline underline-offset-4" aria-label={`${label}: ${scientificName} (opens in a new tab)`}>{label} ↗</a>;
}
