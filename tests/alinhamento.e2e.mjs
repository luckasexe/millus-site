import assert from 'node:assert/strict';
import { chromium } from './playwright.mjs';
const navegador = await chromium.launch({ args: ['--no-sandbox'] });
try {
  for (const largura of [360, 390, 1440]) {
    const pagina = await navegador.newPage({ viewport: { width: largura, height: largura === 360 ? 640 : 900 } });
    await pagina.goto(process.env.MILLUS_URL || 'http://localhost:5174');
    await pagina.getByLabel('Nome completo ou razão social').waitFor();
    for (let tela = 0; tela < 2; tela++) {
      const medidas = await pagina.evaluate(() => {
        const caixa = seletor => document.querySelector(seletor).getBoundingClientRect();
        return { marca: caixa('.marca-recebimento').x, conteudo: caixa('.abertura-recebimento').x,
          botoes: caixa('.barra-recebimento > div').x, borda: caixa('.barra-recebimento').x,
          larguraBotoes: caixa('.barra-recebimento > div').width, larguraBarra: caixa('.barra-recebimento').width,
          altura: document.documentElement.scrollHeight, viewport: innerHeight };
      });
      assert.ok(Math.abs(medidas.marca - medidas.conteudo) < 1, `Cabeçalho alinhado ao conteúdo em ${largura}`);
      assert.ok(Math.abs(medidas.botoes - medidas.borda) < 1, `Barra alinhada em ${largura}`);
      assert.ok(Math.abs(medidas.larguraBotoes - medidas.larguraBarra) < 1);
      assert.ok(medidas.altura <= medidas.viewport);
      if (tela === 0) {
        await pagina.getByLabel('Nome completo ou razão social').fill('Empresa Fixture');
        await pagina.getByLabel('Telefone / WhatsApp').fill('11987654321');
        await pagina.getByRole('button', { name: 'Continuar', exact: true }).click();
      }
    }
    await pagina.close();
  }
} finally { await navegador.close(); }
