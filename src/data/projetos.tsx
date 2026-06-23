export interface Projeto {
  slug: string;
  ref: string;
  nome: string;
  categoria: string;
  descricao: string;
  descricaoLonga: string;
  tags: string[];
  img: string;
  galeria: string[];
  specs: { label: string; valor: string }[];
  svgTecnico: React.ReactNode;
}

function GaiolaSVG() {
  return (
    <svg viewBox="0 0 420 280" width="100%" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: 640 }}>
      {/* ── VISTA FRONTAL (esquerda) ── */}
      <text x="95" y="16" textAnchor="middle" fill="#4a7fb5" fontSize="8" fontFamily="monospace" letterSpacing="1" opacity="0.6">VISTA FRONTAL</text>

      {/* Estrutura externa */}
      <rect x="30" y="24" width="130" height="110" rx="1" fill="none" stroke="#4a7fb5" strokeWidth="1.8" opacity="0.8" />
      {/* Barras verticais */}
      {[56, 82, 108].map(x => <line key={x} x1={x} y1="24" x2={x} y2="134" stroke="#4a7fb5" strokeWidth="1" opacity="0.4" />)}
      {/* Barras horizontais */}
      {[51, 78, 106].map(y => <line key={y} x1="30" y1={y} x2="160" y2={y} stroke="#4a7fb5" strokeWidth="1" opacity="0.4" />)}
      {/* Ponto de içamento */}
      <line x1="95" y1="18" x2="95" y2="24" stroke="#f59e0b" strokeWidth="2" opacity="0.9" />
      <path d="M85 18 Q95 8 105 18" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.9" />
      <circle cx="95" cy="7" r="4.5" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.9" />
      {/* Porta (lado direito) */}
      <rect x="126" y="52" width="34" height="82" rx="1" fill="rgba(100,155,220,0.04)" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="4 2" opacity="0.7" />
      <text x="143" y="96" textAnchor="middle" fill="#f59e0b" fontSize="7" fontFamily="monospace" opacity="0.7">PORTA</text>
      {/* Base reforçada */}
      <rect x="22" y="132" width="146" height="10" rx="1" fill="none" stroke="#4a7fb5" strokeWidth="1.5" opacity="0.65" />
      {/* Pés */}
      {[35, 155].map(x => <g key={x}>
        <rect x={x - 8} y="142" width="16" height="12" rx="1" fill="none" stroke="#4a7fb5" strokeWidth="1.2" opacity="0.5" />
        <line x1={x} y1="154" x2={x} y2="162" stroke="#4a7fb5" strokeWidth="2" opacity="0.5" />
      </g>)}

      {/* Cotas — largura */}
      <line x1="30" y1="172" x2="160" y2="172" stroke="#4a7fb5" strokeWidth="0.7" opacity="0.4" />
      <line x1="30" y1="168" x2="30" y2="176" stroke="#4a7fb5" strokeWidth="0.7" opacity="0.5" />
      <line x1="160" y1="168" x2="160" y2="176" stroke="#4a7fb5" strokeWidth="0.7" opacity="0.5" />
      <text x="95" y="170" textAnchor="middle" fill="#4a7fb5" fontSize="7" fontFamily="monospace" opacity="0.55">L = 900 mm</text>

      {/* Cotas — altura */}
      <line x1="14" y1="24" x2="14" y2="162" stroke="#4a7fb5" strokeWidth="0.7" opacity="0.4" />
      <line x1="10" y1="24" x2="18" y2="24" stroke="#4a7fb5" strokeWidth="0.7" opacity="0.5" />
      <line x1="10" y1="162" x2="18" y2="162" stroke="#4a7fb5" strokeWidth="0.7" opacity="0.5" />
      <text x="10" y="97" textAnchor="middle" fill="#4a7fb5" fontSize="7" fontFamily="monospace" opacity="0.55" transform="rotate(-90,10,97)">H = 1200 mm</text>

      {/* ── VISTA LATERAL (direita) ── */}
      <text x="295" y="16" textAnchor="middle" fill="#4a7fb5" fontSize="8" fontFamily="monospace" letterSpacing="1" opacity="0.6">VISTA LATERAL</text>
      <rect x="220" y="24" width="150" height="110" rx="1" fill="none" stroke="#4a7fb5" strokeWidth="1.8" opacity="0.8" />
      {[246, 272, 298, 324, 346].map(x => <line key={x} x1={x} y1="24" x2={x} y2="134" stroke="#4a7fb5" strokeWidth="0.8" opacity="0.35" />)}
      {[51, 78, 106].map(y => <line key={y} x1="220" y1={y} x2="370" y2={y} stroke="#4a7fb5" strokeWidth="0.8" opacity="0.35" />)}
      {/* Ponto de içamento */}
      <line x1="295" y1="18" x2="295" y2="24" stroke="#f59e0b" strokeWidth="2" opacity="0.9" />
      <path d="M285 18 Q295 8 305 18" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.9" />
      <circle cx="295" cy="7" r="4.5" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.9" />
      <rect x="212" y="132" width="166" height="10" rx="1" fill="none" stroke="#4a7fb5" strokeWidth="1.5" opacity="0.65" />
      {[228, 362].map(x => <g key={x}>
        <rect x={x - 8} y="142" width="16" height="12" rx="1" fill="none" stroke="#4a7fb5" strokeWidth="1.2" opacity="0.5" />
        <line x1={x} y1="154" x2={x} y2="162" stroke="#4a7fb5" strokeWidth="2" opacity="0.5" />
      </g>)}
      {/* Cota profundidade */}
      <line x1="220" y1="172" x2="370" y2="172" stroke="#4a7fb5" strokeWidth="0.7" opacity="0.4" />
      <line x1="220" y1="168" x2="220" y2="176" stroke="#4a7fb5" strokeWidth="0.7" opacity="0.5" />
      <line x1="370" y1="168" x2="370" y2="176" stroke="#4a7fb5" strokeWidth="0.7" opacity="0.5" />
      <text x="295" y="170" textAnchor="middle" fill="#4a7fb5" fontSize="7" fontFamily="monospace" opacity="0.55">P = 1000 mm</text>

      {/* ── TABELA / TÍTULO BLOCK ── */}
      <rect x="10" y="195" width="400" height="76" rx="1" fill="none" stroke="#4a7fb5" strokeWidth="1" opacity="0.4" />
      <line x1="10" y1="215" x2="410" y2="215" stroke="#4a7fb5" strokeWidth="0.7" opacity="0.3" />
      <line x1="200" y1="195" x2="200" y2="271" stroke="#4a7fb5" strokeWidth="0.7" opacity="0.3" />
      <line x1="10" y1="240" x2="200" y2="240" stroke="#4a7fb5" strokeWidth="0.5" opacity="0.25" />
      <line x1="10" y1="256" x2="200" y2="256" stroke="#4a7fb5" strokeWidth="0.5" opacity="0.25" />
      <text x="105" y="209" textAnchor="middle" fill="#f59e0b" fontSize="8" fontFamily="monospace" letterSpacing="1" opacity="0.8">MILLUS ACESSÓRIOS INDUSTRIAIS</text>
      <text x="105" y="232" textAnchor="middle" fill="#e2eaf5" fontSize="9" fontFamily="'Barlow Condensed', sans-serif" fontWeight="700" opacity="0.85">GAIOLA DE RESGATE</text>
      <text x="20" y="252" fill="#4a7fb5" fontSize="7" fontFamily="monospace" opacity="0.6">MATERIAL: AÇO CARBONO ASTM A36</text>
      <text x="20" y="268" fill="#4a7fb5" fontSize="7" fontFamily="monospace" opacity="0.6">ACABAMENTO: PINTURA EPÓXI INDUSTRIAL</text>
      <text x="210" y="225" fill="#4a7fb5" fontSize="7" fontFamily="monospace" opacity="0.6">REF: PROJ-01</text>
      <text x="210" y="240" fill="#4a7fb5" fontSize="7" fontFamily="monospace" opacity="0.6">NORMA: NR-33 / NBR 16068</text>
      <text x="210" y="255" fill="#4a7fb5" fontSize="7" fontFamily="monospace" opacity="0.6">ESCALA: 1:10</text>
      <text x="210" y="268" fill="#4a7fb5" fontSize="7" fontFamily="monospace" opacity="0.6">REV: A</text>
    </svg>
  );
}

function PeneiraSVG() {
  return (
    <svg viewBox="0 0 420 280" width="100%" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: 640 }}>
      {/* ── VISTA LATERAL ── */}
      <text x="190" y="14" textAnchor="middle" fill="#4a7fb5" fontSize="8" fontFamily="monospace" letterSpacing="1" opacity="0.6">VISTA LATERAL — INCLINAÇÃO 15°</text>

      {/* Corpo inclinado */}
      <path d="M30 60 L360 38 L360 108 L30 130 Z" fill="none" stroke="#4a7fb5" strokeWidth="2" opacity="0.8" />

      {/* Tela interna (malha) */}
      {[0,1,2,3,4,5,6,7,8,9].map(i => {
        const x = 38 + i * 32;
        const yTop = 60 + (x - 30) * (38 - 60) / (360 - 30);
        const yBot = 130 + (x - 30) * (108 - 130) / (360 - 30);
        return <line key={i} x1={x} y1={yTop + 6} x2={x} y2={yBot - 6} stroke="#8fadc8" strokeWidth="0.8" opacity="0.35" />;
      })}
      {[0,1,2,3].map(i => {
        const t = (i + 1) / 5;
        const x1 = 30, x2 = 360;
        const y1 = 60 + t * (130 - 60) + 4;
        const y2 = 38 + t * (108 - 38) + 4;
        return <line key={i} x1={x1 + 4} y1={y1} x2={x2 - 4} y2={y2} stroke="#8fadc8" strokeWidth="0.8" opacity="0.35" />;
      })}

      {/* Motor vibrador */}
      <ellipse cx="310" cy="65" rx="22" ry="16" fill="rgba(245,158,11,0.08)" stroke="#f59e0b" strokeWidth="2" opacity="0.9" />
      <text x="310" y="69" textAnchor="middle" fill="#f59e0b" fontSize="8" fontFamily="monospace" fontWeight="bold" opacity="0.9">VIB</text>
      {/* Setas de vibração */}
      {[-12, -6, 0, 6, 12].map(dx => (
        <line key={dx} x1={310 + dx} y1="50" x2={310 + dx} y2="44" stroke="#f59e0b" strokeWidth="1" opacity="0.5" />
      ))}
      <path d="M295 44 L310 38 L325 44" fill="none" stroke="#f59e0b" strokeWidth="1.2" opacity="0.6" />

      {/* Suportes com molas */}
      {[70, 330].map(x => {
        const baseY = x === 70 ? 130 : 108;
        return <g key={x}>
          {/* Mola estilizada */}
          {[0,1,2,3].map(i => (
            <line key={i} x1={x - 8 + (i % 2) * 16} y1={baseY + 4 + i * 8} x2={x + 8 - (i % 2) * 16} y2={baseY + 12 + i * 8} stroke="#4a7fb5" strokeWidth="1.2" opacity="0.5" />
          ))}
          <line x1={x} y1={baseY + 36} x2={x} y2={baseY + 46} stroke="#4a7fb5" strokeWidth="2" opacity="0.55" />
          <rect x={x - 16} y={baseY + 46} width="32" height="8" rx="1" fill="none" stroke="#4a7fb5" strokeWidth="1.2" opacity="0.5" />
        </g>;
      })}

      {/* Entrada de material */}
      <rect x="14" y="44" width="24" height="24" rx="1" fill="none" stroke="#4a7fb5" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.6" />
      <text x="26" y="75" textAnchor="middle" fill="#4a7fb5" fontSize="6" fontFamily="monospace" opacity="0.5">FEED</text>
      <line x1="26" y1="68" x2="30" y2="60" stroke="#4a7fb5" strokeWidth="1" opacity="0.4" strokeDasharray="2 2" />

      {/* Saída de material */}
      <rect x="354" y="115" width="24" height="20" rx="1" fill="none" stroke="#4a7fb5" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.6" />
      <text x="366" y="148" textAnchor="middle" fill="#4a7fb5" fontSize="6" fontFamily="monospace" opacity="0.5">OUT</text>

      {/* Cota comprimento */}
      <line x1="30" y1="170" x2="360" y2="170" stroke="#4a7fb5" strokeWidth="0.7" opacity="0.4" />
      <line x1="30" y1="166" x2="30" y2="174" stroke="#4a7fb5" strokeWidth="0.7" opacity="0.5" />
      <line x1="360" y1="166" x2="360" y2="174" stroke="#4a7fb5" strokeWidth="0.7" opacity="0.5" />
      <text x="195" y="168" textAnchor="middle" fill="#4a7fb5" fontSize="7" fontFamily="monospace" opacity="0.55">L = 2500 mm</text>

      {/* ── TÍTULO BLOCK ── */}
      <rect x="10" y="190" width="400" height="82" rx="1" fill="none" stroke="#4a7fb5" strokeWidth="1" opacity="0.4" />
      <line x1="10" y1="210" x2="410" y2="210" stroke="#4a7fb5" strokeWidth="0.7" opacity="0.3" />
      <line x1="210" y1="190" x2="210" y2="272" stroke="#4a7fb5" strokeWidth="0.7" opacity="0.3" />
      <line x1="10" y1="236" x2="210" y2="236" stroke="#4a7fb5" strokeWidth="0.5" opacity="0.25" />
      <line x1="10" y1="254" x2="210" y2="254" stroke="#4a7fb5" strokeWidth="0.5" opacity="0.25" />
      <text x="110" y="204" textAnchor="middle" fill="#f59e0b" fontSize="8" fontFamily="monospace" letterSpacing="1" opacity="0.8">MILLUS ACESSÓRIOS INDUSTRIAIS</text>
      <text x="110" y="228" textAnchor="middle" fill="#e2eaf5" fontSize="9" fontFamily="'Barlow Condensed', sans-serif" fontWeight="700" opacity="0.85">PENEIRA VIBRATÓRIA</text>
      <text x="20" y="248" fill="#4a7fb5" fontSize="7" fontFamily="monospace" opacity="0.6">ESTRUTURA: AÇO ASTM A36</text>
      <text x="20" y="264" fill="#4a7fb5" fontSize="7" fontFamily="monospace" opacity="0.6">TELA: MALHA DE AÇO INOX 304</text>
      <text x="220" y="220" fill="#4a7fb5" fontSize="7" fontFamily="monospace" opacity="0.6">REF: PROJ-02</text>
      <text x="220" y="236" fill="#4a7fb5" fontSize="7" fontFamily="monospace" opacity="0.6">INCLINAÇÃO: 15°</text>
      <text x="220" y="252" fill="#4a7fb5" fontSize="7" fontFamily="monospace" opacity="0.6">ESCALA: 1:20</text>
      <text x="220" y="268" fill="#4a7fb5" fontSize="7" fontFamily="monospace" opacity="0.6">REV: A</text>
    </svg>
  );
}

function EscadaSVG() {
  return (
    <svg viewBox="0 0 420 280" width="100%" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: 640 }}>
      {/* ── VISTA FRONTAL (esquerda) ── */}
      <text x="95" y="14" textAnchor="middle" fill="#4a7fb5" fontSize="8" fontFamily="monospace" letterSpacing="1" opacity="0.6">VISTA FRONTAL</text>

      {/* Montantes */}
      <line x1="55" y1="20" x2="55" y2="188" stroke="#4a7fb5" strokeWidth="2.5" opacity="0.8" />
      <line x1="135" y1="20" x2="135" y2="188" stroke="#4a7fb5" strokeWidth="2.5" opacity="0.8" />

      {/* Degraus */}
      {[30, 50, 70, 90, 110, 130, 150, 170].map(y => (
        <line key={y} x1="55" y1={y} x2="135" y2={y} stroke="#4a7fb5" strokeWidth="3" opacity="0.75" />
      ))}

      {/* Crinolina — arcos */}
      {[40, 80, 120, 160].map(y => (
        <path key={y} d={`M55 ${y} Q95 ${y - 34} 135 ${y}`} fill="none" stroke="#f59e0b" strokeWidth="1.8" opacity="0.75" />
      ))}
      {/* Barras verticais da crinolina */}
      <line x1="95" y1="20" x2="95" y2="6" stroke="#f59e0b" strokeWidth="1.2" opacity="0.55" strokeDasharray="3 2" />

      {/* Guarda-corpo topo esquerdo */}
      <line x1="30" y1="20" x2="30" y2="65" stroke="#4a7fb5" strokeWidth="1.5" opacity="0.55" />
      <line x1="30" y1="20" x2="55" y2="20" stroke="#4a7fb5" strokeWidth="1.5" opacity="0.55" />
      <line x1="30" y1="42" x2="55" y2="42" stroke="#4a7fb5" strokeWidth="1" opacity="0.4" />
      {/* Guarda-corpo topo direito */}
      <line x1="160" y1="20" x2="160" y2="65" stroke="#4a7fb5" strokeWidth="1.5" opacity="0.55" />
      <line x1="135" y1="20" x2="160" y2="20" stroke="#4a7fb5" strokeWidth="1.5" opacity="0.55" />
      <line x1="135" y1="42" x2="160" y2="42" stroke="#4a7fb5" strokeWidth="1" opacity="0.4" />

      {/* Base */}
      <line x1="45" y1="188" x2="145" y2="188" stroke="#4a7fb5" strokeWidth="2" opacity="0.65" />
      {[55, 135].map(x => (
        <rect key={x} x={x - 10} y="188" width="20" height="8" rx="1" fill="none" stroke="#4a7fb5" strokeWidth="1.2" opacity="0.5" />
      ))}

      {/* Cota altura */}
      <line x1="16" y1="20" x2="16" y2="188" stroke="#4a7fb5" strokeWidth="0.7" opacity="0.4" />
      <line x1="12" y1="20" x2="20" y2="20" stroke="#4a7fb5" strokeWidth="0.7" opacity="0.5" />
      <line x1="12" y1="188" x2="20" y2="188" stroke="#4a7fb5" strokeWidth="0.7" opacity="0.5" />
      <text x="12" y="108" textAnchor="middle" fill="#4a7fb5" fontSize="7" fontFamily="monospace" opacity="0.55" transform="rotate(-90,12,108)">H VARIÁVEL</text>

      {/* Cota degraus */}
      <line x1="145" y1="30" x2="145" y2="50" stroke="#4a7fb5" strokeWidth="0.7" opacity="0.4" />
      <line x1="141" y1="30" x2="149" y2="30" stroke="#4a7fb5" strokeWidth="0.7" opacity="0.4" />
      <line x1="141" y1="50" x2="149" y2="50" stroke="#4a7fb5" strokeWidth="0.7" opacity="0.4" />
      <text x="155" y="42" fill="#4a7fb5" fontSize="7" fontFamily="monospace" opacity="0.5">300 mm</text>

      {/* ── DETALHE CRINOLINA (direita) ── */}
      <text x="295" y="14" textAnchor="middle" fill="#4a7fb5" fontSize="8" fontFamily="monospace" letterSpacing="1" opacity="0.6">DET. CRINOLINA</text>

      <line x1="255" y1="30" x2="255" y2="150" stroke="#4a7fb5" strokeWidth="2.5" opacity="0.7" />
      <line x1="335" y1="30" x2="335" y2="150" stroke="#4a7fb5" strokeWidth="2.5" opacity="0.7" />
      <line x1="255" y1="90" x2="335" y2="90" stroke="#4a7fb5" strokeWidth="3" opacity="0.7" />

      {/* Arco de crinolina ampliado */}
      <path d="M255 90 Q295 44 335 90" fill="none" stroke="#f59e0b" strokeWidth="2.5" opacity="0.85" />
      {/* Barras verticais da crinolina */}
      {[268, 281, 295, 309, 322].map(x => {
        const dy = Math.sqrt(Math.max(0, 40 * 40 - (x - 295) * (x - 295)));
        return <line key={x} x1={x} y1={90 - dy} x2={x} y2="90" stroke="#f59e0b" strokeWidth="1" opacity="0.45" strokeDasharray="2 2" />;
      })}

      {/* Dimensões detalhe */}
      <line x1="255" y1="160" x2="335" y2="160" stroke="#4a7fb5" strokeWidth="0.7" opacity="0.4" />
      <line x1="255" y1="156" x2="255" y2="164" stroke="#4a7fb5" strokeWidth="0.7" opacity="0.5" />
      <line x1="335" y1="156" x2="335" y2="164" stroke="#4a7fb5" strokeWidth="0.7" opacity="0.5" />
      <text x="295" y="158" textAnchor="middle" fill="#4a7fb5" fontSize="7" fontFamily="monospace" opacity="0.55">700 mm</text>

      {/* Raio da crinolina */}
      <line x1="295" y1="90" x2="295" y2="50" stroke="#4a7fb5" strokeWidth="0.7" strokeDasharray="2 2" opacity="0.35" />
      <text x="300" y="70" fill="#4a7fb5" fontSize="7" fontFamily="monospace" opacity="0.5">R=350</text>

      {/* ── TÍTULO BLOCK ── */}
      <rect x="10" y="198" width="400" height="74" rx="1" fill="none" stroke="#4a7fb5" strokeWidth="1" opacity="0.4" />
      <line x1="10" y1="216" x2="410" y2="216" stroke="#4a7fb5" strokeWidth="0.7" opacity="0.3" />
      <line x1="210" y1="198" x2="210" y2="272" stroke="#4a7fb5" strokeWidth="0.7" opacity="0.3" />
      <line x1="10" y1="238" x2="210" y2="238" stroke="#4a7fb5" strokeWidth="0.5" opacity="0.25" />
      <line x1="10" y1="256" x2="210" y2="256" stroke="#4a7fb5" strokeWidth="0.5" opacity="0.25" />
      <text x="110" y="210" textAnchor="middle" fill="#f59e0b" fontSize="8" fontFamily="monospace" letterSpacing="1" opacity="0.8">MILLUS ACESSÓRIOS INDUSTRIAIS</text>
      <text x="110" y="232" textAnchor="middle" fill="#e2eaf5" fontSize="9" fontFamily="'Barlow Condensed', sans-serif" fontWeight="700" opacity="0.85">ESCADA DE SILO C/ CRINOLINA</text>
      <text x="20" y="250" fill="#4a7fb5" fontSize="7" fontFamily="monospace" opacity="0.6">MATERIAL: AÇO GALVANIZADO A HOT DIP</text>
      <text x="20" y="265" fill="#4a7fb5" fontSize="7" fontFamily="monospace" opacity="0.6">NORMA: NR-35 / ABNT NBR 14718</text>
      <text x="220" y="228" fill="#4a7fb5" fontSize="7" fontFamily="monospace" opacity="0.6">REF: PROJ-03</text>
      <text x="220" y="244" fill="#4a7fb5" fontSize="7" fontFamily="monospace" opacity="0.6">ESPAÇ. DEGRAU: 300 mm</text>
      <text x="220" y="260" fill="#4a7fb5" fontSize="7" fontFamily="monospace" opacity="0.6">ESCALA: 1:15</text>
    </svg>
  );
}

export const projetos: Projeto[] = [
  {
    slug: 'gaiola-de-resgate',
    ref: 'PROJ-01',
    nome: 'Gaiola de Resgate',
    categoria: 'Estrutura metálica',
    descricao: 'Gaiola de resgate para içamento de operadores em espaços confinados. Fabricada em aço carbono com pintura epóxi, atendendo às exigências da NR-33.',
    descricaoLonga: `Desenvolvida para atender operações de resgate em espaços confinados, a gaiola foi projetada seguindo os requisitos da NR-33 e da NBR 16068. A estrutura em aço carbono ASTM A36 garante resistência mecânica adequada para içamento, com pintura epóxi industrial de alta durabilidade para ambientes agressivos.\n\nO projeto inclui porta de acesso com travamento, ponto de içamento central reforçado, base com pés niveladores e tela de proteção perimetral. A capacidade de carga e as dimensões são definidas conforme a demanda do cliente e os requisitos do espaço confinado em questão.`,
    tags: ['Aço carbono', 'NR-33', 'Içamento'],
    img: '/assets/projetos/gaiola-resgate.jpg',
    galeria: [
      '/assets/projetos/gaiola-resgate-2.jpg',
      '/assets/projetos/gaiola-resgate-3.jpg',
      '/assets/projetos/gaiola-resgate-4.jpg',
    ],
    specs: [
      { label: 'Material', valor: 'Aço carbono ASTM A36' },
      { label: 'Acabamento', valor: 'Pintura epóxi industrial' },
      { label: 'Norma', valor: 'NR-33 / NBR 16068' },
      { label: 'Dimensões', valor: 'Sob consulta' },
      { label: 'Capacidade', valor: 'Sob consulta' },
    ],
    svgTecnico: <GaiolaSVG />,
  },
  {
    slug: 'peneira-vibratoria',
    ref: 'PROJ-02',
    nome: 'Peneira Vibratória',
    categoria: 'Equipamento industrial',
    descricao: 'Peneira vibratória para classificação granulométrica de materiais sólidos. Estrutura em aço com tela intercambiável e mancais com mangueiras hidráulicas de lubrificação.',
    descricaoLonga: `Equipamento para separação e classificação de materiais sólidos por tamanho granulométrico. O deck inclinado em 15° associado ao sistema de vibração garante alta eficiência de peneiramento com menor consumo energético.\n\nA tela de aço inox 304 é intercambiável, permitindo adaptação para diferentes especificações de malha conforme o material a processar. Os mancais são lubrificados por sistema de mangueiras hidráulicas fornecidas e instaladas pela própria Millus, garantindo compatibilidade e rastreabilidade completa dos componentes.`,
    tags: ['Aço estrutural', 'Vibração', 'Granulometria'],
    img: '/assets/projetos/peneira-vibratoria.jpg',
    galeria: [
      '/assets/projetos/peneira-vibratoria-2.jpg',
      '/assets/projetos/peneira-vibratoria-3.jpg',
      '/assets/projetos/peneira-vibratoria-4.jpg',
    ],
    specs: [
      { label: 'Estrutura', valor: 'Aço ASTM A36' },
      { label: 'Tela', valor: 'Aço inox 304 intercambiável' },
      { label: 'Inclinação', valor: '15°' },
      { label: 'Comprimento', valor: '2500 mm' },
      { label: 'Acionamento', valor: 'Motor vibrador elétrico' },
    ],
    svgTecnico: <PeneiraSVG />,
  },
  {
    slug: 'escada-de-silo',
    ref: 'PROJ-03',
    nome: 'Escada de Silo',
    categoria: 'Acesso e segurança',
    descricao: 'Escada de acesso a silo com guarda-corpo e crinolina de proteção. Fabricada em aço galvanizado conforme normas de segurança para trabalho em altura.',
    descricaoLonga: `Escada de acesso vertical para silos e estruturas industriais elevadas, projetada conforme a NR-35 e a ABNT NBR 14718. A crinolina de proteção com raio de 350 mm envolve o operador a partir de 2,5 m de altura, prevenindo quedas durante a subida e descida.\n\nFabricada inteiramente em aço galvanizado a quente (hot dip), com espaçamento de degraus de 300 mm e largura interna de 700 mm. O guarda-corpo no trecho superior garante acesso seguro à plataforma. A altura é ajustada conforme a necessidade da instalação.`,
    tags: ['Aço galvanizado', 'NR-35', 'Trabalho em altura'],
    img: '/assets/projetos/escada-silo.jpg',
    galeria: [
      '/assets/projetos/escada-silo-2.jpg',
      '/assets/projetos/escada-silo-3.jpg',
      '/assets/projetos/escada-silo-4.jpg',
    ],
    specs: [
      { label: 'Material', valor: 'Aço galvanizado hot dip' },
      { label: 'Norma', valor: 'NR-35 / ABNT NBR 14718' },
      { label: 'Espaç. degrau', valor: '300 mm' },
      { label: 'Largura interna', valor: '700 mm' },
      { label: 'Altura', valor: 'Variável / sob consulta' },
    ],
    svgTecnico: <EscadaSVG />,
  },
];
