import { getAuthHeaders } from "./authService"; 

const API_URL = "http://localhost:3000/api";

export const fetchFavorites = async () => {
  const response = await fetch(`${API_URL}/favorites`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Falha ao buscar favoritos.");
  return response.json();
};

export const addFavorite = async (pokemonId) => {
  const response = await fetch(`${API_URL}/favorites`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ pokemonId }),
  });
  if (!response.ok) throw new Error("Falha ao adicionar favorito.");
  return response.json();
};

export const removeFavorite = async (pokemonId) => {
  const response = await fetch(`${API_URL}/favorites/${pokemonId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Falha ao remover favorito.");
  return response.json();
};
