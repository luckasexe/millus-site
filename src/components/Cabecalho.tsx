import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Menu as IconeMenu, X as IconeFechar, Search as IconeBusca, MessageCircle as IconeContato } from 'lucide-react';
import { contatoComercial } from '../data/comercial';

function Raiz({ children: conteudo }: { children: ReactNode }) {
  const elementoCabecalho = useRef<HTMLElement>(null);
  useEffect(() => {
    const cabecalho = elementoCabecalho.current;
    if (!cabecalho) return;
    // Compensa a altura real do cabeçalho nas âncoras, inclusive no celular.
    const atualizarAltura = () => document.documentElement.style.setProperty('--altura-cabecalho', `${cabecalho.getBoundingClientRect().height}px`);
    atualizarAltura();
    const observador = new ResizeObserver(atualizarAltura);
    observador.observe(cabecalho);
    return () => observador.disconnect();
  }, []);
  return <header ref={elementoCabecalho} className="cabecalho"><div className="conteiner cabecalho-conteudo">{conteudo}</div></header>;
}
function Marca() {
  return <a className="marca" href="/" aria-label="Millus — início"><img src="/assets/logo2.png" width="2027" height="572" alt="Millus Acessórios Industriais" /></a>;
}
function Navegacao() {
  const [aberto, definirAberto] = useState(false);
  const [secaoAtual, definirSecaoAtual] = useState(window.location.hash || '#inicio');
  useEffect(() => {
    const atualizarSecao = () => definirSecaoAtual(window.location.hash || '#inicio');
    const fecharComEscape = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') {
        definirAberto(false);
        document.querySelector<HTMLButtonElement>('.menu-acionador')?.focus();
      }
    };
    window.addEventListener('hashchange', atualizarSecao);
    window.addEventListener('keydown', fecharComEscape);
    return () => {
      window.removeEventListener('hashchange', atualizarSecao);
      window.removeEventListener('keydown', fecharComEscape);
    };
  }, []);
  return <><button className="menu-acionador" aria-label={aberto ? 'Fechar menu' : 'Abrir menu'} aria-controls="navegacao" aria-expanded={aberto} onClick={() => definirAberto(!aberto)}>{aberto ? <IconeFechar /> : <IconeMenu />}</button>
    <nav id="navegacao" className={aberto ? 'navegacao navegacao-aberta' : 'navegacao'} aria-label="Navegação principal">{[['Início', '#inicio'], ['Produtos', '#catalogo'], ['Categorias', '#categorias'], ['Sobre nós', '#sobre'], ['Contato', '#contato']].map(([rotulo, destino]) => <a key={rotulo} href={`/${destino}`} aria-current={window.location.pathname === '/' && secaoAtual === destino ? 'location' : undefined} onClick={() => { definirAberto(false); definirSecaoAtual(destino); }}>{rotulo}</a>)}</nav></>;
}
function Busca() {
  return <form className="cabecalho-busca" role="search" action="/#catalogo" method="get"><label className="somente-leitor" htmlFor="busca-cabecalho">Buscar por produto, código ou descrição</label><input id="busca-cabecalho" name="busca" type="search" placeholder="Buscar por produto, código…" defaultValue={new URLSearchParams(window.location.search).get('busca') || ''} /><button type="submit" aria-label="Buscar no catálogo"><IconeBusca size={19} aria-hidden="true" /></button></form>;
}
function Contato() {
  return <a className="cabecalho-acao" href={contatoComercial.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Falar com a Millus pelo WhatsApp"><IconeContato size={23} aria-hidden="true" /></a>;
}
export const Cabecalho = { Raiz, Marca, Navegacao, Busca, Contato };
