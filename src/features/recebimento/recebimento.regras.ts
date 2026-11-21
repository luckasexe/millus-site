export function validarFoto(
  arquivo: { type: string; size: number },
  quantidade: number,
) {
  if (quantidade >= 6) return "O limite é de 6 fotos por item.";
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
  if (!/\p{L}/u.test(dados.nome.trim()))
    erros.nome = "Informe o nome completo ou a razão social.";
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

export const categorias = [
  { id: "compressor", nome: "Compressor de ar" },
  { id: "lavadora", nome: "Lavadora de alta pressão" },
  { id: "outros", nome: "Outros" },
] as const;

export function categoriaAtual(tipo: string) {
  const normalizado = tipo.trim().toLowerCase();
  if (!normalizado) return "";
  return categorias.find(({ id }) => normalizado === id || normalizado.startsWith(`${id} `))?.id ?? "outros";
}

export function legadoTipo(tipo: string) {
  return categorias.some(categoria => categoria.id === tipo || categoria.nome === tipo) ? "" : tipo;
}

export function formatarData(data: string) {
  return new Date(data).toLocaleString("pt-BR");
}

const ternarias = ["Sim", "Não", "Não sabe"];
const visuais = ["Sem alteração visível", "Alteração visível", "Não observado", "Não se aplica"];

export type Pergunta = {
  id: string;
  titulo: string;
  etapa: 3 | 4 | 5;
  descricao?: string;
} & (
  | { formato: "texto"; opcoes?: never; complemento?: never }
  | { formato: "selecao"; opcoes: readonly string[]; complemento?: boolean }
);

const relato: Pergunta[] = [
  { id: "ocorrencia", titulo: "O que acontece?", etapa: 3, formato: "texto" },
  { id: "tempo", titulo: "Há quanto tempo?", etapa: 3, formato: "texto" },
  { id: "frequencia", titulo: "Frequência informada", etapa: 3, formato: "selecao", opcoes: ["Constante", "Intermitente", "Não sabe"] },
  { id: "liga", titulo: "Funcionamento informado", etapa: 3, formato: "selecao", opcoes: ["Liga", "Funciona parcialmente", "Não liga", "Não sabe"] },
  { id: "condicoes", titulo: "Condições e recorrência", etapa: 3, formato: "texto" },
];

const perguntasCategoria: Record<typeof categorias[number]["id"], [string, string, string][]> = {
  compressor: [
    ["pressao", "Pressão no reservatório", "O cliente relata dificuldade para atingir ou manter a pressão?"],
    ["vazamento", "Vazamento de ar informado", "O cliente percebeu escape de ar durante o uso anterior?"],
    ["ruido", "Ruído informado no compressor", "O cliente percebeu ruído fora do habitual?"],
    ["desligamento", "Desligamento do compressor", "O cliente relata que o compressor para inesperadamente?"],
    ["aquecimento", "Superaquecimento informado no compressor", "O cliente relata aquecimento fora do habitual?"],
  ],
  lavadora: [
    ["pressao", "Perda de pressão no jato", "O cliente percebeu pressão baixa ou oscilante no jato?"],
    ["vazamento", "Vazamento de água informado", "O cliente percebeu água saindo por um ponto inesperado?"],
    ["ruido", "Ruído informado na lavadora", "O cliente percebeu ruído fora do habitual?"],
    ["desligamento", "Desligamento da lavadora", "O cliente relata que a lavadora para inesperadamente?"],
    ["aquecimento", "Superaquecimento informado na lavadora", "O cliente relata aquecimento fora do habitual?"],
    ["semAgua", "Uso sem água", "O cliente relata uso sem fornecimento de água em algum momento?"],
  ],
  outros: [
    ["ruido", "Ruído informado", "O cliente percebeu ruído fora do habitual?"],
    ["vazamento", "Vazamento informado", "O cliente percebeu algum vazamento?"],
    ["pressao", "Variação de pressão informada", "Se o equipamento trabalha com pressão, o cliente percebeu alguma variação?"],
    ["desligamento", "Desligamento informado", "O cliente relata desligamento inesperado?"],
    ["aquecimento", "Superaquecimento informado", "O cliente relata aquecimento fora do habitual?"],
  ],
};

const historico = [
  "Quedas ou impactos", "Exposição à chuva", "Contato com água", "Exposição à umidade",
  "Sobrecarga", "Uso prolongado", "Cheiro ou sinal de queimado", "Superaquecimento anterior",
  "Reparos anteriores", "Manutenções anteriores", "Trocas de peças",
].map((titulo, indice): Pergunta => ({
  id: `historico-${indice}`, titulo, etapa: 4, formato: "selecao", opcoes: ternarias, complemento: true,
}));

const inspecao = [
  "Condição da carcaça", "Condição dos componentes", "Condição dos cabos", "Condição dos conectores",
  "Condição das mangueiras", "Sinais de oxidação", "Sinais de umidade", "Vazamentos visíveis",
  "Peças danificadas ou ausentes", "Condição dos acessórios",
].map((titulo, indice): Pergunta => ({
  id: `visual-${indice}`, titulo, etapa: 5, formato: "selecao", opcoes: visuais, complemento: true,
}));

function perguntasLegadas(tipo: string): Pergunta[] {
  const categoria = categoriaAtual(tipo);
  const especificas = categoria ? perguntasCategoria[categoria] : [];
  return [
    ...relato,
    ...especificas.map(([id, titulo, descricao]): Pergunta => ({
      id: `${categoria}-${id}`, titulo, descricao, etapa: 3, formato: "selecao", opcoes: categoria === "outros" ? [...ternarias, "Não se aplica"] : ternarias, complemento: true,
    })),
    ...historico,
    ...inspecao,
    { id: "observacoes", titulo: "Observações da inspeção", etapa: 5, formato: "texto" },
  ];
}

export function perguntasRecebimento(tipo: string): Pergunta[] {
  const itens = [
    ["carcaca", "Carcaça e componentes"],
    ["cabos", "Condição dos cabos e conectores"],
    ...(categoriaAtual(tipo) !== "outros" ? [["mangueiras", "Mangueiras e conexões"]] : []),
    ["sinais", "Oxidação, umidade e vazamentos"],
    ["pecas", "Peças e acessórios"],
  ];
  return [
    { id: "ocorrencia", titulo: "Relato do cliente", etapa: 3, formato: "texto" },
    ...itens.map(([id, titulo]): Pergunta => ({
      id: `visual-${id}`, titulo, etapa: 5, formato: "selecao", complemento: true,
      opcoes: ["Sem alteração", "Danificado ou alteração", "Não observado", "Não se aplica"],
    })),
  ];
}

export function linhasLegadas(dados: Registro) {
  const atuais = new Set([...perguntasRecebimento(dados.tipo).map(item => item.id), ...(categoriaAtual(dados.tipo) === "outros" ? ["tipoDetalhe"] : []), "tempo", "liga"]);
  const configuradas = categorias.flatMap(categoria => perguntasLegadas(categoria.id));
  return [...new Set([...Object.keys(dados.respostas), ...Object.keys(dados.complementos)])]
    .filter(id => !atuais.has(id) && !!(dados.respostas[id] || dados.complementos[id])).map(id => ({
    id, etapa: id.startsWith("visual-") || id === "observacoes" ? 5 : 4,
    tela: "legado", rotulo: `Legado · ${configuradas.find(item => item.id === id)?.titulo ?? id}`,
    valor: [dados.respostas[id], dados.complementos[id]].filter(Boolean).join(" · "),
  }));
}

type Registro = import("./recebimento.service").RascunhoRecebimento;

export const titulosEtapa = ["Cliente e entrega", "Equipamento", "Relato do cliente", "Histórico informado", "Inspeção visual"];

export function linhasRecebimento(dados: Registro) {
  const categoria = categorias.find(item => item.id === categoriaAtual(dados.tipo));
  return [
    { etapa: 1, tela: "cliente", rotulo: "Cliente", valor: dados.nome },
    { etapa: 1, tela: "cliente", rotulo: "Telefone / WhatsApp", valor: dados.telefone },
    { etapa: 1, tela: "cliente", rotulo: "Recebido em", valor: formatarData(dados.recebidoEm) },
    { etapa: 1, tela: "ciencia", rotulo: "Atendente do recebimento", valor: dados.atendente },
    { etapa: 1, tela: "ciencia", rotulo: "Ciência do cliente", valor: dados.ciencia ? "Confirmada pelo atendente" : "Não registrada" },
    { etapa: 2, tela: "tipo", rotulo: "Tipo de equipamento", valor: categoria?.nome },
    ...(categoria && categoria.id !== "outros" && legadoTipo(dados.tipo) ? [
      { etapa: 2, tela: "tipo", rotulo: "Descrição do equipamento no rascunho original", valor: dados.tipo },
    ] : []),
    ...(categoria?.id === "outros" ? [
      { etapa: 2, tela: "serie", rotulo: "Qual equipamento?", valor: dados.respostas.tipoDetalhe ?? legadoTipo(dados.tipo) },
    ] : []),
    { etapa: 2, tela: "marca", rotulo: "Marca", valor: dados.marca },
    { etapa: 2, tela: "marca", rotulo: "Modelo", valor: dados.modelo },
    { etapa: 2, tela: "serie", rotulo: "Número de série", valor: dados.serie },
    { etapa: 2, tela: "acessorios", rotulo: "Acessórios", valor: dados.acessorios.join(", ") },
    { etapa: 2, tela: "acessorios", rotulo: "Outros acessórios", valor: dados.outros },
    { etapa: 3, tela: "ocorrencia", rotulo: "Tempo informado pelo cliente", valor: dados.respostas.tempo },
    { etapa: 3, tela: "ocorrencia", rotulo: "Funcionamento informado pelo cliente (não testado)", valor: dados.respostas.liga },
    { etapa: 5, tela: "painel", rotulo: "Status da inspeção visual", valor: dados.inspecao },
    ...linhasLegadas(dados),
    ...perguntasRecebimento(dados.tipo).flatMap(({ id, etapa, titulo }) => [
      { etapa, tela: id, rotulo: titulo, valor: dados.respostas[id] },
      ...(dados.complementos[id] ? [{ etapa, tela: id, rotulo: `Complemento · ${titulo}`, valor: dados.complementos[id] }] : []),
    ]),
  ];
}

export function paginasRevisao(dados: Registro) {
  type Pagina = { id: string; etapa: number; tela: string; rotulo: string; valor?: string; parte?: string;
    fotos?: Registro["fotos"]; linhas?: { rotulo: string; valor: string; tela: string }[] };
  const paginas: Pagina[] = [];
  const grupos = new Map<string, ReturnType<typeof linhasRecebimento>>();
  for (const linha of linhasRecebimento(dados).filter(item => !!item.valor)) {
    const grupo = grupos.get(linha.tela) ?? [];
    grupo.push(linha); grupos.set(linha.tela, grupo);
  }
  for (const [tela, linhas] of grupos) {
    let bloco: NonNullable<Pagina["linhas"]> = [];
    let tamanho = 0;
    function adicionar() {
      if (!bloco.length) return;
      paginas.push({ id: `revisao-${tela}-${paginas.length}`, etapa: linhas[0].etapa, tela,
        rotulo: tela === "legado" ? "Registro anterior preservado" : titulosEtapa[linhas[0].etapa - 1], linhas: bloco });
      bloco = []; tamanho = 0;
    }
    for (const linha of linhas) {
      // Limita texto e quebras explícitas, com continuação sem truncar informação.
      const trechos = (linha.valor ?? "").match(/[^\n]{1,100}|\n/g) ?? [];
      for (let posicao = 0; posicao < trechos.length; posicao += 2) {
        const valor = trechos.slice(posicao, posicao + 2).join("");
        if (bloco.length >= 3 || tamanho + valor.length > 200) adicionar();
        bloco.push({ rotulo: linha.rotulo + (posicao ? " (continuação)" : ""), valor, tela: linha.tela });
        tamanho += valor.length;
      }
    }
    adicionar();
  }
  for (const [rotulo, fotos] of [["Documentação de recebimento · cliente", dados.fotos], ["Evidências visuais · funcionário", dados.fotosInspecao]] as const) {
    for (let posicao = 0; posicao < fotos.length; posicao += 2) {
      paginas.push({ id: `revisao-fotos-${paginas.length}`, etapa: rotulo.startsWith("Documentação") ? 2 : 5,
        tela: "anexos", rotulo, fotos: fotos.slice(posicao, posicao + 2) });
    }
  }
  return paginas;
}
