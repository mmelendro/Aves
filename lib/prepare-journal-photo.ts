/** Prepare a bounded JPEG copy in the browser. Original file is never changed. */
export async function prepareJournalPhoto(file:File):Promise<Blob>{
  if(!["image/jpeg","image/png","image/webp"].includes(file.type)||file.size>20*1024*1024)throw new Error("Choose a JPEG, PNG or WebP photo under 20 MiB.")
  const url=URL.createObjectURL(file)
  try{
    const image=await new Promise<HTMLImageElement>((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=()=>reject(new Error("This photo could not be opened. Try a JPEG copy."));image.src=url})
    if(!image.naturalWidth||!image.naturalHeight||image.naturalWidth*image.naturalHeight>40_000_000)throw new Error("Choose a photo below 40 megapixels.")
    const factor=Math.min(1,2048/Math.max(image.naturalWidth,image.naturalHeight)),canvas=document.createElement("canvas")
    canvas.width=Math.max(1,Math.round(image.naturalWidth*factor));canvas.height=Math.max(1,Math.round(image.naturalHeight*factor))
    const context=canvas.getContext("2d");if(!context)throw new Error("Your browser could not prepare this photo.")
    context.fillStyle="#fff";context.fillRect(0,0,canvas.width,canvas.height);context.drawImage(image,0,0,canvas.width,canvas.height)
    const blob=await new Promise<Blob>((resolve,reject)=>canvas.toBlob(value=>value?resolve(value):reject(new Error("The photo copy could not be prepared.")),"image/jpeg",.85))
    if(blob.size>3*1024*1024)throw new Error("Choose a smaller photo. The prepared copy must be under 3 MiB.")
    return blob
  }finally{URL.revokeObjectURL(url)}
}
