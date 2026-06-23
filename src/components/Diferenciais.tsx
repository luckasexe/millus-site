import { Tag, Wrench, Truck, Clock, ShieldCheck, Phone } from 'lucide-react';

const items = [
  {
    icon: Tag,
    ref: 'DIF-01',
    titulo: 'Rastreamento por etiqueta',
    descricao:
      'Cada mangueira prensada recebe uma etiqueta de identificação. Quando precisar refazer, é só informar o código — a gente localiza o histórico e reproduz exatamente.',
  },
  {
    icon: Wrench,
    ref: 'DIF-02',
    titulo: 'Prensagem no local',
    descricao:
      'Prensa própria para montagem de terminais em mangueiras hidráulicas. Mangueira sob medida, pronta para uso, sem depender de terceiros.',
  },
  {
    icon: Truck,
    ref: 'DIF-03',
    titulo: 'Logística nacional',
    descricao:
      'Atendemos a Baixada Santista com entrega rápida e fazemos logística para todo o Brasil quando o cliente precisar.',
  },
  {
    icon: Clock,
    ref: 'DIF-04',
    titulo: 'Atendimento para urgência',
    descricao:
      'Sabemos que parada de linha não espera. O atendimento é direto, sem intermediários, para resolver o mais rápido possível.',
  },
  {
    icon: ShieldCheck,
    ref: 'DIF-05',
    titulo: 'Estoque amplo em pronta entrega',
    descricao:
      'Mais de 2.000 itens disponíveis: mangueiras, conexões, rolamentos, manômetros, EPIs e muito mais — sem prazo de reposição.',
  },
  {
    icon: Phone,
    ref: 'DIF-06',
    titulo: 'Suporte técnico direto',
    descricao:
      'Atendimento com conhecimento técnico real. A gente ajuda a identificar o componente certo e indicar a solução adequada para cada aplicação.',
  },
];

export function Diferenciais() {
  return (
    <section id="diferenciais" className="blueprint-bg relative py-20 px-6 md:px-12 overflow-hidden">

      {/* Section header */}
      <div className="w-full max-w-7xl mx-auto mb-14">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-[#4a7fb5]" />
          <span className="blueprint-tag">POR QUE A MILLUS</span>
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
          DIFERENCIAIS <span className="accent">TÉCNICOS</span>
        </h2>
        <p className="text-[#8fadc8] mt-3 max-w-xl text-base leading-relaxed">
          O que faz a diferença quando o fornecedor precisa ser confiável, rápido e bem abastecido.
        </p>
      </div>

      {/* Grid */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#4a7fb5]/15">
        {items.map(({ icon: Icon, ref, titulo, descricao }) => (
          <div
            key={ref}
            className="bg-[#0a1628] p-8 flex flex-col gap-4 group hover:bg-[#0d2040] transition-colors duration-200 relative"
          >
            {/* Top ref tag */}
            <span className="blueprint-tag" style={{ fontSize: '9px' }}>{ref}</span>

            {/* Icon */}
            <div className="w-10 h-10 border border-[#4a7fb5]/40 flex items-center justify-center group-hover:border-[#f59e0b]/60 transition-colors duration-200">
              <Icon size={18} className="text-[#f59e0b]" />
            </div>

            {/* Text */}
            <h3
              className="text-white text-lg leading-tight"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, letterSpacing: '0.02em' }}
            >
              {titulo}
            </h3>
            <p className="text-[#8fadc8] text-sm leading-relaxed">
              {descricao}
            </p>

            {/* Bottom accent line on hover */}
            <div className="absolute bottom-0 left-0 h-px w-0 bg-[#f59e0b] group-hover:w-full transition-all duration-300" />
          </div>
        ))}
      </div>

      <div className="tech-divider mt-20" />
    </section>
  );
}
