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

export const MEDIDAS_INFO = [
  { unidad: "g", nombre: "Gramo", tipo: "Masa", equiv: "1 g" },
  { unidad: "kg", nombre: "Kilogramo", tipo: "Masa", equiv: "1000 g" },
  { unidad: "mg", nombre: "Miligramo", tipo: "Masa", equiv: "0.001 g" },
  { unidad: "oz", nombre: "Onza", tipo: "Masa", equiv: "28.35 g" },
  { unidad: "lb", nombre: "Libra", tipo: "Masa", equiv: "453.6 g" },

  { unidad: "ml", nombre: "Mililitro", tipo: "Volumen", equiv: "1 ml" },
  { unidad: "l", nombre: "Litro", tipo: "Volumen", equiv: "1000 ml" },
  { unidad: "tsp", nombre: "Cucharadita", tipo: "Volumen", equiv: "5 ml" },
  { unidad: "tbsp", nombre: "Cucharada", tipo: "Volumen", equiv: "15 ml" },
  { unidad: "cup", nombre: "Taza", tipo: "Volumen", equiv: "240 ml" },
  { unidad: "dash", nombre: "Chorrito", tipo: "Volumen", equiv: "0.6 ml (aprox)" },
  { unidad: "pinch", nombre: "Pizca", tipo: "Volumen", equiv: "0.3 ml (aprox)" },
];
