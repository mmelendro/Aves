"use client"
export default function DiscoveryLoading({error,retry,label}:{error?:Error|null;retry?:()=>void;label:string}){
 return <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-950"><p role={error?"alert":"status"}>{error?`Could not open ${label}. Your map and selections are still available.`:`Opening ${label}…`}</p>{error&&retry&&<button type="button" className="mt-3 min-h-11 underline" onClick={retry}>Retry landscapes</button>}</div>
}
