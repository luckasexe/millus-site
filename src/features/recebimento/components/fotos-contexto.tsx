import type { PropriedadesDados } from "./dados";
import { FotosRecebimento } from "./fotos";

/** Mantém a evidência vinculada ao item e ao estado do momento da captura. */
export function FotosContextoRecebimento({ dados, alterar, itemId, titulo, inspecao, aoProcessar }: PropriedadesDados & {
  itemId: string; titulo: string; inspecao: boolean; aoProcessar: (valor: boolean) => void;
}) {
  const campo = inspecao ? "fotosInspecao" : "fotos";
  const todas = dados[campo];
  const fotos = todas.filter(foto => foto.itemId === itemId);
  const estado = inspecao ? dados.respostas[itemId] || "Estado não informado" : "Documentação de recebimento";
  if (inspecao && !dados.respostas[itemId]) return <p className="limites-fotos">Selecione o estado para anexar fotos a este item. As evidências anteriores continuam na revisão e no PDF.</p>;
  const conteudo = <>
    {inspecao && fotos.some(foto => foto.estado !== estado) && <p className="aviso-evidencia">Estado capturado preservado: fotos anteriores mantêm a condição original na legenda, revisão e PDF.</p>}
    <FotosRecebimento fotos={fotos} aoProcessar={aoProcessar}
      contexto={{ itemId, itemTitulo: titulo, estado, origem: inspecao ? "funcionário" : "cliente" }}
      alterar={novas => alterar(campo, [...todas.filter(foto => foto.itemId !== itemId), ...novas])} />
  </>;
  return inspecao ? <div className="fotos-contexto">{conteudo}</div> : <details className="fotos-contexto">
    <summary>Foto opcional · {titulo} ({fotos.length})</summary>
    <p className="limites-fotos">Documentação do recebimento. Não fotografe documentos pessoais.</p>
    {conteudo}
  </details>;
}
