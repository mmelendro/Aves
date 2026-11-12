const {test}=require('node:test'),assert=require('node:assert/strict');
const loader=require('./helpers/load-ts.cjs');const {componentHarness,find,nodes}=require('./helpers/component-harness.cjs');
const item={id:'0dc1eacf-82e0-4b27-b318-4fe19bb95fa5',entryId:'f4fa711d-3730-49df-8c5b-bd90394b428f',kind:'audio',mime:'audio/wav',bytes:44,state:'ready',revision:2,caption:'Lake sounds',creator:'Test recording',recordedOn:'2026-12-02',position:2,notes:'Wind and water'};
const button=(tree,label)=>find(tree,n=>n.type==='Button'&&n.props.children===label);
function setup(fail=false){
 const calls=[],replaced=[];
 const accountRequest=async(path,options)=>{
  calls.push({path,options});if(fail)throw Error('Save failed');
  const b=JSON.parse(options.body);delete b.expectedRevision;
  return {item:{...item,...b,revision:3}};
 };
 const h=componentHarness('components/account/trip-journal-media.tsx','JournalMediaCard',{item},{
  runEffects:true,window:{addEventListener(){},removeEventListener(){}},
  context:()=>({planId:'a13b0801-1c6d-41d4-94da-12e3adeebf13',replace:saved=>replaced.push(saved),remove:()=>{}}),
  mocks:{'./account-api':{errorMessage:e=>e.message,accountRequest}}
 });
 return {h,calls,replaced};
}

test('recording playback uses private authenticated content, native controls and no autoplay',()=>{
 const {h}=setup();let tree=h.render();button(tree,'Play recording').props.onClick();tree=h.render();const audio=find(tree,n=>n.type==='audio');assert.equal(audio.props.controls,true);assert.equal(audio.props.preload,'none');assert.equal(audio.props.autoPlay,undefined);assert.match(audio.props.src,/^\/api\/account\/plans\/.+\/media\/.+\/content$/);assert.doesNotMatch(audio.props.src,/token|signed|supabase/);
});
test('caption, creator, explicit order and recording notes require a matching saved receipt',async()=>{
 const {h,calls,replaced}=setup();let tree=h.render();find(tree,n=>n.type==='input'&&n.props.type==='number').props.onChange({target:{value:'1'}});tree=h.render();find(tree,n=>n.type==='textarea').props.onChange({target:{value:'Reviewed recording notes'}});tree=h.render();await button(tree,'Save upload details').props.onClick();await new Promise(r=>setImmediate(r));assert.equal(replaced[0].position,1);assert.equal(replaced[0].notes,'Reviewed recording notes');assert.equal(JSON.parse(calls[0].options.body).expectedRevision,2);
});
test('failed media details save keeps the unsaved notes for retry',async()=>{
 const {h,replaced}=setup(true);let tree=h.render();find(tree,n=>n.type==='textarea').props.onChange({target:{value:'Keep my notes'}});tree=h.render();await button(tree,'Save upload details').props.onClick();await new Promise(r=>setImmediate(r));tree=h.render();assert.equal(find(tree,n=>n.type==='textarea').props.value,'Keep my notes');assert.equal(replaced.length,0);assert.equal(button(tree,'Save upload details').props.disabled,false);
});
test('photo preparation produces a smaller JPEG copy and releases the temporary source',async()=>{
 let canvas,released=false,drawn=false;
 const source={naturalWidth:4000,naturalHeight:3000};class FakeImage{constructor(){Object.assign(this,source)}set src(v){queueMicrotask(()=>this.onload())}}
 const globals={
  Image:FakeImage,
  URL:{createObjectURL:()=> 'blob:test',revokeObjectURL:()=>{released=true}},
  document:{createElement(){
   canvas={getContext:()=>({fillRect(){},drawImage(){drawn=true},fillStyle:''}),
    toBlob(cb,mime,quality){assert.equal(mime,'image/jpeg');assert.equal(quality,.85);cb(new Blob(['prepared copy'],{type:mime}))}
   };
   return canvas;
  }}
 };
 const load=loader({globals});
 const file=new File(['original private photo'],'original.jpg',{type:'image/jpeg'});const copy=await load('lib/prepare-journal-photo.ts').prepareJournalPhoto(file);assert.equal(canvas.width,2048);assert.equal(canvas.height,1536);assert.equal(copy.type,'image/jpeg');assert.equal(await file.text(),'original private photo');assert.ok(drawn&&released);
});
