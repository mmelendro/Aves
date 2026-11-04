import { adminQuotePatch } from "@/lib/account-handlers"
export const dynamic = "force-dynamic"
export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) { return adminQuotePatch(request, (await context.params).id) }
