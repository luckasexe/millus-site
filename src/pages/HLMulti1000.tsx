import { Link } from 'react-router-dom';
import { CarFront, Droplets, Factory, ArrowDown } from 'lucide-react';
import { OfertaProduto } from '../components/OfertaProduto';
import { hlMulti1000 } from '../data/hlMulti1000';
import './hl-multi-1000.css';

const aplicacoes = [
  { icone: CarFront, titulo: 'Limpeza automotiva', texto: 'Automóveis, ônibus, caminhões, baús e interiores de veículos.' },
  { icone: Factory, titulo: 'Limpeza geral', texto: 'Aplicações em fórmicas, coifas e vidros, conforme as orientações do fabricante.' },
  { icone: Droplets, titulo: 'Sujidades do dia a dia', texto: 'Para limpeza de gorduras, óleos, graxas e incrustações.' },
];

export function HLMulti1000() {
  return <div className="hl-pagina">
    <main id="principal">
      <div className="hl-conteiner">
        <Link className="hl-voltar" to="/">← Voltar para a Millus</Link>
        <section className="hl-destaque" aria-labelledby="hl-titulo">
          <div className="hl-introducao">
            <p className="hl-sobretitulo">HENLAU / LIMPEZA PROFISSIONAL</p>
            <h1 id="hl-titulo">HL MULTI <span>1000.</span></h1>
            <p className="hl-chamada">Um multiuso.<br />Muitas possibilidades de limpeza.</p>
            <p className="hl-descricao">Detergente multiuso 3 em 1, solúvel em água, para limpeza geral e automotiva. Encontre na Millus as opções de 2 e 5 litros.</p>
            <a className="hl-detalhes" href="#hl-aplicacoes">Conheça as aplicações <ArrowDown size={16} aria-hidden="true" /></a>
          </div>
          <figure className="hl-produto">
            <span className="hl-etiqueta-produto">DETERGENTE MULTIUSO · 3 EM 1</span>
            <img src="/assets/hl-multi-1000.jpg" alt="Embalagem Henlau HL Multi 1000 de 5 litros" width="600" height="800" />
            <figcaption>Foto do fabricante · embalagem de 5 L</figcaption>
          </figure>
          <OfertaProduto.Raiz>
            <p className="hl-sobretitulo">SEU PRÓXIMO PASSO</p>
            <h2>Leve para sua rotina.</h2>
            <OfertaProduto.SeletorVolume />
            <OfertaProduto.Resumo />
            <OfertaProduto.BotaoOrcamento />
            <p className="hl-aviso">Você será direcionado ao WhatsApp da Millus com o produto e o volume escolhidos. O envio da mensagem é feito por você.</p>
          </OfertaProduto.Raiz>
        </section>
      </div>
      <section className="hl-aplicacoes" id="hl-aplicacoes" aria-labelledby="hl-titulo-aplicacoes">
        <div className="hl-conteiner">
          <p className="hl-sobretitulo">VERSATILIDADE NA LIMPEZA</p>
          <h2 id="hl-titulo-aplicacoes">Da limpeza geral à automotiva.</h2>
          <div className="hl-cartoes">{aplicacoes.map(({ icone: Icone, titulo, texto }, indice) => <article key={titulo}>
            <div className="hl-topo-cartao"><Icone size={30} strokeWidth={1.5} aria-hidden="true" /><span>0{indice + 1}</span></div>
            <h3>{titulo}</h3><p>{texto}</p>
          </article>)}</div>
          <div className="hl-orientacoes"><h3>Antes de aplicar</h3><p>Consulte o rótulo e as orientações técnicas do fabricante para modo de uso, diluição e compatibilidade com a superfície. Peça à equipe a documentação do produto antes do uso.</p>
            <a href={hlMulti1000.fonte} target="_blank" rel="noopener noreferrer">Consultar informações da Henlau ↗</a>
          </div>
        </div>
      </section>
    </main>
  </div>;
}
