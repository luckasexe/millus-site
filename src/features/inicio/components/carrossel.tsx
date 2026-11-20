import { useRef } from 'react';
import type { PropsWithChildren } from 'react';
import { Seta } from './icones';

export function Carrossel({ children, nome, variante = '' }: PropsWithChildren<{ nome: string; variante?: string }>) {
  const faixaRef = useRef<HTMLDivElement>(null);
  function mover(direcao: number) {
    const faixa = faixaRef.current;
    if (!faixa) return;
    const distancia = (faixa.firstElementChild?.getBoundingClientRect().width ?? 360) + 20;
    faixa.scrollBy({ left: distancia * direcao, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  return (
    <div className={`carrossel ${variante}`} role="region" aria-label={nome} aria-roledescription="carrossel">
      <div className="carrossel-faixa" ref={faixaRef} tabIndex={0} aria-label={`${nome}: role para explorar`}>{children}</div>
      <div className="carrossel-controles">
        <button onClick={() => mover(-1)} aria-label={`Anterior: ${nome}`}><span className="seta-anterior"><Seta circular /></span></button>
        <button onClick={() => mover(1)} aria-label={`Próximo: ${nome}`}><Seta circular /></button>
      </div>
    </div>
  );
}
