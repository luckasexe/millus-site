import { HeroSection } from "./components/ui/hero-section";
import { Features } from "./components/ui/features";
import { Gallery4 } from "./components/blocks/gallery4";
import { CarroselLogos } from "./components/blocks/CarroselLogos";

import { projetosResponse } from "./lib/projetos";
import { featuresResponse } from "./lib/features";
import { marcasResponse } from "./lib/marcas";


export default function App() {
  return (
    <>
      <HeroSection
        title={<>Soluções técnicas para <br /> sua operação industrial</>}
        subtitle="Fornecimento técnico, mangueiras prensadas, peças industriais e apoio comercial para rotina, urgência e projeto."
        callToAction={{
          text: "Solicitar atendimento no WhatsApp",
          href: "https://wa.me/5513982071346",
        }}
        backgroundImage="/assets/MILLUS_NOVA.jpg"
        contactInfo={{
          website: "www.millus.com.br",
          phone: "(13) 98207-1346",
          address: "Rua Belarmino Amaral, 618 - Cubatão/SP",
        }}
        logo={{
          url: "/assets/logo.png",
          alt: "Millus Acessórios Industriais",
          text: "Millus Acessórios Industriais",
        }}
        slogan="Soluções técnicas para a indústria"
      />

      <CarroselLogos {...marcasResponse}/>

      <Features features={featuresResponse} />

      <Gallery4 {...projetosResponse}/>

    </>
  );
}
