'// src/Routes.jsx'
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Cadastro from "./pages/cadastro/Cadastro.jsx";
import HomePage from "./pages/homepage/HomePage.jsx";
import Contacts from "./pages/contatos/Contacts.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/cadastro" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/homePage" element={<HomePage/>} />
      <Route path="/contacts" element={<Contacts />} />
    </Routes>
  );
}
