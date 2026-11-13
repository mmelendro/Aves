"use client"
import { useState } from "react"
import Link from "next/link"
import { useUnsavedChanges } from "@/components/account/unsaved-changes"
function Editor({label}:{label:string}) {
 const [text,setText]=useState("")
 useUnsavedChanges(Boolean(text),`Unsaved ${label}`)
 return <label>{label}<input value={text} onChange={event=>setText(event.target.value)}/></label>
}
export default function SyntheticWorkspace(){
 return <main><h1>Synthetic unsaved workspace</h1><nav><a href="#overview">Overview section</a><a href="#journal">Journal section</a><Link href="/site-map">Leave workspace</Link></nav><section id="overview"><Editor label="First editor"/></section><section id="journal"><Editor label="Second editor"/></section></main>
}
