import { projetos } from '../data/projetos';

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div
      className="w-full flex flex-col items-center justify-center gap-2"
      style={{
        aspectRatio: '4/3',
        background: 'rgba(10,22,40,0.8)',
        backgroundImage:
          'linear-gradient(rgba(100,155,220,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(100,155,220,0.05) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" opacity="0.3">
        <rect x="2" y="6" width="28" height="20" rx="2" stroke="#4a7fb5" strokeWidth="1.5" />
        <circle cx="11" cy="13" r="3" stroke="#4a7fb5" strokeWidth="1.5" />
        <path d="M2 22 L10 15 L16 21 L21 16 L30 24" stroke="#4a7fb5" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <span style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.1em', color: '#4a7fb5', opacity: 0.4 }}>
        {label}
      </span>
    </div>
  );
}

export function Projetos() {
  return (
    <section id="projetos" className="blueprint-bg relative py-20 px-6 md:px-12 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#f59e0b]" />
            <span className="blueprint-tag" style={{ color: '#f59e0b' }}>ENGENHARIA CUSTOMIZADA</span>
          </div>
          <h2
            className="text-white"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
            }}
          >
            PROJETOS <span className="accent">PERSONALIZADOS</span>
          </h2>
          <p className="text-[#8fadc8] mt-3 max-w-xl text-base leading-relaxed">
            Além do estoque, desenvolvemos estruturas e equipamentos customizados
            para demandas específicas da indústria. Do projeto à entrega.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#4a7fb5]/15">
          {projetos.map(({ slug, ref, nome, categoria, descricao, tags, img }) => (
            <a
              key={ref}
              href={`/projetos/${slug}`}
              className="bg-[#0a1628] flex flex-col group hover:bg-[#0d2040] transition-colors duration-200 relative cursor-pointer"
              style={{ textDecoration: 'none' }}
            >
              {/* Imagem */}
              <div className="relative overflow-hidden border-b border-[#4a7fb5]/15">
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#f59e0b]/50 z-10" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#f59e0b]/50 z-10" />
                <span
                  className="absolute top-2 right-2 z-10 blueprint-tag bg-[#0a1628]/80 px-1.5 py-0.5"
                  style={{ fontSize: '8px' }}
                >
                  {ref}
                </span>
                <img
                  src={img}
                  alt={nome}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ aspectRatio: '4/3', filter: 'brightness(0.85) saturate(0.75)' }}
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = 'none';
                    el.parentElement!.querySelector('.placeholder')?.classList.remove('hidden');
                  }}
                />
                <div className="placeholder hidden">
                  <ImagePlaceholder label={ref} />
                </div>
              </div>

              {/* Conteúdo */}
              <div className="p-6 flex flex-col gap-4 flex-1">
                <div>
                  <h3
                    className="text-white leading-tight mb-1 group-hover:text-[#f59e0b] transition-colors duration-200"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: '1.2rem', letterSpacing: '0.02em' }}
                  >
                    {nome}
                  </h3>
                  <span className="text-[#f59e0b] text-xs font-medium" style={{ letterSpacing: '0.05em' }}>
                    {categoria}
                  </span>
                </div>

                <p className="text-[#8fadc8] text-sm leading-relaxed flex-1">{descricao}</p>

                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] border border-[#4a7fb5]/30 text-[#4a7fb5] px-2 py-0.5"
                      style={{ fontFamily: 'monospace', letterSpacing: '0.05em' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span
                  className="text-[#4a7fb5] text-xs group-hover:text-white transition-colors duration-200"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.08em' }}
                >
                  VER PROJETO →
                </span>
              </div>

              {/* Hover line */}
              <div className="absolute bottom-0 left-0 h-px w-0 bg-[#f59e0b] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <a
            href="https://wa.me/5513982071346"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#8fadc8] border border-[#4a7fb5]/40 px-6 py-3 rounded-sm hover:border-[#4a7fb5] hover:text-white transition-all duration-200"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.08em', fontSize: '1rem' }}
          >
            SOLICITAR PROJETO PERSONALIZADO →
          </a>
        </div>

      </div>
      <div className="tech-divider mt-20" />
    </section>
  );
}
