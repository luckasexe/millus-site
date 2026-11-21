export function validarFoto(
  arquivo: { type: string; size: number },
  quantidade: number,
) {
  if (quantidade >= 6) return "O limite é de 6 fotos por recebimento.";
  if (!["image/jpeg", "image/png", "image/webp"].includes(arquivo.type))
    return "Use fotos JPEG, PNG ou WebP.";
  if (arquivo.size > 5 * 1024 * 1024) return "Cada foto deve ter até 5 MB.";
  if (!arquivo.size) return "O arquivo está vazio.";
  return "";
}
export function mascararTelefone(valor: string) {
  const digitos = valor.replace(/\D/g, "").slice(0, 11);
  if (digitos.length < 3) return digitos ? `(${digitos}` : "";
  const numero = digitos.slice(2);
  const corte = numero.length > 8 ? 5 : 4;
  return `(${digitos.slice(0, 2)}) ${numero.slice(0, corte)}${numero.length > corte ? "-" + numero.slice(corte) : ""}`;
}
export function validarRecebimento(dados: { nome: string; telefone: string }) {
  const erros: { nome?: string; telefone?: string } = {};
  if (!/^\p{L}[\p{L}'’.-]*(?:\s+[\p{L}'’.-]+)+$/u.test(dados.nome.trim()))
    erros.nome = "Informe nome e sobrenome.";
  const numero = dados.telefone.replace(/\D/g, "");
  const ddds =
    "11 12 13 14 15 16 17 18 19 21 22 24 27 28 31 32 33 34 35 37 38 41 42 43 44 45 46 47 48 49 51 53 54 55 61 62 63 64 65 66 67 68 69 71 73 74 75 77 79 81 82 83 84 85 86 87 88 89 91 92 93 94 95 96 97 98 99".split(
      " ",
    );
  if (
    !ddds.includes(numero.slice(0, 2)) ||
    !/^(?:\d{2}[2-5]\d{7}|\d{2}9\d{8})$/.test(numero) ||
    /^(\d)\1+$/.test(numero)
  )
    erros.telefone = "Informe um telefone brasileiro válido com DDD.";
  return erros;
}
