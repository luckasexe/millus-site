// Execute no console em /produtos/hl-multi-1000; nenhum envio externo.
(async () => {
  const verificar = (condicao, mensagem) => { if (!condicao) throw new Error(mensagem); };
  const quadro = () => new Promise(resolver => requestAnimationFrame(resolver));
  verificar(!document.querySelector('.cabecalho-busca'), 'Cabeçalho sem busca de catálogo');
  verificar(document.querySelectorAll('.hl-botao').length === 2, 'Dois CTAs de produto');
  for (const volume of ['2 L', '5 L', '2 L']) {
    const entrada = document.querySelector(`input[value="${volume}"]`);
    entrada.click(); await quadro();
    verificar(entrada.checked, `Seleção ${volume}`);
    for (const resumo of document.querySelectorAll('.hl-resumo')) verificar(resumo.textContent.includes(`· ${volume}`), 'Resumos sincronizados');
    for (const botao of document.querySelectorAll('.hl-botao')) {
      const endereco = new URL(botao.href);
      verificar(endereco.searchParams.get('phone') === '5513982071346', 'Destino comercial');
      verificar(endereco.searchParams.get('text').includes(`embalagem de ${volume}.`), 'Volume no orçamento');
    }
    verificar(document.querySelector('figcaption').textContent.includes(`embalagem de ${volume}`), 'Legenda corresponde à foto selecionada');
    verificar(document.querySelector('.hl-produto img').getAttribute('src').includes(volume === '2 L' ? '-2l.webp' : '-5l.webp'), 'Foto oficial alterna com o volume');
    await document.querySelector('.hl-produto img').decode();
  }
  verificar(document.querySelector('.hl-produto img').complete && document.querySelector('.hl-produto img').naturalWidth > 0, 'Foto real decodificada');
  verificar(document.querySelectorAll('details').length === 4, 'Quatro perguntas nativas');
  verificar(document.documentElement.scrollWidth <= innerWidth, 'Sem overflow');
  document.querySelector('#hl-diluicao').scrollIntoView({behavior:'instant'}); await quadro();
  verificar(Math.abs(document.querySelector('header').getBoundingClientRect().top) < 1, 'Cabeçalho sticky');
  verificar(document.querySelector('#hl-diluicao').getBoundingClientRect().top >= document.querySelector('header').getBoundingClientRect().bottom, 'Âncora livre do cabeçalho');
  return 'APROVADO: landing completa, CTAs sincronizados 2/5/2, destino, imagem, FAQ, sticky, âncora e largura';
})();
