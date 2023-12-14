import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext";
import { FavoritesProvider } from "./Contexts/FavoritesContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </FavoritesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
