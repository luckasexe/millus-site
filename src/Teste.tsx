import Header from "./components/Header";
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import { CarroselLogos } from "./components/blocks/CarroselLogos";
import WhatsAppButton from "./components/WhatsAppButton";

import { marcasResponse } from "./lib/marcas";

export default function Teste() {
  return (
    <>
      <Header />
      <Navbar />
      <main className="pt-[55px]">
        <HeroBanner />
        <CarroselLogos {...marcasResponse}/>
      </main>
      <WhatsAppButton />
    </>
  );
}
