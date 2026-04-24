/** @format */

import React, { useState } from "react";
import { Box, TextField, Typography, Button, Alert, Paper } from "@mui/material";

type Props = {
  invitadosOriginales: number;
  invitadosNuevos: number;
  setInvitadosOriginales: (n: number) => void;
  setInvitadosNuevos: (n: number) => void;
  onSubmit: () => void;
  error: string;
  children: React.ReactNode;
};

export default function RecipeForm({
  invitadosOriginales,
  invitadosNuevos,
  setInvitadosOriginales,
  setInvitadosNuevos,
  onSubmit,
  error,
  children,
}: Props) {
  // Estado que indica si hay errores en el formulario de ingredientes
  const [errorIngredientes, setErrorIngredientes] = useState(false);

  // Validación: invitados originales deben ser mayores a 0
  const errorInvitadosOriginales = invitadosOriginales <= 0;

  // Validación: nuevos invitados deben ser mayores a 0
  const errorInvitadosNuevos = invitadosNuevos <= 0;

  // Maneja el envío del formulario con validaciones previas
  const handleSubmit = () => {
    // Si hay cualquier error, no se permite enviar
    if (errorInvitadosOriginales || errorInvitadosNuevos || errorIngredientes) return;

    onSubmit();
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        maxWidth: 900,
        mx: "auto",
        mt: 4,
      }}
    >
      {/* Título principal del formulario */}
      <Typography variant='h4' gutterBottom>
        Ajustador de Recetas
      </Typography>

      {/* Mensaje global de error si existe */}
      {error && (
        <Alert severity='error' sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Inputs de control de invitados */}
      <Box display='grid' gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} gap={2} mb={3}>
        {/* Número de invitados originales */}
        <TextField
          label='Cantidad de invitados previa'
          type='number'
          value={invitadosOriginales}
          error={errorInvitadosOriginales}
          helperText={errorInvitadosOriginales ? "Debe ser mayor que 0" : " "}
          inputProps={{ min: 1 }}
          onChange={(e) => setInvitadosOriginales(Number(e.target.value))}
        />

        {/* Número de nuevos invitados */}
        <TextField
          label='Nueva cantidad de invitados'
          type='number'
          value={invitadosNuevos}
          error={errorInvitadosNuevos}
          helperText={errorInvitadosNuevos ? "Debe ser mayor que 0" : " "}
          inputProps={{ min: 1 }}
          onChange={(e) => setInvitadosNuevos(Number(e.target.value))}
        />
      </Box>

      {/* Sección dinámica (ingredientes u otros componentes hijos) */}
      <Box mb={3}>
        {React.isValidElement(children)
          ? React.cloneElement(children as any, {
              // Inyecta función para reportar errores desde el componente hijo
              onValidationChange: setErrorIngredientes,
            })
          : children}
      </Box>

      {/* Botón de acción principal */}
      <Button
        variant='contained'
        size='large'
        onClick={handleSubmit}
        // Se deshabilita si hay cualquier error en el formulario
        disabled={errorInvitadosOriginales || errorInvitadosNuevos || errorIngredientes}
      >
        Ajustar receta
      </Button>
    </Paper>
  );
}
