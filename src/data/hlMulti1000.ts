export const hlMulti1000 = {
  name: 'HL Multi 1000',
  manufacturer: 'Henlau',
  volumes: ['2 L', '5 L'] as const,
  source: 'https://henlau.com.br/2022/07/produtos-especificos-para-limpeza-profissional-desengraxe-e-decapagem-de-maquinas-e-equipamentos-sao-fundamentais-para-a-produtividade-industrial/',
  imageSource: 'https://henlau.com.br/wp-content/uploads/2022/07/HL-Multi-1000.jpg',
};
export type ProductVolume = typeof hlMulti1000.volumes[number];
