import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { globSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
const cache = execFileSync('npm',['config','get','cache'],{encoding:'utf8'}).trim();
const pacote=globSync(join(cache,'_npx/*/node_modules/@playwright/test/package.json'))[0];
const {chromium}=createRequire(pacote)('playwright');
const foto={name:'fixture.png',mimeType:'image/png',buffer:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR4nGP4f4cBAAS5AdyMB9X0AAAAAElFTkSuQmCC','base64')};
async function executar(cenario,viewport={width:390,height:844}) {
 const navegador=await chromium.launch({headless:true,args:['--no-sandbox']});
 try {const contexto=await navegador.newContext({viewport});const pagina=await contexto.newPage();pagina.setDefaultTimeout(7000);await cenario(pagina,contexto);} finally {await navegador.close();}
}
async function abrir(pagina){await pagina.goto(process.env.URL_TESTE||'http://localhost:5174');await pagina.getByLabel('Nome completo').waitFor();}
async function preencher(pagina){await pagina.getByLabel('Nome completo').fill('Pessoa Fixture');await pagina.getByLabel('Telefone / WhatsApp').fill('11987654321');}
async function avancar(pagina,n=1){for(let i=0;i<n;i++)await pagina.getByRole('button',{name:'Continuar',exact:true}).click();}
async function medir(pagina){
 const m=await pagina.evaluate(()=>({h:document.documentElement.scrollHeight,c:innerHeight,w:document.documentElement.scrollWidth,l:innerWidth,cta:[...document.querySelectorAll('.barra-recebimento button')].map(e=>({top:e.getBoundingClientRect().top,bottom:e.getBoundingClientRect().bottom})),toques:[...document.querySelectorAll('.campo-recebimento input,.acoes-fotos button,.opcoes-acessorios label,.barra-recebimento button,summary,.miniatura-foto button')].map(e=>e.getBoundingClientRect().height)}));
 assert.ok(m.h<=m.c,JSON.stringify(m));assert.ok(m.w<=m.l,JSON.stringify(m));assert.ok(m.cta.every(e=>e.top>=0&&e.bottom<=m.c),JSON.stringify(m));assert.ok(m.toques.every(h=>h>=44),JSON.stringify(m));
 console.log('viewport',m.l,m.c,'documento',m.w,m.h);
}
test('subtelas validam antes de continuar; reload, fotos e resumo sem scroll',async()=>{
 for(const [width,height] of [[360,640],[390,844],[1440,900]]) await executar(async p=>{
  await abrir(p);await medir(p);await avancar(p);await p.getByText('Informe nome e sobrenome.',{exact:true}).waitFor();await medir(p);await p.waitForFunction(()=>document.activeElement.id==='nome');
  await preencher(p);assert.equal(await p.getByLabel('Telefone / WhatsApp').inputValue(),'(11) 98765-4321');await p.getByLabel('Responsável pela entrega').fill('Entrega Fixture');
  await avancar(p);await medir(p);await p.getByLabel('Marca').fill('Marca fixture');
  await p.getByRole('button',{name:'Voltar',exact:true}).click();assert.equal(await p.getByLabel('Nome completo').inputValue(),'Pessoa Fixture');
  await avancar(p,2);await medir(p);await p.getByLabel('Modelo').fill('Modelo fixture');await avancar(p);await medir(p);
  await p.getByLabel('Cabo de energia',{exact:true}).check();await p.getByLabel('Outros acessórios').fill('Adaptador fixture');await avancar(p);await medir(p);
  const data=await p.locator('time').getAttribute('datetime');
  await p.getByLabel('Selecionar fotos da galeria').setInputFiles(Array.from({length:6},(_,i)=>({...foto,name:`fixture-${i}.png`})));
  await p.waitForFunction(()=>document.querySelectorAll('.miniatura-foto img').length===6&&[...document.querySelectorAll('.miniatura-foto img')].every(i=>i.complete&&i.naturalWidth>0));await medir(p);
  await p.getByRole('status').filter({hasText:'Salvo neste navegador'}).waitFor();await p.reload();await p.getByLabel('Nome completo').waitFor();assert.equal(await p.getByLabel('Nome completo').inputValue(),'Pessoa Fixture');
  await avancar(p);assert.equal(await p.getByLabel('Marca').inputValue(),'Marca fixture');await avancar(p);assert.equal(await p.getByLabel('Modelo').inputValue(),'Modelo fixture');await avancar(p);assert.ok(await p.getByLabel('Cabo de energia',{exact:true}).isChecked());assert.equal(await p.getByLabel('Outros acessórios').inputValue(),'Adaptador fixture');await avancar(p);assert.equal(await p.locator('time').getAttribute('datetime'),data);assert.equal(await p.locator('.miniatura-foto').count(),6);
  await p.getByRole('button',{name:'Salvar e continuar',exact:true}).click();await p.getByRole('heading',{name:'Recebimento salvo neste navegador'}).waitFor();
  for(let i=0;i<6;i++){await medir(p);if(i<5)await avancar(p);}
  await p.reload();await p.getByRole('heading',{name:'Recebimento salvo neste navegador'}).waitFor();await p.getByRole('button',{name:'Voltar a editar'}).click();await p.getByLabel('Nome completo').waitFor();await avancar(p,4);
  await p.getByRole('button',{name:'Remover foto fixture-0.png'}).click();await p.getByRole('status').filter({hasText:'Salvo neste navegador'}).waitFor();await p.reload();await p.getByLabel('Nome completo').waitFor();await avancar(p,4);assert.equal(await p.locator('.miniatura-foto').count(),5);
 },{width,height});
});
test('opcionais e fallback acessível para teclado e zoom',()=>executar(async p=>{
 await abrir(p);await preencher(p);await avancar(p,4);await p.getByRole('button',{name:'Salvar e continuar',exact:true}).click();await p.getByRole('heading',{name:'Recebimento salvo neste navegador'}).waitFor();await p.getByRole('button',{name:'Voltar a editar'}).click();
 await p.setViewportSize({width:360,height:320});await p.getByLabel('Responsável pela entrega').focus();assert.equal(await p.evaluate(()=>document.activeElement.id),'responsavel');assert.ok(await p.evaluate(()=>document.documentElement.scrollHeight>innerHeight));await avancar(p);await p.getByLabel('Tipo de equipamento').waitFor();
}));
test('fotos: tipo, corrupção, tamanho, quantidade e câmera somente por ação',()=>executar(async(p,c)=>{
 await c.addInitScript(()=>{window.pedidosCamera=0;navigator.mediaDevices.getUserMedia=()=>{window.pedidosCamera++;throw Error('Não iniciar');};window.revogadas=[];const revogar=URL.revokeObjectURL.bind(URL);URL.revokeObjectURL=u=>{window.revogadas.push(u);revogar(u);};});
 await abrir(p);await preencher(p);await avancar(p,4);assert.equal(await p.evaluate(()=>window.pedidosCamera),0);assert.equal(await p.getByLabel('Tirar foto com câmera').getAttribute('capture'),'environment');
 const entrada=p.getByLabel('Selecionar fotos da galeria');
 for(const [arquivo,mensagem] of [[{name:'fixture.txt',mimeType:'text/plain',buffer:Buffer.from('fixture')},'JPEG'],[{name:'corrompida.png',mimeType:'image/png',buffer:Buffer.from('fixture')},'não pôde ser lida'],[{name:'grande.png',mimeType:'image/png',buffer:Buffer.alloc(5*1024*1024+1)},'5 MB']]){await entrada.setInputFiles(arquivo);await p.getByRole('alert').filter({hasText:mensagem}).waitFor();}
 await entrada.setInputFiles(Array.from({length:7},(_,i)=>({...foto,name:`fixture-${i}.png`})));await p.getByRole('alert').filter({hasText:'6 fotos'}).waitFor();assert.equal(await p.locator('.miniatura-foto').count(),6);await p.getByRole('button',{name:'Remover foto fixture-0.png'}).click();await p.waitForFunction(()=>window.revogadas.length>0);assert.equal(await p.locator('.miniatura-foto').count(),5);
}));
test('quota não confirma sucesso e permite tentar novamente',()=>executar(async(p,c)=>{
 await c.addInitScript(()=>{window.falhar=true;const gravar=IDBObjectStore.prototype.put;IDBObjectStore.prototype.put=function(...args){if(window.falhar)throw new DOMException('Quota fixture','QuotaExceededError');return gravar.apply(this,args);};});
 await abrir(p);await preencher(p);await avancar(p,4);await p.getByRole('button',{name:'Salvar e continuar',exact:true}).click();await p.getByRole('alert').filter({hasText:'Espaço insuficiente'}).waitFor();assert.equal(await p.getByRole('heading',{name:'Recebimento salvo neste navegador'}).count(),0);await p.getByRole('button',{name:'Salvar e continuar',exact:true}).waitFor();await p.evaluate(()=>window.falhar=false);await p.getByRole('button',{name:'Salvar e continuar',exact:true}).click();await p.getByRole('heading',{name:'Recebimento salvo neste navegador'}).waitFor();
}));
