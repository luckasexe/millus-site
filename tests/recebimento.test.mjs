import { test } from "node:test";
import assert from "node:assert/strict";
const regras =
  await import("../src/features/recebimento/recebimento.regras.ts").catch(
    () => ({}),
  );
test("nome completo e telefone são os únicos campos obrigatórios", () => {
  assert.equal(typeof regras.validarRecebimento, "function");
  assert.deepEqual(
    regras.validarRecebimento({
      nome: "Pessoa Teste",
      telefone: "(11) 98765-4321",
    }),
    {},
  );
  assert.deepEqual(
    Object.keys(regras.validarRecebimento({ nome: "Pessoa", telefone: "111" })),
    ["nome", "telefone"],
  );
});
test("fotos aceitam JPEG PNG WebP até 5 MB e seis arquivos", () => {
  assert.equal(typeof regras.validarFoto, "function");
  assert.equal(regras.validarFoto({ type: "image/png", size: 1024 }, 0), "");
  assert.match(regras.validarFoto({ type: "text/plain", size: 10 }, 0), /JPEG/);
  assert.match(
    regras.validarFoto({ type: "image/jpeg", size: 5 * 1024 * 1024 + 1 }, 0),
    /5 MB/,
  );
  assert.match(
    regras.validarFoto({ type: "image/png", size: 10 }, 6),
    /6 fotos/,
  );
});
test("máscara brasileira adapta fixo e celular sem aceitar número repetido ou DDD inválido", () => {
  assert.equal(regras.mascararTelefone("11987654321"), "(11) 98765-4321");
  assert.equal(regras.mascararTelefone("1132345678"), "(11) 3234-5678");
  for (const telefone of ["00987654321", "11111111111", "11812345678"])
    assert.ok(
      regras.validarRecebimento({ nome: "Pessoa Teste", telefone }).telefone,
    );
});
