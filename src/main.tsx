/** @format */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import NavigationBar from "./components/NavigationBar/NavigationBar";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NavigationBar />
  </StrictMode>,
);
