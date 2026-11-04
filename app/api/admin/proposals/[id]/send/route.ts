import { proposalSend } from "@/lib/account-handlers"
export const dynamic = "force-dynamic"
export const maxDuration = 30
export async function POST(request: Request, context: { params: Promise<{ id: string }> }) { return proposalSend(request, (await context.params).id) }
