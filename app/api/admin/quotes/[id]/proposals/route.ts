import { proposalPost } from "@/lib/account-handlers"
export const dynamic = "force-dynamic"
export async function POST(request: Request, context: { params: Promise<{ id: string }> }) { return proposalPost(request, (await context.params).id) }
