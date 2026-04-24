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
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useState, useEffect } from "react";

type Props = {
  ingredientes: Ingrediente[];
  onChange: (index: number, campo: keyof Ingrediente, valor: string | number | boolean) => void;
  onAdd: () => void;
  onValidationChange?: (hayErrores: boolean) => void;
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

  const hayErrores = ingredientes.some((ing) => {
    const errorNombre = !ing.nombre.trim();
    const errorCantidad = ing.cantidad <= 0;
    const errorConversion = ing.unidadEntrada && ing.unidadSalida && !esConversionValida(ing);

    return errorNombre || errorCantidad || errorConversion;
  });

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
              gap: 2,
              alignItems: "center",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "auto 2fr 1fr 1fr auto 1fr",
              },
            }}
          >
            <FormControlLabel
              sx={{ alignSelf: "center", m: 0 }}
              control={
                <Checkbox
                  size='small'
                  checked={!!ing.convertir}
                  onChange={(e) => {
                    const checked = e.target.checked;

                    onChange(index, "convertir", checked);

                    if (!checked) {
                      onChange(index, "unidadSalida", ing.unidadEntrada);
                    }
                  }}
                />
              }
              label='Convertir'
            />

            <TextField
              size='small'
              label='Ingrediente'
              fullWidth
              value={ing.nombre}
              error={!!(touched[index]?.nombre && errorNombre)}
              helperText={touched[index]?.nombre && errorNombre ? "Requerido" : ""}
              onChange={(e) => onChange(index, "nombre", e.target.value)}
              onBlur={() =>
                setTouched((prev) => ({
                  ...prev,
                  [index]: { ...prev[index], nombre: true },
                }))
              }
            />

            <TextField
              size='small'
              label='Cantidad'
              type='number'
              fullWidth
              value={ing.cantidad}
              error={!!(touched[index]?.cantidad && errorCantidad)}
              helperText={touched[index]?.cantidad && errorCantidad ? "Debe ser > 0" : ""}
              inputProps={{ min: 0 }}
              onChange={(e) => onChange(index, "cantidad", Number(e.target.value))}
              onBlur={() =>
                setTouched((prev) => ({
                  ...prev,
                  [index]: { ...prev[index], cantidad: true },
                }))
              }
            />

            {/* UNIDAD ENTRADA */}
            <FormControl fullWidth size='small'>
              <InputLabel>Desde</InputLabel>
              <Select
                label='Desde'
                value={ing.unidadEntrada}
                onChange={(e) => {
                  const value = e.target.value;

                  onChange(index, "unidadEntrada", value);

                  if (!ing.convertir) {
                    onChange(index, "unidadSalida", value);
                  }
                }}
              >
                {UNIDADES.map((u) => (
                  <MenuItem key={u} value={u}>
                    {LABEL_UNIDADES[u]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* FLECHA */}
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              →
            </Typography>

            {/* UNIDAD SALIDA */}
            <FormControl
              fullWidth
              size='small'
              error={!!(touched[index]?.unidadSalida && errorConversion)}
            >
              <InputLabel>A</InputLabel>
              <Select
                label='A'
                value={ing.unidadSalida}
                disabled={!ing.convertir}
                onChange={(e) => {
                  const value = e.target.value;

                  onChange(index, "unidadSalida", value);

                  if (!ing.convertir) {
                    onChange(index, "unidadEntrada", value);
                  }
                }}
                onBlur={() =>
                  setTouched((prev) => ({
                    ...prev,
                    [index]: {
                      ...prev[index],
                      unidadSalida: true,
                    },
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
                {touched[index]?.unidadSalida && errorConversion ? "Conversión inválida" : ""}
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
