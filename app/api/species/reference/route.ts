import {NextResponse} from "next/server"
import {isSpeciesCountry,searchSpeciesReference} from "@/lib/species-reference"
export function GET(request:Request){
 const params=new URL(request.url).searchParams,country=params.get("country")
 if(!isSpeciesCountry(country)||params.getAll("country").length!==1||params.getAll("q").length>1||(params.get("q")||"").length>120)return NextResponse.json({error:"Choose a known country and a shorter search."},{status:400})
 const data=searchSpeciesReference(country,new URLSearchParams({country,q:params.get("q")||""}))
 if(!data)return NextResponse.json({error:"Check your search."},{status:400})
 return NextResponse.json({results:data.results.map(b=>({id:b.id,commonName:b.commonName,scientificName:b.scientificName}))},{headers:{"Cache-Control":"public, max-age=300"}})
}
