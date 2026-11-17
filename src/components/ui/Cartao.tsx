import type { HTMLAttributes } from 'react';

/** Superfície de conteúdo semântico; conteúdo e ações pertencem ao consumidor. */
export function Cartao({ className = '', ...propriedades }: HTMLAttributes<HTMLElement>) {
  return <article {...propriedades} className={`cartao ${className}`.trim()} />;
}
