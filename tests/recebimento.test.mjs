import { test } from "node:test";
import assert from "node:assert/strict";
import { perguntasRecebimento, mascararTelefone, validarRecebimento } from "../src/features/recebimento/recebimento.regras.ts";

test("aceita razão social de uma palavra e formata o telefone brasileiro", () => {
  const telefone = mascararTelefone("13982071346");
  assert.equal(telefone, "(13) 98207-1346");
  assert.deepEqual(validarRecebimento({ nome: "Millus", telefone }), {});
  assert.ok(validarRecebimento({ nome: "", telefone: "123" }).nome);
  assert.ok(validarRecebimento({ nome: "Millus", telefone: "123" }).telefone);
});

test("hidrata rascunho v1 sem alterar Blob, data ou campos legados e rejeita versões futuras", async () => {
  const { migrarRascunho } = await import("../src/features/recebimento/recebimento.service.ts");
  const arquivo = new Blob(["foto"], { type: "image/png" });
  const recebidoEm = "2025-03-20T12:23:00.000Z";
  const salvo = migrarRascunho({
    confirmado: true, recebidoEm, tipo: "Compressor Schulz de pistão",
    fotos: [{ id: "legado", nome: "legado.png", arquivo }],
  });
  assert.equal(salvo.versao, 2);
  assert.equal(salvo.tela, "cliente");
  assert.equal(salvo.recebidoEm, recebidoEm);
  assert.equal(salvo.fotos[0].arquivo, arquivo);
  assert.deepEqual(salvo.fotosInspecao, []);
  assert.equal(salvo.tipo, "Compressor Schulz de pistão");
  assert.equal(salvo.protocolo, "");
  assert.throws(() => migrarRascunho({ versao: 9 }), /Versão/);
});

test("limita fotos por formato, tamanho, quantidade e conteúdo vazio", async () => {
  const { validarFoto } = await import("../src/features/recebimento/recebimento.regras.ts");
  for (const type of ["image/jpeg", "image/png", "image/webp"]) {
    assert.equal(validarFoto({ type, size: 5 * 1024 * 1024 }, 5), "");
  }
  assert.match(validarFoto({ type: "text/plain", size: 10 }, 0), /JPEG/);
  assert.match(validarFoto({ type: "image/jpeg", size: 5 * 1024 * 1024 + 1 }, 0), /5 MB/);
  assert.match(validarFoto({ type: "image/png", size: 10 }, 6), /6 fotos/);
  assert.match(validarFoto({ type: "image/png", size: 0 }, 0), /vazio/);
});

test("configuração discrimina texto e seleção nas três categorias", () => {
  for (const categoria of ["compressor", "lavadora", "outros"]) {
    const perguntas = perguntasRecebimento(categoria);
    assert.equal(perguntas.find(pergunta => pergunta.id === "ocorrencia").formato, "texto");
    for (const pergunta of perguntas) {
      if (pergunta.formato === "texto") assert.equal(pergunta.opcoes, undefined);
      else {
        assert.equal(pergunta.formato, "selecao");
        assert.ok(pergunta.opcoes.length >= 3);
      }
    }
  }
});

test("máscara aceita fixo e valida DDD e números repetidos", () => {
  assert.equal(mascararTelefone("1132345678"), "(11) 3234-5678");
  for (const telefone of ["00987654321", "11111111111", "11812345678"]) {
    assert.ok(validarRecebimento({ nome: "Pessoa Teste", telefone }).telefone);
  }
});
