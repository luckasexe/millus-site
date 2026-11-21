# Millus — recebimento de equipamentos

A branch `app-manutencao` abre o recebimento de equipamentos na raiz, em React, TypeScript e Vite.

## Executar

```sh
npm ci
npm run dev -- --port 5174 --strictPort
```

Abra `http://localhost:5174`. Para verificar e construir o bundle:

```sh
npm run typecheck
npm run build
npm run preview
```

## Fluxo

1. **Cliente e entrega** — nome completo ou razão social e telefone brasileiro com DDD são obrigatórios. Registre quem entregou o equipamento. A data e a hora são definidas no início do rascunho.
2. **Equipamento** — escolha compressor de ar, lavadora de alta pressão ou outros. Registre identificação, acessórios e fotos fornecidas pelo cliente.
3. **Relato do cliente** — documente o que foi informado e os sintomas específicos da categoria escolhida.
4. **Histórico informado** — registre Sim, Não ou Não sabe, com complementos opcionais. Respostas em branco aparecem como “Não informado”.
5. **Inspeção visual** — registre apenas observações visuais do funcionário e suas fotos, separadas dos anexos do cliente. Nenhum teste de funcionamento faz parte do fluxo.
6. **Revisão** — confira as páginas e use **Corrigir** para voltar ao campo. A conclusão exige o nome do atendente e a confirmação de ciência do cliente. O PDF inclui espaço para assinatura manual.

Cada origem aceita até seis fotos opcionais em JPEG, PNG ou WebP, de até 5 MB cada. O navegador abre galeria ou câmera em resposta ao toque. Os arquivos são decodificados antes de entrar no rascunho. A escolha da câmera depende do aparelho.

## Persistência e comprovante

Um registro ativo fica no IndexedDB por origem e perfil do navegador. A leitura inicial precede as gravações. A migração mantém o banco na versão 1 e preenche os campos do modelo v2 sem converter as fotos Blob antigas. O aplicativo grava edições em fila e confirma a mudança de tela após a transação. Se outra aba alterar o registro, a aba desatualizada informa o conflito antes de sobrescrevê-lo. Aguarde a confirmação **Salvo neste navegador** antes de fechar ou recarregar. Em falha de gravação, os dados permanecem na aba para nova tentativa.

O protocolo emitido é estável ao recarregar e identifica o comprovante local de triagem. O mesmo navegador mantém um recebimento ativo por vez. **Novo recebimento** pede confirmação antes de substituir o registro concluído. Baixe o comprovante antes de iniciar outro. Limpar dados do site, usar navegação privada ou trocar de perfil ou aparelho pode tornar o registro indisponível. Evite aparelhos compartilhados.

O comprovante A4 é gerado no navegador com jsPDF, carregado sob demanda, e usa o logo e os contatos institucionais existentes. É possível baixar o arquivo ou abri-lo no visualizador do navegador. Em ambientes com Web Share para arquivos, **Compartilhar PDF** abre a interface do dispositivo após clique. Nos demais, **Baixar PDF** continua disponível para encaminhamento manual. Dados e fotos não têm envio automático, backup ou sincronização. O recebimento não constitui diagnóstico, autorização de reparo ou ordem de serviço centralizada.

## Testes

As regras puras usam o runner nativo do Node com suporte a TypeScript (22.18+). Os testes de navegador usam Chromium e dados sintéticos. O teste de PDF usa PyMuPDF no interpretador informado em `MILLUS_PYTHON`.

```sh
node --test tests/recebimento.test.mjs
npm exec --yes --package=@playwright/test -- playwright install chromium

# Com o Vite em execução, use o mesmo PLAYWRIGHT_BROWSERS_PATH da instalação se for personalizado.
node tests/recebimento.e2e.mjs
MILLUS_EVIDENCIAS=/opt/data/cache/scratch/millus-evidencias MILLUS_PYTHON=python node tests/recebimento-pdf.e2e.mjs
```

`MILLUS_URL` seleciona outra origem de teste. `MILLUS_EVIDENCIAS` define o destino das capturas e do PDF de fixture. No ambiente de desenvolvimento compartilhado, os navegadores estão em `/opt/data/cache/scratch/pw-browsers`.

Os testes cobrem os três tipos de equipamento, revisão e correção, retomada, recuperação de Blob v1, fotos de duas origens, quota e tentativa posterior, persistência do protocolo e dimensões em 360×640, 390×844 e 1440×900. O parser verifica dimensões A4, numeração, texto longo com acentos, seções e proporção das fotos. Os testes de compartilhamento simulam a disponibilidade da API e o cancelamento. Câmera física, compartilhamento nativo e Safari/iOS exigem verificação em aparelho.
