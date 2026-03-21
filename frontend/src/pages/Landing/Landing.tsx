import { Container, Typography } from "@mui/material";

export default function Landing() {
  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h3" gutterBottom>
        Ajustador de Recetas
      </Typography>

      <Typography variant="body1" color="text.secondary" paragraph>
        Esta aplicación permite escalar automáticamente las cantidades de los ingredientes de una receta según el número de invitados, manteniendo las
        proporciones originales.
      </Typography>

      <Typography variant="h5" gutterBottom>
        ¿Cómo funciona?
      </Typography>

      <Typography variant="body1" color="text.secondary">
        El sistema aplica razones y proporciones matemáticas, utilizando la regla de tres simple y compuesta, para recalcular cada ingrediente de
        forma precisa.
      </Typography>
    </Container>
  );
}
