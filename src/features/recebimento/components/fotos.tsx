import { useEffect, useRef, useState } from "react";
import type { FotoRecebimento } from "../recebimento.service";
import { validarFoto } from "../recebimento.regras";
export function MiniaturaFoto({
  foto,
  remover,
  processando,
}: {
  foto: FotoRecebimento;
  remover?: () => void;
  processando?: boolean;
}) {
  const [endereco, definirEndereco] = useState("");
  useEffect(() => {
    const novo = URL.createObjectURL(foto.arquivo);
    definirEndereco(novo);
    return () => URL.revokeObjectURL(novo);
  }, [foto.arquivo]);
  return (
    <figure className="miniatura-foto">
      {endereco && <img src={endereco} alt={`Foto: ${foto.nome}`} />}
      <figcaption title={[foto.itemTitulo, foto.estado, foto.nome].filter(Boolean).join(" · ")}>{foto.estado ? `${foto.estado} · ` : ""}{foto.nome}</figcaption>
      {remover && (
        <button
          type="button"
          onClick={remover}
          disabled={processando}
          aria-label={`Remover foto ${foto.nome}`}
        >
          ×
        </button>
      )}
    </figure>
  );
}
export function FotosRecebimento({
  fotos,
  alterar,
  aoProcessar,
  contexto,
}: {
  contexto?: Pick<FotoRecebimento, "itemId" | "itemTitulo" | "estado" | "origem">;
  fotos: FotoRecebimento[];
  alterar: (fotos: FotoRecebimento[]) => void;
  aoProcessar: (processando: boolean) => void;
}) {
  const [erro, definirErro] = useState("");
  const [processando, definirProcessando] = useState(false);
  const galeria = useRef<HTMLInputElement>(null);
  const camera = useRef<HTMLInputElement>(null);
  async function adicionar(arquivos: File[]) {
    definirProcessando(true);
    aoProcessar(true);
    definirErro("");
    const novas = [...fotos];
    const mensagens: string[] = [];
    try {
      for (const arquivo of arquivos) {
        const falha = validarFoto(arquivo, novas.length);
        if (falha) {
          mensagens.push(`${arquivo.name}: ${falha}`);
          continue;
        }
        try {
          const imagem = await createImageBitmap(arquivo);
          imagem.close();
          novas.push({ id: crypto.randomUUID(), nome: arquivo.name, arquivo, ...contexto, capturadaEm: new Date().toISOString() });
        } catch {
          mensagens.push(
            `${arquivo.name}: A imagem não pôde ser lida. Escolha outra foto.`,
          );
        }
      }
      alterar(novas);
      definirErro(mensagens.join(" "));
    } finally {
      definirProcessando(false);
      aoProcessar(false);
    }
  }
  return (
    <div>
      <p className="limites-fotos">
        6 fotos/item · 5 MB/foto · JPEG, PNG ou WebP.
      </p>
      <div className="acoes-fotos">
        <button
          type="button"
          disabled={processando}
          onClick={() => camera.current?.click()}
        >
          ◉ Usar câmera
        </button>
        <button
          type="button"
          disabled={processando}
          onClick={() => galeria.current?.click()}
        >
          ＋ Escolher da galeria
        </button>
      </div>
      <input
        ref={galeria}
        className="entrada-foto"
        tabIndex={-1}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        aria-label="Selecionar fotos da galeria"
        disabled={processando}
        onChange={(evento) => {
          void adicionar(Array.from(evento.target.files || []));
          evento.target.value = "";
        }}
      />
      <input
        ref={camera}
        className="entrada-foto"
        tabIndex={-1}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        capture="environment"
        aria-label="Tirar foto com câmera"
        disabled={processando}
        onChange={(evento) => {
          void adicionar(Array.from(evento.target.files || []));
          evento.target.value = "";
        }}
      />
      {processando && <p role="status">Preparando fotos…</p>}
      {erro && (
        <p className="erro-campo" role="alert">
          {erro}
        </p>
      )}
      <div className="grade-fotos">
        {fotos.map((foto) => (
          <MiniaturaFoto
            key={foto.id}
            foto={foto}
            processando={processando}
            remover={() => alterar(fotos.filter((item) => item.id !== foto.id))}
          />
        ))}
      </div>
      <p className="contador-fotos">{fotos.length} de 6 fotos</p>
    </div>
  );
}
