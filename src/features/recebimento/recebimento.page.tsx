import { useLayoutEffect, useState } from "react";
import { BarraInferior, EstruturaRecebimento, ProgressoRecebimento } from "./components/estrutura";
import { AcessoriosRecebimento, DadosCliente, DadosEquipamento, TiposEquipamento } from "./components/dados";
import { PerguntaRecebimento } from "./components/pergunta";
import { ComprovanteRecebimento } from "./components/comprovante";
import { CienciaRecebimento, ResumoRecebimento } from "./components/resumo";
import { paginasRevisao, perguntasRecebimento } from "./recebimento.regras";
import { RegistrosPreservados } from "./components/registros-preservados";
import { FotosContextoRecebimento } from "./components/fotos-contexto";
import { useRecebimento } from "./recebimento.hook";
import "./recebimento.css";

export function RecebimentoPagina() {
  const {
    dados, carregando, falhaLeitura, erros, situacao, falha, ocupado, alterar, navegar,
    validarCliente, validarPergunta, concluir, tentarNovamente, novo, iniciarInspecao, pausarInspecao, finalizarInspecao,
  } = useRecebimento();
  const [processandoFotos, definirProcessandoFotos] = useState(false);
  const propriedades = { dados, alterar };
  const perguntas = perguntasRecebimento(dados.tipo);
  const telasCliente = [
    { id: "cliente", conteudo: <DadosCliente {...propriedades} erros={erros} /> },
    { id: "tipo", conteudo: <TiposEquipamento {...propriedades} /> },
    { id: "marca", conteudo: <DadosEquipamento {...propriedades} serie={false} /> },
    { id: "serie", conteudo: <DadosEquipamento {...propriedades} serie /> },
    { id: "acessorios", conteudo: <AcessoriosRecebimento {...propriedades} /> },
    ...perguntas.filter(item => item.etapa === 3).map(pergunta => ({ id: pergunta.id,
      conteudo: <PerguntaRecebimento {...propriedades} pergunta={pergunta} /> })),
    { id: "ciencia", conteudo: <CienciaRecebimento {...propriedades} erros={erros} /> },
  ];
  const telasInspecao = perguntas.filter(item => item.etapa === 5).map(pergunta => ({ id: pergunta.id,
    conteudo: <PerguntaRecebimento {...propriedades} pergunta={pergunta} /> }));
  const telasRevisao = paginasRevisao(dados).map((pagina, indice) => ({
    id: indice === 0 ? "revisao" : pagina.id,
    conteudo: <ResumoRecebimento pagina={pagina} corrigir={destino => {
      const tela = destino ?? pagina.tela;
      void navegar([...telasCliente, ...telasInspecao].some(item => item.id === tela) || tela === "legado" ? tela : "anexos", indice === 0 ? "revisao" : pagina.id);
    }} />,
  }));
  const inspecionando = telasInspecao.some(item => item.id === dados.tela);
  const revisando = telasRevisao.some(item => item.id === dados.tela);
  const auxiliar = dados.tela === "legado" || dados.tela === "anexos";
  const telas = auxiliar ? [{id: dados.tela, conteudo: <RegistrosPreservados {...propriedades} anexos={dados.tela === "anexos"} />}]
    : revisando ? telasRevisao : inspecionando ? telasInspecao : telasCliente;
  const indice = Math.max(0, telas.findIndex(item => item.id === dados.tela));
  const atual = telas[indice];
  const tela = dados.tela === "painel" ? "painel" : atual.id;
  useLayoutEffect(() => { document.getElementById("titulo-subtela")?.focus(); }, [tela, carregando]);

  return <EstruturaRecebimento>
    <ProgressoRecebimento etapa={inspecionando ? 2 : 1} titulo={inspecionando ? "Inspeção visual interna" : "Recebimento cliente"} />
    <div className="abertura-recebimento"><h1>Recebimento de equipamento</h1></div>
    <details className="aviso-local"><summary>Registro somente neste navegador · detalhes</summary><p>Dados e fotos ficam neste navegador, sem sincronização ou envio automático. Limpar os dados locais pode apagar o recebimento. Evite aparelhos compartilhados.</p></details>
    <div className="estado-recebimento" role="status">{situacao}</div>
    {falha && <div className="falha-recebimento"><p role="alert">{falha}</p>
      {!falhaLeitura && <button type="button" className="botao-secundario" disabled={ocupado || processandoFotos}
        onClick={() => void tentarNovamente()}>Tentar salvar novamente</button>}
    </div>}
    {carregando ? <p>Preparando recebimento…</p> : falhaLeitura ? null : tela === "painel" ? <>
      <ComprovanteRecebimento dados={dados} novo={() => void novo()} ocupado={ocupado} />
      <div className="acoes-painel">
        <button className="botao-secundario" disabled={ocupado} onClick={() => void iniciarInspecao()}>{dados.inspecao === "pendente" ? "Iniciar inspeção" : "Retomar inspeção"}</button>
        <button className="botao-secundario" disabled={ocupado} onClick={() => void navegar("cliente")}>Editar básicos</button>
        <button className="botao-secundario" disabled={ocupado} onClick={() => void navegar("revisao")}>Revisar registro</button>
        <button className="botao-secundario" disabled={ocupado} onClick={() => void navegar("painel")}>Retomar depois</button>
      </div>
    </> : <form noValidate onSubmit={evento => {
      evento.preventDefault();
      if (processandoFotos || ocupado) return;
      if (tela === "cliente" && !validarCliente()) return;
      if (tela === "tipo" && !dados.tipo) return;
      if ((tela === "ocorrencia" || inspecionando) && !validarPergunta(tela)) return;
      if (dados.retornoRevisao) void navegar(telasRevisao.some(item => item.id === dados.retornoRevisao) ? dados.retornoRevisao : "revisao");
      else if (tela === "ciencia") void concluir();
      else if (indice === telas.length - 1) {
        if (inspecionando) void finalizarInspecao(); else void navegar("painel");
      } else void navegar(telas[indice + 1].id);
    }}>
      <h2 id="titulo-subtela" className="indicador-subtela" tabIndex={-1} data-tela={tela}>
        {revisando ? "Revisão" : "Tela"} {indice + 1} de {telas.length}
      </h2>
      <fieldset key={atual.id} className="subtela-recebimento" disabled={ocupado || processandoFotos}>
        {atual.conteudo}
        {(tela === "ocorrencia" || inspecionando) && erros[tela] && <p role="alert" className="erro-campo">{erros[tela]}</p>}
        {!revisando && !auxiliar && <FotosContextoRecebimento {...propriedades} itemId={tela}
          titulo={perguntas.find(item => item.id === tela)?.titulo ?? ({cliente: "Cliente e entrega", entrega: "Entrega", tipo: "Equipamento", marca: "Marca e modelo", serie: "Identificação", acessorios: "Acessórios", ciencia: "Documentação recebimento"}[tela] ?? tela)}
          inspecao={inspecionando} aoProcessar={definirProcessandoFotos} />}
      </fieldset>
      <BarraInferior>
        <button type="button" disabled={(indice === 0 && !dados.protocolo) || ocupado || processandoFotos}
          onClick={() => void navegar(dados.retornoRevisao || (indice ? telas[indice - 1].id : "painel"))}>Voltar</button>
        <button type="submit" disabled={ocupado || processandoFotos || (tela === "tipo" && !dados.tipo)}>
          {dados.retornoRevisao ? "Continuar" : tela === "ciencia" ? "Salvar recebimento" : indice === telas.length - 1 ? (inspecionando ? "Concluir inspeção visual" : "Voltar ao painel") : "Continuar"}
        </button>
        {inspecionando && <button type="button" disabled={ocupado || processandoFotos} onClick={() => void pausarInspecao()}>Retomar depois</button>}
      </BarraInferior>
    </form>}
  </EstruturaRecebimento>;
}
