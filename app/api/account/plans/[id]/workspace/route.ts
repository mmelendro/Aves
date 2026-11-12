import {workspaceGet,workspacePut} from "@/lib/trip-workspace-handlers"
export const dynamic="force-dynamic"
type Context={params:Promise<{id:string}>}
export async function GET(_request:Request,context:Context){return workspaceGet((await context.params).id)}
export async function PUT(request:Request,context:Context){return workspacePut(request,(await context.params).id)}
