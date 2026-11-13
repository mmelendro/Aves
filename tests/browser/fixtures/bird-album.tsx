"use client"
import dynamic from "next/dynamic"
import Link from "next/link"
const BirdAlbum=dynamic(()=>import("@/components/account/bird-album"))
export default function AlbumFixture(){return <main id="main-content" className="mx-auto max-w-5xl px-4 py-8"><h1 className="text-2xl mb-6">Synthetic private bird album</h1><Link href="/site-map">Leave synthetic album</Link><BirdAlbum planId="a13b0801-1c6d-41d4-94da-12e3adeebf13" country="colombia"/></main>}
