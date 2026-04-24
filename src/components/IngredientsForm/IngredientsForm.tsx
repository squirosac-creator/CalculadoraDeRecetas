/** @format */

import type { Ingrediente } from "../../types";
import { UNIDADES, conversionValida, LABEL_UNIDADES } from "../../constants/units";

import {
  Box,
  TextField,
  Select,
  MenuItem,
  Typography,
  Button,
  Paper,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { useState, useEffect } from "react";

type Props = {
  ingredientes: Ingrediente[];
  onChange: (index: number, campo: keyof Ingrediente, valor: string | number) => void;
  onAdd: () => void;
  onValidationChange?: (hayErrores: boolean) => void; // 👈 clave
};

export default function IngredientsForm({
  ingredientes,
  onChange,
  onAdd,
  onValidationChange,
}: Props) {
  const [touched, setTouched] = useState<
    Record<number, Partial<Record<keyof Ingrediente, boolean>>>
  >({});

  const esConversionValida = (ing: Ingrediente) =>
    conversionValida(ing.unidadEntrada, ing.unidadSalida);

  const hayErrores = ingredientes.some(
    (ing) =>
      !ing.nombre.trim() ||
      ing.cantidad <= 0 ||
      (!ing.unidadEntrada || !ing.unidadSalida ? false : !esConversionValida(ing)),
  );

  useEffect(() => {
    onValidationChange?.(hayErrores);
  }, [hayErrores]);

  return (
    <Box>
      <Typography variant='h6' gutterBottom>
        Ingredientes
      </Typography>

      {ingredientes.map((ing, index) => {
        const errorNombre = !ing.nombre.trim();
        const errorCantidad = ing.cantidad <= 0;
        const errorConversion = ing.unidadEntrada && ing.unidadSalida && !esConversionValida(ing);

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
            <TextField
              label='Ingrediente'
              value={ing.nombre}
              error={!!(touched[index]?.nombre && errorNombre)}
              helperText={touched[index]?.nombre && errorNombre ? "Requerido" : " "}
              onChange={(e) => onChange(index, "nombre", e.target.value)}
              onBlur={() =>
                setTouched((prev) => ({
                  ...prev,
                  [index]: { ...prev[index], nombre: true },
                }))
              }
            />

            <TextField
              label='Cantidad'
              type='number'
              value={ing.cantidad}
              error={!!(touched[index]?.cantidad && errorCantidad)}
              helperText={touched[index]?.cantidad && errorCantidad ? "Debe ser > 0" : " "}
              inputProps={{ min: 0 }}
              onChange={(e) => onChange(index, "cantidad", Number(e.target.value))}
              onBlur={() =>
                setTouched((prev) => ({
                  ...prev,
                  [index]: { ...prev[index], cantidad: true },
                }))
              }
            />

            <FormControl>
              <InputLabel>Desde</InputLabel>
              <Select
                label='Desde'
                value={ing.unidadEntrada}
                displayEmpty
                onChange={(e) => {
                  const value = e.target.value;

                  onChange(index, "unidadEntrada", value);

                  if (!ing.unidadSalida) {
                    onChange(index, "unidadSalida", value);
                  }
                }}
                onBlur={() =>
                  setTouched((prev) => ({
                    ...prev,
                    [index]: { ...prev[index], unidadEntrada: true },
                  }))
                }
              >
                {UNIDADES.map((u) => (
                  <MenuItem key={u} value={u}>
                    {LABEL_UNIDADES[u]}
                  </MenuItem>
                ))}
              </Select>

              <FormHelperText> </FormHelperText>
            </FormControl>

            <Typography textAlign='center'>→</Typography>

            <FormControl error={!!(touched[index]?.unidadSalida && errorConversion)}>
              <InputLabel>A</InputLabel>
              <Select
                label='A'
                value={ing.unidadSalida}
                displayEmpty
                onChange={(e) => {
                  const value = e.target.value;

                  onChange(index, "unidadSalida", value);

                  if (!ing.unidadEntrada) {
                    onChange(index, "unidadEntrada", value);
                  }
                }}
                onBlur={() =>
                  setTouched((prev) => ({
                    ...prev,
                    [index]: { ...prev[index], unidadSalida: true },
                  }))
                }
              >
                {UNIDADES.map((u) => (
                  <MenuItem key={u} value={u}>
                    {LABEL_UNIDADES[u]}
                  </MenuItem>
                ))}
              </Select>

              <FormHelperText>
                {touched[index]?.unidadSalida && errorConversion ? "Conversión inválida" : " "}
              </FormHelperText>
            </FormControl>
          </Paper>
        );
      })}

      <Button variant='contained' onClick={onAdd} disabled={hayErrores}>
        ➕ Agregar ingrediente
      </Button>
    </Box>
  );
}
