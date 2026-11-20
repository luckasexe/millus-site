import { contato } from '../inicio.dados';
import type { EstadoInicio } from '../inicio.hook';

export function Sobreposicoes({ estado }: { estado: EstadoInicio }) {
  return <>
    {estado.cookiesAbertos && !estado.preferenciasAbertas && <section className="aviso-cookies" aria-label="Aviso de cookies">
      <h2>Usamos cookies</h2>
      <p>A Millus guarda sua preferência neste navegador.</p>
      <div className="cookies-acoes">
        <button onClick={() => estado.salvarPreferencias('todos')}>Aceitar todos</button>
        <button onClick={() => estado.salvarPreferencias('necessarios')}>Rejeitar todos</button>
      </div>
      <button className="cookies-gerenciar" onClick={() => estado.definirPreferenciasAbertas(true)}>Gerenciar preferências</button>
    </section>}
    {estado.preferenciasAbertas && <div className="modal-fundo" onClick={() => estado.definirPreferenciasAbertas(false)}>
      <section className="modal-preferencias" role="dialog" aria-modal="true" aria-labelledby="titulo-preferencias" onClick={evento => evento.stopPropagation()}>
        <button className="modal-fechar" aria-label="Fechar preferências" onClick={() => estado.definirPreferenciasAbertas(false)} autoFocus>×</button>
        <h2 id="titulo-preferencias">Preferências de cookies</h2>
        <p>Escolha suas preferências para esta prévia. Não utilizamos rastreadores de análise ou marketing.</p>
        <label><span>Cookies necessários</span><input type="checkbox" checked disabled /></label>
        <label><span>Cookies de análise</span><input type="checkbox" /></label>
        <label><span>Cookies de marketing</span><input type="checkbox" /></label>
        <button className="botao" onClick={() => estado.salvarPreferencias('personalizado')}>Salvar preferências</button>
      </section>
    </div>}
    <button className="botao-conversa" aria-label={estado.conversaAberta ? 'Fechar suporte' : 'Abrir suporte'} aria-expanded={estado.conversaAberta} aria-controls="painel-suporte" onClick={() => estado.definirConversaAberta(!estado.conversaAberta)}>
      {estado.conversaAberta ? <span>×</span> : <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="m7 5 20 2-2 18-8-1-6 5-1-6-5-1Z" fill="currentColor" /><path d="m11 11 11 1m-12 3 11 1m-11 3 8 1" stroke="var(--millus-amarelo)" strokeWidth="2" /></svg>}
    </button>
    {estado.conversaAberta && <section id="painel-suporte" className="painel-suporte" aria-label="Atendimento Millus"><h2>Atendimento Millus</h2><p>Como podemos ajudar?</p><a className="botao" href={contato.whatsapp}>Conversar pelo WhatsApp</a><a className="botao" href={`mailto:${contato.email}`}>Enviar e-mail</a></section>}
  </>;
}
