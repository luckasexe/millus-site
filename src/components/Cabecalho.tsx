import { useState, type ReactNode } from 'react';
import { Menu as IconeMenu, X as IconeFechar } from 'lucide-react';
function Raiz({ children: conteudo }: { children: ReactNode }) {
  return <header className="cabecalho"><div className="conteiner cabecalho-conteudo">{conteudo}</div></header>;
}
function Marca() { return <a className="marca" href="/" aria-label="Millus — início"><img src="/assets/logo2.png" width="2027" height="572" alt="Millus Acessórios Industriais" /></a>; }
function Navegacao() {
  const [aberto, definirAberto] = useState(false);
  return <><button className="menu-acionador" aria-label={aberto ? 'Fechar menu' : 'Abrir menu'} aria-controls="navegacao" aria-expanded={aberto} onClick={() => definirAberto(!aberto)}>{aberto ? <IconeFechar /> : <IconeMenu />}</button>
    <nav id="navegacao" className={aberto ? 'navegacao navegacao-aberta' : 'navegacao'} aria-label="Navegação principal">{[['Início', '/#inicio'], ['Produtos', '/#catalogo'], ['Categorias', '/#categorias'], ['Sobre nós', '/#sobre'], ['Contato', '/#contato']].map(([rotulo, destino]) => <a key={rotulo} href={destino} onClick={() => definirAberto(false)}>{rotulo}</a>)}</nav></>;
}
export const Cabecalho = { Raiz, Marca, Navegacao };
