# Identidade visual MILLUS

Kit com 19 imagens PNG recriadas individualmente com a ferramenta integrada image_gen, a partir da prancha fornecida. Nenhuma imagem foi recortada da referência.

Abra [catalogo.html](catalogo.html) para visualizar e baixar as peças. O catálogo também está disponível no servidor local em /assets/millus/identidade/catalogo.html.

## Organização

- logos/: marca principal e assinaturas horizontais e verticais, versões positivas e negativas.
- icones/: monogramas e ícones quadrados para aplicativo, avatar e favicon.
- emblemas/: versões clara e escura do selo para etiquetas e produtos.
- aplicacoes/: imagens de capacete, uniforme, embalagem e etiqueta têxtil.
- fundos/: padrão geométrico para apoio visual.
- paleta/: painel de cores, referência tipográfica e tokens em CSS e JSON.

## Como reutilizar

As versões positivas usam marca escura; as negativas usam marca branca com fundo escuro. O manifesto informa quais PNGs têm fundo transparente. Preserve a proporção das imagens e a margem de proteção. Para ícones pequenos, prefira o monograma sem descritor.

Exemplo React:

```tsx
<img src="/assets/millus/identidade/logos/assinatura-horizontal-positiva.png" alt="Millus — Acessórios industriais" />
```

As imagens foram armazenadas para reutilização; a página inicial não foi alterada para aplicar esta identidade nesta etapa.

## Paleta nominal

| Cor | Código |
| --- | --- |
| Carvão | #0B0F17 |
| Branco | #FFFFFF |
| Cinza claro | #E9ECEF |
| Amarelo industrial | #FFC700 |

Use paleta/cores.css ou paleta/cores.json para valores exatos na interface. O painel PNG é uma referência visual.

## Arquivos

| Imagem | Resolução | Fundo |
| --- | --- | --- |
| [logo-principal-positivo](logos/logo-principal-positivo.png) | 2172 × 724 | transparente |
| [assinatura-horizontal-positiva](logos/assinatura-horizontal-positiva.png) | 2172 × 724 | transparente |
| [logo-principal-negativo](logos/logo-principal-negativo.png) | 2172 × 724 | escuro |
| [assinatura-horizontal-negativa](logos/assinatura-horizontal-negativa.png) | 2172 × 724 | escuro |
| [assinatura-vertical-positiva](logos/assinatura-vertical-positiva.png) | 1254 × 1254 | claro |
| [assinatura-vertical-negativa](logos/assinatura-vertical-negativa.png) | 1254 × 1254 | escuro |
| [monograma-positivo](icones/monograma-positivo.png) | 1254 × 1254 | transparente |
| [monograma-negativo](icones/monograma-negativo.png) | 1254 × 1254 | escuro |
| [icone-app-escuro](icones/icone-app-escuro.png) | 1254 × 1254 | escuro |
| [icone-app-claro](icones/icone-app-claro.png) | 1254 × 1254 | claro |
| [emblema-claro](emblemas/emblema-claro.png) | 1774 × 887 | claro |
| [emblema-escuro](emblemas/emblema-escuro.png) | 1774 × 887 | escuro |
| [padrao-geometrico-escuro](fundos/padrao-geometrico-escuro.png) | 1254 × 1254 | escuro |
| [paleta-millus](paleta/paleta-millus.png) | 2172 × 724 | claro |
| [capacete-millus](aplicacoes/capacete-millus.png) | 1672 × 941 | fotográfico |
| [uniforme-millus](aplicacoes/uniforme-millus.png) | 1672 × 941 | fotográfico |
| [embalagem-millus](aplicacoes/embalagem-millus.png) | 1774 × 887 | fotográfico |
| [etiqueta-millus](aplicacoes/etiqueta-millus.png) | 1774 × 887 | fotográfico |
| [tipografia-referencia](paleta/tipografia-referencia.png) | 1774 × 887 | claro |

## Formato e procedência

As peças são PNGs rasterizados de alta resolução, não arquivos vetoriais. A demonstração tipográfica é uma imagem de estilo; nenhuma família de fonte foi identificada ou incluída. O padrão de fundo é decorativo, sem garantia de encaixe perfeito em repetição.

manifesto.json registra resolução, tamanho, caminho e SHA-256 de cada peça. prompts.json contém os prompts finais, as referências conceituais e a ferramenta usada para reproduzir ou ajustar o kit.
