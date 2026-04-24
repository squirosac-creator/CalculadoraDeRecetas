/** @format */

import { Box, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";

const steps: string[] = ["Ingresa tu receta", "Selecciona porciones", "Obtén resultados"];

const Steps: React.FC = () => {
  return (
    <Box sx={{ py: 10, bgcolor: "#f5f5f5" }}>
      <Container>
        <Typography variant='h4' fontWeight={700} mb={4}>
          Cómo funciona
        </Typography>

        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <Typography variant='h6' sx={{ mb: 2 }}>
              {i + 1}. {step}
            </Typography>
          </motion.div>
        ))}
      </Container>
    </Box>
  );
};

export default Steps;
