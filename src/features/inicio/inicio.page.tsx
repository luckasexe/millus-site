import { campanhas, colecoes, noticias } from './inicio.dados';
import { useInicio } from './inicio.hook';
import { Cabecalho } from './components/cabecalho';
import { Hero } from './components/hero';
import { Colecao } from './components/colecao';
import { Carrossel } from './components/carrossel';
import { Seta } from './components/icones';
import { Rodape } from './components/rodape';
import { Sobreposicoes } from './components/sobreposicoes';

export function InicioPagina() {
  const estado = useInicio();
  return <>
    <a className="pular-conteudo" href="#conteudo">Pular para o conteúdo</a>
    <Cabecalho estado={estado} />
    <main id="conteudo" inert={estado.menuAberto || estado.preferenciasAbertas}>
      <Hero estado={estado} />
      <section className="filosofia" id="sobre-millus">
        <h2 className="titulo-secao">O JEITO MILLUS</h2>
        <p className="filosofia-manifesto">NOSSO COMPROMISSO É OFERECER SOLUÇÕES QUE SUPERAM EXPECTATIVAS, UNINDO QUALIDADE, CONFIANÇA E EXCELÊNCIA EM CADA EXPERIÊNCIA.</p>
        <a className="botao" href="#colecoes">CONHEÇA A MILLUS</a>
      </section>
      <section className="colecoes" id="colecoes" aria-labelledby="titulo-colecoes">
        <h2 className="titulo-secao" id="titulo-colecoes">Coleções</h2>
        {colecoes.map(colecao => <Colecao.Root key={colecao.id} id={colecao.id}>
          <Colecao.Conteudo>
            <Colecao.Cabecalho titulo={colecao.titulo} />
            <Colecao.Descricao texto={colecao.descricao} />
            <Colecao.Link destino={colecao.destino} texto={colecao.rotulo} />
          </Colecao.Conteudo>
          <Colecao.Imagem origem={colecao.imagem} descricao="" />
        </Colecao.Root>)}
      </section>
      <section className="campanhas" id="destaques" aria-labelledby="titulo-identidade">
        <div className="letreiro" aria-hidden="true"><div>{[0, 1, 2, 3].map(i => <span key={i}>MILLUS <b> / </b> CUIDADO AUTOMOTIVO</span>)}</div></div>
        <h2 className="titulo-secao" id="titulo-identidade">Destaques</h2>
        <Carrossel nome="Destaques das coleções" variante="carrossel-campanhas">
          {campanhas.map(item => <a className="cartao-campanha" href={item.destino} key={item.titulo}>
            <img src={item.imagem} alt="" loading="lazy" width="640" height="400" />
            <div><h3>{item.titulo}</h3><Seta /></div>
          </a>)}
        </Carrossel>
      </section>
      <section className="loja-editorial rede-automotiva" id="rede" aria-labelledby="titulo-rede">
        <img src="/assets/referencia/dot-map.png" alt="" loading="lazy" />
        <div>
          <h2 id="titulo-rede">Rede de profissionais</h2>
          <p>Consulte o mapa de distribuidores e profissionais de estética automotiva.</p>
          <a className="botao botao-claro" href="https://gyeon.co/network/">Explorar a rede</a>
        </div>
      </section>
      <section className="noticias" id="noticias" aria-labelledby="titulo-noticias">
        <h2 className="titulo-secao" id="titulo-noticias">Notícias e novidades</h2>
        <Carrossel nome="Notícias automotivas" variante="carrossel-noticias">
          {noticias.map(item => <a className="cartao-noticia" href={item.destino} key={item.destino}>
            <img src={item.imagem} alt="" loading="lazy" width="640" height="400" />
            <div className="noticia-conteudo"><time>{item.data}</time><h3>{item.titulo}</h3><Seta /></div>
          </a>)}
        </Carrossel>
      </section>
    </main>
    <Rodape abrirPreferencias={() => estado.definirPreferenciasAbertas(true)} />
    <Sobreposicoes estado={estado} />
  </>;
}
