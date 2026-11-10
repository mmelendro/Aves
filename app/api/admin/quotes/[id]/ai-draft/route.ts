import { aiDraftGet,aiDraftPost,aiDraftPatch } from "@/lib/ai-proposal-handlers"
export const dynamic="force-dynamic"
export const maxDuration=120
type Context={params:Promise<{id:string}>}
export async function GET(request:Request,context:Context){return aiDraftGet((await context.params).id,new URL(request.url).searchParams.get("check")==="1")}
export async function POST(request:Request,context:Context){return aiDraftPost(request,(await context.params).id)}
export async function PATCH(request:Request,context:Context){return aiDraftPatch(request,(await context.params).id)}
