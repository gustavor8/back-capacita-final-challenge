import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import Button from "../../components/Button/Button.jsx";

export default function PokedexPage() {
  const { user, logout } = useAuth();

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col items-center justify-center p-4 text-white">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">
          Bem-vindo à Pokédex, Treinador(a)!
        </h1>
        <p className="text-xl mb-6">
          Login efetuado como:{" "}
          <span className="font-bold text-yellow-400">{user?.login}</span>
        </p>
        <div className="max-w-xs mx-auto">
          <Button onClick={logout}>Sair</Button>
        </div>
      </div>
    </div>
  );
}
