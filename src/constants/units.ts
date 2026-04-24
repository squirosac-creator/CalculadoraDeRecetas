/** @format */

export const UNIDADES = [
  "g",
  "kg",
  "mg",
  "oz",
  "lb",
  "ml",
  "l",
  "tsp",
  "tbsp",
  "cup",
  "dash",
  "pinch",
];

export const TIPO_UNIDAD: Record<string, "masa" | "volumen"> = {
  g: "masa",
  kg: "masa",
  mg: "masa",
  oz: "masa",
  lb: "masa",
  ml: "volumen",
  l: "volumen",
  tsp: "volumen",
  tbsp: "volumen",
  cup: "volumen",
  dash: "volumen",
  pinch: "volumen",
};

export const LABEL_UNIDADES: Record<string, string> = {
  g: "Gramos (g)",
  kg: "Kilogramos (kg)",
  mg: "Miligramos (mg)",
  oz: "Onzas (oz)",
  lb: "Libras (lb)",

  ml: "Mililitros (ml)",
  l: "Litros (l)",
  tsp: "Cucharadita (tsp)",
  tbsp: "Cucharada (tbsp)",
  cup: "Taza (cup)",
  dash: "Chorrito (dash)",
  pinch: "Pizca (pinch)",
};

export function conversionValida(origen: string, destino: string): boolean {
  if (!origen || !destino) return true;
  return TIPO_UNIDAD[origen] === TIPO_UNIDAD[destino];
}
