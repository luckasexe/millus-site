# Millus

Página institucional da Millus em React, Vite, TypeScript e Tailwind CSS.

## Desenvolvimento

```sh
npm install
npm run dev
```

## Build de produção

```sh
npm run build
npm run preview
```

## Estrutura

- `src/main.tsx`: inicialização do React.
- `src/App.tsx`: componente principal.
- `src/styles.css`: estilos globais.
- `src/features/inicio/`: página inicial, hook, dados e estilos da funcionalidade.
- `src/features/inicio/components/`: componentes exclusivos da home.
- `public/`: arquivos estáticos.

## Arquitetura aplicada

A home usa nomes em português, imports por `@/` entre pastas e uma feature plana. A página compõe os componentes, o hook controla as interações e `Colecao` usa Compound Components sem Context desnecessário. Conteúdo fixo fica em `inicio.dados.ts`; não há API, autenticação ou sessão. Os tokens de cores e tipografia ficam em `src/styles.css`.

O arquivo `ARQUITETURA.md` permanece como referência original, ainda com exemplos do outro domínio. As pastas vazias da estrutura inicial foram preservadas; código novo da home fica em `features/inicio`. `shared/` deve receber apenas o que for usado por uma segunda feature.

## Página inicial

Apresentação dos quatro segmentos da marca, galeria de aplicações e atendimento em Cubatão. As imagens e assinaturas ficam em `public/assets/millus/`.
