import {mediaContent} from "@/lib/trip-media-handlers"
export const dynamic="force-dynamic"
export async function GET(request:Request,context:{params:Promise<{id:string;mediaId:string}>}){const {id,mediaId}=await context.params;return mediaContent(id,mediaId,request.headers.get("range"))}
