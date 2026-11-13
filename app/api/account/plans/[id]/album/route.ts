import {albumGet,albumPut} from "@/lib/bird-album-handlers"
export const dynamic="force-dynamic"
export const GET=async(_request:Request,{params}:{params:Promise<{id:string}>})=>albumGet((await params).id)
export const PUT=async(request:Request,{params}:{params:Promise<{id:string}>})=>albumPut(request,(await params).id)
