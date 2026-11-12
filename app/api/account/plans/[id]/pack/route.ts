import {tripPack} from "@/lib/trip-pack-handler"
export const dynamic="force-dynamic"
export async function POST(request:Request,{params}:{params:Promise<{id:string}>}){return tripPack(request,(await params).id)}
