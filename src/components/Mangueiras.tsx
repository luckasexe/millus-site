const WHATSAPP_URL = 'https://wa.me/5513982071346';

function CrossSection({ tramas }: { tramas: 1 | 2 }) {
  return (
    <svg viewBox="0 0 120 120" width="120" height="120" xmlns="http://www.w3.org/2000/svg">
      {/* Outer cover */}
      <circle cx="60" cy="60" r="52" fill="none" stroke="#4a7fb5" strokeWidth="8" opacity="0.5" />
      {/* Trama 2 (only for double) */}
      {tramas === 2 && (
        <circle cx="60" cy="60" r="40" fill="none" stroke="#f59e0b" strokeWidth="3"
          strokeDasharray="4 3" opacity="0.7" />
      )}
      {/* Trama 1 */}
      <circle cx="60" cy="60" r={tramas === 2 ? 33 : 38} fill="none" stroke="#f59e0b" strokeWidth="3"
        strokeDasharray="4 3" opacity="0.9" />
      {/* Inner tube */}
      <circle cx="60" cy="60" r={tramas === 2 ? 24 : 28} fill="rgba(10,22,40,0.8)" stroke="#8fadc8" strokeWidth="2" />
      {/* Bore */}
      <circle cx="60" cy="60" r={tramas === 2 ? 14 : 17} fill="rgba(74,127,181,0.15)" stroke="#4a7fb5" strokeWidth="1" strokeDasharray="2 2" />
      {/* Center dot */}
      <circle cx="60" cy="60" r="3" fill="#4a7fb5" opacity="0.6" />
      {/* Dimension lines */}
      <line x1="60" y1="8" x2="60" y2="112" stroke="#4a7fb5" strokeWidth="0.5" opacity="0.2" />
      <line x1="8" y1="60" x2="112" y2="60" stroke="#4a7fb5" strokeWidth="0.5" opacity="0.2" />
      {/* Tick marks */}
      <line x1="57" y1="8" x2="63" y2="8" stroke="#4a7fb5" strokeWidth="0.8" opacity="0.5" />
      <line x1="57" y1="112" x2="63" y2="112" stroke="#4a7fb5" strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}

function PneumaticSection() {
  return (
    <svg viewBox="0 0 120 120" width="120" height="120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="50" fill="none" stroke="#4a7fb5" strokeWidth="5" opacity="0.5" />
      <circle cx="60" cy="60" r="38" fill="none" stroke="#8fadc8" strokeWidth="2" strokeDasharray="6 3" opacity="0.6" />
      <circle cx="60" cy="60" r="26" fill="rgba(10,22,40,0.8)" stroke="#4a7fb5" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="14" fill="rgba(74,127,181,0.2)" stroke="#4a7fb5" strokeWidth="1" strokeDasharray="2 2" />
      {/* Air flow arrows — centered at y=60 */}
      <path d="M52 63 L60 55 L68 63" fill="none" stroke="#4a7fb5" strokeWidth="1.2" opacity="0.5" />
      <path d="M52 57 L60 65 L68 57" fill="none" stroke="#4a7fb5" strokeWidth="1.2" opacity="0.5" />
      <line x1="8" y1="60" x2="112" y2="60" stroke="#4a7fb5" strokeWidth="0.5" opacity="0.2" />
      <line x1="60" y1="8" x2="60" y2="112" stroke="#4a7fb5" strokeWidth="0.5" opacity="0.2" />
    </svg>
  );
}

function TerminalSection() {
  return (
    <svg viewBox="0 0 120 120" width="120" height="120" xmlns="http://www.w3.org/2000/svg">
      {/* Terminal body */}
      <rect x="10" y="44" width="60" height="32" rx="2" fill="none" stroke="#4a7fb5" strokeWidth="1.5" opacity="0.7" />
      {/* Ferrule */}
      <rect x="22" y="38" width="20" height="44" rx="1" fill="none" stroke="#f59e0b" strokeWidth="1.5" opacity="0.8" />
      {/* Thread */}
      <rect x="70" y="50" width="40" height="20" rx="1" fill="none" stroke="#8fadc8" strokeWidth="1.5" opacity="0.6" />
      {/* Thread lines */}
      {[0,1,2,3,4,5,6,7].map(i => (
        <line key={i} x1={74 + i * 4.5} y1="50" x2={74 + i * 4.5} y2="70" stroke="#8fadc8" strokeWidth="0.8" opacity="0.4" />
      ))}
      {/* Hose bore */}
      <line x1="10" y1="60" x2="70" y2="60" stroke="#4a7fb5" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4" />
      {/* Dimension */}
      <line x1="10" y1="90" x2="70" y2="90" stroke="#4a7fb5" strokeWidth="0.5" opacity="0.3" />
      <line x1="10" y1="87" x2="10" y2="93" stroke="#4a7fb5" strokeWidth="0.8" opacity="0.4" />
      <line x1="70" y1="87" x2="70" y2="93" stroke="#4a7fb5" strokeWidth="0.8" opacity="0.4" />
      <text x="40" y="104" textAnchor="middle" fill="#4a7fb5" fontSize="8" opacity="0.6" fontFamily="monospace">CORPO</text>
    </svg>
  );
}

const tipos = [
  {
    id: 'UMA-TRAMA',
    nome: 'Mangueira 1 trama',
    spec: 'Baixa a média pressão',
    descricao: 'Reforço simples em trama de aço. Indicada para sistemas hidráulicos com pressão de trabalho moderada e boa flexibilidade.',
    aplicacoes: ['Retorno hidráulico', 'Linhas de sucção', 'Fluidos industriais'],
    ilustracao: <CrossSection tramas={1} />,
  },
  {
    id: 'DUAS-TRAMAS',
    nome: 'Mangueira 2 tramas',
    spec: 'Alta pressão',
    descricao: 'Dupla camada de reforço metálico. Para aplicações de alta pressão em sistemas hidráulicos exigentes.',
    aplicacoes: ['Cilindros hidráulicos', 'Prensas industriais', 'Equipamentos pesados'],
    ilustracao: <CrossSection tramas={2} />,
  },
  {
    id: 'PNEUMATICA',
    nome: 'Mangueira pneumática',
    spec: 'Ar comprimido',
    descricao: 'Construção leve e flexível para condução de ar comprimido. Resistente a pressões de trabalho padrão em sistemas pneumáticos.',
    aplicacoes: ['Ar comprimido', 'Ferramentas pneumáticas', 'Automação industrial'],
    ilustracao: <PneumaticSection />,
  },
  {
    id: 'TERMINAL',
    nome: 'Terminais prensados',
    spec: '+200 tipos disponíveis',
    descricao: 'Prensagem realizada no local com prensa própria. Cada terminal recebe etiqueta de rastreamento para reposição futura.',
    aplicacoes: ['BSP / NPT / JIC / DKO', 'Flange SAE / Banjo', 'Aço carbono e inox'],
    ilustracao: <TerminalSection />,
  },
];

export function Mangueiras() {
  return (
    <section id="mangueiras" className="blueprint-bg relative py-20 px-6 md:px-12 overflow-hidden">

      <div className="w-full max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#f59e0b]" />
            <span className="blueprint-tag" style={{ color: '#f59e0b' }}>NOSSA ESPECIALIDADE</span>
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
            MANGUEIRAS <span className="accent">INDUSTRIAIS</span>
          </h2>
          <p className="text-[#8fadc8] mt-3 max-w-xl text-base leading-relaxed">
            Fabricação e prensagem de mangueiras hidráulicas e pneumáticas. Cada peça
            identificada, rastreada e pronta para reposição imediata.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#4a7fb5]/15">
          {tipos.map(({ id, nome, spec, descricao, aplicacoes, ilustracao }) => (
            <div
              key={id}
              className="bg-[#0a1628] p-6 flex flex-col gap-5 group hover:bg-[#0d2040] transition-colors duration-200 relative"
            >
              <span className="blueprint-tag" style={{ fontSize: '9px' }}>{id}</span>

              {/* SVG illustration */}
              <div className="flex justify-center py-2 opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                {ilustracao}
              </div>

              {/* Name + spec */}
              <div>
                <h3
                  className="text-white leading-tight mb-1"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: '1.1rem', letterSpacing: '0.02em' }}
                >
                  {nome}
                </h3>
                <span className="text-[#f59e0b] text-xs font-medium" style={{ letterSpacing: '0.05em' }}>
                  {spec}
                </span>
              </div>

              <p className="text-[#8fadc8] text-sm leading-relaxed flex-1">
                {descricao}
              </p>

              {/* Aplicações */}
              <div className="border-t border-[#4a7fb5]/20 pt-4 flex flex-col gap-1.5">
                {aplicacoes.map((a) => (
                  <div key={a} className="flex items-center gap-2 text-xs text-[#4a7fb5]">
                    <div className="w-1 h-1 bg-[#f59e0b] flex-shrink-0" />
                    {a}
                  </div>
                ))}
              </div>

              {/* Hover line */}
              <div className="absolute bottom-0 left-0 h-px w-0 bg-[#f59e0b] group-hover:w-full transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Processo de prensagem */}
        <div className="mt-px bg-[#4a7fb5]/15">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px">
            {[
              { num: '01', titulo: 'Medição e corte', desc: 'Mangueira cortada no comprimento exato para a aplicação.' },
              { num: '02', titulo: 'Seleção do terminal', desc: 'Terminal escolhido conforme rosca, ângulo e pressão de trabalho.' },
              { num: '03', titulo: 'Prensagem + etiqueta', desc: 'Prensagem hidráulica no local e etiqueta de rastreamento aplicada.' },
            ].map(({ num, titulo, desc }) => (
              <div key={num} className="bg-[#060f1e] px-8 py-6 flex gap-5 items-start">
                <span
                  className="text-[#f59e0b] flex-shrink-0"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '2.5rem', fontWeight: 700, lineHeight: 1, opacity: 0.4 }}
                >
                  {num}
                </span>
                <div>
                  <p
                    className="text-white font-medium mb-1"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '1rem', letterSpacing: '0.05em' }}
                  >
                    {titulo.toUpperCase()}
                  </p>
                  <p className="text-[#8fadc8] text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#f59e0b] text-[#0a1628] font-semibold px-6 py-3 rounded-sm hover:bg-[#fbbf24] transition-colors duration-200"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.08em', fontSize: '1rem' }}
          >
            SOLICITAR ORÇAMENTO DE MANGUEIRA
          </a>
          <a
            href="/mangueiras"
            className="flex items-center gap-2 text-[#8fadc8] border border-[#4a7fb5]/40 px-6 py-3 rounded-sm hover:border-[#4a7fb5] hover:text-white transition-all duration-200"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.08em', fontSize: '1rem' }}
          >
            VER TODOS OS TIPOS
            <span style={{ fontSize: '1rem' }}>→</span>
          </a>
        </div>
      </div>

      <div className="tech-divider mt-20" />
    </section>
  );
}
