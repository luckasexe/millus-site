const commitments = [
  {
    icon: "🔧",
    title: "Compromisso com qualidade",
    description:
      "Atuação orientada por especificação correta, clareza comercial e responsabilidade sobre o fornecimento.",
  },
  {
    icon: "🤝",
    title: "Relação transparente",
    description:
      "Comunicação objetiva com clientes e parceiros, baseada em confiança e previsibilidade.",
  },
  {
    icon: "📈",
    title: "Melhoria contínua",
    description:
      "Busca por evolução de atendimento, resposta comercial e apoio às operações industriais.",
  },
  {
    icon: "🧭",
    title: "Conduta responsável",
    description:
      "Postura institucional alinhada à seriedade e ao compromisso com relações comerciais duradouras.",
  },
];

const values = [
  {
    icon: "🎯",
    title: "Missão",
    description:
      "Atender a indústria com soluções técnicas, fornecimento confiável e apoio comercial para demandas operacionais e projetos.",
  },
  {
    icon: "🚀",
    title: "Visão",
    description:
      "Consolidar a Millus como referência regional em atendimento industrial, reconhecida por confiança, agilidade e leitura técnica.",
  },
  {
    icon: "⚖️",
    title: "Valores",
    description:
      "Ética, transparência, responsabilidade comercial e foco em relacionamento sólido com clientes e parceiros.",
  },
];

const principles = [
  "Atuar com clareza na comunicação comercial e técnica.",
  "Construir relações de longo prazo com base em confiança.",
  "Priorizar postura profissional em todas as etapas do atendimento.",
  "Manter coerência entre discurso institucional e prática operacional.",
];

export default function EthicsPage() {
  return (
    <main>
      <section className="ethics-hero">
        <div className="container ethics-hero-grid">
          <div className="ethics-hero-copy">
            <span className="section-kicker">ÉTICA E COMPROMISSO</span>
            <h1>Uma base institucional para relações comerciais sérias e duradouras</h1>
            <p>
              Esta página reforça o posicionamento da Millus como empresa que
              combina atendimento técnico, responsabilidade comercial e conduta
              compatível com o ambiente industrial.
            </p>
          </div>

          <div className="ethics-highlight surface-card">
            <span className="panel-label">PRINCÍPIOS CENTRAIS</span>
            <ul className="bullet-list">
              {principles.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-kicker">IDENTIDADE INSTITUCIONAL</span>
            <h2>Missão, visão e valores organizados com linguagem mais sólida</h2>
            <p>
              A área de Ética consolida credibilidade institucional e reforça o
              posicionamento comercial da marca.
            </p>
          </div>

          <div className="values-grid">
            {values.map((value) => (
              <article className="value-card" key={value.title}>
                <div className="value-icon" aria-hidden="true">
                  {value.icon}
                </div>
                <h2>{value.title}</h2>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="commitments-section section-alt">
        <div className="container">
          <div className="section-heading">
            <span className="section-kicker">COMPROMISSOS</span>
            <h2>Diretrizes que sustentam o relacionamento com o mercado</h2>
            <p>
              Estes compromissos dão consistência institucional ao site e ao
              relacionamento com clientes e parceiros.
            </p>
          </div>

          <div className="commitments-grid">
            {commitments.map((item) => (
              <article className="commitment-item" key={item.title}>
                <div className="commitment-icon" aria-hidden="true">
                  {item.icon}
                </div>
                <div className="commitment-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
