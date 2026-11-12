import {z} from "zod"
export const MAX_TRIP_MEDIA_BYTES=3*1024*1024
export const TRIP_MEDIA_BUCKET="trip-journal-private"
export const mediaTypes={"image/jpeg":{kind:"photo",extension:"jpg"},"image/png":{kind:"photo",extension:"png"},"image/webp":{kind:"photo",extension:"webp"},"audio/mpeg":{kind:"audio",extension:"mp3"},"audio/mp4":{kind:"audio",extension:"m4a"},"audio/wav":{kind:"audio",extension:"wav"},"audio/ogg":{kind:"audio",extension:"ogg"},"audio/webm":{kind:"audio",extension:"webm"}} as const
export type TripMediaMime=keyof typeof mediaTypes
export function mediaSignature(bytes:Uint8Array):TripMediaMime|null{
  const a=(offset:number,text:string)=>[...text].every((c,i)=>bytes[offset+i]===c.charCodeAt(0))
  if(bytes.length<12)return null
  if(bytes[0]===255&&bytes[1]===216&&bytes[2]===255&&bytes.at(-2)===255&&bytes.at(-1)===217)return "image/jpeg"
  if(bytes[0]===137&&a(1,"PNG\r\n\x1a\n"))return "image/png"
  if(a(0,"RIFF")&&a(8,"WEBP"))return "image/webp"
  if(a(0,"RIFF")&&a(8,"WAVE"))return "audio/wav"
  if(a(0,"OggS"))return "audio/ogg"
  if(a(0,"ID3")||(bytes[0]===255&&(bytes[1]&0xe0)===0xe0))return "audio/mpeg"
  if(a(4,"ftyp"))return "audio/mp4"
  if(bytes[0]===0x1a&&bytes[1]===0x45&&bytes[2]===0xdf&&bytes[3]===0xa3)return "audio/webm"
  return null
}
const short=(max:number)=>z.string().max(max).refine(t=>!/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(t))
export const mediaDetailsSchema=z.object({caption:short(300),creator:short(160),recordedOn:z.union([z.iso.date(),z.literal("")]),position:z.number().int().min(0).max(999),notes:short(1500)}).strict()
export const mediaPatchSchema=mediaDetailsSchema.extend({expectedRevision:z.number().int().positive().max(2147483646)}).strict()
export const mediaDeleteSchema=z.object({expectedRevision:z.number().int().positive()}).strict()
export const mediaItemSchema=mediaDetailsSchema.extend({id:z.uuid(),entryId:z.uuid(),kind:z.enum(["photo","audio"]),mime:z.enum(Object.keys(mediaTypes) as [TripMediaMime,...TripMediaMime[]]),bytes:z.number().int().min(1).max(MAX_TRIP_MEDIA_BYTES),state:z.enum(["pending","ready","deleting"]),revision:z.number().int().positive()}).strict()
export const mediaListSchema=z.object({items:z.array(mediaItemSchema).max(20)}).strict()
export type TripMediaItem=z.infer<typeof mediaItemSchema>
