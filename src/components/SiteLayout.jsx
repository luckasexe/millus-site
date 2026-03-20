import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

const whatsappHref = "https://wa.me/5513982071346";
const mapsHref = "https://maps.app.goo.gl/PxrYSXD6Z6WUsmXcA";

const sectionLinks = [
  { label: "Soluções", id: "solucoes" },
  { label: "Segmentos", id: "segmentos" },
  { label: "Sobre", id: "sobre" },
  { label: "Contato", id: "contato" },
];

export default function SiteLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  function scrollToSection(sectionId) {
    const runScroll = () => {
      window.requestAnimationFrame(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    };

    if (location.pathname !== "/") {
      navigate("/");
      window.setTimeout(runScroll, 120);
      return;
    }

    runScroll();
  }

  return (
    <>
      <header className="site-header">
        <div className="topbar">
          <div className="container topbar-inner">
            <span>Soluções técnicas para manutenção e operação industrial</span>
            <a href={mapsHref} target="_blank" rel="noopener noreferrer">
              Cubatão/SP
            </a>
          </div>
        </div>

        <div className="navbar-shell">
          <div className="navbar-pro container">
            <NavLink to="/" end className="nav-brand-pro" aria-label="Página inicial">
              <img src="/assets/logo.png" alt="Millus Logo" className="logo" />
            </NavLink>

            <nav className="nav-menu-pro" aria-label="Navegação principal">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `nav-link-pro${isActive ? " active" : ""}`
                }
              >
                Início
              </NavLink>

              {sectionLinks.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className="nav-link-button"
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </button>
              ))}

              <NavLink
                to="/projetos"
                className={({ isActive }) =>
                  `nav-link-pro${isActive ? " active" : ""}`
                }
              >
                Projetos
              </NavLink>

              <NavLink
                to="/etica"
                className={({ isActive }) =>
                  `nav-link-pro${isActive ? " active" : ""}`
                }
              >
                Ética
              </NavLink>
            </nav>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cta"
            >
              Solicitar atendimento
            </a>
          </div>
        </div>
      </header>

      <Outlet />

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp"
        aria-label="Solicitar atendimento no WhatsApp"
      >
        WhatsApp
      </a>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <span className="section-kicker">MILLUS ACESSÓRIOS INDUSTRIAIS</span>
            <p className="footer-copy">
              Fornecimento técnico, soluções para manutenção e apoio comercial
              para demandas da indústria.
            </p>
          </div>

          <div className="footer-actions">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-btn"
            >
              Solicitar atendimento
            </a>
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-btn footer-btn-secondary"
            >
              Ver localização
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container footer-bottom-inner">
            <p>&copy; {currentYear} Millus - Acessórios Industriais</p>
            <p>Estrutura pronta para evoluir com clientes, projetos e casos reais</p>
          </div>
        </div>
      </footer>
    </>
  );
}
