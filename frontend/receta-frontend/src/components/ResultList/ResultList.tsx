import type { IngredienteResultado } from "../../types";
import { Typography, List, ListItem, ListItemText, Paper, Divider } from "@mui/material";

type Props = {
  resultado: IngredienteResultado[];
};

export default function ResultList({ resultado }: Props) {
  if (resultado.length === 0) return null;

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mt: 4,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Resultado
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <List>
        {resultado.map((ing, i) => (
          <ListItem key={i} disableGutters>
            <ListItemText primary={ing.nombre} secondary={`${ing.cantidad} ${ing.unidad}`} primaryTypographyProps={{ fontWeight: 500 }} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
