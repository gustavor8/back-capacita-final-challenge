import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PokedexPage from "./pages/Pokedex/Pokedex";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import LoginPage from "./pages/login/Login";
import RegisterPage from "./pages/register/Register";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rota Pública */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

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
