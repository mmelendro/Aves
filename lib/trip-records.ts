/** Private owner-entered practical records, separate from a submitted planning brief. */
import {z} from "zod"
import {privateReferenceUrl,preparationCategories} from "./trip-workspace"
export const recordCurrencies=["AUD","CAD","COP","EUR","GBP","NZD","USD","JPY"] as const
export type RecordCurrency=typeof recordCurrencies[number]
export const expenseStates=["estimated","paid","refunded"] as const
export const bookingStates=["idea","requested","provisional","confirmed","cancelled"] as const
const text=(max:number)=>z.string().max(max).refine(t=>!/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(t))
const common={id:z.uuid(),title:text(160).trim().min(1),category:z.enum(preparationCategories),date:z.union([z.iso.date(),z.literal("")]),notes:text(1000),url:privateReferenceUrl,entryId:z.union([z.uuid(),z.literal("")]),deleted:z.boolean()}
export const expenseRecordSchema=z.object({...common,kind:z.literal("expense"),amountMinor:z.number().int().min(0).max(1_000_000_000),currency:z.enum(recordCurrencies),status:z.enum(expenseStates)}).strict()
export const bookingRecordSchema=z.object({...common,kind:z.literal("booking"),provider:text(160),reference:text(160),status:z.enum(bookingStates)}).strict()
export const travelRecordSchema=z.discriminatedUnion("kind",[expenseRecordSchema,bookingRecordSchema])
export const recordsSchema=z.object({version:z.literal(1),records:z.array(travelRecordSchema).max(50)}).strict()
 .refine(v=>new Set(v.records.map(r=>r.id)).size===v.records.length,"Each record needs its own reference")
 .refine(v=>new TextEncoder().encode(JSON.stringify(v)).length<=24000,"These travel records are full. Shorten notes before saving.")
export const recordsWriteSchema=z.object({expectedRevision:z.number().int().min(0).max(2147483646),data:recordsSchema}).strict()
export const recordsReceiptSchema=z.object({revision:z.number().int().min(0).max(2147483647),data:recordsSchema}).strict()
export type TravelRecord=z.infer<typeof travelRecordSchema>
export type TravelRecords=z.infer<typeof recordsSchema>
export const emptyTravelRecords=():TravelRecords=>({version:1,records:[]})
export function currencyDigits(currency:RecordCurrency){return currency==="JPY"?0:2}
/** Decimal text becomes integer minor units without binary rounding or implicit blank-to-zero. */
export function parseRecordAmount(value:string,currency:RecordCurrency):number|null{
 const digits=currencyDigits(currency),pattern=digits?/^\d+(?:\.\d{1,2})?$/:/^\d+$/
 if(!pattern.test(value))return null
 const [whole,fraction=""]=value.split("."),amount=Number(whole)*10**digits+Number(fraction.padEnd(digits,"0"))
 return Number.isSafeInteger(amount)&&amount<=1_000_000_000?amount:null
}
export function recordAmountText(amount:number,currency:RecordCurrency){return (amount/10**currencyDigits(currency)).toFixed(currencyDigits(currency))}
export function recordMoney(amount:number,currency:RecordCurrency){return new Intl.NumberFormat("en-AU",{style:"currency",currency,currencyDisplay:"code"}).format(amount/10**currencyDigits(currency))}
export function expenseTotals(records:TravelRecord[]){
 const groups=new Map<RecordCurrency,{currency:RecordCurrency;estimated:number;paid:number;refunded:number}>()
 for(const r of records){if(r.deleted||r.kind!=="expense")continue;const g=groups.get(r.currency)||{currency:r.currency,estimated:0,paid:0,refunded:0};g[r.status]+=r.amountMinor;groups.set(r.currency,g)}
 return [...groups.values()].sort((a,b)=>a.currency.localeCompare(b.currency))
}
export function newTravelRecord(kind:TravelRecord["kind"],id:string,title:string):TravelRecord{
 const base={id,title,category:"Other" as const,date:"",notes:"",url:"",entryId:"",deleted:false}
 return kind==="expense"?{...base,kind,amountMinor:0,currency:"NZD",status:"estimated"}:{...base,kind,provider:"",reference:"",status:"idea"}
}
