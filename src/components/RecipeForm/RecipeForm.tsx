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
  const [errorIngredientes, setErrorIngredientes] = useState(false);

  const errorInvitadosOriginales = invitadosOriginales <= 0;
  const errorInvitadosNuevos = invitadosNuevos <= 0;

  const handleSubmit = () => {
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
      <Typography variant='h4' gutterBottom>
        Ajustador de Recetas
      </Typography>

      {error && (
        <Alert severity='error' sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box display='grid' gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} gap={2} mb={3}>
        <TextField
          label='Cantidad de invitados previa'
          type='number'
          value={invitadosOriginales}
          error={errorInvitadosOriginales}
          helperText={errorInvitadosOriginales ? "Debe ser mayor que 0" : " "}
          inputProps={{ min: 1 }}
          onChange={(e) => setInvitadosOriginales(Number(e.target.value))}
        />

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

      <Box mb={3}>
        {React.isValidElement(children)
          ? React.cloneElement(children as any, {
              onValidationChange: setErrorIngredientes,
            })
          : children}
      </Box>

      <Button
        variant='contained'
        size='large'
        onClick={handleSubmit}
        disabled={errorInvitadosOriginales || errorInvitadosNuevos || errorIngredientes}
      >
        Ajustar receta
      </Button>
    </Paper>
  );
}
