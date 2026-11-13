/** Exact interface copy and explicitly authored message templates. Never pass customer prose. */
const templates=new WeakMap<Record<string,string>,Array<{expression:RegExp;keys:string[];translated:string}>>()
function messageTemplates(dictionary:Record<string,string>){
 const cached=templates.get(dictionary);if(cached)return cached
 const result=Object.entries(dictionary).filter(([key])=>/\{\w+\}/.test(key)).map(([key,translated])=>{
  const keys:string[]=[],parts=key.split(/(\{\w+\})/g).map(part=>{if(/^\{\w+\}$/.test(part)){keys.push(part.slice(1,-1));return "(.+?)"}return part.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})
  return {expression:new RegExp(`^${parts.join("")}$`),keys,translated}
 });templates.set(dictionary,result);return result
}
export function translateUiCopy(text:string,dictionary:Record<string,string>,values:Record<string,string|number>={}){
 const normalized=text.replace(/\s+/g," ").trim();let translated=dictionary[normalized]
 if(!translated)for(const template of messageTemplates(dictionary)){const match=normalized.match(template.expression);if(match){translated=template.translated;template.keys.forEach((key,i)=>{translated=translated!.replaceAll(`{${key}}`,match[i+1])});break}}
 let result=translated?`${text.match(/^\s*/)?.[0]||""}${translated}${text.match(/\s*$/)?.[0]||""}`:text
 for(const [key,value] of Object.entries(values))result=result.replaceAll(`{${key}}`,String(value))
 return result
}
