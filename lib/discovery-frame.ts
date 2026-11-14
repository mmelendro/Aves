import { clampDiscoverySplit, dragDiscoverySplit, DISCOVERY_PAIR_MIN_WIDTH } from './discovery-split'
export type Frame = {left:number;top:number;width:number;height:number;share:number}
export type Edge = 'n'|'s'|'e'|'w'|'ne'|'nw'|'se'|'sw'
const clamp=(n:number,min:number,max:number)=>Math.max(min,Math.min(max,n))
export function fitDiscoveryFrame(frame:Frame,available:number):Frame {
 const width=clamp(frame.width,Math.min(DISCOVERY_PAIR_MIN_WIDTH,available),available)
 return {...frame,width,left:clamp(frame.left,0,Math.max(0,available-width)),top:clamp(frame.top,0,240),height:clamp(frame.height,480,1200),share:clampDiscoverySplit(frame.share,width)}
}
/** Inner edges move the divider; outer edges keep the opposite boundary anchored. */
export function resizeDiscoveryFrame(start:Frame,edge:Edge,side:'left'|'right',dx:number,dy:number,available:number):Frame {
 const next={...start},right=start.left+start.width,bottom=start.top+start.height
 const inner=(side==='left'&&edge.includes('e'))||(side==='right'&&edge.includes('w'))
 if(inner) next.share=dragDiscoverySplit(start.share,dx,start.width)
 else if(edge.includes('w')) {next.left=clamp(start.left+dx,0,right-DISCOVERY_PAIR_MIN_WIDTH);next.width=right-next.left}
 else if(edge.includes('e')) next.width=clamp(start.width+dx,DISCOVERY_PAIR_MIN_WIDTH,available-start.left)
 if(edge.includes('n')) {next.top=clamp(start.top+dy,0,Math.min(240,bottom-480));next.height=bottom-next.top}
 else if(edge.includes('s')) next.height=clamp(start.height+dy,480,1200)
 return fitDiscoveryFrame(next,available)
}
