/** Exact interface-copy lookup. Callers must never pass customer-authored prose. */
export function translateUiCopy(text:string,dictionary:Record<string,string>,values:Record<string,string|number>={}){
 const normalized=text.replace(/\s+/g," ").trim(),translated=dictionary[normalized]
 let result=translated?text.replace(normalized,translated):text
 for(const [key,value] of Object.entries(values))result=result.replaceAll(`{${key}}`,String(value))
 return result
}
