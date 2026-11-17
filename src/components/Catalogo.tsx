import { CampoBusca } from './ui/CampoBusca';
import { Cartao } from './ui/Cartao';
import { Botao } from './ui/Botao';
import { createContext, useContext, useState, type ReactNode } from 'react';
import { Search as IconeBusca } from 'lucide-react';
import dadosProdutos from '../../public/data/produtos.json';
import { enderecoOrcamento } from '../data/comercial';
const imagensCategorias = {
  Rolamentos: { arquivo: 'rolamentos', descricao: 'Rolamentos genéricos de esferas e rolos em aço' },
  'Manômetros': { arquivo: 'manometros', descricao: 'Manômetro genérico em inox com conexão inferior' },
  'Conexões': { arquivo: 'conexoes', descricao: 'Engates e adaptadores hidráulicos genéricos em aço' },
  'Vedações': { arquivo: 'vedacoes', descricao: 'Anéis de vedação e rolo branco de PTFE genéricos' },
  EPIs: { arquivo: 'epis', descricao: 'Luvas de proteção e óculos de segurança genéricos' },
  'Acessórios': { arquivo: 'acessorios', descricao: 'Abraçadeiras em aço e suporte de mangueira genéricos' },
};
const categorias = Object.keys(imagensCategorias) as (keyof typeof imagensCategorias)[];
function ImagemCategoria({ categoria }: { categoria: keyof typeof imagensCategorias }) {
  const imagem = imagensCategorias[categoria];
  return <><img src={`/assets/geradas/${imagem.arquivo}.webp`} alt={`${imagem.descricao}. Imagem ilustrativa da categoria, gerada por IA; não representa um SKU específico.`} width={640} height={640} loading="lazy" decoding="async" /><small className="imagem-aviso">Imagem ilustrativa · categoria</small></>;
}
const ContextoCatalogo = createContext<{ busca: string; definirBusca: (valor: string) => void; categoria: string; definirCategoria: (valor: string) => void } | null>(null);
function usarCatalogo() { const contexto = useContext(ContextoCatalogo); if (!contexto) throw new Error('Use as partes dentro de Catalogo.Raiz'); return contexto; }
function Raiz({ children: conteudo }: { children: ReactNode }) {
  const [busca, definirBusca] = useState(() => new URLSearchParams(window.location.search).get('busca') || ''); const [categoria, definirCategoria] = useState('Todas');
  return <ContextoCatalogo.Provider value={{ busca, definirBusca, categoria, definirCategoria }}>{conteudo}</ContextoCatalogo.Provider>;
}
function Categorias() {
  const { definirCategoria, definirBusca } = usarCatalogo();
  return <section className="categorias secao" id="categorias"><div className="conteiner"><p className="sobretitulo">NOSSAS CATEGORIAS</p><h2>Encontre a peça ideal para o seu equipamento.</h2><p className="introducao">Conheça as linhas do nosso catálogo e consulte as opções para sua aplicação.</p><div className="categorias-grade">{categorias.map(categoria => { return <a href="#catalogo" key={categoria} onClick={() => { definirCategoria(categoria); definirBusca(''); }} className="categoria"><div className="categoria-ilustracao"><ImagemCategoria categoria={categoria} /></div><span>{categoria}<b aria-hidden="true">→</b></span></a>; })}</div></div></section>;
}
function Filtros() {
  const { busca, definirBusca, categoria, definirCategoria } = usarCatalogo();
  return <div className="filtros"><div className="busca"><IconeBusca size={20} aria-hidden="true" /><CampoBusca id="busca-catalogo" rotulo="Buscar por produto, código ou descrição" value={busca} onChange={evento => definirBusca(evento.target.value)} placeholder="Buscar por produto ou código…" /></div><div className="filtros-categorias" aria-label="Filtrar por categoria">{['Todas', ...categorias].map(opcao => <Botao variante="contorno" key={opcao} data-categoria={opcao} aria-pressed={categoria === opcao} onClick={() => definirCategoria(opcao)}>{opcao}</Botao>)}</div></div>;
}
const normalizar = (valor: string) => valor.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
function Lista() {
  const { busca, categoria } = usarCatalogo();
  const produtos = dadosProdutos.filter(produto => (categoria === 'Todas' || produto.categoria === categoria) && normalizar(`${produto.nome} ${produto.id} ${produto.descricao} ${produto.categoria}`).includes(normalizar(busca.trim())));
  return <><p className="catalogo-contagem" role="status">{produtos.length} {produtos.length === 1 ? 'produto encontrado' : 'produtos encontrados'} · Consulte preço e disponibilidade.</p><div className="produtos-grade">{produtos.map(produto => { return <Cartao className="produto" key={produto.id}><div className="produto-ilustracao"><ImagemCategoria categoria={produto.categoria as keyof typeof imagensCategorias} /></div><div className="produto-conteudo"><p className="produto-codigo">Cód. {produto.id}</p><h3>{produto.nome}</h3><p>{produto.descricao}</p><Botao href={enderecoOrcamento(`${produto.nome} (${produto.id})`)} target="_blank" rel="noopener noreferrer">Solicitar orçamento <span aria-hidden="true">→</span></Botao></div></Cartao>; })}</div>{!produtos.length && <p className="catalogo-vazio">Nenhum produto encontrado. Experimente outro termo ou categoria.</p>}</>;
}
export const Catalogo = { Raiz, Categorias, Filtros, Lista };
