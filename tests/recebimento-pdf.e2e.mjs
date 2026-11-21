import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "./playwright.mjs";

const destino = process.env.MILLUS_EVIDENCIAS || "/opt/data/cache/scratch/millus-evidencias";
mkdirSync(destino, { recursive: true });
const navegador = await chromium.launch({ channel: "chromium" });
try {
  const pagina = await navegador.newPage({ viewport: { width: 360, height: 640 } });
  pagina.setDefaultTimeout(5000);
  await pagina.addInitScript(() => {
    window.chamadas = 0;
    Object.defineProperty(navigator, "canShare", { value: dados => window.permite && dados.files[0].type === "application/pdf" });
    Object.defineProperty(navigator, "share", { value: () => {
      window.chamadas++;
      return Promise.reject(new DOMException("Cancelado", "AbortError"));
    } });
  });
  await pagina.goto(process.env.MILLUS_URL || "http://localhost:5174");
  await pagina.getByLabel("Nome completo ou razão social").waitFor();
  await pagina.evaluate(async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 170;
    canvas.height = 100;
    const desenho = canvas.getContext("2d");
    desenho.fillStyle = "#ffdc00";
    desenho.fillRect(0, 0, 170, 100);
    const cliente = await new Promise(resolve => canvas.toBlob(resolve));
    desenho.fillStyle = "#424242";
    desenho.fillRect(0, 0, 170, 100);
    const inspecao = await new Promise(resolve => canvas.toBlob(resolve));
    const pedido = indexedDB.open("millus-recebimento", 1);
    pedido.onupgradeneeded = () => pedido.result.createObjectStore("rascunhos");
    await new Promise((resolve, reject) => {
      pedido.onsuccess = () => {
        const banco = pedido.result;
        const transacao = banco.transaction("rascunhos", "readwrite");
        transacao.oncomplete = () => { banco.close(); resolve(); };
        transacao.onerror = reject;
        transacao.objectStore("rascunhos").put({
          versao: 3, protocolo: "MILLUS-FIXTURE", tela: "painel", inspecao: "pendente", ultimaTelaInspecao: "visual-carcaca",
          nome: "Águia Manutenção", telefone: "(13) 98207-1346", responsavel: "João",
          tipo: "lavadora", marca: "Água", modelo: "A17", serie: "XYZ", acessorios: ["Mangueira"],
          recebidoEm: "2025-03-20T12:23:00.000Z", atendente: "Márcia", ciencia: true,
          respostas: {
            ocorrencia: "Pressão oscilante e ruído durante a operação. ".repeat(240) + "MARCADOR FINAL LONGO",
            "lavadora-semAgua": "Não sabe", "compressor-pressao": "RESIDUAL OCULTO",
            "historico-0": "Sim", "visual-0": "Alteração visível", observacoes: "Oxidação aparente.",
          },
          complementos: { "historico-0": "Queda observada." },
          fotos: [{ id: "a", nome: "cliente-ação.png", arquivo: cliente }],
          fotosInspecao: [
            { id: "b", nome: "inspeção-visível.png", arquivo: inspecao },
            { id: "c", nome: "cabo-danificado.png", arquivo: inspecao, itemId: "visual-cabos", itemTitulo: "Condição dos cabos e conectores", estado: "Danificado ou alteração", origem: "funcionário" },
            { id: "d", nome: "mangueira.png", arquivo: cliente, itemId: "visual-mangueiras", itemTitulo: "Mangueiras e conexões", estado: "Não observado", origem: "funcionário" },
          ],
        }, "atual");
      };
      pedido.onerror = reject;
    });
  });
  await pagina.reload();
  const baixar = pagina.getByRole("link", { name: "Baixar PDF" });
  const [download] = await Promise.all([pagina.waitForEvent("download"), baixar.click()]);
  const caminho = join(destino, "recebimento-fixture.pdf");
  await download.saveAs(caminho);
  assert.equal(readFileSync(caminho).subarray(0, 5).toString(), "%PDF-");
  execFileSync(process.env.MILLUS_PYTHON || "python", ["tests/verificar-pdf.py", caminho], { stdio: "inherit" });
  const abrir = pagina.getByRole("link", { name: "Visualizar PDF" });
  assert.match(await abrir.getAttribute("href"), /^blob:/);
  assert.equal(await abrir.getAttribute("target"), "_blank");
  const endereco = await abrir.getAttribute("href");
  assert.equal(await pagina.evaluate(async url => (await (await fetch(url)).text()).slice(0, 5), endereco), "%PDF-");
  const [visualizador] = await Promise.all([pagina.waitForEvent("popup"), abrir.click()]);
  await visualizador.waitForURL(endereco);
  await visualizador.close();
  console.log("Nova aba do visualizador abriu a URL do PDF.");
  const compartilhar = pagina.getByRole("button", { name: "Compartilhar PDF" });
  assert.equal(await compartilhar.count(), 0);
  await pagina.getByText(/Compartilhamento de arquivos indisponível/).waitFor();
  await pagina.evaluate(() => { window.permite = true; });
  await pagina.reload();
  await pagina.evaluate(() => { window.permite = true; });
  await compartilhar.click();
  assert.equal(await pagina.evaluate(() => window.chamadas), 1);
  await pagina.getByText("Compartilhamento cancelado.").waitFor();
  assert.equal(await compartilhar.isEnabled(), true);
  await pagina.getByRole("button", { name: "Iniciar inspeção", exact: true }).click();
  await pagina.locator("select").waitFor();
  for (let indice = 0; indice < 5; indice++) {
    await pagina.locator("select").selectOption(indice === 1 ? "Sem alteração" : "Não observado");
    const anterior = await pagina.locator("#titulo-subtela").getAttribute("data-tela");
    await pagina.getByRole("button", { name: indice === 4 ? "Concluir inspeção visual" : "Continuar", exact: true }).click();
    await pagina.waitForFunction(tela => document.querySelector("#titulo-subtela")?.getAttribute("data-tela") !== tela, anterior);
  }
  await pagina.getByRole("heading", { name: "Recebido · inspeção concluída", exact: true }).waitFor();
  const [atualizado] = await Promise.all([pagina.waitForEvent("download"), baixar.click()]);
  const caminhoConcluido = join(destino, "recebimento-concluido-fixture.pdf");
  await atualizado.saveAs(caminhoConcluido);
  execFileSync(process.env.MILLUS_PYTHON || "python", ["tests/verificar-pdf.py", caminhoConcluido, "concluída"], { stdio: "inherit" });
  assert.equal(await pagina.getByTestId("protocolo").innerText(), "MILLUS-FIXTURE");
  await pagina.reload();
  await pagina.getByRole("heading", { name: "Recebido · inspeção concluída", exact: true }).waitFor();
  await pagina.getByRole("button", { name: "Retomar inspeção", exact: true }).click();
  await pagina.locator("select").waitFor();
  await pagina.locator("select").selectOption("Danificado ou alteração");
  await pagina.getByRole("button", { name: "Retomar depois", exact: true }).click();
  await pagina.getByRole("heading", { name: "Recebido · inspeção em andamento", exact: true }).waitFor();
  await pagina.screenshot({ path: join(destino, "recebimento-protocolo-360.png") });
  pagina.once("dialog", async aviso => {
    assert.match(aviso.message(), /substitui o registro local/);
    await aviso.dismiss();
  });
  await pagina.getByRole("button", { name: "Novo recebimento" }).click();
  assert.equal(await pagina.getByTestId("protocolo").textContent(), "MILLUS-FIXTURE");

  const blob = await abrir.getAttribute("href");
  await pagina.evaluate(() => {
    window.revogadas = [];
    const revogar = URL.revokeObjectURL;
    URL.revokeObjectURL = endereco => { revogar(endereco); window.revogadas.push(endereco); };
  });
  pagina.once("dialog", aviso => aviso.accept());
  await pagina.getByRole("button", { name: "Novo recebimento" }).click();
  await pagina.locator("#nome").waitFor();
  assert.ok(await pagina.evaluate(endereco => window.revogadas.includes(endereco), blob));
  console.log("Download, URL da visualização, fallback e cancelamento do compartilhamento, aviso e revogação do Blob verificados.");
} finally {
  await navegador.close();
}
