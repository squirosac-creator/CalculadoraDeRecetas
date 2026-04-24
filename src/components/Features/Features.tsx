/** @format */

import { Box, Typography, Container, Grid } from "@mui/material";
import { motion } from "framer-motion";

const features: string[] = [
  "Escalado automático",
  "Cálculo de costos",
  "Conversión de unidades",
  "Interfaz intuitiva",
];

const Features: React.FC = () => {
  return (
    <Box sx={{ py: 10 }}>
      <Container>
        <Typography variant='h4' fontWeight={700} mb={6}>
          Funcionalidades
        </Typography>

        <Grid container spacing={4}>
          {features.map((text, i) => (
            <Grid size={{ xs: 12, md: 3 }}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Box
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    boxShadow: 2,
                    textAlign: "center",
                  }}
                >
                  <Typography>{text}</Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
