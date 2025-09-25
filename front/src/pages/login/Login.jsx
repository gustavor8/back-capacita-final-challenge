import React, { useState, useEffect } from "react";

const styleConstants = {
  input:
    "w-full px-4 py-3 rounded-lg bg-gray-50 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  duration-300 ",
  button:
    "w-full bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300  transform hover:scale-105 shadow-lg",
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
  <div className="w-16 h-16 border-4 border-dashed  rounded-full animate-spin border-green-400" />
);

const useRandomPokemon = () => {
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRandomPokemon = async () => {
      setIsLoading(true);
      try {
        const randomId = Math.floor(Math.random() * 898) + 1;
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${randomId}`
        );
        if (!response.ok) throw new Error("Pokémon não encontrado!");

        const data = await response.json();
        const spriteUrl = `https://play.pokemonshowdown.com/sprites/ani/${data.name}.gif`;

        setPokemon({
          name: data.name,
          sprite: spriteUrl,
          id: data.id,
        });
      } catch (err) {
        console.error("Falha ao buscar Pokémon:", err);
        setPokemon({
          name: "pikachu",
          sprite: "https://play.pokemonshowdown.com/sprites/ani/pikachu.gif",
          id: 25,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRandomPokemon();
  }, []);

  return { pokemon, isLoading };
};

const PokemonDisplay = ({ pokemon, isLoading }) => {
  const formatPokemonId = (id) => `#${String(id).padStart(3, "0")}`;

  return (
    <div className={styleConstants.leftPanel}>
      <div className="w-full flex items-center space-x-2">
        <PokedexLight color="bg-blue-400" />
        <PokedexLight color="bg-red-500" />
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

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!username || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setSuccessMessage(`Bem-vindo, Treinador(a) ${username}!`);
  };

  return (
    <div className={styleConstants.rightPanel}>
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-1">
        Pokédex
      </h1>
      <h2 className="text-xl font-semibold text-gray-700 text-center mb-6">
        Login do Sistema
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Treinador(a)
          </label>
          <input
            id="username"
            type="text"
            placeholder="Ex: Ash Ketchum"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styleConstants.input}
          />
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Senha
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styleConstants.input}
          />
        </div>

        <button type="submit" className={styleConstants.button}>
          Entrar
        </button>
      </form>

      <div className="mt-6 h-12 flex items-center justify-center">
        {error && (
          <p className="w-full text-center text-red-600 font-semibold bg-red-100 p-3 rounded-lg">
            {error}
          </p>
        )}
        {successMessage && (
          <p className="w-full text-center text-green-700 font-semibold bg-green-100 p-3 rounded-lg">
            {successMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default function App() {
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

          <LoginForm />
        </div>
      </div>
    </main>
  );
}
