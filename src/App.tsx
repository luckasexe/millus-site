import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Cabecalho } from './components/Cabecalho';
import { Rodape } from './components/Rodape';
import { Botao } from './components/ui/Botao';
import { Inicio } from './pages/Inicio';
import { HLMulti1000 } from './pages/HLMulti1000';
function EstruturaSite() {
  const { pathname: caminho } = useLocation();
  const paginaProduto = caminho === '/produtos/hl-multi-1000';
  return <><a className="pular-conteudo" href="#principal">Pular para o conteúdo</a>
    {paginaProduto ? <Cabecalho.Raiz className="hl-cabecalho"><Cabecalho.Marca /><nav className="hl-navegacao" aria-label="Navegação do produto"><Link to="/">← Site Millus</Link><Botao href="#hl-escolha">Orçamento</Botao></nav></Cabecalho.Raiz> : <Cabecalho.Raiz><Cabecalho.Marca /><Cabecalho.Navegacao /><Cabecalho.Busca /><Cabecalho.Contato /></Cabecalho.Raiz>}
    <Routes><Route path="/" element={<Inicio />} /><Route path="/produtos/hl-multi-1000" element={<HLMulti1000 />} /><Route path="/mangueiras" element={<Inicio />} /><Route path="*" element={<main className="conteiner secao" id="principal"><h1>Página não encontrada</h1><p><a href="/">Voltar ao início →</a></p></main>} /></Routes>
    {paginaProduto ? <Rodape chamada={null} /> : <Rodape />}</>;
}
export default function Aplicacao() {
  return <BrowserRouter><EstruturaSite /></BrowserRouter>;
}
