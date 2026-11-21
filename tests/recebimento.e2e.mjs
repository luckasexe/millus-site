import assert from 'node:assert/strict';
import { chromium } from './playwright.mjs';
const navegador=await chromium.launch();
const url=process.env.MILLUS_URL || 'http://localhost:5174';
const imagem=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAACgAAAAYCAIAAAAH5iiXAAAAKElEQVR4nO3NMQ0AAAgDsPnXiBdQQfY06d/spKKzisVisVgsFovFLw4e6/WbZnHDtgAAAABJRU5ErkJggg==','base64');
async function proximo(pagina,nome='Continuar') {
 const antes=await pagina.locator('#titulo-subtela').getAttribute('data-tela');
 await pagina.getByRole('button',{name:nome,exact:true}).click();
 await pagina.waitForFunction(t=>document.querySelector('#titulo-subtela')?.getAttribute('data-tela')!==t,antes);
}
async function ler(pagina) {return pagina.evaluate(async()=>{const {lerRascunho}=await import('/src/features/recebimento/recebimento.service.ts');const d=await lerRascunho();return {...d,fotos:d.fotos.map(({arquivo,...f})=>({...f,size:arquivo.size})),fotosInspecao:d.fotosInspecao.map(({arquivo,...f})=>({...f,size:arquivo.size}))};});}
async function persistenciaMidiaQuota() {
 const pagina=await navegador.newPage({viewport:{width:360,height:640}});pagina.setDefaultTimeout(4000);
 await pagina.addInitScript(()=>{
  window.seletores=0;window.revogadas=[];
  document.addEventListener('click',e=>{if(e.target instanceof HTMLInputElement && e.target.type==='file')window.seletores++;},true);
  const put=IDBObjectStore.prototype.put;IDBObjectStore.prototype.put=function(...args){if(window.simularQuota)throw new DOMException('Quota simulada','QuotaExceededError');return put.apply(this,args);};
  const revogar=URL.revokeObjectURL;URL.revokeObjectURL=endereco=>{window.revogadas.push(endereco);revogar(endereco);};
 });
 await pagina.goto(url);await pagina.locator('#nome').waitFor();
 await pagina.evaluate(async bytes=>{
  await new Promise((resolve,reject)=>{const p=indexedDB.open('millus-recebimento',1);p.onsuccess=()=>{const b=p.result;const t=b.transaction('rascunhos','readwrite');t.objectStore('rascunhos').put({versao:2,revisao:'antiga',tela:'visual-4',protocolo:'MILLUS-LEGADO',nome:'Legado',telefone:'(13) 98207-1346',tipo:'lavadora',responsavel:'João',recebidoEm:'2025-03-20T12:23:00.000Z',respostas:{ocorrencia:'Problema prévio', 'historico-0':'Sim', 'visual-2':'Alteração visível'},complementos:{'historico-0':'Queda no transporte'},fotos:[{id:'antiga',nome:'legado.png',arquivo:new Blob([new Uint8Array(bytes)],{type:'image/png'})}]},'atual');t.oncomplete=()=>{b.close();resolve();};t.onerror=reject;};});
 },[...imagem]);
 await pagina.reload();
 await pagina.getByRole('heading',{name:'Recebido · inspeção pendente',exact:true}).waitFor();
 assert.equal(await pagina.evaluate(()=>window.seletores),0);
 await pagina.getByRole('button',{name:'Editar básicos',exact:true}).click();
 await pagina.locator('#nome').fill('Oficina corrigida');
 await pagina.locator('.fotos-contexto summary').click();
 const galeria=pagina.getByLabel('Selecionar fotos da galeria');
 for(const [arquivo,mensagem] of [
  [{name:'arquivo.txt',mimeType:'text/plain',buffer:Buffer.from('x')},'JPEG'],
  [{name:'ruim.png',mimeType:'image/png',buffer:Buffer.from('corrompida')},'não pôde ser lida'],
  [{name:'grande.png',mimeType:'image/png',buffer:Buffer.alloc(5*1024*1024+1)},'5 MB'],
 ]) {await galeria.setInputFiles(arquivo);await pagina.getByRole('alert').filter({hasText:mensagem}).waitFor();}
 await pagina.evaluate(()=>{const decodificar=createImageBitmap;window.restaurar=()=>{window.createImageBitmap=decodificar;};window.createImageBitmap=async(...args)=>{await new Promise(r=>setTimeout(r,300));return decodificar(...args);};});
 await galeria.setInputFiles({name:'recebimento.png',mimeType:'image/png',buffer:imagem});
 await pagina.getByText('Preparando fotos…').waitFor();
 assert.equal(await pagina.getByRole('button',{name:'Continuar',exact:true}).isDisabled(),true);
 await pagina.getByAltText('Foto: recebimento.png').waitFor();
 assert.equal(await pagina.getByAltText('Foto: recebimento.png').evaluate(i=>i.complete&&i.naturalWidth>0),true);
 await pagina.evaluate(()=>window.restaurar());
 await galeria.setInputFiles(Array.from({length:6},(_,i)=>({name:`extra-${i}.png`,mimeType:'image/png',buffer:imagem})));
 await pagina.getByRole('alert').filter({hasText:'6 fotos'}).waitFor();
 const miniatura=await pagina.getByAltText('Foto: extra-0.png').getAttribute('src');
 await pagina.getByRole('button',{name:'Remover foto extra-0.png',exact:true}).click();
 await pagina.waitForFunction(endereco=>window.revogadas.includes(endereco),miniatura);
 await pagina.getByRole('status').filter({hasText:'Salvo neste navegador'}).waitFor();
 let salvo=await ler(pagina);assert.equal(salvo.fotos.length,6); // legado + cinco no contexto cliente
 assert.equal(salvo.fotos.find(f=>f.nome==='recebimento.png').itemId,'cliente');
 assert.equal(salvo.fotos.find(f=>f.nome==='recebimento.png').origem,'cliente');
 await pagina.reload();await pagina.locator('#nome').waitFor();assert.equal(await pagina.locator('#nome').inputValue(),'Oficina corrigida');
 assert.equal(await pagina.locator('time').getAttribute('datetime'),'2025-03-20T12:23:00.000Z');await proximo(pagina);
 for(let i=0;i<6;i++) {if(await pagina.locator('#atendente').count())break;await proximo(pagina);}
 await pagina.getByRole('button',{name:'Salvar recebimento',exact:true}).click();
 await pagina.getByText('Informe o nome do atendente.',{exact:true}).waitFor();
 await pagina.locator('#atendente').fill('Márcia');await pagina.locator('#ciencia').check();
 await pagina.getByRole('status').filter({hasText:'Salvo neste navegador'}).waitFor();
 await pagina.evaluate(()=>{window.simularQuota=true;});
 await pagina.getByRole('button',{name:'Salvar recebimento',exact:true}).click();
 await pagina.getByRole('alert').filter({hasText:'Falha ao salvar'}).waitFor();
 assert.equal(await pagina.locator('#atendente').inputValue(),'Márcia');
 assert.equal(await pagina.getByTestId('protocolo').count(),0);
 await pagina.evaluate(()=>{window.simularQuota=false;});await pagina.getByRole('button',{name:'Salvar recebimento',exact:true}).click();
 await pagina.getByTestId('protocolo').waitFor();assert.equal(await pagina.getByTestId('protocolo').innerText(),'MILLUS-LEGADO');
 salvo=await ler(pagina);assert.equal(salvo.versao,3);assert.equal(salvo.respostas['historico-0'],'Sim');assert.equal(salvo.respostas['visual-2'],'Alteração visível');assert.equal(salvo.fotos[0].size,imagem.length);
 await pagina.getByRole('button',{name:'Revisar registro',exact:true}).click();
 await pagina.getByRole('button',{name:'Corrigir',exact:true}).click();await pagina.locator('#nome').fill('Oficina revisão');await proximo(pagina);
 await pagina.getByRole('heading',{name:'Revisão do recebimento',exact:true}).waitFor();
 let legado=false,foto=false;
 for(let i=0;i<40;i++) {
  if(await pagina.getByText('Queda no transporte',{exact:false}).count())legado=true;
  if(await pagina.getByAltText('Foto: legado.png').count())foto=true;
  if(await pagina.getByRole('button',{name:'Voltar ao painel',exact:true}).count())break;
  await proximo(pagina);
 }
 assert.ok(legado&&foto,'legado visível na revisão');
 await pagina.close();console.log('PASS: migração v2, foto contextual de recebimento, remoção/Blob/reload/correção, quota e recuperação');
}
async function concorrencia() {
 const contexto=await navegador.newContext({viewport:{width:360,height:320}});const a=await contexto.newPage(),b=await contexto.newPage();
 await Promise.all([a.goto(url),b.goto(url)]);await Promise.all([a.locator('#nome').waitFor(),b.locator('#nome').waitFor()]);
 await a.locator('#nome').fill('Primeira aba');await a.getByRole('status').filter({hasText:'Salvo neste navegador'}).waitFor();
 await b.locator('#nome').fill('Segunda aba');await b.getByRole('alert').filter({hasText:'Outra aba alterou o registro'}).waitFor();assert.equal(await b.locator('#nome').inputValue(),'Segunda aba');
 await b.reload();await b.locator('#nome').waitFor();assert.equal(await b.locator('#nome').inputValue(),'Primeira aba');
 await b.locator('#telefone').focus();assert.equal(await b.evaluate(()=>document.activeElement.id),'telefone');assert.ok(await b.evaluate(()=>document.documentElement.scrollHeight>innerHeight));
 await contexto.close();console.log('PASS: conflito entre abas sem sobrescrita e rolagem natural com viewport reduzido');
}
try {await persistenciaMidiaQuota();await concorrencia();} finally {await navegador.close();}
await import('./fases.e2e.mjs');
await import('./anexos.e2e.mjs');
await import('./layout-v3.e2e.mjs');
