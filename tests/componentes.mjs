// Contratos HTML dos componentes reais, sem dependência adicional de testes.
import assert from 'node:assert/strict';
import { createServer as criarServidor } from 'vite';
import { createElement as criarElemento } from 'react';
import { renderToStaticMarkup as renderizar } from 'react-dom/server';
const servidor = await criarServidor({ server: { middlewareMode: true } });
try {
  const { Botao } = await servidor.ssrLoadModule('/src/components/ui/Botao.tsx');
  for (const variante of ['primario', 'secundario', 'contorno']) {
    const html = renderizar(criarElemento(Botao, { variante, disabled: true }, 'Consultar'));
    assert.match(html, /<button/);
    assert.match(html, /disabled/);
    assert.match(html, new RegExp(`botao-${variante}`));
  }
  assert.match(renderizar(criarElemento(Botao, { href: '#catalogo' }, 'Catálogo')), /<a[^>]+href="#catalogo"/);
  assert.throws(() => renderizar(criarElemento(Botao, { variante: 'link' }, 'Ação')), /destino real/);
  assert.match(renderizar(criarElemento(Botao, { variante: 'link', href: '#contato' }, 'Contato')), /<a[^>]+href="#contato"/);
  const { CampoBusca } = await servidor.ssrLoadModule('/src/components/ui/CampoBusca.tsx');
  const campo = renderizar(criarElemento(CampoBusca, { id: 'busca-teste', rotulo: 'Buscar produtos', name: 'busca', defaultValue: 'rolamento' }));
  assert.match(campo, /for="busca-teste"/);
  assert.match(campo, /type="search"/);
  assert.match(campo, /value="rolamento"/);
  const { Cartao } = await servidor.ssrLoadModule('/src/components/ui/Cartao.tsx');
  assert.match(renderizar(criarElemento(Cartao, { className: 'produto' }, 'Produto')), /<article class="cartao produto">Produto<\/article>/);
  console.log('APROVADO: variantes, disabled nativo, destinos, campo rotulado e cartão semântico');
} finally { await servidor.close(); }
