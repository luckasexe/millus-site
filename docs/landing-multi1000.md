# Landing HL Multi 1000

## Composição e conversão

Rota `/produtos/hl-multi-1000`. Página compõe apresentação, aplicações, embalagens, orientações/diluições, atendimento, FAQ nativo e orçamento final. Uma única `OfertaProduto.Raiz` coordena `Imagem`, `SeletorVolume`, dois `Resumo` e dois `BotaoOrcamento`: seleção inicial 2 L, troca real 2→5→2 L, mensagem comercial sincronizada. Sem formulário, persistência, captura de lead ou envio automático.

Cabeçalho compartilhado recebe composição reduzida (marca, voltar ao institucional, âncora orçamento); mantém sticky e ResizeObserver. `Rodape` recebe slot `chamada`: landing usa `null` para não repetir oferta genérica; institucional mantém comportamento anterior. Sem alterações às alturas da home. CSS exclusivo com tokens existentes. Montserrat no corpo, Georgia nos títulos: aproximação documentada no sistema de tokens, não uma fonte “Montserrat Serif” fornecida.

## Fontes e limites

- Página oficial consultada: https://henlau.com.br/produtos/hl-multi-1000-detergente-multiuso-biodegradavel/
- Fotos oficiais recuperadas diretamente das imagens dessa página:
  - 2 L: https://henlau.com.br/wp-content/uploads/2024/07/MULTI-1000-2L.png
  - 5 L: https://henlau.com.br/wp-content/uploads/2024/07/HL-Multi-1000.png
- Os PNGs oficiais já têm alfa (0–255); não foi necessário recortar branco nem reconstruir embalagem. Foram reduzidos proporcionalmente com Pillow/Lanczos e exportados WebP qualidade 90 preservando alfa. Originais em `/opt/data/cache/scratch/hl-multi-1000-{2l,5l}-original.png`. Foto JPG anterior preservada, não utilizada nesta apresentação.
- Volume 2 L e 5 L comercializado confirmado pelo usuário; preço, estoque, frete e condições não foram presumidos.
- Tabela resumida preserva associação aplicação/diluição e aponta à fonte completa; modo de uso atribuído à Henlau, com restrições de compatibilidade, rótulo/documentação e EPI. Sem rendimento calculado, avaliações, certificações ou garantia universal.
- Título e descrição atualizam/restauram no navegador. SPA continua sem HTML/OG por rota para crawlers; não houve alteração dos metadados globais nem promessa de SEO SSR.

## Verificações locais

- `node tests/landing-completa.mjs`: conteúdo técnico, quatro FAQs, dois CTAs, legenda inicial correta.
- `node tests/componentes.mjs`: contratos dos primitivos preservados.
- `npm run build`, `npx tsc -p tsconfig.app.json --noEmit`, `git diff --check`: aprovados.
- `tests/landing-completa.browser.js` executado em 1440, 390 e 320 px: 2→5→2, foto oficial/src e decodificação em cada transição, resumos e CTAs sincronizados, telefone comercial correto, FAQ, sticky, âncora desobstruída e sem overflow.
- FAQ acionado por Espaço via eventos de teclado CDP: `open: true`, foco em `SUMMARY`.
- `tests/site.browser.js` em 1440/390/320: busca por código, vazio, 15 produtos, filtros, destinos, imagens, largura e menu aprovados. `tests/identidade.browser.js`: foco/variantes/contraste/sticky/âncoras aprovados.
- Capturas finais em `/opt/data/cache/scratch/landing-multi1000-{1440,390,320,5l}.png`.

Servidor local dedicado: porta 5186. Sem commit, push ou deploy. `output/` original preservado sem stage.
