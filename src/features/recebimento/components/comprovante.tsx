import { useEffect, useRef, useState } from "react";
import type { RascunhoRecebimento } from "../recebimento.service";
import { SecaoRecebimento } from "./estrutura";

export function ComprovanteRecebimento({ dados, novo, ocupado }: {
  dados: RascunhoRecebimento;
  novo: () => void;
  ocupado: boolean;
}) {
  const [documento, definirDocumento] = useState<{ arquivo: File; endereco: string }>();
  const [tentativa, definirTentativa] = useState(0);
  const [falhaPdf, definirFalhaPdf] = useState(false);
  const [compartilhando, definirCompartilhando] = useState(false);
  const [mensagem, definirMensagem] = useState("");
  const ultimoUso = useRef<number | undefined>(undefined);

  useEffect(() => {
    let ativo = true;
    let endereco = "";
    void import("../recebimento.pdf").then(({ gerarPdfRecebimento }) => gerarPdfRecebimento(dados))
      .then(arquivo => {
        if (!ativo) return;
        endereco = URL.createObjectURL(arquivo);
        definirDocumento({ arquivo, endereco });
      })
      .catch(() => {
        if (ativo) definirFalhaPdf(true);
      });
    return () => {
      ativo = false;
      // O visualizador ou o download recém-aberto ainda pode estar lendo o Blob.
      if (!endereco) return;
      const espera = ultimoUso.current === undefined ? 0 : 60_000 - (Date.now() - ultimoUso.current);
      if (espera > 0) window.setTimeout(() => URL.revokeObjectURL(endereco), espera);
      else URL.revokeObjectURL(endereco);
    };
  }, [dados, tentativa]);

  function registrarUso() {
    ultimoUso.current = Date.now();
  }

  const arquivos = documento ? { files: [documento.arquivo] } : undefined;
  const podeCompartilhar = !!(arquivos && typeof navigator.share === "function" && navigator.canShare?.(arquivos));

  async function compartilhar() {
    if (!arquivos || compartilhando) return;
    definirCompartilhando(true);
    definirMensagem("");
    try {
      if (!navigator.canShare?.(arquivos)) {
        definirMensagem("Compartilhamento de arquivos indisponível. Use Baixar PDF.");
        return;
      }
      await navigator.share(arquivos);
    } catch (erro) {
      definirMensagem(erro instanceof DOMException && erro.name === "AbortError"
        ? "Compartilhamento cancelado."
        : "Não foi possível abrir o compartilhamento. Use Baixar PDF.");
    } finally {
      definirCompartilhando(false);
    }
  }

  return <SecaoRecebimento numero="06" titulo="Recebimento concluído" descricao="Protocolo local de recebimento.">
    <p className="protocolo" data-testid="protocolo">{dados.protocolo}</p>
    {documento ? <>
      <div className="acoes-comprovante">
        <a className="botao-secundario" href={documento.endereco} download={documento.arquivo.name} onClick={registrarUso}>Baixar PDF</a>
        <a className="botao-secundario" href={documento.endereco} target="_blank" rel="noopener" onClick={registrarUso}>Visualizar PDF</a>
        {podeCompartilhar && <button className="botao-secundario" type="button" disabled={compartilhando}
          onClick={() => void compartilhar()}>Compartilhar PDF</button>}
      </div>
      {!podeCompartilhar && <p className="limites-fotos">Compartilhamento de arquivos indisponível. Use Baixar PDF.</p>}
      {mensagem && <p className="limites-fotos" role="status">{mensagem}</p>}
    </> : falhaPdf ? <div>
      <p role="alert">Não foi possível preparar o PDF. O recebimento continua salvo.</p>
      <button className="botao-secundario" type="button" onClick={() => {
        definirFalhaPdf(false);
        definirTentativa(tentativa + 1);
      }}>Tentar gerar PDF novamente</button>
    </div> : <p role="status">Preparando PDF…</p>}
    <button type="button" className="botao-secundario" disabled={ocupado || compartilhando} onClick={() => {
      if (window.confirm("Iniciar outro recebimento substitui o registro local atual. Baixe o PDF antes de continuar. Deseja continuar?")) novo();
    }}>Novo recebimento</button>
  </SecaoRecebimento>;
}
