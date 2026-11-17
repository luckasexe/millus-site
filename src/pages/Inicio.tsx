import { Apresentacao } from '../components/Apresentacao';
import { Catalogo } from '../components/Catalogo';
import { Diferenciais, Sobre } from '../components/Institucional';
export function Inicio() {
  return <main id="principal"><Apresentacao /><Catalogo.Raiz><Catalogo.Categorias /><section className="secao catalogo" id="catalogo"><div className="conteiner"><div className="catalogo-introducao"><div><p className="sobretitulo">PRODUTOS PARA SUA OPERAÇÃO</p><h2>Qualidade e desempenho para<br className="quebra-desktop" /> o seu dia a dia industrial.</h2></div><p>Explore nosso catálogo. O orçamento é feito com a equipe, sem compra ou pagamento pelo site.</p></div><Catalogo.Filtros /><Catalogo.Lista /></div></section></Catalogo.Raiz><Diferenciais /><Sobre /></main>;
}
