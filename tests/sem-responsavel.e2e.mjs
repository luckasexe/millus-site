import assert from 'node:assert/strict';
import { chromium } from './playwright.mjs';
const navegador = await chromium.launch();
try {
 const pagina = await navegador.newPage({viewport:{width:360,height:640}});
 await pagina.goto(process.env.MILLUS_URL || 'http://localhost:5174');
 await pagina.getByLabel('Nome completo ou razão social').fill('Cliente Fixture');
 await pagina.getByLabel('Telefone / WhatsApp').fill('11987654321');
 await pagina.getByRole('button',{name:'Continuar',exact:true}).click();
 await pagina.waitForFunction(()=>document.querySelector('#titulo-subtela')?.getAttribute('data-tela')!=='cliente');
 assert.equal(await pagina.locator('#titulo-subtela').getAttribute('data-tela'),'tipo','Avança diretamente do cliente para equipamento');
 assert.equal(await pagina.getByLabel('Responsável pela entrega').count(),0);
} finally { await navegador.close(); }
