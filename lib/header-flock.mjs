export const birdFamilies = ['tern','parrot','cockatoo','macaw','toucan','dove','ibis','condor']
export function selectHeaderFlock(catalogue,country,regionId,placeId){
 return catalogue[country+'/'+(placeId||regionId||'country')] || catalogue[country+'/country'] || catalogue.global
}
export function headerFlockGeometry({width,wordCenter,navLeft,navRight},family){
 const compact=width<640,s=Math.min(compact?.64:1.2,Math.max(.45,(wordCenter-4)/124))
 const start=Math.max(wordCenter+136*s+12,navLeft),end=Math.max(start+24,Math.min(width-16,navRight))
 const poses=compact?[[.12,79,3.5,-9],[.49,88,4.2,12],[.88,73,3.2,-7]]:[[.04,84,3.9,5],[.21,73,3.3,-8],[.42,88,4.3,12],[.61,76,3.5,-14],[.79,82,4,9],[.95,70,3.2,5]]
 return (family==='condor'?poses.filter((_,i)=>i%2===0):poses).map(([a,y,size,rotation])=>({x:start+(end-start)*a,y,size,rotation}))
}
/** Quiet outline shorthand distinguishes wing, bill and tail families at CSS size. */
export function birdOutline(family,pose=0){
 const wings=pose%2?'M-1 -.1 Q-.55 -.7 0 0 Q.55 -.7 1 -.1':'M-1 -.45 Q-.45 -.4 0 0 Q.5 -.4 1 -.45'
 if(family==='condor')return 'M-1.2 -.12 L-1.1 -.28 L-.98 -.19 L-.9 -.35 L-.8 -.24 Q-.35 -.45 0 0 Q.35 -.45 .8 -.24 L.9 -.35 L.98 -.19 L1.1 -.28 L1.2 -.12 M0 -.1 l.12 -.16 l.09 .08 M0 0 l-.08 .3 l.19 0 Z'
 if(family==='ibis')return wings+' M0 0 Q.22 -.2 .39 -.12 q.26 .07 .17 .28 M0 0 l-.38 .28 m.07 -.04 l-.18 .06'
 if(family==='toucan')return wings+' M0 0 Q.18 -.25 .3 -.16 Q.65 -.2 .63 .03 L.27 -.02 M0 0 l-.17 .32 l.22 -.03'
 if(family==='cockatoo')return wings+' M0 0 Q.2 -.24 .3 -.12 l.11 .02 M.2 -.2 l.01 -.16 l.12 .12 M0 0 l-.11 .27 l.22 0'
 if(family==='macaw')return wings+' M0 0 q.23 -.2 .3 -.04 M0 0 l-.1 .57 l.19 -.06'
 if(family==='parrot')return wings+' M0 0 q.22 -.24 .32 -.05 M0 0 l-.12 .38 l.21 -.04'
 if(family==='dove')return wings+' M0 0 q.22 -.17 .32 -.02 M0 0 l-.16 .22 q.16 .08 .31 0 Z'
 return wings+' M0 0 l.19 -.16 l.12 .03 M0 0 l-.1 .3 l.13 -.09 l.1 .07'
}
