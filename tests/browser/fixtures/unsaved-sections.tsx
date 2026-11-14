"use client"
import { useState } from "react"
import { useUnsavedChanges } from "@/components/account/unsaved-changes"
function Editor({name}:{name:string}) {
 const [value,setValue]=useState("")
 useUnsavedChanges(Boolean(value),`${name} has unsaved changes.`)
 return <label>{name}<input value={value} onChange={e=>setValue(e.target.value)}/></label>
}
export default function UnsavedSectionsFixture(){return <main><h1>Synthetic section history</h1><nav><a href="#journal">Journal section</a><a href="#records">Records section</a><a href="/site-map">Leave workspace</a></nav><section id="journal"><Editor name="Journal"/></section><section id="records"><Editor name="Records"/></section></main>}
