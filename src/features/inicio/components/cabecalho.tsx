import { useRef } from 'react';
import type { EstadoInicio } from '../inicio.hook';
import { Marca } from './icones';

const itensMenu = [
  { titulo: 'A Millus', destino: '#sobre-millus' },
  { titulo: 'Coleções', destino: '#colecoes' },
  { titulo: 'Destaques', destino: '#destaques' },
  { titulo: 'Rede', destino: '#rede' },
  { titulo: 'Notícias', destino: '#noticias' },
  { titulo: 'Fale conosco', destino: '#contato' },
];

export function Cabecalho({ estado }: { estado: EstadoInicio }) {
  const botaoRef = useRef<HTMLButtonElement>(null);
  return (
    <header className={`cabecalho ${estado.cabecalhoFixo ? 'cabecalho-fixo' : ''} ${estado.menuAberto ? 'menu-aberto' : ''}`}>
      <Marca />
      <button ref={botaoRef} className="botao-menu" aria-label={estado.menuAberto ? 'Fechar menu' : 'Abrir menu'} aria-expanded={estado.menuAberto} aria-controls="menu-principal" onClick={() => estado.definirMenuAberto(!estado.menuAberto)}>
        <span /><span /><span />
      </button>
      <nav id="menu-principal" className="menu-principal" aria-label="Navegação principal" onKeyDown={evento => {
        if (evento.key === 'Escape') botaoRef.current?.focus();
      }}>
        <ul>
          {itensMenu.map(item => (
            <li key={item.titulo}>
              <a href={item.destino} onClick={() => estado.definirMenuAberto(false)}>{item.titulo}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
