import {
  BarraInferior,
  EstruturaRecebimento,
  ProgressoRecebimento,
  SecaoRecebimento,
} from "./components/estrutura";
import { FotosRecebimento } from "./components/fotos";
import {
  AcessoriosRecebimento,
  DadosCliente,
  DadosEquipamento,
} from "./components/dados";
import { ResumoRecebimento } from "./components/resumo";
import { useRecebimento } from "./recebimento.hook";
import "./recebimento.css";
export function RecebimentoPagina() {
  const {
    dados,
    carregando,
    erros,
    situacao,
    falha,
    salvando,
    alterar,
    salvar,
    editar,
  } = useRecebimento();
  return (
    <EstruturaRecebimento>
      <ProgressoRecebimento />
      <div className="abertura-recebimento">
        <span className="sobretitulo">NOVO ATENDIMENTO</span>
        <h1>Recebimento de equipamento</h1>
        <p>
          Um bom atendimento começa com os detalhes certos.
          <br />
          Registre o cliente e o que chegou com o equipamento.
        </p>
      </div>
      <div className="aviso-local">
        <strong>Somente neste navegador</strong>
        <p>
          Este é um registro local, não um cadastro no servidor. Não é
          compartilhado entre aparelhos e pode ser perdido ao limpar os dados do
          navegador.
        </p>
      </div>
      <div className="estado-recebimento" role="status">
        {situacao}
      </div>
      {falha && (
        <p className="falha-recebimento" role="alert">
          {falha}
        </p>
      )}
      {carregando ? (
        <p>Preparando recebimento…</p>
      ) : dados.confirmado ? (
        <ResumoRecebimento dados={dados} editar={editar} />
      ) : (
        <form
          noValidate
          onSubmit={(evento) => {
            evento.preventDefault();
            void salvar();
          }}
        >
          <DadosCliente dados={dados} alterar={alterar} erros={erros} />
          <DadosEquipamento dados={dados} alterar={alterar} />
          <AcessoriosRecebimento dados={dados} alterar={alterar} />
          <SecaoRecebimento
            numero="04"
            titulo="Fotos do equipamento"
            descricao="Registre o estado de chegada e os acessórios. Opcional."
          >
            <FotosRecebimento
              fotos={dados.fotos}
              alterar={(fotos) => alterar("fotos", fotos)}
            />
          </SecaoRecebimento>
          <div className="data-recebimento">
            <span>Data e hora do recebimento</span>
            <time dateTime={dados.recebidoEm}>
              {new Date(dados.recebidoEm).toLocaleString("pt-BR")}
            </time>
            <small>Preenchida automaticamente e mantida neste rascunho.</small>
          </div>
          <BarraInferior>
            <button type="submit" disabled={salvando}>
              {salvando ? "Salvando…" : "Salvar e continuar"}
              <span aria-hidden="true"> →</span>
            </button>
          </BarraInferior>
        </form>
      )}
    </EstruturaRecebimento>
  );
}
