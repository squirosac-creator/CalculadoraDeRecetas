/** @format */

import { Box, Button, Container } from "@mui/material";
import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        backgroundImage: `
      linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
      url('/CalculadoraDeRecetas/images/fondo-claro-de-ternera.jpg')
    `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backdropFilter: "blur(4px)",
        color: "white",
      }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant='h2' fontWeight={800} gutterBottom>
            Calcula recetas <br /> sin esfuerzo
          </Typography>

          <Typography sx={{ mb: 4, color: "#aaa" }}>
            Ajusta ingredientes, costos y porciones automáticamente.
          </Typography>

          <Button variant='contained' size='large' onClick={() => navigate("/app")}>
            Probar ahora
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Hero;
