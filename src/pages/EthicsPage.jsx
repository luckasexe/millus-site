const commitments = [
  {
    icon: "🔧",
    title: "Qualidade Garantida",
    description: "Excelência em produtos e serviços",
  },
  {
    icon: "🤝",
    title: "Transparência Total",
    description: "Honestidade em todas as relações",
  },
  {
    icon: "🌱",
    title: "Sustentabilidade",
    description: "Práticas ambientalmente responsáveis",
  },
  {
    icon: "📈",
    title: "Melhoria Contínua",
    description: "Evolução constante da equipe",
  },
];

const values = [
  {
    icon: "🎯",
    title: "Missão",
    description:
      "Fornecer soluções industriais de alta qualidade com atendimento especializado e produtos confiáveis.",
  },
  {
    icon: "🚀",
    title: "Visão",
    description:
      "Ser referência em acessórios industriais na Baixada Santista pela excelência e inovação.",
  },
  {
    icon: "⚖️",
    title: "Valores",
    description:
      "Ética, transparência e confiança em todos os relacionamentos comerciais.",
  },
];

export default function EthicsPage() {
  return (
    <main className="main-professional">
      <section className="ethics-hero">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">NOSSOS PRINCÍPIOS</span>
            <h1 className="page-title">Ética e Compromisso</h1>
            <p className="page-subtitle">
              Construindo relacionamentos sólidos baseados na confiança,
              transparência e excelência
            </p>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
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

      <section className="commitments-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">NOSSOS COMPROMISSOS</span>
            <h2 className="section-title">Princípios que Nos Guiam</h2>
            <p className="section-subtitle">
              Cada decisão é baseada em nossos valores fundamentais
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
