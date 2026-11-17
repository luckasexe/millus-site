export const contatoComercial = { whatsapp: 'https://wa.me/5513982071346', telefone: '(13) 98207-1346', endereco: 'Cubatão/SP', email: 'contato@millus.com.br' };
export function enderecoOrcamento(produto?: string) {
  const endereco = new URL(contatoComercial.whatsapp);
  endereco.searchParams.set('text', produto ? `Olá! Gostaria de consultar preço e disponibilidade de ${produto}.` : 'Olá! Gostaria de um orçamento com a Millus.');
  return endereco.toString();
}
