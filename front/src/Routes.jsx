"// src/Routes.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Cadastro from "./pages/cadastro/Cadastro.jsx";
import HomePage from "./pages/homepage/HomePage.jsx";
import Contacts from "./pages/contatos/Contacts.jsx";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route
        path="/homePage"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route path="/contacts" element={<Contacts />} />
    </Routes>
  );
}
