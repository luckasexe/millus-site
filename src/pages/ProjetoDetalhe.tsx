import { useParams } from 'react-router-dom';
import { projetos } from '../data/projetos';

const WHATSAPP_URL = 'https://wa.me/5513982071346';

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
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" opacity="0.25">
        <rect x="2" y="6" width="28" height="20" rx="2" stroke="#4a7fb5" strokeWidth="1.5" />
        <circle cx="11" cy="13" r="3" stroke="#4a7fb5" strokeWidth="1.5" />
        <path d="M2 22 L10 15 L16 21 L21 16 L30 24" stroke="#4a7fb5" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      <span style={{ fontFamily: 'monospace', fontSize: '8px', letterSpacing: '0.1em', color: '#4a7fb5', opacity: 0.3 }}>
        {label}
      </span>
    </div>
  );
}

function ProjetoImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative overflow-hidden border border-[#4a7fb5]/15">
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#f59e0b]/40 z-10" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#f59e0b]/40 z-10" />
      <img
        src={src}
        alt={alt}
        className="w-full object-cover"
        style={{ aspectRatio: '4/3', filter: 'brightness(0.85) saturate(0.75)' }}
        onError={(e) => {
          const el = e.target as HTMLImageElement;
          el.style.display = 'none';
          el.parentElement!.querySelector('.ph')?.classList.remove('hidden');
        }}
      />
      <div className="ph hidden"><ImagePlaceholder label="FOTO DO PROJETO" /></div>
    </div>
  );
}

export function ProjetoDetalhe() {
  const { slug } = useParams<{ slug: string }>();
  const projeto = projetos.find(p => p.slug === slug);

  if (!projeto) {
    return (
      <div className="blueprint-bg min-h-screen flex items-center justify-center">
        <p className="text-[#8fadc8]" style={{ fontFamily: 'monospace' }}>PROJETO NÃO ENCONTRADO</p>
      </div>
    );
  }

  return (
    <div className="blueprint-bg min-h-screen px-6 md:px-12 py-12">
      <div className="w-full max-w-7xl mx-auto">

        {/* Voltar */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-[#4a7fb5] hover:text-white transition-colors duration-200 mb-10 text-sm"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.08em' }}
        >
          ← VOLTAR PARA O INÍCIO
        </a>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="blueprint-tag" style={{ color: '#f59e0b' }}>{projeto.ref}</span>
            <span className="blueprint-tag">ENGENHARIA CUSTOMIZADA</span>
          </div>
          <h1
            className="text-white mb-2"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              lineHeight: 1.05,
            }}
          >
            {projeto.nome.toUpperCase()}
          </h1>
          <p className="text-[#f59e0b] text-sm font-medium" style={{ letterSpacing: '0.05em' }}>
            {projeto.categoria}
          </p>
        </div>

        {/* Imagem principal + descrição */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[#4a7fb5]/15 mb-px">
          <ProjetoImage src={projeto.img} alt={projeto.nome} />

          <div className="bg-[#0a1628] p-8 flex flex-col gap-6">
            <div>
              <p className="blueprint-tag mb-3">DESCRIÇÃO DO PROJETO</p>
              {projeto.descricaoLonga.split('\n\n').map((par, i) => (
                <p key={i} className="text-[#8fadc8] text-sm leading-relaxed mb-3">{par}</p>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {projeto.tags.map(tag => (
                <span
                  key={tag}
                  className="text-[10px] border border-[#4a7fb5]/30 text-[#4a7fb5] px-2 py-0.5"
                  style={{ fontFamily: 'monospace', letterSpacing: '0.05em' }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Specs */}
            <div className="border-t border-[#4a7fb5]/20 pt-5">
              <p className="blueprint-tag mb-3">ESPECIFICAÇÕES TÉCNICAS</p>
              <div className="flex flex-col gap-2">
                {projeto.specs.map(({ label, valor }) => (
                  <div key={label} className="flex justify-between text-xs border-b border-[#4a7fb5]/10 pb-2">
                    <span className="text-[#4a7fb5]" style={{ fontFamily: 'monospace' }}>{label}</span>
                    <span className="text-[#e2eaf5]" style={{ fontFamily: 'monospace' }}>{valor}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Galeria */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#4a7fb5]/15 mb-px">
          {projeto.galeria.map((src, i) => (
            <ProjetoImage key={i} src={src} alt={`${projeto.nome} — foto ${i + 2}`} />
          ))}
        </div>

        {/* Desenho técnico */}
        <div className="bg-[#060f1e] border border-[#4a7fb5]/20 p-6 md:p-10 mb-px">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#4a7fb5]" />
            <span className="blueprint-tag">DESENHO TÉCNICO // {projeto.ref}</span>
          </div>
          <div className="flex justify-center overflow-x-auto">
            {projeto.svgTecnico}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#0a1628] border border-[#4a7fb5]/20 p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p
              className="text-white font-semibold mb-1"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1.2rem', letterSpacing: '0.03em' }}
            >
              PRECISA DE UM PROJETO SIMILAR?
            </p>
            <p className="text-[#8fadc8] text-sm">Fale direto com nossa equipe técnica pelo WhatsApp.</p>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 bg-[#f59e0b] text-[#0a1628] font-semibold px-6 py-3 rounded-sm hover:bg-[#fbbf24] transition-colors duration-200"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.08em', fontSize: '1rem' }}
          >
            SOLICITAR ORÇAMENTO →
          </a>
        </div>

      </div>
    </div>
  );
}
