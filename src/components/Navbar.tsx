import { useState } from "react";

const links = [
  { label: "Início", href: "#", wip: false },
  { label: "Produtos", href: "#", wip: true },
  { label: "Projetos", href: "#", wip: true },
  { label: "Ética", href: "#", wip: true },
  { label: "Contato", href: "#", wip: true },
];

export default function Navbar() {
  const [toast, setToast] = useState(false);

  const handleWip = (e: React.MouseEvent) => {
    e.preventDefault();
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  return (
    <>
      <div className="fixed top-[79px] left-[227.5px] right-[227.5px] z-40">
        <nav className="w-full bg-white rounded-xl flex items-center justify-between">
          <img
            src="/assets/logo.png"
            alt="Millus"
            className="h-[45px] w-auto my-[15px] mx-[30px]"
          />

          <div className="flex items-center gap-8 px-[20px]">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={link.wip ? handleWip : undefined}
                className="text-black text-[18px] font-medium hover:text-yellow-400 transition-colors px-[10px]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </div>

      <div
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-black text-white text-sm px-5 py-3 rounded-full shadow-lg transition-all duration-300 ${
          toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        🚧 Sinto muito, site em construção
      </div>
    </>
  );
}
