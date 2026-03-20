const whatsappHref = "https://wa.me/5513982071346";

const projectAreas = [
  {
    title: "Projetos sob demanda",
    description:
      "Estruturação de soluções direcionadas para necessidades específicas de operação, manutenção e adaptação técnica.",
  },
  {
    title: "Fornecimento para rotina crítica",
    description:
      "Atendimento a demandas recorrentes com foco em disponibilidade, alinhamento técnico e continuidade operacional.",
  },
  {
    title: "Apoio comercial consultivo",
    description:
      "Leitura do cenário da operação para direcionar itens, conjuntos e alternativas adequadas à necessidade industrial.",
  },
];

const casesMock = [
  {
    number: "01",
    title: "Conjuntos hidráulicos para continuidade operacional",
    summary:
      "Mock de case para demonstrar como a página vai apresentar escopo, desafio e solução aplicada quando os projetos reais forem definidos.",
  },
  {
    number: "02",
    title: "Atendimento recorrente para manutenção industrial",
    summary:
      "Estrutura prevista para mostrar relacionamento contínuo, tipo de fornecimento e capacidade de resposta comercial.",
  },
  {
    number: "03",
    title: "Solução direcionada para demanda específica de campo",
    summary:
      "Área preparada para apresentar casos com contexto técnico, aplicação e impacto operacional de forma institucional.",
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
              Esta página foi organizada para evoluir com projetos, fornecimentos
              relevantes e frentes de atuação da Millus. Nesta fase, usamos
              conteúdo mockado para validar forma, hierarquia e posicionamento.
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
              A página de projetos não precisa parecer portfólio criativo. Ela
              deve reforçar capacidade industrial, segurança comercial e tipo de
              solução entregue.
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
              Estes cards existem para te mostrar como a seção pode receber casos
              reais depois, mantendo linguagem institucional e leitura rápida.
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
