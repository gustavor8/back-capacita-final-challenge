import { useState, useEffect } from "react";

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

export default useRandomPokemon;
