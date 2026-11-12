import {mediaPatch,mediaDelete} from "@/lib/trip-media-handlers"
export const dynamic="force-dynamic"
type Context={params:Promise<{id:string;mediaId:string}>}
export async function PATCH(request:Request,context:Context){const {id,mediaId}=await context.params;return mediaPatch(request,id,mediaId)}
export async function DELETE(request:Request,context:Context){const {id,mediaId}=await context.params;return mediaDelete(request,id,mediaId)}
