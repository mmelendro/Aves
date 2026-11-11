const {test}=require('node:test');
const assert=require('node:assert/strict');
const {componentHarness}=require('./helpers/component-harness.cjs');
test('the public background choice survives route reloads without saving traveller data',()=>{
 const values=new Map([['aves.map.background.v1','satellite']]);
 const sessionStorage={getItem:k=>values.get(k),setItem:(k,v)=>values.set(k,v)};
 const first=componentHarness('components/map-background-context.tsx','MapBackgroundProvider',{children:'map'},{runEffects:true,window:{sessionStorage}});
 first.render();let tree=first.render();assert.equal(tree.props.value.background,'satellite');
 tree.props.value.setBackground('habitats');assert.equal(first.render().props.value.background,'habitats');
 const second=componentHarness('components/map-background-context.tsx','MapBackgroundProvider',{children:'map'},{runEffects:true,window:{sessionStorage}});
 second.render();assert.equal(second.render().props.value.background,'habitats');assert.deepEqual([...values.keys()],['aves.map.background.v1']);
});
test('blocked browser storage cannot prevent switching the public map background',()=>{
 const sessionStorage={getItem(){throw Error('blocked')},setItem(){throw Error('blocked')}};
 const h=componentHarness('components/map-background-context.tsx','MapBackgroundProvider',{children:'map'},{runEffects:true,window:{sessionStorage}});
 const tree=h.render();tree.props.value.setBackground('satellite');assert.equal(h.render().props.value.background,'satellite');
});
