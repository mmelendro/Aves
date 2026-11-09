import "server-only"
import { generateText, Output } from "ai"
import { z } from "zod"
import { AccountError } from "@/lib/account-errors"
import { proposalInput, proposalInstructions, type DraftSnapshot } from "@/lib/ai-proposal-input"
import { nzProposalSources, nzProposalSourceVersion } from "@/content/nz-proposal-sources"
export const proposalModel="openai/gpt-5.4-mini"
const schema=z.object({story:z.string().min(1).max(1600),stages:z.array(z.object({label:z.string().max(80),plan:z.string().max(450)})).min(1).max(10),reviewChecks:z.array(z.string().max(200)).min(1).max(12)})
/** One bounded call, hosted OIDC, no prompt logging. Privacy routing fails closed. */
export async function generateProposalDraft(snapshot:DraftSnapshot){
 try{
  const {output}=await generateText({model:proposalModel,instructions:proposalInstructions,prompt:JSON.stringify(proposalInput(snapshot)),output:Output.object({schema}),maxOutputTokens:6000,maxRetries:0,abortSignal:AbortSignal.timeout(90_000),providerOptions:{gateway:{zeroDataRetention:true,disallowPromptTraining:true}}})
  const result=schema.parse(output)
  return ["PRIVATE AVES WORKING DRAFT — UNPRICED / OWNER REVIEW REQUIRED",result.story,"FLEXIBLE ROUTE OPTIONS",...result.stages.map(s=>`${s.label}\n${s.plan}`),"CONFIRM BEFORE A FORMAL PROPOSAL",...result.reviewChecks.map(s=>`• ${s}`),`PLANNING REFERENCES — checked ${nzProposalSourceVersion}; no live inventory or rates`,...nzProposalSources.map(s=>`[${s.id}] ${s.name}: ${s.url}`),"AI-assisted notes only. AVES must verify birds, access, travel times, suppliers and costs. Nothing sent, reserved or booked."].join("\n\n")
 }catch{throw new AccountError(503,"AI drafting is unavailable or did not finish. Your request is unchanged. Check AVES AI access before retrying; attempts are limited.")}
}
