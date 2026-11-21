import { useLayoutEffect, useState } from "react";
import { BarraInferior, EstruturaRecebimento, ProgressoRecebimento, SecaoRecebimento } from "./components/estrutura";
import { FotosRecebimento } from "./components/fotos";
import { AcessoriosRecebimento, DadosCliente, DadosEquipamento, TiposEquipamento } from "./components/dados";
import { PerguntaRecebimento } from "./components/pergunta";
import { ComprovanteRecebimento } from "./components/comprovante";
import { CienciaRecebimento, ResumoRecebimento } from "./components/resumo";
import { paginasRevisao, perguntasRecebimento, titulosEtapa } from "./recebimento.regras";
import { useRecebimento } from "./recebimento.hook";
import "./recebimento.css";

export function RecebimentoPagina() {
  const {
    dados, carregando, falhaLeitura, erros, situacao, falha, ocupado, alterar, navegar,
    validarCliente, concluir, tentarNovamente, novo,
  } = useRecebimento();
  const [processandoFotos, definirProcessandoFotos] = useState(false);
  const { retornoRevisao } = dados;
  const propriedades = { dados, alterar };
  const perguntas = perguntasRecebimento(dados.tipo);
  const telas = [
    { id: "cliente", etapa: 1, conteudo: <DadosCliente {...propriedades} erros={erros} entrega={false} /> },
    { id: "entrega", etapa: 1, conteudo: <DadosCliente {...propriedades} erros={erros} entrega /> },
    { id: "tipo", etapa: 2, conteudo: <TiposEquipamento {...propriedades} /> },
    { id: "marca", etapa: 2, conteudo: <DadosEquipamento {...propriedades} serie={false} /> },
    { id: "serie", etapa: 2, conteudo: <DadosEquipamento {...propriedades} serie /> },
    { id: "acessorios", etapa: 2, conteudo: <AcessoriosRecebimento {...propriedades} /> },
    { id: "fotos", etapa: 2, conteudo: <SecaoRecebimento numero="02" titulo="Fotos do cliente" descricao="Anexos fornecidos pelo cliente.">
      <FotosRecebimento aoProcessar={definirProcessandoFotos} fotos={dados.fotos} alterar={fotos => alterar("fotos", fotos)} />
    </SecaoRecebimento> },
    ...perguntas.map(pergunta => ({
      id: pergunta.id, etapa: pergunta.etapa,
      conteudo: <PerguntaRecebimento {...propriedades} pergunta={pergunta} />,
    })),
    { id: "fotosInspecao", etapa: 5, conteudo: <SecaoRecebimento numero="05" titulo="Fotos da inspeção visual" descricao="Registros do funcionário.">
      <FotosRecebimento aoProcessar={definirProcessandoFotos} fotos={dados.fotosInspecao} alterar={fotos => alterar("fotosInspecao", fotos)} />
    </SecaoRecebimento> },
    ...paginasRevisao(dados).map((pagina, indice) => ({
      id: indice === 0 ? "revisao" : pagina.id, etapa: 6,
      conteudo: <ResumoRecebimento pagina={pagina} corrigir={() => void navegar(
        pagina.tela, indice === 0 ? "revisao" : pagina.id,
      )} />,
    })),
    { id: "ciencia", etapa: 6, conteudo: <CienciaRecebimento {...propriedades} erros={erros} /> },
  ];
  const indice = Math.max(0, telas.findIndex(item => item.id === dados.tela));
  const atual = telas[indice];
  const tela = atual.id;
  const daEtapa = telas.filter(item => item.etapa === atual.etapa);
  useLayoutEffect(() => {
    document.getElementById("titulo-subtela")?.focus();
  }, [tela, carregando]);

  return <EstruturaRecebimento>
    <ProgressoRecebimento etapa={atual.etapa} titulo={titulosEtapa[atual.etapa - 1] ?? "Revisão"} />
    <div className="abertura-recebimento"><h1>Recebimento de equipamento</h1></div>
    <details className="aviso-local"><summary>Registro somente neste navegador · detalhes</summary><p>Dados e fotos ficam neste navegador, sem sincronização ou envio automático. Limpar os dados locais pode apagar o recebimento. Evite aparelhos compartilhados.</p></details>
    <div className="estado-recebimento" role="status">{situacao}</div>
    {falha && <div className="falha-recebimento"><p role="alert">{falha}</p>
      {!falhaLeitura && <button type="button" className="botao-secundario" disabled={ocupado || processandoFotos}
        onClick={() => void tentarNovamente()}>Tentar salvar novamente</button>}
    </div>}
    {carregando ? <p>Preparando recebimento…</p> : falhaLeitura ? null : dados.protocolo ? (
      <ComprovanteRecebimento key={dados.protocolo} dados={dados} novo={() => void novo()} ocupado={ocupado} />
    ) : <form noValidate onSubmit={evento => {
      evento.preventDefault();
      if (processandoFotos || ocupado) return;
      if (tela === "cliente" && !validarCliente()) return;
      if (tela === "tipo" && !dados.tipo) return;
      if (retornoRevisao) {
        void navegar(telas.some(item => item.id === retornoRevisao) ? retornoRevisao : "revisao");
      } else if (tela === "ciencia") {
        void concluir();
      } else {
        void navegar(telas[indice + 1].id);
      }
    }}>
      <h2 id="titulo-subtela" className="indicador-subtela" tabIndex={-1} data-tela={tela}>
        Tela {daEtapa.indexOf(atual) + 1} de {daEtapa.length}
      </h2>
      <fieldset key={atual.id} className="subtela-recebimento" disabled={ocupado}>{atual.conteudo}</fieldset>
      <BarraInferior>
        <button type="button" disabled={(indice === 0 && !retornoRevisao) || ocupado || processandoFotos}
          onClick={() => void navegar(retornoRevisao || telas[indice - 1].id)}>Voltar</button>
        <button type="submit" disabled={ocupado || processandoFotos || (tela === "tipo" && !dados.tipo)}>
          {tela === "ciencia" ? "Concluir recebimento" : "Continuar"}
        </button>
      </BarraInferior>
    </form>}
  </EstruturaRecebimento>;
}
