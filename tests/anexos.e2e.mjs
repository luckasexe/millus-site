import assert from 'node:assert/strict';
import { chromium } from './playwright.mjs';
const navegador = await chromium.launch();
const pagina = await navegador.newPage(); pagina.setDefaultTimeout(3000);
const url = process.env.MILLUS_URL || 'http://localhost:5174';
const bytes = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAACgAAAAYCAIAAAAH5iiXAAAAKElEQVR4nO3NMQ0AAAgDsPnXiBdQQfY06d/spKKzisVisVgsFovFLw4e6/WbZnHDtgAAAABJRU5ErkJggg==','base64');
async function ir(nome) {
 const antes = await pagina.locator('#titulo-subtela').getAttribute('data-tela');
 await pagina.getByRole('button',{name:nome,exact:true}).click();
 await pagina.waitForFunction(tela => document.querySelector('#titulo-subtela')?.getAttribute('data-tela')!==tela, antes);
}
try {
 await pagina.goto(url);
 await pagina.evaluate(async () => { const {criarRascunho,gravarRascunho}=await import('/src/features/recebimento/recebimento.service.ts');
  await gravarRascunho({...criarRascunho(),nome:'Ação',telefone:'(13) 98207-1346',tipo:'lavadora',protocolo:'MILLUS-FIXTURE',tela:'painel',atendente:'João',ciencia:true,respostas:{ocorrencia:'Perda de pressão'}},''); });
 await pagina.reload();
 await pagina.getByRole('button',{name:'Iniciar inspeção',exact:true}).click();
 await pagina.getByRole('heading',{name:'Carcaça e componentes',exact:true}).waitFor();
 await pagina.locator('select').selectOption('Não observado');
 await ir('Continuar');
 await pagina.locator('select').selectOption('Danificado ou alteração');
 await pagina.getByLabel('Selecionar fotos da galeria').setInputFiles({name:'cabo-danificado.png',mimeType:'image/png',buffer:bytes});
 await pagina.getByAltText('Foto: cabo-danificado.png').waitFor();
 await pagina.locator('select').selectOption('Sem alteração');
 await pagina.getByText('Estado capturado preservado', {exact:false}).waitFor();
 await ir('Continuar');
 await pagina.locator('select').selectOption('Danificado ou alteração');
 await pagina.getByLabel('Selecionar fotos da galeria').setInputFiles({name:'mangueira.png',mimeType:'image/png',buffer:bytes});
 await pagina.getByAltText('Foto: mangueira.png').waitFor();
 await pagina.reload();
 await pagina.getByAltText('Foto: mangueira.png').waitFor();
 await pagina.getByRole('button',{name:'Retomar depois',exact:true}).click();
 await pagina.getByRole('heading',{name:'Recebido · inspeção em andamento',exact:true}).waitFor();
 const registro = await pagina.evaluate(async () => {const {lerRascunho}=await import('/src/features/recebimento/recebimento.service.ts');const d=await lerRascunho();return {...d,fotosInspecao:d.fotosInspecao.map(({arquivo,...foto})=>({...foto,size:arquivo.size}))};});
 assert.equal(registro.fotosInspecao.length,2);
 assert.equal(registro.fotosInspecao[0].itemId,'visual-cabos');
 assert.equal(registro.fotosInspecao[0].estado,'Danificado ou alteração');
 assert.equal(registro.respostas['visual-cabos'],'Sem alteração');
 assert.equal(registro.fotosInspecao[1].itemId,'visual-mangueiras');
 await pagina.getByRole('button',{name:'Editar básicos',exact:true}).click();
 await pagina.locator('#nome').waitFor();
 for(let i=0;i<8;i++) {
  if(await pagina.getByRole('button',{name:'Outros',exact:true}).count()) await pagina.getByRole('button',{name:'Outros',exact:true}).click();
  if(await pagina.locator('#ciencia').count()) break;
  await ir('Continuar');
 }
 await pagina.getByRole('button',{name:'Salvar recebimento',exact:true}).click();
 await pagina.getByRole('button',{name:'Retomar inspeção',exact:true}).click();
 await pagina.getByRole('heading',{name:'Carcaça e componentes',exact:true}).waitFor();
 const preservadas=await pagina.evaluate(async()=>{const {lerRascunho}=await import('/src/features/recebimento/recebimento.service.ts');return (await lerRascunho()).fotosInspecao.map(f=>({itemId:f.itemId,estado:f.estado}));});
 assert.equal(preservadas.length,2);
 assert.equal(preservadas[1].itemId,'visual-mangueiras');
 console.log('PASS: anexos no item + estado capturado imutável + reload + categoria alterada sem perda');
} finally { await navegador.close(); }
