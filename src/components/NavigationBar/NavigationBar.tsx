import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import { BrowserRouter, Routes, Route, Link as RouterLink } from "react-router-dom";

import App from "../../App";
import RecipeApp from "../../pages/RecipeApp/RecipeApp";

export default function Navbar() {
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Ajustador de Recetas
          </Typography>

          <Box>
            <Button color="inherit" component={RouterLink} to="/">
              Inicio
            </Button>
            <Button color="inherit" component={RouterLink} to="/app">
              Aplicación
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/app" element={<RecipeApp />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
