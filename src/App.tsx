import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Cabecalho } from './components/Cabecalho';
import { Rodape } from './components/Rodape';
import { Inicio } from './pages/Inicio';
import { HLMulti1000 } from './pages/HLMulti1000';
export default function Aplicacao() {
  return <BrowserRouter><a className="pular-conteudo" href="#principal">Pular para o conteúdo</a><Cabecalho.Raiz><Cabecalho.Marca /><Cabecalho.Navegacao /><Cabecalho.Busca /><Cabecalho.Contato /></Cabecalho.Raiz><Routes><Route path="/" element={<Inicio />} /><Route path="/produtos/hl-multi-1000" element={<HLMulti1000 />} /><Route path="/mangueiras" element={<Inicio />} /><Route path="*" element={<main className="conteiner secao" id="principal"><h1>Página não encontrada</h1><p><a href="/">Voltar ao início →</a></p></main>} /></Routes><Rodape /></BrowserRouter>;
}
