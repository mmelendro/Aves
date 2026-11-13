const { test } = require('node:test')
const assert = require('node:assert/strict')
const {readFileSync}=require('node:fs')
const {componentHarness,nodes,find}=require('./helpers/component-harness.cjs')
const mocks={
 './colombia-home-language':{useColombiaHomeCopy:()=>tree=>tree},
 './south-island-places-explorer':{__esModule:true,default:'PlacesMedia'},
 './south-island-habitat-context':{__esModule:true,default:'HabitatProvider',SouthIslandHabitatContext:'Habitat'},
 './deferred-south-island-map':{__esModule:true,default:'SouthIslandMap'},
 './map-viewer':{MapViewer:'MapViewer'},
 '@/components/destination-selection-context':{DestinationSelectionContext:{Provider:'DestinationProvider'}},
 '@/components/bird-discovery-context':{BirdDiscoveryContext:{Provider:'BirdProvider'}},
 '@/components/resizable-discovery-pair':{__esModule:true,default:'Pair'},
 '@/components/destination-card-media':{__esModule:true,default:'Media'},
 '@/components/deferred-country-map':{__esModule:true,default:'RegionalMap'},
 './homepage-destination-explorer.module.css':{__esModule:true,default:{}},
}
function harness(props,overrides={}){return componentHarness('components/homepage-destination-explorer.tsx','HomepageDestinationExplorerCore',{map:'World geometry',...props},{mocks,...overrides})}
function pair(h){return find(h.render(),n=>n.type==='Pair')}
function maps(h){return nodes(pair(h).props.map).filter(n=>['MapViewer','SouthIslandMap'].includes(n.type))}
function button(h,label){return find(h.render(),n=>n.type==='button'&&n.props.children===label)}
test('one South Island layer map zooms out to country and world and restores on reselection',()=>{
 const h=harness({initialCountryId:'new-zealand',initialRegionId:'south-island'})
 assert.equal(maps(h).length,1);assert.equal(maps(h)[0].type,'SouthIslandMap')
 assert.equal(pair(h).props.media.props.children.props.birds.length,30)
 maps(h)[0].props.onZoomOutAtMinimum()
 assert.equal(maps(h).length,1);assert.equal(maps(h)[0].type,'MapViewer')
 assert.equal(pair(h).props.media.props.children.props.birds.length,31)
 maps(h)[0].props.onZoomOutAtMinimum()
 assert.equal(maps(h).length,1);assert.equal(maps(h)[0].props.onZoomOutAtMinimum,undefined)
 assert.equal(pair(h).props.media.props.children.props.birds.length,73)
 button(h,'New Zealand').props.onClick()
 find(pair(h).props.map,n=>n.type==='select').props.onChange({target:{value:'south-island'}})
 assert.equal(maps(h).length,1);assert.equal(maps(h)[0].type,'SouthIslandMap')
})
test('each country and region selection updates the same in-place map, photo collection and planning scope',()=>{
 const h=harness({initialCountryId:'colombia'})
 for(const country of ['Colombia','Australia','New Zealand']){
  button(h,country).props.onClick()
  let select=find(pair(h).props.map,n=>n.type==='select')
  const options=nodes(select).filter(n=>n.type==='option'&&n.props.value)
  for(const option of options){
   select.props.onChange({target:{value:option.props.value}})
   assert.equal(maps(h).length,1)
   assert.ok(pair(h).props.media.props.children.props.birds.length>0)
   const panel=find(h.render(),n=>n.props['data-explorer-content'])
   assert.ok(panel.props['data-explorer-content'].endsWith(':'+option.props.value))
   const contact=find(panel,n=>n.type==='a'&&n.props.href?.includes('/contact?'))
   const enquiry=new URL(contact.props.href,'https://aves.bio')
   assert.equal(enquiry.pathname,'/contact')
   assert.equal(enquiry.searchParams.get('country'),({'Colombia':'colombia','Australia':'australia','New Zealand':'new-zealand'})[country])
   if(country==='New Zealand')assert.match(contact.props.href,/topic=new-zealand/)
   assert.ok(contact.props.href.includes('region='+option.props.value))
   // Select again never navigates away from the interactive explorer.
   if(maps(h)[0].type==='MapViewer'){
    const map=find(pair(h).props.map,n=>n.type==='RegionalMap')
    map.props.onSelectRegion(option.props.value)
    assert.equal(maps(h).length,1)
   }
  }
 }
})

test('deep links and browser history restore the map scope without dropping Next history state',()=>{
 const listeners=new Map(),entries=['https://aves.bio/colombia?explore=colombia&region=caribbean'],state={__NA:true,tree:'existing-router-state'}
 let index=0
 const window={location:new URL(entries[0]),sessionStorage:{getItem:()=>null,removeItem(){}},addEventListener:(name,handler)=>listeners.set(name,handler),removeEventListener:name=>listeners.delete(name)}
 window.history={state,pushState(nextState,_title,href){assert.equal(nextState,state);entries.splice(index+1);entries.push(new URL(href,window.location).href);index++;window.location=new URL(entries[index])}}
 const h=harness({initialCountryId:'colombia'},{window,runEffects:true})
 h.render()
 assert.equal(find(h.render(),n=>n.props['data-explorer-content']).props['data-explorer-content'],'colombia:caribbean')
 button(h,'New Zealand').props.onClick()
 find(pair(h).props.map,n=>n.type==='select').props.onChange({target:{value:'south-island'}})
 assert.equal(maps(h)[0].type,'SouthIslandMap')
 assert.match(window.location.search,/explore=new-zealand&region=south-island/)
 index--;window.location=new URL(entries[index]);listeners.get('popstate')()
 assert.equal(find(h.render(),n=>n.props['data-explorer-content']).props['data-explorer-content'],'new-zealand:')
 index--;window.location=new URL(entries[index]);listeners.get('popstate')()
 assert.equal(find(h.render(),n=>n.props['data-explorer-content']).props['data-explorer-content'],'colombia:caribbean')
 index++;window.location=new URL(entries[index]);listeners.get('popstate')()
 assert.equal(find(h.render(),n=>n.props['data-explorer-content']).props['data-explorer-content'],'new-zealand:')
 assert.equal(entries.length,3)
 assert.deepEqual([...listeners.keys()].sort(),["aves:nz-bird-basket-changed","pageshow","popstate"].sort())
})

test('reciprocal map and bird thumbnails follow every selected region and carousel bird',()=>{
 const h=harness({})
 for(const country of ['Colombia','Australia','New Zealand']){
  button(h,country).props.onClick()
  const options=nodes(find(pair(h).props.map,n=>n.type==='select')).filter(n=>n.type==='option'&&n.props.value)
  for(const option of options){
   find(pair(h).props.map,n=>n.type==='select').props.onChange({target:{value:option.props.value}})
   const cue=pair(h).props.mapCue
   assert.equal(cue.label,option.props.children)
   assert.match(readFileSync('public'+cue.image,'utf8'),new RegExp('data-selected-region="'+option.props.value+'"'))
   assert.match(readFileSync('public'+cue.image,'utf8'),/^<svg/)
   const birds=pair(h).props.media.props.children.props.birds
   assert.equal(pair(h).props.birdCue.id,birds[0].id)
   const last=birds.at(-1)
   find(h.render(),n=>n.type==='BirdProvider').props.value(last)
   assert.equal(pair(h).props.birdCue.id,last.id)
   assert.equal(pair(h).props.birdCue.image,last.image)
   assert.equal(pair(h).props.mapCue.image,cue.image,'carousel changes retain chosen map scope')
  }
 }
})

test('world entry uses a world map thumbnail without selecting a country',()=>{
 const cue=pair(harness({})).props.mapCue
 assert.equal(cue.label,'World map')
 assert.equal(cue.image,'/images/map-cues/world.svg')
 assert.equal(cue.selectedPath,undefined)
 const asset=readFileSync('public'+cue.image,'utf8')
 assert.match(asset,/Natural Earth public-domain world overview/)
 assert.doesNotMatch(asset,/<script|https?:\/\/(?!www.w3.org)/)
})

test('the world homepage keeps country previews concise and links to the full guide',()=>{
 const h=harness({});button(h,'New Zealand').props.onClick();
 assert.ok(!nodes(h.render()).some(n=>n.type==='section'&&n.props['aria-label']==='Selected place planning'));
 assert.equal(find(h.render(),n=>n.props['data-explorer-content']).props['data-explorer-content'],'new-zealand:');
 assert.ok(nodes(h.render()).some(n=>n.type==='a'&&n.props.href==='/new-zealand'));
 assert.ok(pair(h).props.media.props.children.props.birds.length>0);
});
