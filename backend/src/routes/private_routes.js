import express from "express";
import PokedexController from "../controllers/pokedex_controller.js";

const privateRoutes = express.Router();
const pokedexController = new PokedexController();

// --- Rotas de Favoritos ---
privateRoutes.get(
  "/favorites",
  pokedexController.getFavorites.bind(pokedexController)
);
privateRoutes.post(
  "/favorites",
  pokedexController.addFavorite.bind(pokedexController)
);
privateRoutes.delete(
  "/favorites/:pokemonId",
  pokedexController.removeFavorite.bind(pokedexController)
);

export default privateRoutes;
