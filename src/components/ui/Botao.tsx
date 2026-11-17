import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

type VarianteBotao = 'primario' | 'secundario' | 'contorno' | 'link';
type PropriedadesBotao = (
  | (ButtonHTMLAttributes<HTMLButtonElement> & { variante?: Exclude<VarianteBotao, 'link'>; href?: never })
  | (AnchorHTMLAttributes<HTMLAnchorElement> & { variante?: VarianteBotao; href: string })
);

/** A variante link é navegação: exige destino real, nunca simula uma ação. */
export function Botao({ variante = 'primario', className = '', ...propriedades }: PropriedadesBotao) {
  if ((variante === 'link' && typeof propriedades.href !== 'string') || propriedades.href === '') {
    throw new Error('Botao de navegação exige um destino real em href.');
  }
  const classe = `botao botao-${variante} ${className}`.trim();
  if (typeof propriedades.href === 'string') {
    return <a {...propriedades as AnchorHTMLAttributes<HTMLAnchorElement>} className={classe} />;
  }
  return <button type="button" {...propriedades as ButtonHTMLAttributes<HTMLButtonElement>} className={classe} />;
}
