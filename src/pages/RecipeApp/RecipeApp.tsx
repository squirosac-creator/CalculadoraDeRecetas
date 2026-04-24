/** @format */

import RecipeForm from "../../components/RecipeForm/RecipeForm";
import IngredientsForm from "../../components/IngredientsForm/IngredientsForm";
import ResultList from "../../components/ResultList/ResultList";
import { useState } from "react";
import type { Ingrediente, IngredienteResultado } from "../../types";
import { Box, Stack } from "@mui/material";
import Navbar from "../../components/NavigationBar/NavigationBar";
import Footer from "../../components/Footer/Footer";
import { useEffect } from "react";

export default function RecipeApp() {
  // Estado: cantidad de invitados originales
  const [invitadosOriginales, setInvitadosOriginales] = useState(4);

  // Estado: nueva cantidad de invitados
  const [invitadosNuevos, setInvitadosNuevos] = useState(8);

  // Estado: lista de ingredientes de la receta
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([
    {
      nombre: "",
      cantidad: 0,
      unidadEntrada: "g",
      unidadSalida: "g",
      convertir: false,
    },
  ]);

  // Estado: resultado devuelto por el backend
  const [resultado, setResultado] = useState<IngredienteResultado[]>([]);

  // Estado: mensaje de error global del formulario
  const [error, setError] = useState("");

  // Agrega un nuevo ingrediente vacío al formulario
  const agregarIngrediente = () => {
    setIngredientes([
      ...ingredientes,
      {
        nombre: "",
        cantidad: 0,
        unidadEntrada: "g",
        unidadSalida: "g",
        convertir: false,
      },
    ]);
  };

  // Efecto: cambia el fondo del body cuando el componente se monta
  useEffect(() => {
    document.body.style.backgroundColor = "#0a0a0a";

    return () => {
      // Limpia el estilo cuando se desmonta el componente
      document.body.style.backgroundColor = "";
    };
  }, []);

  // Actualiza un campo específico de un ingrediente por índice
  const actualizarIngrediente = (
    index: number,
    campo: keyof Ingrediente,
    valor: string | number | boolean,
  ) => {
    setIngredientes((prev) =>
      prev.map((ing, i) => (i === index ? { ...ing, [campo]: valor } : ing)),
    );
  };

  // Valida todo el formulario antes de enviar
  const validarFormulario = (): boolean => {
    // Validación de invitados
    if (invitadosOriginales <= 0 || invitadosNuevos <= 0) {
      setError("Los invitados deben ser mayores a 0.");
      return false;
    }

    // Validación de ingredientes
    for (const ing of ingredientes) {
      if (!ing.nombre || ing.cantidad <= 0) {
        setError("Ingredientes inválidos.");
        return false;
      }
    }

    // Si todo está bien, limpia el error
    setError("");
    return true;
  };

  // Envía la receta al backend para calcular ajustes
  const enviarReceta = async () => {
    try {
      // Primero valida el formulario
      if (!validarFormulario()) return;

      // Petición al backend
      const response = await fetch(
        "https://calculadoraderecetas-backend.onrender.com/ajustar-receta",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            invitados_originales: invitadosOriginales,
            invitados_nuevos: invitadosNuevos,
            ingredientes,
          }),
        },
      );

      // Procesa la respuesta
      const data = await response.json();

      // Guarda el resultado en estado
      setResultado(data.ingredientes);
    } catch (error) {
      console.error("Error:", error);

      // Notificación simple de error de conexión
      alert("Error conectando con el servidor");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
      }}
    >
      {/* Barra superior de navegación */}
      <Navbar />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Stack sx={{ width: "100%", maxWidth: 900, paddingTop: 5 }}>
          {/* Formulario principal de receta e ingredientes */}
          <RecipeForm
            invitadosOriginales={invitadosOriginales}
            invitadosNuevos={invitadosNuevos}
            setInvitadosOriginales={setInvitadosOriginales}
            setInvitadosNuevos={setInvitadosNuevos}
            onSubmit={enviarReceta}
            error={error}
          >
            {/* Formulario de ingredientes como hijo */}
            <IngredientsForm
              ingredientes={ingredientes}
              onChange={actualizarIngrediente}
              onAdd={agregarIngrediente}
            />
          </RecipeForm>

          {/* Lista de resultados calculados */}
          <ResultList resultado={resultado} />
        </Stack>
      </Box>

      {/* Footer inferior */}
      <Footer />
    </Box>
  );
}
