import { createContext, useContext, useId, useState, type ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { hlMulti1000, type ProductVolume } from '../data/hlMulti1000';
import { URL as siteUrls } from '../lib/urls';

const OfferContext = createContext<{
  volume: ProductVolume;
  selectVolume: (volume: ProductVolume) => void;
} | null>(null);

function useOffer() {
  const offer = useContext(OfferContext);
  if (!offer) throw new Error('ProductOffer parts require ProductOffer.Root');
  return offer;
}

function Root({ children }: { children: ReactNode }) {
  const [volume, selectVolume] = useState<ProductVolume>('2 L');
  return <OfferContext.Provider value={{ volume, selectVolume }}>
    <section className="hl-offer" aria-label="Consultar produto">{children}</section>
  </OfferContext.Provider>;
}

function VolumeSelector() {
  const { volume, selectVolume } = useOffer();
  const name = useId();
  return <fieldset className="hl-volumes">
    <legend>Escolha o volume</legend>
    <div>{hlMulti1000.volumes.map(option => <label key={option}>
      <input type="radio" name={name} value={option} checked={volume === option}
        onChange={() => selectVolume(option)} />
      <span>{option}</span>
    </label>)}</div>
  </fieldset>;
}

function Summary() {
  const { volume } = useOffer();
  return <p className="hl-summary" aria-live="polite">{hlMulti1000.name} · {volume}<br />
    <small>Consulte preço, disponibilidade e condições com a Millus.</small>
  </p>;
}

function CTA() {
  const { volume } = useOffer();
  const href = new globalThis.URL(siteUrls.WHATSAPP, 'https://api.whatsapp.com');
  href.searchParams.set('text', `Olá! Gostaria de um orçamento do HL Multi 1000 Henlau, embalagem de ${volume}. Podem informar preço e disponibilidade?`);
  return <a className="hl-button" href={href.toString()} target="_blank" rel="noopener noreferrer">
    Solicitar orçamento <ArrowUpRight size={19} aria-hidden="true" />
  </a>;
}

/** Root owns volume; Selector, Summary and CTA consume that same selection.
 * Compose these parts inside one Root; no lead data is stored or transmitted
 * until the visitor chooses to open WhatsApp (sending remains their action).
 */
export const ProductOffer = { Root, VolumeSelector, Summary, CTA };
