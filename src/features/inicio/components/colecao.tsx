import type { PropsWithChildren } from 'react';

function ColecaoRoot({ children, id }: PropsWithChildren<{ id: string }>) {
  return <article className={`colecao colecao-${id}`} id={id}>{children}</article>;
}
function ColecaoConteudo({ children }: PropsWithChildren) {
  return <div className="colecao-conteudo">{children}</div>;
}
function ColecaoCabecalho({ titulo }: { titulo: string }) {
  return <div className="colecao-cabecalho"><h3>{titulo}</h3></div>;
}
function ColecaoDescricao({ texto }: { texto: string }) {
  return <p>{texto}</p>;
}
function ColecaoLink({ destino, texto }: { destino: string; texto: string }) {
  return <a className="botao" href={destino}>{texto}</a>;
}
function ColecaoImagem({ origem, descricao }: { origem: string; descricao: string }) {
  return <div className="colecao-imagem"><img src={origem} alt={descricao} loading="lazy" width="1100" height="900" /></div>;
}

export const Colecao = { Root: ColecaoRoot, Conteudo: ColecaoConteudo, Cabecalho: ColecaoCabecalho, Descricao: ColecaoDescricao, Link: ColecaoLink, Imagem: ColecaoImagem };
