import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from './playwright.mjs';
const destino=process.env.MILLUS_EVIDENCIAS || '/opt/data/cache/scratch/millus-evidencias'; mkdirSync(destino,{recursive:true});
const navegador=await chromium.launch();
try {
 for (const [width,height] of [[360,640],[390,844],[1440,900]]) {
  const pagina=await navegador.newPage({viewport:{width,height}}); pagina.setDefaultTimeout(4000);
  await pagina.goto(process.env.MILLUS_URL || 'http://localhost:5174');
  await pagina.locator('#nome').fill('Oficina Ação'); await pagina.locator('#telefone').fill('13982071346');
  async function verificar(tela) {
   const medidas=await pagina.evaluate(()=>{const r=s=>document.querySelector(s).getBoundingClientRect();return {altura:document.documentElement.scrollHeight,largura:document.documentElement.scrollWidth,botao:r('.barra-recebimento').bottom,marca:r('.marca-recebimento').x,conteudo:r('.abertura-recebimento').x,barra:r('.barra-recebimento').x};});
   assert.ok(medidas.altura<=height,`${width}x${height} ${tela}: altura ${medidas.altura}`);
   assert.ok(medidas.largura<=width,`${tela}: largura`);
   assert.ok(medidas.botao<=height,`${tela}: botões visíveis`);
   assert.ok(Math.abs(medidas.marca-medidas.conteudo)<1,`${tela}: marca alinhada`);
   assert.ok(Math.abs(medidas.barra-medidas.conteudo)<1,`${tela}: barra alinhada`);
   const campos=await pagina.locator('.campo-recebimento input:visible').evaluateAll(campos=>campos.map(c=>{const b=c.getBoundingClientRect();return {x:b.x,y:b.y,w:b.width,h:b.height};}));
   for(let i=1;i<campos.length;i++) { assert.ok(campos[i].y>=campos[i-1].y+campos[i-1].h); assert.ok(Math.abs(campos[i].x-campos[i-1].x)<1); }
  }
  async function proximo(nome='Continuar') {
   const antes=await pagina.locator('#titulo-subtela').getAttribute('data-tela');
   await pagina.getByRole('button',{name:nome,exact:true}).click();
   await pagina.waitForFunction(t=>document.querySelector('#titulo-subtela')?.getAttribute('data-tela')!==t,antes);
  }
  for(let i=0;i<7;i++) {
   const tela=await pagina.locator('#titulo-subtela').getAttribute('data-tela');
   if(tela==='tipo') await pagina.getByRole('button',{name:'Lavadora de alta pressão',exact:true}).click();
   if(tela==='ocorrencia') await pagina.locator('#ocorrencia').fill('Pressão oscilante');
   await verificar(tela);
   if(tela==='ciencia') { await pagina.locator('#atendente').fill('João');await pagina.locator('#ciencia').check();await proximo('Salvar recebimento'); } else await proximo();
  }
  await pagina.getByRole('button',{name:'Iniciar inspeção',exact:true}).click();
  await pagina.getByRole('heading',{name:'Carcaça e componentes',exact:true}).waitFor();
  // Seis imagens decodificáveis no item, cenário máximo documentado.
  const foto=await pagina.evaluate(async()=>{const c=document.createElement('canvas');c.width=100;c.height=60;c.getContext('2d').fillRect(0,0,100,60);return c.toDataURL().split(',')[1];});
  for(let i=0;i<5;i++) {
   const tela=await pagina.locator('#titulo-subtela').getAttribute('data-tela');
   await pagina.locator('select').selectOption('Danificado ou alteração');
   await pagina.getByLabel('Selecionar fotos da galeria').setInputFiles(Array.from({length:6},(_,j)=>({name:`foto-${j}.png`,mimeType:'image/png',buffer:Buffer.from(foto,'base64')})));
   await pagina.getByAltText('Foto: foto-5.png').waitFor();
   await verificar(tela+'-6-fotos');
   if(i===1) await pagina.screenshot({path:join(destino,`cabos-${width}.png`)});
   await proximo(i===4?'Concluir inspeção visual':'Continuar');
  }
  await pagina.getByRole('heading',{name:'Recebido · inspeção concluída',exact:true}).waitFor();
  await pagina.getByRole('button',{name:'Revisar registro',exact:true}).click();
  await pagina.locator('#titulo-subtela').waitFor();
  for(let i=0;i<60;i++) {
   await verificar('revisao-'+i);
   if(await pagina.getByRole('button',{name:'Voltar ao painel',exact:true}).count()) {await proximo('Voltar ao painel');break;}
   await proximo();
   assert.ok(i<59,'revisão deve terminar');
  }
  await pagina.screenshot({path:join(destino,`painel-${width}.png`)});
  await pagina.close(); console.log(`PASS layout vertical ${width}x${height}: cliente, inspeção com 6 fotos/item, revisão paginada`);
 }
} finally {await navegador.close();}
