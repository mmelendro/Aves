const {test}=require('node:test'),assert=require('node:assert/strict'),load=require('./helpers/load-ts.cjs')();const {translateUiCopy}=load('lib/ui-copy.ts'),account=require('../content/account-ui-es.json'),island=require('../content/island-ui-es.json')
test('explicit interface templates preserve interpolated values and unknown text',()=>{assert.equal(translateUiCopy('Cancel',account),'Cancelar');assert.equal(translateUiCopy('Your {days} day draft',island,{days:3}),'Tu borrador de 3 días');assert.equal(translateUiCopy('Private {kind}',account,{kind:'Owner entered name'}),'Archivo privado: Owner entered name');assert.equal(translateUiCopy('A Māori species name absent from this dictionary',island),'A Māori species name absent from this dictionary');assert.equal(translateUiCopy('Your 4 day draft',island),'Tu borrador de 4 días')})

test('multiline interface paragraphs translate after normalization while retaining outer spacing',()=>{
 const key='A planning draft built from documented bird/site links, not live sightings.'
 const source='\n              A planning draft built from documented bird/site links, not live\n              sightings.  '
 assert.equal(translateUiCopy(source,island).trim(),island[key]);assert.ok(translateUiCopy(source,island).startsWith('\n              '));assert.ok(translateUiCopy(source,island).endsWith('  '));assert.equal(translateUiCopy(source,{}),source)
})
