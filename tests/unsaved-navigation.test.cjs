const {test}=require('node:test');
const assert=require('node:assert/strict');
const loader=require('./helpers/load-ts.cjs');
function session(){
 const listeners=new Map(),cleanups=[];let prompts=0;
 const window={location:new URL('https://aves.bio/account/trips/example#overview'),history:{state:{section:'overview'},pushState(state,_,url){this.state=state;window.location=new URL(url)}},confirm(){prompts++;return false},addEventListener(name,fn){listeners.set(name,fn)},removeEventListener(name){listeners.delete(name)}};
 const document={addEventListener(name,fn){listeners.set(name,fn)},removeEventListener(name){listeners.delete(name)}};
 const api=loader({mocks:{react:{useEffect(fn){cleanups.push(fn())}}},globals:{window,document}})('components/account/unsaved-changes.ts');
 return {api,window,listeners,cleanups,prompts:()=>prompts};
}
test('dirty editors preserve hash history and return to the latest section on a cancelled departure',()=>{
 const s=session();s.api.useUnsavedChanges(true,'Unsaved first editor');s.api.useUnsavedChanges(true,'Unsaved second editor');
 const pop=()=>s.listeners.get('popstate')({stopImmediatePropagation(){}});
 for(const hash of ['#journal','#overview','#journal']){s.window.location.hash=hash;pop()}
 assert.equal(s.prompts(),0);
 s.window.location=new URL('https://aves.bio/account/trips/another');pop();
 assert.equal(s.prompts(),1);assert.equal(s.window.location.href,'https://aves.bio/account/trips/example#journal');
 s.cleanups[0]();assert.ok(s.listeners.has('beforeunload'));s.cleanups[1]();assert.equal(s.listeners.size,0);
});
test('a changed query or another origin is still a departure',()=>{
 const s=session();s.api.useUnsavedChanges(true);
 s.window.location.search='?different=1';s.listeners.get('popstate')({stopImmediatePropagation(){}});assert.equal(s.prompts(),1);
 let prevented=false;
 s.listeners.get('click')({button:0,target:{closest:()=>({href:'https://other.example/account/trips/example#journal',target:'',hasAttribute:()=>false})},preventDefault(){prevented=true},stopImmediatePropagation(){}});
 assert.equal(s.prompts(),2);assert.ok(prevented);
});
