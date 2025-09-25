const POKEAPI_URL = "https://pokeapi.co/api/v2";

const capitalize = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getPokemons = async (limit = 151, offset = 0) => {
  try {
    const response = await fetch(
      `${POKEAPI_URL}/pokemon?limit=${limit}&offset=${offset}`
    );
    const data = await response.json();

    const promises = data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const details = await res.json();
      return {
        id: details.id,
        name: capitalize(details.name),

        image:
          details.sprites.other["official-artwork"].front_default ||
          details.sprites.front_default,
        types: details.types.map((typeInfo) => typeInfo.type.name),
      };
    });

    const detailedPokemons = await Promise.all(promises);
    return detailedPokemons;
  } catch (error) {
    console.error("Erro ao buscar Pokémon da PokeAPI:", error);
    throw new Error("Não foi possível carregar os Pokémon. Tente novamente.");
  }
};

export const getPokemonDetails = async (id) => {
  try {
    const [pokemonRes, speciesRes] = await Promise.all([
      fetch(`${POKEAPI_URL}/pokemon/${id}`),
      fetch(`${POKEAPI_URL}/pokemon-species/${id}`),
    ]);

    if (!pokemonRes.ok || !speciesRes.ok) {
      throw new Error("Não foi possível encontrar os detalhes do Pokémon.");
    }

    const details = await pokemonRes.json();
    const species = await speciesRes.json();

    const flavorTextEntry = species.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );
    const flavorText = flavorTextEntry
      ? flavorTextEntry.flavor_text.replace(/[\n\f]/g, " ")
      : "Nenhuma descrição disponível.";

    return {
      id: details.id,
      name: capitalize(details.name),
      image: details.sprites.other["official-artwork"].front_default,

      animatedSprite:
        details.sprites.versions["generation-v"]["black-white"].animated
          .front_default,
      types: details.types.map((typeInfo) => typeInfo.type.name),
      height: details.height / 10,
      weight: details.weight / 10,
      stats: details.stats.map((stat) => ({
        name: capitalize(stat.stat.name.replace("-", " ")),
        value: stat.base_stat,
      })),
      flavorText,
    };
  } catch (error) {
    console.error("Erro ao buscar detalhes do Pokémon:", error);
    throw error;
  }
};
