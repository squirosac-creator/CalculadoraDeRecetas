/** @format */

import { HashRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import RecipeApp from "./pages/RecipeApp/RecipeApp";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/app' element={<RecipeApp />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
