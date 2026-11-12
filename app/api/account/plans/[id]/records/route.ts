import {recordsGet,recordsPut} from "@/lib/trip-records-handlers"
export const dynamic="force-dynamic"
export async function GET(_request:Request,context:{params:Promise<{id:string}>}){return recordsGet((await context.params).id)}
export async function PUT(request:Request,context:{params:Promise<{id:string}>}){return recordsPut(request,(await context.params).id)}
