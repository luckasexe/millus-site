import { useEffect, useState } from 'react';
import { slides } from './inicio.dados';

export function useInicio() {
  const [menuAberto, definirMenuAberto] = useState(false);
  const [cabecalhoFixo, definirCabecalhoFixo] = useState(false);
  const [slideAtual, definirSlideAtual] = useState(0);
  const [cookiesAbertos, definirCookiesAbertos] = useState(() => {
    try { return !localStorage.getItem('millus-preferencias'); }
    catch { return true; }
  });
  const [preferenciasAbertas, definirPreferenciasAbertas] = useState(false);
  const [conversaAberta, definirConversaAberta] = useState(false);

  useEffect(() => {
    const atualizar = () => definirCabecalhoFixo(window.scrollY > 70);
    atualizar();
    window.addEventListener('scroll', atualizar, { passive: true });
    return () => window.removeEventListener('scroll', atualizar);
  }, []);

  useEffect(() => {
    if (!menuAberto) return;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = anterior; };
  }, [menuAberto]);

  useEffect(() => {
    const fechar = (evento: KeyboardEvent) => {
      if (evento.key !== 'Escape') return;
      definirMenuAberto(false);
      definirConversaAberta(false);
      definirPreferenciasAbertas(false);
    };
    document.addEventListener('keydown', fechar);
    return () => document.removeEventListener('keydown', fechar);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observador = new IntersectionObserver(entradas => {
      entradas.forEach(entrada => {
        if (!entrada.isIntersecting) return;
        const imagem = entrada.target.classList.contains('colecao-imagem');
        entrada.target.animate([
          { opacity: 0, translate: imagem ? '70px 0' : '0 25px' },
          { opacity: 1, translate: '0 0' },
        ], { duration: 800, easing: 'ease-out' });
        observador.unobserve(entrada.target);
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.filosofia > *, .colecao-conteudo, .colecao-imagem, .mapa-rede, .rede-conteudo').forEach(elemento => observador.observe(elemento));
    return () => observador.disconnect();
  }, []);

  function avancarSlide() {
    definirSlideAtual(atual => (atual + 1) % slides.length);
  }

  function salvarPreferencias(escolha: 'todos' | 'necessarios' | 'personalizado') {
    try { localStorage.setItem('millus-preferencias', escolha); }
    catch { /* A escolha continua válida nesta visita sem armazenamento. */ }
    definirCookiesAbertos(false);
    definirPreferenciasAbertas(false);
  }

  return {
    menuAberto, definirMenuAberto, cabecalhoFixo, slideAtual,
    avancarSlide, cookiesAbertos, definirCookiesAbertos,
    preferenciasAbertas, definirPreferenciasAbertas, salvarPreferencias,
    conversaAberta, definirConversaAberta,
  };
}

export type EstadoInicio = ReturnType<typeof useInicio>;
