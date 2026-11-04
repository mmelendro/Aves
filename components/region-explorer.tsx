"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Bird, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { regions } from "@/content/regions"

export function RegionExplorer() {
  const [selected, setSelected] = useState("all")
  useEffect(() => {
    const region = new URLSearchParams(window.location.search).get("region")
    if (regions.some(item => item.id === region)) setSelected(region!)
  }, [])
  return <section className="bg-gradient-to-br from-blue-50 to-emerald-50 py-16 lg:py-24"><div className="container mx-auto px-4 max-w-7xl"><div className="flex flex-wrap justify-center gap-3 mb-10" aria-label="Choose Australian region">{[{id:"all",state:"All Regions"},...regions].map(region => <Button key={region.id} variant={selected === region.id ? "default" : "outline"} className={selected === region.id ? "bg-emerald-600 hover:bg-emerald-700" : "bg-white text-emerald-700 border-emerald-200"} aria-pressed={selected === region.id} onClick={() => setSelected(region.id)}>{region.state}</Button>)}</div>
    <div className={`grid ${selected === "all" ? "md:grid-cols-2 lg:grid-cols-3" : "max-w-3xl mx-auto"} gap-8`}>{regions.filter(region => selected === "all" || selected === region.id).map(region => <Card key={region.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white"><div className="relative aspect-[4/3]"><Image src={region.image} alt={region.alt} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover" /></div><CardContent className="p-6 lg:p-8"><Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 mb-4"><MapPin className="w-3 h-3 mr-1" />{region.state}</Badge><h2 className="text-2xl font-bold text-gray-900 mb-4">{region.landscape}</h2><p className="text-gray-600 leading-relaxed mb-4">{region.description}</p><p className="text-sm text-gray-600 leading-relaxed mb-6">{region.detail}</p><Link href={`/contact?region=${region.id}`}><Button className="w-full bg-emerald-600 hover:bg-emerald-700"><Bird className="mr-2 w-4 h-4" />Ask About This Region<ArrowRight className="ml-2 w-4 h-4" /></Button></Link><a href={region.source} target="_blank" rel="noreferrer" className="block text-sm text-emerald-700 mt-4 text-center underline">Official destination information</a></CardContent></Card>)}</div>
    <div className="text-center mt-12 bg-white/90 rounded-xl border border-emerald-100 shadow-lg p-6"><h3 className="text-xl font-bold text-gray-900 mb-3">Have Another Australian Region in Mind?</h3><p className="text-gray-600 mb-5">These places are a starting point for inspiration. Tell us where you would love to explore.</p><Link href="/contact"><Button variant="outline" className="border-emerald-600 text-emerald-700">Plan a Custom Journey <ArrowRight className="ml-2 w-4 h-4" /></Button></Link></div>
  </div></section>
}
