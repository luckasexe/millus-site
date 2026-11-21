# Millus — recebimento de equipamentos

A branch `app-manutencao` abre o recebimento na raiz, em React, TypeScript e Vite. O fluxo existente tem **dois momentos reais**, com subtelas curtas e campos na vertical.

## Executar

```sh
npm ci
npm run dev -- --port 5174 --strictPort
npm run typecheck
npm run build
npm run preview
```

## Fluxo

1. **Recebimento cliente** — sete subtelas: cliente/data, tipo de equipamento, marca/modelo, série, acessórios, relato breve e ciência/atendente. Nome/razão social, telefone brasileiro com DDD, problema relatado, atendente e ciência são necessários; funcionamento e tempo informados pelo cliente são opcionais. Não há questionário obrigatório de histórico nem teste de funcionamento. **Salvar recebimento** emite o protocolo local e abre **Recebido · inspeção pendente**, sem exigir inspeção com o cliente presente.
2. **Inspeção visual interna, depois** — **Iniciar inspeção** ou **Retomar inspeção** abre quatro ou cinco itens: carcaça/componentes; cabos/conectores; mangueiras/conexões (compressor/lavadora); oxidação/umidade/vazamentos; peças/acessórios. Para outros equipamentos, mangueiras não entram automaticamente; a categoria pode ser corrigida sem apagar registros anteriores. Cada item recebe um estado explícito: Sem alteração, Danificado ou alteração, Não observado, Não se aplica. A observação do funcionário é opcional e fica separada do relato do cliente. Este fluxo não inclui ligar/testar equipamentos, diagnosticar ou autorizar reparos.

O painel permite baixar PDF antes da inspeção, editar básicos, revisar, iniciar/retomar inspeção ou retomar depois. O status distingue **pendente**, **em andamento** e **concluída**. Recarregar o painel não inicia inspeção; recarregar durante uma edição recupera a subtela e os dados. **Retomar depois** durante a inspeção salva a posição e volta ao painel. Editar evidências/estado de uma inspeção concluída a coloca novamente em andamento. O protocolo e a data original permanecem estáveis.

## Fotos e revisão

Todas as subtelas do recebimento oferecem foto opcional no próprio contexto, em um painel expansível: **documentação do recebimento, não documentos pessoais**. Na inspeção, selecione primeiro o estado; câmera, galeria, miniaturas e remoção ficam junto ao item. Cada contexto aceita até **seis fotos**, em JPEG/PNG/WebP, de até **5 MB** cada. O arquivo precisa ser decodificável. Os controles de câmera/galeria só abrem mediante ação do usuário.

Fotos novas guardam Blob, `itemId`, título do contexto, origem, estado capturado e instante da captura. Ao alterar o estado de um item com fotos, o estado anterior não é reatribuído: um aviso explica a preservação, e a legenda/revisão/PDF mantêm a condição capturada. O PDF também mostra o estado atual quando diferente. Ao mudar categoria, respostas/fotos de itens que saíram do questionário continuam identificadas como registros anteriores; não viram respostas da nova inspeção.

A revisão é agrupada por contexto, omite campos opcionais vazios e pagina textos longos e fotos (duas por página de revisão). **Corrigir** retorna à subtela correspondente. Anexos sem associação antiga e respostas/complementos legados permanecem revisáveis, exportáveis e corrigíveis, sem inventar item ou estado. Com muitos anexos haverá mais páginas, não páginas por campo vazio.

## Persistência e comprovante

Um único registro ativo fica no **IndexedDB deste navegador/perfil/origem**, sem servidor, múltiplos atendimentos, sincronização ou backup automático. O modelo v3 migra v1/v2 sem trocar Blob, data, protocolo ou respostas/complementos existentes; versões futuras desconhecidas são recusadas sem sobrescrita. Um protocolo antigo não comprova inspeção concluída: a migração deixa a inspeção pendente, preservando o material anterior separadamente.

A leitura precede o autosave; gravações são serializadas e comparadas por revisão dentro da transação para impedir sobrescrita por outra aba. Aguarde **Salvo neste navegador** antes de fechar. Quota/falha de gravação não confirma recebimento nem navega para sucesso; a edição continua na aba para nova tentativa. Em conflito, recarregue para recuperar a versão persistida; alterações conflitantes ficam visíveis até a recarga.

O PDF A4 real é gerado no navegador com jsPDF sob demanda e usa logo/contatos existentes. Inclui data, atendente/ciência, origem dos relatos, status explícito, respostas preenchidas, anexos gerais e associados com item/estado/legenda e espaço de assinatura manual. Fotos e legendas são reservadas juntas na paginação. O documento atualizado mantém o protocolo. Não constitui diagnóstico, orçamento, autorização de reparo ou OS centralizada.

Baixar/visualizar funciona sem Web Share. Quando disponível, compartilhar abre a interface nativa por clique; não há envio automático. **Novo recebimento** pede confirmação antes de substituir o registro local. Limpar dados do site, usar navegação privada ou mudar aparelho/perfil pode apagar/tornar indisponível o recebimento. Evite aparelhos compartilhados.

## Testes e evidências

Runner nativo do Node com suporte a TypeScript (22.18+), Chromium/Playwright em cache e parser Python/PyMuPDF. Nenhuma dependência nova da aplicação foi adicionada.

```sh
export PLAYWRIGHT_BROWSERS_PATH=/opt/data/cache/scratch/pw-browsers
node --test tests/recebimento.test.mjs
PLAYWRIGHT_BROWSERS_PATH=/opt/data/cache/scratch/pw-browsers node tests/recebimento.e2e.mjs
PLAYWRIGHT_BROWSERS_PATH=/opt/data/cache/scratch/pw-browsers \
  MILLUS_PYTHON=/opt/data/cache/scratch/millus-pdf-venv/bin/python \
  MILLUS_EVIDENCIAS=/opt/data/cache/scratch/millus-evidencias \
  node tests/recebimento-pdf.e2e.mjs
node tests/alinhamento.e2e.mjs
node tests/campos-verticais.e2e.mjs
npm run build
```

`MILLUS_URL` troca a origem (padrão `http://localhost:5174`). Instale Chromium em outro ambiente com `npm exec --yes --package=@playwright/test -- playwright install chromium` e use o mesmo `PLAYWRIGHT_BROWSERS_PATH` nos testes.

A suíte principal inclui `fases.e2e.mjs`, `anexos.e2e.mjs` e `layout-v3.e2e.mjs`: recebimento sem inspeção, reload, retomada, correção, estados, fotos em cabos/mangueiras, mudança de categoria/estado sem perda, foto contextual do recebimento, decodificação, limites/remoção/cleanup, quota/retry, conflito entre abas e rolagem natural em viewport reduzida. O layout percorre cliente, inspeção com seis fotos por item e revisão em **360×640**, **390×844**, **1440×900**, verificando alinhamento vertical e ausência de scroll normal. Detalhes expandidos, textos extensos, teclado e zoom podem usar rolagem natural; não há ocultação de overflow.

O teste de PDF salva fixtures absolutas em scratch, antes/depois da inspeção, e parseia conteúdo, acentos, status, protocolo, fotos, legendas, dimensões A4, proporções, paginação, texto longo e ausência de sobreposição/legenda órfã. Também testa popup, fallback/cancelamento de Web Share simulado, confirmação e cleanup. Capturas e rasterizações ficam no diretório de evidências. Câmera física, compartilhamento real e Safari/iOS não são comprovados por Chromium emulado.
