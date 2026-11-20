export function Seta({ circular = false }: { circular?: boolean }) {
  return (
    <svg viewBox={circular ? '0 0 42 42' : '0 0 46 34'} fill="none" aria-hidden="true">
      {circular && <circle cx="21" cy="21" r="19" stroke="currentColor" strokeWidth="1.5" />}
      <path d={circular ? 'M10 21h21m-8-8 8 8-8 8' : 'M1 17h42M28 2l15 15-15 15'} stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Marca({ rodape = false }: { rodape?: boolean }) {
  return (
    <a className={`marca ${rodape ? 'marca-rodape' : ''}`} href="#" aria-label="Página inicial da Millus">
      <img src="/assets/millus/identidade/logos/logo-principal-positivo.png" alt="MILLUS" width="135" height="45" />
    </a>
  );
}
