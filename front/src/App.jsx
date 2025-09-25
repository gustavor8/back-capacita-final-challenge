import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PokedexPage from "./pages/Pokedex/Pokedex";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import LoginPage from "./pages/login/Login";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rota Pública */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rotas Protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<PokedexPage />} />
      </Route>

      {/* Se nenhuma rota corresponder, redireciona para a home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
