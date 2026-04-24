/** @format */

import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AppBar
      position='fixed'
      elevation={0}
      sx={{ bgcolor: "transparent", backdropFilter: "blur(10px)" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant='h6'
          fontWeight={700}
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          RecipeCalc
        </Typography>

        <Stack direction='row' spacing={2}>
          <Button color='inherit' onClick={() => navigate("/medidas")}>
            Medidas
          </Button>

          <Button variant='contained' onClick={() => navigate("/app")}>
            Empezar
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
