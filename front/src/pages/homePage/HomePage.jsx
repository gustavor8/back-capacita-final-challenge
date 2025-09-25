import { useState, useEffect } from "react";

import CardPokemon from "../../components/cardPokemon/CardPokemon";
import Spin from "../../components/spin/spin";

import "./HomePage.css";

export default function HomePage() {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchingPokemon, setSearchingPokemon] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pokemonOptions, setPokemonOptions] = useState([]);
  const [selectedPokemonName, setSelectedPokemonName] = useState("");
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [newPokemon, setNewPokemon] = useState({
    name: "",
    hp: "",
    type: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    async function fetchPokemonOptions() {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
      const data = await res.json();
      const addedNames = pokemons.map((p) => p.name);
      const filtered = data.results
        .map((p) => p.name)
        .filter((name) => !addedNames.includes(name));
      setPokemonOptions(filtered);
    }
    if (isModalOpen) {
      fetchPokemonOptions();
    }
  }, [isModalOpen, pokemons]);

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
        const data = await res.json();
        const detailedPromises = data.results.map(async (pokemon) => {
          const resDetails = await fetch(pokemon.url);
          const details = await resDetails.json();
          const resSpecies = await fetch(
            `https://pokeapi.co/api/v2/pokemon-species/${details.id}`
          );
          const species = await resSpecies.json();
          const descriptionEntry = species.flavor_text_entries.find(
            (entry) => entry.language.name === "en"
          );
          if (details.sprites.front_default) {
            await new Promise((resolve) => {
              const img = new Image();
              img.src = details.sprites.front_default;
              img.onload = resolve;
              img.onerror = resolve;
            });
          }
          return {
            name: details.name.replace(/^./, (c) => c.toUpperCase()),
            hp:
              details.stats.find((s) => s.stat.name === "hp")?.base_stat || 0,
            type: details.types[0]?.type.name || "unknown",
            image: details.sprites.front_default,
            description: descriptionEntry
              ? descriptionEntry.flavor_text.replace(/\f|\n/g, " ")
              : "No description found.",
          };
        });
        const fullData = await Promise.all(detailedPromises);
        setPokemons(fullData);
      } catch (error) {
        console.error("Erro ao buscar pokémons:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPokemons();
  }, []);

  async function handlePokemonSelect(e) {
    const name = e.target.value;
    setSelectedPokemonName(name);
    try {
      setSearchingPokemon(true);
      const resDetails = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      const details = await resDetails.json();
      const resSpecies = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${details.id}`
      );
      const species = await resSpecies.json();
      const descriptionEntry = species.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      );
      if (details.sprites.front_default) {
        await new Promise((resolve) => {
          const img = new Image();
          img.src = details.sprites.front_default;
          img.onload = resolve;
          img.onerror = resolve;
        });
      }
      setNewPokemon({
        name: details.name.replace(/^./, (c) => c.toUpperCase()),
        hp: details.stats.find((s) => s.stat.name === "hp")?.base_stat || 0,
        type: details.types[0]?.type.name || "unknown",
        image: details.sprites.front_default,
        description: descriptionEntry
          ? descriptionEntry.flavor_text.replace(/\f|\n/g, " ")
          : "No description found.",
      });
    } catch (error) {
      alert("Erro ao buscar Pokémon selecionado:", error);
    } finally {
      setSearchingPokemon(false);
    }
  }

  function removePokemon(name) {
    setPokemons((prev) => prev.filter((p) => p.name !== name));
  }

  function isFavorite(pokemon) {
    return favorites.some((p) => p.name === pokemon.name);
  }

  function toggleFavorite(pokemon) {
    setFavorites((prev) =>
      prev.find((p) => p.name === pokemon.name)
        ? prev.filter((p) => p.name !== pokemon.name)
        : [...prev, pokemon]
    );
  }

  function handleSave() {
    setPokemons((prev) => [...prev, newPokemon]);
    setNewPokemon({
      name: "",
      hp: "",
      type: "",
      image: "",
      description: "",
    });
    setSelectedPokemonName("");
    setIsModalOpen(false);
  }

  function handleCancel() {
    setNewPokemon({
      name: "",
      hp: "",
      type: "",
      image: "",
      description: "",
    });
    setSelectedPokemonName("");
    setIsModalOpen(false);
  }

  return (
    <main className="flex flex-col items-center m-3 gap-5">
      <div className="flex justify-end mr-10px w-full">
        <button
          className="rounded-2xl bg-yellow-400 text-white font-bold text-[20px] cursor-pointer hover:bg-yellow-600 btnAdd"
          onClick={() => setIsModalOpen(true)}
        >
          Adicionar Pokémon
        </button>
        <button
          className="rounded-2xl ml-2 bg-yellow-400 text-white font-bold text-[20px] cursor-pointer hover:bg-yellow-600 btnAdd"
          onClick={() => setIsFavoritesOpen(true)}
        >
          Favoritos
        </button>
      </div>
      {isLoading ? (
        <div className="h-[100vh] justify-center items-center teste">
          <Spin />
        </div>
      ) : (
        <div className="flex justify-center flex-wrap gap-5">
          {pokemons.map((pokemon) => (
            <div key={pokemon.name}>
              <CardPokemon
                name={pokemon.name}
                type={pokemon.type}
                description={pokemon.description}
                hp={pokemon.hp}
                image={pokemon.image}
              />
              <button
                className={`btnFavorite ${
                  isFavorite(pokemon) ? "favorited" : ""
                }`}
                onClick={() => toggleFavorite(pokemon)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="black"
                >
                  <path d="M12 .587l3.668 7.568L24 9.423l-6 5.847 1.416 8.256L12 18.897 4.584 23.526 6 15.27 0 9.423l8.332-1.268z" />
                </svg>
              </button>
              <button
                className="btnDelete"
                onClick={() => removePokemon(pokemon.name)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  width="30"
                  height="30"
                >
                  <path
                    d="M21 2 C19.3545 2 18 3.3545 18 5 L18 7 L8 7 A1 1 0 1 0 8 9 L9 9 L9 45 C9 46.7 10.3 48 12 48 L38 48 C39.7 48 41 46.7 41 45 L41 9 L42 9 A1 1 0 1 0 42 7 L32 7 L32 5 C32 3.3545 30.6454 2 29 2 L21 2 Z M21 4 L29 4 C29.5545 4 30 4.44545 30 5 L30 7 L20 7 L20 5 C20 4.44545 20.4454 4 21 4 Z M19 14 C19.6 14 20 14.4 20 15 L20 40 C20 40.6 19.6 41 19 41 C18.4 41 18 40.6 18 40 L18 15 C18 14.4 18.4 14 19 14 Z M25 14 C25.6 14 26 14.4 26 15 L26 40 C26 40.6 25.6 41 25 41 C24.4 41 24 40.6 24 40 L24 15 C24 14.4 24.4 14 25 14 Z M31 14 C31.6 14 32 14.4 32 15 L32 40 C32 40.6 31.6 41 31 41 C30.4 41 30 40.6 30 40 L30 15 C30 14.4 30.4 14 31 14 Z"
                    fill="black"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
      {isModalOpen && (
        <div
          className="fixed inset-0 p-5 flex justify-center items-center z-10 bg-opacity-50"
          onClick={handleCancel}
        >
          <div
            className="bg-gray-400 rounded-2xl shadow-lg w-96 space-y-3 z-1000 p-5 modal"
            onClick={(e) => e.stopPropagation()}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-3"
            >
              <h2 className="text-xl font-bold">Selecionar Pokémon</h2>
              <select
                value={selectedPokemonName}
                onChange={handlePokemonSelect}
                className="w-full p-2 border rounded bg-white cursor-pointer"
                required
              >
                <option value="" disabled>
                  -- Selecione um Pokémon --
                </option>
                {pokemonOptions.map((name) => (
                  <option key={name} value={name}>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </option>
                ))}
              </select>
              <input
                name="hp"
                value={newPokemon.hp}
                placeholder="HP"
                disabled
                className="w-full p-2 border rounded bg-gray-100 inputText"
              />
              <input
                name="type"
                value={newPokemon.type.replace(/^./, (c) => c.toUpperCase())}
                placeholder="Tipo"
                disabled
                className="w-full p-2 border rounded bg-gray-100 inputText"
              />
              {newPokemon.image && (
                <img
                  src={newPokemon.image}
                  alt={newPokemon.name}
                  className="w-32 h-32 mx-auto"
                />
              )}
              <textarea
                name="description"
                value={newPokemon.description}
                placeholder="Descrição"
                disabled
                className="w-full p-2 border rounded bg-gray-100 inputText"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-3 py-1 border bg-red-600 text-white rounded hover:bg-red-700 btn"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 btn"
                >
                  Salvar
                </button>
              </div>
            </form>
            {searchingPokemon && <Spin />}
          </div>
        </div>
      )}
      {isFavoritesOpen && (
        <div
          className="fixed inset-0 p-5 flex justify-center items-center z-10 bg-opacity-50"
          onClick={() => setIsFavoritesOpen(false)}
        >
          <div
            className="bg-gray-400 rounded-2xl shadow-lg w-96 space-y-3 z-1000 p-5 modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold">Favoritos</h2>
            {favorites.length === 0 ? (
              <p className="text-center text-gray-500">Nenhum favorito.</p>
            ) : (
              <div className="overflow-x-auto max-w-full scroll-container">
                <ul className="flex gap-1 min-w-max">
                  {favorites.map((p) => (
                    <li
                      key={p.name}
                      className="border p-2 rounded flex flex-col items-center gap-1 min-w-[100px]"
                    >
                      <span className="capitalize">{p.name}</span>
                      <img src={p.image} alt={p.name} className="w-16 h-16" />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1 border bg-red-600 text-white rounded hover:bg-red-700 btn"
                onClick={() => setIsFavoritesOpen(false)}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
