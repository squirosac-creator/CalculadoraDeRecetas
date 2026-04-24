/** @format */

import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ py: 10, textAlign: "center" }}>
      <Container>
        <Typography variant='h4' fontWeight={700} mb={3}>
          Empieza ahora
        </Typography>

        <Button variant='contained' size='large' onClick={() => navigate("/app")}>
          Ir a la calculadora
        </Button>
      </Container>
    </Box>
  );
};

export default CTA;
