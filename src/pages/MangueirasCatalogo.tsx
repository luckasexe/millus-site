import { ArrowLeft } from 'lucide-react';

const WHATSAPP_URL = 'https://wa.me/5513982071346';

// ── SVG Components ──────────────────────────────────────────────

function CrossSection({ tramas }: { tramas: 1 | 2 | 4 }) {
  const configs = {
    1: { outerR: 50, outerW: 8, rings: [{ r: 38 }], innerR: 27, boreR: 16 },
    2: { outerR: 50, outerW: 8, rings: [{ r: 40 }, { r: 32 }], innerR: 23, boreR: 13 },
    4: { outerR: 50, outerW: 6, rings: [{ r: 42 }, { r: 37 }, { r: 31 }, { r: 26 }], innerR: 19, boreR: 10 },
  };
  const c = configs[tramas];
  return (
    <svg viewBox="0 0 120 120" width="110" height="110" xmlns="http://www.w3.org/2000/svg">
      <line x1="8" y1="60" x2="112" y2="60" stroke="#4a7fb5" strokeWidth="0.5" opacity="0.2" />
      <line x1="60" y1="8" x2="60" y2="112" stroke="#4a7fb5" strokeWidth="0.5" opacity="0.2" />
      <circle cx="60" cy="60" r={c.outerR} fill="none" stroke="#4a7fb5" strokeWidth={c.outerW} opacity="0.45" />
      {c.rings.map((ring, i) => (
        <circle key={i} cx="60" cy="60" r={ring.r} fill="none" stroke="#f59e0b"
          strokeWidth={tramas === 4 ? 2 : 2.5} strokeDasharray="4 3" opacity={0.9 - i * 0.08} />
      ))}
      <circle cx="60" cy="60" r={c.innerR} fill="rgba(10,22,40,0.9)" stroke="#8fadc8" strokeWidth="1.5" />
      <circle cx="60" cy="60" r={c.boreR} fill="rgba(74,127,181,0.12)" stroke="#4a7fb5" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="60" cy="60" r="2.5" fill="#4a7fb5" opacity="0.5" />
      <line x1="57" y1="9" x2="63" y2="9" stroke="#4a7fb5" strokeWidth="0.8" opacity="0.45" />
      <line x1="57" y1="111" x2="63" y2="111" stroke="#4a7fb5" strokeWidth="0.8" opacity="0.45" />
    </svg>
  );
}

function NaoCondutivaSVG() {
  return (
    <svg viewBox="0 0 120 120" width="110" height="110" xmlns="http://www.w3.org/2000/svg">
      {/* ── Corte transversal centralizado ── */}
      <line x1="8" y1="60" x2="112" y2="60" stroke="#4a7fb5" strokeWidth="0.5" opacity="0.2" />
      <line x1="60" y1="8" x2="60" y2="112" stroke="#4a7fb5" strokeWidth="0.5" opacity="0.2" />
      <circle cx="60" cy="60" r="50" fill="none" stroke="#4a7fb5" strokeWidth="7" opacity="0.4" />
      <circle cx="60" cy="60" r="38" fill="none" stroke="#8fadc8" strokeWidth="2.5" strokeDasharray="1.5 5" opacity="0.65" />
      <circle cx="60" cy="60" r="27" fill="rgba(10,22,40,0.9)" stroke="#8fadc8" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="16" fill="rgba(74,127,181,0.12)" stroke="#4a7fb5" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="60" cy="60" r="2.5" fill="#4a7fb5" opacity="0.5" />
      <line x1="57" y1="9" x2="63" y2="9" stroke="#4a7fb5" strokeWidth="0.8" opacity="0.45" />
      <line x1="57" y1="111" x2="63" y2="111" stroke="#4a7fb5" strokeWidth="0.8" opacity="0.45" />

      {/* ── Símbolo no canto esquerdo ── */}
      <path d="M17 8 L11 21 L15 21 L9 34 L22 17 L18 17 Z" fill="#f59e0b" opacity="0.92" />
      <circle cx="15" cy="21" r="13" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.92" />
      <line x1="5" y1="11" x2="25" y2="31" stroke="#ef4444" strokeWidth="2" opacity="0.92" />
    </svg>
  );
}

function SucaoSVG() {
  const rings = [34, 46, 58, 70, 82, 94, 106, 118, 130, 142];
  return (
    <svg viewBox="0 0 170 90" width="155" height="82" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="tube-clip">
          <rect x="18" y="13" width="138" height="64" />
        </clipPath>
      </defs>

      {/* Guide line */}
      <line x1="5" y1="45" x2="165" y2="45" stroke="#4a7fb5" strokeWidth="0.4" opacity="0.15" strokeDasharray="4 3" />

      {/* Back end cap — dashed (lado oculto) */}
      <ellipse cx="18" cy="45" rx="9" ry="32" fill="none" stroke="#4a7fb5" strokeWidth="1" strokeDasharray="3 3" opacity="0.35" />

      {/* Tube body — arestas superior e inferior */}
      <line x1="18" y1="13" x2="156" y2="13" stroke="#4a7fb5" strokeWidth="1.5" opacity="0.7" />
      <line x1="18" y1="77" x2="156" y2="77" stroke="#4a7fb5" strokeWidth="1.5" opacity="0.7" />

      {/* Espiral (listras) — recortadas ao corpo do tubo */}
      <g clipPath="url(#tube-clip)">
        {rings.map(x => (
          <path key={x} d={`M${x} 13 Q${x + 6} 45 ${x} 77`}
            fill="none" stroke="#f59e0b" strokeWidth="2.2" opacity="0.85" />
        ))}
      </g>

      {/* Tampa frontal — cobre as listras na borda */}
      <ellipse cx="156" cy="45" rx="11" ry="32" fill="rgba(10,22,40,0.9)" stroke="#4a7fb5" strokeWidth="1.5" opacity="0.85" />

      {/* Furo interno (bore) */}
      <ellipse cx="156" cy="45" rx="6" ry="18" fill="rgba(74,127,181,0.15)" stroke="#8fadc8" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="156" cy="45" r="2" fill="#4a7fb5" opacity="0.45" />
    </svg>
  );
}

function CombustivelSVG() {
  return (
    <svg viewBox="0 0 120 120" width="110" height="110" xmlns="http://www.w3.org/2000/svg">
      {/* Guide lines */}
      <line x1="8" y1="60" x2="112" y2="60" stroke="#4a7fb5" strokeWidth="0.5" opacity="0.2" />
      <line x1="60" y1="8" x2="60" y2="112" stroke="#4a7fb5" strokeWidth="0.5" opacity="0.2" />
      {/* Outer cover */}
      <circle cx="60" cy="60" r="50" fill="none" stroke="#4a7fb5" strokeWidth="8" opacity="0.45" />
      {/* Trama — single braid */}
      <circle cx="60" cy="60" r="38" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 3" opacity="0.85" />
      {/* Inner tube — chemical-resistant layer */}
      <circle cx="60" cy="60" r="27" fill="rgba(10,22,40,0.9)" stroke="#8fadc8" strokeWidth="1.5" />
      {/* Inner chemical-resistant highlight ring */}
      <circle cx="60" cy="60" r="20" fill="none" stroke="#f59e0b" strokeWidth="0.8" opacity="0.3" strokeDasharray="2 3" />
      {/* Fuel drop — gota de combustível no centro */}
      <path d="M60 44 Q71 52 69 63 Q67 74 60 76 Q53 74 51 63 Q49 52 60 44Z"
        fill="#f59e0b" opacity="0.75" />
      <path d="M60 44 Q71 52 69 63 Q67 74 60 76 Q53 74 51 63 Q49 52 60 44Z"
        fill="none" stroke="#f59e0b" strokeWidth="1.2" opacity="0.95" />
      {/* Shine on drop */}
      <path d="M57 50 Q55 55 56 59" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Tick marks */}
      <line x1="57" y1="9" x2="63" y2="9" stroke="#4a7fb5" strokeWidth="0.8" opacity="0.45" />
      <line x1="57" y1="111" x2="63" y2="111" stroke="#4a7fb5" strokeWidth="0.8" opacity="0.45" />
    </svg>
  );
}

function InoxSVG() {
  const top = "M10 26 Q17.5 17 25 26 Q32.5 35 40 26 Q47.5 17 55 26 Q62.5 35 70 26 Q77.5 17 85 26 Q92.5 35 100 26 Q107.5 17 115 26 Q122.5 35 130 26 Q137.5 17 145 26";
  const bot = "M10 54 Q17.5 63 25 54 Q32.5 45 40 54 Q47.5 63 55 54 Q62.5 45 70 54 Q77.5 63 85 54 Q92.5 45 100 54 Q107.5 63 115 54 Q122.5 45 130 54 Q137.5 63 145 54";
  const peaks = [10, 25, 40, 55, 70, 85, 100, 115, 130, 145];
  return (
    <svg viewBox="0 0 158 82" width="148" height="76" xmlns="http://www.w3.org/2000/svg">
      {/* Guide */}
      <line x1="5" y1="40" x2="153" y2="40" stroke="#4a7fb5" strokeWidth="0.4" opacity="0.15" strokeDasharray="4 3" />
      {/* Outer braid (sutil) */}
      <path d={top} fill="none" stroke="#4a7fb5" strokeWidth="5" opacity="0.18" />
      <path d={bot} fill="none" stroke="#4a7fb5" strokeWidth="5" opacity="0.18" />
      {/* Corrugação — arestas superior e inferior */}
      <path d={top} fill="none" stroke="#8fadc8" strokeWidth="1.8" opacity="0.9" />
      <path d={bot} fill="none" stroke="#8fadc8" strokeWidth="1.8" opacity="0.9" />
      {/* Linhas verticais nas cristas (anéis da corrugação) */}
      {peaks.map(x => (
        <line key={x} x1={x} y1="26" x2={x} y2="54" stroke="#8fadc8" strokeWidth="0.9" opacity="0.38" />
      ))}
      {/* Tampas laterais */}
      <line x1="10" y1="17" x2="10" y2="63" stroke="#4a7fb5" strokeWidth="2" opacity="0.65" />
      <line x1="145" y1="17" x2="145" y2="63" stroke="#4a7fb5" strokeWidth="2" opacity="0.65" />
      {/* Bore */}
      <line x1="10" y1="40" x2="145" y2="40" stroke="#4a7fb5" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.22" />
      {/* Spec label */}
      <text x="77" y="76" textAnchor="middle" fill="#8fadc8" fontSize="8" fontFamily="monospace" letterSpacing="2" opacity="0.65">INOX 304</text>
    </svg>
  );
}

function PneumaticaSVG() {
  return (
    <svg viewBox="0 0 120 120" width="110" height="110" xmlns="http://www.w3.org/2000/svg">
      <line x1="8" y1="60" x2="112" y2="60" stroke="#4a7fb5" strokeWidth="0.5" opacity="0.2" />
      <line x1="60" y1="8" x2="60" y2="112" stroke="#4a7fb5" strokeWidth="0.5" opacity="0.2" />
      <circle cx="60" cy="60" r="50" fill="none" stroke="#4a7fb5" strokeWidth="5" opacity="0.45" />
      <circle cx="60" cy="60" r="38" fill="none" stroke="#8fadc8" strokeWidth="2" strokeDasharray="6 3" opacity="0.55" />
      <circle cx="60" cy="60" r="26" fill="rgba(10,22,40,0.85)" stroke="#4a7fb5" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="14" fill="rgba(74,127,181,0.18)" stroke="#4a7fb5" strokeWidth="1" strokeDasharray="2 2" />
      {/* Air arrows — centered at y=60 */}
      <path d="M52 63 L60 55 L68 63" fill="none" stroke="#4a7fb5" strokeWidth="1.2" opacity="0.5" />
      <path d="M52 57 L60 65 L68 57" fill="none" stroke="#4a7fb5" strokeWidth="1.2" opacity="0.5" />
    </svg>
  );
}

// ── Terminal SVGs ─────────────────────────────────────────────

function TerminalSVG({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 150 82" width="140" height="76" xmlns="http://www.w3.org/2000/svg">
      {/* Hex body */}
      <rect x="8" y="18" width="38" height="34" rx="2" fill="none" stroke="#4a7fb5" strokeWidth="1.5" opacity="0.7" />
      {/* Shoulder */}
      <rect x="46" y="23" width="10" height="24" fill="none" stroke="#4a7fb5" strokeWidth="1" opacity="0.5" />
      {/* Thread body */}
      <rect x="56" y="26" width="80" height="18" fill="none" stroke="#4a7fb5" strokeWidth="1.2" opacity="0.65" />
      {/* Thread lines — evenly spaced */}
      {Array.from({ length: 10 }, (_, i) => (
        <line key={i} x1={61 + i * 7.5} y1="26" x2={61 + i * 7.5} y2="44"
          stroke="#8fadc8" strokeWidth="0.8" opacity="0.45" />
      ))}
      {/* End face */}
      <line x1="136" y1="26" x2="136" y2="44" stroke="#4a7fb5" strokeWidth="2" opacity="0.7" />
      {/* Bore */}
      <line x1="8" y1="35" x2="136" y2="35" stroke="#4a7fb5" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.25" />
      {/* Label — com espaço extra abaixo do desenho */}
      <text x="72" y="72" textAnchor="middle" fill="#4a7fb5" fontSize="8" fontFamily="monospace" letterSpacing="1" opacity="0.7">{label}</text>
    </svg>
  );
}

function TerminalFlangeSVG() {
  return (
    <svg viewBox="0 0 150 82" width="140" height="76" xmlns="http://www.w3.org/2000/svg">
      {/* Flange plate — edge view */}
      <rect x="8" y="10" width="12" height="50" rx="1" fill="none" stroke="#4a7fb5" strokeWidth="1.5" opacity="0.7" />
      {/* Bolt holes (amber — highlight the bolt pattern) */}
      <circle cx="14" cy="19" r="3" fill="none" stroke="#f59e0b" strokeWidth="1.4" opacity="0.85" />
      <circle cx="14" cy="51" r="3" fill="none" stroke="#f59e0b" strokeWidth="1.4" opacity="0.85" />
      {/* Hose nipple extending right */}
      <rect x="20" y="26" width="108" height="18" fill="none" stroke="#4a7fb5" strokeWidth="1.2" opacity="0.65" />
      {/* Barb/thread lines */}
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1={26 + i * 8.5} y1="26" x2={26 + i * 8.5} y2="44"
          stroke="#8fadc8" strokeWidth="0.8" opacity="0.45" />
      ))}
      {/* End cap */}
      <line x1="128" y1="26" x2="128" y2="44" stroke="#4a7fb5" strokeWidth="2" opacity="0.7" />
      {/* Bore */}
      <line x1="8" y1="35" x2="128" y2="35" stroke="#4a7fb5" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.25" />
      <text x="72" y="72" textAnchor="middle" fill="#4a7fb5" fontSize="8" fontFamily="monospace" letterSpacing="1" opacity="0.7">FLANGE SAE</text>
    </svg>
  );
}

function TerminalBanjoSVG() {
  // Anel à DIREITA, espiga da mangueira sai à ESQUERDA — como na peça real
  return (
    <svg viewBox="0 0 150 82" width="140" height="76" xmlns="http://www.w3.org/2000/svg">
      {/* Anel banjo (elemento principal, lado esquerdo) */}
      <circle cx="38" cy="38" r="24" fill="none" stroke="#4a7fb5" strokeWidth="2" opacity="0.82" />
      {/* Furo central do anel */}
      <circle cx="38" cy="38" r="11" fill="rgba(10,22,40,0.95)" stroke="#4a7fb5" strokeWidth="1.5" opacity="0.65" />

      {/* Colar de transição anel → espiga */}
      <rect x="69" y="26" width="13" height="24" rx="1" fill="none" stroke="#4a7fb5" strokeWidth="1.5" opacity="0.7" />

      {/* Espiga/barb da mangueira (lado direito) */}
      <rect x="82" y="32" width="60" height="12" fill="none" stroke="#4a7fb5" strokeWidth="1.5" opacity="0.7" />
      {/* Nervuras da espiga */}
      {Array.from({ length: 8 }, (_, i) => (
        <line key={i} x1={136 - i * 7} y1="32" x2={136 - i * 7} y2="44"
          stroke="#8fadc8" strokeWidth="1.2" opacity="0.55" />
      ))}

      {/* Linha de bore central */}
      <line x1="62" y1="38" x2="142" y2="38" stroke="#4a7fb5" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.25" />

      <text x="72" y="72" textAnchor="middle" fill="#4a7fb5" fontSize="8" fontFamily="monospace" letterSpacing="1" opacity="0.7">BANJO</text>
    </svg>
  );
}

// ── Data ──────────────────────────────────────────────────────

const mangueiras = [
  {
    id: 'UMA-TRAMA',
    nome: 'Mangueira 1 trama',
    spec: 'Baixa a média pressão',
    descricao: 'Reforço simples em trama de aço. Indicada para sistemas hidráulicos com pressão de trabalho moderada e boa flexibilidade.',
    aplicacoes: ['Retorno hidráulico', 'Linhas de sucção leve', 'Fluidos industriais gerais'],
    svg: <CrossSection tramas={1} />,
  },
  {
    id: 'DUAS-TRAMAS',
    nome: 'Mangueira 2 tramas',
    spec: 'Alta pressão',
    descricao: 'Dupla camada de reforço metálico. Para aplicações de alta pressão em sistemas hidráulicos exigentes.',
    aplicacoes: ['Cilindros hidráulicos', 'Prensas industriais', 'Equipamentos pesados'],
    svg: <CrossSection tramas={2} />,
  },
  {
    id: 'QUATRO-TRAMAS',
    nome: 'Mangueira 4 tramas',
    spec: 'Altíssima pressão',
    descricao: 'Quatro camadas de reforço espiral metálico. Para sistemas de altíssima pressão onde resistência estrutural é crítica.',
    aplicacoes: ['Mineração', 'Perfuração industrial', 'Prensas de alta tonelagem'],
    svg: <CrossSection tramas={4} />,
  },
  {
    id: 'NAO-CONDUTIVA',
    nome: 'Mangueira não condutiva',
    spec: 'Isolamento elétrico',
    descricao: 'Construção sem reforço metálico. Indicada para ambientes com risco elétrico, onde a condução de corrente deve ser eliminada.',
    aplicacoes: ['Proximidade a cabos elétricos', 'Equipamentos de mineração', 'Segurança NR-10'],
    svg: <NaoCondutivaSVG />,
  },
  {
    id: 'SUCCAO',
    nome: 'Mangueira de sucção',
    spec: 'Vácuo e pressão',
    descricao: 'Reforço interno em espiral metálica que impede o colapso da mangueira em linhas de sucção. Vista lateral com espiral visível.',
    aplicacoes: ['Sucção de bombas hidráulicas', 'Retorno sob vácuo', 'Transferência de fluidos'],
    svg: <SucaoSVG />,
  },
  {
    id: 'COMBUSTIVEL',
    nome: 'Mangueira de combustível',
    spec: 'Resistente a hidrocarbonetos',
    descricao: 'Tubo interno resistente a combustíveis, óleos e hidrocarbonetos. Atende às normas para condução segura de diesel e biodiesel.',
    aplicacoes: ['Diesel e gasolina', 'Biodiesel', 'Transferência de óleo lubrificante'],
    svg: <CombustivelSVG />,
  },
  {
    id: 'INOX',
    nome: 'Mangueira de inox',
    spec: 'Aço inoxidável 304',
    descricao: 'Tubo corrugado em aço inoxidável com trança metálica externa. Alta resistência à corrosão, temperatura e pressão. Ideal para aplicações agressivas.',
    aplicacoes: ['Alta temperatura', 'Fluidos corrosivos', 'Indústria alimentícia e química'],
    svg: <InoxSVG />,
  },
  {
    id: 'PNEUMATICA',
    nome: 'Mangueira pneumática',
    spec: 'Ar comprimido',
    descricao: 'Construção leve e flexível para condução de ar comprimido. Resistente a pressões de trabalho padrão em sistemas pneumáticos.',
    aplicacoes: ['Ar comprimido', 'Ferramentas pneumáticas', 'Automação industrial'],
    svg: <PneumaticaSVG />,
  },
];

const terminais = [
  {
    id: 'BSP',
    nome: 'BSP',
    spec: 'British Standard Pipe',
    descricao: 'Rosca paralela de padrão britânico. Vedação por anel de vedação ou fita veda-rosca. Muito comum em sistemas europeus e no Brasil.',
    svg: <TerminalSVG label="ROSCA PARALELA" />,
  },
  {
    id: 'NPT',
    nome: 'NPT',
    spec: 'National Pipe Thread',
    descricao: 'Rosca cônica americana. A vedação é feita pelo próprio aperto da rosca cônica. Amplamente encontrado em equipamentos importados dos EUA.',
    svg: <TerminalSVG label="ROSCA CÔNICA" />,
  },
  {
    id: 'JIC',
    nome: 'JIC',
    spec: 'Joint Industry Council — Flare 37°',
    descricao: 'Conexão por cone de 37°. A vedação é feita pelo contato metálico do flare. Alta resistência a pressão, comum em sistemas hidráulicos de precisão.',
    svg: <TerminalSVG label="FLARE 37°" />,
  },
  {
    id: 'DKO',
    nome: 'DKO',
    spec: 'Deutsches Kraftfahrzeugamt',
    descricao: 'Conexão por anel de corte (cutting ring). O anel morde o tubo ao ser apertado, vedando sem necessidade de flare ou solda. Padrão alemão/europeu.',
    svg: <TerminalSVG label="ANEL DE CORTE" />,
  },
  {
    id: 'FLANGE',
    nome: 'Flange',
    spec: 'SAE Split Flange',
    descricao: 'Conexão flangeada por parafusos. Ideal para altas pressões e grandes diâmetros onde rosca convencional não é viável. Padrão SAE J518.',
    svg: <TerminalFlangeSVG />,
  },
  {
    id: 'BANJO',
    nome: 'Banjo',
    spec: 'Parafuso banjo',
    descricao: 'Parafuso oco com furo transversal para passagem de fluido. Permite conexão em ângulo em espaços reduzidos. Muito usado em sistemas de freio e direção hidráulica.',
    svg: <TerminalBanjoSVG />,
  },
];

// ── Page ──────────────────────────────────────────────────────

export function MangueirasCatalogo() {
  return (
    <div className="blueprint-bg min-h-screen px-6 md:px-12 py-12">
      <div className="w-full max-w-7xl mx-auto">

        {/* Back link */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-[#4a7fb5] hover:text-white transition-colors duration-200 mb-10 text-sm"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.08em' }}
        >
          <ArrowLeft size={14} />
          VOLTAR PARA O INÍCIO
        </a>

        {/* ── Seção 1: Mangueiras ── */}
        <div className="mb-20">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#f59e0b]" />
              <span className="blueprint-tag" style={{ color: '#f59e0b' }}>CATÁLOGO // SEÇÃO 01</span>
            </div>
            <h1
              className="text-white"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                lineHeight: 1.1,
              }}
            >
              TIPOS DE <span style={{ color: '#f59e0b' }}>MANGUEIRA</span>
            </h1>
            <p className="text-[#8fadc8] mt-3 max-w-xl text-base leading-relaxed">
              Trabalhamos com as principais linhas de mangueiras industriais, hidráulicas e pneumáticas.
              Prensagem no local, rastreamento por etiqueta e entrega rápida.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-[#4a7fb5]/15">
            {mangueiras.map(({ id, nome, spec, descricao, aplicacoes, svg }) => (
              <div
                key={id}
                className="bg-[#0a1628] p-6 flex flex-col gap-4 group hover:bg-[#0d2040] transition-colors duration-200 relative"
              >
                <span className="blueprint-tag" style={{ fontSize: '9px' }}>{id}</span>

                <div className="flex justify-center items-center py-3 opacity-80 group-hover:opacity-100 transition-opacity duration-200" style={{ minHeight: 110 }}>
                  {svg}
                </div>

                <div>
                  <h2 className="text-white leading-tight mb-1"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: '1.05rem', letterSpacing: '0.02em' }}>
                    {nome}
                  </h2>
                  <span className="text-[#f59e0b] text-xs font-medium" style={{ letterSpacing: '0.05em' }}>{spec}</span>
                </div>

                <p className="text-[#8fadc8] text-sm leading-relaxed flex-1">{descricao}</p>

                <div className="border-t border-[#4a7fb5]/20 pt-4 flex flex-col gap-1.5">
                  {aplicacoes.map((a) => (
                    <div key={a} className="flex items-center gap-2 text-xs text-[#4a7fb5]">
                      <div className="w-1 h-1 bg-[#f59e0b] flex-shrink-0" />
                      {a}
                    </div>
                  ))}
                </div>

                <div className="absolute bottom-0 left-0 h-px w-0 bg-[#f59e0b] group-hover:w-full transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Seção 2: Terminais ── */}
        <div className="mb-16">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#4a7fb5]" />
              <span className="blueprint-tag">CATÁLOGO // SEÇÃO 02</span>
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
              TERMINAIS E <span style={{ color: '#f59e0b' }}>CONEXÕES</span>
            </h2>
            <p className="text-[#8fadc8] mt-3 max-w-xl text-base leading-relaxed">
              Mais de 200 tipos de terminal disponíveis em estoque. Prensagem hidráulica no local
              com etiqueta de rastreamento em cada peça.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#4a7fb5]/15">
            {terminais.map(({ id, nome, spec, descricao, svg }) => (
              <div
                key={id}
                className="bg-[#0a1628] p-6 flex flex-col gap-4 group hover:bg-[#0d2040] transition-colors duration-200 relative"
              >
                <span className="blueprint-tag" style={{ fontSize: '9px' }}>TERM-{id}</span>

                {/* Terminal name large */}
                <p className="text-[#f59e0b]"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '2rem', lineHeight: 1 }}>
                  {nome}
                </p>

                <div className="flex justify-center items-center py-2 opacity-75 group-hover:opacity-100 transition-opacity duration-200">
                  {svg}
                </div>

                <div>
                  <p className="text-white text-xs font-medium mb-2" style={{ letterSpacing: '0.05em' }}>{spec}</p>
                  <p className="text-[#8fadc8] text-sm leading-relaxed">{descricao}</p>
                </div>

                <div className="absolute bottom-0 left-0 h-px w-0 bg-[#f59e0b] group-hover:w-full transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pb-4">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#f59e0b] text-[#0a1628] font-semibold px-6 py-3 rounded-sm hover:bg-[#fbbf24] transition-colors duration-200"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.08em', fontSize: '1rem' }}
          >
            SOLICITAR ORÇAMENTO
          </a>
          <span className="text-[#4a7fb5] text-sm">Atendimento direto via WhatsApp — (13) 98207-1346</span>
        </div>

      </div>
    </div>
  );
}
