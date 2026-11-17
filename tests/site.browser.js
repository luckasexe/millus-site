// Execute no navegador na página inicial. Não abre links externos.
(async () => {
  const verificar = (condicao, mensagem) => { if (!condicao) throw new Error(mensagem); };
  const aguardar = () => new Promise(resolver => setTimeout(resolver, 120));
  verificar(document.querySelector('h1')?.textContent.includes('Tudo o que sua indústria'), 'Nova home institucional');
  const busca = document.querySelector('#busca-catalogo');
  verificar(busca, 'Busca acessível do catálogo');
  const preencher = async valor => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(busca, valor);
    busca.dispatchEvent(new Event('input', { bubbles: true }));
    await aguardar();
  };
  await preencher('ROL-001');
  verificar(document.querySelectorAll('.produto').length === 1, 'Busca por código');
  await preencher('nada-encontrado-xyz');
  verificar(document.querySelector('.catalogo-vazio'), 'Estado vazio explícito');
  await preencher('');
  verificar(document.querySelectorAll('.produto').length === 15, 'Catálogo local completo');
  document.querySelector('[data-categoria="Vedações"]').click();
  await aguardar();
  verificar(document.querySelectorAll('.produto').length === 2, 'Filtro de categoria');
  document.querySelector('[data-categoria="Todas"]').click();
  await aguardar();
  const orcamento = new URL(document.querySelector('.produto a').href);
  verificar(orcamento.hostname === 'wa.me' && orcamento.pathname === '/5513982071346', 'Destino comercial correto');
  verificar(orcamento.searchParams.get('text').includes('ROL-001'), 'Produto no orçamento');
  for (const imagem of document.images) { imagem.loading = 'eager'; await imagem.decode(); }
  verificar(document.documentElement.scrollWidth <= innerWidth, 'Sem overflow horizontal');
  const menu = document.querySelector('.menu-acionador');
  if (getComputedStyle(menu).display !== 'none') {
    menu.click(); await aguardar(); verificar(menu.getAttribute('aria-expanded') === 'true', 'Menu abre');
    document.querySelector('#navegacao a').click(); await aguardar();
    verificar(menu.getAttribute('aria-expanded') === 'false', 'Menu fecha ao navegar');
  }
  return 'APROVADO: home, busca, vazio, 15 produtos, categoria, orçamento, imagens, largura e menu';
})();
