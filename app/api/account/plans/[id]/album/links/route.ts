import {albumLinksGet} from "@/lib/bird-album-handlers"
export const dynamic="force-dynamic"
export const GET=async(_request:Request,{params}:{params:Promise<{id:string}>})=>albumLinksGet((await params).id)
