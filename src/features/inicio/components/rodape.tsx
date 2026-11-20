import { Marca } from './icones';
import { contato } from '../inicio.dados';

export function Rodape({ abrirPreferencias }: { abrirPreferencias: () => void }) {
  return (
    <footer className="rodape" id="contato">
      <div className="rodape-identidade"><Marca rodape /><p>© Millus. Todos os direitos reservados.</p></div>
      <div className="contato-millus">
        <h2>Fale com a Millus</h2>
        <a href={contato.whatsapp}>WhatsApp (13) 98207-1346</a>
        <a href={`mailto:${contato.email}`}>{contato.email}</a>
      </div>
      <div className="contato-millus">
        <h2>Explore</h2>
        <a href="#colecoes">Coleções</a>
        <a href="#noticias">Notícias e novidades</a>
        <button className="preferencias-link" onClick={abrirPreferencias}>Preferências de cookies</button>
      </div>
    </footer>
  );
}
