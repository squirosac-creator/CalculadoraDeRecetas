/** @format */

import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        py: 4,
        textAlign: "center",
        bgcolor: "#0a0a0a",
        color: "#fff",
      }}
    >
      <Typography variant='body2'>© 2026 RecipeCalc - Univercidad CENFOTEC</Typography>
    </Box>
  );
};

export default Footer;
