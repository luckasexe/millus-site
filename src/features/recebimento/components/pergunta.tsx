import { CampoRecebimento, SecaoRecebimento } from "./estrutura";
import type { PropriedadesDados } from "./dados";
import type { perguntasRecebimento } from "../recebimento.regras";

export function PerguntaRecebimento({ pergunta, dados, alterar }: PropriedadesDados & {
  pergunta: ReturnType<typeof perguntasRecebimento>[number];
}) {
  const { id, titulo, etapa, formato, opcoes, complemento, descricao } = pergunta;
  return <SecaoRecebimento numero={String(etapa).padStart(2, "0")} titulo={titulo}
    descricao={descricao ?? (etapa === 5 ? "Inspeção exclusivamente visual do funcionário." : "Informação relatada pelo cliente.")}>
    <div className="campo-recebimento">
      <label htmlFor={id}>{formato === "selecao" ? "Resposta" : "Problema relatado (necessário)"}</label>
      {formato === "selecao"
        ? <select id={id} aria-label={titulo} value={dados.respostas[id] ?? ""}
            onChange={evento => alterar("respostas", { ...dados.respostas, [id]: evento.target.value })}>
            <option value="">Não informado</option>
            {opcoes.map(opcao => <option key={opcao}>{opcao}</option>)}
          </select>
        : <textarea id={id} rows={2} value={dados.respostas[id] ?? ""}
            onChange={evento => alterar("respostas", { ...dados.respostas, [id]: evento.target.value })} />}
    </div>
    {etapa === 3 && <details><summary>Funcionamento e tempo (opcional)</summary>
      <CampoRecebimento id="liga" rotulo="Funcionamento informado (não testar)" value={dados.respostas.liga ?? ""}
        onChange={evento => alterar("respostas", { ...dados.respostas, liga: evento.target.value })} />
      <CampoRecebimento id="tempo" rotulo="Há quanto tempo?" value={dados.respostas.tempo ?? ""}
        onChange={evento => alterar("respostas", { ...dados.respostas, tempo: evento.target.value })} />
    </details>}
    {complemento && <details><summary>Observação do funcionário (opcional){dados.complementos[id] ? " · preenchida" : ""}</summary>
      <CampoRecebimento id={id + "-complemento"} rotulo="Observação visual" value={dados.complementos[id] ?? ""}
        onChange={evento => alterar("complementos", { ...dados.complementos, [id]: evento.target.value })} />
    </details>}
  </SecaoRecebimento>;
}
