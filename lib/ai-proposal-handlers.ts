import "server-only"
import { z } from "zod"
import { requireAccountUser } from "@/lib/account-auth"
import { accountBody, accountHandler } from "@/lib/account-http"
import { accountRpc } from "@/lib/account-service"
import { AccountError } from "@/lib/account-errors"
import { generateProposalDraft } from "@/lib/ai-proposal-generator"
import type { DraftSnapshot } from "@/lib/ai-proposal-input"
export type AiDraft={text:string;updatedAt:string;generatedAt:string;model:string}
type State={snapshot:DraftSnapshot;draft:AiDraft|null;generationToken:string|null}
function requestId(id:string){if(!z.uuid().safeParse(id).success)throw new AccountError(404,"This item could not be found.");return id}
export const aiDraftGet=(id:string)=>accountHandler(async()=>{
 const {user}=await requireAccountUser()
 const state=await accountRpc<State>("admin_ai_draft",{p_admin_user_id:user.id,p_request_id:requestId(id)})
 return {draft:state.draft}
})
export const aiDraftPost=(request:Request,id:string)=>accountHandler(async()=>{
 const {user}=await requireAccountUser();await accountBody(request,z.object({}).strict())
 const args={p_admin_user_id:user.id,p_request_id:requestId(id)}
 // DB owner check, request lock and persistent attempt limit precede inference.
 const state=await accountRpc<State>("admin_ai_draft",{...args,p_action:"begin"})
 if(state.draft)return {draft:state.draft}
 if(!state.generationToken)throw new AccountError(409,"Draft generation is already running. Reopen it shortly.")
 try{
  const text=await generateProposalDraft(state.snapshot)
  const saved=await accountRpc<State>("admin_ai_draft",{...args,p_action:"complete",p_generation_id:state.generationToken,p_body:text})
  if(!saved.draft)throw new AccountError(503,"We couldn't confirm the draft was saved. Reopen it before retrying.")
  return {draft:saved.draft}
 }catch(error){await accountRpc("admin_ai_draft",{...args,p_action:"fail",p_generation_id:state.generationToken}).catch(()=>{});throw error}
})
export const aiDraftPatch=(request:Request,id:string)=>accountHandler(async()=>{
 const {user}=await requireAccountUser()
 const body=await accountBody(request,z.object({text:z.string().trim().min(1).max(16000),expectedUpdatedAt:z.string().datetime({offset:true})}).strict())
 const saved=await accountRpc<State>("admin_ai_draft",{p_admin_user_id:user.id,p_request_id:requestId(id),p_action:"save",p_body:body.text,p_expected_updated_at:body.expectedUpdatedAt})
 return {draft:saved.draft}
})
