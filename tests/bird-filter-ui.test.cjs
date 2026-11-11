const {test}=require('node:test')
const assert=require('node:assert/strict')
const {componentHarness,nodes,find}=require('./helpers/component-harness.cjs')

test('filter controls share both criteria, expose a native overlay and reset only bird filters',()=>{
 let filters={endemicOnly:false,status:'all'}
 const h=componentHarness('components/bird-filter-controls.tsx','default',{}, {mocks:{'./bird-filter-context':{useBirdFilters:()=>({filters,setFilters:next=>{filters=next}})}}})
 let tree=h.render()
 assert.ok(nodes(tree).some(n=>n.props.popover==='auto'),'native top layer avoids map/card overflow clipping')
 find(tree,n=>n.type==='input').props.onChange({target:{checked:true}})
 tree=h.render();find(tree,n=>n.type==='select').props.onChange({target:{value:'EN'}})
 assert.deepEqual(filters,{endemicOnly:true,status:'EN'})
 tree=h.render();find(tree,n=>n.type==='button'&&n.props.children==='Clear bird filters').props.onClick()
 assert.deepEqual(filters,{endemicOnly:false,status:'all'})
})
test('the unified explorer uses the filtered set for map areas, bird cue, carousel and planning copy',()=>{
 const mocks={
 './bird-filter-context':{useBirdFilters:()=>({filters:{endemicOnly:true,status:'EN'},setFilters(){}})},
 './colombia-home-language':{useColombiaHomeCopy:()=>tree=>tree},
 './south-island-places-explorer':{__esModule:true,default:'PlacesMedia'},
 './south-island-habitat-context':{__esModule:true,default:'HabitatProvider',SouthIslandHabitatContext:'Habitat'},
 './south-island-ecosystem-map':{__esModule:true,default:'SouthIslandMap'},
 './map-viewer':{MapViewer:'MapViewer'},
 '@/components/destination-selection-context':{DestinationSelectionContext:{Provider:'DestinationProvider'}},
 '@/components/bird-discovery-context':{BirdDiscoveryContext:{Provider:'BirdProvider'}},
 '@/components/resizable-discovery-pair':{__esModule:true,default:'Pair'},
 '@/components/destination-card-media':{__esModule:true,default:'Media'},
 '@/components/destination-regional-map':{__esModule:true,default:'RegionalMap'},
 }
 const h=componentHarness('components/homepage-destination-explorer.tsx','HomepageDestinationExplorerCore',{map:'World',initialCountryId:'australia'},{mocks})
 const tree=h.render(),pair=find(tree,n=>n.type==='Pair'),media=pair.props.media.props.children
 assert.equal(media.props.birds.length,2)
 assert.ok(media.props.birds.every(b=>['au-carnabys-black-cockatoo','au-forty-spotted-pardalote'].includes(b.id)))
 assert.equal(pair.props.birdCue.id,media.props.birds[0].id)
 const map=find(pair.props.map,n=>n.type==='RegionalMap')
 assert.ok(map.props.matchingRegionIds.includes('western-australia'))
 assert.ok(map.props.matchingRegionIds.includes('tasmania'))
 assert.ok(!map.props.matchingRegionIds.includes('new-south-wales'))
})
