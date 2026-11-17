# Millus — site institucional

React + TypeScript + Vite. Reconstrução na branch `dev`, sem publicação.

## Executar e verificar

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 5184
npm run build
npx tsc --noEmit
npx tsc -p tsconfig.app.json --noEmit
git diff --check
```

Em `/`, execute `tests/site.browser.js` no console do navegador em 1440, 390 e 320 px. Testa catálogo completo (15 registros locais), busca por código, resultado vazio, filtro de categoria, destino e mensagem de orçamento, decodificação de imagens, largura e menu mobile. Não abre WhatsApp nem envia mensagens. Em `/produtos/hl-multi-1000`, execute `tests/hl-multi-1000.browser.js` para o contrato da oferta preservada.

## Composição

`Inicio` compõe apresentação, `Catalogo.Raiz` / `Categorias` / `Filtros` / `Lista`, diferenciais e sobre. O contexto do catálogo coordena busca e categoria. `Cabecalho.Raiz` / `Marca` / `Navegacao` e `Rodape` são compartilhados. `OfertaProduto` e dados Multi1000 permanecem independentes do legado. A landing não aparece na navegação, para revisão posterior.

## Conteúdo e limites

- Referências: SITE.png e IDENTIDADE_VISUAL.png fornecidas no Drive. Paleta aplicada. Interface Montserrat via Google Fonts, títulos Georgia como alternativa serifada — não foi presumida a existência de uma fonte chamada “Montserrat Serif”.
- Hero, logo e fachada são assets já existentes. Ícones representam categorias; não são fotos de produtos. Categorias reais locais: Rolamentos, Manômetros, Conexões, Vedações, EPIs e Acessórios, diferentes do mockup.
- Produtos vêm de `public/data/produtos.json`; o campo legado `disponivel` não vira promessa de estoque. Sem preço, certificação, prazo, carrinho, checkout, depoimento ou estatística inventados.
- Telefone e e-mail recuperados do código anterior. **Endereço divergente no legado**: Contato mencionava Teodoro Soares Fernandes, 78, mas o QR Maps aponta Belarmino Amaral, 618. O rodapé mostra somente Cubatão/SP até confirmação; o QR Maps original foi preservado, não promovido como endereço atual. QR WhatsApp preservado com o número comercial existente.
- O antigo `etica.html` redirecionava para uma rota inexistente. Agora é uma página de contato para solicitar diretrizes, não uma política jurídica inventada.
- Rotas antigas de projetos sem conteúdo atual retornam página não encontrada. `/mangueiras` preserva entrada para a nova home/catálogo. Assets reais não foram excluídos.
- Montserrat depende da rede; Arial é fallback. Sem domínio canônico novo ou infraestrutura adicionada.
