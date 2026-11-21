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
      <label htmlFor={id}>{formato === "selecao" ? "Resposta" : "Descrição (opcional)"}</label>
      {formato === "selecao"
        ? <select id={id} aria-label={titulo} value={dados.respostas[id] ?? ""}
            onChange={evento => alterar("respostas", { ...dados.respostas, [id]: evento.target.value })}>
            <option value="">Não informado</option>
            {opcoes.map(opcao => <option key={opcao}>{opcao}</option>)}
          </select>
        : <textarea id={id} rows={4} value={dados.respostas[id] ?? ""}
            onChange={evento => alterar("respostas", { ...dados.respostas, [id]: evento.target.value })} />}
    </div>
    {complemento && <CampoRecebimento id={id + "-complemento"} rotulo="Complemento (opcional)"
      value={dados.complementos[id] ?? ""}
      onChange={evento => alterar("complementos", { ...dados.complementos, [id]: evento.target.value })} />}
  </SecaoRecebimento>;
}
