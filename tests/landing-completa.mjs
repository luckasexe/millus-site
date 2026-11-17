import assert from 'node:assert/strict';
import { createServer as criarServidor } from 'vite';
import { createElement as criarElemento } from 'react';
import { renderToStaticMarkup as renderizar } from 'react-dom/server';
const servidor = await criarServidor({ server: { middlewareMode: true } });
try {
  const { HLMulti1000 } = await servidor.ssrLoadModule('/src/pages/HLMulti1000.tsx');
  const { MemoryRouter: Roteador } = await import('react-router-dom');
  const html = renderizar(criarElemento(Roteador, null, criarElemento(HLMulti1000)));
  assert.match(html, /1:100/);
  assert.match(html, /1:20/);
  assert.equal((html.match(/<details/g) || []).length, 4);
  assert.equal((html.match(/class="botao botao-primario hl-botao"/g) || []).length, 2);
  assert.match(html, /aproximadamente 3 minutos/);
  assert.match(html, /embalagem de 2 L/);
  assert.doesNotMatch(html, /3 em 1/);
  console.log('APROVADO: conteúdo técnico, FAQ, oferta inicial e final, legenda factual');
} finally { await servidor.close(); }
