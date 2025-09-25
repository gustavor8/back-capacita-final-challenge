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
