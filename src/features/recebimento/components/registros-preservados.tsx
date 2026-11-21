import { linhasLegadas } from "../recebimento.regras";
import type { PropriedadesDados } from "./dados";
import { CampoRecebimento, SecaoRecebimento } from "./estrutura";
import { MiniaturaFoto } from "./fotos";

export function RegistrosPreservados({ dados, alterar, anexos }: PropriedadesDados & { anexos: boolean }) {
  return <SecaoRecebimento numero="" titulo={anexos ? "Anexos preservados" : "Registro anterior preservado"}
    descricao="Não reatribuímos registros antigos à nova inspeção. Correções aqui alteram somente os valores indicados.">
    {anexos ? (["fotos", "fotosInspecao"] as const).map(campo => <details key={campo}>
      <summary>{campo === "fotos" ? "Cliente" : "Funcionário"} · {dados[campo].length} anexos</summary>
      <div className="grade-fotos">{dados[campo].map(foto => <div key={foto.id}>
        <MiniaturaFoto foto={foto} remover={() => alterar(campo, dados[campo].filter(item => item.id !== foto.id))} />
        <p className="limites-fotos">{foto.itemTitulo ?? "Foto geral legada"} · {foto.estado ?? "Estado não registrado"}</p>
      </div>)}</div>
    </details>) : linhasLegadas(dados).map(linha => {
      const id = linha.id;
      return <details key={id}><summary>{linha.rotulo}</summary>
        <CampoRecebimento id={`legado-${id}`} rotulo="Valor original" value={dados.respostas[id] ?? ""}
          onChange={evento => alterar("respostas", { ...dados.respostas, [id]: evento.target.value })} />
        <CampoRecebimento id={`legado-complemento-${id}`} rotulo="Complemento original" value={dados.complementos[id] ?? ""}
          onChange={evento => alterar("complementos", { ...dados.complementos, [id]: evento.target.value })} />
      </details>;
    })}
  </SecaoRecebimento>;
}
