import assert from "node:assert/strict";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "./playwright.mjs";
const evidencias = process.env.MILLUS_EVIDENCIAS;
if (evidencias) mkdirSync(evidencias, { recursive: true });
const navegador = await chromium.launch();
const url = process.env.MILLUS_URL || "http://localhost:5174";
async function navegar(pagina, nome) {
  const subtela = pagina.locator("#titulo-subtela");
  const antes = await subtela.getAttribute("data-tela");
  await pagina.getByRole("button", { name: nome, exact: true }).click();
  await pagina.waitForFunction(valor => document.querySelector("#titulo-subtela")?.getAttribute("data-tela") !== valor, antes);
}
const proximo = pagina => navegar(pagina, "Continuar");
const voltar = pagina => navegar(pagina, "Voltar");

async function iniciar(pagina, verificar = async () => {}) {
  await pagina.goto(url);
  await pagina.locator("#nome").waitFor();
  await verificar();
  await pagina.getByRole("button", { name: "Continuar", exact: true }).click();
  assert.equal(await pagina.locator("#nome").evaluate(campo => campo === document.activeElement), true);
  await verificar();
  await pagina.locator("#nome").fill("Oficina");
  await pagina.locator("#telefone").fill("13982071346");
  await proximo(pagina);
  await pagina.getByLabel("Responsável pela entrega").fill("João");
  await proximo(pagina);
}

async function avancarAte(pagina, titulo, verificar = async () => {}) {
  for (let tentativa = 0; tentativa < 250; tentativa++) {
    await verificar();
    if (await pagina.getByRole("heading", { name: titulo, exact: true }).isVisible()) return;
    await proximo(pagina);
  }
  throw new Error("Não chegou a " + titulo);
}

const imagem = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAACgAAAAYCAIAAAAH5iiXAAAAKElEQVR4nO3NMQ0AAAgDsPnXiBdQQfY06d/spKKzisVisVgsFovFLw4e6/WbZnHDtgAAAABJRU5ErkJggg==", "base64");

async function persistencia() {
  const pagina = await navegador.newPage({ viewport: { width: 360, height: 640 } });
  pagina.setDefaultTimeout(3000);
  await pagina.addInitScript(bytes => {
    window.seletores = 0;
    document.addEventListener("click", evento => {
      if (evento.target instanceof HTMLInputElement && evento.target.type === "file") window.seletores++;
    }, true);
    const put = IDBObjectStore.prototype.put;
    IDBObjectStore.prototype.put = function (...argumentos) {
      if (window.simularQuota) throw new DOMException("Quota simulada", "QuotaExceededError");
      return put.apply(this, argumentos);
    };
    if (sessionStorage.legado) return;
    sessionStorage.legado = "1";
    const pedido = indexedDB.open("millus-recebimento", 1);
    pedido.onupgradeneeded = () => pedido.result.createObjectStore("rascunhos");
    pedido.onsuccess = () => {
      const banco = pedido.result;
      const fila = banco.transaction("rascunhos", "readwrite");
      fila.objectStore("rascunhos").put({
        nome: "Oficina", telefone: "(13) 98207-1346", tipo: "Compressor de ar", confirmado: true,
        recebidoEm: "2025-03-20T12:23:00.000Z",
        fotos: [{ id: "legado", nome: "cliente.png", arquivo: new Blob([new Uint8Array(bytes)], { type: "image/png" }) }],
      }, "atual");
      fila.oncomplete = () => banco.close();
    };
  }, [...imagem]);
  await pagina.goto(url);
  await pagina.getByText("Registro recuperado neste navegador").waitFor();
  assert.equal(await pagina.evaluate(async () => new Promise((resolve, reject) => {
    const banco = indexedDB.open("millus-recebimento", 1);
    banco.onerror = reject;
    banco.onsuccess = () => {
      const consulta = banco.result.transaction("rascunhos").objectStore("rascunhos").get("atual");
      consulta.onerror = reject;
      consulta.onsuccess = () => { banco.result.close(); resolve(consulta.result.versao ?? 1); };
    };
  })), 1);
  await avancarAte(pagina, "Entrega");
  assert.equal(await pagina.locator("time").getAttribute("datetime"), "2025-03-20T12:23:00.000Z");
  await avancarAte(pagina, "Fotos do cliente");
  assert.equal(await pagina.getByAltText("Foto: cliente.png").count(), 1);
  assert.equal(await pagina.evaluate(() => window.seletores), 0);
  await pagina.reload();
  await pagina.getByRole("heading", { name: "Fotos do cliente", exact: true }).waitFor();
  await avancarAte(pagina, "Fotos da inspeção visual");
  await pagina.getByLabel("Selecionar fotos da galeria").setInputFiles({
    name: "inspecao.png", mimeType: "image/png", buffer: imagem,
  });
  await pagina.getByAltText("Foto: inspecao.png").waitFor();
  await avancarAte(pagina, "Revisão do recebimento");
  await pagina.getByRole("button", { name: "Corrigir", exact: true }).click();
  await pagina.locator("#nome").fill("Oficina revisada");
  await proximo(pagina);
  await pagina.getByRole("heading", { name: "Revisão do recebimento", exact: true }).waitFor();
  await avancarAte(pagina, "Ciência e atendente");
  await pagina.getByRole("button", { name: "Concluir recebimento" }).click();
  await pagina.getByText("Informe o nome do atendente.").waitFor();
  await pagina.locator("#atendente").fill("Márcia");
  await pagina.getByLabel("O cliente está ciente do registro").check();
  await pagina.getByRole("status").filter({ hasText: "Salvo neste navegador" }).waitFor();
  await pagina.evaluate(() => { window.simularQuota = true; });
  await pagina.getByRole("button", { name: "Concluir recebimento" }).click();
  await pagina.getByRole("alert").waitFor();
  assert.equal(await pagina.locator("#atendente").inputValue(), "Márcia");
  await pagina.evaluate(() => { window.simularQuota = false; });
  await pagina.getByRole("button", { name: "Concluir recebimento" }).click();
  const protocolo = await pagina.getByTestId("protocolo").textContent();
  assert.match(protocolo, /^MILLUS-/);
  await pagina.reload();
  assert.equal(await pagina.getByTestId("protocolo").textContent(), protocolo);
  console.log("Blob legado, reload, correção, quota/retry e protocolo:", protocolo);
  await pagina.close();
}

async function medir(pagina) {
  const medida = await pagina.evaluate(() => ({
    largura: document.documentElement.scrollWidth,
    altura: document.documentElement.scrollHeight,
    disponivel: [innerWidth, innerHeight],
    pequenos: [...document.querySelectorAll(
      ".recebimento button, .recebimento input:not([type=checkbox]):not([type=file]), .recebimento textarea, .recebimento select, .recebimento summary, .opcoes-acessorios label, .confirmar-ciencia, .acoes-comprovante a"
    )].filter(elemento => elemento.getBoundingClientRect().height < 44).map(elemento => elemento.outerHTML),
  }));
  assert.ok(medida.altura <= medida.disponivel[1] && medida.largura <= medida.disponivel[0], JSON.stringify(medida));
  assert.deepEqual(medida.pequenos, []);
}

async function medirEFotografar(pagina, tela) {
  await medir(pagina);
  if (evidencias) await pagina.screenshot({ path: join(evidencias, `${tela}-${pagina.viewportSize().width}.png`) });
}

async function midiaDuranteNavegacao(pagina) {
  const galeria = pagina.getByLabel("Selecionar fotos da galeria");
  await pagina.evaluate(() => {
    const decodificar = createImageBitmap;
    window.restaurarImagem = () => { window.createImageBitmap = decodificar; };
    window.createImageBitmap = async (...args) => {
      await new Promise(resolve => setTimeout(resolve, 400));
      return decodificar(...args);
    };
  });
  await galeria.setInputFiles({ name: "processando.png", mimeType: "image/png", buffer: imagem });
  await pagina.getByText("Preparando fotos…").waitFor();
  assert.equal(await pagina.getByRole("button", { name: "Continuar", exact: true }).isDisabled(), true);
  await pagina.getByAltText("Foto: processando.png").waitFor();
  await pagina.evaluate(() => { window.restaurarImagem(); });

}

async function preencherFotos(pagina, prefixo) {
  const galeria = pagina.getByLabel("Selecionar fotos da galeria");
  assert.equal(await pagina.getByLabel("Tirar foto com câmera").getAttribute("capture"), "environment");
  for (const [arquivo, mensagem] of [
    [{ name: "fixture.txt", mimeType: "text/plain", buffer: Buffer.from("fixture") }, "JPEG"],
    [{ name: "corrompida.png", mimeType: "image/png", buffer: Buffer.from("fixture") }, "não pôde ser lida"],
    [{ name: "grande.png", mimeType: "image/png", buffer: Buffer.alloc(5 * 1024 * 1024 + 1) }, "5 MB"],
  ]) {
    await galeria.setInputFiles(arquivo);
    await pagina.waitForFunction(() => !document.querySelector(".acoes-fotos button")?.disabled);
    await pagina.getByRole("alert").filter({ hasText: mensagem }).waitFor();
  }
  const arquivos = Array.from({ length: 6 }, (_, indice) => ({
    name: `${prefixo}-${indice}.png`, mimeType: "image/png", buffer: imagem,
  }));
  await galeria.setInputFiles(arquivos);
  await pagina.waitForFunction(() => document.querySelectorAll(".miniatura-foto img").length === 6);
  await pagina.getByRole("status").filter({ hasText: "Salvo neste navegador" }).waitFor();
  await medirEFotografar(pagina, prefixo);
}

async function concorrenciaEFoco() {
  const contexto = await navegador.newContext({ viewport: { width: 360, height: 320 } });
  const primeira = await contexto.newPage();
  const segunda = await contexto.newPage();
  await Promise.all([primeira.goto(url), segunda.goto(url)]);
  await Promise.all([primeira.locator("#nome").waitFor(), segunda.locator("#nome").waitFor()]);
  await primeira.locator("#nome").fill("Primeira aba");
  await primeira.getByRole("status").filter({ hasText: "Salvo neste navegador" }).waitFor();
  await segunda.locator("#nome").fill("Segunda aba");
  await segunda.getByRole("alert").filter({ hasText: "Outra aba alterou o registro" }).waitFor();
  assert.equal(await segunda.locator("#nome").inputValue(), "Segunda aba");
  await segunda.reload();
  await segunda.locator("#nome").waitFor();
  assert.equal(await segunda.locator("#nome").inputValue(), "Primeira aba");
  await segunda.locator("#telefone").focus();
  assert.equal(await segunda.evaluate(() => document.activeElement.id), "telefone");
  assert.ok(await segunda.evaluate(() => document.documentElement.scrollHeight > innerHeight));
  await contexto.close();
  console.log("Conflito entre abas e teclado em viewport reduzido verificados.");
}

try {
  for (const [tipo, especifica, width, height] of [
    ["Compressor de ar", "Pressão no reservatório", 360, 640],
    ["Lavadora de alta pressão", "Uso sem água", 390, 844],
    ["Outros", "Ruído informado", 1440, 900],
  ]) {
    const pagina = await navegador.newPage({ viewport: { width, height } });
    pagina.setDefaultTimeout(10_000);
    await pagina.addInitScript(() => {
      window.pedidosCamera = 0;
      window.revogadas = [];
      if (navigator.mediaDevices) navigator.mediaDevices.getUserMedia = () => {
        window.pedidosCamera++;
        throw new Error("A câmera exige ação do usuário.");
      };
      const revogar = URL.revokeObjectURL;
      URL.revokeObjectURL = endereco => { revogar(endereco); window.revogadas.push(endereco); };
    });
    await iniciar(pagina, () => medir(pagina));
    await medirEFotografar(pagina, "categorias");
    await pagina.getByRole("button", { name: tipo, exact: true }).click();
    await avancarAte(pagina, "Fotos do cliente", () => medir(pagina));
    await midiaDuranteNavegacao(pagina);
    const urlMiniatura = await pagina.getByAltText("Foto: processando.png").getAttribute("src");
    await pagina.getByRole("button", { name: "Remover foto processando.png" }).click();
    await pagina.waitForFunction(endereco => window.revogadas.includes(endereco), urlMiniatura);
    assert.equal(await pagina.evaluate(() => window.pedidosCamera), 0);
    await preencherFotos(pagina, "fotos-cliente");
    await avancarAte(pagina, "O que acontece?", () => medir(pagina));
    await pagina.locator("textarea").fill("Pressão oscilante após o transporte. ".repeat(30));
    await avancarAte(pagina, especifica, async () => {
      await medir(pagina);
      if (tipo !== "Lavadora de alta pressão") {
        assert.equal(await pagina.getByLabel("Uso sem água", { exact: true }).count(), 0);
      }
    });
    await pagina.locator("select").selectOption("Não sabe");
    await avancarAte(pagina, "Quedas ou impactos", () => medir(pagina));
    await pagina.locator("select").selectOption("Sim");
    await pagina.getByLabel("Complemento (opcional)").fill("Impacto no transporte.");
    await proximo(pagina);
    await voltar(pagina);
    assert.equal(await pagina.locator("select").inputValue(), "Sim");
    await avancarAte(pagina, "Condição da carcaça", () => medir(pagina));
    await pagina.locator("select").selectOption("Alteração visível");
    await avancarAte(pagina, "Fotos da inspeção visual", () => medir(pagina));
    await preencherFotos(pagina, "fotos-inspecao");
    await avancarAte(pagina, "Revisão do recebimento", () => medir(pagina));
    await medirEFotografar(pagina, "revisao");
    await avancarAte(pagina, "Ciência e atendente", () => medir(pagina));
    await pagina.locator("#atendente").fill("Márcia");
    await pagina.getByLabel("O cliente está ciente do registro").check();
    await medir(pagina);
    await pagina.getByRole("button", { name: "Concluir recebimento" }).click();
    await pagina.getByTestId("protocolo").waitFor();
    await pagina.getByRole("link", { name: "Baixar PDF" }).waitFor();
    await medir(pagina);
    console.log("Fluxo e condicionais:", tipo);
    await pagina.close();
  }
  await persistencia();
  await concorrenciaEFoco();
} finally {
  await navegador.close();
}
