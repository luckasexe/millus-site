import type { InputHTMLAttributes } from 'react';

type PropriedadesCampoBusca = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'id'> & {
  id: string;
  rotulo: string;
};

/** O contêiner consumidor controla o único anel de foco com :focus-within. */
export function CampoBusca({ id, rotulo, ...propriedades }: PropriedadesCampoBusca) {
  return <><label className="somente-leitor" htmlFor={id}>{rotulo}</label><input {...propriedades} id={id} type="search" /></>;
}
