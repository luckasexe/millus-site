import { CampoRecebimento, SecaoRecebimento } from "./estrutura";
import type { RascunhoRecebimento } from "../recebimento.service";
type PropriedadesDados = {
  dados: RascunhoRecebimento;
  alterar: (
    campo: keyof RascunhoRecebimento,
    valor: string | string[] | RascunhoRecebimento["fotos"],
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
      rotulo: "Nome completo",
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
    {
      id: "responsavel",
      rotulo: "Responsável pela entrega",
      autoComplete: "off",
    },
  ] as const;
  return (
    <SecaoRecebimento
      numero="01"
      titulo="Dados do cliente"
      descricao="Nome completo e telefone são obrigatórios."
    >
      <div className="grade-campos">
        {campos.map((campo) => (
          <CampoRecebimento
            key={campo.id}
            {...campo}
            value={dados[campo.id]}
            maxLength={campo.id === "telefone" ? 15 : 160}
            erro={campo.id === "responsavel" ? undefined : erros[campo.id]}
            onChange={(evento) => alterar(campo.id, evento.target.value)}
          />
        ))}
      </div>
    </SecaoRecebimento>
  );
}
export function DadosEquipamento({ dados, alterar }: PropriedadesDados) {
  const campos = [
    { id: "tipo", rotulo: "Tipo de equipamento" },
    { id: "marca", rotulo: "Marca" },
    { id: "modelo", rotulo: "Modelo" },
    { id: "serie", rotulo: "Número de série" },
  ] as const;
  return (
    <SecaoRecebimento
      numero="02"
      titulo="Equipamento"
      descricao="Identifique o equipamento recebido. Todos os campos são opcionais."
    >
      <div className="grade-campos">
        {campos.map((campo) => (
          <CampoRecebimento
            key={campo.id}
            {...campo}
            maxLength={160}
            value={dados[campo.id]}
            onChange={(evento) => alterar(campo.id, evento.target.value)}
          />
        ))}
      </div>
    </SecaoRecebimento>
  );
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
      numero="03"
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
      <CampoRecebimento
        id="outros"
        rotulo="Outros acessórios"
        placeholder="Ex.: adaptador, extensão…"
        value={dados.outros}
        maxLength={500}
        onChange={(evento) => alterar("outros", evento.target.value)}
      />
    </SecaoRecebimento>
  );
}
