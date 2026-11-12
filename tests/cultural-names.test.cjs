const {test}=require('node:test'),assert=require('node:assert/strict');
const loader=require('./helpers/load-ts.cjs'),{componentHarness,find,nodes}=require('./helpers/component-harness.cjs');
const p=loader()('content/cultural-names.ts');
test('reviewed Indigenous names preserve country, entity and language uncertainty',()=>{
 const kumanday=p.reviewedNames('place','nevado-del-ruiz','colombia')[0];assert.equal(kumanday.name,'Kumanday');assert.equal(kumanday.language,null);assert.match(kumanday.context,/Historical Quimbaya/);assert.equal(kumanday.pronunciationGuide,undefined);assert.equal(p.reviewedNames('place','nevado-del-ruiz','new-zealand').length,0);
 const kea=p.reviewedNames('bird','nz-kea')[0];assert.equal(kea.language,'te reo Māori');assert.match(kea.pronunciationGuide.url,/maoridictionary.co.nz\/word\/2505$/);assert.equal(p.reviewedNames('bird','unknown').length,0);
});
test('name disclosure opens references independently without loading audio or replacing navigation',()=>{
 let opens=0;const h=componentHarness('components/cultural-name-context.tsx','default',{kind:'bird',entityId:'nz-kea',onOpen:()=>opens++});const tree=h.render();find(tree,n=>n.type==='details').props.onToggle({currentTarget:{open:true}});assert.equal(opens,1);const links=nodes(tree).filter(n=>n.type==='a');assert.ok(links.some(n=>n.props.children==='Hear pronunciation at Te Aka'));for(const link of links){assert.equal(link.props.target,'_blank');assert.equal(link.props.rel,'noopener noreferrer');}assert.equal(nodes(tree).filter(n=>['audio','iframe','video'].includes(n.type)).length,0);
});
test('empty regional galleries retain a route back to the map and available photographs',()=>{
 let selected;const h=componentHarness('components/place-gallery.tsx','default',{countryId:'colombia',countryName:'Colombia',regionId:'cauca-valley',regions:[{id:'central-andes',name:'Central Andes'},{id:'cauca-valley',name:'Cauca Valley'}],mapHref:'#country-discovery-map',onPhotoChange(){},onRegionChange:id=>selected=id});const tree=h.render();assert.equal(nodes(tree).filter(n=>n.type==='Image').length,0);find(tree,n=>n.type==='button'&&n.props.children==='Return to available landscapes').props.onClick();assert.equal(selected,'');assert.equal(find(tree,n=>n.type==='a'&&n.props.children==='Return to the map').props.href,'#country-discovery-map');assert.ok(nodes(tree).filter(n=>n.type==='option').some(n=>JSON.stringify(n.props.children).includes('5')));
});
