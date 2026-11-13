"use client"
import {useEffect,useRef,useState,type CSSProperties} from 'react'
import {fitDiscoveryFrame,resizeDiscoveryFrame,type Edge,type Frame} from '@/lib/discovery-frame'
import styles from './discovery-panel-resize.module.css'

export function useDiscoveryPanelResize({width,enabled,mediaFirst,share,onShare}:{width:number;enabled:boolean;mediaFirst:boolean;share:number;onShare:(value:number)=>void}) {
 const [saved,setSaved]=useState<Frame|null>(null)
 const active=useRef<{pointer:number;x:number;y:number;edge:Edge;side:'left'|'right';frame:Frame;button:HTMLButtonElement}|null>(null)
 const [dragging,setDragging]=useState(false)
 useEffect(()=>{
  setDragging(false)
  const drag=active.current
  if(drag){active.current=null;if(drag.button.hasPointerCapture(drag.pointer))drag.button.releasePointerCapture(drag.pointer);setDragging(false)}
  return ()=>{const current=active.current;active.current=null;if(current?.button.hasPointerCapture(current.pointer))current.button.releasePointerCapture(current.pointer)}
 },[width,enabled])
 const frame=fitDiscoveryFrame({...saved??{left:0,top:0,width,height:640,share:50},share:mediaFirst?100-share:share},width)
 function apply(next:Frame){setSaved(next);onShare(mediaFirst?100-next.share:next.share)}
 function reset(){setSaved(null);onShare(50)}
 function finish(cancel=false){const drag=active.current;if(!drag)return;active.current=null;if(cancel)apply(drag.frame);if(drag.button.hasPointerCapture(drag.pointer))drag.button.releasePointerCapture(drag.pointer);setDragging(false)}
 const style=enabled?{'--resize-width':`${frame.width}px`,'--resize-left':`${frame.left}px`,'--resize-top':`${frame.top}px`,'--resize-height':`${frame.height}px`} as CSSProperties:{}
 function handles(panel:'map'|'birds') {
  if(!enabled)return null
  const side=(panel==='birds')===mediaFirst?'left':'right'
  return (['n','s','e','w','ne','nw','se','sw'] as Edge[]).map(edge=><button key={edge} type="button" data-resize-panel={panel} data-resize-edge={edge} className={styles.handle} aria-label={`Resize ${panel==='map'?'map':'bird guide'} panel`} aria-hidden={edge!=='se'||undefined} tabIndex={edge==='se'?0:-1} title="Drag to resize. Arrow keys resize; Shift changes faster; Enter resets."
   onPointerDown={event=>{if(!event.isPrimary||event.button!==0)return;event.preventDefault();event.stopPropagation();event.currentTarget.focus({preventScroll:true});active.current={pointer:event.pointerId,x:event.clientX,y:event.clientY,edge,side,frame,button:event.currentTarget};event.currentTarget.setPointerCapture(event.pointerId);setDragging(true)}}
   onPointerMove={event=>{const drag=active.current;if(drag?.pointer!==event.pointerId)return;event.preventDefault();apply(resizeDiscoveryFrame(drag.frame,drag.edge,drag.side,event.clientX-drag.x,event.clientY-drag.y,width))}}
   onPointerUp={()=>finish()} onPointerCancel={()=>finish(true)} onLostPointerCapture={()=>finish()}
   onKeyDown={event=>{if(event.key==='Escape'){finish(true);return}if(event.key==='Enter'||event.key==='Home'){event.preventDefault();reset();return}const step=event.shiftKey?40:10;const dx=event.key==='ArrowLeft'?-step:event.key==='ArrowRight'?step:0;const dy=event.key==='ArrowUp'?-step:event.key==='ArrowDown'?step:0;if(!dx&&!dy)return;event.preventDefault();apply(resizeDiscoveryFrame(frame,edge,side,dx,dy,width))}}><span aria-hidden="true"/></button>)
 }
 return {style,handles,reset,dragging,frameWidth:enabled?frame.width:width}
}
