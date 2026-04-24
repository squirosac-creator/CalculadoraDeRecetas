import RecipeForm from "../../components/RecipeForm/RecipeForm";
import IngredientsForm from "../../components/IngredientsForm/IngredientsForm";
import ResultList from "../../components/ResultList/ResultList";
import { useState } from "react";
import type { Ingrediente, IngredienteResultado } from "../../types";

export default function RecipeApp() {
  const [invitadosOriginales, setInvitadosOriginales] = useState(4);
  const [invitadosNuevos, setInvitadosNuevos] = useState(8);
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([{ nombre: "", cantidad: 0, unidadEntrada: "g", unidadSalida: "g" }]);
  const [resultado, setResultado] = useState<IngredienteResultado[]>([]);
  const [error, setError] = useState("");

  const agregarIngrediente = () => {
    setIngredientes([...ingredientes, { nombre: "", cantidad: 0, unidadEntrada: "g", unidadSalida: "g" }]);
  };

  const actualizarIngrediente = (index: number, campo: keyof Ingrediente, valor: string | number) => {
    const copia = [...ingredientes];
    copia[index] = { ...copia[index], [campo]: valor };
    setIngredientes(copia);
  };

  const validarFormulario = (): boolean => {
    if (invitadosOriginales <= 0 || invitadosNuevos <= 0) {
      setError("Los invitados deben ser mayores a 0.");
      return false;
    }

    for (const ing of ingredientes) {
      if (!ing.nombre || ing.cantidad <= 0) {
        setError("Ingredientes inválidos.");
        return false;
      }
    }

    setError("");
    return true;
  };

const enviarReceta = async () => {
  try {
    if (!validarFormulario()) return;

    const response = await fetch("https://calculadoraderecetas-backend.onrender.com/ajustar-receta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        invitados_originales: invitadosOriginales,
        invitados_nuevos: invitadosNuevos,
        ingredientes,
      }),
    });

    const data = await response.json();
    setResultado(data.ingredientes);

  } catch (error) {
    console.error("Error:", error);
    alert("Error conectando con el servidor");
  }
};

  return (
    <div style={{ padding: 20, maxWidth: 600 }}>
      <RecipeForm
        invitadosOriginales={invitadosOriginales}
        invitadosNuevos={invitadosNuevos}
        setInvitadosOriginales={setInvitadosOriginales}
        setInvitadosNuevos={setInvitadosNuevos}
        onSubmit={enviarReceta}
        error={error}
      >
        <IngredientsForm ingredientes={ingredientes} onChange={actualizarIngrediente} onAdd={agregarIngrediente} />
      </RecipeForm>

      <ResultList resultado={resultado} />
    </div>
  );
}
