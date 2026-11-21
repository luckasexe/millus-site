import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { globSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
const cache = execFileSync("npm", ["config", "get", "cache"], {
  encoding: "utf8",
}).trim();
const pacote = globSync(
  join(cache, "_npx/*/node_modules/@playwright/test/package.json"),
)[0];
assert.ok(
  pacote,
  "Execute npm exec --yes --package=@playwright/test -- playwright --version antes dos E2E.",
);
const { chromium } = createRequire(pacote)("playwright");
const endereco = process.env.URL_TESTE || "http://localhost:5174";
const foto = {
  name: "fixture.png",
  mimeType: "image/png",
  buffer: Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR4nGP4f4cBAAS5AdyMB9X0AAAAAElFTkSuQmCC",
    "base64",
  ),
};
async function executar(cenario, configuracao = {}) {
  const navegador = await chromium.launch({
    headless: true,
    args: ["--no-sandbox"],
  });
  try {
    const contexto = await navegador.newContext({
      viewport: { width: 390, height: 844 },
      ...configuracao,
    });
    const pagina = await contexto.newPage();
    pagina.setDefaultTimeout(7000);
    await cenario(pagina, contexto);
    await contexto.close();
  } finally {
    await navegador.close();
  }
}
async function abrir(pagina) {
  await pagina.goto(endereco);
  await pagina.getByLabel("Nome completo").waitFor();
}
async function preencher(pagina) {
  await pagina.getByLabel("Nome completo").fill("Pessoa Fixture");
  await pagina.getByLabel("Telefone / WhatsApp").fill("11987654321");
}
async function aguardarFoto(pagina) {
  await pagina.getByRole("img", { name: "Foto: fixture.png" }).waitFor();
  await pagina.waitForFunction(() => {
    const imagem = document.querySelector(".miniatura-foto img");
    return imagem?.complete && imagem.naturalWidth > 0;
  });
}

test("valida inline, máscara BR, resumo e recuperação completa com foto Blob", () =>
  executar(async (pagina) => {
    await abrir(pagina);
    await pagina
      .getByRole("button", { name: "Salvar e continuar", exact: true })
      .click();
    await pagina.waitForFunction(() => document.activeElement?.id === "nome");
    await pagina
      .getByText("Informe nome e sobrenome.", { exact: true })
      .waitFor();
    await preencher(pagina);
    assert.equal(
      await pagina.getByLabel("Telefone / WhatsApp").inputValue(),
      "(11) 98765-4321",
    );
    await pagina.getByLabel("Responsável pela entrega").fill("Entrega Fixture");
    await pagina.getByLabel("Marca").fill("Marca fixture");
    await pagina.getByLabel("Cabo de energia", { exact: true }).check();
    await pagina.getByLabel("Bateria", { exact: true }).check();
    await pagina.getByLabel("Outros acessórios").fill("Adaptador fixture");
    const data = await pagina.locator("time").getAttribute("datetime");
    await pagina.getByLabel("Selecionar fotos da galeria").setInputFiles(foto);
    await aguardarFoto(pagina);
    await pagina
      .getByRole("button", { name: "Salvar e continuar", exact: true })
      .click();
    await pagina
      .getByRole("heading", { name: "Recebimento salvo neste navegador" })
      .waitFor();
    await pagina.reload();
    await pagina
      .getByRole("heading", { name: "Recebimento salvo neste navegador" })
      .waitFor();
    await aguardarFoto(pagina);
    await pagina.getByRole("button", { name: "Voltar a editar" }).click();
    await pagina
      .getByRole("status")
      .filter({ hasText: "Salvo neste navegador" })
      .waitFor();
    await pagina.reload();
    await pagina.getByLabel("Nome completo").waitFor();
    await aguardarFoto(pagina);
    assert.equal(
      await pagina.getByLabel("Nome completo").inputValue(),
      "Pessoa Fixture",
    );
    assert.equal(
      await pagina.getByLabel("Responsável pela entrega").inputValue(),
      "Entrega Fixture",
    );
    assert.equal(
      await pagina.getByLabel("Marca").inputValue(),
      "Marca fixture",
    );
    assert.equal(
      await pagina.getByLabel("Cabo de energia", { exact: true }).isChecked(),
      true,
    );
    assert.equal(
      await pagina.getByLabel("Bateria", { exact: true }).isChecked(),
      true,
    );
    assert.equal(
      await pagina.getByLabel("Outros acessórios").inputValue(),
      "Adaptador fixture",
    );
    assert.equal(await pagina.locator("time").getAttribute("datetime"), data);
    await pagina
      .getByRole("button", { name: "Remover foto fixture.png" })
      .click();
    await pagina
      .getByRole("status")
      .filter({ hasText: "Salvo neste navegador" })
      .waitFor();
    await pagina.reload();
    await pagina.getByLabel("Nome completo").waitFor();
    assert.equal(await pagina.locator(".miniatura-foto").count(), 0);
  }));
test("campos de equipamento e fotos não são obrigatórios", () =>
  executar(async (pagina) => {
    await abrir(pagina);
    await preencher(pagina);
    await pagina
      .getByRole("button", { name: "Salvar e continuar", exact: true })
      .click();
    await pagina
      .getByRole("heading", { name: "Recebimento salvo neste navegador" })
      .waitFor();
    await pagina
      .getByText(
        "Etapa 1 concluída localmente. As próximas etapas ainda não estão disponíveis.",
        { exact: true },
      )
      .waitFor();
  }));
test("rejeita tipo incorreto, arquivo corrompido, excesso de tamanho e quantidade; câmera só por ação", () =>
  executar(async (pagina, contexto) => {
    await contexto.addInitScript(() => {
      window.pedidosCamera = 0;
      navigator.mediaDevices.getUserMedia = () => {
        window.pedidosCamera++;
        throw Error("Não deve iniciar câmera");
      };
      window.urlsCriadas = [];
      window.urlsRevogadas = [];
      const criar = URL.createObjectURL.bind(URL);
      const revogar = URL.revokeObjectURL.bind(URL);
      URL.createObjectURL = (arquivo) => {
        const url = criar(arquivo);
        window.urlsCriadas.push(url);
        return url;
      };
      URL.revokeObjectURL = (url) => {
        window.urlsRevogadas.push(url);
        revogar(url);
      };
    });
    await abrir(pagina);
    assert.equal(await pagina.evaluate(() => window.pedidosCamera), 0);
    assert.equal(
      await pagina.getByLabel("Tirar foto com câmera").getAttribute("capture"),
      "environment",
    );
    const entrada = pagina.getByLabel("Selecionar fotos da galeria");
    await entrada.setInputFiles({
      name: "fixture.txt",
      mimeType: "text/plain",
      buffer: Buffer.from("fixture"),
    });
    await pagina.getByRole("alert").filter({ hasText: "JPEG" }).waitFor();
    await entrada.setInputFiles({
      name: "corrompida.png",
      mimeType: "image/png",
      buffer: Buffer.from("fixture"),
    });
    await pagina
      .getByRole("alert")
      .filter({ hasText: "não pôde ser lida" })
      .waitFor();
    await entrada.setInputFiles({
      name: "grande.png",
      mimeType: "image/png",
      buffer: Buffer.alloc(5 * 1024 * 1024 + 1),
    });
    await pagina.getByRole("alert").filter({ hasText: "5 MB" }).waitFor();
    await entrada.setInputFiles(
      Array.from({ length: 7 }, (_, indice) => ({
        ...foto,
        name: `fixture-${indice}.png`,
      })),
    );
    await pagina.getByRole("alert").filter({ hasText: "6 fotos" }).waitFor();
    assert.equal(await pagina.locator(".miniatura-foto").count(), 6);
    await pagina
      .getByRole("button", { name: "Remover foto fixture-0.png" })
      .click();
    await pagina.waitForFunction(() => window.urlsRevogadas.length > 0);
    assert.equal(await pagina.locator(".miniatura-foto").count(), 5);
  }));
test("falha de quota não mostra sucesso e permite tentar novamente sem perder texto", () =>
  executar(async (pagina, contexto) => {
    await contexto.addInitScript(() => {
      window.falharGravacao = true;
      const gravar = IDBObjectStore.prototype.put;
      IDBObjectStore.prototype.put = function (...argumentos) {
        if (window.falharGravacao)
          throw new DOMException("Fixture de quota", "QuotaExceededError");
        return gravar.apply(this, argumentos);
      };
    });
    await abrir(pagina);
    await preencher(pagina);
    await pagina
      .getByRole("button", { name: "Salvar e continuar", exact: true })
      .click();
    await pagina
      .getByRole("alert")
      .filter({ hasText: "Espaço insuficiente" })
      .waitFor();
    assert.equal(
      await pagina
        .getByRole("heading", { name: "Recebimento salvo neste navegador" })
        .count(),
      0,
    );
    assert.equal(
      await pagina.getByLabel("Nome completo").inputValue(),
      "Pessoa Fixture",
    );
    await pagina.evaluate(() => (window.falharGravacao = false));
    await pagina
      .getByRole("button", { name: "Salvar e continuar", exact: true })
      .click();
    await pagina
      .getByRole("heading", { name: "Recebimento salvo neste navegador" })
      .waitFor();
  }));
test("mobile baixo, mobile e desktop sem overflow, toques >=44px e final acima da barra", () =>
  executar(async (pagina) => {
    await abrir(pagina);
    const estiloTitulo = await pagina
      .locator(".secao-recebimento h2")
      .first()
      .evaluate((elemento) => {
        const estilo = getComputedStyle(elemento);
        return {
          espaco: estilo.letterSpacing,
          transformacao: estilo.textTransform,
        };
      });
    assert.equal(estiloTitulo.transformacao, "none");
    assert.ok(["normal", "-0.34px", "0px"].includes(estiloTitulo.espaco));
    for (const [width, height] of [
      [360, 640],
      [390, 844],
      [1440, 1000],
    ]) {
      await pagina.setViewportSize({ width, height });
      assert.equal(
        await pagina.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        true,
      );
      const alturas = await pagina
        .locator(
          ".campo-recebimento input, .acoes-fotos button, .opcoes-acessorios label, .barra-recebimento button",
        )
        .evaluateAll((elementos) =>
          elementos.map((elemento) => elemento.getBoundingClientRect().height),
        );
      assert.ok(alturas.every((altura) => altura >= 44));
      await pagina.evaluate(() =>
        window.scrollTo(0, document.body.scrollHeight),
      );
      assert.ok(
        await pagina.evaluate(
          () =>
            document.querySelector(".data-recebimento").getBoundingClientRect()
              .bottom <=
            document.querySelector(".barra-recebimento").getBoundingClientRect()
              .top,
        ),
      );
      if (process.env.CAPTURAS_TESTE) {
        mkdirSync(process.env.CAPTURAS_TESTE, { recursive: true });
        await pagina.screenshot({
          path: join(process.env.CAPTURAS_TESTE, `recebimento-${width}.png`),
          fullPage: true,
        });
      }
    }
  }));
