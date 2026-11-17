import { useEffect } from 'react';
import { CarFront as IconeCarro, Factory as IconeFabrica, Droplets as IconeGotas, ArrowDown as IconeSeta } from 'lucide-react';
import { OfertaProduto } from '../components/OfertaProduto';
import { Cartao } from '../components/ui/Cartao';
import { hlMulti1000 } from '../data/hlMulti1000';
import './hl-multi-1000.css';

function AvisoConversa() {
  return <p className="hl-aviso">Abre o WhatsApp da Millus com o produto e o volume escolhidos. Você confere e envia a mensagem; nada é enviado automaticamente.</p>;
}
function ApresentacaoProduto() {
  return <section className="hl-destaque hl-conteiner" aria-labelledby="hl-titulo">
    <div className="hl-introducao"><p className="hl-sobretitulo">HENLAU × MILLUS / LIMPEZA PROFISSIONAL</p><h1 id="hl-titulo">HL MULTI <span>1000.</span></h1><p className="hl-chamada">Uma solução para diferentes desafios de limpeza.</p><p className="hl-descricao">Detergente multiuso biodegradável para limpeza geral, automotiva e industrial, conforme a aplicação indicada pela Henlau. Na Millus, em embalagens de 2 L e 5 L.</p><a className="hl-detalhes" href="#hl-aplicacoes">Veja onde aplicar <IconeSeta size={16} aria-hidden="true" /></a></div>
    <OfertaProduto.Imagem />
    <div className="hl-oferta" id="hl-escolha"><p className="hl-sobretitulo">ORÇAMENTO COM A MILLUS</p><h2>Escolha sua embalagem.</h2><OfertaProduto.SeletorVolume /><OfertaProduto.Resumo /><OfertaProduto.BotaoOrcamento /><AvisoConversa /></div>
  </section>;
}
function AplicacoesProduto() {
  const aplicacoes = [
    { icone: IconeCarro, titulo: 'Veículos e frotas', texto: 'Automóveis, motocicletas, ônibus, caminhões e interiores de veículos. A diluição muda entre a limpeza externa e a de interiores.' },
    { icone: IconeFabrica, titulo: 'Ambientes profissionais', texto: 'Pisos e superfícies em lojas, restaurantes, hotéis e áreas industriais, nas aplicações descritas pelo fabricante.' },
    { icone: IconeGotas, titulo: 'Superfícies específicas', texto: 'Vidros, fórmica, inox e outras superfícies polidas têm indicações próprias. Consulte a tabela antes de preparar a solução.' },
  ];
  return <section className="hl-secao hl-clara" id="hl-aplicacoes" aria-labelledby="hl-titulo-aplicacoes"><div className="hl-conteiner"><p className="hl-sobretitulo">01 / APLICAÇÕES</p><h2 id="hl-titulo-aplicacoes">Da rotina automotiva aos espaços de trabalho.</h2><p className="hl-abertura">Um produto com diferentes indicações de uso — não uma diluição única para tudo.</p><div className="hl-cartoes">{aplicacoes.map(({ icone: Icone, titulo, texto }, indice) => <Cartao key={titulo}><div className="hl-topo-cartao"><Icone size={30} strokeWidth={1.5} aria-hidden="true" /><span>0{indice + 1}</span></div><h3>{titulo}</h3><p>{texto}</p></Cartao>)}</div><p className="hl-nota">As aplicações são uma síntese das indicações da Henlau. A adequação depende da superfície, da sujidade e das orientações técnicas do produto.</p></div></section>;
}
function EmbalagensProduto() {
  return <section className="hl-secao" aria-labelledby="hl-titulo-embalagens"><div className="hl-conteiner hl-divisao"><div><p className="hl-sobretitulo">02 / UMA ESCOLHA PARA SUA ROTINA</p><h2 id="hl-titulo-embalagens">Multiuso no preparo.<br />Opções na embalagem.</h2><p className="hl-abertura">A diluição é definida pela aplicação. O volume da embalagem é escolhido conforme o planejamento da sua operação.</p><a className="hl-detalhes" href="#hl-escolha">Escolher volume e consultar condições ↑</a></div><div className="hl-embalagens"><article><span>2 L</span><h3>Menor volume por embalagem</h3><p>Uma opção para compor sua compra quando a necessidade é de menor volume de produto.</p></article><article><span>5 L</span><h3>Maior volume por embalagem</h3><p>Uma opção para o planejamento de compras que demanda mais produto por unidade.</p></article><p>Sem estimativa de rendimento: o consumo depende da diluição, da área e das condições de uso. Consulte preço e disponibilidade.</p></div></div></section>;
}
const diluicoes = [
  ['1:100', 'Vidros em geral.'],
  ['1:50', 'Interiores de veículos e ônibus; plásticos, mármore, fórmica, inox e outras superfícies polidas.'],
  ['1:40', 'Automóveis e motocicletas; ônibus e caminhões; pisos em geral, nas situações indicadas pelo fabricante.'],
  ['1:30', 'Paredes muito sujas, persianas de alumínio e pisos de postos.'],
  ['1:20', 'Pisos engordurados, veículos de carga, máquinas agrícolas e pátios movimentados.'],
];
function OrientacoesProduto() {
  return <section className="hl-secao hl-clara" id="hl-diluicao" aria-labelledby="hl-titulo-diluicao"><div className="hl-conteiner"><p className="hl-sobretitulo">03 / PREPARO E APLICAÇÃO</p><h2 id="hl-titulo-diluicao">A aplicação orienta a diluição.</h2><p className="hl-abertura">Referência resumida da tabela publicada pela Henlau. Confira o rótulo e a documentação técnica atualizados antes de usar.</p><div className="hl-divisao hl-tecnica"><div className="hl-tabela"><table><caption>Diluições indicadas pelo fabricante — aplicações selecionadas</caption><thead><tr><th scope="col">Diluição</th><th scope="col">Aplicação</th></tr></thead><tbody>{diluicoes.map(([diluicao, aplicacao]) => <tr key={diluicao}><th scope="row">{diluicao}</th><td>{aplicacao}</td></tr>)}</tbody></table></div><div className="hl-modo"><h3>Orientação de uso da Henlau</h3><ol><li>Diluir conforme a aplicação indicada.</li><li>Aplicar por pulverização na superfície seca.</li><li>Aguardar aproximadamente 3 minutos.</li><li>Esfregar se necessário e enxaguar com jato de alta pressão.</li></ol><p>Este resumo não é uma instrução universal. Verifique compatibilidade, restrições da superfície e os EPIs indicados no rótulo e na ficha de segurança.</p><a href={hlMulti1000.fonte} target="_blank" rel="noopener noreferrer">Consultar tabela completa e informações na Henlau ↗</a></div></div><p className="hl-nota">As proporções foram preservadas como publicadas, sem conversão para litros de solução ou promessa de rendimento. Não use a mesma diluição para qualquer superfície.</p></div></section>;
}
function AtendimentoProduto() {
  return <section className="hl-secao hl-atendimento" aria-labelledby="hl-titulo-atendimento"><div className="hl-conteiner hl-divisao"><div><p className="hl-sobretitulo">04 / INFORMAÇÃO ANTES DA COMPRA</p><h2 id="hl-titulo-atendimento">Produto Henlau.<br />Conversa com a Millus.</h2></div><div><p>Informe sua aplicação e o volume desejado à equipe Millus. Consulte preço, disponibilidade e condições antes de fechar o pedido.</p><p>Precisa conferir os cuidados de uso? Solicite a documentação técnica e de segurança do produto antes da aplicação. As informações técnicas desta página têm como referência o fabricante.</p><a className="hl-detalhes" href={hlMulti1000.fonte} target="_blank" rel="noopener noreferrer">Ver a fonte oficial do produto ↗</a></div></div></section>;
}
function PerguntasProduto() {
  const perguntas = [
    ['Qual diluição devo usar?', 'Depende da aplicação. A tabela acima resume algumas indicações da Henlau, mas não substitui o rótulo e a documentação técnica. Consulte a tabela completa do fabricante e confirme a compatibilidade com a superfície.'],
    ['Qual é a diferença entre 2 L e 5 L?', 'As opções se referem ao volume de produto por embalagem. Escolha conforme sua necessidade de compra. O consumo e a duração dependem do uso e da diluição, por isso não há promessa de rendimento nesta página.'],
    ['Quanto custa e como peço um orçamento?', 'Selecione 2 L ou 5 L e toque em Solicitar orçamento. O WhatsApp abre com produto e volume na mensagem. A equipe Millus informa preço, disponibilidade e condições; o envio da mensagem depende de você.'],
    ['Posso aplicar em qualquer superfície?', 'Não presuma compatibilidade universal. Confira as restrições e os EPIs no rótulo, na ficha técnica e na ficha de segurança. Em caso de dúvida sobre uma superfície ou aplicação, peça orientação antes do uso.'],
  ];
  return <section className="hl-secao hl-clara" aria-labelledby="hl-titulo-perguntas"><div className="hl-conteiner hl-divisao"><div><p className="hl-sobretitulo">05 / DÚVIDAS FREQUENTES</p><h2 id="hl-titulo-perguntas">Antes de decidir.</h2></div><div className="hl-perguntas">{perguntas.map(([pergunta, resposta]) => <details key={pergunta}><summary>{pergunta}</summary><p>{resposta}</p></details>)}</div></div></section>;
}
function OrcamentoFinal() {
  return <section className="hl-secao hl-final" id="hl-orcamento" aria-labelledby="hl-titulo-orcamento"><div className="hl-conteiner hl-divisao"><div><p className="hl-sobretitulo">VAMOS CONVERSAR?</p><h2 id="hl-titulo-orcamento">Sua próxima limpeza<br />começa com a escolha certa.</h2><p>Consulte a Millus sobre o HL Multi 1000 para sua operação.</p></div><div><OfertaProduto.Resumo /><OfertaProduto.BotaoOrcamento /><a className="hl-detalhes" href="#hl-escolha">Alterar volume ↑</a><AvisoConversa /></div></div></section>;
}
export function HLMulti1000() {
  useEffect(() => {
    const tituloAnterior = document.title;
    const descricao = document.querySelector('meta[name="description"]');
    const descricaoAnterior = descricao?.getAttribute('content');
    document.title = 'HL Multi 1000 Henlau | 2 L e 5 L | Millus';
    descricao?.setAttribute('content', 'Conheça aplicações e diluições do detergente multiuso HL Multi 1000 Henlau. Consulte embalagens de 2 L e 5 L e solicite orçamento à Millus.');
    return () => { document.title = tituloAnterior; if (descricaoAnterior != null) descricao?.setAttribute('content', descricaoAnterior); };
  }, []);
  return <div className="hl-pagina"><main id="principal"><OfertaProduto.Raiz><ApresentacaoProduto /><AplicacoesProduto /><EmbalagensProduto /><OrientacoesProduto /><AtendimentoProduto /><PerguntasProduto /><OrcamentoFinal /></OfertaProduto.Raiz></main></div>;
}
