import { CampoRecebimento, SecaoRecebimento } from "./estrutura";
import { MiniaturaFoto } from "./fotos";
import { titulosEtapa, type paginasRevisao } from "../recebimento.regras";
import type { PropriedadesDados } from "./dados";

export function ResumoRecebimento({ pagina, corrigir }: {
  pagina: ReturnType<typeof paginasRevisao>[number];
  corrigir: (tela?: string) => void;
}) {
  return <section className="secao-recebimento resumo-recebimento">
    <h2>Revisão do recebimento</h2>
    <p>{titulosEtapa[pagina.etapa - 1]}</p>
    {pagina.fotos
      ? <><h3>{pagina.rotulo}</h3>
          {pagina.fotos.length > 0
            ? <div className="fotos-revisao">{pagina.fotos.map(foto => <div key={foto.id}><MiniaturaFoto foto={foto} /><p>{foto.itemTitulo ?? "Foto geral legada · sem item"} · {foto.estado ?? "Estado não registrado"}</p><button type="button" className="botao-secundario" onClick={() => corrigir(foto.itemId ?? "anexos")}>Corrigir anexo</button></div>)}</div>
            : <p>Nenhuma foto anexada.</p>}
        </>
      : <><h3>{pagina.rotulo}</h3><dl>{pagina.linhas?.map((linha, indice) => <div key={indice}>
          <dt>{linha.rotulo}</dt><dd className="texto-revisao">{linha.valor}</dd>
        </div>)}</dl></>}
    {!pagina.fotos && pagina.tela !== "painel" && <button className="botao-secundario" type="button" onClick={() => corrigir()}>Corrigir</button>}
  </section>;
}

export function CienciaRecebimento({ dados, alterar, erros }: PropriedadesDados & {
  erros: Record<string, string | undefined>;
}) {
  return <SecaoRecebimento numero="06" titulo="Ciência e atendente"
    descricao="A confirmação registra a ciência do cliente. A assinatura é manual no PDF.">
    <CampoRecebimento id="atendente" rotulo="Nome do atendente" required maxLength={160}
      erro={erros.atendente} value={dados.atendente} onChange={evento => alterar("atendente", evento.target.value)} />
    <label className="confirmar-ciencia">
      <input id="ciencia" type="checkbox" checked={dados.ciencia}
        aria-invalid={!!erros.ciencia} aria-describedby={erros.ciencia ? "erro-ciencia" : undefined}
        onChange={evento => alterar("ciencia", evento.target.checked)} />
      O cliente está ciente do registro
    </label>
    {erros.ciencia && <p className="erro-campo" id="erro-ciencia">{erros.ciencia}</p>}
  </SecaoRecebimento>;
}
