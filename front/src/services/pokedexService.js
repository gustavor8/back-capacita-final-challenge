import { getAuthHeaders } from "./authService";

const API_URL = "http://localhost:3000/api";

export const fetchTeams = async () => {
  const response = await fetch(`${API_URL}/teams`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Falha ao buscar as equipas.");
  return response.json();
};

export const createTeam = async (name, pokemonIds) => {
  const response = await fetch(`${API_URL}/teams`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ name, pokemonIds }),
  });
  if (!response.ok) throw new Error("Falha ao criar a equipa.");
  return response.json();
};

export const deleteTeam = async (teamId) => {
  const response = await fetch(`${API_URL}/teams/${teamId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Falha ao apagar a equipa.");
  return response.json();
};

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
