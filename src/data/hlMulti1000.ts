export const hlMulti1000 = {
  nome: 'HL Multi 1000',
  fabricante: 'Henlau',
  volumes: ['2 L', '5 L'] as const,
  fonte: 'https://henlau.com.br/2022/07/produtos-especificos-para-limpeza-profissional-desengraxe-e-decapagem-de-maquinas-e-equipamentos-sao-fundamentais-para-a-produtividade-industrial/',
  origemImagem: 'https://henlau.com.br/wp-content/uploads/2022/07/HL-Multi-1000.jpg',
};
export type VolumeProduto = typeof hlMulti1000.volumes[number];
