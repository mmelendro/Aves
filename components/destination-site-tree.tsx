"use client"

import {useRef} from "react"
import Link from "next/link"
import {ChevronRight,Globe2} from "lucide-react"
import type {SiteTreeNode} from "@/lib/destination-site-tree"
import styles from "./destination-site-tree.module.css"

/** Native disclosures remain usable before hydration. The two optional controls
 * change only this tree, never browser preferences or saved trip selections. */
export default function DestinationSiteTree({tree,initialCountry}:{tree:SiteTreeNode;initialCountry?:string}) {
 const root=useRef<HTMLElement>(null)
 function expand(open:boolean){root.current?.querySelectorAll<HTMLDetailsElement>("details").forEach(detail=>{detail.open=open})}
 function branch(node:SiteTreeNode,depth:number):React.ReactNode {
  if(!node.children?.length)return <li key={node.id}><Link prefetch={false} href={node.href!} className={styles.link}>{node.label}</Link></li>
  return <li key={node.id}>
   <details open={node.id==="world"||node.id===initialCountry} data-site-tree-branch={node.id}>
    <summary className={styles.summary}><ChevronRight size={17} className={styles.chevron} aria-hidden="true"/>{node.id==="world"&&<Globe2 size={20} aria-hidden="true"/>}<span className={styles.name}>{node.label}</span>{node.hint&&<span className={styles.hint}>{node.hint}</span>}</summary>
    {node.href&&<Link prefetch={false} href={node.href} className={`${styles.link} ${styles.overview}`}>{node.id==="world" ? "World · All Destinations" : `${node.label} Home`}</Link>}
    <ul className={styles.children} data-depth={depth+1}>{node.children.map(child=>branch(child,depth+1))}</ul>
   </details>
  </li>
 }
 return <nav ref={root} aria-label="AVES destination tree" className={styles.tree}>
  <div className={styles.controls}><p>World → country → region</p><div className="flex flex-wrap gap-2"><button type="button" onClick={()=>expand(true)}>Expand all</button><button type="button" onClick={()=>expand(false)}>Collapse all</button></div></div>
  <ul className={styles.roots}>{branch(tree,0)}</ul>
 </nav>
}
