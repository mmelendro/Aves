import {itinerariesGet,itinerariesPut} from "@/lib/saved-itinerary-handlers"
export const dynamic="force-dynamic"
export const GET=async(_request:Request,{params}:{params:Promise<{id:string}>})=>itinerariesGet((await params).id)
export const PUT=async(request:Request,{params}:{params:Promise<{id:string}>})=>itinerariesPut(request,(await params).id)
