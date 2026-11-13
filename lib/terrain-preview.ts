/** Bounded public terrain samples. These are landscape previews, never route data. */
export const terrainPresets=[
 {id:"colombia",name:"Sierra Nevada de Santa Marta",lon:-73.7,lat:10.95,zoom:9,map:"/?explore=colombia&region=sierra-nevada-de-santa-marta"},
 {id:"new-zealand",name:"Southern Alps / Kā Tiritiri o te Moana",lon:170.1,lat:-43.65,zoom:9,map:"/new-zealand/south-island#trip-planner"},
 {id:"australia",name:"Blue Mountains",lon:150.3,lat:-33.7,zoom:10,map:"/australia?region=new-south-wales"},
] as const
export function terrainTile(lon:number,lat:number,zoom:number){
 const n=2**zoom,x=Math.floor((lon+180)/360*n),r=lat*Math.PI/180,y=Math.floor((1-Math.asinh(Math.tan(r))/Math.PI)/2*n)
 const inverse=(v:number)=>Math.atan(Math.sinh(Math.PI*(1-2*v/n)))*180/Math.PI
 return {x,y,zoom,url:`https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${zoom}/${x}/${y}.png`,west:x/n*360-180,east:(x+1)/n*360-180,north:inverse(y),south:inverse(y+1),widthMetres:Math.cos(r)*40075016.686/n}
}
export function terrariumHeight(red:number,green:number,blue:number){return red*256+green+blue/256-32768}
export function projectTerrain(x:number,y:number,height:number,angle:number,tilt:number,scale:number,width:number,heightPx:number){
 const a=x*Math.cos(angle)-y*Math.sin(angle),b=x*Math.sin(angle)+y*Math.cos(angle)
 return {x:width/2+a*scale,y:heightPx*.57+b*Math.sin(tilt)*scale-height*Math.cos(tilt)*scale,depth:b}
}
