import { useState, useEffect } from "react";
import { URL } from "./../lib/urls";

const slides = [
  { src: "/assets/wide_1.png", alt: "Banner principal 1" },
  { src: "/assets/wide_2.png", alt: "Banner principal 2" },
  { src: "/assets/wide_kiko.webp", alt: "Banner principal 3" }
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section relative w-full h-[720px] overflow-hidden">
      {slides.map((slide, i) => (
        <img
          key={i}
          src={slide.src}
          alt={slide.alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 flex items-center px-[262.5px]">
        <div className="flex flex-col items-start gap-4">
          <div style={{ fontFamily: "'Bai Jamjuree', sans-serif", fontSize: "48px" }} className="leading-tight">
            <p className="text-white">
              <span className="brush-highlight brush-bold font-bold uppercase">MILLUS</span>
              <span className="brush-highlight"> padrão de qualidade em</span>
            </p>
            <p className="text-white font-bold"><span className="brush-highlight brush-bold">mangueiras e conexões</span></p>
            <p className="text-white font-bold"><span className="brush-highlight brush-bold">hidráulicas & pneumáticas.</span></p>
          </div>
          <a
            href={URL.WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hero bg-yellow-400 text-black font-medium uppercase"
            style={{
              fontFamily: "'Roboto', sans-serif",
              fontSize: "16px",
              width: "292px",
              height: "49px",
              padding: "0 17px",
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            fale com um especialista
          </a>
        </div>
      </div>

      <button
        onClick={prev}
        aria-label="Slide anterior"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-10 h-10 flex items-center justify-center rounded-full transition-colors"
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Próximo slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-10 h-10 flex items-center justify-center rounded-full transition-colors"
      >
        ›
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Ir para slide ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === current ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
