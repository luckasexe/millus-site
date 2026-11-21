import { categorias, categoriaAtual, formatarData, legadoTipo } from "../recebimento.regras";
import { CampoRecebimento, SecaoRecebimento } from "./estrutura";
import type { RascunhoRecebimento } from "../recebimento.service";
export type PropriedadesDados = {
  dados: RascunhoRecebimento;
  alterar: <Campo extends keyof RascunhoRecebimento>(
    campo: Campo, valor: RascunhoRecebimento[Campo],
  ) => void;
};
export function DadosCliente({
  dados,
  alterar,
  erros,
}: PropriedadesDados & { erros: { nome?: string; telefone?: string } }) {
  const campos = [
    {
      id: "nome",
      rotulo: "Nome completo ou razão social",
      required: true,
      autoComplete: "name",
    },
    {
      id: "telefone",
      rotulo: "Telefone / WhatsApp",
      required: true,
      autoComplete: "tel",
      inputMode: "tel" as const,
    },
  ] as const;
  return (
    <SecaoRecebimento
      numero="01"
      titulo="Dados do cliente"
      descricao="Nome ou razão social e telefone são obrigatórios."
    >
      <div className="grade-campos">
        {campos.map((campo) => (
          <CampoRecebimento
            key={campo.id}
            {...campo}
            value={dados[campo.id]}
            maxLength={campo.id === "telefone" ? 15 : 160}
            erro={erros[campo.id]}
            onChange={(evento) => alterar(campo.id, evento.target.value)}
          />
        ))}
      </div>
      {<p className="data-recebimento">
        Recebido em <time dateTime={dados.recebidoEm}>{formatarData(dados.recebidoEm)}</time>
      </p>}
    </SecaoRecebimento>
  );
}
export function TiposEquipamento({ dados, alterar }: PropriedadesDados) {
  return <SecaoRecebimento numero="02" titulo="Tipo de equipamento" descricao="Selecione a categoria do equipamento recebido.">
    <div className="tipos-equipamento">
      {categorias.map(({ id, nome }) => <button key={id} type="button"
        aria-pressed={id === categoriaAtual(dados.tipo)} onClick={() => alterar("tipo", id)}>
        <img src={`/assets/recebimento/${id}.svg`} alt="" />
        {nome}
      </button>)}
    </div>
  </SecaoRecebimento>;
}

export function DadosEquipamento({ dados, alterar, serie }: PropriedadesDados & { serie: boolean }) {
  const campos = serie
    ? [{ id: "serie", rotulo: "Número de série" }] as const
    : [{ id: "marca", rotulo: "Marca" }, { id: "modelo", rotulo: "Modelo" }] as const;
  return <SecaoRecebimento numero="02" titulo="Identificação" descricao="Preencha os dados disponíveis.">
    <div className="grade-campos">
      {campos.map(({ id, rotulo }) =>
        <CampoRecebimento key={id} id={id} rotulo={rotulo} maxLength={160}
          value={dados[id]} onChange={evento => alterar(id, evento.target.value)} />)}
      {serie && categoriaAtual(dados.tipo) === "outros" && <CampoRecebimento id="tipoDetalhe"
        rotulo="Qual equipamento?" maxLength={160} value={dados.respostas.tipoDetalhe ?? legadoTipo(dados.tipo)}
        onChange={evento => alterar("respostas", { ...dados.respostas, tipoDetalhe: evento.target.value })} />}
    </div>
  </SecaoRecebimento>;
}
const acessoriosDisponiveis = [
  "Cabo de energia",
  "Carregador",
  "Bateria",
  "Mangueira",
  "Pistola",
  "Bico / ponteira",
  "Maleta",
];
export function AcessoriosRecebimento({ dados, alterar }: PropriedadesDados) {
  return (
    <SecaoRecebimento
      numero="02"
      titulo="Acessórios recebidos"
      descricao="Selecione tudo que acompanha o equipamento."
    >
      <div className="opcoes-acessorios">
        {acessoriosDisponiveis.map((acessorio) => (
          <label key={acessorio}>
            <input
              type="checkbox"
              checked={dados.acessorios.includes(acessorio)}
              onChange={(evento) =>
                alterar(
                  "acessorios",
                  evento.target.checked
                    ? [...dados.acessorios, acessorio]
                    : dados.acessorios.filter((item) => item !== acessorio),
                )
              }
            />
            {acessorio}
          </label>
        ))}
      </div>
      <details><summary>Outros acessórios (opcional)</summary><CampoRecebimento
        id="outros"
        rotulo="Outros acessórios"
        placeholder="Ex.: adaptador, extensão…"
        value={dados.outros}
        maxLength={500}
        onChange={(evento) => alterar("outros", evento.target.value)}
      /></details>
    </SecaoRecebimento>
  );
}
