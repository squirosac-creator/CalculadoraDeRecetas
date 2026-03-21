export const FACTORES: Record<string, Record<string, number>> = {
  g: { g: 1, kg: 0.001 },
  kg: { g: 1000, kg: 1 },
  ml: { ml: 1, l: 0.001 },
  l: { ml: 1000, l: 1 },
};

export function conversionValida(origen: string, destino: string): boolean {
  return !!FACTORES[origen]?.[destino];
}
