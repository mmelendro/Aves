/** Existing owner-only proposal helper. Preserve authentication, database ownership,
 * request limits and explicit user initiation. No generation runs during site review. */
import "server-only"
import { generateText, Output, gateway } from "ai"
import { z } from "zod"
import { AccountError } from "@/lib/account-errors"
import { proposalInput, proposalInstructions, type DraftSnapshot } from "@/lib/ai-proposal-input"
import { nzProposalSources, nzProposalSourceVersion } from "@/content/nz-proposal-sources"
export const proposalModel="openai/gpt-5.4-mini"
const schema=z.object({story:z.string().min(1).max(1600),stages:z.array(z.object({label:z.string().max(80),plan:z.string().max(450)})).min(1).max(10),reviewChecks:z.array(z.string().max(200)).min(1).max(12)})
/** Safe, owner-visible diagnostics: never return raw provider messages or bodies. */
function failureHint(error: unknown): string {
 const e=error as {type?:string;statusCode?:number;name?:string}
 if(e?.type==="authentication_error"||e?.statusCode===401)return "AI Gateway authentication is not accepted for this deployment."
 if(e?.statusCode===402)return "AI Gateway needs credit or account verification. No billing change has been made."
 if(e?.statusCode===403)return "AI Gateway denied access. Check team verification and model/privacy permissions."
 if(e?.statusCode===429)return "AI Gateway is temporarily rate limited."
 if(e?.type==="invalid_request_error"||e?.statusCode===400)return "AI Gateway rejected the model request or privacy configuration."
 if(e?.name==="ZodError"||e?.name==="AI_NoObjectGeneratedError")return "The model response did not pass draft validation."
 if(e?.name==="TimeoutError"||e?.name==="AbortError")return "The AI request timed out."
 return "The model or its provider did not finish successfully."
}
export async function checkAiConnection(){
 try{
  const credits=await gateway.getCredits()
  return Number(credits.balance)>0?"AI Gateway authentication and credit check passed. Model generation still needs verification.":"AI Gateway authentication passed, but its available credit balance is zero. No billing change has been made."
 }catch(error){return failureHint(error)}
}
/** One bounded call, hosted OIDC, no prompt logging. Privacy routing fails closed. */
export async function generateProposalDraft(snapshot:DraftSnapshot){
 try{
  const {output}=await generateText({model:proposalModel,instructions:proposalInstructions,prompt:JSON.stringify(proposalInput(snapshot)),output:Output.object({schema}),maxOutputTokens:6000,maxRetries:0,abortSignal:AbortSignal.timeout(90_000),providerOptions:{gateway:{zeroDataRetention:true,disallowPromptTraining:true}}})
  const result=schema.parse(output)
  return ["PRIVATE AVES WORKING DRAFT — UNPRICED / OWNER REVIEW REQUIRED",result.story,"FLEXIBLE ROUTE OPTIONS",...result.stages.map(s=>`${s.label}\n${s.plan}`),"CONFIRM BEFORE A FORMAL PROPOSAL",...result.reviewChecks.map(s=>`• ${s}`),`PLANNING REFERENCES — checked ${nzProposalSourceVersion}; no live inventory or rates`,...nzProposalSources.map(s=>`[${s.id}] ${s.name}: ${s.url}`),"AI-assisted notes only. AVES must verify birds, access, travel times, suppliers and costs. Nothing sent, reserved or booked."].join("\n\n")
 }catch(error){throw new AccountError(503,`${failureHint(error)} Your request is unchanged; attempts are limited.`)}
}
