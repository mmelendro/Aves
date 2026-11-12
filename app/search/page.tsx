import type {Metadata} from "next"
import {GlobalHeader,GlobalFooter} from "@/components/global-navigation"
import {searchDiscovery} from "@/lib/discovery-index"
export const metadata:Metadata={title:"Search destinations and places",alternates:{canonical:"https://aves.bio/search"},robots:{index:false,follow:true}}
type Params=Record<string,string|string[]|undefined>
export default async function SearchPage({searchParams}:{searchParams:Promise<Params>}){
 const params=await searchParams
 const one=(key:string)=>typeof params[key]==="string"?params[key] as string:""
 const es=one("lang")==="es",q=one("q").slice(0,120),country=["colombia","australia","new-zealand"].includes(one("country"))?one("country"):"",kind=["country","region","place"].includes(one("kind"))?one("kind"):""
 const raw=one("offset"),offset=/^\d{1,6}$/.test(raw)?Number(raw):0
 const result=searchDiscovery(q,country,kind,offset)
 const countryName=(id:string)=>({colombia:"Colombia",australia:"Australia","new-zealand":es?"Nueva Zelanda":"New Zealand"}[id]??id)
 const kindName=(id:string)=>es?({country:"País",region:"Región",place:"Lugar"}[id]??id):({country:"Country",region:"Region",place:"Place"}[id]??id)
 const href=(next:number)=>"/search?"+new URLSearchParams({q,country,kind,offset:String(next),...(es?{lang:"es"}:{})})
 return <><GlobalHeader/><main id="main-content" tabIndex={-1} className="mx-auto min-h-[60vh] max-w-5xl px-4 py-10" lang={es?"es":"en"}>
  <div className="flex flex-wrap items-center justify-between gap-4"><h1 className="text-3xl font-medium text-emerald-950">{es?"Encuentra tu próximo lugar":"Find your next place"}</h1><a className="inline-flex min-h-11 items-center underline" href={"/search?"+new URLSearchParams({q,country,kind,...(!es?{lang:"es"}:{})})} lang={es?"en":"es"}>{es?"English":"Español"}</a></div>
  <p className="mt-4 leading-7 text-gray-600">{es?"Busca países, regiones y lugares con fuentes revisadas. Las referencias no confirman acceso, disponibilidad ni avistamientos. Los nombres propios y las descripciones de las fuentes conservan su idioma original.":"Search countries, regions and reviewed place references. Listings do not confirm access, availability or sightings. Place names and source descriptions retain their original language."}</p>
  <form action="/search" className="my-7 grid gap-4 sm:grid-cols-2">{es&&<input type="hidden" name="lang" value="es"/>}
   <label className="sm:col-span-2">{es?"¿Qué quieres explorar?":"What would you like to explore?"}<input name="q" maxLength={120} defaultValue={q} className="mt-2 block min-h-11 w-full rounded-lg border px-3"/></label>
   <label>{es?"País":"Country"}<select name="country" aria-label={es?"País":"Country"} defaultValue={country} className="mt-2 block min-h-11 w-full rounded-lg border px-3"><option value="">{es?"Todos los países":"All countries"}</option><option value="colombia">Colombia</option><option value="australia">Australia</option><option value="new-zealand">{es?"Nueva Zelanda":"New Zealand"}</option></select></label>
   <label>{es?"Tipo de resultado":"Result type"}<select name="kind" aria-label={es?"Tipo de resultado":"Result type"} defaultValue={kind} className="mt-2 block min-h-11 w-full rounded-lg border px-3"><option value="">{es?"Todos los tipos":"All types"}</option><option value="country">{es?"Países":"Countries"}</option><option value="region">{es?"Regiones":"Regions"}</option><option value="place">{es?"Lugares":"Places"}</option></select></label>
   <button className="min-h-11 rounded-lg bg-emerald-800 px-5 text-white sm:col-span-2">{es?"Buscar":"Search"}</button>
  </form>
  <p role="status" className="text-sm text-gray-600">{result.total} {es?"resultados en el catálogo revisado":"matches in the reviewed catalogue"}</p>
  {!result.total&&<p className="mt-5">{es?"Prueba con un término más general o cambia los filtros.":"Try a broader term or change your filters."}</p>}
  <ul className="mt-5 space-y-4">{result.items.map(item=><li key={item.id} className="rounded-xl border p-5"><p className="text-xs uppercase text-emerald-800">{countryName(item.countryId)} · {kindName(item.kind)}</p><h2 className="mt-2 text-xl font-medium"><a href={item.href} className="inline-flex min-h-11 items-center underline">{item.name}</a></h2><p lang="en" className="mt-2 text-sm leading-6">{item.description}</p></li>)}</ul>
  <nav aria-label={es?"Páginas de resultados":"Search results pages"} className="mt-6 flex flex-wrap gap-6">{result.offset>0&&<a className="inline-flex min-h-11 items-center underline" href={href(result.offset-30)}>{es?"Anterior":"Previous"}</a>}{result.offset+30<result.total&&<a className="inline-flex min-h-11 items-center underline" href={href(result.offset+30)}>{es?"Siguiente":"Next"}</a>}</nav>
 </main><GlobalFooter/></>
}
