import {z} from "zod"
import {albumSchema,type BirdAlbum} from "./bird-album"
export const collectionQuerySchema=z.object({country:z.enum(["","colombia","australia","new-zealand"]).default(""),state:z.enum(["all","desired","observed"]).default("all"),q:z.string().max(120).default(""),offset:z.coerce.number().int().min(0).max(10000).default(0)}).strict()
export type CollectionReference={planId:string;title:string;recordId:string;state:"desired"|"observed";date:string;regionId:string;journalEntryId?:string;photoId?:string;photoCredit?:string}
export type CollectionEntry={key:string;country:string;speciesId:string;commonName:string;scientificName:string;currentCatalogue:boolean;desired:boolean;observed:boolean;references:CollectionReference[]}
type AlbumSource={planId:string;title:string;country:string;data:BirdAlbum}
export function collectAlbumEntries(albums:AlbumSource[],species:(country:string,id:string)=>{commonName:string;scientificName:string;historical?:boolean;referenceOnly?:boolean}|undefined):CollectionEntry[]{
 const entries=new Map<string,CollectionEntry>()
 for(const album of albums){const parsed=albumSchema.parse(album.data);for(const bird of parsed.birds){
  if(bird.deleted)continue
  const key=`${album.country}:${bird.speciesId}`,known=species(album.country,bird.speciesId)
  const current=entries.get(key)??{key,country:album.country,speciesId:bird.speciesId,commonName:known?.commonName||"Species needs catalogue review",scientificName:known?.scientificName||"",currentCatalogue:Boolean(known&&!known.historical&&!known.referenceOnly),desired:false,observed:false,references:[]}
  current.desired ||= bird.state==="desired";current.observed ||= bird.state==="observed"
  current.references.push({planId:album.planId,title:album.title,recordId:bird.id,state:bird.state,date:bird.date,regionId:bird.regionId,...(bird.journalEntryId?{journalEntryId:bird.journalEntryId}:{}),...(bird.photoId?{photoId:bird.photoId,photoCredit:bird.photoCredit}: {})})
  entries.set(key,current)
 }}
 return [...entries.values()].sort((a,b)=>a.commonName.localeCompare(b.commonName)||a.key.localeCompare(b.key))
}
const country=z.enum(["colombia","australia","new-zealand"])
const localImage=z.string().refine(v=>v.startsWith("/")&&!v.startsWith("//"))
const reference=z.object({planId:z.uuid(),title:z.string(),recordId:z.uuid(),state:z.enum(["desired","observed"]),date:z.string(),regionId:z.string(),journalEntryId:z.uuid().optional(),photoId:z.uuid().optional(),photoCredit:z.string().optional()}).strict()
export const collectionResponseSchema=z.object({
 generatedAt:z.string(),scope:z.string(),plansIncluded:z.number().int().nonnegative(),olderTripsExcluded:z.boolean(),total:z.number().int().nonnegative(),matched:z.number().int().nonnegative(),offset:z.number().int().nonnegative(),limit:z.literal(24),
 catalogues:z.array(z.object({countryId:country,name:z.string(),reviewed:z.string(),scope:z.string(),total:z.number().int().nonnegative(),desired:z.number().int().nonnegative(),observed:z.number().int().nonnegative(),sources:z.array(z.object({title:z.string(),edition:z.string(),url:z.url()}).strict())}).strict()).max(3),
 items:z.array(z.object({key:z.string(),country,speciesId:z.string(),commonName:z.string(),scientificName:z.string(),currentCatalogue:z.boolean(),desired:z.boolean(),observed:z.boolean(),references:z.array(reference).max(10000),ownerPhoto:z.object({src:localImage,creator:z.string(),caption:z.string(),kind:z.string()}).strict().nullable(),referenceImage:z.object({src:localImage,kind:z.string(),creator:z.string(),license:z.string(),sourceUrl:z.url(),licenseUrl:z.url(),location:z.string(),modifications:z.string()}).strict().nullable()}).strict()).max(24),
}).strict()
export type BirdCollectionResponse=z.infer<typeof collectionResponseSchema>
