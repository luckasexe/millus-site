export interface FotoRecebimento {
  id: string;
  nome: string;
  arquivo: Blob;
  itemId?: string;
  itemTitulo?: string;
  estado?: string;
  origem?: "cliente" | "funcionário";
  capturadaEm?: string;
}
export interface RascunhoRecebimento {
  versao: 3;
  inspecao: "pendente" | "em andamento" | "concluída";
  ultimaTelaInspecao: string;
  revisao: string;
  tela: string;
  retornoRevisao: string;
  respostas: Record<string, string>;
  complementos: Record<string, string>;
  fotosInspecao: FotoRecebimento[];
  atendente: string;
  ciencia: boolean;
  protocolo: string;
  nome: string;
  telefone: string;
  responsavel: string;
  tipo: string;
  marca: string;
  modelo: string;
  serie: string;
  acessorios: string[];
  outros: string;
  fotos: FotoRecebimento[];
  recebidoEm: string;
}
export function criarRascunho(): RascunhoRecebimento {
  return {
    versao: 3,
    inspecao: "pendente",
    ultimaTelaInspecao: "visual-carcaca",
    revisao: "",
    tela: "cliente",
    retornoRevisao: "",
    respostas: {},
    complementos: {},
    fotosInspecao: [],
    atendente: "",
    ciencia: false,
    protocolo: "",
    nome: "",
    telefone: "",
    responsavel: "",
    tipo: "",
    marca: "",
    modelo: "",
    serie: "",
    acessorios: [],
    outros: "",
    fotos: [],
    recebidoEm: new Date().toISOString(),
  };
}
export function migrarRascunho(salvo: Partial<Omit<RascunhoRecebimento, "versao">> & { versao?: number }) {
  if (salvo.versao !== undefined && salvo.versao !== 1 && salvo.versao !== 2 && salvo.versao !== 3) {
    throw new Error("Versão de recebimento incompatível.");
  }
  return {
    ...criarRascunho(), ...salvo, versao: 3 as const,
    ...(salvo.versao !== 3 ? {
      tela: salvo.protocolo ? "painel" : "cliente",
      retornoRevisao: "",
      // Respostas antigas continuam separadas; não inferimos conclusão de inspeção.
      inspecao: "pendente" as const,
    } : {}),
  };
}

async function abrirBanco(): Promise<IDBDatabase> {
  return new Promise((resolver, rejeitar) => {
    const pedido = indexedDB.open("millus-recebimento", 1);
    pedido.onupgradeneeded = () => pedido.result.createObjectStore("rascunhos");
    pedido.onsuccess = () => resolver(pedido.result);
    pedido.onerror = () => rejeitar(pedido.error);
    pedido.onblocked = () =>
      rejeitar(new Error("Armazenamento bloqueado em outra aba."));
  });
}
export async function lerRascunho(): Promise<RascunhoRecebimento | undefined> {
  const banco = await abrirBanco();
  try {
    return await new Promise((resolver, rejeitar) => {
      const pedido = banco
        .transaction("rascunhos")
        .objectStore("rascunhos")
        .get("atual");
      pedido.onsuccess = () => {
        try {
          resolver(pedido.result ? migrarRascunho(pedido.result) : undefined);
        } catch (erro) {
          rejeitar(erro);
        }
      };
      pedido.onerror = () => rejeitar(pedido.error);
    });
  } finally {
    banco.close();
  }
}
export async function gravarRascunho(
  dados: RascunhoRecebimento,
  revisaoEsperada: string,
): Promise<void> {
  const banco = await abrirBanco();
  try {
    await new Promise<void>((resolver, rejeitar) => {
      const transacao = banco.transaction("rascunhos", "readwrite");
      const registros = transacao.objectStore("rascunhos");
      const leitura = registros.get("atual");
      let falha: unknown;
      leitura.onsuccess = () => {
        try {
          if ((leitura.result?.revisao ?? "") !== revisaoEsperada) {
            throw new Error("CONFLITO");
          }
          registros.put(dados, "atual");
        } catch (erro) {
          falha = erro;
          transacao.abort();
        }
      };
      transacao.oncomplete = () => resolver();
      transacao.onerror = () => rejeitar(transacao.error);
      transacao.onabort = () => rejeitar(falha ?? transacao.error);
    });
  } finally {
    banco.close();
  }
}
