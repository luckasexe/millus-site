import { useEffect, useRef, useState } from "react";
import {
  criarRascunho,
  gravarRascunho,
  lerRascunho,
  type RascunhoRecebimento,
} from "./recebimento.service";
import { mascararTelefone, validarRecebimento } from "./recebimento.regras";
export function useRecebimento() {
  const [dados, definirDados] = useState(criarRascunho);
  const [carregando, definirCarregando] = useState(true);
  const [erros, definirErros] = useState<{ nome?: string; telefone?: string }>(
    {},
  );
  const [situacao, definirSituacao] = useState("Carregando rascunho…");
  const [falha, definirFalha] = useState("");
  const [salvando, definirSalvando] = useState(false);
  const fila = useRef<Promise<void>>(Promise.resolve());
  const versao = useRef(0);
  useEffect(() => {
    let ativo = true;
    lerRascunho()
      .then((salvo) => {
        if (ativo) {
          if (salvo) definirDados(salvo);
          definirSituacao(
            salvo ? "Rascunho recuperado neste navegador" : "Rascunho local",
          );
        }
      })
      .catch(() => {
        if (ativo)
          definirFalha(
            "Não foi possível recuperar o rascunho local. O armazenamento pode estar indisponível.",
          );
      })
      .finally(() => {
        if (ativo) definirCarregando(false);
      });
    return () => {
      ativo = false;
    };
  }, []);
  function persistir(proximo: RascunhoRecebimento) {
    const atual = ++versao.current;
    definirSituacao("Salvando neste navegador…");
    const tarefa = fila.current
      .catch(() => {})
      .then(() => gravarRascunho(proximo));
    fila.current = tarefa;
    void tarefa.then(
      () => {
        if (atual === versao.current) {
          definirSituacao("Salvo neste navegador");
          definirFalha("");
        }
      },
      () => {
        if (atual === versao.current) {
          definirSituacao("Alterações não salvas");
          definirFalha(
            "Não foi possível salvar no navegador. Espaço insuficiente ou armazenamento indisponível. Mantenha esta aba aberta e tente novamente.",
          );
        }
      },
    );
    return tarefa;
  }
  useEffect(() => {
    if (!carregando) void persistir(dados).catch(() => {});
  }, [dados, carregando]);
  function alterar(
    campo: keyof RascunhoRecebimento,
    valor: string | string[] | RascunhoRecebimento["fotos"],
  ) {
    definirDados((anterior) => ({
      ...anterior,
      [campo]: campo === "telefone" ? mascararTelefone(String(valor)) : valor,
    }));
  }
  async function salvar() {
    const novosErros = validarRecebimento(dados);
    definirErros(novosErros);
    const primeiro = Object.keys(novosErros)[0];
    if (primeiro) {
      requestAnimationFrame(() => document.getElementById(primeiro)?.focus());
      return;
    }
    definirSalvando(true);
    const proximo = { ...dados, confirmado: true };
    try {
      await persistir(proximo);
      definirDados(proximo);
      requestAnimationFrame(() =>
        document.getElementById("titulo-resumo")?.focus(),
      );
    } catch {
      /* A mensagem do armazenamento mantém os dados disponíveis para nova tentativa. */
    } finally {
      definirSalvando(false);
    }
  }
  function editar() {
    definirDados((anterior) => ({ ...anterior, confirmado: false }));
  }
  return {
    dados,
    carregando,
    erros,
    situacao,
    falha,
    salvando,
    alterar,
    salvar,
    editar,
  };
}
