const {test}=require('node:test'),assert=require('node:assert/strict')
const loader=require('./helpers/load-ts.cjs')
const {componentHarness,find}=require('./helpers/component-harness.cjs')

test('section Back/Forward preserves two dirty editors and leaving still needs confirmation',()=>{
 const listeners={},cleanups=[];let prompts=0,stopped=0,pushed
 const window={location:{href:'https://aves.bio/account/trips/one#journal'},history:{state:{section:'journal'},pushState(state,_,href){pushed={state,href};window.location.href=href}},addEventListener:(name,fn)=>listeners[name]=fn,removeEventListener:name=>delete listeners[name],confirm:()=>{prompts++;return false}}
 const document={addEventListener:(name,fn)=>listeners[name]=fn,removeEventListener:name=>delete listeners[name]}
 const load=loader({mocks:{react:{useEffect:fn=>cleanups.push(fn())}},globals:{window,document}})
 const {useUnsavedChanges}=load('components/account/unsaved-changes.ts')
 useUnsavedChanges(true,'Journal dirty');useUnsavedChanges(true,'Records dirty')
 window.location.href='https://aves.bio/account/trips/one#records';window.history.state={section:'records'}
 listeners.popstate({stopImmediatePropagation(){stopped++}})
 assert.equal(prompts,0)
 window.location.href='https://aves.bio/account/trips/other#records'
 listeners.popstate({stopImmediatePropagation(){stopped++}})
 assert.equal(prompts,1);assert.equal(stopped,1)
 assert.deepEqual(pushed,{href:'https://aves.bio/account/trips/one#records',state:{section:'records'}})
 cleanups[0]();assert.ok(listeners.beforeunload)
 let prevented=0;listeners.beforeunload({preventDefault(){prevented++}});assert.equal(prevented,1)
 cleanups[1]();assert.equal(listeners.beforeunload,undefined)
})

test('scheduler trigger never acts as a form submit button',()=>{
 const h=componentHarness('components/google-calendar-button.tsx','GoogleCalendarButton',{}, {mocks:{'@/components/google-calendar-modal':{GoogleCalendarModal:'Modal'}}})
 const trigger=find(h.render(),n=>n.type==='Button')
 assert.equal(trigger.props.type,'button');trigger.props.onClick()
 assert.equal(find(h.render(),n=>n.type==='Modal').props.isOpen,true)
})

for(const [file,props] of [['components/contact-form-section.tsx',{}],['features/australia/components/contact-form-section.tsx',{country:'australia'}]]){
 test(`${file} keeps failed answers dirty and clears only a stored receipt`,async()=>{
  let guard=false,stored=false
  const h=componentHarness(file,'ContactFormSection',props,{mocks:{'@/components/account/unsaved-changes':{useUnsavedChanges:dirty=>guard=dirty},'@/components/google-calendar-button':{GoogleCalendarButton:'Calendar'}},fetch:async()=>({ok:true,json:async()=>stored?{success:true,status:'stored',intent:'inquiry',country:file.startsWith('features')?'australia':'colombia'}:{success:true}})})
  let form=find(h.render(),n=>n.type==='form');form.props.onChangeCapture();h.render();assert.equal(guard,true)
  const event={preventDefault(){},currentTarget:{values:{name:'Test',email:'test@example.invalid',message:'Synthetic'},reset(){}}}
  await form.props.onSubmit(event);h.render();assert.equal(guard,true)
  stored=true;form=find(h.render(),n=>n.type==='form');await form.props.onSubmit(event);h.render();assert.equal(guard,false)
  find(h.render(),n=>n.type==='form').props.onChangeCapture();h.render();assert.equal(guard,true)
 })
}

test('homepage conversation follows world and country/region context without private fields',()=>{
 for(const selection of [null,{country:'global'},{country:'colombia',regionId:'eastern-andes'},{country:'australia',regionId:'tasmania'},{country:'new-zealand',regionId:'north-island'}]){
 const h=componentHarness('components/conversation-link.tsx','default',{children:'Start a conversation'},{mocks:{'./header-landscape-context':{useHeaderLandscape:()=>({selection})}}})
 const href=h.render().props.href
 if(!selection||selection.country==='global')assert.equal(href,'/contact?topic=general#inquiry')
 else {const u=new URL(href,'https://aves.bio');assert.equal(u.searchParams.get('country'),selection.country);assert.equal(u.searchParams.get('region'),selection.regionId)}
 }
})
