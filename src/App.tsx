import { Box, Typography, Button, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function App() {
  return (
    <Box textAlign="center" mt={6}>
      <Typography variant="h3" gutterBottom>
        Ajustador de Recetas
      </Typography>

      <Typography variant="h6" color="text.secondary" gutterBottom>
        Ajusta automáticamente las cantidades de una receta según el número de invitados, aplicando razones, proporciones y conversión de unidades.
      </Typography>

      <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
        <Button variant="contained" size="large" component={RouterLink} to="/app">
          Usar aplicación
        </Button>
      </Stack>
    </Box>
  );
}
