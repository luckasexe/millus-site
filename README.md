# Millus — recebimento de equipamentos

Esta branch `app-manutencao` apresenta **somente a Etapa 1 de 6** do atendimento. React 19, TypeScript e Vite, sem backend, autenticação, analytics ou serviços externos. O legado institucional em `src/features/inicio/` e todos os assets foram preservados; `App.tsx` compõe a nova página na raiz apenas nesta branch.

## Executar e revisar

```sh
npm ci
npm run dev -- --host 0.0.0.0 --port 5174 --strictPort
```

Abra `http://localhost:5174`. Para verificar a aplicação TypeScript e gerar o bundle:

```sh
npm run typecheck
npm run build
npm run preview
```

## Escopo e limites

- Nome completo e telefone brasileiro com DDD são os únicos obrigatórios. A máscara adapta telefone fixo e celular; validação de formato não comprova existência ou conta WhatsApp.
- Responsável pela entrega, tipo, marca, modelo e série são opcionais. Acessórios permitem seleção múltipla e texto livre em “Outros acessórios”.
- Fotos opcionais pela câmera **somente após ação** ou pela galeria: no máximo 6, até 5 MB cada, JPEG/PNG/WebP. Arquivos são decodificados antes de aceitar, exibidos em miniaturas e podem ser removidos. Object URLs são revogadas ao remover/desmontar. O seletor da câmera depende do aparelho/navegador; desktop pode abrir o seletor normal de arquivos. Não há upload nem acesso automático à câmera.
- Data/hora nasce com o rascunho e não muda em edições, retorno ou reload.
- A Etapa 1 contém cinco subtelas: **Cliente → Equipamento (tipo/marca) → Identificação (modelo/série) → Acessórios → Fotos**. “Voltar” preserva os dados; “Continuar” valida nome/telefone na subtela Cliente e foca o primeiro erro. O indicador principal continua Etapa 1 de 6; o secundário informa a tela atual. Reload reabre Cliente (ou a confirmação já salva), preservando os dados, fotos e data, não a posição da navegação.
- “Salvar e continuar”, somente em Fotos, aguarda a transação local. Depois mostra **confirmação e resumo locais paginados em seis páginas**, com “Voltar a editar”. Não existe Etapa 2 fictícia; próximas etapas ainda não disponíveis.
- O layout normal cabe em 360×640, 390×844 e 1440×900, incluindo erros obrigatórios inline e seis miniaturas. A barra fica no fluxo, ao pé do viewport, sem cobrir campos. Controles têm ao menos 44px. O aviso local tem detalhes expansíveis acessíveis. Zoom, teclado virtual, detalhes expandidos, mensagens excepcionais ou textos extensos podem exigir rolagem natural: ela não é bloqueada nem o conteúdo cortado. Teclado físico/foco e viewport reduzido são testados em Chromium; teclado virtual real e zoom nativo em aparelhos não foram testados.

### Persistência local não é cadastro no servidor

Há **um único rascunho por navegador/origem**, incluindo fotos Blob, armazenado no IndexedDB `millus-recebimento`. Alterações são salvas automaticamente em fila, com estado visível; aguarde **“Salvo neste navegador” antes de fechar ou recarregar**. Texto, acessórios, fotos, data e estado de confirmação são recuperados. Não existe histórico de ordens ou cadastro de múltiplos atendimentos nesta etapa.

Dados **não são enviados à Millus e não são compartilhados entre aparelhos**, perfis, navegadores ou domínios. Limpar dados do site, navegação privada, políticas de retenção do navegador ou falta de espaço podem removê-los/impedir gravação. Não há criptografia adicional, backup, sincronização, garantia de retenção ou bloqueio entre abas: use somente uma aba por vez. Evite dados pessoais em aparelhos compartilhados. Para apagar este rascunho, remova os dados locais deste site nas configurações do navegador.

Erros de acesso/gravação/quota são informados sem apresentar sucesso falso; o formulário permanece em memória para tentar novamente pelo botão de salvar. Um reload durante falha pode perder alterações não gravadas.

## Organização

`src/features/recebimento/` mantém responsabilidades concretas:

- `recebimento.page.tsx`: composição da tela.
- `recebimento.hook.ts`: hidratação, estado, validação/foco e fila de salvamento.
- `recebimento.regras.ts`: máscara e validações puras de cliente/fotos.
- `recebimento.service.ts`: contrato do rascunho e transações IndexedDB.
- `components/estrutura.tsx`: shell, progresso, seção, campo e barra inferior.
- `components/dados.tsx`, `fotos.tsx`, `resumo.tsx`: formulários específicos, seleção/miniaturas e confirmação.
- `recebimento.css`: apresentação mobile-first amarelo/grafite, superfície clara e controles com altura mínima de 44px.

Não foram adicionadas dependências ao projeto. Nomes próprios permanecem em português; APIs nativas e contratos React preservam sua nomenclatura.

## Testes

Regras puras usam o runner nativo do Node com suporte à remoção de tipos TypeScript (Node 22.18+; execução validada em Node 26):

```sh
node --test tests/recebimento.test.mjs
```

Os E2E usam Chromium real em contextos descartáveis e **somente fixtures sintéticas**, sem ler perfil real. Playwright é obtido no cache do npm, sem modificar `package.json`/lockfile:

```sh
npm exec --yes --package=@playwright/test -- playwright --version
PLAYWRIGHT_BROWSERS_PATH="$TMPDIR/millus-playwright" npm exec --yes --package=@playwright/test -- playwright install chromium
# Mantenha o Vite na porta 5174 em outro terminal.
PLAYWRIGHT_BROWSERS_PATH="$TMPDIR/millus-playwright" node --test tests/recebimento.e2e.mjs
```

Opcional: `URL_TESTE=http://localhost:5174` define outra origem. Neste ambiente, execute `PLAYWRIGHT_BROWSERS_PATH=/opt/data/cache/scratch/pw-browsers node --test tests/recebimento.e2e.mjs` usando o Chromium já instalado.

Cobertura: navegação entre subtelas, erros inline/foco, máscara, campos opcionais, resumo paginado/voltar, reload de texto/acessórios/data/foto Blob, remoção persistida, tipo/tamanho/quantidade/decodificação de fotos, revogação de URLs, ausência de câmera automática, quota com tentativa posterior, áreas de toque, medidas reais de scrollHeight/clientHeight e scrollWidth, CTA dentro do viewport em cada subtela e página do resumo nos três tamanhos, incluindo seis fotos. A captura física da câmera e Safari/iOS não foram testados; a semântica do seletor `capture="environment"` foi verificada em Chromium.

### Evidência TDD desta implementação

A subdivisão navegável teve RED observado: ausência do botão “Continuar” (timeout de 7s). Após implementar o fluxo, a medição com seis fotos revelou documento de 728px no viewport de 640px; miniaturas compactas com remoção de 44×44px corrigiram o excesso sem bloquear rolagem. A suíte verifica todas as subtelas e as seis páginas de resumo.

Fatias executadas RED → GREEN: regras obrigatórias/máscara (funções ausentes); fluxo de recebimento/resumo/reload (tela ausente); regras de fotos (validador ausente); galeria/miniatura (controle ausente). A inspeção visual encontrou colisão com a classe legada `titulo-secao`; um teste reproduziu `text-transform: uppercase` indesejado, e o isolamento para `titulo-secao-recebimento` tornou-o verde. A suíte final também exercita erros de quota e limites sem armazenar dados reais.

Nenhum commit, push ou deploy faz parte desta entrega. A publicação deve ser revisada pelo responsável na branch de manutenção, sem alterar produção `main`.
