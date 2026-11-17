// Executar na home, após site.browser.js. Fixtures temporárias nunca entram na página pública.
(async () => {
  const verificar = (condicao, mensagem) => { if (!condicao) throw new Error(mensagem); };
  const aguardar = () => new Promise(resolver => requestAnimationFrame(() => requestAnimationFrame(resolver)));
  const medir = elemento => { const caixa = elemento.getBoundingClientRect(); return [caixa.width, caixa.height]; };
  for (const seletor of ['.cabecalho-busca', '.busca']) {
    const conteiner = document.querySelector(seletor);
    const antes = medir(conteiner);
    conteiner.querySelector('input').focus();
    await aguardar();
    verificar(JSON.stringify(antes) === JSON.stringify(medir(conteiner)), `${seletor}: foco sem salto`);
    verificar(getComputedStyle(conteiner.querySelector('input')).outlineStyle === 'none', 'Sem contorno redundante no input');
    verificar(getComputedStyle(conteiner).boxShadow !== 'none', 'Contêiner destaca foco');
  }
  const luminosidade = cor => {
    const canais = cor.match(/[\d.]+/g).slice(0,3).map(canal => Number(canal) / 255).map(canal => canal <= .04045 ? canal / 12.92 : ((canal + .055) / 1.055) ** 2.4);
    return canais[0] * .2126 + canais[1] * .7152 + canais[2] * .0722;
  };
  const contraste = (a, b) => { const valores = [luminosidade(a), luminosidade(b)].sort((a,b) => b-a); return (valores[0]+.05)/(valores[1]+.05); };
  const resultados = [];
  const area = document.createElement('div');
  area.style.cssText = 'position:fixed;left:20px;top:180px;z-index:100;background:white;padding:20px';
  document.body.append(area);
  try {
    for (const variante of ['primario', 'secundario', 'contorno', 'link']) {
      const botao = document.createElement(variante === 'link' ? 'a' : 'button');
      if (variante === 'link') botao.href = '#contato';
      botao.className = `botao botao-${variante}`;
      botao.textContent = 'Consultar';
      area.append(botao);
      const estilo = getComputedStyle(botao);
      const fundo = estilo.backgroundColor === 'rgba(0, 0, 0, 0)' ? 'rgb(255,255,255)' : estilo.backgroundColor;
      const razao = contraste(estilo.color, fundo);
      verificar(razao >= 4.5, `Contraste textual ${variante}`);
      const antes = medir(botao);
      botao.focus(); await aguardar();
      verificar(getComputedStyle(botao).outlineStyle !== 'none', `Foco de ${variante}`);
      verificar(JSON.stringify(antes) === JSON.stringify(medir(botao)), `Foco estável ${variante}`);
      if (variante !== 'link') {
        botao.disabled = true;
        verificar(botao.matches(':disabled'), `Disabled nativo ${variante}`);
        verificar(getComputedStyle(botao).cursor === 'not-allowed', `Disabled visual ${variante}`);
        verificar(JSON.stringify(antes) === JSON.stringify(medir(botao)), `Disabled estável ${variante}`);
      }
      resultados.push({ variante, contraste: Number(razao.toFixed(2)) });
    }
  } finally { area.remove(); }
  window.scrollTo({top:900,behavior:'instant'}); await aguardar();
  verificar(document.querySelector('.cabecalho').getBoundingClientRect().top === 0, 'Cabeçalho sticky no topo');
  verificar(parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) > document.querySelector('.cabecalho').getBoundingClientRect().height, 'Compensação de âncora');
  window.scrollTo({top:0,behavior:'instant'});
  return { resultado: 'APROVADO: foco, dimensões, contraste, variantes, disabled, sticky e âncoras', resultados };
})();
