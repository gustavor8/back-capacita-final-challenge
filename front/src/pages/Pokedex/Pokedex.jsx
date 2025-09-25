import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { getPokemons, getPokemonDetails } from "../../services/pokemonService";
import * as PokedexService from "../../services/pokedexService";
import Button from "../../components/Button/Button";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import FilterBar from "../../components/FilterBar/FilterBar";
import PokemonModal from "../../components/PokemonModal/PokemonModal";
import { motion, AnimatePresence } from "framer-motion";

const Spinner = () => (
  <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-red-500" />
);

const PokedexHeader = ({ user, onLogout }) => (
  <header className="w-full max-w-7xl mx-auto flex justify-between items-center p-4">
    <div>
      <h1 className="text-3xl font-bold">Pokédex</h1>
      <p className="text-white/70">Bem-vindo, {user?.login}!</p>
    </div>
    <div className="w-32">
      <Button onClick={onLogout}>Sair</Button>
    </div>
  </header>
);

const EmptyFavorites = () => (
  <div className="col-span-full flex flex-col items-center justify-center text-center p-12 bg-gray-800/50 rounded-lg">
    <h2 className="text-2xl font-bold text-white">
      Nenhum favorito encontrado
    </h2>
    <p className="text-gray-400 mt-2">
      Clique na estrela de um Pokémon para adicioná-lo à sua coleção!
    </p>
  </div>
);

export default function PokedexPage() {
  const { user, logout } = useAuth();
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalLoading, setIsModalLoading] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        setError("");
        const [pokemonData, favoriteData] = await Promise.all([
          getPokemons(151),
          PokedexService.fetchFavorites(),
        ]);
        setPokemons(pokemonData);
        setFavorites(new Set(favoriteData));
      } catch (err) {
        setError("Não foi possível carregar os dados da Pokédex.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);

  const handleFavoriteToggle = useCallback(
    async (pokemonId, shouldBeFavorite) => {
      const originalFavorites = new Set(favorites);
      const newFavorites = new Set(favorites);

      if (shouldBeFavorite) {
        newFavorites.add(pokemonId);
      } else {
        newFavorites.delete(pokemonId);
      }
      setFavorites(newFavorites);

      try {
        if (shouldBeFavorite) {
          await PokedexService.addFavorite(pokemonId);
        } else {
          await PokedexService.removeFavorite(pokemonId);
        }
      } catch (error) {
        setFavorites(originalFavorites);
        setError("Não foi possível atualizar o favorito.");
      }
    },
    [favorites]
  );

  const filteredPokemons = useMemo(() => {
    if (filter === "favorites") {
      return pokemons.filter((pokemon) => favorites.has(pokemon.id));
    }
    return pokemons;
  }, [pokemons, favorites, filter]);

  const handleCardClick = useCallback(async (pokemonId) => {
    try {
      setIsModalLoading(true);
      const details = await getPokemonDetails(pokemonId);
      setSelectedPokemon(details);
    } catch (err) {
      setError("Não foi possível carregar os detalhes do Pokémon.");
    } finally {
      setIsModalLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
        <Spinner />
        <p className="mt-4 text-lg">Carregando Pokémon...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans">
      <div
        className="bg-cover bg-center"
        style={{ backgroundImage: "url('/pokemon_bg.png')" }}
      >
        <div className="bg-black/60 backdrop-blur-sm pb-12 min-h-screen">
          <PokedexHeader user={user} onLogout={logout} />

          <FilterBar activeFilter={filter} onFilterChange={setFilter} />

          {error && (
            <p className="text-center text-red-400 bg-red-900/50 p-3 rounded-md max-w-7xl mx-auto">
              {error}
            </p>
          )}

          <main className="max-w-7xl mx-auto px-4">
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.07,
                  },
                },
              }}
            >
              <AnimatePresence>
                {filteredPokemons.length > 0 ? (
                  filteredPokemons.map((pokemon) => (
                    <PokemonCard
                      key={pokemon.id}
                      pokemon={pokemon}
                      isFavorite={favorites.has(pokemon.id)}
                      onFavoriteToggle={handleFavoriteToggle}
                      onCardClick={() => handleCardClick(pokemon.id)}
                    />
                  ))
                ) : (
                  <EmptyFavorites />
                )}
              </AnimatePresence>
            </motion.div>
          </main>
        </div>
      </div>

      <AnimatePresence>
        {selectedPokemon && (
          <PokemonModal
            pokemon={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
          />
        )}
      </AnimatePresence>

      {isModalLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Spinner />
        </div>
      )}
    </div>
  );
}
