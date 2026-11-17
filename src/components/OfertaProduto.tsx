import { createContext, useContext, useId, useState, type ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { hlMulti1000, type VolumeProduto } from '../data/hlMulti1000';
import { URL as enderecosSite } from '../lib/urls';

const ContextoOferta = createContext<{
  volume: VolumeProduto;
  selecionarVolume: (volume: VolumeProduto) => void;
} | null>(null);

function usarOferta() {
  const oferta = useContext(ContextoOferta);
  if (!oferta) throw new Error('As partes de OfertaProduto exigem OfertaProduto.Raiz');
  return oferta;
}

function Raiz({ children: conteudo }: { children: ReactNode }) {
  const [volume, selecionarVolume] = useState<VolumeProduto>('2 L');
  return <ContextoOferta.Provider value={{ volume, selecionarVolume }}>
    <section className="hl-oferta" aria-label="Consultar produto">{conteudo}</section>
  </ContextoOferta.Provider>;
}

function SeletorVolume() {
  const { volume, selecionarVolume } = usarOferta();
  const nome = useId();
  return <fieldset className="hl-volumes">
    <legend>Escolha o volume</legend>
    <div>{hlMulti1000.volumes.map(opcao => <label key={opcao}>
      <input type="radio" name={nome} value={opcao} checked={volume === opcao}
        onChange={() => selecionarVolume(opcao)} />
      <span>{opcao}</span>
    </label>)}</div>
  </fieldset>;
}

function Resumo() {
  const { volume } = usarOferta();
  return <p className="hl-resumo" aria-live="polite">{hlMulti1000.nome} · {volume}<br />
    <small>Consulte preço, disponibilidade e condições com a Millus.</small>
  </p>;
}

function BotaoOrcamento() {
  const { volume } = usarOferta();
  const endereco = new globalThis.URL(enderecosSite.WHATSAPP, 'https://api.whatsapp.com');
  endereco.searchParams.set('text', `Olá! Gostaria de um orçamento do HL Multi 1000 Henlau, embalagem de ${volume}. Podem informar preço e disponibilidade?`);
  return <a className="hl-botao" href={endereco.toString()} target="_blank" rel="noopener noreferrer">
    Solicitar orçamento <ArrowUpRight size={19} aria-hidden="true" />
  </a>;
}

/** A Raiz controla o volume compartilhado por SeletorVolume, Resumo e BotaoOrcamento.
 * Componha essas partes dentro da mesma Raiz. Não há captura de dados pessoais;
 * abrir a conversa não envia a mensagem, que depende da ação do visitante.
 */
export const OfertaProduto = { Raiz, SeletorVolume, Resumo, BotaoOrcamento };
