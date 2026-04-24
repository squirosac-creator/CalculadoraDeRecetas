/** @format */

import { Box, Typography, Paper } from "@mui/material";
import Navbar from "../../components/NavigationBar/NavigationBar";
import Footer from "../../components/Footer/Footer";
import { MEDIDAS_INFO } from "../../constants/units";
import { useEffect } from "react";
useEffect;

export default function InfoMedidas() {
  useEffect(() => {
    document.body.style.backgroundColor = "#0a0a0a";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <>
      <Navbar />

      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#0a0a0a",
          color: "white",
          marginTop: 5,
          p: 4,
        }}
      >
        <Typography variant='h4' gutterBottom>
          Información de Medidas
        </Typography>

        <Typography mb={3}>
          Aquí puedes ver equivalencias aproximadas y el tipo de cada unidad.
        </Typography>

        {MEDIDAS_INFO.map((m, i) => (
          <Paper
            key={i}
            sx={{
              p: 2,
              mb: 2,
              backgroundColor: "#ffffff",
              color: "black",
            }}
          >
            <Typography variant='h6'>
              {m.nombre} ({m.unidad})
            </Typography>

            <Typography>Tipo: {m.tipo}</Typography>
            <Typography>Equivalencia: {m.equiv}</Typography>
          </Paper>
        ))}
      </Box>

      <Footer />
    </>
  );
}
