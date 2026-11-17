import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SECOES = [
  { id: 'inicio',       label: 'INÍCIO' },
  { id: 'mangueiras',   label: 'MANGUEIRAS' },
  { id: 'diferenciais', label: 'DIFERENCIAIS' },
  { id: 'projetos',     label: 'PROJETOS' },
  { id: 'catalogo',     label: 'CATÁLOGO' },
  { id: 'contato',      label: 'CONTATO' },
];

export function NavbarLateral() {
  const [ativa, setAtiva] = useState('inicio');
  const { pathname: caminhoAtual } = useLocation();

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECOES.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setAtiva(id);
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [caminhoAtual]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav aria-label="Produtos Millus" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, padding: '14px 24px', background: '#111', borderBottom: '1px solid #333' }}>
        <Link to="/" aria-label="Millus — início"><img src="/assets/millus_branco.png" alt="Millus" style={{ width: 110, height: 40, objectFit: 'contain' }} /></Link>
        <Link to="/produtos/hl-multi-1000" aria-current={caminhoAtual === '/produtos/hl-multi-1000' ? 'page' : undefined} style={{ color: '#ffc107', fontSize: 13, padding: '12px 0', textUnderlineOffset: 5 }}>HL Multi 1000</Link>
      </nav>
    <nav aria-label="Seções da página" className="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-1 hidden md:flex">
      {/* Linha vertical */}
      <div
        className="absolute right-[9px] top-0 bottom-0 w-px"
        style={{ background: 'rgba(74,127,181,0.25)' }}
      />

      {(caminhoAtual === '/' ? SECOES : SECOES.filter(secao => secao.id === 'contato')).map(({ id, label }) => {
        const isAtiva = ativa === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="flex items-center gap-3 py-2.5 group"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            title={label}
          >
            {/* Label — sempre visível */}
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '10px',
                letterSpacing: '0.12em',
                whiteSpace: 'nowrap',
                color: isAtiva ? '#f59e0b' : 'rgba(74,127,181,0.65)',
                fontWeight: isAtiva ? 700 : 400,
                transition: 'color 0.2s ease, opacity 0.2s ease',
              }}
            >
              {label}
            </span>

            {/* Dot */}
            <div
              style={{
                width: isAtiva ? 12 : 7,
                height: isAtiva ? 12 : 7,
                borderRadius: '50%',
                background: isAtiva ? '#f59e0b' : 'transparent',
                border: `1.5px solid ${isAtiva ? '#f59e0b' : 'rgba(74,127,181,0.5)'}`,
                transition: 'all 0.25s ease',
                flexShrink: 0,
                boxShadow: isAtiva ? '0 0 10px rgba(245,158,11,0.55)' : 'none',
              }}
            />
          </button>
        );
      })}
    </nav>
    </>
  );
}
