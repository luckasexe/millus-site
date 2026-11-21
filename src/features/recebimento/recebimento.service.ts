export interface FotoRecebimento {
  id: string;
  nome: string;
  arquivo: Blob;
}
export interface RascunhoRecebimento {
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
  confirmado: boolean;
}
export function criarRascunho(): RascunhoRecebimento {
  return {
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
    confirmado: false,
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
      pedido.onsuccess = () => resolver(pedido.result);
      pedido.onerror = () => rejeitar(pedido.error);
    });
  } finally {
    banco.close();
  }
}
export async function gravarRascunho(
  dados: RascunhoRecebimento,
): Promise<void> {
  const banco = await abrirBanco();
  try {
    await new Promise<void>((resolver, rejeitar) => {
      const transacao = banco.transaction("rascunhos", "readwrite");
      transacao.objectStore("rascunhos").put(dados, "atual");
      transacao.oncomplete = () => resolver();
      transacao.onerror = () => rejeitar(transacao.error);
      transacao.onabort = () => rejeitar(transacao.error);
    });
  } finally {
    banco.close();
  }
}
