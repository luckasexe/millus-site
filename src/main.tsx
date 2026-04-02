import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./tokens.css";
import "./styles.css";
import Teste from "./Teste";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Elemento raiz '#root' não encontrado.");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Teste />
  </React.StrictMode>,
);
