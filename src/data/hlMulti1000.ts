export const hlMulti1000 = {
  nome: 'HL Multi 1000',
  fabricante: 'Henlau',
  volumes: ['2 L', '5 L'] as const,
  fonte: 'https://henlau.com.br/produtos/hl-multi-1000-detergente-multiuso-biodegradavel/',
  origemImagem: 'https://henlau.com.br/wp-content/uploads/2022/07/HL-Multi-1000.jpg',
};
export type VolumeProduto = typeof hlMulti1000.volumes[number];
