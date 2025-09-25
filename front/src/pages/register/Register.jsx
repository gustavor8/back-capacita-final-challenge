import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register as registerService } from "../../services/authService";
import useRandomPokemon from "../../hooks/useRandomPokemon";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

const styleConstants = {
  pokedexFrame:
    "w-full max-w-4xl flex flex-col md:flex-row bg-red-700 rounded-2xl shadow-2xl p-2 md:p-3 border-4 border-red-900",
  leftPanel:
    "w-full md:w-1/2 bg-red-600 p-4 rounded-xl border-b-4 md:border-r-4 md:border-b-0 border-red-800/50 flex flex-col items-center justify-center space-y-4",
  rightPanel:
    "w-full md:w-1/2 bg-gray-200 p-6 md:p-8 rounded-xl flex flex-col justify-center",
  screen:
    "w-full h-64 bg-gray-900 rounded-lg flex items-center justify-center relative p-4 border-4 border-gray-600 shadow-inner",
  infoDisplay:
    "w-full p-3 bg-green-400 text-gray-800 rounded-md text-center font-mono text-xl font-bold shadow-md capitalize border-2 border-green-600",
};
const PokedexLight = ({ color }) => (
  <div
    className={`w-5 h-5 rounded-full ${color} border-2 border-white/50 shadow-inner`}
  />
);
const Spinner = () => (
  <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-green-400" />
);
const PokemonDisplay = ({ pokemon, isLoading }) => {
  const formatPokemonId = (id) => `#${String(id).padStart(3, "0")}`;
  return (
    <div className={styleConstants.leftPanel}>
      <div className="w-full flex items-center space-x-2">
        <PokedexLight color="bg-blue-400" /> <PokedexLight color="bg-red-500" />{" "}
        <PokedexLight color="bg-yellow-400" />
      </div>
      <div className={styleConstants.screen}>
        {isLoading ? (
          <Spinner />
        ) : (
          pokemon && (
            <img
              src={pokemon.sprite}
              alt={`Sprite animado de ${pokemon.name}`}
              className="h-40 w-40 object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
              }}
            />
          )
        )}
      </div>
      <div className={styleConstants.infoDisplay}>
        {isLoading
          ? "Identificando..."
          : `${formatPokemonId(pokemon.id)} - ${pokemon.name}`}
      </div>
    </div>
  );
};

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password || !confirmPassword) {
      setError("Por favor, preencha todos os campos.");
      return;
    }
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      await registerService(email, password);
      setSuccess(
        "Usuário registrado com sucesso! Redirecionando para o login..."
      );
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styleConstants.rightPanel}>
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-1">
        Pokédex
      </h1>
      <h2 className="text-xl font-semibold text-gray-700 text-center mb-6">
        Crie sua Conta
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            E-mail (Login)
          </label>
          <Input
            id="email"
            type="text"
            placeholder="Ex: ash@ketchum.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Senha
          </label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirmar Senha
          </label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <Button type="submit">Registrar</Button>
      </form>

      <div className="mt-4 h-12 flex items-center justify-center">
        {error && (
          <p className="w-full text-center text-red-600 font-semibold bg-red-100 p-3 rounded-lg">
            {error}
          </p>
        )}
        {success && (
          <p className="w-full text-center text-green-600 font-semibold bg-green-100 p-3 rounded-lg">
            {success}
          </p>
        )}
      </div>

      <div className="text-center mt-4">
        <p className="text-gray-600">
          Já tem uma conta?{" "}
          <Link to="/login" className="font-bold text-red-600 hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default function RegisterPage() {
  const { pokemon, isLoading } = useRandomPokemon();
  return (
    <main
      className="bg-gray-800 min-h-screen flex items-center justify-center p-4 font-sans bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1613771422396-251526d8601d?q=80&w=1974&auto=format&fit=crop')",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative flex items-center justify-center w-full">
        <div className={styleConstants.pokedexFrame}>
          <PokemonDisplay pokemon={pokemon} isLoading={isLoading} />
          <div className="hidden md:flex flex-col items-center justify-center bg-red-800 w-8 -ml-1 -mr-1 z-10">
            <div className="w-2 h-8 bg-gray-600 rounded-full my-4 shadow-inner" />
            <div className="w-2 h-8 bg-gray-600 rounded-full my-4 shadow-inner" />
          </div>
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
