import { Phone, MapPin, Globe, ArrowRight, ChevronDown } from 'lucide-react';

const WHATSAPP_URL = 'https://wa.me/5513982071346';

export function Hero() {
  return (
    <section id="inicio" className="blueprint-bg relative min-h-screen flex flex-col overflow-hidden">

      {/* Corner markers */}
      <div className="corner-mark tl" />
      <div className="corner-mark tr" />
      <div className="corner-mark bl" />
      <div className="corner-mark br" />

      {/* Top reference tag */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2">
        <span className="blueprint-tag">REF-MLX-001 // MILLUS ACESSÓRIOS INDUSTRIAIS</span>
      </div>

      {/* ── Header ── */}
      <header className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 pt-12 pb-4">
        <div className="flex items-center">
          <img
            src="/assets/logo2.png"
            alt="Millus Acessórios Industriais"
            className="h-12 w-auto"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-medium text-[#f59e0b] border border-[#f59e0b]/40 px-4 py-2 rounded-sm hover:bg-[#f59e0b] hover:text-[#0a1628] transition-all duration-200"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.08em' }}
        >
          <Phone size={14} />
          FALAR COM ATENDIMENTO
        </a>
      </header>

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col md:flex-row items-center gap-8 px-6 md:px-12 py-12 md:py-0">

        {/* Left: text */}
        <div className="flex-1 max-w-2xl">

          {/* Technical label above title */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#4a7fb5]" />
            <span className="blueprint-tag">Sistema de soluções hidráulicas e industriais</span>
          </div>

          <h1
            className="text-white leading-none mb-6"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 'clamp(2.8rem, 6vw, 5rem)',
              fontWeight: 700,
              letterSpacing: '-0.01em',
            }}
          >
            SOLUÇÕES TÉCNICAS
            <br />
            PARA SUA{' '}
            <span className="accent">OPERAÇÃO</span>
            <br />
            INDUSTRIAL
          </h1>

          <p className="text-[#8fadc8] text-base md:text-lg leading-relaxed mb-8 max-w-lg">
            Mangueiras prensadas, conexões hidráulicas e pneumáticas, rolamentos,
            manômetros e projetos customizados. Atendimento técnico direto, sem intermediários.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#f59e0b] text-[#0a1628] font-semibold px-6 py-3 rounded-sm hover:bg-[#fbbf24] transition-colors duration-200"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.08em', fontSize: '1rem' }}
            >
              SOLICITAR ATENDIMENTO
              <ArrowRight size={16} />
            </a>
            <a
              href="#mangueiras"
              className="flex items-center justify-center gap-2 text-[#8fadc8] border border-[#4a7fb5]/40 px-6 py-3 rounded-sm hover:border-[#4a7fb5] hover:text-white transition-all duration-200"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.08em', fontSize: '1rem' }}
            >
              VER SOLUÇÕES
            </a>
          </div>

          {/* Contact info row */}
          <div className="flex flex-col sm:flex-row gap-4 text-xs text-[#4a7fb5]">
            <span className="flex items-center gap-1.5">
              <Phone size={11} />
              (13) 98207-1346
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={11} />
              R. Teodoro Soares Fernandes, 78 — Cubatão/SP
            </span>
            <span className="flex items-center gap-1.5">
              <Globe size={11} />
              www.millus.com.br
            </span>
          </div>
        </div>

        {/* Right: image panel */}
        <div className="flex-1 max-w-lg w-full relative">
          {/* Blueprint frame around image */}
          <div className="relative border border-[#4a7fb5]/30 rounded-sm overflow-hidden">
            {/* Corner marks on image */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#f59e0b]/60 z-10" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#f59e0b]/60 z-10" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#f59e0b]/60 z-10" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#f59e0b]/60 z-10" />

            {/* Label over image */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10">
              <span className="blueprint-tag bg-[#0a1628]/80 px-2 py-0.5" style={{ fontSize: '8px' }}>
                VISTA // INSTALAÇÃO
              </span>
            </div>

            <img
              src="/assets/millus-hero.png"
              alt="Instalações Millus"
              className="w-full object-cover"
              style={{ aspectRatio: '4/3', filter: 'brightness(0.85) saturate(0.8)' }}
              onError={(e) => {
                const el = e.target as HTMLImageElement;
                el.parentElement!.style.background = 'rgba(100,155,220,0.05)';
                el.style.display = 'none';
              }}
            />

            {/* Overlay with scan lines */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(rgba(10,22,40,0.2) 50%, rgba(10,22,40,0) 50%)',
                backgroundSize: '100% 4px',
                mixBlendMode: 'multiply',
              }}
            />
          </div>

          {/* Stats below image */}
          <div className="grid grid-cols-3 gap-px mt-px border border-[#4a7fb5]/20 bg-[#4a7fb5]/20">
            {[
              { label: 'TIPOS DE TERMINAL', value: '200+' },
              { label: 'ITENS EM ESTOQUE', value: '2K+' },
              { label: 'CLIENTES ATIVOS', value: '300+' },
            ].map((s) => (
              <div key={s.label} className="bg-[#0a1628] px-3 py-3 text-center">
                <p className="text-[#f59e0b] font-bold" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.5rem', lineHeight: 1 }}>
                  {s.value}
                </p>
                <p className="blueprint-tag mt-1" style={{ fontSize: '8px' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex justify-center pb-8 animate-bounce">
        <ChevronDown size={20} className="text-[#4a7fb5]" />
      </div>

      {/* Bottom tech divider */}
      <div className="tech-divider" />
    </section>
  );
}
