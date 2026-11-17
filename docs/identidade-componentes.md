# Identidade visual e componentes Millus

## Escopo e análise de conformidade

A referência visual fornecida foi inspecionada antes da implementação. A paleta-base já existia, mas os consumidores repetiam cores, fontes, raios e estados. Os seletores `.botao`, `.busca`, `.produto`, `.cabecalho-busca` e `.hl-botao` também são usados nos testes e foram preservados. O ajuste consolida o sistema existente, sem redesenhar as páginas, alterar catálogo/copy/comercial ou gerar imagens.

- `src/tokens.css`: paleta fornecida (`#FFC107`, `#111111`, `#2E2E2E`, `#E5E7EB`, `#FFFFFF`), papéis de superfície/texto/borda/foco, fontes, tamanhos recorrentes, pesos, raios, espaçamentos e duração de transições.
- Tons auxiliares já presentes foram nomeados, não substituídos indiscriminadamente. A borda dos cartões do catálogo passa a usar o cinza-claro da identidade. Dimensões e espaçamentos específicos de layout continuam locais; os valores recorrentes usam a escala sem arredondamento.
- `Cabecalho.Raiz/Marca/Navegacao/Busca/Contato`, `Catalogo.Raiz/Categorias/Filtros/Lista` e `OfertaProduto` mantêm sua composição e seu estado. Os novos componentes simples não exigem Context nem variantes estruturais.
- Sticky, `ResizeObserver`, `--altura-cabecalho` e compensação de âncoras são preservados. Não foram alterados os valores de altura/espaçamento do cabeçalho ou do hero.

## API compartilhada

Importações diretas de `src/components/ui/`:

```tsx
<Botao href="#catalogo">Ver nosso catálogo</Botao>
<Botao variante="secundario" href="#contato">Fale com a Millus</Botao>
<Botao variante="contorno" aria-pressed={selecionado} onClick={selecionar}>Categoria</Botao>
<Botao variante="primario" disabled>Indisponível</Botao>
<Botao variante="link" href="#contato">Contato</Botao>

<CampoBusca id="busca" rotulo="Buscar produtos" value={busca} onChange={atualizarBusca} />
<Cartao className="produto">{conteudo}</Cartao>
```

### Botao

- Variantes: `primario` (padrão amarelo), `secundario` (escuro), `contorno` e `link` (ação textual de navegação).
- `href` produz âncora; sem `href`, as três primeiras variantes produzem botão nativo com `type="button"` por padrão. `type="submit"` pode ser explícito. Props HTML/React e `children` são preservadas.
- A variante `link` exige `href` na tipagem e rejeita a ausência de destino em execução. `href=""` também é rejeitado. Não cria uma ação fictícia sem destino.
- `disabled` é nativo de `button`, não de âncora. Para uma navegação indisponível, omitir a ação é preferível a um link falsamente desabilitado.
- Hover, ativo, foco visível e disabled não alteram as dimensões. As ações reais do catálogo, hero, contato e oferta usam o componente. A seção Sobre usa secundário e os filtros usam contorno com estado selecionado preservado.
- A variante `link` está disponível e testada, mas não foi inserida artificialmente no site: os links textuais existentes mantêm sua apresentação e seus destinos.

### CampoBusca

Encapsula `input type="search"` e o rótulo acessível associado ao `id` obrigatório; aceita as props nativas do input. Funciona controlado no catálogo e com `defaultValue`/`name` no formulário GET do cabeçalho. O ícone e o botão de envio são conteúdo do consumidor, não flags do campo.

O contêiner consumidor mantém um único destaque discreto com `:focus-within`, sem anel redundante no input nem alteração de largura/altura. O botão de busca mantém foco de teclado interno e distinto. O catálogo também usa foco contido, sem salto. `prefers-reduced-motion` elimina as transições e a rolagem suave.

### Cartao

Superfície semântica `article`, com borda, fundo, raio e recorte centralizados. Recebe props HTML, `className` e `children`; não conhece produto, imagem, preço nem orçamento. É usado nos cartões do catálogo; categorias continuam âncoras semânticas, e a composição específica da landing não foi generalizada.

## Tipografia e imagens: limites explícitos

- A referência nomeia os títulos como “Montserrat Serif”, mas nenhum arquivo `.woff/.woff2/.ttf/.otf` dessa face foi encontrado entre os arquivos versionados. `--fonte-titulo` mantém Georgia/Times New Roman/serif como aproximação documentada, sem alegar fidelidade exata e sem instalar uma fonte arbitrária.
- A interface mantém Montserrat via Google Fonts já configurado no projeto; a face foi carregada com `document.fonts.load('400 14px Montserrat')` na validação. O fallback é Arial/sans-serif. A fonte específica já declarada na landing continua em `--fonte-produto`, sem nova instalação ou requisição de fonte.
- Logos, fachada da loja, fotografia Henlau e imagens geradas existentes foram preservados. As imagens do catálogo são ilustrações genéricas por categoria, não fotografias de cada SKU; os avisos visíveis e textos alternativos continuam presentes. Ver também `docs/imagens-geradas.md`.

## Validação local repetível

```sh
node tests/componentes.mjs
npx tsc -p tsconfig.app.json --noEmit
npm run build
git diff --check
```

`componentes.mjs` usa SSR do Vite e React reais, sem dependências adicionais, para verificar tags, destinos, variantes, disabled nativo, rejeição de link sem destino, rotulagem do campo e semântica do cartão.

No navegador local, em 1440, 390 e 320 px:

1. Executar `tests/site.browser.js` na home: busca por código, vazio, restauração dos 15 produtos, filtro Vedações, destino comercial, decodificação das imagens, ausência de overflow e menu mobile.
2. Acionar Tab real para ativar modalidade de teclado e executar `tests/identidade.browser.js`: dimensões estáveis no foco/disabled, contorno único dos campos, foco visível nas quatro variantes, contraste textual dos controles ativos, sticky no topo e compensação de âncoras. As fixtures são temporárias e removidas em `finally`, sem ações fictícias na aplicação pública.
3. Executar `tests/hl-multi-1000.browser.js` em `/produtos/hl-multi-1000`: seleção 2/5/2 L, resumo, destino e mensagem de orçamento, imagem e largura.

Essas verificações passaram localmente nas três larguras. Também foram verificados: envio real do formulário do cabeçalho para `/?busca=ROL-001#catalogo` com um resultado; menu mobile/Escape/devolução de foco; foco de teclado do botão da busca com contorno interno de 2 px; emulação de movimento reduzido com transição `0s` e rolagem `auto`. A comparação de estilos com o HEAD em 1440 px confirmou geometria idêntica do cabeçalho, navegação, busca e hero. O contraste textual medido nas superfícies de teste foi 11,58:1 no primário e 18,88:1 nas demais variantes; isso não equivale a uma auditoria WCAG integral da página.

Capturas locais em `/opt/data/cache/scratch/millus-identidade-*.png` cobrem home desktop/mobile, catálogo desktop e oferta nas três larguras. Nenhum commit, push ou deploy faz parte desta entrega; `output/` e os assets originais foram preservados.
