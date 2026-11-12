import {tripExport} from "@/lib/trip-export-handler"
export const dynamic="force-dynamic"
export async function GET(_request:Request,context:{params:Promise<{id:string}>}){return tripExport((await context.params).id)}
