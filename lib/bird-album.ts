/** Owner-entered records. Verification cannot be granted by this document. */
import {z} from "zod"
export const albumBirdSchema=z.object({
  id:z.uuid(),speciesId:z.string().min(1).max(64).regex(/^[a-z0-9-]+$/),
  state:z.enum(["desired","observed"]),date:z.union([z.iso.date(),z.literal("")]),
  regionId:z.string().max(160),notes:z.string().max(800).refine(s=>!/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(s)),
  deleted:z.boolean(),
}).strict().refine(v=>v.state!=="desired"||!v.date,"A wish has no observation date")
export const albumSchema=z.object({version:z.literal(1),birds:z.array(albumBirdSchema).max(100)}).strict()
 .refine(v=>new Set(v.birds.map(b=>b.id)).size===v.birds.length,"Use distinct record references")
 .refine(v=>new TextEncoder().encode(JSON.stringify(v)).length<=24000,"Shorten your album notes before saving")
export const albumWriteSchema=z.object({expectedRevision:z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER-1),data:albumSchema}).strict()
const speciesLabel=z.object({id:z.string(),name:z.string(),scientificName:z.string()}).strict()
export const albumReceiptSchema=z.object({revision:z.number().int().nonnegative(),data:albumSchema,species:z.array(speciesLabel).max(100).optional(),wishes:z.array(speciesLabel).max(512).optional(),unmatchedWishCount:z.number().int().nonnegative().optional()}).strict()
export type AlbumBird=z.infer<typeof albumBirdSchema>
export type BirdAlbum=z.infer<typeof albumSchema>
export const emptyAlbum=():BirdAlbum=>({version:1,birds:[]})
export const albumStateLabel=(bird:AlbumBird)=>bird.state==="desired"?"Desired":"Observed · Unverified"
/** Explicit unsaved import only. Never turn a planning preference into an observation. */
export function appendDesiredWishes(data:BirdAlbum,ids:string[],allowedIds:readonly string[],newId=()=>crypto.randomUUID()):{data:BirdAlbum;added:number;error?:string}{
 if(!ids.length||new Set(ids).size!==ids.length||ids.some(id=>!allowedIds.includes(id)))return {data,added:0,error:"Choose distinct birds from your saved wishes."}
 const active=new Set(data.birds.filter(b=>!b.deleted).map(b=>b.speciesId)),add=ids.filter(id=>!active.has(id))
 const parsed=albumSchema.safeParse({...data,birds:[...data.birds,...add.map(speciesId=>({id:newId(),speciesId,state:"desired",date:"",regionId:"",notes:"",deleted:false}))]})
 if(!parsed.success)return {data,added:0,error:"These wishes do not fit the album limit. Keep your current records and review the selection."}
 return {data:parsed.data,added:add.length}
}
