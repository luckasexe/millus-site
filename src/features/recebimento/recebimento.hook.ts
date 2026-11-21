import { useEffect, useRef, useState } from "react";
import { criarRascunho, gravarRascunho, lerRascunho, type RascunhoRecebimento } from "./recebimento.service";
import { mascararTelefone, validarRecebimento, perguntasRecebimento } from "./recebimento.regras";

export function useRecebimento() {
  const [dados, definirDados] = useState(criarRascunho);
  const [carregando, definirCarregando] = useState(true);
  const [falhaLeitura, definirFalhaLeitura] = useState(false);
  const [erros, definirErros] = useState<Record<string, string | undefined>>({});
  const [situacao, definirSituacao] = useState("Carregando rascunho…");
  const [falha, definirFalha] = useState("");
  const [ocupado, definirOcupado] = useState(false);
  const atual = useRef(dados);
  const revisao = useRef("");
  const fila = useRef<Promise<void>>(Promise.resolve());
  const versao = useRef(0);
  const pendente = useRef(false);
  const bloqueado = useRef(false);

  useEffect(() => {
    let ativo = true;
    lerRascunho().then(salvo => {
      if (!ativo) return;
      if (salvo) {
        atual.current = salvo;
        revisao.current = salvo.revisao;
        definirDados(salvo);
      }
      definirSituacao(salvo ? "Registro recuperado neste navegador" : "Rascunho local");
    }).catch(() => {
      if (!ativo) return;
      definirFalhaLeitura(true);
      definirFalha("O registro local não pôde ser lido. Recarregue para tentar novamente.");
    }).finally(() => {
      if (ativo) definirCarregando(false);
    });
    function antesDeSair(evento: BeforeUnloadEvent) {
      if (!pendente.current) return;
      evento.preventDefault();
      evento.returnValue = "";
    }
    window.addEventListener("beforeunload", antesDeSair);
    return () => {
      ativo = false;
      window.removeEventListener("beforeunload", antesDeSair);
    };
  }, []);

  function persistir(proximo: RascunhoRecebimento) {
    const ordem = ++versao.current;
    pendente.current = true;
    definirSituacao("Salvando neste navegador…");
    const tarefa = fila.current.catch(() => {}).then(async () => {
      // Um salvamento mais recente contém todas as edições anteriores.
      if (ordem !== versao.current) return;
      const novaRevisao = crypto.randomUUID();
      await gravarRascunho({ ...proximo, revisao: novaRevisao }, revisao.current);
      revisao.current = novaRevisao;
    });
    fila.current = tarefa;
    void tarefa.then(() => {
      if (ordem !== versao.current) return;
      pendente.current = false;
      definirSituacao("Salvo neste navegador");
      definirFalha("");
    }, erro => {
      if (ordem !== versao.current) return;
      definirSituacao("Alterações não salvas");
      definirFalha(erro?.message === "CONFLITO"
        ? "Outra aba alterou o registro. Recarregue para abrir a versão salva. As alterações desta aba ainda estão na tela."
        : "Falha ao salvar. Verifique o espaço disponível e tente novamente nesta aba.");
    });
    return tarefa;
  }

  function atualizar(proximo: RascunhoRecebimento) {
    atual.current = proximo;
    definirDados(proximo);
  }

  function alterar<Campo extends keyof RascunhoRecebimento>(campo: Campo, valor: RascunhoRecebimento[Campo]) {
    if (bloqueado.current) return;
    const proximo = { ...atual.current, [campo]: campo === "telefone" ? mascararTelefone(String(valor)) : valor };
    const alteraInspecao = campo === "fotosInspecao" || campo === "complementos" ||
      (campo === "tipo" && valor !== atual.current.tipo) ||
      (campo === "respostas" && Object.keys({ ...atual.current.respostas, ...(valor as Record<string, string>) })
        .some(id => id.startsWith("visual-") && atual.current.respostas[id] !== (valor as Record<string, string>)[id]));
    if (alteraInspecao && proximo.inspecao === "concluída") proximo.inspecao = "em andamento";
    atualizar(proximo);
    void persistir(proximo).catch(() => {});
  }

  function validar(campos: Record<string, string | undefined>) {
    definirErros(campos);
    const primeiro = Object.keys(campos)[0];
    if (primeiro) document.getElementById(primeiro)?.focus();
    return !primeiro;
  }

  async function gravarMudanca(proximo: RascunhoRecebimento) {
    if (bloqueado.current) return;
    bloqueado.current = true;
    definirOcupado(true);
    try {
      await persistir(proximo);
      atualizar(proximo);
    } catch {
      // A versão em memória continua disponível para nova tentativa.
    } finally {
      bloqueado.current = false;
      definirOcupado(false);
    }
  }

  function concluir() {
    const registro = atual.current;
    const errosFinais: Record<string, string> = {};
    if (!registro.atendente.trim()) errosFinais.atendente = "Informe o nome do atendente.";
    if (!registro.ciencia) errosFinais.ciencia = "Confirme a ciência do cliente.";
    if (!validar(errosFinais)) return;
    return gravarMudanca({
      ...registro,
      protocolo: registro.protocolo || `MILLUS-${crypto.randomUUID().toUpperCase()}`,
      tela: "painel", retornoRevisao: "",
    });
  }

  return {
    dados, carregando, falhaLeitura, erros, situacao, falha, ocupado, alterar, concluir,
    validarCliente: () => validar(validarRecebimento(atual.current)),
    validarPergunta: (id: string) => validar(atual.current.respostas[id]?.trim() ? {} : { [id]: id.startsWith("visual-") ? "Selecione um estado, inclusive Não observado quando necessário." : "Resuma o problema informado pelo cliente." }),
    navegar: (tela: string, retornoRevisao = "") => gravarMudanca({ ...atual.current, tela, retornoRevisao }),
    tentarNovamente: () => gravarMudanca(atual.current),
    iniciarInspecao: () => {
      const itens = perguntasRecebimento(atual.current.tipo).filter(item => item.etapa === 5);
      const tela = itens.some(item => item.id === atual.current.ultimaTelaInspecao) ? atual.current.ultimaTelaInspecao : itens[0].id;
      return gravarMudanca({ ...atual.current, inspecao: atual.current.inspecao === "pendente" ? "em andamento" : atual.current.inspecao, tela, retornoRevisao: "" });
    },
    pausarInspecao: () => gravarMudanca({ ...atual.current, ultimaTelaInspecao: atual.current.tela, tela: "painel", retornoRevisao: "" }),
    finalizarInspecao: () => {
      const faltam = perguntasRecebimento(atual.current.tipo).filter(item => item.etapa === 5 && !atual.current.respostas[item.id]);
      if (faltam.length) {
        validar({ [faltam[0].id]: "Selecione um estado." });
        return gravarMudanca({ ...atual.current, tela: faltam[0].id });
      }
      return gravarMudanca({ ...atual.current, inspecao: "concluída", tela: "painel", retornoRevisao: "" });
    },
    novo: () => gravarMudanca(criarRascunho()),
  };
}
