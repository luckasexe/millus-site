// Execute no console do navegador em /produtos/hl-multi-1000.
// Não abre o WhatsApp nem envia mensagens. Retorna as verificações.
(async () => {
  const verificar = (condicao, mensagem) => { if (!condicao) throw new Error(mensagem); };
  const proximoQuadro = () => new Promise(resolver => requestAnimationFrame(resolver));
  verificar(document.querySelector('h1')?.textContent.includes('HL MULTI'), 'Página do produto renderizada');
  for (const volume of ['2 L', '5 L', '2 L']) {
    const entrada = document.querySelector(`input[value="${volume}"]`);
    verificar(entrada, `Volume ${volume} disponível`);
    entrada.click();
    await proximoQuadro();
    verificar(entrada.checked, `Selecionado ${volume}`);
    verificar(document.querySelector('.hl-resumo').textContent.includes(`· ${volume}`), `Resumo corresponde a ${volume}`);
    const endereco = new URL(document.querySelector('.hl-botao').href);
    verificar(endereco.searchParams.get('phone') === '5513982071346', 'Destino Millus preservado');
    verificar(endereco.searchParams.get('text').includes(`HL Multi 1000 Henlau, embalagem de ${volume}.`), `Orçamento corresponde a ${volume}`);
  }
  verificar([...document.querySelectorAll('.hl-pagina img')].every(imagem => imagem.complete && imagem.naturalWidth > 0), 'Imagem do produto carregada');
  verificar(document.documentElement.scrollWidth <= innerWidth, 'Sem transbordamento horizontal');
  return 'APROVADO: seleção 2/5/2 L, resumo, orçamento, imagem e largura';
})();
