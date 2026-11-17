import { Link } from 'react-router-dom';
import { CarFront, Droplets, Factory, ArrowDown } from 'lucide-react';
import { ProductOffer } from '../components/ProductOffer';
import { Contato } from '../components/Contato';
import { hlMulti1000 } from '../data/hlMulti1000';
import './hl-multi-1000.css';

const applications = [
  { icon: CarFront, title: 'Limpeza automotiva', text: 'Automóveis, ônibus, caminhões, baús e interiores de veículos.' },
  { icon: Factory, title: 'Limpeza geral', text: 'Aplicações em fórmicas, coifas e vidros, conforme as orientações do fabricante.' },
  { icon: Droplets, title: 'Sujidades do dia a dia', text: 'Para limpeza de gorduras, óleos, graxas e incrustações.' },
];

export function HLMulti1000() {
  return <div className="hl-page">
    <main id="hl-main">
      <div className="hl-wrap">
        <Link className="hl-back" to="/">← Voltar para a Millus</Link>
        <section className="hl-hero" aria-labelledby="hl-title">
          <div className="hl-intro">
            <p className="hl-eyebrow">HENLAU / LIMPEZA PROFISSIONAL</p>
            <h1 id="hl-title">HL MULTI <span>1000.</span></h1>
            <p className="hl-lead">Um multiuso.<br />Muitas possibilidades de limpeza.</p>
            <p className="hl-description">Detergente multiuso 3 em 1, solúvel em água, para limpeza geral e automotiva. Encontre na Millus as opções de 2 e 5 litros.</p>
            <a className="hl-details" href="#hl-aplicacoes">Conheça as aplicações <ArrowDown size={16} aria-hidden="true" /></a>
          </div>
          <figure className="hl-product">
            <span className="hl-product-tag">DETERGENTE MULTIUSO · 3 EM 1</span>
            <img src="/assets/hl-multi-1000.jpg" alt="Embalagem Henlau HL Multi 1000 de 5 litros" width="600" height="800" />
            <figcaption>Foto do fabricante · embalagem de 5 L</figcaption>
          </figure>
          <ProductOffer.Root>
            <p className="hl-eyebrow">SEU PRÓXIMO PASSO</p>
            <h2>Leve para sua rotina.</h2>
            <ProductOffer.VolumeSelector />
            <ProductOffer.Summary />
            <ProductOffer.CTA />
            <p className="hl-note">Você será direcionado ao WhatsApp da Millus com o produto e o volume escolhidos. O envio da mensagem é feito por você.</p>
          </ProductOffer.Root>
        </section>
      </div>
      <section className="hl-applications" id="hl-aplicacoes" aria-labelledby="hl-app-title">
        <div className="hl-wrap">
          <p className="hl-eyebrow">VERSATILIDADE NA LIMPEZA</p>
          <h2 id="hl-app-title">Da limpeza geral à automotiva.</h2>
          <div className="hl-cards">{applications.map(({ icon: Icon, title, text }, index) => <article key={title}>
            <div className="hl-card-top"><Icon size={30} strokeWidth={1.5} aria-hidden="true" /><span>0{index + 1}</span></div>
            <h3>{title}</h3><p>{text}</p>
          </article>)}</div>
          <div className="hl-guidance"><h3>Antes de aplicar</h3><p>Consulte o rótulo e as orientações técnicas do fabricante para modo de uso, diluição e compatibilidade com a superfície. Peça à equipe a documentação do produto antes do uso.</p>
            <a href={hlMulti1000.source} target="_blank" rel="noopener noreferrer">Consultar informações da Henlau ↗</a>
          </div>
        </div>
      </section>
    </main>
    <Contato />
  </div>;
}
