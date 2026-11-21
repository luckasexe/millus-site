import { jsPDF } from "jspdf";
import { contato } from "../inicio/inicio.dados";
import { linhasRecebimento, titulosEtapa } from "./recebimento.regras";
import type { RascunhoRecebimento } from "./recebimento.service";

const logo = "/assets/millus/identidade-v2/logos/assinatura-escuro.png";
const aviso = "Registro de recebimento para triagem. Não constitui diagnóstico, orçamento ou autorização de reparo.";

async function prepararImagem(arquivo: Blob) {
  const imagem = await createImageBitmap(arquivo);
  try {
    const escala = Math.min(1, 1600 / Math.max(imagem.width, imagem.height));
    const tela = document.createElement("canvas");
    tela.width = Math.max(1, Math.round(imagem.width * escala));
    tela.height = Math.max(1, Math.round(imagem.height * escala));
    const desenho = tela.getContext("2d");
    if (!desenho) throw new Error("Imagem indisponível");
    desenho.fillStyle = "#ffffff";
    desenho.fillRect(0, 0, tela.width, tela.height);
    desenho.drawImage(imagem, 0, 0, tela.width, tela.height);
    return { dados: tela.toDataURL("image/jpeg", 0.86), largura: imagem.width, altura: imagem.height };
  } finally {
    imagem.close();
  }
}

export async function gerarPdfRecebimento(dados: RascunhoRecebimento) {
  const resposta = await fetch(logo);
  if (!resposta.ok) throw new Error("Identidade visual indisponível");
  const imagemLogo = await prepararImagem(await resposta.blob());
  const pdf = new jsPDF({ format: "a4", unit: "mm", compress: true, putOnlyUsedFonts: true });
  pdf.setProperties({ title: `Recebimento ${dados.protocolo}`, author: "Millus Assistência Técnica" });
  const margem = 16;
  const largura = 178;
  const limite = 277;
  const endereco = new URL(contato.mapa).searchParams.get("q")?.replaceAll("+", " ") ?? "";
  const telefone = contato.whatsapp.replace(/^.*55(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  let linha = 42;

  function fonte(tamanho: number, estilo = "normal", cor = "#242a2d") {
    pdf.setFont("helvetica", estilo);
    pdf.setFontSize(tamanho);
    pdf.setTextColor(cor);
  }

  function cabecalho() {
    pdf.setFillColor("#ffdc00");
    pdf.rect(0, 0, 210, 4, "F");
    const escala = Math.min(41 / imagemLogo.largura, 16 / imagemLogo.altura);
    pdf.addImage(imagemLogo.dados, "JPEG", margem, 9, imagemLogo.largura * escala, imagemLogo.altura * escala, "millus");
    fonte(15, "bold");
    pdf.text("Comprovante de recebimento", 61, 15);
    fonte(9);
    pdf.text(`Protocolo local ${dados.protocolo}`, 61, 21);
    pdf.text(`${contato.email}  |  WhatsApp ${telefone}`, 61, 26);
    pdf.text(endereco, 61, 31);
    pdf.setDrawColor("#d5d9db");
    pdf.line(margem, 35, 194, 35);
  }

  function reservar(altura: number) {
    if (linha + altura <= limite) return;
    pdf.addPage();
    cabecalho();
    linha = 42;
  }

  function titulo(rotulo: string) {
    reservar(18);
    pdf.setFillColor("#fff4b0");
    pdf.rect(margem, linha - 4.3, largura, 7, "F");
    fonte(11, "bold");
    pdf.text(rotulo, margem + 2, linha + 0.5);
    linha += 9;
  }

  function texto(valor: string, tamanho = 10, estilo = "normal") {
    fonte(tamanho, estilo);
    const trechos: string[] = pdf.splitTextToSize(valor || "Não informado", largura);
    const alturaLinha = tamanho * 0.53;
    for (const trecho of trechos) {
      reservar(alturaLinha);
      fonte(tamanho, estilo);
      pdf.text(trecho, margem, linha);
      linha += alturaLinha;
    }
  }

  async function fotos(rotulo: string, anexos: RascunhoRecebimento["fotos"]) {
    if (!anexos.length) {
      titulo(rotulo);
      texto("Nenhuma foto anexada.");
    }
    for (const [indice, foto] of anexos.entries()) {
      try {
        const imagem = await prepararImagem(foto.arquivo);
        const escala = Math.min(largura / imagem.largura, 86 / imagem.altura);
        const altura = imagem.altura * escala;
        const larguraFoto = imagem.largura * escala;
        const legendas = [
          foto.nome,
          foto.itemId ? `${foto.itemTitulo ?? foto.itemId} [${foto.itemId}] · Estado capturado: ${foto.estado ?? "Não registrado"}` : "Foto geral legada · sem item ou estado associado",
          `Origem: ${foto.origem ?? (rotulo.includes("cliente") ? "cliente · legado" : "funcionário · legado")}${foto.capturadaEm ? ` · Capturada em ${new Date(foto.capturadaEm).toLocaleString("pt-BR")}` : " · Data de captura não registrada"}`,
          ...(foto.itemId && foto.estado !== dados.respostas[foto.itemId] && foto.origem === "funcionário"
            ? [`Estado atual do item: ${dados.respostas[foto.itemId] || "Não informado"}. Evidência mantém o estado original.`] : []),
        ];
        fonte(9);
        const alturaLegendas = legendas.reduce((total, legenda) => total + pdf.splitTextToSize(legenda, largura).length * 9 * 0.53, 0);
        reservar(altura + alturaLegendas + (indice === 0 ? 26 : 17));
        if (indice === 0) titulo(rotulo);
        texto(`${rotulo} · ${indice + 1}`, 9, "bold");
        pdf.addImage(imagem.dados, "JPEG", margem, linha, larguraFoto, altura);
        linha += altura + 5;
        for (const legenda of legendas) texto(legenda, 9);
      } catch {
        if (indice === 0) titulo(rotulo);
        texto(`${foto.nome} · imagem indisponível para impressão.`);
      }
      linha += 4;
    }
  }

  cabecalho();
  texto(aviso, 10, "bold");
  texto(`Inspeção visual ${dados.inspecao}`, 11, "bold");
  if (dados.inspecao !== "concluída") texto("Recebimento registrado. Inspeção visual ainda não concluída; nenhum diagnóstico realizado.");
  linha += 5;
  const linhas = linhasRecebimento(dados);
  for (const [indice, rotulo] of titulosEtapa.entries()) {
    const preenchidas = linhas.filter(item => item.etapa === indice + 1 && !!item.valor);
    if (preenchidas.length) titulo(rotulo);
    for (const item of preenchidas) {
      reservar(12);
      texto(item.rotulo, 9, "bold");
      texto(item.valor || "Não informado");
      linha += 2;
    }
    if (indice === 1) await fotos("Fotos do recebimento · cliente", dados.fotos);
    if (indice === 4) await fotos("Fotos da inspeção visual", dados.fotosInspecao);
    linha += 5;
  }
  titulo("Ciência e atendente");
  texto(`Atendente: ${dados.atendente}`);
  texto(dados.ciencia ? "Ciência do cliente confirmada pelo atendente." : "Ciência do cliente não registrada.");
  reservar(21);
  linha += 11;
  pdf.setDrawColor("#242a2d");
  pdf.line(margem, linha, margem + 112, linha);
  linha += 5;
  texto("Assinatura manual do cliente");

  const total = pdf.getNumberOfPages();
  for (let pagina = 1; pagina <= total; pagina++) {
    pdf.setPage(pagina);
    pdf.setDrawColor("#d5d9db");
    pdf.line(margem, 282, 194, 282);
    fonte(9);
    pdf.text("Millus Assistência Técnica  |  Registro local de triagem", margem, 288);
    pdf.text(`${pagina} / ${total}`, 194, 288, { align: "right" });
  }
  return new File([pdf.output("blob")], `${dados.protocolo}.pdf`, { type: "application/pdf" });
}
