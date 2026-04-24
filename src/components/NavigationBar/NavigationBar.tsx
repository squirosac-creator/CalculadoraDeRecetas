/** @format */

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
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
        <Typography variant='h6' fontWeight={700} onClick={() => navigate("/")}>
          RecipeCalc
        </Typography>

        <Button variant='contained' onClick={() => navigate("/app")}>
          Empezar
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
