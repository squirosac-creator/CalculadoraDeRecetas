/** @format */

import { HashRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import RecipeApp from "./pages/RecipeApp/RecipeApp";
import InfoMedidas from "./pages/InfoMedidas/InfoMedidas";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/app' element={<RecipeApp />} />
        <Route path='/medidas' element={<InfoMedidas />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
