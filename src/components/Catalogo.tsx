import { createContext, useContext, useState, type ReactNode } from 'react';
import { CircleDot as IconeRolamento, Gauge as IconeManometro, Cable as IconeConexao, CircleDashed as IconeVedacao, HardHat as IconeProtecao, Wrench as IconeAcessorio, Search as IconeBusca } from 'lucide-react';
import dadosProdutos from '../../public/data/produtos.json';
import { enderecoOrcamento } from '../data/comercial';
const iconesCategorias = { Rolamentos: IconeRolamento, 'Manômetros': IconeManometro, 'Conexões': IconeConexao, 'Vedações': IconeVedacao, EPIs: IconeProtecao, 'Acessórios': IconeAcessorio };
const categorias = Object.keys(iconesCategorias) as (keyof typeof iconesCategorias)[];
const ContextoCatalogo = createContext<{ busca: string; definirBusca: (valor: string) => void; categoria: string; definirCategoria: (valor: string) => void } | null>(null);
function usarCatalogo() { const contexto = useContext(ContextoCatalogo); if (!contexto) throw new Error('Use as partes dentro de Catalogo.Raiz'); return contexto; }
function Raiz({ children: conteudo }: { children: ReactNode }) {
  const [busca, definirBusca] = useState(''); const [categoria, definirCategoria] = useState('Todas');
  return <ContextoCatalogo.Provider value={{ busca, definirBusca, categoria, definirCategoria }}>{conteudo}</ContextoCatalogo.Provider>;
}
function Categorias() {
  const { definirCategoria, definirBusca } = usarCatalogo();
  return <section className="categorias secao" id="categorias"><div className="conteiner"><p className="sobretitulo">NOSSAS CATEGORIAS</p><h2>Encontre a peça ideal para o seu equipamento.</h2><p className="introducao">Conheça as linhas do nosso catálogo e consulte as opções para sua aplicação.</p><div className="categorias-grade">{categorias.map(categoria => { const Icone = iconesCategorias[categoria]; return <a href="#catalogo" key={categoria} onClick={() => { definirCategoria(categoria); definirBusca(''); }} className="categoria"><div className="categoria-ilustracao"><Icone size={70} strokeWidth={1} aria-hidden="true" /></div><span>{categoria}<b aria-hidden="true">→</b></span></a>; })}</div></div></section>;
}
function Filtros() {
  const { busca, definirBusca, categoria, definirCategoria } = usarCatalogo();
  return <div className="filtros"><label className="busca" htmlFor="busca-catalogo"><IconeBusca size={20} aria-hidden="true" /><span className="somente-leitor">Buscar por produto, código ou descrição</span><input id="busca-catalogo" type="search" value={busca} onChange={evento => definirBusca(evento.target.value)} placeholder="Buscar por produto ou código…" /></label><div className="filtros-categorias" aria-label="Filtrar por categoria">{['Todas', ...categorias].map(opcao => <button key={opcao} data-categoria={opcao} aria-pressed={categoria === opcao} onClick={() => definirCategoria(opcao)}>{opcao}</button>)}</div></div>;
}
const normalizar = (valor: string) => valor.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
function Lista() {
  const { busca, categoria } = usarCatalogo();
  const produtos = dadosProdutos.filter(produto => (categoria === 'Todas' || produto.categoria === categoria) && normalizar(`${produto.nome} ${produto.id} ${produto.descricao} ${produto.categoria}`).includes(normalizar(busca.trim())));
  return <><p className="catalogo-contagem" role="status">{produtos.length} {produtos.length === 1 ? 'produto encontrado' : 'produtos encontrados'} · Consulte preço e disponibilidade.</p><div className="produtos-grade">{produtos.map(produto => { const Icone = iconesCategorias[produto.categoria as keyof typeof iconesCategorias]; return <article className="produto" key={produto.id}><div className="produto-ilustracao"><Icone size={68} strokeWidth={1} aria-hidden="true" /><span>{produto.categoria}</span></div><div className="produto-conteudo"><p className="produto-codigo">Cód. {produto.id}</p><h3>{produto.nome}</h3><p>{produto.descricao}</p><a className="botao" href={enderecoOrcamento(`${produto.nome} (${produto.id})`)} target="_blank" rel="noopener noreferrer">Solicitar orçamento <span aria-hidden="true">→</span></a></div></article>; })}</div>{!produtos.length && <p className="catalogo-vazio">Nenhum produto encontrado. Experimente outro termo ou categoria.</p>}</>;
}
export const Catalogo = { Raiz, Categorias, Filtros, Lista };
