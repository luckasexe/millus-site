import { Link } from "react-router-dom";

const whatsappHref = "https://wa.me/5513982071346";
const mapsHref = "https://maps.app.goo.gl/PxrYSXD6Z6WUsmXcA";

// Substitua esta lista por clientes autorizados assim que os nomes e logos reais forem definidos.
const trustLogos = [
  "ATLANTIS OPERAÇÕES",
  "PORTO SERRA",
  "METALNAVE INDÚSTRIA",
  "TECNOBASE UTILIDADES",
  "EIXO SUL LOGÍSTICA",
  "GRUPO VERTEX",
];

const solutions = [
  {
    kicker: "Fornecimento técnico",
    title: "Peças e componentes para manutenção industrial",
    description:
      "Atendimento para rotina de manutenção e itens críticos com foco em especificação correta e resposta ágil.",
  },
  {
    kicker: "Mangueiras prensadas",
    title: "Conjuntos montados para operação e reposição",
    description:
      "Montagem de mangueiras, conexões e conjuntos hidráulicos para aplicação industrial e reposição rápida.",
  },
  {
    kicker: "Projetos e apoio técnico",
    title: "Soluções sob medida para operação e campo",
    description:
      "Adequação, substituição e apoio técnico para demandas específicas de operação, campo e projeto.",
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
      "Substituição e preparação de conjuntos com foco em continuidade operacional, prazo e confiabilidade.",
  },
  {
    title: "Fornecimento técnico recorrente",
    description:
      "Atendimento contínuo a rotinas de manutenção com itens críticos e suporte comercial consultivo.",
  },
  {
    title: "Solução sob demanda em campo",
    description:
      "Estruturação de fornecimento para necessidades específicas de operação com resposta rápida.",
  },
];

const differentiators = [
  "Atendimento técnico-comercial direto",
  "Agilidade para demandas operacionais",
  "Atuação em peças, conjuntos e soluções",
  "Relacionamento com foco industrial",
];

const companyNumbers = [
  { value: "18+", label: "anos de atuação no setor" },
  { value: "350+", label: "clientes atendidos na região" },
  { value: "6", label: "frentes de fornecimento" },
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
              Soluções técnicas para manutenção, operação e continuidade industrial
            </h1>
            <p className="hero-description">
              Fornecimento técnico, mangueiras prensadas, peças industriais e
              apoio comercial para rotina, urgência e projeto com resposta
              clara, ágil e compatível com o ambiente industrial.
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
                  Rotina, urgência operacional e demandas sob medida com foco no
                  setor industrial.
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
          <span className="section-kicker">CLIENTES E EMPRESAS ATENDIDAS</span>
          <p>
            Área preparada para receber clientes autorizados no padrão visual da
            versão publicada.
          </p>
        </div>
        <div className="container">
          <div className="logo-marquee hero-logo-marquee">
            <div className="logo-track">
              {marqueeItems.map((logo, index) => (
                <div className="logo-chip" key={`${logo}-${index}`}>
                  <span>{logo}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="proof-social-note">
            <span className="panel-label">PROVA SOCIAL MOCKADA</span>
            <p>
              Esta faixa pode ser atualizada depois com logos reais,
              preservando o mesmo tratamento monocromático.
            </p>
          </div>
        </div>
      </section>

      <main className="site-main">
        <section className="content-section" id="solucoes">
          <div className="container">
            <div className="section-heading">
              <span className="section-kicker">O QUE FAZEMOS</span>
              <h2>Soluções industriais com leitura técnica e resposta comercial</h2>
              <p>
                Atendimento para cenários em que confiança, disponibilidade e
                entendimento técnico precisam caminhar juntos.
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
                Estrutura pensada para compradores, suprimentos, manutenção e
                coordenação técnica que precisam validar fornecedor com rapidez.
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
                <h2>Frentes de atuação que reforçam capacidade técnica e resposta comercial</h2>
              </div>
              <Link to="/projetos" className="text-link">
                Ver página de projetos
              </Link>
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
                A Millus atua como parceira comercial para demandas técnicas e
                operacionais, com atendimento orientado à solução e linguagem
                compatível com o ambiente industrial.
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
                A base local reforça presença regional e confiança, enquanto o
                WhatsApp segue como principal canal de conversão.
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
