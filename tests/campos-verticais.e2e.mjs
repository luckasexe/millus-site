import assert from 'node:assert/strict';
import { chromium } from './playwright.mjs';
const navegador = await chromium.launch({ args: ['--no-sandbox'] });
try {
  for (const largura of [360, 390, 768, 1440]) {
    const pagina = await navegador.newPage({ viewport: { width: largura, height: largura === 360 ? 640 : 900 } });
    await pagina.goto(process.env.MILLUS_URL || 'http://localhost:5174');
    const nome = pagina.getByLabel('Nome completo ou razão social');
    await nome.waitFor();
    const caixaNome = await nome.boundingBox();
    const caixaTelefone = await pagina.getByLabel('Telefone / WhatsApp').boundingBox();
    assert.ok(caixaTelefone.y >= caixaNome.y + caixaNome.height, `Telefone deve ficar abaixo do nome em ${largura}px`);
    assert.ok(Math.abs(caixaTelefone.x - caixaNome.x) < 1);
    assert.ok(Math.abs(caixaTelefone.width - caixaNome.width) < 1);
    assert.equal(await pagina.evaluate(() => document.documentElement.scrollHeight <= innerHeight), true);
    await pagina.close();
  }
} finally { await navegador.close(); }
