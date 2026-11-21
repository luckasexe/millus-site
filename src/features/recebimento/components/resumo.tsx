import { BarraInferior } from "./estrutura";
import { MiniaturaFoto } from "./fotos";
import type { RascunhoRecebimento } from "../recebimento.service";
export function ResumoRecebimento({
  dados,
  editar,
}: {
  dados: RascunhoRecebimento;
  editar: () => void;
}) {
  const itens = [
    ["Cliente", dados.nome],
    ["Telefone / WhatsApp", dados.telefone],
    ["Responsável pela entrega", dados.responsavel],
    ["Tipo de equipamento", dados.tipo],
    ["Marca", dados.marca],
    ["Modelo", dados.modelo],
    ["Número de série", dados.serie],
    ["Acessórios", dados.acessorios.join(", ")],
    ["Outros acessórios", dados.outros],
  ];
  return (
    <section className="secao-recebimento resumo-recebimento">
      <span className="icone-confirmacao">✓</span>
      <h2 id="titulo-resumo" tabIndex={-1}>
        Recebimento salvo neste navegador
      </h2>
      <p>
        Etapa 1 concluída localmente. As próximas etapas ainda não estão
        disponíveis.
      </p>
      <dl>
        {itens.map(([rotulo, valor]) => (
          <div key={rotulo}>
            <dt>{rotulo}</dt>
            <dd>{valor || "Não informado"}</dd>
          </div>
        ))}
      </dl>
      <p>
        Recebido em{" "}
        <time dateTime={dados.recebidoEm}>
          {new Date(dados.recebidoEm).toLocaleString("pt-BR")}
        </time>
      </p>
      <div className="grade-fotos">
        {dados.fotos.map((foto) => (
          <MiniaturaFoto key={foto.id} foto={foto} />
        ))}
      </div>
      <BarraInferior>
        <button type="button" onClick={editar}>
          Voltar a editar
        </button>
      </BarraInferior>
    </section>
  );
}
