export type Ingrediente = {
  nombre: string;
  cantidad: number;
  unidadEntrada: string;
  unidadSalida: string;
};

export type RecetaRequest = {
  invitados_originales: number;
  invitados_nuevos: number;
  ingredientes: Ingrediente[];
};

export type IngredienteResultado = {
  nombre: string;
  cantidad: number;
  unidad: string;
};
