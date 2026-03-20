const whatsappHref = "https://wa.me/5513982071346";
const mapsHref = "https://maps.app.goo.gl/PxrYSXD6Z6WUsmXcA";

const trustLogos = [
  "Cliente Industrial 01",
  "Cliente Portuário 02",
  "Operação Técnica 03",
  "Fornecedor Base 04",
  "Projeto Estrutural 05",
  "Indústria de Processo 06",
];

const solutions = [
  {
    kicker: "Fornecimento técnico",
    title: "Peças e componentes para manutenção industrial",
    description:
      "Atendimento para demandas recorrentes e itens técnicos com foco em disponibilidade, especificação correta e agilidade de resposta.",
  },
  {
    kicker: "Mangueiras prensadas",
    title: "Conjuntos montados para operação e reposição",
    description:
      "Preparação de mangueiras, conexões e conjuntos hidráulicos para aplicação industrial com orientação prática para cada necessidade.",
  },
  {
    kicker: "Projetos e apoio técnico",
    title: "Soluções sob medida para operação e campo",
    description:
      "Desenvolvimento de soluções direcionadas para adequação, substituição, melhoria operacional e demandas específicas da planta.",
  },
];

const segments = [
  "Indústrias de processo",
  "Operação portuária e logística",
  "Manutenção industrial",
  "Infraestrutura e utilidades",
  "Oficinas e prestadores técnicos",
  "Suprimentos e compras corporativas",
];

const projectHighlights = [
  {
    title: "Adequação de conjuntos hidráulicos",
    description:
      "Substituição e preparação de conjuntos para continuidade operacional com foco em confiabilidade e prazo.",
  },
  {
    title: "Fornecimento técnico recorrente",
    description:
      "Apoio contínuo a rotinas de manutenção com itens críticos, peças técnicas e atendimento consultivo.",
  },
  {
    title: "Solução sob demanda em campo",
    description:
      "Estruturação de fornecimento para necessidade específica de operação com resposta rápida e alinhamento técnico.",
  },
];

const differentiators = [
  "Atendimento técnico-comercial direto",
  "Agilidade para demandas operacionais",
  "Atuação em peças, conjuntos e soluções",
  "Relacionamento com foco industrial",
];

const companyNumbers = [
  { value: "15+", label: "anos de experiência no setor" },
  { value: "24h", label: "atenção a demandas operacionais" },
  { value: "1000+", label: "atendimentos realizados" },
];

export default function HomePage() {
  const marqueeItems = [...trustLogos, ...trustLogos];
  function scrollToAbout() {
    const aboutSection = document.getElementById("sobre");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <>
      <section className="hero-shell" id="inicio">
        <div className="hero-backdrop" />
        <div className="hero-grid container">
          <div className="hero-copy">
            <span className="eyebrow">MILLUS ACESSÓRIOS INDUSTRIAIS</span>
            <h1 className="hero-headline">
              Soluções técnicas para manutenção e operação industrial
            </h1>
            <p className="hero-description">
              Atuamos com fornecimento técnico, mangueiras prensadas, peças
              industriais e suporte para demandas de operação, manutenção e
              projetos. Um parceiro comercial para quem precisa de resposta
              rápida e atendimento confiável.
            </p>

            <div className="hero-actions">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Solicitar atendimento no WhatsApp
              </a>
              <button type="button" className="btn-secondary btn-secondary-ghost" onClick={scrollToAbout}>
                Conhecer a empresa
              </button>
            </div>

            <div className="hero-metrics">
              {companyNumbers.map((item) => (
                <div className="metric-card" key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-visual-card hero-photo-card">
              <img
                src="/assets/loja-millus.jpg"
                alt="Ambiente industrial de referência visual para o layout"
                className="hero-main-photo"
              />
              <div className="hero-photo-overlay">
                <span>Atendimento técnico e comercial</span>
                <strong>Fornecimento para rotina, urgência e projeto</strong>
              </div>
            </div>

            <div className="hero-visual-stack">
              <div className="hero-visual-card signal-card">
                <span className="signal-label">CAPACIDADE DE ATENDIMENTO</span>
                <p>
                  Peças técnicas, conjuntos prensados e soluções para operação e
                  manutenção industrial.
                </p>
              </div>
              <div className="hero-visual-card location-card">
                <span className="signal-label">BASE EM CUBATÃO/SP</span>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver localização da empresa
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="logo-marquee-section" aria-label="Clientes de referência">
        <div className="container logo-marquee-header">
          <span className="section-kicker">PROVA DE AUTORIDADE</span>
          <p>
            Área preparada para logos reais de clientes e empresas atendidas.
            Nesta fase, usamos marcas mockadas em padrão prata para validar o
            layout.
          </p>
        </div>
        <div className="logo-marquee">
          <div className="logo-track">
            {marqueeItems.map((logo, index) => (
              <div className="logo-chip" key={`${logo}-${index}`}>
                <span>{logo}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="site-main">
        <section className="content-section" id="solucoes">
          <div className="container">
            <div className="section-heading">
              <span className="section-kicker">O QUE FAZEMOS</span>
              <h2>Soluções industriais com leitura técnica e foco operacional</h2>
              <p>
                O posicionamento do site prioriza capacidade técnica,
                confiabilidade comercial e clareza sobre o tipo de fornecimento
                que a Millus executa.
              </p>
            </div>

            <div className="solution-grid">
              {solutions.map((item) => (
                <article className="surface-card solution-card" key={item.title}>
                  <span className="card-kicker">{item.kicker}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section section-alt" id="segmentos">
          <div className="container split-section">
            <div className="split-copy">
              <span className="section-kicker">PARA QUEM FORNECEMOS</span>
              <h2>Segmentos que buscam parceiro confiável para fornecimento técnico</h2>
              <p>
                O site foi desenhado para falar com compradores, suprimentos,
                manutenção, coordenação técnica e gestores operacionais que
                precisam validar fornecedor com rapidez.
              </p>
            </div>

            <div className="segment-grid">
              {segments.map((segment) => (
                <div className="segment-pill" key={segment}>
                  {segment}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section" id="projetos">
          <div className="container">
            <div className="section-heading section-heading-inline">
              <div>
                <span className="section-kicker">PROJETOS</span>
                <h2>Casos e frentes de atuação que reforçam capacidade técnica</h2>
              </div>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="text-link">
                Ver mais no atendimento comercial
              </a>
            </div>

            <div className="project-grid">
              {projectHighlights.map((project) => (
                <article className="surface-card project-card" key={project.title}>
                  <div className="project-topline" />
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-band">
          <div className="container cta-band-inner">
            <div>
              <span className="section-kicker">ATENDIMENTO DIRETO</span>
              <h2>Precisa de resposta rápida para operação, manutenção ou projeto?</h2>
            </div>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Falar com a Millus no WhatsApp
            </a>
          </div>
        </section>

        <section className="content-section section-alt" id="sobre">
          <div className="container about-grid">
            <div className="about-copy">
              <span className="section-kicker">SOBRE A EMPRESA</span>
              <h2>Presença comercial voltada para a realidade da indústria</h2>
              <p>
                A Millus se posiciona como parceira para demandas técnicas e
                operacionais, atendendo o setor industrial com uma comunicação
                objetiva, comercial e orientada à solução.
              </p>
              <p>
                Nesta nova versão do site, o foco deixa de ser apenas listar
                itens e passa a comunicar autoridade, escopo de atuação e
                prontidão para atendimento.
              </p>
            </div>

            <div className="about-panel surface-card">
              <span className="panel-label">DIFERENCIAIS</span>
              <ul className="bullet-list">
                {differentiators.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="content-section" id="contato">
          <div className="container contact-compact-grid">
            <div className="contact-summary surface-card">
              <span className="section-kicker">LOCALIZAÇÃO E CONTATO</span>
              <h2>Base local para atendimento industrial em Cubatão e região</h2>
              <p>
                A localização aparece como apoio institucional e reforço de
                confiança, sem competir com o principal objetivo de conversão.
              </p>
              <div className="contact-inline-list">
                <div>
                  <strong>WhatsApp</strong>
                  <span>(13) 98207-1346</span>
                </div>
                <div>
                  <strong>Endereço</strong>
                  <span>Rua Belarmino Amaral, 618 - Cubatão/SP</span>
                </div>
              </div>
              <div className="hero-actions">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Solicitar atendimento
                </a>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary btn-secondary-solid"
                >
                  Ver localização
                </a>
              </div>
            </div>

            <div className="map-shell">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.143090543883!2d-46.41837862500862!3d-23.884544173544274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce11a19e039839%3A0x92e0245957fb087d!2sMillus%20Acess%C3%B3rios%20Industriais%20%E2%80%93%20Mangueiras%20Hidr%C3%A1ulicas%2C%20Rolamentos%20e%20Pe%C3%A7as%20T%C3%A9cnicas!5e0!3m2!1spt-BR!2sbr!4v1747455388779!5m2!1spt-BR!2sbr"
                title="Mapa da loja Millus"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
