import assert from 'node:assert/strict';
import { chromium } from './playwright.mjs';
const navegador = await chromium.launch();
const pagina = await navegador.newPage({viewport:{width:360,height:640}});
pagina.setDefaultTimeout(3000);
const url = process.env.MILLUS_URL || 'http://localhost:5174';
try {
 await pagina.goto(url);
 await pagina.locator('#nome').fill('Oficina Ação');
 await pagina.locator('#telefone').fill('13982071346');
 let quantidade = 0;
 while (!(await pagina.getByRole('button',{name:'Salvar recebimento',exact:true}).count()) && quantidade < 15) {
  if (await pagina.getByRole('button',{name:'Compressor de ar',exact:true}).count()) await pagina.getByRole('button',{name:'Compressor de ar',exact:true}).click();
  if (await pagina.locator('#ocorrencia').count()) await pagina.locator('#ocorrencia').fill('Perde pressão — informação do cliente');
  const anterior = await pagina.locator('#titulo-subtela').getAttribute('data-tela');
  await pagina.getByRole('button',{name:'Continuar',exact:true}).click();
  await pagina.waitForFunction(antes => document.querySelector('#titulo-subtela')?.getAttribute('data-tela') !== antes, anterior);
  quantidade++;
 }
 assert.ok(quantidade < 15, 'recebimento deve ser curto e independente da inspeção');
 await pagina.locator('#atendente').fill('João');
 await pagina.locator('#ciencia').check();
 await pagina.getByRole('button',{name:'Salvar recebimento',exact:true}).click();
 await pagina.getByRole('heading',{name:'Recebido · inspeção pendente',exact:true}).waitFor();
 const protocolo = await pagina.getByTestId('protocolo').innerText();
 await pagina.reload();
 await pagina.getByRole('heading',{name:'Recebido · inspeção pendente',exact:true}).waitFor();
 assert.equal(await pagina.getByTestId('protocolo').innerText(),protocolo);
 await pagina.getByRole('button',{name:'Iniciar inspeção',exact:true}).click();
 await pagina.getByRole('heading',{name:'Carcaça e componentes',exact:true}).waitFor();
 assert.equal(await pagina.getByLabel('Selecionar fotos da galeria').count(),0,'foto interna exige estado selecionado');
 await pagina.getByRole('button',{name:'Continuar',exact:true}).click();
 await pagina.getByRole('alert').filter({hasText:'Selecione um estado'}).waitFor();
 await pagina.getByRole('button',{name:'Retomar depois',exact:true}).click();
 await pagina.getByRole('heading',{name:'Recebido · inspeção em andamento',exact:true}).waitFor();
 await pagina.reload();
 await pagina.getByRole('button',{name:'Retomar inspeção',exact:true}).waitFor();
 console.log('PASS: cliente salvo sem inspeção; protocolo/reload/painel/retomada');
} finally { await navegador.close(); }
