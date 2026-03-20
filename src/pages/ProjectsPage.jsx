const whatsappHref = "https://wa.me/5513982071346";

// Substitua os mocks por projetos e cases reais assim que houver autorização dos clientes.
const projectAreas = [
  {
    title: "Projetos sob demanda",
    description:
      "Soluções direcionadas para necessidades específicas de operação, manutenção e adaptação técnica.",
  },
  {
    title: "Fornecimento para rotina crítica",
    description:
      "Atendimento a demandas recorrentes com foco em disponibilidade e continuidade operacional.",
  },
  {
    title: "Apoio comercial consultivo",
    description:
      "Leitura do cenário da operação para direcionar itens, conjuntos e alternativas adequadas.",
  },
];

const casesMock = [
  {
    number: "01",
    title: "Conjuntos hidráulicos para continuidade operacional",
    summary:
      "Mock de case para demonstrar como a página pode apresentar escopo, desafio e solução aplicada.",
  },
  {
    number: "02",
    title: "Atendimento recorrente para manutenção industrial",
    summary:
      "Modelo pensado para mostrar relacionamento contínuo, tipo de fornecimento e capacidade de resposta.",
  },
  {
    number: "03",
    title: "Solução direcionada para demanda específica de campo",
    summary:
      "Estrutura pronta para apresentar casos com contexto técnico, aplicação e impacto operacional.",
  },
];

export default function ProjectsPage() {
  return (
    <main>
      <section className="projects-hero">
        <div className="container projects-hero-grid">
          <div className="projects-hero-copy">
            <span className="section-kicker">PROJETOS E SOLUÇÕES</span>
            <h1>Estrutura preparada para apresentar capacidade técnica com casos reais</h1>
            <p>
              Página pensada para receber projetos, fornecimentos relevantes e
              frentes de atuação da Millus. Nesta fase, o conteúdo permanece
              mockado para validar forma e posicionamento.
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Solicitar atendimento no WhatsApp
            </a>
          </div>

          <div className="projects-hero-panel surface-card">
            <span className="panel-label">COMO ESTA PÁGINA VAI EVOLUIR</span>
            <ul className="bullet-list">
              <li>Substituição dos mocks por cases reais autorizados</li>
              <li>Inserção de fotos, escopo e contexto de projeto</li>
              <li>Destaque para capacidade comercial e técnica</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-kicker">FRENTES DE ATUAÇÃO</span>
            <h2>Como a Millus pode apresentar projetos e fornecimentos no site</h2>
            <p>
              A proposta não é virar portfólio criativo, mas reforçar capacidade
              industrial, segurança comercial e tipo de solução entregue.
            </p>
          </div>

          <div className="project-area-grid">
            {projectAreas.map((item) => (
              <article className="surface-card project-area-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section section-alt">
        <div className="container">
          <div className="section-heading">
            <span className="section-kicker">CASES MOCKADOS</span>
            <h2>Modelo visual para futuros projetos reais</h2>
            <p>
              Estes cards mostram como a área pode receber projetos reais depois,
              mantendo linguagem institucional e leitura rápida.
            </p>
          </div>

          <div className="case-grid">
            {casesMock.map((item) => (
              <article className="surface-card case-card" key={item.number}>
                <span className="case-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
