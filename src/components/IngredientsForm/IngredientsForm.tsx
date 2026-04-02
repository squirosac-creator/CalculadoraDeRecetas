import type { Ingrediente } from "../../types";
import { FACTORES } from "../../constants/units";

import { Box, TextField, Select, MenuItem, Typography, Button, Paper, FormControl, InputLabel, FormHelperText } from "@mui/material";

type Props = {
  ingredientes: Ingrediente[];
  onChange: (index: number, campo: keyof Ingrediente, valor: string | number) => void;
  onAdd: () => void;
};

export default function IngredientsForm({ ingredientes, onChange, onAdd }: Props) {
  const conversionValida = (ing: Ingrediente) => !!FACTORES[ing.unidadEntrada]?.[ing.unidadSalida];

  const hayErrores = ingredientes.some((ing) => !ing.nombre.trim() || ing.cantidad <= 0 || !conversionValida(ing));

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Ingredientes
      </Typography>

      {ingredientes.map((ing, index) => {
        const errorNombre = !ing.nombre.trim();
        const errorCantidad = ing.cantidad <= 0;
        const errorConversion = !conversionValida(ing);

        return (
          <Paper
            key={index}
            elevation={2}
            sx={{
              p: 2,
              mb: 2,
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr auto 1fr",
              gap: 2,
              alignItems: "center",
            }}
          >
            {/* Nombre */}
            <TextField
              label="Ingrediente"
              value={ing.nombre}
              error={errorNombre}
              helperText={errorNombre ? "Requerido" : ""}
              onChange={(e) => onChange(index, "nombre", e.target.value)}
            />

            {/* Cantidad */}
            <TextField
              label="Cantidad"
              type="number"
              value={ing.cantidad}
              error={errorCantidad}
              helperText={errorCantidad ? "Debe ser > 0" : ""}
              inputProps={{ min: 0 }}
              onChange={(e) => onChange(index, "cantidad", Number(e.target.value))}
            />

            {/* Unidad entrada */}
            <FormControl>
              <InputLabel>Desde</InputLabel>
              <Select label="Desde" value={ing.unidadEntrada} onChange={(e) => onChange(index, "unidadEntrada", e.target.value)}>
                <MenuItem value="g">g</MenuItem>
                <MenuItem value="kg">kg</MenuItem>
                <MenuItem value="ml">ml</MenuItem>
                <MenuItem value="l">l</MenuItem>
              </Select>
            </FormControl>

            <Typography textAlign="center">→</Typography>

            {/* Unidad salida */}
            <FormControl error={errorConversion}>
              <InputLabel>A</InputLabel>
              <Select label="A" value={ing.unidadSalida} onChange={(e) => onChange(index, "unidadSalida", e.target.value)}>
                <MenuItem value="g">g</MenuItem>
                <MenuItem value="kg">kg</MenuItem>
                <MenuItem value="ml">ml</MenuItem>
                <MenuItem value="l">l</MenuItem>
              </Select>
              {errorConversion && <FormHelperText>Conversión inválida</FormHelperText>}
            </FormControl>
          </Paper>
        );
      })}

      <Button variant="contained" onClick={onAdd} disabled={hayErrores}>
        ➕ Agregar ingrediente
      </Button>
    </Box>
  );
}
