import type { InputHTMLAttributes, ReactNode } from "react";
export function EstruturaRecebimento({ children }: { children: ReactNode }) {
  return (
    <div className="recebimento">
      <a className="pular-conteudo" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="cabecalho-recebimento">
        <div className="marca-recebimento">
          <img
            src="/assets/millus/identidade-v2/logos/assinatura-escuro.png"
            alt="Millus"
          />
          <span>ASSISTÊNCIA TÉCNICA</span>
        </div>
        <span className="selo-local">● Ambiente local</span>
      </header>
      <main id="conteudo" className="conteudo-recebimento">
        {children}
      </main>
    </div>
  );
}
export function ProgressoRecebimento() {
  return (
    <div className="progresso-recebimento">
      <div>
        <span>ETAPA 1 DE 6</span>
        <span>Recebimento</span>
      </div>
      <div
        className="trilha-progresso"
        role="progressbar"
        aria-label="Etapas do atendimento"
        aria-valuenow={1}
        aria-valuemin={0}
        aria-valuemax={6}
      >
        {[1, 2, 3, 4, 5, 6].map((numero) => (
          <span key={numero} className={numero === 1 ? "etapa-atual" : ""} />
        ))}
      </div>
    </div>
  );
}
export function SecaoRecebimento({
  numero,
  titulo,
  descricao,
  children,
}: {
  numero: string;
  titulo: string;
  descricao: string;
  children: ReactNode;
}) {
  return (
    <section className="secao-recebimento">
      <div className="titulo-secao-recebimento">
        <span>{numero}</span>
        <div>
          <h2>{titulo}</h2>
          <p>{descricao}</p>
        </div>
      </div>
      {children}
    </section>
  );
}
export function CampoRecebimento({
  rotulo,
  erro,
  id,
  ...atributos
}: InputHTMLAttributes<HTMLInputElement> & {
  rotulo: string;
  erro?: string;
  id: string;
}) {
  return (
    <div className="campo-recebimento">
      <label htmlFor={id}>
        {rotulo}
        {atributos.required && <span className="obrigatorio"> *</span>}
      </label>
      <input
        {...atributos}
        id={id}
        aria-invalid={!!erro}
        aria-describedby={erro ? `${id}-erro` : undefined}
      />
      {erro && (
        <p className="erro-campo" id={`${id}-erro`}>
          {erro}
        </p>
      )}
    </div>
  );
}
export function BarraInferior({ children }: { children: ReactNode }) {
  return (
    <footer className="barra-recebimento">
      <div>
        {children}
      </div>
    </footer>
  );
}
