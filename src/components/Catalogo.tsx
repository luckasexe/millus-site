import { useEffect, useState } from 'react';

interface Produto {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  disponivel: boolean;
  imagem?: string;
}

const WHATSAPP_URL = 'https://wa.me/5513982071346';

const CATEGORIA_CORES: Record<string, string> = {
  'Rolamentos':  '#4a7fb5',
  'Manômetros':  '#f59e0b',
  'Conexões':    '#6db87a',
  'Vedações':    '#a78bfa',
  'EPIs':        '#f87171',
  'Acessórios':  '#8fadc8',
};

export function Catalogo() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/produtos.json')
      .then(r => r.json())
      .then((data: Produto[]) => { setProdutos(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const categorias = ['Todos', ...Array.from(new Set(produtos.map(p => p.categoria)))];
  const visiveis = categoriaAtiva === 'Todos'
    ? produtos
    : produtos.filter(p => p.categoria === categoriaAtiva);

  return (
    <section id="catalogo" className="blueprint-bg relative py-20 px-6 md:px-12 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#4a7fb5]" />
            <span className="blueprint-tag">ESTOQUE // PRONTA ENTREGA</span>
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
            CATÁLOGO DE <span className="accent">PRODUTOS</span>
          </h2>
          <p className="text-[#8fadc8] mt-3 max-w-xl text-base leading-relaxed">
            Mais de 2.000 itens em estoque. Consulte disponibilidade e solicite
            orçamento direto pelo WhatsApp.
          </p>
        </div>

        {/* Filtro de categorias */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categorias.map(cat => {
            const ativa = cat === categoriaAtiva;
            const cor = cat === 'Todos' ? '#4a7fb5' : (CATEGORIA_CORES[cat] ?? '#4a7fb5');
            return (
              <button
                key={cat}
                onClick={() => setCategoriaAtiva(cat)}
                className="px-4 py-1.5 text-xs border transition-all duration-150"
                style={{
                  fontFamily: 'monospace',
                  letterSpacing: '0.08em',
                  borderColor: ativa ? cor : 'rgba(74,127,181,0.3)',
                  color: ativa ? cor : '#4a7fb5',
                  background: ativa ? `${cor}18` : 'transparent',
                }}
              >
                {cat.toUpperCase()}
              </button>
            );
          })}
        </div>

        {/* Grid de produtos */}
        {loading ? (
          <div className="text-[#4a7fb5] text-sm" style={{ fontFamily: 'monospace' }}>
            CARREGANDO CATÁLOGO...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-[#4a7fb5]/15">
            {visiveis.map(({ id, nome, categoria, descricao, disponivel, imagem }) => {
              const cor = CATEGORIA_CORES[categoria] ?? '#4a7fb5';
              return (
                <div
                  key={id}
                  className="bg-[#0a1628] flex flex-col group hover:bg-[#0d2040] transition-colors duration-200 relative"
                >
                  {/* Imagem */}
                  {imagem ? (
                    <div className="relative overflow-hidden border-b border-[#4a7fb5]/15">
                      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#f59e0b]/40 z-10" />
                      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#f59e0b]/40 z-10" />
                      <img
                        src={imagem}
                        alt={nome}
                        className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        style={{ aspectRatio: '4/3', filter: 'brightness(0.88) saturate(0.8)' }}
                        onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none'; }}
                      />
                    </div>
                  ) : (
                    <div
                      className="w-full flex items-center justify-center border-b border-[#4a7fb5]/10"
                      style={{
                        aspectRatio: '4/3',
                        background: 'rgba(6,15,30,0.8)',
                        backgroundImage: 'linear-gradient(rgba(100,155,220,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(100,155,220,0.04) 1px, transparent 1px)',
                        backgroundSize: '16px 16px',
                      }}
                    >
                      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" opacity="0.15">
                        <rect x="2" y="6" width="28" height="20" rx="2" stroke="#4a7fb5" strokeWidth="1.5" />
                        <circle cx="11" cy="13" r="3" stroke="#4a7fb5" strokeWidth="1.5" />
                        <path d="M2 22 L10 15 L16 21 L21 16 L30 24" stroke="#4a7fb5" strokeWidth="1.5" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}

                  {/* Conteúdo */}
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="blueprint-tag" style={{ fontSize: '8px' }}>{id}</span>
                      <span
                        className="text-[9px] px-1.5 py-0.5"
                        style={{
                          fontFamily: 'monospace',
                          letterSpacing: '0.06em',
                          color: disponivel ? '#6db87a' : '#8fadc8',
                          border: `1px solid ${disponivel ? '#6db87a44' : '#8fadc844'}`,
                        }}
                      >
                        {disponivel ? 'EM ESTOQUE' : 'SOB CONSULTA'}
                      </span>
                    </div>

                    <span
                      className="text-[10px] font-medium"
                      style={{ color: cor, letterSpacing: '0.06em', fontFamily: 'monospace' }}
                    >
                      {categoria.toUpperCase()}
                    </span>

                    <h3
                      className="text-white leading-tight"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: '1rem', letterSpacing: '0.02em' }}
                    >
                      {nome}
                    </h3>

                    <p className="text-[#8fadc8] text-xs leading-relaxed flex-1">{descricao}</p>

                    <a
                      href={`${WHATSAPP_URL}?text=Olá! Tenho interesse no produto: ${nome} (${id})`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-[#4a7fb5] hover:text-[#f59e0b] transition-colors duration-150 mt-1"
                      style={{ fontFamily: 'monospace', letterSpacing: '0.06em' }}
                    >
                      CONSULTAR PREÇO →
                    </a>
                  </div>

                  {/* Hover line */}
                  <div
                    className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                    style={{ background: cor }}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Rodapé da seção */}
        <div className="mt-px bg-[#4a7fb5]/15">
          <div className="bg-[#060f1e] px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#4a7fb5] text-xs text-center sm:text-left" style={{ fontFamily: 'monospace', letterSpacing: '0.05em' }}>
              NÃO ENCONTROU O QUE PRECISA? CONSULTE NOSSA EQUIPE — TEMOS MAIS DE 2.000 ITENS EM ESTOQUE.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 bg-[#f59e0b] text-[#0a1628] font-semibold px-5 py-2.5 rounded-sm hover:bg-[#fbbf24] transition-colors duration-200 text-sm"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.08em' }}
            >
              FALAR COM ATENDIMENTO
            </a>
          </div>
        </div>

      </div>
      <div className="tech-divider mt-20" />
    </section>
  );
}
