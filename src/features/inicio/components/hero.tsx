import { useEffect, useRef, useState } from 'react';
import type { EstadoInicio } from '../inicio.hook';
import { slides } from '../inicio.dados';

export function Hero({ estado }: { estado: EstadoInicio }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [pausado, definirPausado] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [progresso, definirProgresso] = useState(0);
  const slide = slides[estado.slideAtual];
  const [antes, depois] = slide.titulo.split(slide.destaque);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let ativo = true;
    if (pausado) video.pause();
    else void video.play().catch(() => { if (ativo) definirPausado(true); });
    return () => { ativo = false; };
  }, [slide.video, pausado]);

  return (
    <section className="hero" aria-label="Destaques MILLUS">
      <video key={slide.video} ref={videoRef} className="hero-video" muted playsInline
        src={slide.video} poster={slide.imagem} preload="metadata"
        onLoadedMetadata={() => definirProgresso(0)}
        onTimeUpdate={({ currentTarget }) => definirProgresso(currentTarget.duration ? currentTarget.currentTime / currentTarget.duration : 0)}
        onEnded={estado.avancarSlide} onError={() => definirPausado(true)} />
      <div className="hero-conteudo" key={slide.titulo}>
        <h1>{antes}<span>{slide.destaque}</span>{depois}</h1>
        <a className="botao botao-claro" href={slide.destino}>{slide.rotulo}</a>
      </div>
      <div className="hero-controles">
        <button type="button" className="hero-passar" aria-label="Próximo vídeo" onClick={estado.avancarSlide}>
          <span className="trilho"><i style={{ transform: `scaleX(${progresso})` }} /></span>
        </button>
      </div>
    </section>
  );
}
