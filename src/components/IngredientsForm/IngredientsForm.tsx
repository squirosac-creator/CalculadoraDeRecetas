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
  // Estado para marcar qué campos han sido tocados (para mostrar errores solo cuando corresponde)
  const [touched, setTouched] = useState<
    Record<number, Partial<Record<keyof Ingrediente, boolean>>>
  >({});

  // Valida si una conversión entre unidades es válida según reglas externas
  const esConversionValida = (ing: Ingrediente) =>
    conversionValida(ing.unidadEntrada, ing.unidadSalida);

  // Detecta si existe al menos un error en cualquier ingrediente
  const hayErrores = ingredientes.some((ing) => {
    const errorNombre = !ing.nombre.trim();
    const errorCantidad = ing.cantidad <= 0;
    const errorConversion = ing.unidadEntrada && ing.unidadSalida && !esConversionValida(ing);

    return errorNombre || errorCantidad || errorConversion;
  });

  // Notifica al componente padre si hay errores en el formulario
  useEffect(() => {
    onValidationChange?.(hayErrores);
  }, [hayErrores]);

  return (
    <Box>
      {/* Título del formulario */}
      <Typography variant='h6' gutterBottom>
        Ingredientes
      </Typography>

      {/* Render dinámico de cada ingrediente */}
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
            {/* Checkbox para activar/desactivar conversión de unidades */}
            <FormControlLabel
              sx={{ alignSelf: "center", m: 0 }}
              control={
                <Checkbox
                  size='small'
                  checked={!!ing.convertir}
                  onChange={(e) => {
                    const checked = e.target.checked;

                    onChange(index, "convertir", checked);

                    // Si se desactiva la conversión, igualamos unidad de salida a entrada
                    if (!checked) {
                      onChange(index, "unidadSalida", ing.unidadEntrada);
                    }
                  }}
                />
              }
              label='Convertir'
            />

            {/* Input: nombre del ingrediente */}
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

            {/* Input: cantidad del ingrediente */}
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

            {/* Selector de unidad de entrada */}
            <FormControl fullWidth size='small'>
              <InputLabel>Desde</InputLabel>
              <Select
                label='Desde'
                value={ing.unidadEntrada}
                onChange={(e) => {
                  const value = e.target.value;

                  onChange(index, "unidadEntrada", value);

                  // Si no hay conversión activa, sincroniza ambas unidades
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

            {/* Indicador visual de dirección de conversión */}
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              →
            </Typography>

            {/* Selector de unidad de salida */}
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

                  // Si no hay conversión, sincroniza con entrada
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

              {/* Mensaje de error de conversión */}
              <FormHelperText>
                {touched[index]?.unidadSalida && errorConversion ? "Conversión inválida" : ""}
              </FormHelperText>
            </FormControl>
          </Paper>
        );
      })}

      {/* Botón para agregar nuevo ingrediente (bloqueado si hay errores) */}
      <Button variant='contained' onClick={onAdd} disabled={hayErrores}>
        ➕ Agregar ingrediente
      </Button>
    </Box>
  );
}
