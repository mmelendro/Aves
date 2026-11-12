import {mediaGet,mediaPost} from "@/lib/trip-media-handlers"
export const dynamic="force-dynamic"
type Context={params:Promise<{id:string}>}
export async function GET(_request:Request,context:Context){return mediaGet((await context.params).id)}
export async function POST(request:Request,context:Context){return mediaPost(request,(await context.params).id)}
