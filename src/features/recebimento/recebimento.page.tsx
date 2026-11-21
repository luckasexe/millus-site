import { useLayoutEffect, useState } from "react";
import { BarraInferior, EstruturaRecebimento, ProgressoRecebimento, SecaoRecebimento } from "@/features/recebimento/components/estrutura";
import { FotosRecebimento } from "@/features/recebimento/components/fotos";
import { AcessoriosRecebimento, DadosCliente, DadosEquipamento } from "@/features/recebimento/components/dados";
import { ResumoRecebimento } from "@/features/recebimento/components/resumo";
import { useRecebimento } from "@/features/recebimento/recebimento.hook";
import "./recebimento.css";
const subtelas = ["Cliente", "Equipamento", "Identificação", "Acessórios", "Fotos"];
export function RecebimentoPagina() {
  const { dados, carregando, erros, situacao, falha, salvando, alterar, salvar, editar, validarCliente } = useRecebimento();
  const [subtela, definirSubtela] = useState(0);
  useLayoutEffect(() => { document.getElementById("titulo-subtela")?.focus(); }, [subtela, dados.confirmado]);
  function navegar(destino: number) {
    definirSubtela(destino);
  }
  return <EstruturaRecebimento>
    <ProgressoRecebimento />
    <div className="abertura-recebimento"><h1>Recebimento de equipamento</h1></div>
    <details className="aviso-local"><summary>Registro somente neste navegador · detalhes</summary><p>Não é cadastro no servidor, não é enviado à Millus nem compartilhado entre aparelhos. Limpar os dados do navegador pode apagar este rascunho. Evite aparelhos compartilhados.</p></details>
    <div className="estado-recebimento" role="status">{situacao}</div>
    {falha && <p className="falha-recebimento" role="alert">{falha}</p>}
    {carregando ? <p>Preparando recebimento…</p> : dados.confirmado ? <ResumoRecebimento dados={dados} editar={() => { editar(); navegar(0); }} /> : <form noValidate onSubmit={evento => {
      evento.preventDefault();
      if (subtela === 0 && !validarCliente()) return;
      if (subtela < 4) navegar(subtela + 1); else void salvar();
    }}>
      <h2 id="titulo-subtela" className="indicador-subtela" tabIndex={-1}>Tela {subtela + 1} de 5 · {subtelas[subtela]}</h2>
      {subtela === 0 && <DadosCliente dados={dados} alterar={alterar} erros={erros} />}
      {(subtela === 1 || subtela === 2) && <DadosEquipamento dados={dados} alterar={alterar} identificacao={subtela === 2} />}
      {subtela === 3 && <AcessoriosRecebimento dados={dados} alterar={alterar} />}
      {subtela === 4 && <><SecaoRecebimento numero="05" titulo="Fotos do equipamento" descricao="Estado de chegada e acessórios. Opcional."><FotosRecebimento fotos={dados.fotos} alterar={fotos => alterar("fotos", fotos)} /></SecaoRecebimento><div className="data-recebimento"><span>Recebido em <time dateTime={dados.recebidoEm}>{new Date(dados.recebidoEm).toLocaleString("pt-BR")}</time></span></div></>}
      <BarraInferior>
        <button type="button" disabled={subtela === 0 || salvando} onClick={() => navegar(subtela - 1)}>Voltar</button>
        <button type="submit" disabled={salvando}>{salvando ? "Salvando…" : subtela === 4 ? "Salvar e continuar" : "Continuar"}</button>
      </BarraInferior>
    </form>}
  </EstruturaRecebimento>;
}
